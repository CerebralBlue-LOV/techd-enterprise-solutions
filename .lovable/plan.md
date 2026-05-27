## Goal

Make `src/sections/clients-lab/clients-lab-data.ts` the single source of truth for TechD's 13 clients. The home `LogoStrip` and every industry "Clients we serve" carousel read from that one file. Move the legacy `partners/` assets out of the live tree, rename everything to a single word — **clients** — and re-anchor each industry carousel to whichever of the 13 fit that vertical. No UI or copy changes to the carousel itself.

## Naming convention (one word, used everywhere)

**`clients`** is the only word used going forward — in folder names, type names, code identifiers, and inline docs. The legacy `Customer` / `CUSTOMERS` / `partners/` vocabulary is retired in this pass. No mention of any individual's name in code or comments.

| Old | New |
|---|---|
| `public/images/partners/` | (moved out — see §2) |
| `public/images/clients/light/` and `clients/dark/` | unchanged (already correct) |
| `Customer` type in `site.ts` | `Client` |
| `CUSTOMERS` constant in `site.ts` | `CLIENTS` |
| `customer` / `c` local vars in components | `client` |
| `MARC_CLIENTS` constant in `clients-lab-data.ts` | `CLIENTS` |
| Any "Marc's list" / "Marc's 13" comment | "TechD client list" |

## 1. Industry mapping for the 13 clients

| Client | Industry | Rationale |
|---|---|---|
| Hamilton Beach | Manufacturing & Industrials | US small-appliance manufacturer |
| Seagate | Manufacturing & Industrials | Storage device manufacturer |
| Wabtec | Manufacturing & Industrials | Rail equipment manufacturer |
| MISO | Energy & Utilities | Midcontinent Independent System Operator |
| Dominion Energy | Energy & Utilities | Regulated electric & gas utility |
| Noresco | Energy & Utilities | Energy-efficiency / ESCO |
| Memorial Sloan Kettering | Healthcare & Life Sciences | NCI-designated cancer center |
| Thomas Jefferson University Hospital | Healthcare & Life Sciences | Jefferson Health academic medical system |
| Sony Pictures | Media & Entertainment | Major film/TV studio |
| Concord Music | Media & Entertainment | Independent music rights & publishing |
| State of Delaware | Public Sector | US state government |
| L3Harris | Public Sector | Defense technology prime |
| FIA Tech | Financial Services & Insurance | Derivatives post-trade infrastructure |

Per-industry counts after migration:

```text
Financial Services & Insurance ........ 1   FIA Tech
Healthcare & Life Sciences ............ 2   MSK, Jefferson
Manufacturing & Industrials ........... 3   Hamilton Beach, Seagate, Wabtec
Media & Entertainment ................. 2   Concord Music, Sony Pictures
Energy & Utilities .................... 3   MISO, Dominion, Noresco
Public Sector ......................... 2   State of Delaware, L3Harris
Higher Education & Research ........... 0   (carousel hides — see §5)
```

## 2. Asset move

- Move `public/images/partners/` → `public/images/deprecated/partners-2025/` (keeps the legacy logos available but out of the live tree). The `partners/white/` dark variants move with it.
- `public/images/clients/{light,dark}/` is the only live client logo folder. It already holds the 13 (MSK as placeholder per prior work).

## 3. Single source of truth: `site.ts` derives from `clients-lab-data.ts`

- Rewrite `src/content/site.ts`:
  - Replace `Customer` type with `Client` (same shape — `name`, `url`, `logo`, `logoOnDark`, `logoClass`).
  - Replace `CUSTOMERS` with `CLIENTS`, **derived** by mapping `CLIENTS` from `clients-lab-data.ts`:
    - `logo` ← `currentLogo` (`/images/clients/light/...`)
    - `logoOnDark` ← `currentLogoDark` (`/images/clients/dark/...`)
    - `logoClass` ← `toLogoClass(defaultHeight)`
  - Keep a thin compatibility re-export `export const CUSTOMERS = CLIENTS;` plus `export type Customer = Client;` for any not-yet-updated callers, then rename consumers in the same pass and remove the re-export.
- Result: sliders in `/clients-lab` instantly update home strip + industry carousels with no second edit.

Files that read the old names (`Customer`, `CUSTOMERS`) and need updating in the same pass: `LogoStrip.tsx`, `IndustryClientsSection.tsx`, anywhere else `rg` finds them.

## 4. Industry carousel data (`src/content/industries-extras.ts`)

