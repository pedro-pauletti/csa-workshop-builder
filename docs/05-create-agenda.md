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
