# 1. Accelerator pattern (workshop design principles)

!!! tip "If you already ran the Fast path"
    This module explains **why** the generated app is shaped the way it is, so
    you can customize it without breaking the pattern.

## Goal

Internalize the design principles that separate a *demo tour* from an
*engaging, customer-specific workshop*.

## Why it matters

A workshop without principles becomes a feature parade. Customers disengage,
executives lose context, and architects can't connect what they saw to their
own roadmap. Principles give you a repeatable bar of quality across every
customer engagement.

## Weak vs Strong workshop

| Weak workshop | Strong workshop |
|---|---|
| "Let me show Azure AI Search." | "Contoso Outdoor needs grounded benefits answers with citations; this demo shows retrieval, citations and evaluation against R1." |
| "Here is a chatbot." | "This chat answers a member-services scenario, shows sources, and includes the human-handoff path compliance asked for." |
| "We score the answers." | "We surface a PHI-leak gauge so compliance can audit drift week over week — currently in warn state and here is the open incident." |
| Live demos with no fallback. | Every live demo has a screenshot + recorded clip fallback **and** an explicit failure-path demo. |
| One narrative aimed at architects. | Dual narrative — 30-second executive framing + technical deep-dive, and demos that make sense to both. |
| Demos jump between unrelated datasets. | Every demo shares one through-line (one member, one claim, one EOB) so the audience builds intuition. |

<div class="tips" markdown>
**Design tips from real engagements**

- Open every section with the *business* sentence first. The architecture
  sentence comes second. Always.
- Use one consistent persona name across the whole workshop. The audience
  remembers Rosa; they do not remember "the user".
- Pick demos that share data. Same member, same claim, same EOB.
  Audiences build intuition you don't have to teach.
- Reserve the last 15 minutes for the customer's roadmap, not your slides.
  Whiteboard, photographed, attached to the engagement notes.
- Print a one-page executive map (requirements → demos → outcomes) and
  hand it out before you start. The execs who arrive late will use it.
</div>

## Inputs

- A rough idea of the customer and the Microsoft product(s) in scope.
- Permission to think before building.

## Step-by-step

1. Anchor on the **customer's business challenge**, not the product feature
   list.
2. Map **every demo to a requirement** — if you can't, drop the demo.
3. **Explain before you demonstrate.** Concept → architecture → demo → evidence.
4. Show **evidence**, not just a happy path: traces, logs, scores, citations.
5. Always have a **fallback**: pre-recorded clip, screenshot, mocked response.
6. Build a dual narrative: an **executive layer** (outcomes, risk) and a
   **technical layer** (architecture, code, ops).
7. **Separate generic from customer-specific** content so you can reuse 80%.

## Copilot prompt

```text
You are helping me design a customer workshop.
Critique this draft outline against these principles:
- Anchored on customer business challenge
- Each demo maps to a requirement
- Explain-before-demo flow
- Evidence shown for every demo
- Fallback for every live element
- Dual narrative (executive + technical)
- Generic vs customer-specific content separated

Outline:
[paste your draft outline]

Return: a table of (principle, score 1–5, what to fix).
```

## Expected output

A short critique table that highlights weak spots before you invest in building
content.

## Validation checklist

- [ ] Every section ties back to a stated business challenge.
- [ ] No demo exists without a mapped requirement.
- [ ] Each demo has an explicit fallback strategy.
- [ ] You can summarize the workshop in one executive sentence.
- [ ] You can summarize the workshop in one architect sentence.

## Common issues

!!! warning "Symptom: demos feel disconnected"
    Cause: requirements are implicit. Fix: write them down and tag every
    demo with the requirement IDs it covers.

!!! warning "Symptom: executives tune out after 15 minutes"
    Cause: missing executive layer. Fix: open every section with a 30-second
    business framing before going technical.

## Next step

Continue to **[2. Define the customer scenario](03-customer-scenario.md)**.
