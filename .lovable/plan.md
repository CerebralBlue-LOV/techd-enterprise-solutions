## Goal

Create a dedicated lab page at `/flip-lab` to prototype a new generation of solution cards. The cards reuse the proven flip-on-hover pattern but introduce a cleaner layout inspired by the reference image: a colored icon tile in the top-left, a small label, a bold title, a footer line, and a decorative animated motif on the back of the card.

This is a sandbox page — once we like the result, we'll port the winning version onto the real Solutions section.

## Scope

- New route only. No changes to the existing `/icon-lab` page or to the live `SolutionCard` on the homepage.
- Five test cards, one per practice: AI & Generative, Data & Analytics, Automation, Security, Hybrid Cloud.

## Visual direction

- Light cards on the page background, brand palette only.
- Square-ish icon tile (top-left) with `bg-primary/10` fill, `text-primary` icon, rounded corners, soft inner highlight.
- Top-right meta line (small uppercase label, e.g. "Featured" / date-style tag — TBD copy).
- Eyebrow label in cyan uppercase tracking.
- Bold title in `text-secondary`.
- Footer line in muted gray (e.g. "United States", or a short region/sector tag).
- Simple 1px border using `--border`, hover lifts to `border-primary` + soft cyan shadow.

## Flip behavior

- Reuse the exact mechanism from `SolutionCard.tsx`: `perspective`, `transform-style: preserve-3d`, `rotateY(180deg)` on hover, `backface-visibility: hidden` on each face.
- 900ms cubic-bezier easing (matches existing site rhythm).
- `data-hover` toggled via `onMouseEnter` / `onMouseLeave` so it works on touch fallback too.
- Reduced-motion: cross-fade instead of flipping.

## Per-card SVG motifs (the key new piece)

Each card back gets its own animated SVG motif, anchored bottom-right, only animating while the card is hovered. Loose interpretations of the reference, all using brand cyan (`hsl(var(--primary))`) at varied opacities:

| Card | Motif | Animation |
|---|---|---|
| AI & Generative | Layered topographic wave lines | `motif-draw-long` stroke-dashoffset reveal, then gentle `motif-wave` translateY loop |
| Data & Analytics | Cluster of dots with pulsing nodes | `motif-pulse` on selected dots, staggered delays |
| Automation | Diagonal stripe field | Stripes slide in left→right, then slow continuous drift |
| Security | Concentric rotating arcs | `motif-spin-slow` + `motif-spin-rev` on inner ring |
| Hybrid Cloud | Scattered dashes / sparkles | Sequential fade-in scatter, subtle float loop |

Most of the keyframes already exist in `src/index.css` (`motif-wave`, `motif-pulse`, `motif-draw`, `motif-draw-long`, `motif-spin`). We'll add a `motif-stripe-slide` keyframe for Automation and a `motif-scatter` staggered fade for Hybrid Cloud.

## Files

**New**
- `src/pages/FlipLab.tsx` — page shell, intro, 5-card grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).
- `src/sections/flip-lab/FlipCard.tsx` — the new card component (front + back faces, motif slot prop).
- `src/sections/flip-lab/motifs/` — one small component per practice (`AiMotif.tsx`, `DataMotif.tsx`, `AutomationMotif.tsx`, `SecurityMotif.tsx`, `CloudMotif.tsx`). Pure SVG, no deps.

**Edited**
- `src/app/routes.tsx` — register `/flip-lab` route.
- `src/index.css` — append two new keyframes (`motif-stripe-slide`, `motif-scatter`) and the `.flip-card-*` class block (mirrors `.solution-card-*` but without the rotating beam — just clean borders).

## Out of scope

- No nav link to `/flip-lab` (lab page, accessed by URL like `/icon-lab`).
- No copy polish — placeholder titles per practice.
- Not wiring this into Solutions section; that's a follow-up once we approve the look.

## Acceptance check

- Visit `/flip-lab` → see 5 cards in the brand palette.
- Hover a card → flips smoothly; motif on the back animates.
- Mouse out → flips back, motif resets.
- `prefers-reduced-motion` → cross-fade only, no spinning motifs.
- No off-palette colors anywhere.