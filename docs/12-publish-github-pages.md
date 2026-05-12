# 11. Publish with GitHub Pages

## Goal

Publish **this tutorial site** (and, optionally, the generated workshop app's
own docs) to **GitHub Pages** using a GitHub Actions workflow.

## Why it matters

A published tutorial is shareable, linkable, searchable, and versioned. It's
how you scale the pattern across the CSA team.

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

## Common issues

!!! warning "404 on GitHub Pages"
    Pages source not yet configured. Open Settings → Pages and select branch
    `gh-pages`, folder `/ (root)`.

!!! warning "`mkdocs build --strict` fails on a broken link"
    Strict mode is intentional — fix the link rather than relaxing the build.

## Next step

Continue to **[12. Reuse and scale](13-reuse-scale.md)**.
