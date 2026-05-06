## Goal

Keep flip-card motifs from overlapping the front-face text. Move the security chevrons over to the Hybrid Cloud card.

## Changes

### 1. `DataMotif.tsx`
- Anchor field bottom-right (not full-card bleed).
- Shrink the dot grid: fewer columns/rows or smaller cell size so the cluster reads as a corner accent, not a full-card pattern.
- Tighten the radial halo so it stays in the lower-right quadrant.

### 2. `AutomationMotif.tsx`
- Pull the workflow graph down and to the right: shift all node coordinates so the leftmost branches start mid-card vertically (around y=140+) instead of y=70.
- Drop the faint horizontal grid lines (they reach across the whole card and crowd the title).
- Keep nodes/edges/arrowheads, just smaller bounding box.

### 3. `SecurityMotif.tsx`
- Remove the stacked chevron arcs entirely.
- Keep only the padlock + dashed pulse halo, anchored bottom-right.
- Reduce padlock scale slightly so it sits cleanly in the corner.

### 4. `CloudMotif.tsx` (Hybrid Cloud)
- Replace the scattered short-line burst with the chevron stack previously on Security.
- Anchor chevrons bottom-right of a 320 viewBox; fan upward; primary cyan only; staggered draw-in via existing `flip-motif-chevron` class.

### 5. `index.css` — `.flip-motif-svg`
- Reduce default size so motifs don't push into the title area:
  - `width: 70%` (was 92%)
  - `height: 78%` (was 100%)
  - Keep right/bottom anchor.
- Strengthen the left-side text mask (e.g., transparent up to 36–40%) so any overflow still fades cleanly.

## Out of scope

- No changes to AI motif (user is happy with it).
- No copy/back-face changes.
- No new dependencies, no animation timing changes beyond reusing existing keyframes.
