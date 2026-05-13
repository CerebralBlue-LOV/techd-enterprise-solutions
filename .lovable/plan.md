## Goal

Rebuild the four `/services/*` pages (Advisory, Implementation, Managed Services, Training) so each one shows **what TechD actually does for that service** — concrete offerings, scope, methodology, IBM product coverage — instead of the current generic "Why TechD / How we work / Solution practices" template that every service page reuses today.

Source of truth: `docs/revisions/services/{advisory,implementation,managed-services,training}.md`. These are already verified, voice-compliant, IBM-2026-aligned. The job is to translate them into content + page sections.

## Problem with the current pages

All four services pages use the same six sections from `_ServicePage.tsx`:

```text
Hero → Why → Offerings → Approach → Practices → CTA
```

- **Why / Approach / Practices** are largely interchangeable across the four services and crowd out service-specific substance.
- **Offerings** lists named engagements but does not show **product coverage**, **deliverables of those engagements**, or **the methodology specific to that service** (e.g., the four-phase delivery for Implementation, SLA architecture for Managed, role-based tracks for Training, the one-day TechD Platform Assessment for Advisory).
- "Practices" repeats Solutions content the visitor can already see at `/solutions/*`.
- Legacy product names still leak into a few places (e.g. `IBM DB2`, `Watson Studio`-era language in `services-extras.ts`).

## Proposed page architecture (per service)

Each service page will share a backbone but expose **service-specific blocks** between Hero and CTA. The backbone:

```text
Hero
  → Why TechD (4 points, service-specific)
  → Service Spotlight   (NEW, per-service hero block — see below)
  → Offerings           (named, scoped, bookable engagements)
  → Methodology         (per-service: phases / SLA model / role tracks / assessment scope)
  → Product Coverage    (NEW, 4-row grid: AI&Gen / Data&Analytics / Auto&FinOps / Sec&Comp)
  → Cross-links         (lighter than today's "Practices" — small linked tiles to /solutions and the other 3 services)
  → CTA
```

The `Practices` section (full FlipCards repeating Solutions content) is **removed** in favor of the lighter Cross-links block.

### Per-service "Spotlight" + "Methodology" content

| Service | Spotlight block | Methodology block |
|---|---|---|
| Advisory | **TechD IBM Platform Assessment** — named one-day engagement with scope table (what we review / deliver / what's next) | **IBM AI Operating Model framing** (govern · integrate · orchestrate · automate) used to structure engagements |
| Implementation | **"We build what we design"** statement + **Integration scope** (named systems: Salesforce, ServiceNow, ADF, Informatica, ERP) | **Four-phase delivery**: Design → Build → Validate → Stabilize (30-day post-go-live) |
| Managed Services | **SLA Architecture** block contrasting outcome SLAs (pipeline availability, report freshness, model inference uptime, alert triage time) vs. ticket-count SLAs | **Onboarding & transition** (discovery → hyper-care → steady state) + **Agentic AI Operations** (emerging, watsonx Orchestrate) |
| Training | **Role-based course tracks**: Executive Briefings · Architect Bootcamps · Engineering Labs | **Delivery format selector** (online · ILT online · ILT on-site · custom) + **Custom training engagement** description |

### Product Coverage grid (shared component, content varies per service)

A 4-row × 2-column grid: **IBM Practice / What we {assess|implement|manage|train on}**. Rows are the four confirmed practice areas; row content is pulled from each revision doc's Section 3.

This is the single biggest content gap on the live pages today and the most useful artifact for a procurement-stage architect.

## File-level changes

**New content files**
- `src/content/services-extras.ts` — extend `ServiceExtras` with:
  - `spotlight: { title, lede, bullets[] }` (per-service: Platform Assessment / We Build What We Design / SLA Architecture / Role-Based Tracks)
  - `methodology: { title, items: { name, body }[] }` (per-service: AI Operating Model / 4-phase delivery / Onboarding+Agentic / Delivery formats)
  - `productCoverage: { practice, items: string[] }[]` (4 rows, content per service from revision doc Section 3)
  - `crossLinks: { kind: 'solution'|'service', id, label, blurb }[]`
- Rewrite all four entries (`advisory`, `implementation`, `managed`, `training`) using the verified copy from the four revision docs. Strip every `IBM DB2` → `IBM Db2`, drop watsonx.governance, BigInsights, Streams, Premier/Gold tier, etc. (the docs already enumerate every replacement).

**New section components** (`src/sections/services/`)
- `ServiceSpotlightSection.tsx` — renders the per-service hero block (title + lede + bulleted scope/claims).
- `ServiceMethodologySection.tsx` — numbered/labeled steps (replaces today's generic Approach for service pages; Approach component is kept but reused by the new methodology data).
- `ServiceProductCoverageSection.tsx` — 4-row grid (AI & Generative / Data & Analytics / Automation & FinOps / Security & Compliance), each row listing the products covered for *this* service.
- `ServiceCrossLinksSection.tsx` — compact tile row linking to `/solutions/*` and the other three services.

**Edited files**
- `src/pages/services/_ServicePage.tsx` — replace `ServicePracticesSection` with the new sequence: Spotlight → Offerings → Methodology → Product Coverage → Cross-links → CTA.
- `src/sections/services/ServiceHeroSection.tsx` — update anchors to match new section IDs (`#spotlight`, `#offerings`, `#methodology`, `#coverage`).
- `src/content/services.ts` — no copy changes (the 4 entries are already voice-compliant per the revision docs); only adjust `highlights` for Advisory if the spotlight reframes them.

**Deleted (or quietly retired)**
- `src/sections/services/ServicePracticesSection.tsx` — replaced by lighter Cross-links section. Kept on disk if other code references it; otherwise removed.

## Out of scope for this plan

- No changes to Solutions, Industries, Resources pages.
- No new routes; the four service URLs stay identical.
- No new dependencies, no design-system color/font changes.
- No backend, no forms — "Talk to an expert" CTA continues to point at `/contact`.

## Open question (one)

The revision docs propose an **IBM Platinum Partner credential block** on Advisory, Managed, and Training. The site already shows Platinum credentials in the Header/Footer/Why blocks. **Confirm**: do you want a dedicated credential callout *on each service page*, or is keeping it global enough? Default if you don't say: skip the dedicated callout and rely on the existing global treatment.
