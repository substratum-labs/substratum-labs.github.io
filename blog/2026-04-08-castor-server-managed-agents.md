---
slug: castor-server-managed-agents
title: "An open-source, wire-compatible Anthropic Managed Agents"
authors: [substratum-labs]
tags: [release, agents, open-source, deep-dive]
---

> Anthropic Managed Agents is a protocol, not a product. Like S3 — once the protocol is public, an open-source replacement is inevitable.

Two days ago Anthropic shipped Managed Agents: $0.08 per active session-hour, closed source, Claude only, all data through their infra.

<!-- truncate -->

**What I like about it:**

- **The HTTP wire format is clean.** `/v1/agents`, `/v1/sessions`, `/v1/sessions/{id}/events` carve up the resource tree the right way: an agent is a definition, a session is one execution of that definition, and an event is a state transition inside a session. This is the schema an agent runtime should have.
- **The event model is well thought out.** SSE events are fine-grained enough (`session.status_*`, `agent.message`, `tool.*`) that a client can render an incremental UI instead of waiting for a final blob. Given that real agent tasks are minutes-long, not seconds-long, streaming isn't optional.
- **The HITL design has a `modify` rung**, not just approve/reject. The agent wants to run `rm -rf /tmp/foo`; a human says "no, run `ls /tmp/foo` instead" and the agent picks up the substituted call. That's what real human-in-the-loop workflows actually need.
- **The built-in toolset is wrapped as a versioned `toolset` object** (`agent_toolset_20260401`) instead of forcing every agent author to hand-roll bash/read/write. An underrated piece of API design.
- **The Environments API** makes "which filesystem / network / container the agent runs inside" a first-class concept. Most agent frameworks still hand-wave this.

**What I don't like about it:**

- **$0.08 per session-hour, on top of tokens.** An agent that sits idle for an hour costs eight cents just to *exist*. That's product pricing, not infra pricing — the marginal cost on Anthropic's side is nowhere near that number.
- **Claude only.** The protocol and the model are cleanly separable in principle (I have OpenRouter routing to GPT/Llama/Qwen working through LiteLLM), but the official runtime is hard-wired to Claude.
- **Closed source, unauditable.** For something that runs bash, reads your files, and calls your APIs on your behalf, "you can't see what it's doing" is not an acceptable property.
- **Data egress to Anthropic infra.** Every conversation, tool call, and file body flows through their network. For most enterprise use cases that's a hard stop.
- **No fork / replay / scan.** Your agent picked the wrong branch on step 7? Start over from step 0. This isn't a missing feature — the runtime isn't built on a deterministic substrate, so it can't be retrofitted.
- **The SDK is a tier below the protocol.** `anthropic-python` 0.93.0 ships a `Stream` class that hard-codes Messages API event names; every Managed Agents event is silently dropped. 0.93 is the version that ships *with* Managed Agents, which suggests internal dogfooding was thin. (Details in story 1.)

So I wrote my own. `castor-server`: a 100% wire-compatible open-source replacement. The same `anthropic-python` code, change one line of `base_url`, runs on your own machine. Plus a few capabilities Anthropic structurally can't ship: fork, scan, replay, per-session budget enforcement.

Not because I bolted on a few extra endpoints. Because it's built on a deterministic agent runtime called Castor. More on that later.

Code first.

## 30 seconds, no API key

```bash
$ pip install castor-server
$ castor-server run
```

```python
from anthropic import Anthropic

# the one line that changes
client = Anthropic(base_url="http://localhost:8080", api_key="local")

# everything below is unmodified anthropic-python
agent = client.beta.agents.create(
    name="hello",
    model="mock",  # built-in mock model, no LLM needed
    tools=[{"type": "agent_toolset_20260401"}],
)
session = client.beta.sessions.create(agent=agent.id)
client.beta.sessions.events.send(
    session_id=session.id,
    events=[{"type": "user.message",
             "content": [{"type": "text", "text": "hello"}]}],
)
# → agent.message: "[mock] echo: hello"
```

