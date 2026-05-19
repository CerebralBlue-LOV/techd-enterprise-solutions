## Scope
File: `src/pages/company/About.tsx` — "Regulated-industry depth" section only.

## Changes

1. **Section heading reorder** — Title currently reads "Seven verticals, four compliance frameworks" but verticals appear after frameworks. Swap to "Four compliance frameworks, seven verticals" so the title matches the visual order.

2. **Compliance cards** — Remove the small primary-blue framework label (`<p className="text-xs ... text-primary">{f.framework}</p>`) above the industry title, since the big faint background numeral already shows the framework name. Tighten card padding from `p-6` to `p-5` and reduce vertical rhythm (`mt-2`/`mt-3` → `mt-1.5`/`mt-2`) to shorten the cards.

3. **Verticals list** — Currently a flat 2/3-col grid of plain pills. Improvements:
   - Wrap in `Reveal` with staggered per-item `delay` (already wrapped at group level; add per-item stagger via individual `Reveal` wrappers like the compliance cards).
   - Add hover affordance consistent with the rest of the page: border shifts to `primary/40`, subtle lift, primary-tinted number on hover.
   - Reorder verticals to group by regulatory affinity so the order feels intentional rather than arbitrary. Proposed order (mirrors framework order: HIPAA → FedRAMP → PCI-DSS → NERC-CIP, then remaining):
     1. Healthcare & Life Sciences
     2. Public Sector
     3. Financial Services & Insurance
     4. Energy & Utilities
     5. Higher Education & Research
     6. Manufacturing & Industrials
     7. Media & Entertainment
   - Bump label size slightly (`text-xs` → `text-sm`) and number weight for legibility.

## Out of scope
- No content/copy edits beyond the heading swap.
- No changes to `src/content/about.ts` (reorder happens inline in `VERTICALS` constant inside About.tsx where it already lives).
- No changes to other sections.
