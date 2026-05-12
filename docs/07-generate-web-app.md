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

### Expected folder structure

```text
.
├── app.py
├── agenda.md
├── SKILL.md
├── agenda_loader.py
├── sections/                 # one Jinja2 template per agenda item (auto-discovered)
│   ├── _base.html
│   ├── introduction.html
│   ├── architecture.html
│   ├── demo-1-chat.html
│   └── ...
├── static/
│   ├── css/design-system.css
│   ├── js/theme.js
│   └── img/
├── data/                     # mock JSON for demos
│   ├── chat.json
│   ├── search.json
│   ├── workflow.json
│   ├── document.json
│   └── evaluation.json
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── example.env
└── README.md
```

### Expected routes

| Route | Purpose |
|---|---|
| `GET /` | Home — workshop overview, audience, requirements. |
| `GET /sections/{slug}` | One page per `agenda.md` item. |
| `GET /api/demo/chat` | Returns mock chat response JSON. |
| `GET /api/demo/search` | Returns mock ranked search results. |
| `GET /api/demo/workflow` | Returns mock workflow timeline. |
| `GET /api/demo/document` | Returns mock document extraction. |
| `GET /api/demo/evaluation` | Returns mock scorecard. |
| `GET /healthz` | Liveness probe. |

### Expected screens

<div class="screenshot-strip" markdown>
![Home](assets/images/home.svg)
![Section](assets/images/section.svg)
![Sidebar](assets/images/sidebar.svg)
</div>

## Push-back prompts

When Copilot misfires, send one of these:

!!! danger "If Copilot generates static pages instead of agenda-driven"
    ````text
    The sidebar and section list must be generated at request time by reading agenda.md.
    Refactor to add an `agenda_loader` module that returns a list of {slug, title, description}
    and remove all hard-coded navigation entries.
    ````

!!! danger "If Copilot hard-codes the sidebar"
    ````text
    Replace the hard-coded sidebar with a Jinja2 partial that iterates over the items returned by `agenda_loader.load()`.
    The partial must be included by the base template only.
    ````

!!! danger "If Copilot ships real Azure SDK calls in v1"
    ````text
    Remove all real Azure SDK calls. v1 must use mock JSON in data/. Add a comment in each demo handler showing the extension point where the real call will go later.
    ````

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

Continue to **[7. Run locally with Docker Compose](11-run-locally.md)**.