The whole pipeline — agents, sessions, events, kernel, SSE — runs end to end with zero dependencies. No Anthropic key, no OpenRouter key, no Docker.

When you want a real model, swap `model="mock"` for `claude-sonnet-4-5` or `openrouter/anthropic/claude-3.5-sonnet` and set one env var. LiteLLM is underneath, so any provider works.

## Where it differs

|                                              | Anthropic Managed Agents      | castor-server                       |
| -------------------------------------------- | ----------------------------- | ----------------------------------- |
| Deployment                                   | Anthropic cloud               | your laptop / VPC / k8s             |
| Models                                       | Claude only                   | anything (LiteLLM)                  |
| Billing                                      | $0.08/session-hour + tokens   | tokens only                         |
| Data egress                                  | Anthropic infra               | your network                        |
| Open source                                  | ❌                            | ✅                                  |
| **Replay & deterministic re-execution**      | ❌                            | ✅                                  |
| **Time-travel fork (branch from any step)**  | ❌                            | ✅                                  |
| **Speculative scan (agent dry-run)**         | ❌                            | ✅                                  |
| **Per-session budget enforcement**           | ❌                            | ✅                                  |
| HITL approve / reject / **modify**           | partial                       | ✅                                  |
| MCP toolset                                  | ✅                            | ✅                                  |
| Built-in toolset (bash/read/write/...)       | ✅                            | ✅ (sandboxed)                      |
| Files API                                    | ✅                            | ✅                                  |
| Vault                                        | ✅                            | ❌ (on the roadmap)                 |

A few interesting things came up while building this.

## Story 1: the official SDK has a wire-format bug

After getting a basic version of the server working, I ran end-to-end tests with `anthropic-python` 0.93.0. All HTTP CRUD looked fine — agent creation, session creation, event submission all worked. But `client.beta.sessions.events.stream()` returned zero events.

Triage:

- `curl` against the same URL: 5 events, all delivered.
- raw `httpx`: 5 events, all delivered.
- A small streaming helper I wrote myself: 5 events, all delivered.
- Official `anthropic-python` `Stream` class: 0 events.

I read the SDK source. `Stream.__stream__` hard-codes the Messages API event names (`message_start`, `content_block_*`, and friends). Every Managed Agents event name (`session.status_*`, `agent.message`) misses the `if` chain and gets silently discarded.

This is an SDK bug that affects every Managed Agents user — including users hitting `api.anthropic.com` directly. I sent Anthropic a 20-line standalone reproducer (commits `e006614`, `d1cc0af`); the script doesn't need a server, network, or API key — it wires a `SSEDecoder` to a fake response and shows the parser dropping the events in process.

## Story 2: replay determinism is both a hidden trap and a moat

While fixing the HITL wire format I almost shipped a subtle bug.

To let `session_manager` observe the in-progress conversation state, I mutated the messages list inside `agent_fn`. All unit tests passed. Then I ran it against a real LLM: first LLM call → tool call → HITL pause → user approval → resume… `ReplayDivergenceError`.

The Castor kernel uses a syscall journal for deterministic replay. When it resumes an agent that was paused for HITL, it re-runs `agent_fn` from syscall index 0 and requires every syscall request to match the original recording **byte for byte**. By mutating `messages`, I'd changed the bytes of the first LLM request, so the hash no longer matched.

Fix (commit `dcf3bae`): expose the in-progress conversation through a separate side-channel `latest_conversation` list that `session_manager` reads, and never write back into `messages`.

This is the cost of a deterministic agent runtime. It's also what it buys you. Anthropic hasn't paid this cost, which is why Anthropic can't ship fork, scan, or replay. It's not a feature count — it's an architectural property.

## Story 3: Postgres surfaced a bug SQLite had been hiding

