# 13. Customize for your customer or product

You finished modules 1–12 and have a working Northwind MemberAssist tutorial
+ live demo. **This is the only module where you replace Northwind with a
different customer or Microsoft product.** Everything you learned still
applies — only the *content* changes.

## When to use this module

- You're starting a new CSA engagement and want to keep the same scaffold.
- You want a Foundry / Fabric / Security / M365 Copilot flavor instead of
  health insurance.
- You're forking the repo internally for a customer-specific deliverable.

## The five things that always change (and only these)

If you change more than this, you're no longer customizing — you're forking,
and you'll lose the reuse story.

| # | File | What to change |
|---|---|---|
| 1 | `samples/<engagement>/customer-scenario.md` | Customer, audience matrix, requirements, success criteria. |
| 2 | `samples/<engagement>/agenda.md` | 6–9 items, each one line. |
| 3 | `samples/<engagement>/.github/skills/workshop-creation/SKILL.md` | Frontmatter (`customer`, `product_focus`, `theme`), Compliance section. |
| 4 | `data/*.json` | Every mock value, named entities, citations. |
| 5 | `static/themes/<theme>.css` | Pick one of the 5 named palettes (see module 10). |

What **never** changes:

- The agenda-driven menu rule.
- The per-section folder convention.
- `agenda_loader.py`, `sections/__init__.py`, `app.py`.
- The `base.html` template (only the embedded logo and customer-name token).
- Font Awesome 6 + Inter + JetBrains Mono.

## Microsoft product → demo matrix

Pick the row that matches your engagement and the suggested demos become your
new agenda starting point.

| Microsoft product | Suggested demos (6 items) |
|---|---|
| **Azure AI Foundry** | Agent walkthrough · Tool calling · Grounded chat · Evaluation · Tracing · Roadmap. |
| **Azure AI Search** | Index walkthrough · Hybrid query · Semantic ranker · Grounded RAG · Eval scorecard · Roadmap. |
| **Microsoft Fabric** | Lakehouse tour · Pipeline run · Notebook demo · Direct Lake query · Power BI · Roadmap. |
| **Microsoft Security** | Incident triage · Copilot for Security · Automation playbook · KQL · Evaluation · Roadmap. |
| **Microsoft 365 Copilot** | Meeting summary · Document grounding · Teams flow · Outlook flow · Eval · Roadmap. |
| **Dynamics 365** | Customer case · Next best action · Summarization · Sales assistant · Eval · Roadmap. |
| **GitHub Copilot** | Code generation · Refactor · Test writing · Docs · Modernization · Roadmap. |

## Palette swap table

| Engagement vibe | Palette (module 10) |
|---|---|
| Generic AI / Foundry | **Foundry Violet** (template default) |
| Healthcare / member services | **Northwind Teal** |
| Data engineering / Fabric | **Fabric Indigo** |
| Classic Azure / Infra | **Azure Blue** |
| Retail / FSI / FMCG | **Citrus Orange** |

Set the active palette by changing **one line** in the SKILL frontmatter:

```yaml
metadata:
  theme: fabric-indigo   # <- this is the only theme switch
```

## Step-by-step (per new engagement)

1. Copy `samples/northwind-memberassist-workshop/` to
   `samples/<your-engagement>-workshop/`.
2. Open the new folder and rewrite `customer-scenario.md` from scratch
   (module 2).
3. Pick the product row from the matrix above and write `agenda.md`
   (module 4).
4. Update `SKILL.md` frontmatter: `customer`, `product_focus`, `theme`.
   Rewrite the Compliance section if the customer's regulatory context
   differs (e.g., financial services vs healthcare).
5. Re-run Copilot `/plan` to validate (module 5).
6. Regenerate or hand-edit only the changed sections (module 6).
7. Rewrite every `data/*.json` with the new vocabulary (module 9).
8. Set the active palette (module 10).
9. Run the validation checklist (module 12) against the new app.

## Copilot prompt — adapt to new engagement

```text
I'm adapting this workshop from Northwind MemberAssist (healthcare) to
<new customer> (<product>).

Read:
- The previous samples/northwind-memberassist-workshop/
- The new samples/<engagement>/customer-scenario.md
- The new samples/<engagement>/agenda.md

Then output:
1. Sections that can be reused as-is.
2. Sections that need content changes (file:line specifics).
3. Sections that need new demos.
4. Updated mock JSON drafts drawn from the new scenario.
5. Any architecture changes (should be NONE if SKILL.md is respected).
   Flag any architecture change as a violation that must be reverted.

Do not write code yet. Output a plan I will approve first.
```

## Worked diff — Northwind → "Contoso Telecom Customer Service"

Same scaffold, different industry. Concrete file-level diff:

| File | Northwind | Contoso Telecom |
|---|---|---|
| `customer-scenario.md` | 6 reqs, 4 personas (healthcare) | 5 reqs, 3 personas (telco support) |
| `SKILL.md` frontmatter `theme` | `northwind-teal` | `foundry-violet` |
| `SKILL.md` Compliance | PHI rules | PII + call recording opt-in |
| `agenda.md` | Coverage Lookup, Claim Status, Provider Search, EOB Extract, Eval, Roadmap | KB Search, Case Triage, Agent Assist, Call Summary, Eval, Roadmap |
| `data/coverage.json` | benefits Q&A | KB grounded answer |
| `data/claims.json` | claim timeline | case timeline |
| `data/providers.json` | provider directory | technician dispatch |
| `data/eob.json` | EOB extraction | invoice extraction |
| `data/eval.json` | + PHI-leak gauge | + escalation-precision gauge |
| `static/themes/*.css` | `northwind-teal.css` active | `foundry-violet.css` active |

Effort: roughly **one CSA-day** end-to-end (excluding `/plan` and
code-generation). The most time-consuming file is the `data/*.json` set —
realism is what sells.

## Anti-patterns

!!! danger "Changing the architecture for the first three engagements"
    Architecture changes burn the reuse story. The whole point of this
    pattern is that the *next* CSA can read your engagement repo and
    deliver in days, not weeks. Customize content, not contracts.

!!! danger "Customer name leaking into templates"
    Search the codebase for the previous customer name **before** sharing.
    Customer names live in one config variable + the scenario file.
    Nowhere else.

!!! danger "Five-palette mixing"
    Pick **one** palette per engagement. Mixing Northwind Teal headers
    with Citrus Orange buttons reads as "intern week project" no matter
    how good the demos are.

!!! danger "Keeping the original sample's PHI rules for a non-healthcare customer"
    The Compliance block is the most engagement-specific text in the
    repo. Rewrite it. Telco customers don't care about PHI; they care
    about call-recording consent and PII.

## The reuse playbook (one paragraph)

Fork the Northwind folder. Rewrite scenario, agenda, and SKILL frontmatter.
Re-run `/plan`. Regenerate only the changed sections. Replace the JSON. Pick
a palette. Run module 12's checklist. Publish. You're done — that's the
entire customization protocol.

## Next step

You've completed the full csa-workshop-builder tutorial. Three things to do:

1. Cut a `v0.x` release on your fork so the Material theme stops 404-ing
   on `/releases/latest`.
2. Share the published Pages URL with the account team.
3. Open a PR on the original `csa-workshop-builder` repo if you want your
   palette or recipe upstreamed for the next CSA.

<div class="module-step"><span class="pill">Module 13 ✓</span> You can now adapt the pattern to any customer or Microsoft product.</div>
