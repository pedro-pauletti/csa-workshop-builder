# 12. Reuse and scale

## Goal

Make this pattern repeatable across CSAs, customers, products, and industries.

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
