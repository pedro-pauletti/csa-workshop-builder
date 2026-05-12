# 2. Define the customer scenario

## Goal

Produce a single-page **customer scenario** document that becomes the source of
truth for everything that follows: SKILL, agenda, demos, narrative.

## Why it matters

The scenario forces alignment **before** you write code or prompts. It's the
artifact you share with the account team to confirm you're building the right
workshop.

## Inputs

- Discovery notes from the account team.
- Customer industry, size, region.
- Microsoft products in scope.
- Stakeholders who will attend the workshop.

## Step-by-step

1. Copy `templates/customer-scenario.template.md` into a new file under your
   working folder (e.g., `samples/<customer-or-scenario>/customer-scenario.md`).
2. Fill in customer, industry, audience, products, business challenges,
   workshop objective, and success criteria.
3. List **3–7 explicit requirements** — short, testable statements.
4. Review with the account lead.

## Copilot prompt

```text
Help me turn the discovery notes below into a structured customer scenario
using this template:

[paste templates/customer-scenario.template.md]

Discovery notes:
[paste raw notes]

Output: a fully filled scenario, 3–7 explicit requirements written as short
testable statements, and a one-sentence executive summary.
```

## Expected output

A populated `customer-scenario.md` with:

- Customer, industry, audience, products in scope.
- Business challenges and workshop objective.
- 3–7 numbered requirements.
- One-sentence executive summary.

## Worked example — Contoso Telecom (Customer Service AI)

```markdown
# Customer scenario — Contoso Telecom

**Customer:** Contoso Telecom (fictional)
**Industry:** Telecommunications
**Audience:** Customer service leaders, support operations, solution architects
**Microsoft products in scope:** Azure AI Foundry, Azure AI Search, Azure OpenAI
**Workshop objective:** Show how grounded AI assistants can reduce call
handling time by 20% while preserving auditability.

## Requirements
R1. Show grounded answers with citations from internal knowledge base.
R2. Demonstrate agent-assisted next-best-action for support workflows.
R3. Demonstrate handling-time reduction with side-by-side comparison.
R4. Show evaluation: groundedness, relevance, harm scoring.
R5. Show observability: traces, token usage, cost per resolved ticket.

## Executive summary
Contoso wants a trusted, observable AI assistant for support agents that
reduces handling time without compromising compliance.
```

From raw notes to scenario:

| Raw discovery note | Becomes |
|---|---|
| "They're worried about hallucinations." | R1 — grounded answers with citations. |
| "Reps spend too long searching." | R3 — handling-time reduction demo. |
| "Risk team needs proof of safety." | R4 — evaluation scorecards. |

## Validation checklist

- [ ] One sentence explains the workshop to an executive.
- [ ] Every requirement is testable (you can answer "did the demo cover it?").
- [ ] Audience and products are specific (no generic "stakeholders").
- [ ] Success criteria are observable.

## Common issues

!!! warning "Vague requirements"
    "Improve customer experience" is not testable. Rewrite as: "Show how an
    AI agent can summarize a customer call in under 5 seconds with citations."

## Next step

Continue to **[3. Create the SKILL.md](04-create-skill.md)**.
