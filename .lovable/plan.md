# Solutions Practice Pages — Build Plan

Build all 5 practice landing pages (`/solutions/ai-generative`, `/data-analytics`, `/automation-finops`, `/security-compliance`, `/hybrid-cloud`) with a shared, sectioned template. Reuse existing data in `src/content/solutions.ts`; add only practice-level extras.

## Page template (same for all 5 practices)

```text
1. PracticeHero          — eyebrow ("Solutions"), H1 = practice.outcome, lede = practice.description
                            CTAs: "Talk to an expert" + "See products"
                            Right side: practice motif (existing PlexusMotif from home grid)
2. WhyPracticeSection    — 3-4 value props (icon + title + 1-line). New copy.
3. ProductsGridSection   — Cards for every product in practice.products.
                            Reuses existing card pattern from PracticesListSection.
                            Internal products link to detail pages, external opens in new tab.
4. IndustriesServedSection — 2-4 chips with one-line client proof per industry.
                              Maps practice -> industries via new lookup table.
5. ApproachSection        — 3-4 step engagement methodology (Discover -> Architect -> Deliver -> Operate).
                              Same steps reused across all 5 practices, with practice-specific verb tweaks.
6. OutcomesSection        — Practice pitch (practice.pitch) + 1-2 stat callouts ("15+ yrs Cognos", etc.).
                              No fake case studies. Real numbers only where verifiable.
7. PracticeCtaSection     — Final CTA band: "Ready to ship [outcome]?" + Talk-to-expert button.
```

All sections live under `src/sections/solutions/<Section>.tsx` and accept the practice as a prop. Each `pages/solutions/<Practice>.tsx` becomes a thin composition.

## New content additions (small)

A new file `src/content/solutions-extras.ts` keyed by practice id with:

```ts
type PracticeExtras = {
  whyPoints: { title: string; body: string }[];   // 3-4 per practice
  industries: { id: IndustryId; proof: string }[]; // 2-4 per practice, proof is 1 line
  approach: { step: string; detail: string }[];    // 3-4 steps
  stats?: { value: string; label: string }[];      // 1-2 verifiable stats
};
```

Practice-to-industry map (recommended):

| Practice | Industries |
|---|---|
| AI & Generative | Healthcare, Insurance, Public Sector, Media |
| Data & Analytics | Healthcare, Higher Education, Media, Insurance |
| Automation & FinOps | Insurance, Energy & Utilities, Public Sector |
| Security & Compliance | Healthcare, Public Sector, Insurance, Energy |
| Hybrid Cloud & Infrastructure | Healthcare, Energy & Utilities, Public Sector |

Industry proof lines pulled from `INDUSTRIES.clients` + `INDUSTRIES.examples` already in `src/content/industries.ts` — no fabrication.

## Reused / removed

- **Reuse:** `PlexusMotif` (per-practice variant), product card markup from `PracticesListSection`, `Reveal`, `SectionHeading`, `GeometricAccent`, `SectionMarker`.
- **Remove after build:** `PracticesListSection.tsx` and `SolutionsHeroSection.tsx` (no longer reachable since `/solutions` parent route was removed).
- **Replace:** the placeholder body in each `src/pages/solutions/*.tsx` (currently using `_PlaceholderPage`).

## Recommendations

- **Practice-page H1 = the outcome line, not the practice name.** Outcome reads as a buyer promise ("Ship trustworthy gen AI...") and the practice name lives in the eyebrow. Stronger than "AI & Generative Solutions" as the H1.
- **Skip "Why this practice" if you want to launch faster** — it's the only fully-new copy section. Everything else reuses or maps existing data. Cutting it lets us ship the same day. *(Recommend keeping it though — it's the section that justifies why a buyer should care.)*
- **Don't invent stats.** Only reuse claims already in the codebase ("15+ years Cognos", "IBM Platinum", etc.). Anything else gets dropped.
- **Match section styling to the home page.** Don't introduce a new design language for these pages.

## Out of scope

- Product detail page redesign (already exists at `/solutions/:practice/:product`).
- New case studies / testimonials (need real source content).
- Interactive demos, ROI calculators, comparison tables.
- About / Services / Industries / Resources child pages — those have their own plans.
