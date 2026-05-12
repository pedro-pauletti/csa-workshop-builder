# 6. Generate the workshop web app

## Goal

Turn the approved `/plan` into a working FastAPI/Jinja2/Docker workshop app
skeleton.

## Why it matters

This is where the time savings show up. With a good SKILL + agenda + plan, you
get a runnable, agenda-driven app in one Copilot turn instead of days of
scaffolding.

## Inputs

- Approved plan from [Module 5](06-copilot-plan.md).
- `SKILL.md` and `agenda.md` in the workspace.

## Step-by-step

1. In Copilot Chat, send the implementation prompt below.
2. Review the generated structure against the SKILL.
3. Run the app locally (`uvicorn` or `docker compose up --build`).
4. Confirm the sidebar reflects every agenda item.
5. Commit the skeleton before adding content.

## Copilot prompt

```text
Implement the first functional version of the workshop web app based on the
approved plan and SKILL.md.

Start with:
- Project structure
- FastAPI app (app.py)
- agenda.md loader
- Dynamic sidebar from agenda.md
- Home page
- One section route per agenda item with a base template
- CSS design system (light/dark, persisted via localStorage)
- Vanilla JavaScript (no framework)
- Mock interactive demo placeholders
- README with run instructions
- Dockerfile
- docker-compose.yml
- example.env (no real secrets)

Do not add real secrets. Use example.env only.
```

## Expected output

A runnable app with:

- Working sidebar generated from `agenda.md`.
- One stub page per agenda item.
- Light/dark theme toggle.
- `docker compose up --build` works on a clean machine.

## Validation checklist

- [ ] App starts with no errors.
- [ ] Sidebar matches `agenda.md` exactly.
- [ ] Every section route returns 200.
- [ ] Theme toggle persists across reloads.
- [ ] No secrets in the repo.

## Common issues

!!! warning "Sidebar drifts from agenda"
    The agenda parser is hard-coded. Refactor it to *read* `agenda.md` at
    request time (or app startup with a reload endpoint in dev).

## Next step

Continue to **[7. Add explanatory sections](08-explanatory-sections.md)**.
