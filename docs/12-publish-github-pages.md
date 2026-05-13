# 11. Publish with GitHub Pages

## Goal

Publish **this tutorial site and the Contoso Outdoor live demo** (which lives at
`docs/demo/`) to **GitHub Pages** in a single workflow run. After this module,
the CSA reading the tutorial can click *Live demo ↗* in the top nav and see
the finished Contoso Outdoor app rendered on the same GitHub Pages site.

## Why it matters

A published tutorial is shareable, linkable, searchable, and versioned. It's
how you scale the pattern across the CSA team.

!!! warning "GitHub Pages serves static files only"
    GitHub Pages **cannot** host the generated workshop FastAPI app — it
    needs a runtime. Use the matrix below to choose the right host per
    artifact.

    | Artifact | Where to publish |
    |---|---|
    | This MkDocs tutorial | GitHub Pages (static). |
    | Generated workshop app (FastAPI) | Local Docker, **Codespaces**, **Azure Container Apps**, **Azure App Service**. |
    | A static export of a section | GitHub Pages (only if no backend calls). |

## Inputs

- The repository pushed to GitHub.
- Repository admin access (to enable Pages).

## Step-by-step

1. Confirm `.github/workflows/deploy-docs.yml` exists in the repo.
2. Push to the `main` branch.
3. Wait for the **Deploy MkDocs site** workflow to succeed.
4. Open repository **Settings → Pages**.
5. Set **Source** to **Deploy from a branch**, branch **`gh-pages`**,
   folder **`/ (root)`**.
6. Visit `https://pedro-pauletti.github.io/csa-workshop-builder/`.

## The workflow (already in this repo)

```yaml title=".github/workflows/deploy-docs.yml"
name: Deploy MkDocs site

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: pip
      - run: pip install -r requirements-docs.txt
      - run: mkdocs build --strict
      - run: mkdocs gh-deploy --force --no-history
```

## Copilot prompt

```text
Audit .github/workflows/deploy-docs.yml against best practices for an MkDocs
Material site published to GitHub Pages:
- Pinned action versions
- Python cache for pip
- mkdocs build --strict before deploy
- Minimum required permissions
- Triggers on push to main and manual dispatch

Return: a diff with improvements.
```

## Validation checklist

- [ ] Workflow runs green on push to `main`.
- [ ] `gh-pages` branch is created/updated.
- [ ] Site is reachable at the GitHub Pages URL.
- [ ] `mkdocs build --strict` passes (no broken links).

## Workshop-app deployment matrix

The *workshop app* (FastAPI) needs a runtime — pick one based on your
constraints:

| Target | When to use | One-liner |
|---|---|---|
| **Local Docker** | Rehearsal, offline customer site. | `docker compose up --build` |
| **GitHub Codespaces** | "Click and run" for a single CSA reviewer. | Add `.devcontainer/devcontainer.json`, open in browser. |
| **Azure Container Apps** | Pilot phase (real users, real auth). | `az containerapp up --source .` |
| **Azure App Service** | Long-running pilot tied to enterprise SSO. | `az webapp up --runtime PYTHON:3.11` |
| **Azure Static Web Apps** | Only if you've stripped the FastAPI backend. | Out of scope for the workshop pattern. |

The MkDocs *tutorial* (this site) goes to GitHub Pages either way.

## EMU caveat — corporate organizations with Actions disabled

If your repository lives in a Microsoft (or similar) Enterprise Managed
User org with **GitHub-hosted runners disabled**, the workflow above
will fail with a billing/runner error. Two options:

1. **Self-hosted runner** — works, but requires org infrastructure.
2. **Local `mkdocs gh-deploy` from the CSA's machine** — fastest path:

```bash
pip install -r requirements-docs.txt
mkdocs gh-deploy --remote-name origin --force
```

This pushes a built site directly to the `gh-pages` branch without a
workflow run. We hit this constraint ourselves on the corporate mirror
of this very repo — the personal-account fork is where the live site
runs.

## Common issues

!!! warning "404 on GitHub Pages"
    Pages source not yet configured. Open Settings → Pages and select branch
    `gh-pages`, folder `/ (root)`.

!!! warning "`mkdocs build --strict` fails on a broken link"
    Strict mode is intentional — fix the link rather than relaxing the build.

!!! warning "Material theme requests `/releases/latest` and 404s"
    The Material theme checks for the latest GitHub release on load. Cut a
    `v0.1.0` tag/release the first time you publish — the 404 disappears.

<div class="tips" markdown>
**Publishing tips**

- Cut a `v0.x` release the first time you publish. It clears the
  Material theme's `/releases/latest` 404 and gives you a clean
  versioning anchor.
- Pin `mkdocs-material` in `requirements-docs.txt`. Material releases
  break navigation rendering twice a year on average.
- Strict mode > permissive mode. A broken internal link is a five-minute
  fix today and a fifteen-minute archaeology project in a month.
- If you have *two* GitHub remotes (corporate + personal), keep
  `origin` as the corporate mirror and add `personal` as the secondary.
  Deploy to the one with Pages enabled.
</div>

## How the static Contoso Outdoor demo gets published

MkDocs copies **every non-`.md` file under `docs/`** into the built site
verbatim. That's how `docs/demo/index.html` plus its `css/`, `js/`,
`sections/`, and `data/` folders end up at
`https://pedro-pauletti.github.io/csa-workshop-builder/demo/` with no
extra config.

```text
docs/
├── index.md                  → /
├── 00-fast-path.md           → /00-fast-path/
├── demo/
│   ├── index.html            → /demo/                  (the Contoso Outdoor app)
│   ├── css/styles.css        → /demo/css/styles.css
│   ├── js/app.js             → /demo/js/app.js
│   ├── data/*.json           → /demo/data/*.json
│   └── sections/*.html       → /demo/sections/*.html
```

The nav entry **Live demo ↗** in `mkdocs.yml` points at that path so the
reader can open it from any page.

## Next step

Continue to **[12. Validation & polish](12-validation-polish.md)**.

<div class="module-step"><span class="pill">Module 11 of 12</span> Contoso Outdoor tutorial + demo are live. Next: final polish.</div>
