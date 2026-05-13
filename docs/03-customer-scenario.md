# 2. Customer scenario — Contoso Outdoor Search

## Goal

Produce the **`customer-scenario.md`** for Contoso Outdoor Search — a single-page
document that becomes the source of truth for everything downstream: SKILL,
agenda, demos, narrative, evaluation set.

## Why it matters

The scenario forces alignment **before** you write code or prompts. It's the
artifact you share with the account team to confirm you're building the right
workshop. For Contoso Outdoor, this is the only document the four named stakeholders
read before the workshop — so the words there set the rest of the engagement.

## Inputs

- Discovery notes from the account team.
- The customer's industry, size, region.
- Microsoft products in scope.
- The named stakeholders who will attend.

## Step-by-step

1. Copy `templates/customer-scenario.template.md` into a new file under your
   working folder (e.g.,
   `samples/contoso-outdoor-search-workshop/customer-scenario.md`).
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

## Contoso Outdoor Search — the scenario you will use across modules 3–12

> Read this once and refer back to it. Every subsequent module is built on top
> of these requirements.

**Customer:** Contoso Outdoor (fictional DTC outdoor-gear retailer, ~$340 M ARR, ~12 000 SKUs)
**Audience:** VP Digital Commerce, Director of Search & Discovery, Principal Architect, Responsible-AI Lead
**Microsoft products in scope:** Azure AI Search, Azure AI Foundry, Azure OpenAI, Azure App Insights, Microsoft Purview
**Workshop objective:** Align stakeholders on a credible Azure-AI-Search-powered
search + grounded chat experience for the storefront, and socialize a 90-day
pilot architecture.

### Operational context

8 M storefront sessions/month · 22 % zero-result rate on natural-language
queries · 11 % session-to-cart conversion on search-led journeys. Top three
pain points: synonym/intent gaps ("warm jacket" misses "insulated parka"),
no answer surface for buyer-guide questions, and no grounded-chat experience
that cites a product page.

### Audience matrix

<div class="persona-grid" markdown>
<div class="persona" markdown>
**Rosa Aoyama** <em>VP Digital Commerce</em>
Lift search-led conversion without ballooning paid-search spend.
</div>
<div class="persona" markdown>
**Marcus Boateng** <em>Director, Search &amp; Discovery</em>
Hybrid + semantic ranking that beats the legacy keyword engine on relevance.
</div>
<div class="persona" markdown>
**Hana Whitlock** <em>Principal Architect</em>
Retrieval architecture that is auditable and not locked into one vendor.
</div>
<div class="persona" markdown>
**Daniel Erskine** <em>Responsible-AI Lead</em>
Grounded answers, content filters, refusal on low confidence, traceable evals.
</div>
</div>

### Requirements

| ID | Requirement |
|---|---|
| R1 | Natural-language search over the live product catalog returns relevant items even when query terms and product copy share no overlapping vocabulary. |
| R2 | A grounded chat assistant answers "which product should I buy for …?" questions, citing the product pages it used and refusing when it lacks evidence. |
| R3 | Buyer-guide content (sizing, materials, returns policy) is searchable in the same index as products, with the same hybrid + semantic ranking. |
| R4 | Filters and facets (category, price band, in-stock) work alongside relevance ranking, not against it. |
| R5 | Every response is scored on **groundedness**, **answer relevance**, **retrieval recall**, and **latency**; a scorecard is visible to the team on every PR. |
| R6 | Low-confidence answers route to a human associate, with the full chat trace pre-loaded. |

### Success criteria (observable in the room)

1. Each persona names which demo covers which requirement without a cheat sheet.
2. Responsible-AI lead can articulate the groundedness check in their own words.
3. Architecture team agrees the design is not vendor-locked.
4. VP Digital Commerce commits to a 30-day pilot on 5% of search traffic.
5. The 30/60/90 roadmap slide gets at least one concrete edit from the room.

### Constraints / out of scope

- No real PII. Synthetic catalog and synthetic logs only.
- Demos must run **offline** during the executive read-out.
- Read-only for v1 — nothing writes back to the catalog or order system.

Full source:
[`samples/contoso-outdoor-search-workshop/customer-scenario.md`](https://github.com/pedro-pauletti/csa-workshop-builder/tree/main/samples/contoso-outdoor-search-workshop)

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

Continue to **[3. SKILL.md for Contoso Outdoor](04-create-skill.md)** — where you
turn this scenario into a contract Copilot follows when scaffolding the app.

<div class="module-step"><span class="pill">Module 2 of 12</span> Contoso Outdoor scenario captured. Next: the SKILL contract.</div>
