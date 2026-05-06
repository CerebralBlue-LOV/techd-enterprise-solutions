## Goal

Rework the `/flip-lab` cards so the decorative motif lives on the **front** of the card (visible by default), drop the icon tile, and upgrade each motif from the current simple sketch into a richer, award-style graphic inspired by the reference image (flowing line waves, halftone dot fields, layered chevrons, scattered particles, concentric pulses, etc.).

## Reference reading

The uploaded grid shows 6 award cards. Each has:
- A small colored icon tile top-left (we are **dropping** this)
- A date / region label top-right
- Two-line title + subtitle stacked at center-left
- A small footer label (region/country)
- A **single, distinctive geometric motif** anchored bottom-right or center-right, in one accent color, occupying ~40-50% of the card area
- The motif is the personality of the card — not decoration

This is the pattern we'll match.

## Changes

### 1. `src/sections/flip-lab/FlipCard.tsx`
- Remove the `icon` prop and the icon tile JSX entirely.
- Move the motif from the back face to the **front face**, anchored to the right side / bottom-right, behind the text (text stays readable on the left).
- Front layout becomes:
  - Top row: small `meta` label top-right (the only top element now)
  - Left column: eyebrow → title → footer (mirrors the reference)
  - Motif: absolutely positioned, right-aligned, masked so it fades into the card on the left edge (so text stays legible)
- Back face keeps its current role: `backTitle`, `backBody`, CTA — but **without** the motif (motif is now on front). On hover the card still flips to show the back content.

### 2. `src/pages/FlipLab.tsx`
- Remove all `lucide-react` icon imports and the `icon:` field from each card.

### 3. Motif rewrite — `src/sections/flip-lab/motifs/*.tsx`

Each motif gets rebuilt as a denser, more crafted SVG composition. All cyan (brand primary) — single hue, varied opacity, like the reference's single-color discipline. Each motif gets a subtle on-mount / on-hover animation.

| Card | New motif concept |
|---|---|
| AI & Generative | Layered flowing line waves (≈18 stacked sine paths), opacity gradient bottom-to-top, slight phase shift animation |
| Data & Analytics | Halftone dot field — dot radius varies by position to suggest a curved surface; dots animate radius on hover |
| Automation & FinOps | Concentric circular pulses + a small orbiting node, slow rotation |
| Security & Compliance | Stacked chevron arrows (3-4 nested), thick strokes, draw-in animation |
| Hybrid Cloud | Scattered particle burst — short tilted line segments at varied angles/lengths, fade-in stagger |

Each motif is a self-contained React SVG component, ~280×280 viewBox, `preserveAspectRatio="xMaxYMax meet"` so it docks bottom-right. Animations use existing CSS keyframes where possible (`motif-wave`, `motif-pulse`, `motif-draw`) and add new ones in `index.css` only if needed.

### 4. `src/index.css`
- Add a left-fade mask helper (`.flip-motif-mask`) that keeps the right ~60% of the motif visible and fades into transparent toward the text column.
- Add any keyframes needed by the new motifs (e.g. `motif-orbit`, `motif-stagger-in`).

## Out of scope

- No changes to colors / brand tokens.
- No new dependencies.
- The flip animation, back face structure, and CTA stay as-is.
- The Solutions section on `/` is **not** touched — this is lab-only iteration.

## Acceptance

- Visit `/flip-lab` → each card shows a rich, single-color cyan motif on the front (no icon tile).
- Hovering a card flips it to the back face which shows back title, body, and CTA — no motif on back.
- Motifs feel hand-crafted and varied, similar in spirit to the reference grid; not five copies of the same idea.
