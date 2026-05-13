# 12. Validation & polish

## Goal

Confirm that the Northwind MemberAssist deliverable — local app + sample
artifacts + published live demo + tutorial site — is **workshop-ready** before
you call the engagement done.

## Why it matters

Polish is what separates a CSA prototype from a deliverable. The 30 minutes
spent here saves the four hours of rehearsal embarrassment that "just one more
thing" will otherwise cost you.

## Inputs

- All twelve previous modules done.
- The repo pushed to GitHub.
- The Pages site live at
  `https://pedro-pauletti.github.io/csa-workshop-builder/`.

## End-to-end checklist

### Artifacts

- [ ] `templates/SKILL.template.md` reflects the latest agreed contract.
- [ ] `samples/northwind-memberassist-workshop/customer-scenario.md` filled.
- [ ] `samples/northwind-memberassist-workshop/agenda.md` has the 6 items.
- [ ] `samples/northwind-memberassist-workshop/.github/skills/workshop-creation/SKILL.md`
      has `metadata.theme: northwind-teal`.
- [ ] All 5 mock JSON files exist under `data/`.

### Local app

- [ ] `docker compose up --build` works from a clean clone.
- [ ] `http://localhost:8080` shows 6 sidebar items.
- [ ] `GET /healthz` returns `{"agenda_items": 6, "sections_loaded": 6}`.
- [ ] Each section renders without console errors.
- [ ] Each demo returns a result within 1.5 s.
- [ ] Light/dark toggle persists.

### Live demo (`/demo/`)

- [ ] [Live demo](../demo/) loads.
- [ ] Sidebar lists the 6 Northwind items + Home.
- [ ] Coverage Lookup answers the seeded prompts.
- [ ] Claim Status form returns a claim and timeline.
- [ ] Provider Search filters by specialty + ZIP.
- [ ] EOB Document Extract pulls structured fields from the pasted text.
- [ ] Evaluation Scorecard renders the 4 metrics and PHI-leak gauge.
- [ ] Roadmap section shows the 30/60/90.

### Tutorial site

- [ ] `mkdocs build --strict` exits 0.
- [ ] Every internal link resolves (no `14-worked-example.md`,
      no `13-reuse-scale.md` left).
- [ ] The top-nav **Live demo ↗** opens the working Northwind app.
- [ ] Module footers all show the right `Module N of 12` pill.

### Content / brand

- [ ] No real PHI anywhere.
- [ ] Customer name (Northwind) appears only in scenario file + one
      template variable — not hard-coded in components.
- [ ] All citations point to fictional plan documents.
- [ ] The "synthetic data" badge is visible on every demo.

## Copilot prompt — final review

```text
You are a strict CSA reviewer. Read SKILL.md, agenda.md,
customer-scenario.md, every section under sections/, every file under
data/, and the docs/demo/ folder.

Produce a one-page review with:

1. Three things that work.
2. Three weakest moments in the workshop.
3. Top 5 line-level fixes (file:line and the proposed change).
4. One question you would ask the account lead before delivery.

Do not change any file. Only output the review.
```

## Rehearsal script (45 minutes)

| Minute | Activity |
|---|---|
| 0–5 | Open the live demo on the projector. Sanity check fonts and colors. |
| 5–15 | Walk Coverage Lookup → Claim Status → Provider Search. Time each. |
| 15–25 | EOB Extraction with a deliberately weird input. Use the failure path. |
| 25–35 | Evaluation Scorecard — explain the PHI-leak gauge to a non-technical person in the room. |
| 35–40 | Roadmap. Edit one item live to show editability. |
| 40–45 | Ask three audience-style questions and answer with the trace panel. |

## Hand-off pack

Before you close the engagement, send the account lead a single email with:

1. Repo URL.
2. Live demo URL.
3. Tutorial URL.
4. The 6 agenda items as a numbered list with one-sentence descriptions.
5. The 6 mapped requirement IDs (R1–R6).
6. The Compliance bullet block from SKILL.md (PHI, no real keys, etc.).

That email is what the account lead forwards inside the customer. Make it
copy-pasteable.

## Common issues

!!! warning "Slug collision on a renamed agenda item"
    `Coverage Lookup` and `Coverage` both normalize to `coverage`.
    `agenda_loader` must hard-error on duplicate slugs.

!!! warning "Demo loads from disk but not from Pages"
    Pages serves with a trailing slash and is case-sensitive.
    Confirm `fetch('sections/coverage-lookup.html')` uses a **relative**
    path and lowercase filenames.

!!! warning "FOUC on first paint"
    `data-theme` is being read after CSS. Move the read into a synchronous
    `<script>` in `<head>` *before* the stylesheet link.

## Next step

The Northwind deliverable is done. Continue to
**[13. Customize for your customer or product](13-customize.md)** when you're
ready to swap Northwind out for a different engagement.

<div class="module-step"><span class="pill">Module 12 of 12 ✓</span> Northwind MemberAssist is workshop-ready. End-to-end deliverable complete.</div>
