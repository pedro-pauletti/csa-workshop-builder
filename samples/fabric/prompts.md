# Fabric sample — Copilot prompts

Use the canonical prompts in `templates/copilot-prompts.md`. Below are the
Fabric-flavored adaptations.

## Plan the implementation

```text
/plan

Read SKILL.md and agenda.md in this folder.

Build an agenda-driven workshop web app showcasing Microsoft Fabric:
OneLake, Lakehouse, Pipelines, Notebooks, Semantic Models, Power BI,
Real-Time Intelligence.

Stack: Python 3.11, FastAPI, Jinja2, vanilla JS, Docker Compose. Demo
backends are mocked locally; no live Fabric API calls from the app.

Produce an implementation plan first. List files. Call out assumptions.
```

## Implement the first version

```text
Implement the workshop app per the approved plan.

Mocks:
- Lakehouse Bronze/Silver/Gold table viewer with sample rows
- Pipeline run with step timeline
- Read-only PySpark notebook snippet with sample output
- Static Power BI report screenshot + measure walkthrough
- KQL query over a streaming sample with chart
- Governance view: roles, sensitivity labels, lineage

No real customer data. example.env only.
```

## Adapt to a specific Fabric sub-scenario

```text
Adapt this Fabric sample for [specific use case, e.g., retail demand
forecasting].

- Update customer-scenario.md.
- Keep agenda structure; reword item descriptions.
- Update demo mock data with retail-flavored sample rows and KPIs.
- Confirm no architecture changes are required.
```
