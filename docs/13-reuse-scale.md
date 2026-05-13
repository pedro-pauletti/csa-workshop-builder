# 12. Reuse and scale

## Goal

Make this pattern repeatable across CSAs, customers, products, and industries.

## Three-repo promotion flow

![Three-repo flow](assets/images/three-repo-flow.svg){ .screenshot }

| Direction | What flows | Example |
|---|---|---|
| Customer repo → Template repo | Stable, customer-agnostic improvements. | A better `agenda_loader` parser. |
| Template repo → Tutorial repo | Method-level changes. | A new validation step that catches a class of misfires. |
| Tutorial repo → Customer repo | The method itself (always pulled, never pushed). | Updated prompts, new modules. |

## Why it matters

A great single workshop is good for one engagement. A reusable pattern raises
the floor for the whole CSA team.

## Inputs

- A working tutorial site and at least one generated workshop app.
- A short feedback loop with peers who deliver workshops.

## Step-by-step

1. Maintain `templates/` as the canonical version. Improvements flow back here
   from real engagements.
2. Maintain `samples/` as living examples — at least one per top Microsoft
   product family in scope.
3. Add a "what changed" summary at the top of every sample so peers can copy
   the right one.
4. Run a quarterly review with the CSA team to:
   - Promote good local edits back into `templates/`.
   - Retire stale demos.
   - Add new product samples.
5. Keep the SKILL contract stable. Evolve content, not architecture.

## Copilot prompt

```text
Compare the latest customer's SKILL.md and agenda.md to the canonical
templates/ versions in this repo.

Output:
- Diffs that look like genuine improvements (promote to templates).
- Diffs that look like one-off customer edits (keep in sample only).
- Recommended template updates as a patch.
```

## Validation checklist

- [ ] Templates evolve every quarter.
- [ ] Each top product family has a sample.
- [ ] Samples carry a "what changed vs template" note.
- [ ] No customer-specific content in templates.

## Mini case study — what promoted from Northwind back to template

After the (fictional) Northwind engagement, the CSA team ran a promotion
review. Three changes were considered:

| Change | Decision | Why |
|---|---|---|
| Add `## Compliance` section as a SKILL.md requirement. | **Promoted** to template | Every regulated-industry customer needs an equivalent. The header is universal even if the rules differ. |
| Add a **PHI-leak gauge** to `data/evaluation.json`. | **Promoted** as a generic "regulated-data leak gauge" | Reused as PII-leak for retail, IP-leak for legal. Same shape, different label. |
| Use Northwind brand colours in the Copilot prompt. | **Kept customer-only** | Brand colours are by definition not reusable. The *pattern* of "set colours via one prompt" was already in the template. |

The pattern: **generic shape promotes; specific values stay local.**

<div class="tips" markdown>
**Scaling tips**

- Run the quarterly retro across CSAs even when nobody volunteers. The
  improvements that matter most rarely come from the people who
  volunteer first.
- Tag every customer repo with the template version it cloned from
  (`metadata.basedOn` in the SKILL.md frontmatter). When you find a
  bug in the template, you know which customers to notify.
- Promote small deltas often. Monolithic "v2 of the template" releases
  scare the field; one-line improvements get adopted in days.
- Keep a **public** sample (Northwind) updated to current template even
  when no real engagement uses it. It's the canonical "what done looks
  like" link you'll send to every new CSA.
- Track *which* push-back prompts get used most often. Those are the
  ones to elevate from `prompts.md` into `SKILL.md` push-back rules.
</div>

## Common issues

!!! warning "Template rot"
    If templates haven't changed in 6 months, either the pattern is perfect
    (unlikely) or peers aren't promoting their improvements. Run a review.

## Closing

You now have:

- A repeatable method.
- Templates and samples.
- A published tutorial site.
- A pattern that scales across products and customers.

Go build a workshop your customer will remember.
