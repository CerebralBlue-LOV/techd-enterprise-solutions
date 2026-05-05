# Add `ParticleGlobe` to the Engineered Field section

## Naming (so we can refer back to it)
- **Engineered Field** = the shared backdrop wrapping `home:industries` + `home:case-study` (grid + two drifting cyan blobs).
- **ParticleGlobe** = new decorative 3D component, same visual language as `HeroParticleField` (cyan point cloud, additive glow highlights, slow rotation).

## What to build

### 1. New component: `src/components/ParticleGlobe.tsx`
Three.js / @react-three/fiber sphere built from points + a faint wireframe, matching the hero aesthetic.

- **Geometry**: ~1,500 points distributed on a unit sphere using a **Fibonacci lattice** (even spacing, organic feel).
- **Layers** (mirrors `HeroParticleField`):
  - Wireframe latitude/longitude lines: `lineSegments` from a low-res `IcosahedronGeometry` or `SphereGeometry` wireframe — color `#00B3E3`, opacity ~0.15.
  - Main point cloud: `points` with `pointsMaterial` color `#00B3E3`, size ~0.025, opacity 0.65.
  - ~20 highlight points (additive blending, color `#7CE6FF`) that gently pulse via `useFrame`.
- **Motion**: slow Y-axis rotation (~0.05 rad/s) plus a subtle X-axis wobble. Honors `prefers-reduced-motion` (frameloop "demand").
- **No pointer interactivity** — keep it purely ambient (the hero already owns the interactive moment).
- **Canvas wrapper**: transparent (`alpha: true`), `dpr={[1, 1.5]}`, fixed camera.

### 2. Placement wrapper
Inside `SectionBackdrop` is decorative-only, so the globe goes in a sibling layer in `Index.tsx`, positioned absolutely on the **left, vertically centered** within the Engineered Field wrapper.

```text
<div class="relative overflow-hidden">           ← Engineered Field
  <SectionBackdrop vignettes={false} />          ← grid + blobs
  <ParticleGlobe />                              ← NEW: left-center, behind content
  <section home:industries> ...
  <section home:case-study> ...
</div>
```

Globe container classes:
- `absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4`
- `pointer-events-none hidden md:block`
- `w-[520px] h-[520px] lg:w-[640px] lg:h-[640px]`
- `opacity-70` (so it sits behind cards without competing)
- Soft radial fade on the right edge so it dissolves into the grid before reaching the cards.

### 3. Z-index / readability
- Globe sits between backdrop and content: `z-0` on globe wrapper, `z-10` already on the two `<section>`s.
- Industries cards already use `bg-background/70 backdrop-blur-sm` — globe will read through subtly without harming legibility.

## Technical notes
- Reuse existing deps: `three`, `@react-three/fiber` (already installed for `HeroParticleField`). No new packages.
- Lazy-load the globe with `React.lazy` + `Suspense` (same pattern as `HeroParticleField` in `Index.tsx`) to keep initial bundle slim.
- Brand colors: `#00B3E3` (primary cyan) and `#7CE6FF` (highlight) — matches hero exactly.
- Respect reduced motion: render a single static frame.

## Out of scope
- No texture/earth map (keeps the abstract "data globe" vibe consistent with the hero's particle field).
- No interactivity / hover effects.
- No changes to existing hero or other sections.
