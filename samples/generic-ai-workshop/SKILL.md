# SKILL.md — Generic AI workshop

> Customized copy of `templates/SKILL.template.md` for the canonical generic
> AI workshop. No real customer. Used by the Fast path.

## Purpose

Instruct GitHub Copilot to scaffold and maintain an **agenda-driven workshop
web app** that demonstrates a grounded AI assistant pattern, reusable across
Microsoft products and customers.

## Context

See `customer-scenario.md` in this folder. No real customer; the scenario is
intentionally generic so the produced app can be customized later.

## Technology stack (locked)

- Python 3.11
- FastAPI 0.115
- Uvicorn 0.30
- Jinja2 3.1
- httpx 0.27
- python-dotenv
- Vanilla JavaScript (no framework)
- CSS-only design system
- Docker + Docker Compose

## Architecture (locked)

- `app.py` mounts the root FastAPI app.
- `agenda_loader.py` reads `agenda.md` at request time and returns
  `[{slug, title, description}, ...]`.
- Sidebar is a Jinja2 partial that iterates over the loader output.
- One section per agenda item under `sections/<slug>.html`.
- Mock demo data lives in `data/*.json`.
- Light/dark theme persisted via `localStorage`.

## Required pages and demos

- Home with workshop overview, audience, requirements.
- One page per `agenda.md` item with the standard content blocks.
- Five mock demos: chat, search, workflow, document analysis, evaluation.
- Presenter notes on every section.
- Requirement mapping on every section.

## Non-goals (v1)

- No real Azure SDK calls. Mock JSON only.
- No authentication.
- No production hardening.
- No real secrets. `example.env` only.
- No customer PII.

## File structure (locked)

```text
.
├── app.py
├── agenda.md
├── SKILL.md
├── agenda_loader.py
├── sections/
├── static/
├── data/
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── example.env
└── README.md
```
