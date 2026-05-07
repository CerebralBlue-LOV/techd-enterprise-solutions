# Brand Guidelines Summary

This is an engineering-oriented summary of TechD's brand system as implemented in the site. For visual design decisions, this is the reference. Any changes to colors, fonts, or aesthetic rules need to be discussed — they affect every component on the site.

---

## Color palette

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#00B3E3` | CTAs, accents, link hovers, focus rings, active states |
| `secondary` | `#56565A` | Body text, headings, structural elements |
| `muted` / `accent` | `#A7A5A8` | Borders, dividers, secondary text |
| `background` | `#FFFFFF` | Page background |

**Rule:** All colors are referenced via Tailwind design tokens (e.g. `bg-primary`, `text-foreground`), never as raw hex values in code. If a design requires a color not in this palette, it must be discussed before adding.

---

## Typography

**Font family:** Roboto Condensed (Google Fonts) — used exclusively across the site.

| Weight | Usage |
|---|---|
| `font-bold` (700) | Headings, section titles, CTAs |
| `font-normal` (400) | Subheadings, nav items, labels |
| `font-light` (300) | Body text, descriptions |

No other typefaces are used. All type sizes use Tailwind's default scale.

---

## Aesthetic direction

The site's aesthetic is modeled after **Stripe / Linear / Vercel / Anthropic**: quiet, confident, typography-led, generous whitespace. Not flashy or Dribbble-style.

### Interaction patterns

| Element | Behavior |
|---|---|
| Scroll reveals | 16px translate-Y + fade-in, 500ms duration |
| Primary CTA buttons | 200ms color transition on hover + 1–2px upward lift |
| Cards | Border shifts to primary cyan (`#00B3E3`) on hover, subtle shadow lift |
| Hero | Slow ambient gradient drift, 15–20s loop |
| Logo strip | Gentle marquee, pauses on hover, 45s loop |
| Hero cards | Float animation, 7s per card with staggered delays |

### What we never do

- No parallax effects
- No scroll-jacking
- No typewriter text animations
- No animated cursors
- No full-page transitions
- Always respect `prefers-reduced-motion` (animations disabled for users who've set this in their OS)

---

## Component library

The site uses **shadcn/ui** (built on Radix UI primitives) for all UI components: buttons, cards, inputs, dialogs, etc. These components are in `src/components/ui/` and are not customized directly — they pick up brand colors automatically via Tailwind tokens.

Custom components (Header, Footer, Hero, etc.) live in `src/components/`.

---

## Logo

**Current state:** Typographic wordmark placeholder. The actual TechD logo SVG (color version + white reversed version) has not been provided yet.

**Blocker:** Logo files are needed from the product owner before the site can launch. This is flagged as a dependency in the Project Overview page.

bump
