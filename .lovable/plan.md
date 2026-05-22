
## Goal

The four TechD brand assets in `src/assets/brand/` are tiny bitmaps (largest is 264×70). Any time we render them above their native size — hero, footer at 2x, retina screens — they pixelate. We have no SVG source from TechD, so we need to **reconstruct** them. This plan builds an internal `/techd-brand-lab` page where each candidate reconstruction is rendered side-by-side at multiple sizes against the current asset, so you can judge which method to ship.

## The four source assets

| File | Current size | Content |
|---|---|---|
| `techd-logo.webp` | 264×70 | Full logo: cyan gear + gray "TechD" wordmark |
| `techd-wordmark.png` | 192×58 | "TechD" wordmark only |
| `techd-gear.png` | 70×70 | Cyan gear mark only |
| `techd-mark-white.png` | 70×70 | White gear mark (for dark backgrounds) |

## Three reconstruction methods I'll run per asset

I'll generate all three for each asset so you can compare them honestly. None requires you to call the TechD brand team.

**1. Vector tracing (vtracer / potrace)** — *most faithful*
- Run the existing PNG through `vtracer` (color) or `potrace` (B&W) to convert pixels into actual SVG paths.
- Output is a true vector — infinite resolution, file usually smaller than the PNG.
- Best on the gear and the white mark. Wordmark tracing depends on how clean the existing PNG edges are; may need a manual cleanup pass.
- **Risk:** if the source PNG has soft/anti-aliased edges, the trace inherits a slight wobble. Mitigated by upscaling first, then tracing.

**2. AI upscale (Nano Banana edit_image, 4×)** — *safe raster fallback*
- Feed the current PNG to the image model with a prompt to upscale to ~1200×320 keeping the exact shapes, edges, and brand cyan.
- Output is still raster but high enough resolution to never visibly pixelate on any screen.
- **Risk:** model can subtly change letter shapes or color — I'll diff against original.

**3. AI redraw (generate_image)** — *cleanest but riskiest*
- Prompt the model to redraw the logo from scratch (geometric gear + "TechD" wordmark in a clean sans-serif).
- Output can be vector-clean, but letterforms and gear geometry will not exactly match the original.
- Only ship this if vector trace fails AND you accept a slightly different mark.

## The `/techd-brand-lab` page

A new route, internal-only (linked from `/admin-lab` like the existing logo-lab is).

Layout, per asset:

```text
┌─────────────────────────────────────────────────────────────┐
│ techd-logo.webp                                             │
├──────────────┬──────────────┬──────────────┬───────────────┤
│ ORIGINAL     │ VECTOR TRACE │ AI UPSCALE   │ AI REDRAW     │
│ (current)    │ (.svg)       │ (4× .webp)   │ (.svg)        │
│              │              │              │               │
│ [render @ 70]│ [render @ 70]│ [render @ 70]│ [render @ 70] │
│ [render @140]│ [render @140]│ [render @140]│ [render @140] │
│ [render @280]│ [render @280]│ [render @280]│ [render @280] │
│ [render @560]│ [render @560]│ [render @560]│ [render @560] │
│              │              │              │               │
│ 264×70 webp  │ vector       │ 1056×280 wb  │ vector        │
│ 4.7 KB       │ 2.1 KB       │ 18 KB        │ 3.4 KB        │
│ [Use this]   │ [Use this]   │ [Use this]   │ [Use this]    │
└──────────────┴──────────────┴──────────────┴───────────────┘
```

Same grid repeats for `techd-wordmark`, `techd-gear`, `techd-mark-white` (the white mark is rendered against a dark `bg-secondary` strip so you can judge it in context).

Each candidate also shows a dark-background row, since these logos live on both white (header) and dark (footer, hero) surfaces.

The `[Use this]` button is non-functional in this plan — you tell me which one wins per asset in chat and I do the swap in a follow-up step.

## Execution order

1. Install `vtracer` and `potrace` in the sandbox (nix), run each on the four source PNGs → produce 4 candidate SVGs in `src/assets/brand/lab/`.
2. Call AI upscale on each source PNG → produce 4 hi-res WebPs in `src/assets/brand/lab/`.
3. Call AI redraw with carefully scoped prompts → produce 4 alternative SVGs in `src/assets/brand/lab/`.
4. Build `src/pages/TechDBrandLab.tsx` rendering the 4×4 grid above (using all 12 candidates + 4 originals).
5. Add `/techd-brand-lab` route in `src/app/routes.tsx`.
6. Add a tile for the new lab in `src/pages/AdminLab.tsx` so you can find it.
7. **No production files are touched.** `src/components/layout/Header.tsx`, `Footer.tsx`, hero, intro — all unchanged until you pick winners.

## After you pick winners

In a follow-up turn, for each winning candidate I:
- Move the chosen file from `src/assets/brand/lab/` to `src/assets/brand/` (overwriting the old PNG/WebP, or adding `.svg` and updating imports).
- Update the import path in components that reference it.
- Re-run `scripts/generate-white-logos.py` if the color logo changed, so the white variant stays in sync.
- Delete the `lab/` candidates we didn't ship.

## Out of scope (will not do in this plan)

- Touching the customer logos (already handled by existing `/logo-lab`).
- Changing the IBM logo.
- Replacing logos in production components yet.
- Any visual or copy change outside `src/pages/TechDBrandLab.tsx`, `src/app/routes.tsx`, `src/pages/AdminLab.tsx`, and new files under `src/assets/brand/lab/`.

## Honest expectations

- **Vector trace of the gear** → should be near-perfect. Geometric shape, solid cyan, easy win.
- **Vector trace of the white mark** → same, near-perfect.
- **Vector trace of the wordmark** → ~80% likely to be ship-ready; 20% chance the source PNG is too soft and we ship the AI upscale instead.
- **Vector trace of the full logo** → composite of the above; if both parts trace cleanly, this does too.
- **AI upscale** → always usable as a fallback; not as good as a true SVG but better than the current 264×70.
- **AI redraw** → I'll generate it for completeness, but I do not recommend shipping it unless the traces fail. Brand marks must stay exact.
