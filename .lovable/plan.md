## Goal

Make the Industries Logos section in `/logo-lab` interactive, mirroring the existing Customer Logos QA below it. Each logo tile (rendered on the dark `bg-secondary` surface) gets size presets, and a shared toolbar lets you Copy diff or Download a patched `src/content/site.ts`.

No deprecate action. No reorder. Industries grouping stays as-is.

## What changes

**File: `src/pages/LogoLab.tsx`** — rewrite `IndustriesLogosSection` so it:

1. Accepts shared `edits` state and an `onEditsChange` setter from the parent `LogoLab` component (lifted up so the existing toolbar + diff/download logic covers both sections).
2. Renders each tile with the same dark preview it has today, plus the `SIZE_PRESETS` chip row (reusing `src/sections/logo-lab/sizePresets.ts`) under each tile.
3. Applies the chosen `logoClass` to the live preview `<img>` so resizing is immediate, just like in the Customer QA.
4. Keeps the "missing logo" red flag and the unassigned bucket. Unassigned tiles also get size presets since they live in CUSTOMERS.

**File: `src/pages/LogoLab.tsx` (parent `LogoLab`)** — no logic rewrite needed:

- The existing `edits` state already keys by `customer.name` and the existing `buildPatchedFile`, `handleDownload`, `handleCopyDiff`, `handleReset`, and `dirtyCount` already cover every entry in `CUSTOMERS`. We just pass `edits` + `setEdits` down into `IndustriesLogosSection` so its presets feed the same store.
- Move `IndustriesLogosSection` to render **above** the existing Customer QA grid (it's the section the user is iterating on). Toolbar stays sticky-feeling at the top of the page and operates on both.

**No other files touched.** Logos on industry pages (`IndustryClientsSection`) already read `customer.logoClass` via `CUSTOMERS`, so once the diff is applied to `site.ts` the new sizes flow through automatically.

## Out of scope

- No drag-reorder inside Industries (groups are fixed by `INDUSTRIES_EXTRAS`).
- No "deprecate" button.
- No edits to `industries-extras.ts`.
- No new dependencies. No design tokens added.

## Technical notes

- `LogoTile` already exists but is wired for the light-surface Customer grid. For the dark Industries surface I'll inline a small `IndustryLogoTile` in `IndustriesLogosSection` rather than overloading `LogoTile` with a `darkSurface` prop — keeps both call sites simple.
- Size chips reuse `SIZE_PRESETS` and `matchPreset` from `@/sections/logo-lab/sizePresets`.
- Dirty highlight: tile border switches to `border-primary` when `edits[name] !== (customer.logoClass ?? null)`, matching the Customer QA visual language.
- `buildPatchedFile` is name-keyed and idempotent — no changes needed for the new edit source.
