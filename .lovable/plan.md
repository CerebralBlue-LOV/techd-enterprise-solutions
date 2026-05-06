## Goal
Make every section heading on the home page center-aligned so the page reads consistently. Hero stays untouched. FinalCTA is already centered.

## Current state
- `SectionHeading` defaults to `align="left"`.
- `WhyTechDSection` already passes `align="center"`.
- `SolutionsGridSection` and `EngineeredFieldSection` (which renders both the Industries and Featured Case Study headings) currently render left-aligned.
- `FinalCtaSection` uses its own centered `<h2>` — no change needed.
- Hero uses its own custom layout — no change needed.

## Changes
1. `src/sections/home/SolutionsGridSection.tsx` — add `align="center"` to the `SectionHeading`.
2. `src/sections/home/EngineeredFieldSection.tsx` — add `align="center"` to the Industries `SectionHeading` (and the featured case study heading inside the same section, so the whole field is consistent).
3. No changes to `HeroSection`, `LogoStripSection`, `WhyTechDSection` (already centered), or `FinalCtaSection` (already centered).

## Out of scope
- Centering body copy or card content — only the section title/eyebrow/subtitle blocks.
- Hero layout.
- Other pages (Solutions, Industries, Services, etc.) — only the home page sections, per the request.
