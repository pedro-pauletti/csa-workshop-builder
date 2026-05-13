# Accelerator for customer workshops

<div class="hero" markdown>

# Build a customer-ready interactive workshop app with GitHub Copilot

This tutorial walks you through **building one complete, named, customer-flavoured
workshop end-to-end** — **Northwind MemberAssist**, a fictional health-plan member-services
copilot — across **12 modules**. By the end of module 12 you have a working, branded,
publishable app. Module 13 then shows you how to **swap Northwind for *your* customer or
Microsoft product** without touching the scaffolding.

[Try the live demo :material-rocket-launch:](demo/){ .md-button .md-button--primary }
[Start the fast path :material-flash:](00-fast-path.md){ .md-button }
[Skip to module 1 :material-school:](02-design-principles.md){ .md-button }
[Reuse for your customer :material-source-branch:](13-customize.md){ .md-button }

</div>

!!! success "What you have when you finish module 12"
    A FastAPI + Jinja2 + Docker workshop app for **Northwind MemberAssist** running locally,
    published on GitHub Pages, with **6 interactive mocked demos** (coverage Q&A, claim status,
    provider search, EOB extraction, evaluation scorecard, roadmap). The dynamic sidebar comes
    from a single `agenda.md`. Visual identity follows a named design system (Foundry Violet /
    Northwind Teal). No real PII. No Azure subscription required to run the demo.

<div class="outcome-cards" markdown>
<div class="card" markdown>**One worked example, end-to-end**
Every module produces an artifact that the next module consumes. By module 12 they form a
running app.
</div>
<div class="card" markdown>**Agenda-driven**
Editing one markdown file (`agenda.md`) updates the navigation, the sections, and the demos.
</div>
<div class="card" markdown>**Design-system first**
A named palette ("Foundry Violet" by default) keeps every customer workshop visually coherent
without bespoke design work.
</div>
<div class="card" markdown>**Customer-specific in hours**
Module 13 shows the surgical swap — `customer-scenario.md` + `agenda.md` + palette + logo.
No code changes elsewhere.
</div>
</div>

## See it running before you read

The repo ships a **live demo** that shows the exact app shape this tutorial
teaches you to build — and uses it to demonstrate a real Microsoft product
(**Azure AI Search**) for a fictional retail customer, **Contoso Outdoor**.
It is the *pattern*, applied to a different scenario, so you can see what the
output of this method looks like in another customer's clothing.

[Open the live demo :material-arrow-right:](demo/){ .md-button .md-button--primary }

It is fully static — no backend, no Azure — so you can poke at it from any
browser. Inside the tutorial itself, **modules 1 → 12 build Northwind
MemberAssist** (the healthcare worked example); module 13 then shows the
surgical swap from Northwind to any other customer or Microsoft product —
exactly how the live demo was produced.

!!! info "Two distinct artifacts, same accelerator"
    - **`/demo/`** — an Azure AI Search workshop for *Contoso Outdoor*. What
      the pattern looks like in retail / RAG flavor, with **Microsoft Learn
      citations** in every section.
    - **The 12 tutorial modules** — build the *Northwind MemberAssist*
      worked example from scratch (healthcare). Same pattern, different
      content.

## The three artifacts everything is built from

This accelerator is intentionally driven by **three small markdown files** so the
**method**, the **app template**, and each **customer engagement** evolve independently.

| Artifact | Lives in | What it controls |
|---|---|---|
| `customer-scenario.md` | Customer repo | Who the workshop is for, what their requirements are. |
| `SKILL.md` | Customer repo (copied from `templates/SKILL.template.md` in this repo) | The contract Copilot follows when scaffolding code. Stack, folder layout, design system, agenda-driven menu rule. |
| `agenda.md` | Customer repo | The ordered list of sections. **Source of truth** for the sidebar and the section sub-apps. |

!!! tip "All three files are written for you for Northwind"
    The tutorial ships filled-in Northwind versions of all three under
    [`samples/northwind-memberassist-workshop/`](https://github.com/pedro-pauletti/csa-workshop-builder/tree/main/samples/northwind-memberassist-workshop)
    — and the `templates/` folder contains the blank versions you copy for your next customer.

## How each module is structured

Each module follows the **same 9-section pattern**:

1. **Goal** — what you produce.
2. **Why it matters** — how it improves the workshop.
3. **Inputs** — what you need before you start.
4. **Step-by-step** — concrete actions, applied to Northwind.
5. **Copilot prompt** — copy/paste ready.
6. **Expected output** — what success looks like.
7. **Validation checklist** — confirm before moving on.
8. **Common issues** — fast troubleshooting.
9. **Next step** — link to the next module.

## Two trails

<table class="trails">
<tr>
<td>Fast path — 60–90 min</td>
<td>Clone the template, run Copilot, get a working Northwind app locally. Skip the theory until you need it.</td>
</tr>
<tr>
<td>Deep dive — 12 modules</td>
<td>Build Northwind from the customer scenario all the way to a published app. Then customize for your customer in module 13.</td>
</tr>
</table>

[Start the fast path](00-fast-path.md){ .md-button .md-button--primary }

## Prerequisites

- GitHub account with **GitHub Copilot** access (Copilot Chat with `/plan`).
- VS Code or GitHub.dev / Codespaces.
- Docker Desktop (the generated workshop app runs locally in containers).
- Python 3.11+ (only if you want to preview this tutorial site with `mkdocs serve`).
