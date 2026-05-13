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

## Worked example — Northwind MemberAssist (full)

The recurring worked example used across this tutorial.

??? example "Show full Northwind scenario"

    **Customer:** Northwind Health (fictional regional US health plan, ~1.2M members)
    **Audience:** VP Member Services, Director Claims Ops, Plan Architect, Compliance Officer
    **Microsoft products in scope:** Azure AI Foundry, Azure AI Search, Azure App Insights, Microsoft Purview
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
    | R3 | Resolve claim-status questions with a visual timeline (received → adjudicated → paid → notified) sourced from a mock claims feed. |
    | R4 | Extract structured fields from an Explanation-of-Benefits (EOB) PDF and explain each charge in plain English. |
    | R5 | Score every response on groundedness, harm, and **PHI leakage**; expose a dashboard the compliance team can audit. |
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
