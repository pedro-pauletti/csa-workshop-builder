# Copilot prompts — copy/paste library

A curated set of prompts used across the tutorial. Adapt placeholders in
`[brackets]` per engagement.

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

## 10. Promote sample edits back into templates

```text
Compare the latest customer's SKILL.md and agenda.md to the canonical
templates/ versions in this repo.

Output:
- Diffs that look like genuine improvements (promote to templates).
- Diffs that look like one-off customer edits (keep in sample only).
- Recommended template updates as a patch.
```
