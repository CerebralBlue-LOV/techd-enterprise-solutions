# Add a "Solutions" section to /figure-lab — 5 per-practice wireframe figures

Goal: a new section in `/figure-lab` showing **one wireframe figure per practice** (AI & Generative, Data & Analytics, Automation & FinOps, Security & Compliance, Hybrid Cloud) using the same r3f / three.js graphic language as the existing `PracticeWireframeScene` (cyan wireframe edges + additive vertex points on a gently rotating shape, on the engineered grid backdrop).

This is **lab-only** — no changes to home, no changes to the existing `/solutions/*` pages.

## Visual language (locked)

Every figure shares these rules so the line stays consistent:
- `<Canvas>` with the existing camera/lighting setup
- A `lineSegments` over `edgesGeometry` (cyan `#00B3E3`, opacity ~0.55)
- A `points` overlay (highlight `#7CE6FF`, additive blending, opacity ~0.95)
- Slow rotation via `useFrame` (`rotation.y = t * 0.15`, sine wobble on x)
- Respect `prefers-reduced-motion` — static frame, no animation
- Same engineered-grid background panel used by the other lab tiles

Only the **geometry** changes per practice — keeps each figure recognizable without breaking the family look.

## Per-practice geometry mapping

| Practice | Geometry | Visual story |
|---|---|---|
| AI & Generative | `IcosahedronGeometry(2.6, 1)` + inner offset shell | The current globe — keeps the "thinking model" feel |
| Data & Analytics | Stacked wireframe boxes / extruded grid columns | Reads as a 3D bar chart / data cube |
| Automation & FinOps | Rotating `TorusKnotGeometry` | Loop/flow — pipelines and orchestration |
| Security & Compliance | `OctahedronGeometry` + concentric ring (`TorusGeometry`) | Shield/lock signal |
| Hybrid Cloud | Two interlinked rings (two `TorusGeometry`) crossing at 90° | Connection between two environments |

(Geometry choices are intentionally simple primitives — they read fast at small sizes and match the existing isometric-wireframe reference saved in memory.)

## Files to add

```
src/components/shared/heroFigures/solutions/
  AiGenerativeFigure.tsx         # current globe, renamed/re-exported for clarity
  DataAnalyticsFigure.tsx
  AutomationFinOpsFigure.tsx
  SecurityComplianceFigure.tsx
  HybridCloudFigure.tsx
  _SharedWireframe.tsx           # shared <Canvas> + lighting + reduced-motion wrapper
```

`_SharedWireframe.tsx` exposes a single `<WireframePanel>{children}</WireframePanel>` so each per-practice file only ships its geometry — guarantees the graphic line stays identical.

## File to edit

- `src/pages/FigureLab.tsx` — add a new section block "Solutions" rendering the 5 figures in a 2- or 3-column grid, each in the same labeled card the existing `SLOTS` use (header chip with practice name + figure component name). Section sits above the existing top-level figures grid.

## Out of scope

- No changes to home `SolutionsGridSection` or any `/solutions/*` page
- No live tuner UI for these (only the existing `ResourcesTuner` keeps sliders) — can add later if you want
- No content/data changes in `src/content/solutions.ts`
- No new dependencies — uses already-installed `three` + `@react-three/fiber`

## Acceptance

- `/figure-lab` shows a new "Solutions" section with 5 cards, one per practice, each running a distinct but visually-related wireframe scene
- Reduced-motion users see static frames
- No regressions on the existing figure tiles
