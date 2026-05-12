# 8. Add interactive demos

## Goal

Replace each section's demo placeholder with an **embedded, working interactive
component** — chat, search, workflow, document analysis, evaluation.

## Why it matters

Interactivity is what moves the workshop from passive viewing to active
engagement. Customers remember what they touched.

## Inputs

- Sections with demo TODO blocks from [Module 7](08-explanatory-sections.md).
- The demo type per section (from your agenda mapping table).

## Step-by-step

1. For each section, identify the demo type:
   - **Chat** — prompt input, streaming response, sources panel.
   - **Search** — query input, ranked results, source cards, score.
   - **Workflow** — run button, step-by-step timeline, status updates.
   - **Document analysis** — document picker, structured extraction output.
   - **Evaluation** — test cases, scorecards, traces.
2. Implement each as a self-contained Jinja2 partial + vanilla JS module.
3. Mock all backends locally first. Real services come later.
4. Confirm all demos work offline.

## Copilot prompt

```text
Add mock interactive demo components to the workshop app.

Required components, each as a Jinja2 partial + vanilla JS module:
- Chat demo: prompt input, simulated grounded response, sources panel.
- Search demo: query input, ranked source cards with relevance scores.
- Workflow demo: Run button, step-by-step execution timeline.
- Document analysis demo: sample document selector, structured extraction output.
- Evaluation demo: test cases, scorecards, observations.

Constraints:
- All demos must work locally with no external services.
- Structure the code so a real service (Foundry, Fabric, Search) can be plugged
  in later by replacing the mock module with a real httpx client.
- No real secrets. Use example.env for any future endpoints.
```

## Expected output

Every demo placeholder now renders a working, mocked interactive component.

## Validation checklist

- [ ] All demos render without external network calls.
- [ ] Each demo has a clear "swap mock for real service" extension point.
- [ ] All inputs are validated client-side.
- [ ] Demos degrade gracefully (clear error UI, fallback content).

## Common issues

!!! tip "Mocks that look fake"
    Use realistic sample data drawn from the customer scenario. Generic Lorem
    ipsum kills credibility.

## Next step

Continue to **[9. Customize by product and customer](10-customization-patterns.md)**.
