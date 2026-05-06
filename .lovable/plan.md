## Goal

Internal sandbox at `/logo-lab` to QA every customer logo used by the homepage `LogoStrip` ("Trusted by Fortune 500 leaders"). Lets you:

- See each logo at the exact size it renders in the marquee.
- Resize each logo via discrete Tailwind heights.
- Persist changes by writing the updated `logoClass` directly back into `src/content/site.ts`.
- Flag any logo whose file is missing or fails to load.

## Data source

Reads `CUSTOMERS` from `src/content/site.ts`. The lab edits only the `logoClass` field per entry. Order, names, URLs, and image paths are not touched.

## UX

Single page, grid of tiles (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).

Each tile shows:
- Logo rendered with the same classes used in the marquee (`object-contain`, lazy load) on a white card matching the live section.
- Below the logo: customer name + URL.
- A size selector — segmented buttons for: `h-6`, `h-7`, `h-8`, `h-9`, `h-10`, `h-12`, `h-14`, `h-16`, `h-20`, `h-24` (each pair as `h-X md:h-Y`, matching the current convention; one click selects a preset that maps to the existing pattern).
- Status pill: `OK`, `Missing file` (no `logo` field), or `Broken` (img `onError`).

Top of the page:
- Title + short instructions.
- Two buttons: **Save changes** (writes to `site.ts` via dev endpoint) and **Reset** (revert local edits to file values).
- A counter "N unsaved changes".

No marquee preview, no grayscale toggle, no reorder — out of scope per your answers.

## Saving (dev-only)

Vite dev plugin exposing a single endpoint `POST /__lab/save-logo-sizes`:
- Body: `[{ name: string, logoClass: string | null }]`
- Reads `src/content/site.ts`, finds each `{ name: "..." }` entry, and updates/inserts/removes its `logoClass: "..."` field. Preserves all other fields and surrounding formatting.
- Implementation: a small AST-free string replace driven by a regex anchored on `name: "<exact name>"` within the same object literal — robust enough for this file, which is hand-maintained and uniformly formatted.

The plugin is registered in `vite.config.ts` only when `mode === "development"`. It does nothing in production builds, so the lab cannot be used to mutate a deployed site. The endpoint is unauthenticated but only reachable from the local dev server.

The lab page calls this endpoint, then reloads `CUSTOMERS` (full page reload is fine — it's a lab).

## Missing/broken detection

- "Missing file" — entry has no `logo` field.
- "Broken" — `<img onError>` fires; the tile flips to a red-bordered state with the attempted path so you can fix the filename.
- Server-side existence check is not needed; the browser's load failure is the source of truth.

## Files

**New**
- `src/pages/LogoLab.tsx` — page shell, save/reset bar, grid.
- `src/sections/logo-lab/LogoTile.tsx` — single-logo card with size selector and status pill.
- `src/sections/logo-lab/sizePresets.ts` — the discrete height presets (label + className).
- `vite-plugins/save-logo-sizes.ts` — dev-only Vite plugin handling `POST /__lab/save-logo-sizes`.

**Edited**
- `src/app/routes.tsx` — register `/logo-lab` route.
- `vite.config.ts` — load the plugin in dev mode only.

No nav link added (lab page, accessed by URL).

## Acceptance check

- Visit `/logo-lab` → grid of every customer with current size highlighted.
- Click a different size on any tile → preview updates immediately, header shows "1 unsaved change".
- Click **Save** → `src/content/site.ts` is rewritten, the dev server hot-reloads, the homepage marquee shows the new sizes.
- Visit `/` → `LogoStrip` reflects the saved sizes.
- A logo with a missing or wrong file shows a red status pill.

## Out of scope

- No production save path. No auth. No reorder/disable. No background or grayscale toggle. No marquee preview. No image upload.