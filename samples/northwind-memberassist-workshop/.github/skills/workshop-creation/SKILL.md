---
name: workshop-creation
description: |
  Generate and maintain the Northwind MemberAssist workshop web app from
  agenda.md and the scenario. Produces a FastAPI + Jinja2 single-page
  workshop with five mock demos (chat, search, workflow, document analysis,
  evaluation) and presenter-ready content per agenda item.
license: MIT
metadata:
  author: Northwind CSA team (fictional)
  version: 1.0.0
  basedOn: csa-workshop-builder / customer-workshop-app-template
---

# Skill: Workshop creation — Northwind MemberAssist

This SKILL.md is the contract between the engagement team and GitHub Copilot.
Anything Copilot generates for this repository must satisfy the rules below.
If a request conflicts with this skill, this skill wins.

## When to use this skill

Use this skill whenever a contributor asks Copilot to:

- Scaffold or regenerate the workshop web app.
- Add a new section, demo, or presenter-note block.
- Customize content or visuals for the Northwind engagement.
- Refactor agenda → sidebar → routes wiring.

## Inputs

The skill reads, in priority order:

1. `agenda.md` — bullets under the heading
   `### Data to be used by SKILL.md to create the Workshop App`.
2. `customer-scenario.md` — requirements R1–R6, personas, constraints.
3. `data/*.json` — mock data for the demos.
4. `sections/*.md` — explanatory section content.
5. `presenter-notes.md` — speaker-facing notes per agenda item.

## Outputs

A FastAPI app under `src/app/webApp/app/` with:

- `app.py` — single ASGI entrypoint, menu-injection middleware, `/healthz`.
- `agenda_loader.py` — parses `agenda.md`, yields ordered `(title, slug, description)`.
- `sections/__init__.py` — auto-discovers section sub-apps using `pkgutil.iter_modules`.
- `sections/<slug>/__init__.py` — exposes `router`, `MENU_TITLE`, `MENU_ICON`.
- `sections/<slug>/router.py` — `APIRouter(prefix="/sections/<slug>")`.
- `sections/<slug>/templates/` — section-specific Jinja2.
- `templates/_layout.html` — shared chrome with dynamic sidebar.
- `static/` — CSS-only design system, light/dark via `localStorage`.
- `Dockerfile`, `docker-compose.yml`, `example.env`, `requirements.txt`.

## Mandatory architectural rules

1. **Section = package.** One folder per agenda item under `sections/<slug>/`.
   Slug = `normalize_for_match(title)` (lowercase, alphanumeric only,
   underscores between words).
2. **Auto-discovery.** New sections appear in the sidebar by being created;
   no manual registration.
3. **Agenda is the source of truth.** Renaming, reordering, or adding an
   agenda bullet must update the sidebar without code changes.
4. **Fuzzy title→folder match.** The loader must find a section folder even
   if the agenda title has a prefix like "Demo 3 - " by normalized
   substring match (longest match wins).
5. **No hard-coded sidebar.** The menu is injected at request time from
   loaded sections.
6. **Light/dark theme persisted in `localStorage`.** No server preference.
7. **Mock-only by default.** No `azure-*` SDK calls in v1. Real-Azure code
   lives behind feature flags and under `infra/scripts/*.ipynb`.
8. **Health endpoint.** `/healthz` returns
   `{"status": "ok", "agenda_items": N, "sections_loaded": M}`.

## Stack pins

- Python 3.11
- FastAPI 0.115
- Uvicorn 0.30
- Jinja2 3.1
- Pydantic 2.x
- No JS framework. Vanilla ES2022.
- No CSS framework. CSS custom properties + 1 stylesheet.

## Compliance rules (Northwind-specific)

- **No real PHI.** All members, claims, providers, EOBs are synthetic.
- **PHI-leak evaluation gauge** is mandatory in the evaluation demo.
- **Human-handoff path** must be visible in every conversational demo.
- **Auditability.** Every mock response includes a `trace[]` array of the
  steps that produced it.
- **Citations.** Every benefits answer cites the plan document and section.

## Demo contract

Each demo must:

1. Be runnable offline. No external network calls in v1.
2. Show one realistic happy path **and** one realistic failure path.
3. Map to at least one requirement ID (R1–R6) in its section header.
4. Include presenter notes in `presenter-notes.md` keyed by agenda title.

## Style

- Tone: confident, vendor-neutral, no marketing adjectives.
- Headings: sentence case.
- Code blocks: always fenced with language hint.
- No emoji in generated content.

## Push-backs (Copilot must refuse)

- "Just use Flask" → no, FastAPI 0.115 per stack pins.
- "Hard-code the sidebar for now" → no, auto-discovery is mandatory.
- "Add a real Azure call to make the demo feel real" → no, mocks only in v1.
- "Skip the evaluation demo, it's boring" → no, R5 requires it.
- "Use real claim numbers from the test environment" → no, synthetic only.

## Extension points (documented, not implemented)

- `infra/scripts/configure_search_index.ipynb` — provision the AI Search index.
- `infra/scripts/configure_member_agent.ipynb` — provision the Foundry agent.
- `infra/scripts/generate_eob_samples.ipynb` — synthesize EOB PDFs.

## Versioning

- This file is versioned in `metadata.version`.
- Bump minor for new sections / demos.
- Bump major for changes to the architectural rules above.
