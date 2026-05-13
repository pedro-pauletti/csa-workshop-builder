# 4. agenda.md for Contoso Outdoor

## Goal

Write the **`agenda.md`** for Contoso Outdoor Search. This single file becomes
the source of truth for the workshop app's sidebar, sections, and routing.
Adding a section to the live demo is editing one line here.

## Why it matters

The agenda *is* the application contract. Adding a section is editing one
markdown file — not editing routes, templates, and navigation in three places.
This is what makes the pattern reusable across customers (see module 13).

## Inputs

- Customer scenario.
- SKILL.md.
- `templates/agenda.template.md`.

## Step-by-step

1. Copy `templates/agenda.template.md` to your working folder as `agenda.md`.
2. Write **8–12 agenda items**. Each item is a single line:
   `- <Section title>: <One-sentence description>`.
3. Order items as a narrative arc: context → architecture → demos → ops →
   wrap-up.
4. Keep titles short (they become sidebar links).
5. Keep descriptions concrete — they drive what Copilot generates per section.

## Copilot prompt

```text
Read SKILL.md, customer-scenario.md, and agenda.md.

For each agenda item, propose:
- A learning objective (1 line)
- The requirement IDs it maps to
- The demo type (explanatory, chat, search, workflow, document-analysis, evaluation)
- A fallback strategy if the live demo fails

Output a table.
```

## Expected output

An `agenda.md` with 8–12 narrative items and a Copilot-generated mapping table
you can paste back into the agenda or into a presenter guide.

## Heading anchor — what the parser actually reads

The reference `agenda_loader.py` does **not** parse the whole file. It
finds a specific heading and reads only the bullets directly under it.
This lets you keep prose, screenshots, and meeting notes anywhere else
without confusing the parser.

The expected heading:

```text
### Data to be used by SKILL.md to create the Workshop App
```

You may rename it — but if you do, update `agenda_loader.py` to match.
The bullet format is fixed: `- <Title>: <One-sentence description>`.

## From agenda line to app

One line in `agenda.md` produces a folder, a route, a sidebar entry, and
a section page. The folder name (slug) is `normalize_for_match(title)` —
lowercase, alphanumeric only, underscores between words.

| `agenda.md` line | Slug (folder) | Generated route | Sidebar entry |
|---|---|---|---|
| `- Demo 1 - Benefits chat: ...` | `demo_1_benefits_chat` | `/sections/demo_1_benefits_chat` | Demo 1 — Benefits chat |
| `- Demo 3 - Claim status: ...` | `demo_3_claim_status` | `/sections/demo_3_claim_status` | Demo 3 — Claim status |
| `- Architecture: ...` | `architecture` | `/sections/architecture` | Architecture |
| `- Evaluation: ...` | `evaluation` | `/sections/evaluation` | Evaluation |

```text
agenda.md  ─────► agenda_loader.py ─────► dynamic sidebar + section routes
   (edit)             (reads at request)        (no app code changes)
```

![Dynamic sidebar generated from agenda.md](assets/images/sidebar.svg){ .screenshot }

## Contoso Outdoor agenda (6 items, matches the live demo)

The published [live demo](../demo/) sidebar comes from exactly this file:

```text
### Data to be used by SKILL.md to create the Workshop App

- Coverage Lookup: Conversational benefits Q&A grounded on the plan document; cites the plan section.
- Claim Status: Claim-status lookup by member ID + claim ID, sourced from the adjudication store (read-only).
- Provider Search: Filterable in-network directory by specialty, ZIP, and accepting-new-patients.
- EOB Document Extraction: Paste an Explanation of Benefits; extract structured fields and explain each line.
- Evaluation Scorecard: Groundedness, relevance, latency, and PHI-leak gauge on a fixed test set.
- Roadmap & Next Steps: Pilot scope, out-of-scope items, 30/60/90 plan, and asks of Contoso Outdoor.
```

Generated route table:

| Agenda title | Slug | URL | Suggested icon |
|---|---|---|---|
| Coverage Lookup | `coverage_lookup` | `/sections/coverage_lookup` | `fa-solid fa-comments` |
| Claim Status | `claim_status` | `/sections/claim_status` | `fa-solid fa-receipt` |
| Provider Search | `provider_search` | `/sections/provider_search` | `fa-solid fa-user-doctor` |
| EOB Document Extraction | `eob_document_extraction` | `/sections/eob_document_extraction` | `fa-solid fa-file-invoice` |
| Evaluation Scorecard | `evaluation_scorecard` | `/sections/evaluation_scorecard` | `fa-solid fa-chart-line` |
| Roadmap & Next Steps | `roadmap_next_steps` | `/sections/roadmap_next_steps` | `fa-solid fa-route` |

!!! tip "Want a longer agenda?"
    The Contoso Outdoor kickoff agenda above is **demo-dense** on purpose — the live
    static demo only renders demos. For a real half-day workshop you typically
    open with 2–3 context items before the demos and close with 1–2 wrap-up
    items. The longer version lives in
    [`samples/contoso-outdoor-search-workshop/agenda.md`](https://github.com/pedro-pauletti/csa-workshop-builder/tree/main/samples/contoso-outdoor-search-workshop/agenda.md).

<div class="tips" markdown>
**Agenda tips**

- 6 items = the rendered demo. 8–9 = half-day workshop. Don't pack more.
- Wrap-up *and* roadmap are two different items. Wrap-up summarizes;
  roadmap commits.
- Re-order by editing one line in `agenda.md`. Do not re-run Copilot for
  re-ordering — auto-discovery handles it.
- Keep titles short (sidebar truncates around 28 chars).
- The first agenda item in a *real* workshop should never be a demo —
  audiences need framing first.
</div>

## Validation checklist

- [ ] 8–12 items, ordered as a narrative arc.
- [ ] Every item maps to at least one requirement.
- [ ] Mix of explanatory and interactive sections.
- [ ] Wrap-up summarizes coverage and next steps.

## Common issues

!!! warning "Too many demos in a row"
    Customers fatigue. Interleave concept → demo → evidence → discussion.

## Next step

Continue to **[5. Plan with Copilot](06-copilot-plan.md)** — where you ask
Copilot Chat `/plan` to read the SKILL + agenda you just wrote, before any
code is generated.

<div class="module-step"><span class="pill">Module 4 of 12</span> Agenda authored. Next: Copilot /plan.</div>
