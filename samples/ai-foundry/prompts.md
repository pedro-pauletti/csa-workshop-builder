# Foundry sample — Copilot prompts

Use the canonical prompts in `templates/copilot-prompts.md`. Below are the
Foundry-flavored adaptations.

## Plan the implementation

```text
/plan

Read SKILL.md and agenda.md in this folder.

Build an agenda-driven workshop web app showcasing Azure AI Foundry:
agents, evaluations, tracing, model catalog, governance.

Stack: Python 3.11, FastAPI, Jinja2, vanilla JS, Docker Compose. All demo
backends mocked by default; structured for swap-in to real Foundry endpoints.

Produce an implementation plan first. List files. Call out assumptions.
```

## Implement the first version

```text
Implement the workshop app per the approved plan.

Mocks:
- Grounded chat with sources
- Hybrid search results with scores
- Multi-step agent timeline
- Document analysis structured output
- Evaluation scorecard

No real Foundry credentials. Use example.env placeholders only.
```

## Adapt to a specific Foundry sub-scenario

```text
Adapt this Foundry sample for [specific use case, e.g., contact-center agent].

- Update customer-scenario.md.
- Keep agenda structure; reword item descriptions.
- Update demo mock data to feel relevant to the new use case.
- Confirm no architecture changes are required.
```
