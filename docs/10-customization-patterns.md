# 10. Visual identity & theme

## Goal

Apply a coherent **visual identity** to the Contoso Outdoor app — colors,
typography, iconography, layout chrome — and make it trivial to switch identity
for the next customer in module 13.

## Why it matters

A workshop app that looks like a production product converts trust in the
first 30 seconds. Conversely, a Bootstrap-default app reads "weekend hack" no
matter how good the demos are. The design system is also the single biggest
piece of reuse: keep it stable, swap palette tokens per customer.

## Inputs

- The Contoso Outdoor app from modules 6–9.
- The `## Design System & Color Schemes` section of your `SKILL.md`.
- One brand reference from the customer (logo, hero color, type pair).

## The CSS-variable rule

All color, radius, shadow, and spacing tokens live in **CSS custom properties**
on `:root`. Components never use a hex value directly. That single rule is what
makes the theme swappable.

```css
:root {
  /* Contoso Outdoor Teal — current customer theme */
  --primary-500: #14b8a6;
  --primary-600: #0e7c86;
  --accent-500:  #a855f7;  /* Foundry violet accent kept for highlights */
  --surface-900: #05141a;
  --surface-700: #0d2229;
  --text-primary: #e6fffb;
  --radius-lg: 18px;
  --shadow-glow: 0 0 0 1px rgba(168,85,247,.35),
                 0 10px 40px -10px rgba(20,184,166,.35);
}
[data-theme="light"] {
  --surface-900: #ffffff;
  --surface-700: #f4fbfa;
  --text-primary: #062b2e;
}
```

A button is then:

```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
  color: #fff;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-glow);
}
```

The same button shipped to the next customer changes one file
(`themes/<customer>.css`), zero components.

## Named palettes shipped with the template

The `SKILL.template.md` (module 3) ships five named palettes ready to drop in.
For Contoso Outdoor we use **Contoso Outdoor Teal** with the **Foundry Violet** accent as
the highlight color — this matches the [live demo](../demo/).

| Palette name | Primary | Accent | Best for |
|---|---|---|---|
| **Foundry Violet** (template default) | `#a855f7` | `#ec4899` | Azure AI Foundry, generic AI demos. |
| **Contoso Outdoor Teal** *(this workshop)* | `#14b8a6` | `#a855f7` | Healthcare, member services, anything teal-branded. |
| **Fabric Indigo** | `#6366f1` | `#22d3ee` | Microsoft Fabric, data engineering. |
| **Azure Blue** | `#0078d4` | `#50e6ff` | Classic Azure / Infra customer. |
| **Citrus Orange** | `#f97316` | `#22c55e` | Retail, FSI, anything that wants warmth. |

## Step-by-step

1. Open the `## Design System & Color Schemes` block in your SKILL.md.
2. Set `theme: Contoso Outdoor-teal` in the frontmatter `metadata`.
3. Confirm `static/themes/Contoso Outdoor-teal.css` exists and is `@import`-ed by
   `theme.css`.
4. Add the **single shared `base.html`** (see template). All sections extend
   it — no per-section chrome.
5. Add Inter + JetBrains Mono via Google Fonts; pre-load both.
6. Use **Font Awesome 6** icons declared in each section's `MENU_ICON`.
7. Verify the dark/light toggle persists via `localStorage` (no FOUC on
   first paint).
8. Run the offline rehearsal: pull the network cable, refresh — both
   palettes and fonts must still render.

## Copilot prompt

```text
Audit the workshop app's visual identity against SKILL.md's
Design System section.

Confirm:
- All color, radius, shadow, and spacing values live on :root.
- No component file contains a literal hex value.
- The light/dark toggle writes <html data-theme> from localStorage
  synchronously in <head> (no FOUC).
- All sections extend the single base.html.
- Inter + JetBrains Mono are pre-loaded.
- Font Awesome 6 is the only icon set used.
- The active theme matches metadata.theme in SKILL.md frontmatter.

Return: a diff that fixes any violation. Do not touch logic.
```

## Expected output

A theme that:

- Reads as Contoso Outdoor without being garish.
- Can be swapped to another palette by editing one CSS file.
- Renders consistently on the projector at the customer site.

## Anti-patterns

!!! danger "Per-section inline `<style>` tags"
    Kill them. They are how palette drift happens between rehearsal and
    delivery.

!!! danger "Material default blue still showing"
    The Material *tutorial* site uses deep purple (see this docs site).
    The *workshop app* you generate uses Contoso Outdoor Teal. Don't confuse the
    two: the docs site is **the meta tutorial**, the demo is **the
    deliverable**.

!!! danger "Hex literals in JS"
    Charting libraries (Chart.js, ECharts) read hex from `:root` via
    `getComputedStyle(document.documentElement).getPropertyValue('--primary-500')`.
    Never inline `'#14b8a6'` in a JS file.

<div class="tips" markdown>
**Theming tips**

- Test the palette against **projector contrast** at 50% brightness. A
  palette that looks great on your laptop disappears on a customer's
  ceiling projector.
- The accent color does the heavy social-proof lifting — keep it bold
  even if the customer's brand is muted. Foundry Violet over Contoso Outdoor
  Teal is the canonical example.
- Keep `static/themes/<name>.css` files under 80 lines. If you need more,
  you're putting logic in CSS that should be in `theme.css`.
- Bake the *customer logo* into the `base.html` header, not into every
  section. One file changes per engagement.
</div>

## Validation checklist

- [ ] All colors come from CSS custom properties.
- [ ] Light/dark toggle works and persists.
- [ ] No FOUC on first paint.
- [ ] Inter + JetBrains Mono load before first contentful paint.
- [ ] Only Font Awesome 6 icons are used.
- [ ] Active theme matches SKILL.md frontmatter.

## Common issues

!!! warning "FOUC on first paint"
    Theme is being read after CSS evaluates. Move the `data-theme` write
    into a synchronous `<script>` in `<head>` before the stylesheet link.

!!! warning "Custom-font flicker"
    Add `font-display: swap` and pre-load both fonts in `<head>`.

## Next step

Continue to **[11. Publish with GitHub Pages](12-publish-github-pages.md)**.

<div class="module-step"><span class="pill">Module 10 of 12</span> Contoso Outdoor has a coherent visual identity. Next: publish it.</div>
