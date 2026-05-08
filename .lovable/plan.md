## Goal

Replace the 6 placeholder Industry pages with real, fully-built landing pages — mirroring the Solutions practice template (editorial typographic hero with the bulge-grid effect, then sectioned content). Source content from `docs/audit/INDUSTRIES-AUDIT.md` and existing `src/content/industries.ts`, plus cross-links into the matching Solutions/Products.

Pages in scope: `/industries/healthcare`, `/media-entertainment`, `/insurance`, `/energy-utilities`, `/higher-education`, `/public-sector`.

## Page template (same shape on all 6)

```text
1. Hero (editorial, ~50vh, bulge-grid backdrop, no image, no CTAs)
   - Eyebrow: Industries / <name>
   - H1: industry.outcome (short headline form)
   - Lede: 1 paragraph
   - Quick-jump anchors: Why TechD · Clients · Solutions in this industry · Approach

2. Why TechD for <industry>  (#why)
   - 4 cards: "what you get" — regulation fluency, named experience, IBM stack fit, delivery model

3. Clients we serve  (#clients)
   - Logo/name strip of confirmed clients from the audit (verified only)
   - Small caption per client (1 line, factual)
   - "Unverified" names from the audit are dropped until TechD confirms

4. Solutions in this industry  (#solutions)
   - 2–4 practice cards linking to /solutions/<practice>
   - One-line proof per card: how that practice has shipped here
   - Reuses the IndustriesServedSection inverse logic — sourced from
     PRACTICE_EXTRAS in solutions-extras.ts (already maps practice → industry proof)

5. Approach  (#approach)
   - Same 4-step Discover / Architect / Deliver / Operate model used on practice pages
   - Reused component

6. Outcomes / proof strip
   - 3 stat tiles where defensible (e.g. "5 named health systems",
     "6+ healthcare webinars delivered"). Skip on weak verticals (Public Sector).

7. CTA
   - "Talk to an expert about <industry>" — single button to /contact
```

## Content rules (driven by the audit)

- **Use only verified clients** from the audit table. Drop unverified names: Quest Diagnostics, Affinion, Villanova, Smith College, Temple (Higher Ed), VCU Health.
- **Healthcare** absorbs J&J as Life Sciences (per audit recommendation).
- **Public Sector** ships the same template but with a more cautious tone and no stats strip — flagged by the audit as the weakest vertical.
- No fabricated case studies, no invented metrics. Stat tiles only when the audit supports them.
- All copy stays in `src/content/` so marketing can edit it without touching components.

## Files to create

```text
src/content/industries-extras.ts          # per-industry whyPoints, clients[],
                                          # related practice ids, optional stats
src/pages/industries/_IndustryPage.tsx    # shared composition (mirrors _PracticePage)
src/sections/industries/
  IndustryHeroSection.tsx                 # reuses bulge-grid backdrop
  WhyIndustrySection.tsx
  IndustryClientsSection.tsx              # client strip + captions
  SolutionsForIndustrySection.tsx         # practice cards filtered by industry
  IndustryApproachSection.tsx             # thin wrapper around shared approach
  IndustryOutcomesSection.tsx
  IndustryCtaSection.tsx
```

## Files to modify

```text
src/content/industries.ts                 # clean unverified clients, add
                                          # short H1 "outcome" headlines if missing
src/pages/industries/Healthcare.tsx
src/pages/industries/MediaEntertainment.tsx
src/pages/industries/Insurance.tsx
src/pages/industries/EnergyUtilities.tsx
src/pages/industries/HigherEducation.tsx
src/pages/industries/PublicSector.tsx
  → each becomes: <IndustryPage industryId="..." />
```

## Reuse from Solutions work

- `PracticeHeroBackdrop.tsx` (bulge grid) — extract to `src/shared/BulgeGridBackdrop.tsx` so both Industry and Solutions heroes use it.
- `ApproachSection` — already generic enough; reuse directly with industry-flavored copy passed in.
- `PRACTICE_EXTRAS[*].industries` — already maps practices to industries. The Industry page reverses this lookup to populate "Solutions in this industry."

## Out of scope

- New case studies (deferred — audit notes the legacy ones return 500).
- Industry-specific blog/resource feeds.
- Per-industry color theming (kept neutral, cyan accent shared).
- Verifying the unverified client names — those stay dropped until TechD confirms.

## Open questions for you

1. **Public Sector**: keep as a full page for launch, or fold into a "we also work with" mention elsewhere? Audit calls it the weakest vertical.
2. **Higher Ed clients**: ship with just Princeton + VCU (the only verified names), or wait until TechD confirms Villanova/Smith/Temple?
3. **Stat tiles**: OK to use audit-derived stats like "5 named health systems" / "6+ healthcare webinars delivered", or keep proof purely qualitative (named clients only, no counts)?