**Carousel UI and copy stay exactly as today.** Only the `clients[]` arrays and any `whyPoints` sentences that literally name old clients are rewritten.

```ts
healthcare.clients = [
  { name: "Memorial Sloan Kettering", note: "NCI-designated cancer center, New York — clinical data and oncology informatics." },
  { name: "Thomas Jefferson University Hospital", note: "Jefferson Health academic medical system, Philadelphia." },
]

"media-entertainment".clients = [
  { name: "Sony Pictures",  note: "Global film and television studio — content operations and analytics." },
  { name: "Concord Music",  note: "Independent music rights and publishing — catalog and royalty data." },
]

"energy-utilities".clients = [
  { name: "MISO",            note: "Midcontinent Independent System Operator — grid operations across 15 US states and Manitoba." },
  { name: "Dominion Energy", note: "Regulated electric and natural gas utility — multi-state generation, transmission, and distribution." },
  { name: "Noresco",         note: "Energy-as-a-service and efficiency programs for federal, state, and commercial portfolios." },
]

"public-sector".clients = [
  { name: "State of Delaware", note: "US state government — enterprise data and records modernization." },
  { name: "L3Harris",          note: "Defense technology prime — mission systems and integrated programs." },
]

manufacturing.clients = [
  { name: "Hamilton Beach", note: "US small-appliance manufacturer — supply chain and commerce data." },
  { name: "Seagate",        note: "Global storage manufacturer — manufacturing analytics and operations." },
  { name: "Wabtec",         note: "Global rail-equipment manufacturer — locomotives, braking, freight systems." },
]

"financial-services".clients = [
  { name: "FIA Tech", note: "Derivatives post-trade infrastructure — exchange-traded futures and options industry utility." },
]

"higher-education".clients = []
```

`whyPoints` rewrites limited to sentences that name old clients — replace named-client lines with credential-led generic phrasing, leave the rest of each industry's narrative intact.

## 5. Higher Education handling (Option A)

- `higher-education.clients = []` → `IndustryClientsSection` already returns `null` for empty client lists, so the carousel auto-hides. The rest of the page (hero, why-points, practices, CTA) renders normally.
- Rewrite the named-clients `whyPoints` bullet to credential-led generic phrasing (no university names). Example: `"Multi-year delivery across R1 research universities — research computing, identity and SSO, and FERPA-aligned student data platforms."`
- IA, nav, and route table unchanged. When a real higher-ed client lands later, populate `clients[]` and the carousel returns.

## 6. CLAUDE.md update

Add a new section near the existing "Content copy rules" / "Image asset structure" area documenting:

- **Client list is owned by `src/sections/clients-lab/clients-lab-data.ts`.** All `CLIENTS` references in `site.ts` derive from it. The sandbox at `/clients-lab` is the editing surface.
- **Vocabulary is `clients`** (one word, used everywhere — folders, types, identifiers, copy). Do not introduce `customers`, `partners`, or person-named lists.
- **Asset paths:** color logos at `public/images/clients/light/<name>.<ext>`, dark variants at `public/images/clients/dark/<name>.png`. Generate dark variants with `python scripts/generate-white-logos.py --src public/images/clients/light --out public/images/clients/dark --all`.
- **Industry assignment lives in `src/content/industries-extras.ts`** (`clients[]` per industry). Names must match a `CLIENTS` entry exactly.
- **Higher Education currently has no client** — keep `clients[]` empty until a real one lands; the carousel auto-hides.
- **Legacy logos live at `public/images/deprecated/partners-2025/`** — do not reintroduce them into the live tree.

## Files touched

- `public/images/partners/` → moved to `public/images/deprecated/partners-2025/`
- `src/content/site.ts` — rename `Customer`→`Client`, derive `CLIENTS` from `clients-lab-data.ts`
- `src/sections/clients-lab/clients-lab-data.ts` — rename `MARC_CLIENTS`→`CLIENTS`, scrub comments referencing any individual
- `src/content/industries-extras.ts` — rewrite each `clients[]` and the named-client `whyPoints` bullets
- `src/components/shared/LogoStrip.tsx` — rename type imports (`Client`/`CLIENTS`)
- `src/sections/industries/IndustryClientsSection.tsx` — rename type imports; UI unchanged
- `CLAUDE.md` — append the new section described in §6

## Out of scope

- Carousel layout, animation, copy headers, CTAs — untouched.
- Logo height sliders / Lab UI — untouched (already shipped).
- Any new client logos beyond the existing 13.
