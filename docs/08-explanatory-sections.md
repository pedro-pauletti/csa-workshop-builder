# 8. Explanatory sections — Northwind

## Goal

Enrich each of the six Northwind sections (Coverage Lookup, Claim Status,
Provider Search, EOB Extraction, Evaluation Scorecard, Roadmap) with the
**didactic content** that makes a workshop teach, not just demo.

## Why it matters

A blank section says "demo goes here". A great section frames the concept,
shows the architecture, runs the demo, and proves the outcome. This is where
customer trust is earned.

## Inputs

- Generated app skeleton.
- Customer scenario and requirement IDs.

## Step-by-step

For each section, add the following content blocks:

1. **Customer context** — one paragraph linking back to the scenario.
2. **Learning objective** — one sentence.
3. **Requirement mapping** — list of requirement IDs covered.
4. **Concept explanation** — short, plain language.
5. **Architecture diagram** — Mermaid block.
6. **Demo placeholder** — to be filled in [Module 8](09-interactive-demos.md).
7. **Presenter notes** — talking points and timing.
8. **Success criteria** — observable outcomes.
9. **Fallback** — what to do if the live demo fails.

## Copilot prompt

```text
For every section under sections/, add the following content blocks using the
Jinja2 templates already in the project:

- Customer context (1 paragraph, references customer-scenario.md)
- Learning objective (1 sentence)
- Requirement mapping (bullet list of requirement IDs from agenda.md)
- Concept explanation (plain language, no jargon)
- Architecture diagram (Mermaid)
- Demo placeholder (leave a clearly marked TODO block)
- Presenter notes (3–5 bullet points)
- Success criteria (3 observable outcomes)
- Fallback (1 paragraph: what to show if the live demo fails)

Keep the content reusable. Do not hard-code customer name in templates;
read it from a single config file.
```

## Expected output

Every section now has consistent didactic content; only demos remain as
clearly-marked TODOs.

## Worked example — Northwind "Claim Status" (gold sample)

This is the gold-sample section. Copy its structure into the other five
Northwind sections.

```markdown
# Claim Status

> **Mapped requirement(s):** R3, R6
> **Time on stage:** ~18 minutes (8 explain, 7 demo, 3 Q&A)
> **Demo file:** data/claims.json
> **Section folder:** sections/claim_status/

## Customer context

Marcus (Director, Claims Ops) opens 28% of his weekly tickets because
a member called the call centre and the agent could not explain
*where* a claim was in flight. The agent had to alt-tab between
three systems and read codes the member did not understand. This
demo shows the same question answered in one screen, in plain
English, with a timestamp the member can trust.

## Concept

A claim moves through five canonical states: received → validated →
adjudicated → paid → notified. Each state is owned by a different
back-end system and emits an event. MemberAssist subscribes to
those events, normalises them to the canonical timeline, and renders
them with the source system and last-updated timestamp. Nothing is
computed; we show the truth that already exists.

## Demo

Open /sections/claim_status and run the happy-path claim
NW-CLM-2025-0418-77321, then switch to the failure-path claim
NW-CLM-2025-0301-44102 (pended for COB) and walk the human-handoff
modal.

## Evidence

The right-panel payload, source-system badges, and trace passed to
the handoff modal — all three pulled from data/claims.json so the
audience can see "what the model saw".

## Presenter notes

- Open with Marcus's number: "28% of your weekly escalations are
  variants of where is my claim. We're going to remove that ticket."
- For the pended claim, *do not* skip the handoff modal. Compliance
  watches for it.

## Common pitfalls

- Demoing only the happy path. The failure path is what makes the
  evaluation demo credible later.

## Next

EOB Document Extraction. Same claim ID, now we open the EOB.
```

Full source:
[`samples/northwind-memberassist-workshop/sections/`](https://github.com/pedro-pauletti/csa-workshop-builder/tree/main/samples/northwind-memberassist-workshop/sections)

<div class="tips" markdown>
**Section writing tips**

- One sentence of business framing > three paragraphs of feature spec.
  The audience will not read the third paragraph.
- Mermaid diagrams must fit at 1080p without zoom. If you have to zoom,
  split into two diagrams.
- Presenter notes are written for *you* a month from now. Include the
  literal sentence you say while the demo loads.
- Demo *one* failure case explicitly. Audiences trust dashboards that
  admit imperfection more than dashboards that show only green.
- Each section's last line should hand off to the next section by
  title. Builds a thread the audience can follow.
</div>

### Drop-in section template

Copy this into any new section template (`sections/<slug>.html` or markdown):

````markdown
## Customer context
One paragraph linking back to customer-scenario.md.

## Learning objective
One sentence — what the audience leaves knowing.

## Requirement covered
R1, R3

## Concept
Plain-language explanation. No marketing.

## Diagram
```mermaid
flowchart LR
  U[User] --> A[API] --> S[Service] --> E[Evidence]
```

## Demo
{% include "demos/chat.html" %}

## Evidence
- Trace ID, token usage, cost.
- Groundedness score, citations.

## Presenter notes
- 30-second exec framing.
- Where to slow down.
- Likely audience questions + answers.

## Fallback
If the live demo fails, show the recorded clip at `static/clips/<slug>.mp4`
and walk through `data/<slug>.json`.
````

![Explanatory section layout](assets/images/section.svg){ .screenshot }

## Validation checklist

- [ ] All sections share the same content structure.
- [ ] Customer name comes from one config file.
- [ ] Each section lists the requirement IDs it covers.
- [ ] Presenter notes exist for every section.

## Common issues

!!! warning "Inconsistent tone across sections"
    Likely cause: Copilot generated each section in isolation. Re-prompt with
    "Match the tone and structure of section 01 across all sections."

## Next step

Continue to **[9. Add interactive demos](09-interactive-demos.md)**.

<div class="module-step"><span class="pill">Module 8 of 12</span> Sections are educational. Next: wire up the mocked interactivity.</div>
