---
slug: not-a-harness-an-os
title: "Not a harness. An OS."
authors: [substratum-labs]
tags: [agents, architecture, castor]
---

In our [previous post](../harness-is-a-bad-concept), we analyzed three problems with the concept of "harness": a residual definition, layer collapse, and the wrong direction. The next question is: how should the components of an agent system actually be structured?

The answer isn't new. Every mature area of software has followed the same path: everything starts mixed together, then someone draws the boundaries, gives each component a name, an interface, and a set of invariants, and assembles them into a coherent structure. Operating systems did this for hardware. Databases did this for storage. HTTP did this for networking.

Agent systems haven't done it yet. The word "harness" exists because **there is no clear structure**. This post is our attempt at one.

<!-- truncate -->

---

## Three layers, not a blob

We think an agent system can be divided into three layers. Each layer has a distinct functional role and trust level:

![Agent OS: Three Layers, Three Protocols](/img/agent-os-layers.svg)

### Agent

This is what the user writes. Task logic, system prompts, ReAct loops, decision chains.

In this structure, agents don't need to call LLM APIs directly, don't need to read or write memory backends directly, and don't need to execute tools directly. An agent issues syscall requests to the kernel through a fixed protocol, and the kernel handles execution on its behalf. The agent says "I want to do X" without needing to know how X happens underneath.

Why shouldn't agents touch resources directly? Three reasons:
1. **Simplify agent code.** If every agent manages its own memory, calls its own LLM, handles its own retries, every agent is reinventing the same infrastructure. Push the common work down a layer and let agents write only task logic.
2. **Define responsibility boundaries.** Who is responsible for budget enforcement? For replay determinism? If the answer is "each agent handles it," every agent has to get it right, and one mistake breaks the whole thing. If the answer is "the kernel," correctness only needs to be guaranteed once.
3. **Resource sharing.** A single agent calling an LLM directly works fine. But when multiple agents share resources, problems appear: LLM rate limits, budgets that need to be carved from parent to child, memory that needs isolation between agents, contention that requires priority arbitration. These are problems of **allocation, isolation, and arbitration**, for the exact same reasons operating systems manage CPU, memory, and disk.

The analogy: a Unix user program doesn't write to raw disk sectors, it calls `write()`. It doesn't manage memory pages, it calls `malloc()`. The syscall is the only boundary between user and kernel.

### Tools & Apps

This is the semi-trusted execution layer. It contains two kinds of things:
- **Tools**: extensions of the agent's capabilities. bash, read_file, web_search, MCP servers. Agents invoke them through the kernel to interact with the outside world.
- **Apps**: the human entry point into the system. API gateways, dashboards, CLIs. These are applications that let developers and operators manage agents (HITL approval, budget adjustments, log inspection).

Tools serve agents. Apps serve humans. They share a layer because their trust level is the same: both are semi-trusted, with permissions granted and limited by the kernel.

Why aren't tools in the same layer as agents? Because **agents and tools have different trust levels**. An agent is fully untrusted: it might have bugs, it might try to do things it shouldn't. A tool is semi-trusted: bash really can execute commands, read_file really can read files, but their permissions should be constrained (scope-limited, single-use, expiring).

In this design, **agents cannot call tools directly**. An agent sends a syscall to the kernel. The kernel checks capabilities, deducts budget, then forwards the request to the tool. The tool executes, the result flows back through the kernel (which writes it to the journal), and then back to the agent. This means an agent cannot bypass budget or capability enforcement to execute a tool.

Tool execution is also not fire-and-forget. The kernel and tool need bidirectional communication: the kernel can cancel execution or inject input; the tool can stream output, report progress, or request additional input. This is the same feedback mechanism humans rely on when using tools: you feel the hammer hit, you see the screen update. Tool use without feedback is blind operation.

### Kernel

The kernel is the middle layer. It takes over the things every agent is currently forced to do itself but shouldn't:

