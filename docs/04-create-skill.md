# 3. SKILL.md for Northwind

!!! info "Two-level SKILL files"
    | File | Owner | Purpose |
    |---|---|---|
    | `SKILL.template.md` *(in this tutorial / template repo)* | Template team | Reusable contract that survives across customers — including the **Foundry Violet** design system and the agenda-driven menu rule. |
    | `SKILL.md` *(in your customer repo)* | The CSA for this engagement | Customized version with the Northwind scenario pasted in. |

    You **copy** the template into your Northwind repo and customize the
    **Context**, **Personas**, **Non-goals** and **Theme** sections. Stack,
    folder layout, and agenda-driven rules should rarely change.

## Goal

Author a `SKILL.md` that instructs **GitHub Copilot** *how* to scaffold the
workshop web app: stack, architecture, conventions, constraints.

## Why it matters

`SKILL.md` is the durable, reusable contract between you and Copilot. Without
it, every Copilot interaction reinvents the architecture. With it, every CSA on
your team produces consistent, high-quality apps.

## Where SKILL.md lives

The reference architecture stores the skill at:

```text
.github/skills/workshop-creation/SKILL.md
```

This is the convention GitHub Copilot's skill loader expects. The repo
root may also have a *symlink* or short pointer for visibility, but the
canonical location is under `.github/skills/<skill-name>/`. A skill is a
folder, not a single file — additional context (templates, examples)
sits next to `SKILL.md`.

## Frontmatter

A real SKILL.md starts with YAML frontmatter so the skill is
self-describing:

```yaml
---
name: workshop-creation
description: |
  Generate and maintain the workshop web app from agenda.md and the
  customer scenario.
license: MIT
metadata:
  author: <Your CSA team>
  version: 1.0.0
  basedOn: csa-workshop-builder / customer-workshop-app-template
---
```

Bump `metadata.version` minor for new sections/demos and major for any
change to the architectural rules.

### Document the workshop's documentation sources

A SKILL.md that doesn't enumerate the official Microsoft documentation it
draws from is incomplete. Add a `documentation_sources` block to the
frontmatter — it is the contract that says *this workshop is grounded in
Microsoft Learn, not vibes*.

```yaml
documentation_sources:
  - https://learn.microsoft.com/azure/ai-foundry/
  - https://learn.microsoft.com/azure/search/
  - https://learn.microsoft.com/azure/ai-services/openai/
  - https://github.com/Azure-Samples/azure-search-openai-demo
```

Then in the **Rules** body of SKILL.md add:

> **Rule — Documentation references.** Every section's explanatory block
> must end with a `<div class="refs">` listing 2–5 official Microsoft
> references (Microsoft Learn, Azure-Samples, or microsoft.com). No
> third-party blogs, no marketing pages, no hand-waving.

The [live demo](../demo/) implements exactly this rule — open any section
and scroll to *Official Microsoft Learn references*. This is covered in
detail in [Module 7 — Explanatory sections](08-explanatory-sections.md).

## Inputs

- The customer scenario from [Module 2](03-customer-scenario.md).
- `templates/SKILL.template.md`.
- Agreed technology stack (defaults: FastAPI 0.115, Jinja2 3.1, vanilla JS,
  Docker Compose).

## Step-by-step

1. Copy `templates/SKILL.template.md` to your working folder as `SKILL.md`.
2. Paste the customer scenario into the **Context** section.
3. Lock the **stack** and **architecture** sections.
4. Confirm the **non-goals** (no real secrets, no production hardening, no
   real customer PII).
5. Save it next to `agenda.md` so Copilot can read both together.

## Copilot prompt

```text
Read SKILL.md and customer-scenario.md.

Validate that the SKILL:
- Locks the technology stack and versions.
- Defines a clear folder structure.
- Mandates an agenda-driven architecture (one section per agenda item).
- Requires presenter notes, requirement mapping, and fallback messaging.
- Forbids real secrets and customer PII.
- Is reusable across Microsoft products.

Return: a list of gaps and a corrected SKILL.md.
```

## Expected output

A polished `SKILL.md` ready to be referenced by `/plan`.