I added PostgreSQL support. SQLite tests all passed. After flipping to Postgres, `test_tool_confirmation_modify` hung — 0% CPU, no progress for 11 minutes.

The cause: an API route was dispatching background work via `asyncio.create_task(handle_user_message(db, ...))`, passing the request's DB session into the task. When the request returned, FastAPI closed that session. The background task was still using it.

In-memory SQLite hides this — every connection shares the same in-process state, so a "closed" session isn't really closed. Postgres really closes the connection, so the background task grabs a dead handle and waits forever.

Fix (commit `26df53a`): background tasks must open their own session instead of borrowing the request's. This isn't in the FastAPI docs, but it's a rake everyone steps on eventually.

The goal of this work was "add PostgreSQL." The side effect was "make the architecture correct."

## Story 4: a few features that look unrelated are actually the same architectural bet

The endpoints Anthropic structurally can't ship:

- `POST /v1/sessions/{id}/scan` — run the agent speculatively and return everything it intends to do, so a human can review before any of it commits.
- `POST /v1/sessions/{id}/fork` — branch a new timeline from any syscall index.
- `GET /v1/sessions/{id}/budget` — live view of consumption per resource type.
- `modify` on `user.tool_confirmation` — agent wants to do X, human says "X is wrong, do Y instead", agent receives Y and continues.

All four together are under 200 lines of server code. The reason is that the Castor kernel is *already* a deterministic, pausable, replayable, forkable runtime. These endpoints just expose capabilities the kernel already has over HTTP.

Anthropic's agent runtime isn't built that way. Their agents are stateless transformer calls plus tool use. To add fork, you'd have to rebuild the runtime model. That's the architectural moat — not the number of features.

Picture an agent that picks the wrong branch on step 7. On Anthropic, you start over. On `castor-server`, you fork from step 6, take the other branch, and run both timelines in parallel to compare. That's not an agent feature. That's a property of the agent *runtime*.

## Hard numbers

- API surface: ~85% coverage (agents / sessions / events / environments / models / files all working).
- 138 tests passing (SQLite and Postgres).
- LLM providers: any model through LiteLLM (Claude, OpenRouter, OpenAI, local, mock).
- Sandbox: Roche — bash runs inside an isolated Docker container, the host filesystem isn't visible.
- Storage: SQLite (local) or PostgreSQL (production).
- Upstream SDK bugs found and reported: 1.

## What's not done yet

- **Vault.** Anthropic has it, we don't. This is the part of Managed Agents that's closest to a product rather than a protocol — it isn't "a few endpoints", it's an end-to-end secret management story.
- **Full Skills support.** Partially wired up; the rest of the surface is still being filled in.
- **Multi-tenant auth.** Currently a single global API key (`CASTOR_API_KEY`). Going multi-tenant means per-tenant keys plus quota.

If your use case needs any of the three, `castor-server` is not a 1:1 drop-in for Anthropic Managed Agents today. For everything else — single-tenant self-hosting, auditing agent behavior, forking timelines, running models that aren't Claude — it's ready right now.

## Why bother

Not to compete with Anthropic. Because a deterministic agent runtime should exist, and it shouldn't be the private property of any one company.

Managed Agents is a good protocol: clean HTTP wire format, sensible event model, the right HITL primitives. But today it's locked behind one cloud, runs one model family, and bills by the session-hour. That's exactly the position S3 was in — a good protocol, a closed product, billed by the hour. Then MinIO showed up.

Once the protocol is public, the open-source replacement is inevitable. `castor-server` just makes "inevitable" arrive sooner.

---

- Code: [github.com/substratum-labs/castor-server](https://github.com/substratum-labs/castor-server)
- SDK bug standalone reproducer: [sdk_bug_repro.py](https://github.com/substratum-labs/castor-server/blob/main/scripts/sdk_bug_repro.py)
- Castor kernel: [pypi.org/project/castor-kernel](https://pypi.org/project/castor-kernel/) ([source](https://github.com/substratum-labs/castor))
