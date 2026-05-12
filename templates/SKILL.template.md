# SKILL.md (template)

!!! info "Two-level SKILL files"
    - **`SKILL.template.md`** (this file, lives in the tutorial / template repo) — the
      reusable contract. Stack, folder layout, agenda-driven rule. Rarely changes.
    - **`SKILL.md`** (lives in your customer repo) — a copy of this template with the
      Context and Non-goals sections customized for one engagement.

> Replace bracketed placeholders. Keep the **contracts** strict; leave
> implementation freedom for Copilot.

## Purpose

Instruct GitHub Copilot to scaffold and maintain an **agenda-driven workshop
web app** for a specific customer scenario.

## Context

Paste the customer scenario here:

```text
[paste customer-scenario.md content]
```

## Technology stack (locked)

- Python 3.11
- FastAPI 0.115
- Uvicorn 0.30
- Jinja2 3.1
- httpx 0.27
- python-dotenv
- Server-rendered HTML (Jinja2)
- Vanilla JavaScript (no framework)
- CSS-only design system
- Font Awesome 6, Inter, JetBrains Mono
- Docker and Docker Compose

## Architecture (locked contracts)

- Single `app.py` entrypoint (FastAPI).
- `agenda.md` is the **source of truth** for navigation and section list.
- One section per agenda item, auto-discovered from `sections/`.
- Dynamic sidebar generated at request time from `agenda.md`.
- One config file holds customer name, product focus, and theme overrides.
- Persistent light/dark theme via `localStorage`.
- Optional microservices for: chat, search, workflow, document-analysis,
  evaluation. Each behind an `httpx` client with a mock implementation by
  default.

## Folder layout

```text
app/
  app.py
  agenda_loader.py
  config.py
  templates/
    base.html
    section.html
    partials/
      sidebar.html
      demo_chat.html
      demo_search.html
      demo_workflow.html
      demo_document.html
      demo_eval.html
  static/
    css/
    js/
sections/
  <one folder per agenda item, auto-discovered>
agenda.md
SKILL.md
example.env
Dockerfile
docker-compose.yml
README.md
```

## Per-section content contract

Every section page must include:

1. Customer context
2. Learning objective
3. Requirement mapping
4. Concept explanation
5. Architecture diagram (Mermaid)
6. Demo (mocked by default)
7. Presenter notes
8. Success criteria
9. Fallback

## Non-goals

- No real customer PII.
- No real secrets in the repo. `example.env` only.
- No production hardening (auth, multi-tenant, rate limiting).
- No frontend framework.

## Reusability rules

- Customer name and product focus live in **one** config file.
- Templates must not hard-code customer or product names.
- New sections require editing **only** `agenda.md` and adding a `sections/`
  folder.
