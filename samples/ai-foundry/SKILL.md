# SKILL.md — Microsoft AI Foundry workshop (sample)

## Purpose

Instruct GitHub Copilot to scaffold an agenda-driven workshop web app that
showcases **Azure AI Foundry** end-to-end: agents, evaluations, tracing,
model catalog, governance.

## Context

See `customer-scenario.md` in this folder.

## Technology stack (locked)

- Python 3.11, FastAPI 0.115, Uvicorn 0.30, Jinja2 3.1, httpx 0.27,
  python-dotenv.
- Server-rendered HTML, vanilla JS, CSS-only design system.
- Docker and Docker Compose.

## Architecture (locked contracts)

- `app.py` entrypoint.
- `agenda.md` is the source of truth for navigation and section list.
- One section per agenda item, auto-discovered from `sections/`.
- Demo backends are mocked by default; designed to be swapped for real
  Foundry endpoints via `httpx` + `example.env` placeholders.

## Folder layout

Same as `templates/SKILL.template.md`.

## Per-section content contract

Customer context, learning objective, requirement mapping, concept,
Mermaid diagram, demo, presenter notes, success criteria, fallback.

## Foundry-flavored demo guidance

- **Chat demo** → grounded agent with sources panel (mock retrieval).
- **Search demo** → hybrid search results with relevance scores.
- **Workflow demo** → multi-step agent run with timeline.
- **Document analysis** → structured extraction from a sample PDF.
- **Evaluation demo** → scorecard view with prompts, expected outputs,
  evaluator scores.

## Non-goals

No real customer data. No real Foundry credentials in the repo. No production
hardening.

## Reusability rules

- Customer name and product focus live in **one** config file.
- Templates do not hard-code customer or Foundry-specific names.
