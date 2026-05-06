
# Solutions Cards v2 — Particle Motifs + Slide-Up Reveal

Upgrade the five Home Solutions cards: replace flat SVG motifs with real particle/three.js mini-scenes (in the same family as our globe / field / orbit), add a slide-up info panel on hover, and remove the "Learn more →" arrow pattern across the site.

## What changes

### 1. Per-card particle motifs (three.js)

Each card gets its own small `<Canvas>` mounted in the 140px header zone, sharing the look and feel of `ParticleGlobe`, `HeroParticleField`, and `ParticleOrbit`. All scenes use cyan `#00B3E3` + soft cyan highlights, transparent background, additive blending on highlights — same visual DNA as the hero.

| Practice | Particle scene |
|---|---|
| AI & Generative | **Neural cloud** — ~600 particles forming a soft brain/blob; bright nodes pulse and short connecting filaments draw between nearest neighbors. Slight breathing motion. |
| Data & Analytics | **Particle grid plane** — ~700 particles on a tilted grid; a wave of brightness travels diagonally across; ~30 highlight nodes pulse like data points. |
| Automation | **Particle flow stream** — ~500 particles streaming left-to-right along a sine path with a fast-moving bright "packet" that recycles. |
| Security | **Particle shield dome** — ~600 particles on a half-sphere; subtle ripples emanate from a center node when "armed"; cursor proximity intensifies the ripple. |
| Hybrid Cloud | **Mini orbit** — scaled-down `ParticleOrbit` (~600 particles), no cursor push, slow breathing only. Reuses existing math. |

Shared concerns:
- All five scenes share one tiny base component (`CardParticleCanvas`) that handles `<Canvas>` setup, dpr, transparent bg, and pause-when-offscreen.
- ~600 particles per card × 5 cards is well within budget (hero already runs ~3000). We pause animation when the card is off-screen using `IntersectionObserver` and set `frameloop="demand"` when not hovered for non-AI cards to save GPU.
- `prefers-reduced-motion`: render a single static frame, no animation loop.
- Mobile (<`md`): keep the canvas but pause the loop when not in viewport; if perf is an issue we fall back to the existing SVG motifs (kept as a `StaticFallback` per scene).

### 2. Slide-up reveal panel on hover

No flip. On hover (desktop, hover-capable devices):

- A panel slides up from the bottom of the card, covering ~60% of the card height, holding **3 key capabilities** + an underlined text link.
- The motif zone stays visible above the panel; product chips remain visible behind/under the panel transition.
- 250ms ease-out, translateY + opacity. Panel exits on `mouseleave`.
- On touch devices the panel is always visible in a compact form (no hover state to rely on).
- `prefers-reduced-motion`: panel cross-fades instead of sliding.

Each card needs 3 capability bullets. Source: pull the first 3 entries from `solutions[i].products[0].detail.capabilities` shortened to ~5 words each, OR add a new `Solution.highlights: string[]` field (3 items) for editorial control.

→ Recommendation: add `highlights: [string, string, string]` to `Solution` in `src/content/solutions.ts` and seed it with hand-picked phrases per practice. This keeps card copy tight and decoupled from the long product capability lists.

### 3. Remove the arrow CTA pattern site-wide

User directive: no more "Learn more →" with arrow icons.

- Solutions cards: replace with **underlined text link** ("Explore AI practice", "Explore data practice", etc.) using the existing `.story-link` animated underline utility from `tailwind.config.ts`.
- Audit and update other arrow-based CTAs on the Home page: `HeroSection`, `EngineeredFieldSection`, `WhyTechDSection`, `FinalCtaSection`. Replace `ArrowRight` icons with the `.story-link` underline pattern (or keep solid buttons without the arrow where the affordance is the button itself).
- Buttons (filled primary CTAs like "Talk to an architect") keep their solid style but lose any inline `ArrowRight` icon.
- Footer / nav links: already arrow-free, no change.

## Files

```text
src/sections/home/_shared/
  cards/
    CardParticleCanvas.tsx        (new — shared <Canvas> wrapper)
    AINeuralScene.tsx             (new)
    DataGridScene.tsx             (new)
    AutomationFlowScene.tsx       (new)
    SecurityDomeScene.tsx         (new)
    CloudOrbitScene.tsx           (new — wraps existing orbit math, scaled)
  SolutionCard.tsx                (edit — add slide-up reveal panel, swap CTA)
  motifs/                         (kept as static fallback for reduced-motion)

src/sections/home/SolutionsGridSection.tsx   (edit — pass highlights, scenes)
src/content/solutions.ts                     (edit — add highlights[3] per practice)
src/index.css                                (edit — slide-up panel keyframes)

# Arrow-removal pass:
src/sections/home/HeroSection.tsx
src/sections/home/EngineeredFieldSection.tsx
src/sections/home/WhyTechDSection.tsx
src/sections/home/FinalCtaSection.tsx
```

## Technical notes

- One `<Canvas>` per card is acceptable on modern browsers; we cap dpr at 1.25 on cards (vs 1.5 on hero), set `frameloop="demand"` while not hovered for low-motion cards, and stop loops via `IntersectionObserver` when off-screen.
- All scene meshes use `<bufferGeometry>` + `<pointsMaterial>` with `depthWrite={false}` and additive blending on highlights — same pattern as `ParticleOrbit`.
- Scenes accept `{ active: boolean }` to ramp animation amplitude on hover.
- Slide-up panel uses CSS-only animation driven by a `data-hover` attribute on the card root, set via `onMouseEnter`/`onMouseLeave`. No Framer Motion needed.
- A11y: motif `aria-hidden`. Card remains a single `<Link>`; capability list inside reveal panel is just decorative text — main link target is the whole card.

## Out of scope

- Solutions detail page (`/solutions`).
- New copy beyond the 3 highlights per practice (we'll draft those during implementation, you approve inline).
- Replacing arrow CTAs on `/solutions`, `/services`, `/industries`, `/resources`, `/contact` pages — Home only this round; other pages in a follow-up if you confirm.

## Acceptance

- Each card shows a real particle scene matching the hero family, not flat SVGs.
- Hovering a card on desktop slides up a panel with 3 capabilities + underlined text CTA, no flip, no arrow.
- No `ArrowRight` (or any arrow icon) appears in inline CTAs on the Home page.
- Reduced-motion users see a static motif frame and a cross-fade panel.
- Lighthouse perf on `/` does not regress more than 4 points (5 small canvases tracked).
