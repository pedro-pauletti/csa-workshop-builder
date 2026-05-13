# How CSAs can create engaging workshops tailored to customer use cases

A practical guide for Microsoft CSAs (Cloud Solution Architects) to build a
customer-specific, interactive **workshop web app** with **GitHub Copilot**,
driven by a `SKILL.md` + `agenda.md` pattern.

This repository **is the tutorial** and **also publishes a running worked
example**. The tutorial site is built with **MkDocs Material**; the worked
example — **Contoso Outdoor Search**, a fictional health-plan member-services
copilot — ships as a fully static demo under `docs/demo/` and is reachable at
the same site under `/demo/`.

## What you will learn

- How to translate a customer scenario into a workshop narrative.
- How to write a `SKILL.md` that instructs GitHub Copilot to scaffold an
  agenda-driven workshop web app (FastAPI + Jinja2 + Docker).
- How to write an `agenda.md` that becomes the navigation and structure of the
  app.
- How to use **GitHub Copilot `/plan`** to plan before implementing.
- How to add explanatory sections and embedded interactive demos.
- How to apply a named design system (Foundry Violet / Contoso Outdoor Teal /
  Fabric Indigo) so customer workshops look coherent without bespoke design.
- How to run locally with Docker Compose and publish the tutorial + live demo
  to GitHub Pages.
- How to customize the same app for a different customer or Microsoft product
  (Azure AI Foundry, Microsoft Fabric, M365 Copilot, Security, GitHub Copilot).

## The shape of the tutorial

- **Modules 1 → 12** build Contoso Outdoor Search end-to-end. Each module
  produces an artifact the next module consumes; by module 12 you have a
  working, branded, publishable app.
- **Module 13** is the only module about *swapping Contoso Outdoor out*. It shows
  the surgical changes — `customer-scenario.md` + `agenda.md` + palette +
  logo — that turn the same scaffolding into a different customer or product
  workshop.

## Repository layout

```text
.
├── docs/                         # MkDocs source — the tutorial pages
│   ├── demo/                     # Static Contoso Outdoor Search demo — published at /demo/
│   └── …
├── templates/                    # Reusable SKILL / agenda / scenario templates
│   ├── SKILL.template.md         # Rich Copilot contract (frontmatter + Rules + Design System)
│   ├── agenda.template.md
│   ├── customer-scenario.template.md
│   ├── requirement-mapping.template.md
│   └── copilot-prompts.md
├── samples/
│   ├── generic-ai-workshop/                   # Canonical generic sample
│   ├── contoso-outdoor-search-workshop/       # Worked end-to-end example artifacts
│   ├── ai-foundry/                            # Stub
│   └── fabric/                                # Stub
├── assets/                       # Images and Mermaid diagram sources
├── mkdocs.yml                    # MkDocs Material configuration
├── requirements-docs.txt         # Python dependencies for the docs site
└── .github/workflows/deploy-docs.yml  # GitHub Pages deployment
```

## Run the docs site locally

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# Linux/macOS
# source .venv/bin/activate

pip install -r requirements-docs.txt
mkdocs serve
```

Open <http://127.0.0.1:8000>. The live Contoso Outdoor Search demo is at
<http://127.0.0.1:8000/demo/>.

## Publish to GitHub Pages

The workflow at `.github/workflows/deploy-docs.yml` runs `mkdocs gh-deploy` on
every push to `main`. After the first successful run:

1. Open the repository **Settings → Pages**.
2. Set **Source** to **Deploy from a branch**, branch **`gh-pages`**, folder
   **`/ (root)`**.
3. The site will be available at:

   ```text
   https://pedro-pauletti.github.io/csa-workshop-builder/
   ```

   And the live worked example at:

   ```text
   https://pedro-pauletti.github.io/csa-workshop-builder/demo/
   ```

## License

Internal Microsoft enablement material. Adapt freely for customer engagements;
do not commit real customer data.
