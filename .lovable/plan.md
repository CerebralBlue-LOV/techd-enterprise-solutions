# Solutions Grid — Card Redesign

Replace the generic lucide-icon cards on the Home page with a more distinctive system: unique animated SVG motifs per practice, cursor-following spotlight, and a subtle 3D tilt on hover. Light theme preserved, no flip (per M2 guidance).

## Scope

- Only `src/sections/home/SolutionsGridSection.tsx` and new motif/card primitives.
- Solutions detail page (`/solutions`) is **not** touched.
- No data changes in `src/content/solutions.ts`.

## Visual concept

Each card keeps the current information hierarchy (eyebrow → outcome headline → description → product tags → CTA) but the top "icon block" is replaced by a **unique animated SVG motif** that fills the card header zone (~140px tall) and bleeds toward the edges.

Motifs (one per practice, all in cyan + neutral tones):

| Practice | Motif |
|---|---|
| AI & Generative | Layered sine waves, animate amplitude on hover |
| Data & Analytics | Dot grid with bright nodes that pulse + connecting lines that draw |
| Automation | Sparkline / step-flow with a traveling dot |
| Security | Shield silhouette built from a mesh, lock node lights up |
| Hybrid Cloud | Orbiting nodes around a soft cloud shape |

Featured AI card: stronger cyan glow on the motif + the existing "Featured" pill.

## Interactions

1. **Spotlight** — On `mousemove`, a radial cyan glow follows the cursor inside the card (CSS variables `--mx`, `--my`, masked layer at ~12% opacity).
2. **Tilt** — Max 4° rotateX/rotateY based on cursor position, smoothed via CSS transition. Disabled below `md` and under `prefers-reduced-motion`.
3. **Motif animation** — Triggered on hover only (waves shift, dots pulse, lines draw). Uses CSS keyframes, no JS loop.
4. **Existing reveal-on-scroll** preserved.

No flip. No content swap. The card never hides what's there.

## File changes

```text
src/sections/home/
  SolutionsGridSection.tsx              (rewrite card markup)
  _shared/
    SolutionCard.tsx                    (new — card shell with spotlight + tilt)
    motifs/
      AIMotif.tsx                       (new)
      DataMotif.tsx                     (new)
      AutomationMotif.tsx               (new)
      SecurityMotif.tsx                 (new)
      CloudMotif.tsx                    (new)
      index.ts                          (motif map by solution id)
```

No new dependencies. Pure CSS + inline SVG. Keeps bundle flat.

## Technical details

- Tilt + spotlight live on `SolutionCard` via a tiny `useRef` + `requestAnimationFrame` throttled `mousemove` handler. Reset on `mouseleave`.
- Motifs accept `{ active?: boolean }` so animation can pause when the card isn't hovered (saves paint).
- All colors via existing tokens (`--primary`, `--border`, `--muted`). No raw hex.
- Respect `@media (prefers-reduced-motion: reduce)` — disable tilt + motif loops.
- A11y: card remains a single `<Link>`; motif marked `aria-hidden`.
- Mobile (<`md`): tilt off, spotlight off, motif renders as a static decorative banner.

## Out of scope

- Changes to `/solutions` detail page cards.
- Editing `src/content/solutions.ts`.
- New copy.
- Adding 3D libraries (three.js stays in the hero only).

## Acceptance

- Each of the 5 cards shows a unique geometric motif instead of a lucide icon.
- Hovering a card on desktop produces a smooth cursor-following glow and ≤4° tilt.
- Featured AI card retains its primary border + featured pill.
- No layout shift; card heights match across the row.
- Lighthouse perf on `/` does not regress more than 2 points.
- `prefers-reduced-motion` disables tilt, spotlight stays static or off.
