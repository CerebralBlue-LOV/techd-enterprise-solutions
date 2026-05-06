## Goal

Clean up the Industries carousel: remove redundant chrome, simplify card content, calm the motifs, and keep drag-to-scroll as the only interaction.

## Changes — `src/sections/home/_shared/IndustriesCarousel.tsx`

### Remove
- The Prev/Next arrow buttons and their wrapper at the bottom of the carousel.
- The "01 · Industry" eyebrow row at the top of each card (redundant — the section heading already says "Industries").
- The regulation chip in the top-right (HIPAA · HITECH, etc.) — feels like noise on top of the motif.
- The `canPrev` / `canNext` state and `scrollByCards` helper (no longer used).

### Keep
- Drag-to-scroll with click-suppression on real drag (current behavior).
- Soft 3D tilt based on distance from center (±10°).
- Hover: lift + cyan border glow.
- The "Explore →" affordance that fades in on hover.

### Card layout
- Center-aligned text block, vertically centered in the card.
- Order: title (large) → outcome (small, muted, max 3 lines) → "Explore →" (hover-only, centered).
- Slightly tighter card height (e.g. 240px) so the rail feels lighter.

### Motif intensity (lighter & slower)
For each motif (`MotifWaves`, `MotifNodes`, `MotifGrid`, `MotifBars`, `MotifPulse`, `MotifChevrons`):
- Reduce element counts by ~40% (fewer waves/nodes/bars/chevrons).
- Drop max opacity to ~0.35 (was 0.5–0.78).
- Strengthen the radial halo falloff so the motif fades more aggressively at the edges and behind the centered text.
- Add a soft full-card gradient overlay (`from-background via-background/90 to-background/70`) so text stays crisp on top of motifs.

## Out of scope
- No copy changes to `INDUSTRIES` content.
- No changes to flip-lab motifs or other home sections.
- No new dependencies.
