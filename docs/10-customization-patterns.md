# 9. Customize by product and customer

## Goal

Adapt the same workshop app skeleton to different **Microsoft products** and
different **customers** without rewriting the architecture.

## Why it matters

The reuse story is what turns this from "a one-off app" into a CSA delivery
pattern. One skeleton, many engagements.

## Inputs

- A working app skeleton (Modules 6–8).
- A new customer scenario or product focus.

## Microsoft product → demo matrix

| Microsoft product | Suggested demos |
|---|---|
| **Azure AI Foundry** | Agents, evaluations, prompt flow, model routing, tracing. |
| **Azure AI Search** | Retrieval, hybrid search, semantic ranking, grounding. |
| **Microsoft Fabric** | Lakehouse, pipelines, notebooks, semantic models, Power BI. |
| **Microsoft Security** | Incident triage, Copilot for Security, automation, investigation. |
| **Microsoft 365 Copilot** | Meeting summaries, document grounding, Teams/Outlook workflows. |
| **Dynamics 365** | Customer service, sales assistant, case summarization, next best action. |
| **GitHub Copilot** | Code generation, tests, refactoring, documentation, modernization. |

## Step-by-step (per new engagement)

1. Copy the relevant `samples/<product>/` folder as the starting point.
2. Replace `customer-scenario.md` with the new customer's scenario.
3. Update `agenda.md` to reflect the new narrative (keep 8–12 items).
4. Re-run `/plan` to validate the changes.
5. Re-generate or hand-edit only the changed sections.
6. Update demo mocks with realistic customer-flavored sample data.

## Copilot prompt

```text
I'm adapting this workshop app from [previous customer / product] to
[new customer / product].

Read the new customer-scenario.md and agenda.md. Then:
- List the sections that can be reused as-is.
- List the sections that need content changes.
- List the sections that need new demos.
- Propose updated demo mock data drawn from the new scenario.
- Flag any architecture changes (should be none if SKILL.md is respected).
```

## Expected output

A precise change list — minimal edits, maximum reuse.

## Product recipes

### Azure AI Foundry recipe

**Recommended agenda** — context · architecture · agent demo · tool calling
demo · evaluation demo · observability · roadmap.

**Recommended mock data** — multi-tool agent trace, prompt flow scorecard,
model routing decisions.

**Real integration points** — Foundry Agent Service, Prompt Flow evaluations,
Application Insights traces.

**Deliverable** — generic-foundry-workshop folder with 8 sections and the 5
mock demos pre-wired.

### Microsoft Fabric recipe

**Recommended agenda** — context · lakehouse architecture · pipeline demo ·
notebook demo · semantic model demo · Power BI · governance · roadmap.

**Recommended mock data** — pipeline run history, notebook cell outputs,
Direct Lake query timings.

**Real integration points** — Fabric REST API, OneLake, Power BI REST.

**Deliverable** — generic-fabric-workshop folder with 8 sections and demos
focused on data engineering + BI.

### Microsoft Security recipe

**Recommended agenda** — context · architecture · incident triage demo ·
Copilot for Security demo · automation demo · evaluation · roadmap.

**Recommended mock data** — sample incident, KQL queries, automation
playbook trace.

**Real integration points** — Microsoft Sentinel, Defender XDR, Copilot for
Security skills.

## Worked customization — generic → Northwind

The Northwind sample is the canonical "generic → customer" customization
worked end-to-end. Seven concrete changes, in order:

1. **Customer name and audience matrix** in `customer-scenario.md`.
2. **Compliance section** in `SKILL.md` (PHI rules + push-backs).
3. **Agenda titles** in `agenda.md` (mind the heading anchor).
4. **Branding colours and the data-classification badge** in prompt #4.
5. **All five `data/*.json` fixtures** with member-services vocabulary.
6. **The gold-sample section** name and its `data/` reference.
7. **Presenter notes** top-to-bottom.

<div class="diff-table" markdown>

| File | Generic | Northwind |
|---|---|---|
| `customer-scenario.md` | placeholders | filled (6 reqs, 4 personas) |
| `SKILL.md` | base rules | + Compliance section, + 2 push-backs |
| `agenda.md` | 9 generic items | 9 member-services items |
| `data/chat.json` | KB lookup | colonoscopy benefits Q&A + handoff |
| `data/search.json` | doc search | provider directory + ranking signals |
| `data/workflow.json` | generic flow | 5-state claim timeline + COB pend |
| `data/document.json` | invoice | EOB extraction + plain-English |
| `data/evaluation.json` | scorecards | + PHI-leak gauge in warn state |
| `sections/demo-3-claim-status.md` | placeholder | fully written gold sample |
| `presenter-notes.md` | n/a | 9 blocks, one per agenda item |

</div>

Effort: roughly **one CSA-day** end-to-end (excluding the `/plan` and
code-generation step, which the tutorial covers). The most time-consuming
file by far is the `data/*.json` set — realism is what sells.

Full diff:
[`samples/northwind-memberassist-workshop/customization-diff.md`](https://github.com/pedro-pauletti/csa-workshop-builder/tree/main/samples/northwind-memberassist-workshop/customization-diff.md)

<div class="tips" markdown>
**Customization tips**

- Customer name in *one* config file. Search the generated repo for the
  previous customer name before sharing the sample publicly.
- **Don't customize the architecture for the first 3 engagements.**
  Architecture changes burn the reuse story. Customize content.
- Keep a `customization-diff.md` per customer repo. The next CSA who
  forks your engagement (and there will be one) needs it.
- Branding colours go in **two** places: the prompt that asks Copilot to
  customize, and `static/theme.css`. Drift between the two is the most
  common visual bug.
- Keep one fictional sample (Northwind, Contoso) up to date alongside any
  real customer engagement. The fictional one is what you show in
  reusable training; the real one stays internal.
</div>

## Validation checklist

- [ ] Architecture unchanged.
- [ ] Customer name appears only in config + scenario file.
- [ ] Demo mock data feels relevant to the new customer.
- [ ] Agenda still tells a coherent narrative.

## Common issues

!!! warning "Customer name leaking into templates"
    Search the codebase for the previous customer name before sharing. Move
    every instance into the single config file.

## Next step

Continue to **[11. Publish with GitHub Pages](12-publish-github-pages.md)**.
