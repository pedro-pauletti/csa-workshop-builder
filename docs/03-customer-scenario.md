# 2. Customer scenario — Northwind MemberAssist

## Goal

Produce the **`customer-scenario.md`** for Northwind MemberAssist — a single-page
document that becomes the source of truth for everything downstream: SKILL,
agenda, demos, narrative, evaluation set.

## Why it matters

The scenario forces alignment **before** you write code or prompts. It's the
artifact you share with the account team to confirm you're building the right
workshop. For Northwind, this is the only document the four named stakeholders
read before the workshop — so the words there set the rest of the engagement.

## Inputs

- Discovery notes from the account team.
- The customer's industry, size, region.
- Microsoft products in scope.
- The named stakeholders who will attend.

## Step-by-step

1. Copy `templates/customer-scenario.template.md` into a new file under your
   working folder (e.g.,
   `samples/northwind-memberassist-workshop/customer-scenario.md`).
2. Fill in customer, industry, audience, products, business challenges,
   workshop objective, and success criteria.
3. List **3–7 explicit requirements** — short, testable statements.
4. Review with the account lead before continuing to module 3.

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

## Northwind MemberAssist — the scenario you will use across modules 3–12

> Read this once and refer back to it. Every subsequent module is built on top
> of these requirements.

**Customer:** Northwind Health (fictional regional US health plan, ~1.2M members)
**Audience:** VP Member Services, Director Claims Ops, Plan Architect, Compliance Officer
**Microsoft products in scope:** Azure AI Foundry, Azure AI Search, Azure AI Document Intelligence, Azure App Insights, Microsoft Purview
**Workshop objective:** Align stakeholders on what *MemberAssist* will and
will not do, and socialize a credible architecture for a 90-day pilot.

### Operational context

22k calls/week · 7m12s AHT · 64% FCR. Top three drivers: benefits-coverage
(38%), claim-status (29%), provider search (14%).

### Audience matrix

<div class="persona-grid" markdown>
<div class="persona" markdown>
**Rosa Aoyama** <em>VP Member Services</em>
Reduce handle time and complaint volume without inflating QA cost.
</div>
<div class="persona" markdown>
**Marcus Boateng** <em>Director, Claims Ops</em>
Claim-status answers that match the source-of-truth adjudication system.
</div>
<div class="persona" markdown>
**Hana Whitlock** <em>Plan Architect</em>
Architecture that does not lock the plan into one vendor.
</div>
<div class="persona" markdown>
**Daniel Erskine** <em>Compliance Officer</em>
PHI safeguarding, auditability, fallback to human, traceable evals.
</div>
</div>

### Requirements

| ID | Requirement |
|---|---|
| R1 | Answer benefits questions grounded in current plan documents with inline citations to the document and section. |
| R2 | Return a ranked provider-directory result given member location, specialty, and in-network status; show why each provider was ranked. |
| R3 | Resolve claim-status questions sourced from the adjudication store (read-only), surfacing the same numbers the back-office sees. |
| R4 | Extract structured fields from an Explanation-of-Benefits (EOB) document and explain each charge in plain English. |
| R5 | Score every response on **groundedness**, **relevance**, **latency**, and **PHI leakage**; expose a dashboard the compliance team can audit. |
| R6 | Hand off to a human agent on low-confidence answers, with the full conversation trace pre-loaded. |

### Success criteria (observable in the room)

1. Each persona names which demo covers which requirement without a cheat sheet.
2. Compliance can articulate the PHI safeguards in their own words.
3. Architecture team agrees the design is not vendor-locked.
4. VP Member Services commits to a 30-day pilot with two named call-centre agents.
5. The roadmap slide gets at least one concrete edit from the room.

### Constraints / out of scope

- No real PHI. Synthetic data only.
- Demos must run **offline** during the executive read-out.
- Read-only for v1 — nothing is written back to the claims system.

Full source:
[`samples/northwind-memberassist-workshop/customer-scenario.md`](https://github.com/pedro-pauletti/csa-workshop-builder/tree/main/samples/northwind-memberassist-workshop)

<div class="tips" markdown>
**Scenario writing tips**

- Vendor-neutral, testable requirements only. "Use Azure OpenAI" is not a
  requirement; "answer benefits questions with inline citations" is.
- Personas need a **name** and a one-line "what they care about". Anonymous
  personas don't pull through to the demo narratives.
- Success criteria must be **observable in the room**, not "post-engagement".
  "VP commits to a pilot" is observable. "Customer is excited" is not.
- 6 ± 1 requirements is the sweet spot. Three is too few to hang a half-day
  on; nine is too many to map cleanly to demos.
</div>

## Validation checklist

- [ ] One sentence explains the workshop to an executive.
- [ ] Every requirement is testable (you can answer "did the demo cover it?").
- [ ] Audience and products are specific (no generic "stakeholders").
- [ ] Success criteria are observable.

## Common issues

!!! warning "Vague requirements"
    "Improve member experience" is not testable. Rewrite as: "Answer benefits
    questions in under 3 s with inline citations to the plan document."

!!! warning "Persona-less audience"
    "Member services leaders" doesn't pull through. Use the four names above —
    Rosa, Marcus, Hana, Daniel — for every demo from here on.

## Next step

Continue to **[3. SKILL.md for Northwind](04-create-skill.md)** — where you
turn this scenario into a contract Copilot follows when scaffolding the app.

<div class="module-step"><span class="pill">Module 2 of 12</span> Northwind scenario captured. Next: the SKILL contract.</div>
