# 5. Use GitHub Copilot `/plan`

!!! tip "Use `/plan` twice"
    Run `/plan` **once** when bootstrapping the generic app (the Fast path), and
    **again** after you customize `SKILL.md` and `agenda.md` for your customer.
    First plan = stable skeleton. Second plan = customer-specific deltas.

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

## Worked example — Northwind `/plan` response

??? example "Show what a good /plan response looks like (Northwind)"

    ```text
    Plan: Northwind MemberAssist workshop web app — v1

    Assumptions
    -----------
    - SKILL.md and agenda.md committed at HEAD.
    - 9 agenda items. Slugs derived via normalize_for_match.
    - Single-service deployment for v1 (multi-microservice deferred).
    - Mock data only. No azure-* imports.

    Files I will create (with rough LOC)
    ------------------------------------
    src/app/webApp/app/
      app.py                                                ~ 110 LOC
      agenda_loader.py                                      ~  60 LOC
      sections/__init__.py            (auto-discovery)     ~  40 LOC
      sections/welcome_and_engagement_framing/{__init__,router}.py
      sections/member_journeys_today/{__init__,router}.py
      sections/the_memberassist_concept/{__init__,router}.py
      sections/demo_1_benefits_chat/{__init__,router}.py    ~  90 LOC
      sections/demo_2_provider_search/{__init__,router}.py  ~  80 LOC
      sections/demo_3_claim_status/{__init__,router}.py     ~ 110 LOC
      sections/demo_4_eob_document_analysis/{__init__,router}.py ~ 90 LOC
      sections/demo_5_evaluation_dashboard/{__init__,router}.py  ~ 80 LOC
      sections/roadmap_and_next_steps/{__init__,router}.py
      templates/_layout.html                                ~ 120 LOC
      static/theme.{css,js}                                 ~ 200 LOC
    src/app/webApp/{Dockerfile,docker-compose.yml,requirements.txt,example.env}

    data/{chat,search,workflow,document,evaluation}.json    (already filled by CSA)

    Top 3 risks
    -----------
    R1. Copilot may hard-code the sidebar in _layout.html.
        Mitigation: review the diff for any <ul> with literal section names;
        replace with Jinja loop over request.state.menu (see push-back #6).
    R2. Slug collision if two agenda items normalize to the same string.
        Mitigation: agenda_loader logs a hard error on duplicate slugs.
    R3. Theme persistence breaks on first paint (FOUC).
        Mitigation: theme.js writes <html data-theme> from localStorage
        synchronously in <head> before stylesheet evaluation.

    Implementation order
    --------------------
    1. agenda_loader.py + tests against data/agenda.md
    2. sections/__init__.py auto-discovery
    3. app.py + menu-injection middleware + /healthz
    4. One section sub-app (Demo 1 - Benefits chat) end-to-end
    5. Validation: docker compose up, /healthz returns sections_loaded=1
    6. STOP. Hand back for approval before fanning out remaining 8 sections.
    ```

    A "bad" plan would skip the risks, list 30 files without sizes, or
    propose to write all 9 sections in one turn. Reject and iterate the
    plan, not the code.

<div class="tips" markdown>
**`/plan` tips**

- If the plan does not mention your customer name (or scenario nouns like
  "claim", "EOB"), Copilot did not read `customer-scenario.md`. Reopen
  the file and re-run `/plan` from a fresh chat.
- Ask Copilot to estimate token cost per section. The estimate is rough,
  but the *act of estimating* makes Copilot split appropriately.
- Reject any plan that lists more than 3 risks. Force prioritization. A
  plan with 11 risks is a plan with no risks.
- The plan should always end with an explicit STOP after the first
  section. If it doesn't, Copilot will write all 9 in one turn and hit
  output limits halfway through.
</div>

## Common issues

!!! tip "If the plan is generic"
    Copilot didn't read your files. Reopen them in the editor, then re-run
    `/plan` and explicitly reference `SKILL.md` and `agenda.md` in the prompt.

## Next step

Continue to **[6. Generate the web app](07-generate-web-app.md)**.
