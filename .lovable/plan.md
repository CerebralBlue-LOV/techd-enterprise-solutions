## Hero Section Redesign — `home:hero` only

Scope: only the Hero section in `src/pages/Index.tsx`. No other sections, pages, routes, or content change. Stays within existing brand tokens (primary cyan, white bg, secondary dark gray) and motion rules (respects `prefers-reduced-motion`, no scroll-jacking, lightweight).

### 1. Make the section larger

In `src/pages/Index.tsx`, increase the hero's vertical padding and headline scale so it occupies roughly a full viewport on desktop:

- Wrapper: `min-h-[88vh] flex items-center`, padding `pt-32 pb-40 md:pt-40 md:pb-48`.
- Headline: bump to `text-6xl md:text-8xl`, max-w-5xl.
- Sub-copy: `max-w-2xl text-xl md:text-2xl`.
- CTA row spacing: `mt-12`.

### 2. Background layer (replace `GeometricAccent` for the hero only)

Create a new dedicated component `src/components/HeroBackdrop.tsx` so the existing `GeometricAccent` stays untouched for other use. Layer order, all `aria-hidden`, `pointer-events-none`, `absolute inset-0`:

1. **Base grid pattern** — pure CSS, no image. A repeating 48px × 48px grid using two `linear-gradient`s on a single div, color `hsl(var(--border) / 0.45)`, line width 1px. Mask with a radial `mask-image` so the grid fades out toward the edges (keeps it subtle, "engineered" not graph-paper).
2. **Soft multi-layer gradient wash** — two large blurred radial blobs (cyan `primary/15` top-right, cyan `primary/8` bottom-left) plus one neutral warm-white blob center. Each uses `animate-gradient-drift` (already defined, 18s) with staggered `animationDelay` so the wash slowly breathes without hard edges.
3. **Top + bottom vignette** — a thin `bg-gradient-to-b from-background via-transparent to-background` overlay so the grid never touches the header or the next section's seam.

### 3. Main visual graphic — 3D particle network

Use **react-three-fiber** + **drei** (versions pinned per the stack: `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`, `three@^0.160`). Build `src/components/HeroParticleField.tsx`:

- `<Canvas>` sized to fill the right half on desktop (`absolute right-0 top-0 h-full w-full md:w-[60%]`), pointer-events-none, `dpr={[1, 1.5]}` for perf, `gl={{ antialias: true, alpha: true }}`, transparent background.
- A `Points` mesh with ~2,500 particles distributed on an undulating plane (sample x/z grid, y = layered sine noise). Particles use a small round sprite material in cyan `#00B3E3` at low opacity.
- A `LineSegments` mesh that connects each particle to its 2 nearest neighbors (precomputed once on mount, not per frame) using `LineBasicMaterial` at very low opacity for the "network" look.
- ~12 "highlight" nodes at random indices rendered as slightly larger, brighter points with a subtle additive-blend glow (`THREE.AdditiveBlending`); they pulse opacity on a slow sine in `useFrame`.
- Animation: `useFrame` updates the y-coordinate of each particle with a slow noise/sine offset (cap delta-time, target ~30fps feel) so the "data landscape" undulates gently. Whole group rotates ~0.02 rad on Y over time.
- Camera: perspective, slight tilt looking down at the field. OrbitControls disabled.
- Right-edge fade: a CSS gradient overlay so the field dissolves into the background instead of having a hard canvas edge; left-edge fade so it never crowds the headline.
- Loaded via `React.lazy` + `Suspense` with `null` fallback so the initial paint isn't blocked.
- Reduced-motion: if `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, render a single static frame (no `useFrame` loop) — still a beautiful still image, no animation cost.
- Mobile (`< md`): do not mount the canvas at all; show only the background layer. Saves battery and avoids clutter on narrow viewports.

### 4. Floating glass-morphism cards

Build `src/components/HeroFloatingCards.tsx` — 3 abstract UI cards positioned absolutely over the particle field on desktop, hidden below `md`. Pure HTML/CSS, no canvas:

- **Card A — "ML Node"** (top-right area): small node-graph icon (lucide `Network` or a tiny inline SVG of 3 connected dots), label "Inference · 142ms", a thin progress bar at 78% in cyan.
- **Card B — "Performance Metric"** (mid-right): lucide `TrendingUp` icon, label "Run-rate impact", value "+$4.2M", tiny inline SVG sparkline trending up in cyan.
- **Card C — "Data Pipeline"** (lower-center-right): lucide `Workflow` icon, label "Agents online", value "23 / 23" with a small green dot.

Each card:
- `bg-white/55 backdrop-blur-xl border border-white/60`
- `rounded-2xl px-5 py-4`
- Soft layered shadow: `shadow-[0_20px_50px_-20px_hsl(193_100%_45%/0.18),0_8px_20px_-12px_hsl(240_3%_35%/0.15)]`
- Subtle float animation — new keyframe `float` (translateY -6px to +6px over 7s, ease-in-out, infinite, alternate). Each card gets a different `animationDelay` so they drift independently. Disabled under `prefers-reduced-motion`.
- Slight rotation per card (`-rotate-2`, `rotate-1`, `-rotate-1`) for an organic, "floating" feel.
- All decorative — `aria-hidden`, no links.

### 5. Layering & text protection

In the hero JSX, the stack (back to front) is:
```text
HeroBackdrop  →  HeroParticleField  →  HeroFloatingCards  →  text content (relative z-10)
```
Headline column is constrained to `max-w-3xl` on the left so the right ~40% stays clear for the visual. On `lg+`, use a 2-column grid (`grid lg:grid-cols-[1.1fr_1fr]`) so text and visual share the row cleanly; on `md` only the backdrop + text show; on `sm` everything but the backdrop hides.

### 6. Tailwind / CSS additions

In `tailwind.config.ts` add one keyframe + animation:
- `float`: `0%,100% { transform: translateY(-6px) } 50% { transform: translateY(6px) }`
- `animation: { float: "float 7s ease-in-out infinite" }`

In `src/index.css` extend the reduced-motion block to also null out `.animate-float`.

### 7. Dependencies to install

- `three@^0.160.0`
- `@react-three/fiber@^8.18.0`
- `@react-three/drei@^9.122.0`

### Files touched

- `src/pages/Index.tsx` — hero JSX only (size, layout, swap backdrop, mount new components).
- `src/components/HeroBackdrop.tsx` — new.
- `src/components/HeroParticleField.tsx` — new (lazy-loaded).
- `src/components/HeroFloatingCards.tsx` — new.
- `tailwind.config.ts` — add `float` keyframe/animation.
- `src/index.css` — reduced-motion rule for `.animate-float`.
- `package.json` — three / r3f / drei.

Nothing else changes.