# Solution Cards v3 — Full Flip + Animated Border Beam

Inspired by the Uiverse reference, but softer, slower, and on-brand.

## 1. Remove particle scenes

- Delete `src/sections/home/_shared/cards/` directory entirely (all 5 scene files + `CardParticleCanvas.tsx` + `index.ts`).
- Remove `lazy` imports, `Suspense`, and `SCENE_MAP` from `SolutionsGridSection.tsx`.
- Drop the `scene` prop from `SolutionCard`.
- Remove the top "scene zone" (the 160px canvas band) from the front face — the front becomes pure content with breathing room.

## 2. Full-card flip (slow, soft)

The whole card flips, not the inner content.

- Outer wrapper `.solution-card` keeps perspective (`perspective: 1200px`) and has no background.
- Inner `.solution-card-inner` is the flipping element: `transform-style: preserve-3d`, `transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1)` (slow, eased).
- On hover (`data-hover="true"`): `transform: rotateY(180deg)`.
- `.solution-card-front` and `.solution-card-back` are absolutely positioned, both with `backface-visibility: hidden`.
- Back is pre-rotated `rotateY(180deg)`.
- Tilt-on-cursor effect is removed — flip is the only hover transform.
- `prefers-reduced-motion`: replace flip with a 250ms cross-fade between front and back.
- Touch devices (`hover: none`): no flip; show front only (back content is reachable via the link target page).

## 3. Animated border beam (cyan → white gradient)

Achieved with a conic-gradient ring rotating behind the card surfaces.

```text
.solution-card (perspective, rounded)
└── .solution-card-inner (preserve-3d, flips on hover)
    ├── .solution-card-front
    │   ├── ::before  ← rotating conic gradient (border beam)
    │   └── .solution-card-surface (inset 1px, solid bg, holds content)
    └── .solution-card-back
        ├── ::before  ← same rotating conic gradient
        └── .solution-card-surface (inset 1px, solid bg, holds content)
```

- Beam: `conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary)) 60deg, hsl(0 0% 100%) 90deg, hsl(var(--primary)) 120deg, transparent 180deg, transparent 360deg)`.
- Animation: `@keyframes border-spin { to { transform: rotate(360deg); } }` at **8s linear infinite** (slow, calm).
- Beam runs continuously at low opacity (~0.35) and brightens to full on hover (opacity 1).
- The inner `.solution-card-surface` sits 1px inside the rotating layer, masking its center so only a thin animated ring is visible at the edge.
- `prefers-reduced-motion`: animation paused; ring shows a static, dim cyan border.

## 4. Card sizing — better tablet/desktop layout

- Grid: `md:grid-cols-2 lg:grid-cols-3` (already correct), but increase row height for visual balance.
- Add `min-h-[360px] lg:min-h-[400px]` to the card.
- Increase internal padding from `p-7` to `p-8 lg:p-10`.
- Larger heading: `text-2xl` → `text-2xl lg:text-[26px]`, with tighter leading.
- Front face vertical rhythm: practice label (top), heading, description, product chips (pushed to bottom with `mt-auto`) — front becomes a clean editorial layout instead of capped by a graphic band.

## 5. Back face — short pitch + CTA

Replace 3-bullet list with a concise pitch paragraph (1–2 sentences) + underlined CTA.

- Add `pitch: string` to `Solution` type in `src/content/solutions.ts`.
- Seed each practice with a short pitch (~140–180 chars). Examples to write:
  - **AI**: "Production-ready generative AI grounded in your enterprise data — built on watsonx with measurable business impact, not pilots."
  - **Data & Analytics**: …
  - **Automation**: …
  - **Security**: …
  - **Hybrid Cloud**: …
- Back face layout: small eyebrow ("Explore AI practice") → pitch paragraph (`text-base`, secondary) → underlined `.story-link` CTA aligned bottom-left.
- `highlights` field stays in the type for future use but is unused on the home grid.

## 6. Files

**Edit**
- `src/sections/home/_shared/SolutionCard.tsx` — remove `scene` prop, remove tilt logic, restructure to front/back with surface + beam, take `pitch` instead of `highlights`.
- `src/sections/home/SolutionsGridSection.tsx` — drop scene plumbing, pass `pitch`, taller cards.
- `src/content/solutions.ts` — add `pitch` field with copy for all 5 practices.
- `src/index.css` — add `.solution-card-inner`, `.solution-card-face`, `.solution-card-surface`, `border-spin` keyframes, reduced-motion + touch fallbacks. Remove old `solution-card-spotlight`, slide-up reveal, and tilt CSS.

**Delete**
- `src/sections/home/_shared/cards/` (full directory: 7 files).

## 7. Acceptance

- Full card flips slowly (~900ms) on hover; no inner-content sliding.
- Cyan→white beam rotates softly around the border at all times, brightens on hover.
- Cards feel taller and more balanced on tablet (md) and desktop (lg).
- No particle canvases anywhere; bundle drops three.js usage in this section.
- Reduced-motion users get cross-fade + static border.
- Touch users see static front face with full content.
