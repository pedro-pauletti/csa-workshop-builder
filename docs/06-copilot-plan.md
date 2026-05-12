# 5. Use GitHub Copilot `/plan`

## Goal

Use **`/plan` mode** in GitHub Copilot Chat to produce an implementation plan
*before* generating any code.

## Why it matters

`/plan` forces Copilot to read your `SKILL.md` + `agenda.md`, propose an
architecture, list files to create, and call out risks — *before* it writes
code. You catch wrong assumptions cheaply. You also get a plan you can review
with a peer.

## Inputs

- `SKILL.md` and `agenda.md` in the workspace.
- GitHub Copilot Chat with `/plan` available.

## Step-by-step

1. Open the workspace containing `SKILL.md` and `agenda.md`.
2. Open Copilot Chat.
3. Send the prompt below.
4. Read the plan critically. Push back on anything that drifts from the SKILL.
5. Iterate the plan, not the code, until it's right.
6. Approve the plan.

## Copilot prompt

```text
/plan

I want to build an agenda-driven interactive workshop web app for a
customer-specific use case.

Use SKILL.md and agenda.md as the source of truth.

Technology stack:
- Python 3.11
- FastAPI 0.115
- Uvicorn 0.30
- Jinja2 3.1
- httpx 0.27
- python-dotenv
- Server-rendered HTML
- Vanilla JavaScript
- CSS-only design system
- Font Awesome 6, Inter, JetBrains Mono
- Persistent light/dark theme via localStorage
- Docker and Docker Compose

Architecture:
- Root app in app.py
- Auto-discovery of sub-apps in sections/
- One section per agenda.md item
- Dynamic sidebar from agenda.md
- Optional microservices for chat, search, workflow and evaluation demos

Analyze the files first and produce an implementation plan before writing code.
Call out assumptions and risks. List the files you will create.
```

## Expected output

A structured plan with: assumptions, file list, architecture diagram, risks,
and an ordered task list.

## Validation checklist

- [ ] Plan references *your* SKILL and agenda (not generic boilerplate).
- [ ] File list matches the agenda items.
- [ ] Risks are concrete.
- [ ] No real secrets in the plan.

## Common issues

!!! tip "If the plan is generic"
    Copilot didn't read your files. Reopen them in the editor, then re-run
    `/plan` and explicitly reference `SKILL.md` and `agenda.md` in the prompt.

## Next step

Continue to **[6. Generate the web app](07-generate-web-app.md)**.