| What agents do today | What the kernel should handle |
|---|---|
| Manage memory themselves (context window, RAG retrieval) | Memory management (eviction, promotion, search) |
| Piece together HITL logic (webhooks + polling) | HITL (suspend, resume, modify) |
| "Rerun the last execution" (or just can't) | Journal + Replay (deterministic re-execution) |
| Enforce limits with soft counters (or not at all) | Budget + Capability (hard boundaries) |
| Pick LLM providers, handle rate limits | LLM routing (provider selection, retry, fallback) |
| Run until done or crash, no external lifecycle control | Scheduling (preemption, priority, suspend/resume) |
| Crash means start over, no save points | Checkpoint (state snapshot, restore, fork) |

Move these from the agent layer to the kernel. Agents get simpler. The system gets more reliable.

Internally, the kernel can be further split into a pure decision layer (a state machine with zero I/O) and an execution layer (system services that perform actual I/O). This makes it possible to formally verify the core decision logic. But that is an internal implementation choice and does not affect the interface the kernel exposes.

---

## The contracts between layers should be protocols

Communication between the three layers should use protocols, not function calls. A key design principle: **today's function call boundary is tomorrow's protocol boundary.**

Each pair of layers needs its own protocol with its own authentication:
- **Agent to Kernel**: the agent uses a capability token to prove it has permission, issuing service requests through syscalls
- **Kernel to Tools**: the kernel uses scoped grants to authorize tool execution, with a bidirectional channel that supports streaming feedback and cancellation
- **Apps to Kernel**: humans use identity and role to manage the system (HITL approval, budget management, observability)

Three protocols. Three directions. Three authentication models. Not one API called by different roles, but **independent communication contracts between different parties**.

Why protocols instead of function calls? Because this design should support incremental evolution. Today these protocols might be in-process function calls. Tomorrow they might be IPC. The day after, gRPC. **The caller doesn't need to know whether the boundary is in-process or over the network.** The protocol stays the same.

---

## Five invariants

Regardless of how this structure is implemented, we believe the following five properties should always hold:
1. **All side effects go through the proxy.** Agents cannot produce side effects by bypassing the syscall interface.
2. **Every operation is recorded.** The journal is written by the kernel. Agents cannot tamper with it.
3. **Every operation is authorized.** No capability means physically impossible to execute.
4. **Any operation can be suspended and resumed.** HITL is a system-level primitive, not something assembled in the application layer.
5. **Any execution can be replayed from the journal.** Deterministic replay does not depend on agent cooperation.

Drop any one of these and you lose something critical:
- Drop 1: agents can bypass all controls
- Drop 2: no audit trail, no replay
- Drop 3: no security model
- Drop 4: no HITL, no checkpointing
- Drop 5: no debugging production issues, no forking

This is not a feature list. These are **invariants**: they define what the system *is*, not what it *does*. A harness has no invariants, which is why it can only ever be a feature list.

---

## The same arc

The 1970s: everything between applications and hardware was mixed together. Someone pulled the middle out, called it a "kernel," and defined syscalls. That was Unix.

The 1980s: everything between applications and storage was mixed together. Someone pulled the middle out, called it a "database," and defined SQL.

The 1990s: everything between clients and servers was mixed together. Someone pulled the middle out, called it a "web protocol," and defined HTTP.

2025: everything between agent code and resources is mixed together. People gave it a name: "harness."

We think the natural next step is the same: pull the middle apart. Not into one layer, but three. Each with its own trust level, its own functional role, its own cross-layer protocol.

Building on these ideas, we are working toward a real Agent OS.

**Castor** is the kernel layer: resource management, trust enforcement, deterministic replay, lifecycle management. It is not a framework. It is a kernel.

**Castor Server** is the entry point at the apps layer: it exposes the kernel's capabilities over HTTP/SSE to developers and external clients, providing a wire format compatible with Anthropic Managed Agents, so you can point the same `anthropic-python` code at your own Agent OS.

Together, they form a complete Agent OS.

---

castor: [github.com/substratum-labs/castor](https://github.com/substratum-labs/castor)
castor-server: [github.com/substratum-labs/castor-server](https://github.com/substratum-labs/castor-server)
