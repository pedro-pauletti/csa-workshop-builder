# 4. Create the agenda.md

## Goal

Write an `agenda.md` that becomes the **single source of truth** for the
workshop app's navigation, sections, and content placeholders.

## Why it matters

The agenda *is* the application contract. Adding a section is editing one
markdown file — not editing routes, templates, and navigation in three places.
This is what makes the pattern reusable.

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

## Worked example — Northwind agenda (9 items)

```text
### Data to be used by SKILL.md to create the Workshop App

- Welcome and engagement framing: Set the business context for Northwind, the call-centre numbers, and the goal of the day.
- Member journeys today: Walk through three real (anonymized) call types and where the friction lives.
- The MemberAssist concept: Introduce the copilot pattern — grounding, citations, human-in-the-loop, PHI promise.
- Demo 1 - Benefits chat: Embedded chat that answers benefits-coverage questions grounded in plan documents with inline citations.
- Demo 2 - Provider search: Provider-directory search with location, specialty, in-network filter; results show ranking signals.
- Demo 3 - Claim status: Claim-status resolution with a visual timeline (received → adjudicated → paid → notified).
- Demo 4 - EOB document analysis: Drag-and-drop an EOB PDF; the app extracts member, provider, charges, and explains each line.
- Demo 5 - Evaluation dashboard: Scorecards for groundedness, harm, and a PHI-leak gauge.
- Roadmap and next steps: Co-edit the 30/60/90 plan with the room. Capture commitments and named owners.
```

Generated route table (full 9 items):

| Agenda title | Slug | URL | Suggested icon |
|---|---|---|---|
| Welcome and engagement framing | `welcome_and_engagement_framing` | `/sections/welcome_and_engagement_framing` | `bi-megaphone` |
| Member journeys today | `member_journeys_today` | `/sections/member_journeys_today` | `bi-signpost` |
| The MemberAssist concept | `the_memberassist_concept` | `/sections/the_memberassist_concept` | `bi-lightbulb` |
| Demo 1 - Benefits chat | `demo_1_benefits_chat` | `/sections/demo_1_benefits_chat` | `bi-chat-quote` |
| Demo 2 - Provider search | `demo_2_provider_search` | `/sections/demo_2_provider_search` | `bi-search` |
| Demo 3 - Claim status | `demo_3_claim_status` | `/sections/demo_3_claim_status` | `bi-list-check` |
| Demo 4 - EOB document analysis | `demo_4_eob_document_analysis` | `/sections/demo_4_eob_document_analysis` | `bi-file-earmark-text` |
| Demo 5 - Evaluation dashboard | `demo_5_evaluation_dashboard` | `/sections/demo_5_evaluation_dashboard` | `bi-clipboard-data` |
| Roadmap and next steps | `roadmap_and_next_steps` | `/sections/roadmap_and_next_steps` | `bi-flag` |

<div class="tips" markdown>
**Agenda tips**

- 9 items = half-day. 7 = 90 min. 12 only for full-day. Don't pack more.
- Wrap-up *and* roadmap are two different items. Wrap-up summarizes;
  roadmap commits.
- Re-order by editing one line in `agenda.md`. Do not re-run Copilot for
  re-ordering — auto-discovery handles it.
- Keep titles short (sidebar truncates around 28 chars).
- The first agenda item should never be a demo. Audiences need framing
  first.
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

Continue to **[5. Use GitHub Copilot /plan](06-copilot-plan.md)**.
