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
