# Refresh PracticeCtaSection ("Let's build a plan")

Scope: visual + copy only. Single file: `src/sections/solutions/PracticeCtaSection.tsx`. Plus one memory entry to make `btn-glow` the standard for "Talk to an expert" CTAs.

## 1. New copy

Replace the current headline/eyebrow/paragraph. Proposed (open to edits before build):

- **Eyebrow:** keep the practice name (`{practice.name}`) — it grounds the CTA per-page.
- **Headline:** `Ready when you are.` (shorter, more confident than "Let's build a plan")
- **Sub:** `One conversation with a senior IBM-certified architect. No relay, no junior swap after signature.`

If you'd rather use different wording, tell me before implement and I'll swap it in.

## 2. Reduce elements

Remove from the section:
- `IBMPlatinumBadge` block (right column)
- 3-up `STATS` grid (F500 / 15+ yrs / Platinum)
- The 12-column split layout

Keep only: eyebrow, headline, sub, two CTAs — centered, single column, generous whitespace. The trust signals already live elsewhere on the page (hero, Why, products grid), so the close doesn't need to repeat them.

## 3. Buttons

- **Primary "Talk to an expert":** swap the custom `bg-primary` link for the shared `btn-glow` treatment used in the header (`<Button asChild className="btn-glow"><Link to="/contact">Talk to an expert</Link></Button>`). Same animated cyan glow, same hover behavior — site-wide consistency.
- **Secondary "See who we've shipped for":** wrap in a bordered ghost button — `border border-background/25 hover:border-background hover:bg-background/5`, same size as primary, keep the arrow icon and its hover translate.

## 4. Background

Replace the single static `bg-primary/20 blur-3xl` glow + faint SVG grid with the same animated gradient system used inside the Products grid hero card:
- Base: `linear-gradient(160deg, hsl(var(--secondary)) 0%, hsl(var(--secondary)/0.92) 60%, hsl(220 15% 12%) 100%)`
- Three drifting cyan radial blobs: `animate-blob-a`, `animate-blob-b`, `animate-blob-c`
- A slow `animate-shimmer-rotate` conic sweep at low opacity
- `ring-1 ring-white/10` and the existing rounded-2xl container, with `motion-reduce:[&_*]:!animate-none`

All keyframes already exist in `tailwind.config.ts` — no new tokens.

## 5. Memory

Add a memory file documenting `btn-glow` as the standard treatment for the "Talk to an expert" CTA across the site, so future sections reuse it instead of re-styling.

---

## Files touched

- `src/sections/solutions/PracticeCtaSection.tsx` — rewrite
- `mem://design/talk-to-an-expert-cta` — new memory + index update

## Out of scope

No content data changes, no new components, no router changes, no new dependencies.
