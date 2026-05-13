# 3. Create the SKILL.md

!!! info "Two-level SKILL files"
    | File | Owner | Purpose |
    |---|---|---|
    | `SKILL.template.md` *(in this tutorial / template repo)* | Template team | Reusable contract that survives across customers. |
    | `SKILL.md` *(in your customer repo)* | The CSA for this engagement | Customized version with the customer scenario pasted in. |

    You **copy** the template into your customer repo and customize the
    **Context** and **Non-goals** sections. Stack, folder layout, and
    agenda-driven rules should rarely change.

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

??? example "Show the Northwind SKILL.md (frontmatter + key sections)"

    ```yaml
    ---
    name: workshop-creation
    description: |
      Generate and maintain the Northwind MemberAssist workshop web app from
      agenda.md and the scenario. Produces a FastAPI + Jinja2 single-page
      workshop with five mock demos.
    license: MIT
    metadata:
      author: Northwind CSA team (fictional)
      version: 1.0.0
      basedOn: csa-workshop-builder / customer-workshop-app-template
    ---
    ```

    ### Mandatory architectural rules

    1. **Section = package.** One folder per agenda item under `sections/<slug>/`.
    2. **Auto-discovery.** New sections appear in the sidebar by being created.
    3. **Agenda is the source of truth.** Renaming or reordering updates the sidebar without code changes.
    4. **Fuzzy title→folder match.** Loader handles `Demo 3 - X` → `demo_3_x` slug.
    5. **No hard-coded sidebar.** Menu injected at request time.
    6. **Light/dark theme persisted in `localStorage`.**
    7. **Mock-only by default.** Real-Azure code lives behind feature flags and under `infra/scripts/*.ipynb`.
    8. **Health endpoint.** `/healthz` returns `{status, agenda_items, sections_loaded}`.

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
  by version is what enables the [Reuse and scale](13-reuse-scale.md) flow.
</div>

## Common issues

!!! tip "Don't over-specify"
    A SKILL.md that prescribes every line of code becomes brittle. Pin the
    *contracts* (folder layout, file naming, agenda parsing rule); leave
    implementation freedom.

## Next step

Continue to **[4. Create the agenda.md](05-create-agenda.md)**.
