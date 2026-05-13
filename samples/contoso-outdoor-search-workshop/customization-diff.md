# Customization diff — generic-ai-workshop → contoso-outdoor-search-workshop

This file documents what we changed when we forked
`samples/generic-ai-workshop/` into `samples/contoso-outdoor-search-workshop/`.
The next CSA who retargets this for a different customer should update
this file in the new repo.

## Summary

| Dimension | Generic | Contoso Outdoor |
|---|---|---|
| Domain | "Generic AI workshop" | US health-plan member services |
| Audience | Generic exec / architect / dev | VP Member Services, Director Claims Ops, Plan Architect, Compliance Officer |
| Demos | 5 generic | 5 same shapes, member-services data |
| Compliance dimension | Mentioned | First-class (PHI-leak gauge, redaction rules, handoff) |
| Branding | Neutral | Contoso Outdoor colours #0B5394 / #F4B400, "Synthetic data — no PHI" badge |
| Section count | 9 | 9 |
| New files | — | `data/*.json` (5), `sections/demo-3-claim-status.md`, `presenter-notes.md`, `customization-diff.md` |

## Files changed and why

### `customer-scenario.md` — full rewrite

- Added Contoso Outdoor operational numbers (22k calls/week, 7m12s AHT, 64% FCR).
- Replaced generic personas with named people: Rosa, Marcus, Hana, Daniel.
- Rewrote requirements R1–R6 in member-services language.
- Added compliance constraints (no real PHI, offline rehearsal, "human always wins").

### `.github/skills/workshop-creation/SKILL.md` — extended

- Added `## Compliance rules (Contoso Outdoor-specific)` section with PHI-leak
  gauge, human-handoff visibility, citation requirement.
- Added two new push-backs (refuse real claim numbers, refuse to skip the
  evaluation demo).
- Added `infra/scripts/configure_member_agent.ipynb` and
  `generate_eob_samples.ipynb` to extension points.
- Frontmatter `metadata.author` and `metadata.basedOn` updated.

### `agenda.md` — full rewrite

- 9 items, member-services flavour. Heading anchor unchanged
  (`### Data to be used by SKILL.md to create the Workshop App`).
- Item 9 ("Roadmap and next steps") explicitly calls for whiteboard,
  not slides.

### `prompts.md` — three new prompts

- Prompt #4 added Contoso Outdoor branding instructions and the "Synthetic
  data — no PHI" badge requirement.
- Prompt #5 (Flask push-back) reused verbatim.
- Prompt #6 (sidebar push-back) reused verbatim.

### `data/*.json` — all new

- `chat.json` — colonoscopy benefits Q&A with citations and a cost
  follow-up that triggers human handoff.
- `search.json` — Endocrinology in 30308, with ranking signals and an
  excluded-by-rule provider.
- `workflow.json` — happy-path claim + pended-COB failure case.
- `document.json` — EOB extraction with plain-English explanation.
- `evaluation.json` — five scorecards including the PHI-leak gauge in
  warn state, plus one resolved incident.

### `sections/demo-3-claim-status.md` — new

The gold-sample explanatory section. Mirrors the section template
exactly so it can be copy-pasted as a starting point for the other 8.

### `presenter-notes.md` — new

One block per agenda item.

## What we did **not** change

- The 9-section module pattern.
- The `agenda.md` heading anchor.
- The per-section sub-app convention (`MENU_TITLE`, `MENU_ICON`,
  auto-discovery).
- The mock-only rule. Contoso Outdoor v1 has zero real Azure calls.

## Effort

Roughly one CSA-day end-to-end:

- 2h scenario + audience interviews summary.
- 1h SKILL extensions + agenda.
- 3h mock data (the most time, because realism matters).
- 1h gold-sample section.
- 1h presenter notes.
- 1h branding + Copilot push-backs.

The `/plan` and code-generation step is *not* counted — the tutorial
covers that.

## What to retarget when forking this

Seven things, in order:

1. Customer name and audience matrix in `customer-scenario.md`.
2. Compliance section in `SKILL.md`.
3. Agenda titles in `agenda.md` (mind the heading anchor).
4. Branding colours and the data-classification badge in prompt #4.
5. All five `data/*.json` fixtures.
6. The gold-sample section name and its `data/` reference.
7. Presenter notes top-to-bottom.
