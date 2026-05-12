# 3. Create the SKILL.md

## Goal

Author a `SKILL.md` that instructs **GitHub Copilot** *how* to scaffold the
workshop web app: stack, architecture, conventions, constraints.

## Why it matters

`SKILL.md` is the durable, reusable contract between you and Copilot. Without
it, every Copilot interaction reinvents the architecture. With it, every CSA on
your team produces consistent, high-quality apps.

## Inputs

- The customer scenario from [Module 2](03-customer-scenario.md).
- `templates/SKILL.template.md`.
- Agreed technology stack (defaults: FastAPI 0.115, Jinja2 3.1, vanilla JS,
  Docker Compose).

## Step-by-step

1. Copy `templates/SKILL.template.md` to your working folder as `SKILL.md`.
2. Paste the customer scenario into the **Context** section.
3. Lock the **stack** and **architecture** sections.
4. Confirm the **non-goals** (no real secrets, no production hardening, no
   real customer PII).
5. Save it next to `agenda.md` so Copilot can read both together.

## Copilot prompt

```text
Read SKILL.md and customer-scenario.md.

Validate that the SKILL:
- Locks the technology stack and versions.
- Defines a clear folder structure.
- Mandates an agenda-driven architecture (one section per agenda item).
- Requires presenter notes, requirement mapping, and fallback messaging.
- Forbids real secrets and customer PII.
- Is reusable across Microsoft products.

Return: a list of gaps and a corrected SKILL.md.
```

## Expected output

A polished `SKILL.md` ready to be referenced by `/plan`.

## Validation checklist

- [ ] Stack and versions are pinned.
- [ ] Folder structure is explicit.
- [ ] Architecture is agenda-driven.
- [ ] Demos can be added without changing the core app.
- [ ] No real secrets; only `example.env`.

## Common issues

!!! tip "Don't over-specify"
    A SKILL.md that prescribes every line of code becomes brittle. Pin the
    *contracts* (folder layout, file naming, agenda parsing rule); leave
    implementation freedom.

## Next step

Continue to **[4. Create the agenda.md](05-create-agenda.md)**.
