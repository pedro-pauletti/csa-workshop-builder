# SKILL.md — Microsoft Fabric workshop (sample)

## Purpose

Instruct GitHub Copilot to scaffold an agenda-driven workshop web app that
showcases **Microsoft Fabric** end-to-end: OneLake, Lakehouse, Pipelines,
Notebooks, Semantic Models, Power BI, Real-Time Intelligence.

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
- Demo backends are mocked locally. Real Fabric resources (workspaces,
  lakehouses, eventhouses) are referenced in docs, not hit live.

## Folder layout

Same as `templates/SKILL.template.md`.

## Per-section content contract

Customer context, learning objective, requirement mapping, concept,
Mermaid diagram, demo, presenter notes, success criteria, fallback.

## Fabric-flavored demo guidance

- **Lakehouse demo** → mocked Bronze/Silver/Gold table view with sample rows.
- **Pipeline demo** → mocked pipeline run with step timeline and durations.
- **Notebook demo** → embedded read-only PySpark snippet with sample output.
- **Semantic model + Power BI demo** → static report screenshot + measure
  walkthrough.
- **Real-time demo** → mocked KQL query + chart over a streaming sample.
- **Governance demo** → workspace roles, sensitivity labels, lineage view.

## Non-goals

No real customer data. No live Fabric API calls in the workshop app. No
production hardening.

## Reusability rules

- Customer name and product focus live in **one** config file.
- Templates do not hard-code customer or Fabric-specific names.
