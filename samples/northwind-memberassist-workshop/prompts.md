# Copilot prompts — Northwind MemberAssist

Six prompts. Use in order. Run each in a **fresh chat** so context from
prior turns does not bleed in.

## 1. `/plan` — generate the implementation plan

```text
/plan

Read SKILL.md, agenda.md, and customer-scenario.md.

Goal: produce an implementation plan (no code yet) for the first runnable
version of the Northwind MemberAssist workshop web app.

The plan must:
- List every file you will create with a one-line purpose.
- Honour every "Mandatory architectural rule" in SKILL.md.
- Map each agenda item to a section sub-app folder under sections/<slug>/.
- Identify the three highest risks and how you will mitigate them.
- Estimate the rough size (LOC) of each file so we can split work.

Do not write code. Wait for approval.
```

## 2. Implement the approved plan

```text
Implement the approved plan.

Constraints:
- Stop after generating sections/__init__.py, agenda_loader.py, app.py,
  one section sub-app (Demo 1 - Benefits chat), templates/_layout.html,
  static/, Dockerfile, docker-compose.yml, example.env, requirements.txt.
- Do not generate the other 8 sections yet — we will fan out after the
  first one is verified.
- The app must start with `docker compose up --build` and `/healthz` must
  return 200 with agenda_items=9 and sections_loaded=1.
```

## 3. Fan out the remaining 8 sections

```text
Now generate the remaining 8 section sub-apps. For each section:

- Folder name = normalize_for_match(title).
- __init__.py exposes router, MENU_TITLE (the agenda title), MENU_ICON
  (pick from the icon table in SKILL.md, fall back to `bi-square`).
- router.py mounts /sections/<slug> and renders templates/index.html.
- Use the matching mock data from data/<demo>.json where applicable.
- Each section page links to its mapped requirement IDs (R1–R6).

After generation, /healthz must report sections_loaded=9.
```

## 4. Customize for Northwind branding

```text
Customize the generic look for Northwind:

- Primary colour #0B5394, accent #F4B400.
- Replace the placeholder home headline with:
  "MemberAssist — grounded answers for Northwind members."
- Add a top-bar badge "Synthetic data — no PHI" that is always visible.
- Add a "Human handoff" button in the chat and workflow demos that opens
  a modal showing the full trace and a fake "agent paged" toast.
```

## 5. Push-back — Copilot proposed Flask

```text
Stop. SKILL.md pins the stack to FastAPI 0.115. Re-read the "Stack pins"
section and regenerate the affected files using FastAPI. Do not ask me to
confirm — this rule is non-negotiable.
```

## 6. Push-back — Copilot hard-coded the sidebar

```text
Stop. SKILL.md says the sidebar must be injected at request time from the
auto-discovered sections. You produced a static <ul> in _layout.html.

Replace it with a Jinja loop over `request.state.menu`, populated by a
middleware that calls sections.discover() once at startup. Show me the
diff before applying.
```
