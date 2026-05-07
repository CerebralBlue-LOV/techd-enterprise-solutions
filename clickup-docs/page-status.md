# Page Status by Route

All 6 routes are in scope for this sprint. The 404 page is already complete.

---

## Status summary

| Route | Component | Build Status | Content Status | Notes |
|---|---|---|---|---|
| `/` | `Index.tsx` | 🟡 In progress | 🟡 Real content being applied | Hero, solutions teaser, industry list, client logos, case study, CTA |
| `/solutions` | `Solutions.tsx` | 🟡 Scaffold | ⬜ Pending | Solutions data in `src/content/solutions.ts` |
| `/industries` | `Industries.tsx` | 🟡 Scaffold | ⬜ Pending | Industry list rebalanced — Media & Ent added, Financial dropped |
| `/services` | `Services.tsx` | 🟡 Scaffold | ⬜ Pending | Services data in `src/content/services.ts` |
| `/resources` | `Resources.tsx` | 🟡 Scaffold | ⬜ Pending | Resources hub — all 112 legacy event/webinar URLs redirect here |
| `/contact` | `Contact.tsx` | 🟡 Scaffold | ⬜ Pending | Form backend (Cloudflare Worker) is a Day 4 deliverable |
| `*` (404) | `NotFound.tsx` | ✅ Done | ✅ Done | |

---

## Homepage (`/`) — section breakdown

| Section | Status | Notes |
|---|---|---|
| Hero (particle field + glass cards) | ✅ Built | r3f canvas, lazy-loaded, disabled on mobile |
| Solutions teaser | 🟡 In progress | Data from `solutions.ts` |
| Industry cards | 🟡 In progress | List rebalanced — Media & Ent added |
| Client logo strip (marquee) | ⬜ Pending | Need logo files from product owner |
| Case study block | 🟡 In progress | Using IBM-published retail case, removing placeholder pharma stats |
| CTA section | ⬜ Pending | |
| Footer | ✅ Built | |

---

## Content strategy

All content lives in `src/content/` as typed TypeScript modules — not hardcoded in JSX. This means future text updates are in one place (no digging through component files).

| File | Contents |
|---|---|
| `src/content/site.ts` | Nav items, footer copy, contact details |
| `src/content/solutions.ts` | Solutions list with titles, descriptions, icons |
| `src/content/industries.ts` | Industry list with names and icons |
| `src/content/services.ts` | Services list |
| `src/content/resources.ts` | Resources hub entries |

---

## What "scaffold" means

A scaffold page has the route working, the component file created, and placeholder structure in place. It renders without errors but shows placeholder or sparse content. Day 3 work converts scaffolds to real content pages.

---

## Not in scope: detail pages

Individual solution, industry, and service detail pages (e.g. `/solutions/ai-engineering`) are **deferred**. All legacy sub-URLs redirect to the parent route (e.g. all 42 solution sub-pages → `/solutions`). Detail pages are a Phase 2 deliverable after content is audited and legal review is complete.
