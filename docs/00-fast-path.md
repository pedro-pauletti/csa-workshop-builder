# Fast path — generate your first workshop app

> **Outcome:** the **Northwind MemberAssist** workshop web app running locally
> in under 90 minutes, with a dynamic sidebar from `agenda.md`, 6 mocked
> interactive demos (coverage Q&A, claim status, provider search, EOB
> extraction, evaluation scorecard, roadmap), and the Foundry-Violet / Northwind-Teal
> design system already applied.

## What you will build

A FastAPI + Jinja2 + Docker app whose **navigation and content are driven by
`agenda.md`**. It ships with **6 mocked interactive demos**. No real Azure
credentials required.

!!! tip "Already curious what the finished result looks like?"
    The [**live demo**](../demo/) is published right next to this tutorial.
    Open it, click around, then come back here and run the Fast path to
    generate it yourself — or jump to [module 1](02-design-principles.md) to
    build it step by step.

## Prerequisites

- VS Code or Codespaces with **GitHub Copilot Chat** (`/plan` available).
- **Docker Desktop** running.
- Network access to GitHub.

<div class="tips" markdown>
**Tips before you start**

- Run `/plan` in a **fresh chat**. Context bleed from earlier turns is the
  #1 reason Copilot proposes the wrong stack.
- **Commit `SKILL.md` and `agenda.md` before `/plan`.** Copilot reads the
  worktree, not the editor buffer.
- If Copilot picks Flask instead of FastAPI on its first turn, do not
  argue — re-paste the SKILL `## Stack pins` section and say "regenerate".
  Faster than negotiating.
</div>

## Step 1 — Create the working folder

You have two options. Either works.

=== "Option A · Clone the template (recommended)"

    ```bash
    git clone https://github.com/pedro-pauletti/customer-workshop-app-template.git my-workshop
    cd my-workshop
    ```

=== "Option B · Scaffold from scratch with Copilot"

    Create an empty folder, copy these two starter files from this tutorial:

    - `templates/SKILL.template.md` → save as `SKILL.md`
    - `templates/agenda.template.md` → save as `agenda.md`

    Then continue with Step 3 — Copilot will generate everything else.

## Step 2 — Open in VS Code

```bash
code .
```

Open Copilot Chat. Make sure `SKILL.md` and `agenda.md` are in the workspace.

## Step 3 — Plan the implementation

Send this prompt in Copilot Chat. **Do not let Copilot start coding yet** — you
want a plan first.

````text
/plan

I want to generate the first working version of the Northwind MemberAssist workshop app.

Use SKILL.md and agenda.md as the source of truth. Northwind is a fictional
US regional health plan; MemberAssist is a member-services copilot. The app
must work fully offline with mock data — no Azure resources required.

Goal:
Scaffold the agenda-driven Northwind MemberAssist workshop app following SKILL.md.
The same scaffolding will later be re-used for other customers (see module 13).

The first version must be functional locally and include:
- FastAPI 0.115 backend.
- Jinja2 templates.
- Vanilla JavaScript.
- CSS-only design system.
- Light/dark theme persisted in localStorage.
- Dynamic sidebar generated from agenda.md.
- One section per agenda item.
- Home page with workshop overview.
- Presenter notes.
- Requirement mapping.
- Mock interactive demos (one per agenda item):
  - Coverage Lookup (chat, grounded benefits Q&A).
  - Claim Status (form-driven adjudication lookup).
  - Provider Search (filterable in-network directory).
  - EOB Document Extraction (paste-text → structured fields).
  - Evaluation Scorecard (groundedness / relevance / latency).
  - Roadmap & Next Steps (pilot scope + 30/60/90).
- README with local run instructions.
- Dockerfile.
- docker-compose.yml.
- example.env only, no real secrets.

Do not implement real Azure service calls yet. Use realistic mock data and clear extension points for future services.

Analyze the files first and produce an implementation plan before writing code.
````

Review the plan. Push back on anything that drifts from `SKILL.md`. Iterate
the plan, not the code.

## Step 4 — Implement the plan

Once the plan looks right, send:

````text
Implement the approved plan. Make sure the app runs locally with `docker compose up --build` and produces the expected screens (home, sections from agenda.md, all five mock demos).
````

## Step 5 — Run locally

```bash
cp example.env .env
docker compose up --build
```

Open <http://localhost:8080>.

## Step 6 — Validate

Walk through this checklist before moving on:

- [ ] Home page renders with workshop title and overview.
- [ ] Sidebar lists exactly the items in `agenda.md` (no more, no less).
- [ ] Editing `agenda.md` and reloading updates the sidebar.
- [ ] Each section route returns 200 with the standard content blocks.
- [ ] Chat demo renders a prompt input + simulated grounded response.
- [ ] Search demo renders ranked source cards with scores.
- [ ] Workflow demo renders a step-by-step timeline.
- [ ] Document analysis demo renders a structured extraction output.
- [ ] Evaluation demo renders a scorecard and test cases.
- [ ] Light/dark theme toggle persists across reloads.
- [ ] No secrets are committed (`.env` is gitignored; only `example.env` is tracked).

## What you have now

A runnable **Northwind MemberAssist** workshop web app on `localhost:8080`.
You can already deliver this in front of a customer — and module 13 shows the
surgical swap to re-target it to a different customer or product.

[Open the live demo for comparison :material-arrow-right:](../demo/){ .md-button }

## Common issues

!!! warning "Copilot generates static pages instead of agenda-driven"
    Push back with: *"The sidebar and section list must be generated at
    request time by reading `agenda.md`. Refactor to add an `agenda_loader`
    module and remove the hard-coded navigation."*

!!! warning "Copilot hard-codes customer name in templates"
    Push back with: *"Move all customer-specific values to a single config
    file. Templates must reference the config, not literals."*

!!! warning "Docker build fails on first run"
    Most often: missing `requirements.txt` or wrong base image. Ask Copilot:
    *"Audit Dockerfile and docker-compose.yml against the SKILL.md
    technology stack and produce a corrected version."*

## Next step

Either keep this Northwind app and re-target it to your customer later
(module 13), or read the 12 modules to understand every decision the Fast
path made for you:

[1. Accelerator pattern :material-arrow-right:](02-design-principles.md){ .md-button .md-button--primary }
[13. Customize for your customer :material-source-branch:](13-customize.md){ .md-button }
