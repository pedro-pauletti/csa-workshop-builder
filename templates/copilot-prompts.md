# Copilot prompts — copy/paste library

A curated set of prompts used across the tutorial. Adapt placeholders in
`[brackets]` per engagement.

---

## 0. Fast path — generate the first working workshop app

````text
/plan

I want to generate the first working version of a generic interactive workshop web app.

Use SKILL.md and agenda.md as the source of truth.

Goal:
Create a reusable generic workshop app that CSAs can later customize for different Microsoft products, customers and use cases.

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
- Mock interactive demos:
  - Chat demo.
  - Search demo.
  - Workflow execution demo.
  - Document analysis demo.
  - Evaluation dashboard demo.
- README with local run instructions.
- Dockerfile.
- docker-compose.yml.
- example.env only, no real secrets.

Do not implement real Azure service calls yet. Use realistic mock data and clear extension points for future services.

Analyze the files first and produce an implementation plan before writing code.
````

Then:

````text
Implement the approved plan. Make sure the app runs locally with `docker compose up --build` and produces the expected screens (home, sections from agenda.md, all five mock demos).
````

---

## 0.b Push-back prompts (when Copilot misfires)

````text
The sidebar and section list must be generated at request time by reading agenda.md.
Refactor to add an `agenda_loader` module that returns a list of {slug, title, description}
and remove all hard-coded navigation entries.
````

````text
Replace the hard-coded sidebar with a Jinja2 partial that iterates over the items returned by `agenda_loader.load()`. The partial must be included by the base template only.
````

````text
Remove all real Azure SDK calls. v1 must use mock JSON in data/. Add a comment in each demo handler showing the extension point where the real call will go later.
````

---

## 1. Critique a draft outline against design principles

```text
You are helping me design a customer workshop.
Critique this draft outline against these principles:
- Anchored on customer business challenge
- Each demo maps to a requirement
- Explain-before-demo flow
- Evidence shown for every demo
- Fallback for every live element
- Dual narrative (executive + technical)
- Generic vs customer-specific content separated

Outline:
[paste your draft outline]

Return: a table of (principle, score 1–5, what to fix).
```

---

## 2. Turn discovery notes into a customer scenario

```text
Help me turn the discovery notes below into a structured customer scenario
using this template:

[paste templates/customer-scenario.template.md]

Discovery notes:
[paste raw notes]

Output: a fully filled scenario, 3–7 explicit requirements written as short
testable statements, and a one-sentence executive summary.
```

---

## 3. Validate the SKILL.md

```text
Read SKILL.md and customer-scenario.md.

Validate that the SKILL:
- Locks the technology stack and versions.
- Defines a clear folder structure.
- Mandates an agenda-driven architecture (one section per agenda item).
- Requires presenter notes, requirement mapping, and fallback messaging.
- Forbids real secrets and customer PII.
- Is reusable across Microsoft products.

Return: a list of gaps and a corrected SKILL.md.
```

---

## 4. Map agenda items to demos and fallbacks

```text
Read SKILL.md, customer-scenario.md, and agenda.md.

For each agenda item, propose:
- A learning objective (1 line)
- The requirement IDs it maps to
- The demo type (explanatory, chat, search, workflow, document-analysis, evaluation)
- A fallback strategy if the live demo fails

Output a table.
```

---

## 5. Plan the implementation (use /plan mode)

```text
/plan

I want to build an agenda-driven interactive workshop web app for a
customer-specific use case.

Use SKILL.md and agenda.md as the source of truth.

Technology stack: Python 3.11, FastAPI 0.115, Uvicorn, Jinja2, httpx,
python-dotenv, vanilla JS, CSS, Docker Compose.

Architecture: app.py, agenda loader, dynamic sidebar from agenda.md, one
section per agenda item, mocked demos by default.

Analyze the files first and produce an implementation plan before writing code.
Call out assumptions and risks. List the files you will create.
```

---

## 6. Implement the first version

```text
Implement the first functional version of the workshop web app based on the
approved plan and SKILL.md.

Start with:
- Project structure
- FastAPI app
- agenda.md loader
- Dynamic sidebar
- Home page
- One section route per agenda item
- CSS design system (light/dark, persisted)
- Vanilla JavaScript
- Mock interactive demo placeholders
- README, Dockerfile, docker-compose.yml, example.env (no real secrets).
```

---

## 7. Add explanatory sections

```text
For every section under sections/, add: customer context, learning objective,
requirement mapping, concept explanation, Mermaid architecture diagram,
demo placeholder, presenter notes, success criteria, fallback paragraph.

Read customer name from one config file. Do not hard-code it in templates.
```

---

## 8. Add interactive demos

```text
Replace each demo TODO with a mocked interactive component:
- Chat (prompt → simulated grounded response + sources)
- Search (query → ranked source cards with scores)
- Workflow (Run → step-by-step timeline)
- Document analysis (picker → structured extraction output)
- Evaluation (test cases → scorecards + observations)

All mocks must work offline. Structure for swap-in real services later.
```

---

## 9. Adapt to a new customer or product

```text
I'm adapting this workshop app from [previous] to [new customer/product].

Read the new customer-scenario.md and agenda.md. Then:
- List sections reusable as-is.
- List sections needing content changes.
- List sections needing new demos.
- Propose updated demo mock data drawn from the new scenario.
- Flag any architecture changes (should be none if SKILL.md is respected).
```

---

## 9.b Generate a realistic mock-data fixture for one demo

```text
Generate a realistic mock-data fixture for the [demo type] demo in this
workshop.

Context:
- Customer scenario: [paste customer-scenario.md]
- Demo type: one of {chat, search, workflow, document_analysis, evaluation}
- Target file: data/[name].json
- Schema constraints: [paste schema or leave blank to infer from sibling files in data/]

The fixture must:
- Use vocabulary the audience will recognise (no generic "Customer A").
- Include ONE happy path and ONE realistic failure path.
- Include a `trace[]` array showing the steps that produced the answer.
- Cite at least one source per factual claim (where applicable).
- Be safe to ship publicly: no real names, IDs, addresses, account
  numbers, or PHI/PII. Use the "last4" pattern for any identifiers.
- Run offline: no URLs to live services.

Output: the JSON only, valid against the schema, ready to drop into data/.
```

---

## 10. Promote sample edits back into templates

```text
Compare the latest customer's SKILL.md and agenda.md to the canonical
templates/ versions in this repo.

Output:
- Diffs that look like genuine improvements (promote to templates).
- Diffs that look like one-off customer edits (keep in sample only).
- Recommended template updates as a patch.
```
