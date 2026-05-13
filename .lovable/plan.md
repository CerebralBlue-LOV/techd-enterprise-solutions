# Company section — visual & interaction upgrade

Scope: presentation-only refinements across the four Company pages. No content rewrites, no new data, no new routes. All work uses existing tokens (`primary` cyan, `secondary`, `muted`), Roboto Condensed, `Reveal`, shadcn primitives, and Tailwind. Respects `prefers-reduced-motion`.

## Pages in scope
1. `/company/about`
2. `/company/ibm-partnership`
3. `/company/delivery-methodology`
4. `/company/customers`

---

## 1. About — `src/pages/company/About.tsx`

**Founding story (`#story`)**
- Replace the plain 2×2 facts grid with a stacked "spec card" — thin top border in primary, large value, eyebrow label, hairline divider between rows. Subtle hover lift on each row.
- Add a faint vertical timeline rail to the left of the prose paragraphs (2009 → 2017 → today markers as small pills).

**Practices (`#practices`)**
- Upgrade practice cards to a richer hover state: top-left corner index numeral (01–04) in primary, animated arrow that translates on hover, border + inner glow shift to `primary/40`, subtle scale (1.01) on the card.
- Add a one-line "stack" footer per card listing 2–3 anchor product names pulled from `PORTFOLIO_BY_PRACTICE` (no new content, just re-using existing data).

**Industries / compliance (`#industries`)**
- Convert the 4 framework boxes into a tabbed component (shadcn `Tabs`) with framework name as tab and industry + detail as panel. Keeps the page shorter and adds interaction.
- Below tabs, render the six verticals as a horizontal chip row instead of a paragraph.

**Leadership (`#leadership`)**
- Wrap each leadership card in a shadcn `HoverCard` so hovering the avatar reveals an expanded bio popover (uses existing `bio` + `domains`).
- Card itself gets a subtle gradient ring around the avatar (cyan → transparent) and a hairline divider above the domain chips.

**Methodology preview (`#methodology`)**
- Replace the side card with a horizontal mini-stepper (5 dots connected by a line, each labelled with the stage name). Click → `/company/delivery-methodology`. Reinforces the same-team story visually.

---

## 2. IBM Partnership — `src/pages/company/IBMPartnership.tsx`

**Credential block (`#credential`)**
- Promote to a dark panel using existing `DarkGlowPanel` / `DarkSection` shared component (already used elsewhere). Adds visual contrast and signals "credential" weight.
- Add the existing `IBMPlatinumBadge` component to the left side, "Verify" CTA on the right as `Button` with `btn-glow` outline variant.

**What Platinum means (`#what-platinum`)**
- Add a small numeric indicator (01–04) to each card and a hairline accent bar in primary that grows from 0 → full width on hover.

**Portfolio (`#portfolio`)**
- Make each product chip an interactive `HoverCard`: hover surfaces a 1-line description (we already have product copy in `solutions-extras.ts` / `solutions.ts` — read-only lookup, no new content authored).
- Add a sticky-on-scroll count summary at top of the section ("21 products · 4 practices") rendered as a thin pill bar.

**AI Operating Model (`#operating-model`)**
- Replace flat table with a 4-step horizontal flow (Govern → Integrate → Orchestrate → Automate) using arrow connectors between cards. On `md+` it's horizontal; on mobile it stacks vertically with a left rail.

**Quick Start Advisory (`#quick-start`)**
- Wrap in a subtle gradient backdrop (radial cyan glow at 6–8% opacity, bottom-right). Reuses pattern from `RingsHeroBackdrop` style (decorative only, not a new figure).

---

## 3. Delivery Methodology — `src/pages/company/DeliveryMethodology.tsx`

**Engagement stages (`#stages`)**
- Replace 5-column grid with a vertical zig-zag timeline on `md+`: alternating left/right cards connected by a vertical primary rail with numbered nodes. On mobile, stacks linearly with a left rail.
- Each stage card gets an icon (lucide: `Compass`, `Layout`, `Hammer`, `GraduationCap`, `LifeBuoy`) and the stage number as a large faint background numeral.

**Platform Assessment (`#assessment`)**
- Convert the 3-card layout (Scope / Deliverable / Next) into a shadcn `Accordion` with the Scope panel open by default. More scannable, less wall-of-bullets.

**Compliance (`#compliance`)**
- Cards get a hover state that flips/reveals a back face with the framework's typical evidence artifacts (1 sentence each, written from the existing `detail` text — no new claims).
- Above the grid, add an industry → framework lookup row (small horizontal pills).

**Commitment (`#commitment`)**
- Promote to a full-bleed dark section using `DarkSection`, with the `SAME_PRACTITIONERS_COMMITMENT` quote rendered large with an oversized opening quotation mark in primary at 30% opacity.

---

## 4. Customers — `src/pages/company/Customers.tsx`

**Logo strip (`#logos`)**
- Already covered by `LogoStrip`; add a 3-stat band above it (`{CUSTOMERS.length}+ enterprises`, `15+ years`, `6 verticals`) as a thin border-only row.

**By industry (`#by-industry`)**
- Replace the plain "list of names" cards with cards that render mini logo tiles (greyscale → cyan-tint on hover) using the existing `/public/logos/*.svg` files already wired to each `CUSTOMERS` entry.
- Add a filter chip row at the top (All, Financial Services, Healthcare, …) that filters the visible groups with smooth `fade-in`.

---

## Shared additions

- One small new component `src/components/shared/StatBand.tsx` — a thin border-only row of 2–4 stats with eyebrow + value. Reused on About facts, Customers stat band, and the Partnership credential.
- One small new component `src/components/shared/StepFlow.tsx` — horizontal/vertical numbered flow with connector line. Reused by About methodology preview, Operating Model section, and Engagement Stages.

Both live in `components/shared/`, use existing tokens only, have no business logic.

---

## Out of scope (call out)

- No copy changes to `src/content/about.ts`.
- No new pages or routes.
- No real headshots (initials avatars stay).
- No 3D / `CompanyFigure` changes.
- No dark mode toggle — `DarkSection` is a per-section device only.

## Files touched

- `src/pages/company/About.tsx`
- `src/pages/company/IBMPartnership.tsx`
- `src/pages/company/DeliveryMethodology.tsx`
- `src/pages/company/Customers.tsx`
- `src/components/shared/StatBand.tsx` *(new)*
- `src/components/shared/StepFlow.tsx` *(new)*
