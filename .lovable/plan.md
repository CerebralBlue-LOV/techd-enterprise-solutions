# Plan: finish 3D hero performance pass

Four remaining optimizations from the earlier audit, ordered cheapest → highest impact.

## 1. Pause `<Canvas>` render loops when off-screen

**Problem:** Every hero `<Canvas>` keeps animating at 60 fps even after the user scrolls past, burning CPU/GPU.

**Approach:** Add a shared `useInViewFrameloop` hook that returns `"always" | "demand"` based on an `IntersectionObserver`. Wire it into every `<Canvas frameloop={...}>`:

- `src/sections/home/_components/HeroParticleField.tsx`
- `src/sections/industries/_components/IndustryStackingCubeScene.tsx`
- `src/sections/services/_components/ServiceIsoCubeScene.tsx`
- `src/sections/solutions/_components/PracticeWireframeScene.tsx`
- `src/sections/resources/_components/ResourceTileStackScene.tsx`
- `src/sections/company/_components/CompanyDnaScene.tsx`
- `src/components/shared/heroFigures/solutions/_SharedWireframe.tsx` (covers all 5 per-practice figures)
- Plus contact hero scene if present

`prefers-reduced-motion` still wins (forces `"demand"` regardless).

**Result:** Each hero only consumes GPU while visible. Negligible bundle cost; one small hook file.

## 2. `prefers-reduced-motion` particle reduction

**Problem:** Today reduced-motion just freezes the frame loop (`frameloop="demand"`). The geometry is still built — particle-heavy scenes still cost memory and a one-time GPU upload.

**Approach:** In each scene that has a particle/point count constant, multiply by `0.2` when `prefers-reduced-motion: reduce` is set. Primary targets:

- `HeroParticleField` (the home hero — the heaviest)
- Any `<points>` geometry in the wireframe figures (small but free win)

Read the media query once at module/component init; pass the scaled count into the geometry builder.

**Result:** Accessibility users get a static, low-cost scene instead of a frozen heavy one.

## 3. Suspense fallback skeletons (CLS fix)

**Problem:** `<Suspense fallback={null}>` everywhere means the hero figure area is empty until the lazy chunk resolves, then pops in. On slow connections this causes layout shift and a flash.

**Approach:** Replace `fallback={null}` with a tiny presentational skeleton that fills `absolute inset-0` with a faint brand-cyan radial gradient (no animation, no JS). One shared `<HeroFigureFallback />` in `src/components/shared/heroFigures/`. Wire it into:

- `HeroSection` (home)
- `SolutionsFigure`, `IndustriesFigure`, `ResourcesFigure`, `CompanyFigure`
- `_SharedWireframe` (per-practice figures)
- `ContactHero` if applicable

No layout math needed — the wrappers already reserve space via `absolute inset-0` inside a sized parent. Goal is purely the visual placeholder, not dimension reservation.

## 4. Mobile static-image fallback (biggest LCP win)

**Problem:** Mobile users download `three` (~150 KB gz) + the scene chunk + run a WebGL context for a decorative background. Cuts straight into LCP and battery.

**Approach:**

**a. Generate stills.** Add a one-off script `scripts/capture-hero-stills.ts` that opens each figure in a Puppeteer/Playwright headless browser at a fixed viewport, waits for the scene, screenshots transparent PNG, and `cwebp`-compresses to `public/images/hero-stills/<figure>.webp`. Run manually, commit the output. (Alternative if Playwright is heavy: render each scene once in a hidden `<Canvas>` at build time and `gl.domElement.toDataURL()` — but a script is simpler and re-runnable.)

**b. Swap at runtime.** New `<HeroFigure>` wrapper in `src/components/shared/heroFigures/`:

```text
if (isMobile)  → <img src="…/figure-name.webp" alt="" loading="eager" decoding="async" />
else           → existing lazy <Canvas> tree
```

Use `useIsMobile()` (already exists in `src/hooks/use-mobile.tsx`). Below 768px the three.js chunk never loads — `React.lazy` only fires when the component mounts.

**c. Per-figure mapping.** Each figure component (`SolutionsFigure`, `IndustriesFigure`, etc.) passes its still path + the lazy scene component to the wrapper.

**Result:** Mobile LCP drops ~400–800 ms, zero WebGL context on phones, zero three.js JS shipped to mobile users on first paint.

## Verification

- Build runs clean; `dist` chunks unchanged in size except for the small new hook/wrapper.
- Desktop: scroll past each hero, confirm `requestAnimationFrame` stops (Performance tab shows idle).
- Mobile viewport (390×844): network tab shows `three-*.js` is NOT requested on `/`, `/solutions/*`, `/industries/*`, `/services/*`, `/resources/*`, `/company`.
- Toggle "Reduce motion" in OS settings: particle counts visibly lower, no animation.
- Lighthouse mobile run on `/`: expect LCP improvement of 300–800 ms.

## Out of scope

- Replacing three.js with CSS/SVG figures entirely
- Server-side rendering
- Image transformer / responsive `srcset` for the stills (single WebP is enough for decorative backgrounds)
