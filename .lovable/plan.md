## Goal

A hidden internal tool at `/clients-lab` to dial in Marc's 13-client logo strip without touching the live home page. Adjust each logo's size, see the result instantly, then copy a ready-to-paste TypeScript block into `src/content/site.ts`.

## The 13 clients (Marc's list)

| # | Client | Logo status | Source |
|---|---|---|---|
| 1 | Hamilton Beach | revive | `deprecated/partners-deprecated/hamilton-beach.png` |
| 2 | Seagate | already live | `partners/seagate.svg` |
| 3 | Concord Music | **placeholder** | — |
| 4 | State of Delaware | **placeholder** | — |
| 5 | FIA Tech | **placeholder** | — |
| 6 | L3Harris | revive | `deprecated/partners-deprecated/l3harris.png` |
| 7 | MISO | revive | `deprecated/partners-deprecated/miso-energy.png` |
| 8 | Noresco | **placeholder** | — |
| 9 | Wabtec | already live | `partners/wabtec.webp` |
| 10 | Dominion Energy | revive | `deprecated/partners-deprecated/dominion-energy.png` |
| 11 | Memorial Sloan Kettering | **placeholder** | — |
| 12 | Thomas Jefferson University Hospital | revive | `deprecated/partners-deprecated/jefferson-health.png` |
| 13 | Sony Pictures | revive | `deprecated/partners-deprecated/sony-pictures.png` |

8 real logos + 5 placeholders. Live `site.ts` stays untouched — the lab uses its own local list.

## What the page does

```text
┌──────────────────────────────────────────────────────────┐
│  Clients Lab           [Copy ALL entries to clipboard]   │
│  Internal sizing tool — not linked from nav              │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │  [logo]  │  │  [logo]  │  │PLACEHOLDER│ │  [logo]  │ │
│  │          │  │          │  │ Concord   │ │          │ │
│  │ Hamilton │  │ Seagate  │  │ Music     │ │  FIA …   │ │
│  │ ──●───── │  │ ───●──── │  │ ─●─────── │ │ ──●───── │ │
│  │ h-10     │  │ h-12     │  │ h-10      │ │ h-10     │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
│                                                          │
│  (responsive grid, 2-4 cols, hover = full color + zoom)  │
└──────────────────────────────────────────────────────────┘
```

Each tile shows:
- The logo (or a dashed gray placeholder box with the brand name centered, for the 5 missing)
- The brand name underneath
- A slider that sets the `logoClass` height (range: `h-6` → `h-20` in 2-step increments; uses existing Tailwind tokens so the output matches what the live marquee accepts)
- The current class string in monospace so you can read what's set

Hover behavior matches the live marquee exactly: starts at `opacity-70 grayscale`, hover restores `opacity-100` + color, 300ms transition. Adds a subtle 2-3% scale-up so the hover state reads clearly in the lab (the marquee version doesn't scale; we keep the live behavior identical).

## "Copy ALL entries" button

Generates a TypeScript snippet like:

```ts
// Paste into CUSTOMERS in src/content/site.ts
{ name: "Hamilton Beach", url: "https://hamiltonbeach.com", logo: "/images/partners/hamilton-beach.png", logoClass: "h-10 md:h-12" },
{ name: "Seagate", url: "https://www.seagate.com", logo: "/images/partners/seagate.svg", logoClass: "h-8 md:h-9" },
// … all 13 entries with whatever sizes you chose
```

Writes to clipboard via `navigator.clipboard.writeText`. Shows a toast "Copied 13 entries to clipboard". This is the only "diff" output — no file writes, no API.

Placeholders emit a commented entry so it's obvious they need a real asset:

```ts
// TODO add logo file: /images/partners/concord-music.{svg|png}
// { name: "Concord Music", url: "", logo: "/images/partners/concord-music.svg", logoClass: "h-10 md:h-12" },
```

## Logo file handling

For the 7 deprecated logos we want to revive: the lab **references them directly from their current `deprecated/` paths** so we don't move files in this step. The generated snippet, however, writes the **target** `/images/partners/...` path — a one-line note at the top of the page reminds you "move these 7 files from `deprecated/partners-deprecated/` → `partners/` before pasting into site.ts". Keeps the lab pure-frontend, no file-system side effects.

Recommendation: do the file moves as a separate follow-up commit once Marc signs off on the sizes — that way the deprecated folder stays the safety net until the final list is locked.

## Files to add

- `src/pages/ClientsLab.tsx` — the page (route component, page-level layout, header, copy button, grid)
- `src/sections/clients-lab/LogoTile.tsx` — one card: logo/placeholder + name + slider + class readout
- `src/sections/clients-lab/clients-lab-data.ts` — the local 13-entry list (typed, exported); keeps the page component lean and makes future edits trivial
- Route entry in `src/app/routes.tsx`: `<Route path="/clients-lab" element={<ClientsLab />} />` — outside the redirects, no nav link

## Technical details

- Slider: shadcn `Slider` (already in `components/ui/`), single value, maps index → `["h-6","h-7","h-8","h-9","h-10","h-12","h-14","h-16","h-20"]`. Output writes `${base} md:${oneStepUp}` to mirror the existing `logoClass` convention in `site.ts`.
- Placeholder component: dashed `border-muted-foreground`, `bg-muted/30`, brand name in `font-bold uppercase tracking-wider text-xs text-muted-foreground`, fixed aspect close to a real logo tile so the grid doesn't jump.
- All Tailwind tokens only (per project memory) — no raw hex, no new design tokens.
- Page wrapped in standard `Layout` (Header/Footer) for consistency, but with a clear "Internal — clients sizing lab" banner at the top so anyone who lands on it knows it's not public content.
- No SEO meta / sitemap entry / robots change (it's just an unlinked route; not worth a noindex tag unless you want one — happy to add `<meta name="robots" content="noindex" />` via the existing `SEO` component, recommended).

## Out of scope (deliberately)

- Moving the 7 deprecated logo files into `partners/` (follow-up commit once sized)
- Sourcing the 5 missing logos (Concord, Delaware, FIA Tech, Noresco, MSK) — placeholders only
- Updating live `site.ts` CUSTOMERS — the lab is the sandbox; you copy-paste when ready
- Dark-mode `logoOnDark` variants (project memory says dark mode is deferred; the lab honors the live light palette only)
- Marquee preview in the lab (you picked static grid only)

## Recommendations

1. **Add `noindex` meta** on the lab page so it never ends up in search results even if the URL leaks. Low cost, high safety.
2. **Don't delete the current CUSTOMERS array yet.** Once you've got the new 13 entries ready, replace in one commit so the home page never shows a half-list. I'd also keep one or two of the strongest current logos (e.g. Adobe, Mercedes) on a separate question to Marc — his message said "I would put [these]" not "delete everything else." Worth a 1-line clarification before the final swap.
3. **For the 5 missing logos**, the easiest source for each: Concord Music (Wikipedia SVG), State of Delaware (delaware.gov press kit), FIA Tech (their site footer), Noresco (their site header), MSK (mskcc.org brand assets). I can fetch these in the follow-up commit if you want.
