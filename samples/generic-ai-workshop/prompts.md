# Prompts — Generic AI workshop

Use these in order. The first two are the Fast path; the rest are the
customization loop.

## 1. /plan the generic workshop

````text
/plan

I want to generate the first working version of a generic interactive workshop web app.
Use SKILL.md and agenda.md in this folder as the source of truth.

Stack: FastAPI 0.115, Jinja2 3.1, vanilla JS, CSS-only, Docker Compose.
Architecture: agenda-driven (sidebar and routes from agenda.md), one section per agenda item, five mock demos (chat, search, workflow, document analysis, evaluation), no real Azure calls in v1.

Analyze the files first and produce an implementation plan before writing code.
````

## 2. Implement the plan

````text
Implement the approved plan. Make sure the app runs locally with `docker compose up --build` and produces the expected screens (home, sections from agenda.md, all five mock demos).
````

## 3. Customize for a real customer

````text
I'm adapting this generic workshop to [Customer Name], focused on [product] and use case [use case].

Read the updated customer-scenario.md and agenda.md. Then:
- List sections that can be reused as-is.
- List sections that need content changes.
- List sections that need new demos or new mock data.
- Propose customer-flavored mock data drawn from the scenario.
- Flag any architecture changes (should be none).
````

## 4. Replace mock data with realistic samples

````text
For each demo under data/, replace generic mock JSON with samples that match the new customer's scenario. Keep the same JSON schema so the templates do not change.
````
