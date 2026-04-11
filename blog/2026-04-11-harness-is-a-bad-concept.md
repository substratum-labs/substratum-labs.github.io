---
slug: harness-is-a-bad-concept
title: "Why 'harness' is a bad concept"
tags: [agents, architecture, critique]
---

Over the past few months the term "agent harness" has caught fire in AI engineering circles. To figure out what people actually meant by it, I read through four of the most representative articles. Here are the definitions they give:

> "the layer that connects, protects, and orchestrates components without doing the work itself"
> — [Inngest](https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework)

> "every piece of code, configuration, and execution logic that isn't the model itself"
> — [LangChain blog](https://blog.langchain.com/the-anatomy-of-an-agent-harness/)

> "everything in an AI agent except the model itself"
> — [Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html)

> "the interface between a model's outputs and actual code changes, including tool schemas, error messages, state management..."
> — [Can.ac](https://blog.can.ac/2026/02/12/the-harness-problem/)

They share a common shape: **harness ≡ not-model**. Not one of these articles actually defines what a harness *is*. They all define it by what it *isn't*.

<!-- truncate -->

After reading them I ended up with three concrete complaints, and taken together they convince me that "harness" doesn't hold up as a concept. Here they are in order.

---

## 1. "Everything except the model" is a negative definition

A good abstraction tells you what it *is*, what its interface is, what invariants it upholds. "Everything except the model" tells you none of that. It only tells you what it *isn't*.

Here's an analogy. Suppose we defined an operating system like this:

> OS = everything except the CPU

This is true, but useless. It gives you no way to ask whether a system has a good operating system, how two operating systems differ, or which one fits your use case better. There's no internal structure inside "everything except the CPU."

"Agent = Model + Harness" is the same kind of definition. It treats the harness as a **complement set**, not as an abstraction with internal structure and a clear definition. Every discussion of harnesses then degenerates into "my harness has component X, yours has component Y," a feature checklist. You can never ask "is this harness *correct*" because there's no standard for correctness. What you end up with is a junk drawer.

**The counter-example:** the Unix kernel isn't defined this way. The Unix kernel is defined by its **interface**. Seven or eight primitives: processes, files, pipes, signals, system calls. It tells you what it is by telling you *what can cross its boundary*. Anyone who reads the Unix kernel spec can decide whether the service they're writing is kernel-level, and whether two kernels agree with each other on POSIX. That's a **positive definition**.

"Harness" has nothing like this. No equivalent of a syscall, no cross-boundary contract, no invariant. It's just "a pile of code around the LLM." That isn't an abstraction. It's an excuse to stop thinking.

---

## 2. It collapses five distinct layers into one name

Look at the list of "harness components" the LangChain and Inngest pieces enumerate:

- System prompts
- Tool schemas / MCP descriptions
- Filesystem / sandbox / browser
- Orchestration (subagent spawning, model routing)
- Hooks / middleware
- Retry logic / job queues / event routing
- Observability / tracing
- Memory / RAG / context compaction
- Error message formats
- Edit formats (patch / str_replace / hashline)

Spread this list out and it spans at least **five** layers that in any mature system would be kept separate:

| Layer | Examples from the list |
|---|---|
| **Application code** | System prompts, the agent's task-specific logic |
| **Protocol / interface** | Tool schemas, edit formats, MCP descriptions, error message formats |
| **Runtime execution model** | Orchestration, subagent spawning, handoff |
| **OS-level services** | Filesystem, sandbox, browser, network isolation |
| **Infrastructure** | Job queues, retry logic, event routing, state persistence |

In any mature distributed system (AI or not), these five layers have different vocabularies, different owners, and different rates of change. Nobody would put "my struct field naming convention" and "my Kubernetes pod scheduler" in the same bucket. Yet harness talk crams them into a single word.

Why does this matter? Because **the boundaries between layers decide what you can reuse, what you can swap out independently, and what you can test in isolation**. When you call both "byte-level tool schema design" and "background task retry logic" your harness, you lose the ability to say "I want a better tool schema without touching my retry stack." One word has welded them together, and the discussion can only happen at the welded layer.

The Can.ac article is a good illustration. The author ran a very solid experiment: he changed the edit format (his "hashline") for a fixed model, and Grok Code Fast 1's pass rate on 180 React bug-fix tasks jumped from 6.7% to 68.3%, a 10x improvement. This is an important finding. But he named it "the harness problem" and concluded "harnesses matter a lot."

That naming **actively obscures what the finding actually is**. It's not a harness problem. It's an **interface protocol problem**: a mismatch between the byte-level design of tool schemas and the training distribution of the model. The finding should push the industry to rethink tool schema design. Instead it just made the "harness" bag a bit fatter.

The cost of calling everything a harness is this: **you lose the ability to analyze any of it clearly.**

---

## 3. "An all-encompassing harness" is the wrong direction

Martin Fowler's piece explicitly splits the harness into two layers:

> **Built-in harness** (by the agent builder): system prompts, code retrieval mechanisms, orchestration systems
>
> **Outer harness** (by users): customized guides and sensors for specific use cases

Fowler has noticed that treating the harness as a single concept has problems, and he's trying to carve some internal structure out of it. That's a good instinct.

But carving a line through it doesn't actually solve the problem. It just changes its shape. The real question isn't "how many times should the harness be subdivided?" but **"is an all-encompassing harness even the right direction to be going in?"**

Look at what other domains have answered.

Unix's success came from **subtraction**, not addition. It didn't try to build an "all-encompassing shell environment." It cut functionality down to minimal primitives: files, processes, pipes, signals. Each primitive held its own interface, and they composed through stable conventions. You can chain `grep | sort | uniq` into a new task because each program does one thing with a clean boundary.

SQL is the same story. The database pulled "how to store" and "how to query" out of the application, so the application no longer had to care about storage formats, index structures, or concurrency control. Applications got simpler because the database layer established a stable contract.

HTTP is also subtraction. It only defines the semantics of requests and responses. It doesn't care what the content is. It doesn't care what the application does. The entire web is built on that one small contract.

Every one of these is **an act of pulling responsibility out of a large abstraction and turning it into an independent layer with a clear boundary**. Each split made the system more composable, more reusable, more independently evolvable.

"Harness" is doing the opposite. It takes things that should be separate, stuffs them all into one word, and then tries to solve every problem inside that word. Fowler's built-in/outer split is a belated admission that "this word is carrying too much, it needs a cut." But one cut isn't enough, because the root problem isn't the number of cuts. **It's that the word was never supposed to hold everything in the first place.**

Fowler is already reflecting on the harness's structure. There's a question going around right now that pushes his reflection one step further. "Should memory be inside the harness?" isn't a deep enough question. The real question isn't whether memory is *in* the harness. It's: **is memory its own layer? What's its contract? Can any runtime plug into it?** If the answer is "memory is not its own layer," then you can't move an agent from one harness to another, because its memory travels with the harness.

Ask the same thing about tool schemas, orchestration, sandboxing, retry logic, observability. For every one of them, ask: **is this its own layer, or is it part of a harness?** Answer honestly, and you'll find that almost all of them should be their own layer. What's left that can legitimately stay inside "harness" keeps shrinking.

Eventually you notice that the only thing that really belongs in a word called "harness" is **the small piece of application code each agent author writes, plus a bit of glue**. Everything else should be broken out into independent subsystems with real contracts. In other words, once you factor honestly, the word "harness" has no content left. What remains is just "my agent code."

That's why I don't think "an all-encompassing harness" is a direction worth pursuing. Its appeal comes from the illusion that one word can solve every problem. But **the last fifty years of systems engineering have been heading in the opposite direction**: splitting the problems a single word was supposed to cover into several independent problems, each with its own answer. Head that way, and the word "harness" eventually evaporates.

---

## What's actually wrong with the word

To restate the three points:

1. **The definition is residual.** There's no internal structure or interface contract, nothing to falsify, nothing to evaluate.
2. **It collapses five distinct abstraction layers into a single word**, stripping you of the vocabulary to tell them apart.
3. **The direction is backwards.** The last fifty years of systems engineering have progressed by splitting big abstractions into independent layers with clear boundaries. Harness is doing the opposite: shoving things that should be separate into a single word.

Taken together these make me think "harness" isn't just imprecise. It's a **harmful** word. Its breadth is what prevents you from even discussing the questions that matter:

- What's the execution model?
- What invariants does it uphold?
- Where does its trust boundary sit?
- Can its state be observed, paused, resumed, forked?
- Are memory / tool schema / sandbox their own layers?

These are the real questions of runtime design. Any serious agent system will have to answer them eventually. But as long as you package it all up as "harness," you can route around them, the same way "everything except the CPU" lets you route around "what an operating system actually is."

I'm not saying the things discussed under the harness label don't matter. They do. What I'm arguing against is that the word turns those things into "a stack of features to add" instead of "a layer that needs to be designed with care." The difference between those two stances, ten years out, will decide whether agent systems can actually scale.

If you're building agent tooling, next time you're about to say "our harness does X," stop and ask: **which layer is X on?** Application code, protocol, runtime, OS service, or infrastructure? If you can't answer, it isn't that the abstractions are too fine-grained. It's that you haven't worked that layer through yet.
