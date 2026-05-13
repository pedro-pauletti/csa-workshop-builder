# How CSAs can create engaging workshops tailored to customer use cases

A practical guide for Microsoft CSAs (Cloud Solution Architects) to create
customer-specific, interactive **workshop web apps** with **GitHub Copilot**,
driven by a `SKILL.md` + `agenda.md` pattern.

This repository **is the tutorial**. It is published as a static documentation
site using **MkDocs Material** and **GitHub Pages**. It does not contain the
generated workshop app itself — it teaches you how to create one.

> **Worked example included.** The tutorial ships with a complete, named,
> customer-flavoured example — **Northwind MemberAssist**, a fictional
> health-plan member-services copilot — under
> [`samples/northwind-memberassist-workshop/`](samples/northwind-memberassist-workshop/).
> It is the gold reference for what a finished, customized workshop looks
> like. See module 14 ("Worked example") on the tutorial site.

## What you will learn

- How to translate a customer scenario into a workshop narrative.
- How to write a `SKILL.md` that instructs GitHub Copilot to scaffold an
  agenda-driven workshop web app (FastAPI + Jinja2 + Docker).
- How to write an `agenda.md` that becomes the navigation and structure of the
  app.
- How to use **GitHub Copilot `/plan`** to plan before implementing.
- How to add explanatory sections and embedded interactive demos.
- How to customize the workshop for different Microsoft products and customer
  use cases (Azure AI Foundry, Microsoft Fabric, and more).
- How to run locally with Docker Compose and publish the tutorial to GitHub
  Pages.

## Repository layout

```text
.
├── docs/                         # MkDocs source — the tutorial pages
├── templates/                    # Reusable SKILL / agenda / scenario templates
├── samples/
│   ├── generic-ai-workshop/                   # Canonical generic sample
│   ├── northwind-memberassist-workshop/       # Worked end-to-end example
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

Open <http://127.0.0.1:8000>.

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

## License

Internal Microsoft enablement material. Adapt freely for customer engagements;
do not commit real customer data.
