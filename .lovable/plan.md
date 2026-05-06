# Goal

Replace the current low-quality SVGs for **database, gears (automation), shield (security), and cloud** with faithful traces of the source webps — matching the quality we just achieved for the brain.

The brain trace worked because we used a **skeleton-based approach**: skeletonize the cyan mask, treat skeleton endpoints + junctions as nodes, walk the skeleton between nodes to get edges. This preserves the original wireframe topology instead of guessing it via Delaunay.

The current database SVG fails because the same parameters (cluster radius = 16px) are wrong for it — the database has tighter, more regular grid spacing than the brain, so 16px collapses neighboring nodes into blobs.

# What to do

1. **Generalize the brain script** into a single reusable trace function that takes a per-shape `cluster_radius` parameter (instead of being hard-coded to 16).

2. **Per-shape tuning**: each silhouette has different node spacing in the source webp. Auto-estimate `cluster_radius` from the median spacing of detected skeleton junctions, then optionally hand-tweak. Starting estimates:
   - database — denser grid → smaller radius (~9–11px)
   - gears — medium spacing, lots of small features (teeth, hub) → ~10–12px
   - shield — regular triangulated mesh → ~12–14px
   - cloud — sparse, rounded → ~12–14px

3. **For each shape, iterate**: trace → render SVG to PNG → side-by-side compare with the source webp → adjust `cluster_radius` and stroke/dot sizes until the silhouette and density match. Stop when the silhouette is clearly recognizable and density visually matches the source.

4. **Write the 4 final SVGs** to `src/assets/flip-lab/plexus-{database,gears,shield,cloud}.svg`, replacing the current ones. The brain SVG stays as-is.

5. **Verify in `/flip-lab`**: the existing `FlipLab.tsx` already imports the SVGs by these exact filenames, so no code changes are needed — the new files just get picked up.

# Technical notes (skip if not interested)

- Pipeline: cyan-mask → `skimage.morphology.skeletonize` → 8-neighbor degree map → node pixels = degree==1 (endpoints) ∪ degree>=3 (junctions) → greedy radius cluster → walk skeleton between node pixels to derive edges.
- Output: 100×100 viewBox, `<line stroke-width="0.3">` + `<circle r="0.85">`, single fill `#00B3E3` — same format as the brain SVG. Fully animatable.
- Stroke and circle radius may also need per-shape tuning if a shape comes out too dense (thinner stroke) or too sparse (slightly larger dots).
- No changes to `FlipLab.tsx`, `PlexusMotif.tsx`, or any CSS — purely asset replacement.

# Out of scope

- The webps themselves (kept as-is, can still be used as raster fallback).
- The brain SVG (already good).
- Animation work (separate task — the SVGs are ready for it once shapes are right).
