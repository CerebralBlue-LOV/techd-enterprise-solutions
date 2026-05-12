## Problem recap

The current treatment forces every logo through `brightness-0 invert` so it becomes a flat white silhouette on the dark card. That works for simple wordmarks but destroys detailed/crest logos (Harvard, Penn State, NUS, Stony Brook, NYIT, Netcare). Per-logo opt-outs would create two visual languages on the same grid — inconsistent.

## Proposed solution — one uniform treatment for all logos

Give every card a **white logo plate** at the top, and render every logo in its **original colors**. The card body (name + note) stays on the dark panel.

```text
┌─────────────────────────────┐
│ ░░░░░ white plate ░░░░░░░░ │  ← logo in original colors, centered
│ ░░░░░ [   LOGO   ] ░░░░░░░ │
├─────────────────────────────┤
│ Harvard University          │  ← dark card body, white text
│ Ivy League — research       │
│ computing and analytics.    │
└─────────────────────────────┘
```

Why this works:
- **Single rule** — no per-logo flags, no two visual modes. Every logo gets the same plate, same padding, same height.
- **Brand-safe** — original colors preserved everywhere (matters for IBM partner logos, university crests, financial brands).
- **Reads on dark** — white plate gives every logo guaranteed contrast.
- **Stripe/Linear-ish** — these sites use exactly this pattern (logo tile + dark caption) for partner / customer grids.

### Implementation details

In `src/sections/industries/IndustryClientsSection.tsx`, inside `ClientCard`:

- Replace the current logo cell with a fixed-height plate:
  - `bg-white rounded-xl flex items-center justify-center h-20 w-full px-4`
  - Inside: `<img>` with `max-h-10 md:max-h-12 w-auto object-contain` (override the per-customer `logoClass` for this context — we control sizing here so the grid stays even).
  - Drop `brightness-0 invert` entirely.
- Body section below (name + note) stays as it is on the dark card.
- Initials fallback (when no logo): same white plate, but render initials in `text-secondary` instead of white.
- Keep the existing hover: card border lifts to `white/25`, slight `-translate-y-0.5`, name shifts to `text-primary`. No change to the plate itself.

### Stat label rename

In the left column, change `"Active clients"` → **"Featured clients"** (or *Selected* / *Showcased* if you prefer one of those).

### Files touched

- `src/sections/industries/IndustryClientsSection.tsx` — rewrite the logo cell, drop the invert filter, add white plate; rename the stat label.
- No changes needed to `src/content/site.ts` or the `Customer` type.

## Question before I build

1. Confirm the new label: **Featured clients**, *Selected clients*, or *Showcased clients*?
2. Plate style preference: pure white (`bg-white`) for max contrast, or a softer off-white (`bg-white/95` with a faint inner shadow) to feel less harsh against the dark panel? I'd default to pure white for clarity unless you say otherwise.
