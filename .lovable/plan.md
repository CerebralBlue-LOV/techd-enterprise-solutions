## Goal

Replace the 5 animated SVG motifs on the Flip-Lab cards with a cohesive, on-brand set of AI-generated plexus/neural-node illustrations. White-theme cards stay as they are; the graphics sit cleanly inside.

## Visual direction (shared across all 5)

- Subject built **entirely from interconnected nodes (filled circles) and thin straight lines** — same plexus pattern as the brain reference.
- **Monochrome brand cyan** (`hsl(195 100% 50%)`) with a soft cyan glow halo behind the densest cluster of nodes.
- **Transparent PNG**, square 1024×1024, anchored bottom-right of the card with the same left-fade mask we already use.
- All 5 share identical line weight, node sizing rhythm, and density so the set reads as one system.

## The 5 graphics

| Card | Subject |
|---|---|
| AI & Generative | Side-profile human brain (per reference) |
| Data & Analytics | Stacked database server / cylinder rack |
| Automation & FinOps | Two interlocking gears |
| Security & Compliance | Faceted shield with central core |
| Hybrid Cloud | Stacked database (re-use the Data subject as the user requested) |

## Implementation

### 1. Generate 5 transparent PNGs
Use `imagegen--generate_image` (premium, transparent_background=true), saved to:
- `src/assets/flip-lab/plexus-brain.png`
- `src/assets/flip-lab/plexus-database.png`
- `src/assets/flip-lab/plexus-gears.png`
- `src/assets/flip-lab/plexus-shield.png`
- `src/assets/flip-lab/plexus-cloud.png` (same database subject, different seed/composition)

Each prompt uses a shared base style block to lock consistency:
> "Minimalist plexus network illustration of [SUBJECT]. Built entirely from small filled circular nodes connected by thin straight lines forming a wireframe mesh. Monochrome cyan color #00B3E3 with a soft cyan glow halo. Clean vector look, no shading, no extra elements. On a solid white background. Centered composition, square format."

### 2. Replace the motifs
- Delete the 5 SVG components in `src/sections/flip-lab/motifs/` (AiMotif, DataMotif, AutomationMotif, SecurityMotif, CloudMotif).
- Create a single `PlexusMotif.tsx` that takes an `image` prop and renders the PNG inside the existing `.flip-motif-svg` slot — fixed size, bottom-right anchored, left fade mask preserved.
- Update `src/pages/FlipLab.tsx` to import the 5 PNGs and pass each to `<PlexusMotif image={...} />`.

### 3. Cleanup
- Remove the now-unused motif keyframes (`flip-motif-line-drift`, `flip-motif-dot-bloom`, `flip-motif-orbit`, `flip-motif-pulse-soft`, `flip-motif-chevron-draw`, `flip-motif-shard-in`, `flip-motif-line`, `flip-motif-dot`, `flip-motif-ring`, `flip-motif-orbit`, `flip-motif-pulse-center`, `flip-motif-chevron`, `flip-motif-shard`, `flip-motif-lock`) from `src/index.css`.
- Keep `.flip-motif-mask` and `.flip-motif-svg` (still used).

## Out of scope

- No layout/copy changes to cards.
- No changes outside `/flip-lab`.
- Animations: the new images are static. Hover still flips the card to the back face — that's the only motion. (If you want a subtle idle drift later, easy to add.)

## Recommendation

Generate at **premium** quality with `transparent_background: true`. Premium handles fine-line repetition (which plexus art needs) much better than fast/standard, and transparency means we can drop the same asset onto any future dark-themed card without re-rendering.
