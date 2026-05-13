# Company section content build-out

Source of truth: `docs/revisions/about/{company-overview, delivery-methodology, ibm-partnership, leadership-team}.md`. Every claim, list, and number on the rebuilt pages traces back to those four docs — no invented copy.

## 1. New content module — `src/content/about.ts`

A single typed module the four Company pages import from. No data lives in page components.

Exports:

- `COMPANY_FACTS` — Founded 2009 · IBM Platinum Business Partner · Miami, FL HQ · Delivery across US & Canada.
- `PRACTICE_AREAS` — Four objects: AI & Generative, Data & Analytics, Automation & FinOps, Security & Compliance. Each has `name`, one-sentence description, and `to` link to the matching `/solutions/*` page.
- `PORTFOLIO_BY_PRACTICE` — The 21 confirmed products grouped under the four practices, exactly as listed in `ibm-partnership.md` §1.
- `IBM_AI_OPERATING_MODEL` — Four pillars (Govern, Integrate, Orchestrate, Automate) each mapped to TechD's engagement stage, per `delivery-methodology.md` §3.
- `ENGAGEMENT_STAGES` — Five stages: Advisory Assessment → Architecture Design → Implementation → Knowledge Transfer → Post-Go-Live Support, each with the deliverable sentence from `delivery-methodology.md` §5.
- `IBM_PLATFORM_ASSESSMENT` — Scope (what we review) → Deliverable (written report contents) → Next step. Verbatim from `delivery-methodology.md` §1.
- `COMPLIANCE_FRAMEWORKS` — HIPAA / FedRAMP / PCI-DSS / NERC-CIP, each tied to its industry vertical.
- `LEADERSHIP` — Two entries (Marc Martina, Garrett Rowe) with name, title, 2–3 factual sentences, and `domains: string[]`. Bios use the exact wording from `leadership-team.md` §5. No headshots — cards render an initials avatar tile until photos arrive.
- `QUICK_START_ADVISORY` — Scope, target, format, CTA copy.
- `IBM_PARTNER_DIRECTORY_URL` — Built from listing ID `69abd900-4f1d-11df-ac68-020031000011` (per `ibm-partnership.md` §1).

## 2. Rewrite `src/pages/company/About.tsx`

Hero stays. Sections (top to bottom):

1. **Founding story** — three sentences: 2009 Miami origin, IBM ecosystem entry, current Platinum / four-practice scale. `COMPANY_FACTS` chips beside it.
2. **Four practices** — 2×2 card grid from `PRACTICE_AREAS`, each card linking to its `/solutions/*` page.
3. **Regulated-industry depth** — Six-vertical callout (healthcare, insurance, public sector, M&E, higher ed, energy & utilities) with the four compliance frameworks attributed to their primary vertical.
4. **Leadership** — Two cards (Marc, Garrett) using `LEADERSHIP`. Initials avatar tile, name, title, bio, domain coverage chip row. "Why this team" closing paragraph below the cards.
5. **Methodology preview** — Short block linking to the new `/company/delivery-methodology` page.
6. `PageFinalCtaSection` (existing).

Removes the fictional "VP of Delivery" entry and all unverifiable copy.

## 3. Rewrite `src/pages/company/IBMPartnership.tsx`

Hero stays. Sections:

1. **Platinum credential block** — Tier name, "since 2009", and an outbound `Verify on IBM Partner Directory →` link to `IBM_PARTNER_DIRECTORY_URL` (rendered as a secondary button next to the existing CTA).
2. **What Platinum means** — Keep the existing 4-card grid; copy already passes the doc audit.
3. **Practice → product grid** — New. Four rows from `PORTFOLIO_BY_PRACTICE` showing all 21 products. Replaces the current "Specializations" section, which lists withdrawn products (Resilient, generic "IBM Cloud", "Hybrid Cloud" as a practice).
4. **IBM AI Operating Model alignment** — Four-row table from `IBM_AI_OPERATING_MODEL`. Govern / Integrate / Orchestrate / Automate ↔ TechD engagement stage.
5. **Quick Start Advisory Services** — Named offer block from `QUICK_START_ADVISORY`, CTA links to `/services/advisory`.
6. `PageFinalCtaSection`.

## 4. New page — `src/pages/company/DeliveryMethodology.tsx` + route

- Route: `/company/delivery-methodology` added to `src/app/routes.tsx`.
- Nav: append a fourth Company nav item in `src/content/site.ts`.
- Hero uses `PageHero` + `CompanyFigure`, matching the other Company pages.
- Sections:
  1. **Engagement model** — Visual five-stage flow from `ENGAGEMENT_STAGES`.
  2. **IBM Platform Assessment** — Three-column block (Scope / Deliverable / Next step) from `IBM_PLATFORM_ASSESSMENT`.
  3. **Regulated-industry depth** — Four cards from `COMPLIANCE_FRAMEWORKS` (HIPAA, FedRAMP, PCI-DSS, NERC-CIP), one sentence each on what we configure.
  4. **Same practitioners, advisory to delivery** — One-paragraph commitment block, exact wording from `delivery-methodology.md` §5.
  5. `PageFinalCtaSection`.

## 5. Cleanup — `src/pages/company/Customers.tsx`

Walk every `INDUSTRY_GROUPS[*].ids` entry against the live `CUSTOMERS` array in `src/content/site.ts`. Drop names that no longer exist there (Johns Hopkins, J&J, Sony Pictures/Interactive, Comcast/Peacock, DHS, etc. — anything sitting in `public/logos/deprecated/`). Industry groups that end up empty are removed entirely. No new names are added.

## Technical notes

- All four files use existing primitives only: `PageHero`, `SectionMarker`, `SectionHeading`, `Reveal`, `PageFinalCtaSection`, `Layout`, `SEO`, `CompanyFigure`. No new shadcn primitives added.
- All colors via Tailwind tokens (`primary`, `secondary`, `muted-foreground`, `border`). No raw hex.
- "Talk to an expert" CTAs continue to use the standard `btn-glow` Button → `/contact` (per memory `mem://design/talk-to-an-expert-cta`).
- Initials avatar = circular tile, `bg-muted/40`, `text-secondary`, two-letter initials. Pure CSS, no image dependency.
- Verify-on-Partner-Directory link opens in a new tab with `rel="noreferrer"`.
- TypeScript strict; every export typed. No `any`.

## Out of scope (deferred per CLAUDE.md)

- Real headshots (initials placeholder ships now; swap when PM provides photos).
- Confirming whether the "Complimentary Cognos Analytics & Data Warehouse Assessments" offer is still active — the doc says PM must verify before publishing, so it's omitted.
- Any 3D or motion changes — purely a content-and-structure pass.
