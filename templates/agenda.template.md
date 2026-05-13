# Workshop Agenda (template)

> Each line under "Sections" becomes one section in the workshop app.
> Format: `- <Section title>: <One-sentence description>`.
> Keep titles short (sidebar). Keep descriptions concrete (drives content).

## Sections

- Introduction and customer context: Explain the business scenario, audience, goals and success criteria.
- Requirement mapping: Show how each customer requirement maps to a workshop section and demo.
- Solution architecture: Explain the proposed architecture, services, integrations and data flow.
- Guided web app experience: Demonstrate the workshop app navigation, presenter mode and section structure.
- Demo 1 — Conversational AI: Show an embedded chat experience with grounded responses and traces.
- Demo 2 — Intelligent search: Show retrieval, filtering, ranking, source grounding and answer generation.
- Demo 3 — Workflow automation: Show a step-by-step business process executed by an agent or simulated backend.
- Demo 4 — Document analysis: Show extraction, summarization and structured output from sample documents.
- Code walkthrough: Explain key snippets from the generated app and service calls.
- Governance and operations: Show security, secrets handling, logging, observability and fallback strategy.
- Evaluation and quality: Show test prompts, metrics, traces and response quality assessment.
- Wrap-up and next steps: Summarize requirement coverage, risks, dependencies and recommended roadmap.

---

## Heading-anchor convention (advanced)

The reference architecture's `agenda_loader.py` only reads bullets that
appear under a specific heading. This lets you keep prose, screenshots
and meeting notes anywhere else in `agenda.md` without confusing the
parser.

The expected heading is:

```text
### Data to be used by SKILL.md to create the Workshop App
```

You may rename it, but if you do, update `agenda_loader.py` to match.

## Worked example — Northwind MemberAssist

A filled-in agenda for the Northwind MemberAssist sample (see
`samples/northwind-memberassist-workshop/agenda.md`):

```text
### Data to be used by SKILL.md to create the Workshop App

- Welcome and engagement framing: Set the business context for Northwind...
- Member journeys today: Walk through three real (anonymized) call types...
- The MemberAssist concept: Introduce the copilot pattern...
- Demo 1 - Benefits chat: Embedded chat that answers benefits-coverage...
- Demo 2 - Provider search: Provider-directory search with location...
- Demo 3 - Claim status: Claim-status resolution with a visual timeline...
- Demo 4 - EOB document analysis: Drag-and-drop an EOB PDF; the app extracts...
- Demo 5 - Evaluation dashboard: Scorecards for groundedness, harm, and a PHI-leak gauge...
- Roadmap and next steps: Co-edit the 30/60/90 plan with the room...
```
