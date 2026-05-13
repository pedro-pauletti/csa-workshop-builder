# 9. Interactive demos — Northwind mocks

## Goal

Replace each Northwind section's demo placeholder with an **embedded, working
interactive component** powered by local JSON — the same mocks you can see in
action under [`docs/demo/`](../demo/).

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

## Mock data per demo

### Chat

![Chat demo](assets/images/demo-chat.svg){ .screenshot }

```json
{
  "question": "How can I reduce call center handling time?",
  "answer": "Summarize the customer's call, propose the next best action, and surface the top 3 KB articles.",
  "sources": [
    {"title": "Customer service playbook", "url": "kb://playbook/handling-time"},
    {"title": "Knowledge article KB-1024", "url": "kb://articles/1024"}
  ],
  "trace": [
    "Received user prompt",
    "Retrieved 3 documents (avg score 0.81)",
    "Generated grounded answer",
    "Scored response quality: 0.92"
  ]
}
```

### Search

![Search demo](assets/images/demo-search.svg){ .screenshot }

```json
{
  "query": "billing dispute resolution",
  "results": [
    {"title": "Billing disputes — agent guide", "score": 0.91, "snippet": "Open the ticket, verify identity..."},
    {"title": "Refund policy v3", "score": 0.84, "snippet": "Refunds above $X require manager approval..."},
    {"title": "Escalation matrix", "score": 0.72, "snippet": "Tier-1 unresolved within 24h → Tier-2..."}
  ]
}
```

### Workflow

![Workflow demo](assets/images/demo-workflow.svg){ .screenshot }

```json
{
  "workflow": "agent-assist-resolution",
  "steps": [
    {"name": "Classify intent", "status": "done", "ms": 120},
    {"name": "Retrieve KB", "status": "done", "ms": 340},
    {"name": "Draft response", "status": "done", "ms": 980},
    {"name": "Safety check", "status": "done", "ms": 110},
    {"name": "Present to agent", "status": "ready", "ms": 0}
  ]
}
```

### Document analysis

![Document analysis demo](assets/images/demo-document.svg){ .screenshot }

```json
{
  "document": "invoice-2024-0042.pdf",
  "extracted": {
    "vendor": "Contoso Logistics",
    "invoice_number": "INV-2024-0042",
    "total": 12450.75,
    "currency": "USD",
    "line_items": 7,
    "due_date": "2024-11-30"
  },
  "confidence": 0.94
}
```

### Evaluation

![Evaluation dashboard](assets/images/demo-eval.svg){ .screenshot }

```json
{
  "suite": "customer-service-q4",
  "cases": 42,
  "scores": {
    "groundedness": 0.88,
    "relevance": 0.91,
    "harm": 0.02,
    "latency_p95_ms": 1450
  },
  "regressions": []
}
```

## Worked example — Northwind variants

Each demo type customized to the Northwind member-services scenario. Drop
these in `data/*.json` and the section sub-apps render against them
unchanged.

### Chat — grounded benefits Q&A

```json
{
  "demo": "Benefits chat",
  "requirement": "R1",
  "turns": [
    { "role": "member",
      "text": "Is a colonoscopy covered if I'm 42 and my doctor recommends it?" },
    { "role": "assistant",
      "text": "Yes. Your Northwind Choice PPO plan covers screening colonoscopies starting at age 40 when ordered by an in-network provider. Your cost share is $0 for the screening itself; sedation and pathology may be billed separately under the diagnostic benefit.",
      "confidence": 0.91,
      "citations": [
        {"doc": "Northwind Choice PPO 2025 Summary of Benefits", "section": "Preventive services", "page": 7},
        {"doc": "Member Handbook 2025", "section": "Diagnostic vs. screening procedures", "page": 33}
      ]
    }
  ],
  "failure_case": {
    "member_text": "How much will my surgery cost next month?",
    "handoff": true,
    "assistant_text": "I can't predict surgery cost without the procedure code and provider. I'm handing this to a member-services agent."
  }
}
```

### Search — provider directory ranking

![Northwind provider search ranking](assets/images/demo-search.svg){ .screenshot }

Top result includes ranking signals (`distance`, `in_network`,
`specialty_match`, `patient_satisfaction`, `wait_time_days`) so the
audience can see *why* a provider ranked first. The third result is
intentionally excluded by an `accepts_new_patients=false` rule and only
appears when the user toggles "include established-only" — compliance
loves this.

### Workflow — claim-status timeline (hero demo)

![Northwind claim-status timeline](assets/images/northwind-claim-workflow.svg){ .screenshot }

Five canonical states with the source-system badge per step. The failure
path (`PEND-COB-001`) freezes at "validated" and surfaces a human-handoff
CTA with the trace pre-loaded.

### Document analysis — EOB extraction

![Northwind EOB extraction](assets/images/northwind-eob-extract.svg){ .screenshot }

Drag-and-drop an EOB PDF; the app extracts 21 fields and produces a
plain-English explanation written for member literacy. Failure path:
2019 legacy template falls below the 0.40 layout-match confidence and
falls back to raw OCR + member-services verification.

### Evaluation — scorecard with PHI-leak gauge

![Northwind evaluation dashboard](assets/images/northwind-eval-scorecard.svg){ .screenshot }

Five scorecards including the **PHI-leak gauge** (intentionally in *warn*
state in the sample data). Walk EVAL-INC-2025-031 from incident → cause
(new EOB template) → mitigation (allow-list + retrain). This is the
demo compliance audits in real engagements.

Full mock-data files:
[`samples/northwind-memberassist-workshop/data/`](https://github.com/pedro-pauletti/csa-workshop-builder/tree/main/samples/northwind-memberassist-workshop/data)

## Advanced pattern — real-Azure extension

The reference architecture keeps real Azure code out of the workshop app
itself. Provisioning and configuration live in `infra/scripts/*.ipynb` —
one notebook per Azure resource. The workshop app *consumes* the
resources but is not responsible for creating them.

```text
infra/scripts/
├── configure_search_index.ipynb        # provision/refresh AI Search index
├── configure_member_agent.ipynb        # provision Foundry agent + tools
└── generate_eob_samples.ipynb          # synthesize EOB PDFs for the demo
```

Why notebooks (not Bicep, not Terraform):

- They are **rerunnable** by a CSA without IaC tooling on the laptop.
- They produce **artifacts in the chat** (response bodies, IDs) that the
  CSA pastes into `example.env`.
- They are **read aloud** in the workshop's "real architecture" section
  to show the audience what is *actually* provisioned.

The workshop app reads endpoints from environment variables; if a
variable is unset, the app falls back to the mock in `data/`. This means
the same code runs offline (mock) and online (real) without flags.

<div class="tips" markdown>
**Demo tips**

- Realistic-looking sample data buys 90% of perceived quality. Use
  customer vocabulary; avoid Lorem ipsum and "Customer A".
- Always show *one* failure case per demo. Audiences trust the system
  more, not less.
- Mock latency too — instant returns look fake. 600–1200 ms with a
  spinner reads as real.
- Keep the "Synthetic data" badge visible the entire time. Compliance
  decides in the first 90 seconds whether to trust the rest of the day.
- Pre-warm any cache before the executive read-out. Cold first
  extraction looks like a 2-second hang and undoes the previous demo.
</div>

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

Continue to **[10. Visual identity & theme](10-customization-patterns.md)**.

<div class="module-step"><span class="pill">Module 9 of 12</span> Demos work. Next: lock the visual identity.</div>