## Validation checklist

- [ ] Stack and versions are pinned.
- [ ] Folder structure is explicit.
- [ ] Architecture is agenda-driven.
- [ ] Demos can be added without changing the core app.
- [ ] No real secrets; only `example.env`.

## Good SKILL vs bad SKILL

| Good SKILL | Bad SKILL |
|---|---|
| Pins stack and versions (`FastAPI 0.115`, `Jinja2 3.1`). | "Use modern Python." |
| Mandates `agenda.md` as the single source of truth for nav. | Lists routes manually. |
| Requires presenter notes + requirement mapping in every section. | Leaves content structure to Copilot's mood. |
| Forbids real secrets; only `example.env` is tracked. | "Add Azure keys when ready." |
| Stays under ~150 lines. | 500-line spec that reads like a PRD. |

## Mini visual

```text
customer-scenario.md ──► SKILL.md ──► /plan ──► Copilot generates the app
                              ▲
                              │
                      SKILL.template.md (reusable contract)
```

## Worked example — Northwind SKILL.md

Paste these into the Northwind `SKILL.md` after copying the template. The
template already contains all the **architectural rules**, the **Foundry
Violet / Northwind Teal** design system, and the **agenda-driven menu** rule
— so you only customize the customer-specific blocks below.

```yaml
---
name: workshop-creation
description: |
  Generate and maintain the Northwind MemberAssist workshop web app from
  agenda.md and the scenario. Produces a FastAPI + Jinja2 single-page
  workshop with 6 mock demos (coverage, claim status, provider search,
  EOB extraction, evaluation, roadmap).
license: MIT
metadata:
  customer: Northwind Health
  product_focus: Azure AI Foundry + Azure AI Search + Document Intelligence
  theme: northwind-teal
  basedOn: csa-workshop-builder/templates/SKILL.template.md
  version: 1.0.0
---
```

### Compliance rules (Northwind-specific)

- **No real PHI.** All members, claims, providers, EOBs are synthetic.
- **PHI-leak evaluation gauge** mandatory in the evaluation demo.
- **Human-handoff path** visible in every conversational demo.
- **Auditability.** Every mock response includes a `trace[]` array.
- **Citations.** Every benefits answer cites the plan document and section.

### Push-backs Copilot must refuse

- "Just use Flask" → no, FastAPI 0.115 per stack pins.
- "Hard-code the sidebar for now" → no, auto-discovery is mandatory.
- "Add a real Azure call" → no, mocks only in v1.
- "Skip the evaluation demo, it's boring" → no, R5 requires it.
- "Use real claim numbers from the test environment" → no, synthetic only.

Full source:
[`samples/northwind-memberassist-workshop/.github/skills/workshop-creation/SKILL.md`](https://github.com/pedro-pauletti/csa-workshop-builder/tree/main/samples/northwind-memberassist-workshop/.github/skills/workshop-creation/SKILL.md)

<div class="tips" markdown>
**SKILL.md tips**

- Pin Python *and* SDK versions. The Foundry SDK churns weekly — the
  workshop you generated last month will not regenerate identically today.
- Add a `## Compliance` section even for mock workshops. The rules force
  you to declare your assumptions; the customer's compliance team
  notices.
- Forbid real-Azure imports in v1 explicitly. Otherwise Copilot will
  helpfully `pip install azure-search-documents` to "make it real" and
  break offline rehearsals.
- Keep push-backs explicit and short. They are the single most reused
  part of the file across CSAs.
- Bump `metadata.version` whenever you change architectural rules. Diff
  by version is what enables the [customize-for-another-customer](13-customize.md) flow.
</div>

## Common issues

!!! tip "Don't over-specify"
    A SKILL.md that prescribes every line of code becomes brittle. Pin the
    *contracts* (folder layout, file naming, agenda parsing rule, design
    system tokens); leave implementation freedom.

## Next step

Continue to **[4. agenda.md for Northwind](05-create-agenda.md)**.

<div class="module-step"><span class="pill">Module 3 of 12</span> SKILL contract authored. Next: the agenda that drives the menu.</div>
