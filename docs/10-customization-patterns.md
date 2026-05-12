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

Continue to **[10. Run locally with Docker Compose](11-run-locally.md)**.
