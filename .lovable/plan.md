## Goal

In `/logo-lab`, add a new dedicated section that mirrors the **exact set of customer logos** rendered by the Industries → Clients section, grouped by industry. This is a QA surface only — read-only review, no reorder/edit controls. The existing main "Customer logos QA" grid (used for the LogoStrip) stays untouched.

## What logos to show (from `src/content/industries-extras.ts`)

```text
Healthcare        → Admed · Netcare · Children's Health
Media & Ent.      → Snap Inc. · Adobe · Verizon
Insurance         → MetLife
Energy & Util.    → TEPSCO
Higher Education  → Harvard University · Penn State · National University of Singapore · Stony Brook University · New York Institute of Technology
Public Sector     → (no logo — "Federal Agency" placeholder, skip)
```

Names are matched against `CUSTOMERS` in `src/content/site.ts` to resolve `logo` / `logoOnDark` paths, exactly the way `IndustryClientsSection` does it. Any unmatched name is shown as an initials tile so missing logos surface immediately.

## Where it lives

- File: `src/pages/LogoLab.tsx` (extend the existing page).
- New section appended below the current "Customer logos QA" grid, separated by a horizontal rule and its own heading.
- No new route, no new top-level component file required. If the section grows, we can later extract it to `src/sections/logo-lab/IndustriesLogosSection.tsx` — not needed for this pass.

## Visual treatment

- Section header: eyebrow "Internal · Industries logos", H2 "Industries clients section".
- One block per industry:
  - Industry name (bold) + count chip (e.g. "5 logos").
  - Grid of logo tiles (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`).
  - Each tile renders the logo on a **dark card** that matches `IndustryClientsSection`'s look: `rounded-2xl border border-white/10 bg-secondary` with the logo centered, using `logoOnDark` when available and `brightness-0 invert` fallback otherwise — so what we see here is exactly what ships on the industries page.
  - Below the dark card, a small light caption with the customer name and the resolved file path (e.g. `/logos/admed.svg`) for quick QA.
- Tiles with no matching `CUSTOMERS` entry render an initials placeholder + a red "missing logo" pill so gaps are obvious.

## Out of scope

- No drag/reorder, no logoClass picker, no Save/Download. This is a review surface.
- No changes to `IndustryClientsSection`, `industries-extras.ts`, or `site.ts`.
- No changes to brand tokens or shared components.

## Files touched

- `src/pages/LogoLab.tsx` — append the new section + a small local helper that builds the industry → names map from `INDUSTRIES_EXTRAS`.

That's it — small, isolated, reuses existing data and tokens.