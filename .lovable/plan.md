## Goal

Undo the 9 rows I wrongly appended to `CUSTOMERS`, and refactor `/clients-lab` so it is purely a **sizing tool driven by the live `CUSTOMERS` array** — never adds/removes clients, only emits `logoClass` changes.

## Step 1 — Revert site.ts

In `src/content/site.ts`, delete the entire "TechD-true clients (Marc's list — appended)" block at the bottom of `CUSTOMERS`. That removes:

- Hamilton Beach, Concord Music, State of Delaware, FIA Tech, L3Harris, MISO, Noresco, Dominion Energy, Sony Pictures

Keep the size tweaks already merged into pre-existing rows:
- Seagate `h-10 md:h-12`
- Wabtec `h-12 md:h-14`

Result: `CUSTOMERS` returns to its original ~30 clients with only the two intentional size edits.

Downloaded image files in `public/images/partners/` (hamilton-beach.png, concord-music.png, state-of-delaware.png, fia-tech.jpg, l3harris.png, miso-energy.png, noresco.png, dominion-energy.png, sony-pictures.png, msk.png) stay on disk — harmless, and they're already available when Marc approves adding them later.

## Step 2 — Refactor the lab to read from CUSTOMERS

Replace the hardcoded `MARC_CLIENTS` list with a derivation from the live array.

**`src/sections/clients-lab/clients-lab-data.ts`**
- Delete `MARC_CLIENTS` and the placeholder/currentLogo machinery.
- Export a `getLabClients()` helper that maps every entry in `CUSTOMERS` to a tile descriptor: `{ name, url, logo, currentClass }`.
- Parse `logoClass` (e.g. `"h-10 md:h-12"`) into a mobile `HeightToken` so the slider opens on the live value.
- Keep `HEIGHT_TOKENS` + `toLogoClass()` as-is.

**`src/pages/ClientsLab.tsx`**
- Source data from `getLabClients()` instead of `MARC_CLIENTS`.
- Default each slider to the parsed current height (not an arbitrary default), so "changed" means "differs from what is in site.ts right now".
- Copy button emits **size-only diffs** — same name/url/logo, only `logoClass` updated. No `// TODO add logo` lines, no commented placeholders.
- Update the header copy: "Sizing sandbox for the {N} clients in the live home strip. Adjust heights, copy the diffs into `CUSTOMERS`."

**`src/sections/clients-lab/LogoTile.tsx`**
- Drop the placeholder branch (no more `client.placeholder`).
- Image always renders from `logo`. No more `currentLogo` indirection.

## Step 3 — Verify

- Reload `/` — home strip looks like it did at start of the day, minus the two Seagate/Wabtec size tweaks.
- Reload `/clients-lab` — shows every client in `CUSTOMERS`, each slider pre-set to that row's current height.
- Move one slider, hit Copy — snippet contains only that one row with the new `logoClass`, ready to paste over the existing line in `site.ts`.

## Out of scope

- Adding/sourcing logos for clients not yet in `CUSTOMERS` (Marc's bigger list). Separate decision.
- Removing the downloaded files in `public/images/partners/` — leaving them in place is cheap and useful for the next round.
- Dark-mode variants for any of the unused files.
