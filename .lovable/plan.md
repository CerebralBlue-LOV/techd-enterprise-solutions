## Restructure the Contact working area

Currently the working area is a two-column split with the left rail holding "Where to find us", "What happens next", and the IBM trust block, and the right column holding the form. You want the section under the stat banner to feel more editorial: a piece of writing on the left, the form on the right, and the location + process info pulled out into their own band underneath.

### 1. Top split — "Words" left / Form right

Replace the current `lg:grid-cols-[0.9fr_1.3fr]` layout with a balanced two-column block (`lg:grid-cols-2`, generous gap).

**Left column — editorial intro** (sticky on desktop):
- Eyebrow: `Why this form is short`
- Display headline (≈ `text-4xl md:text-5xl`, bold, secondary): something like *"Tell us what you're trying to ship. We'll route it to the right principal."*
- 2 short paragraphs (`font-light text-muted-foreground`):
  - One on the no‑SDR, no‑discovery‑relay promise.
  - One on what a "good" first message looks like — outcome, blocker, success criteria.
- Small inline note with `IBMPlatinumBadge` + one line: *21 IBM products, 6 regulated industries — the architect on your first call is the one who'd lead the work.*

**Right column — form card**: keep the existing `Form` + success state exactly as-is (no field, validation, or submit changes).

### 2. New band below — Location + Next steps

A new full-width section under the form, visually distinct (light `bg-muted/30` + top/bottom border, similar to the stat banner) so it reads as supporting info, not part of the form.

Two columns inside `container-page` (`md:grid-cols-2`, gap 12–16):

- **Where to find us** (left)
  - Eyebrow + small heading
  - The existing `MapPin` / `Mail` / `Phone` list, same content
- **What happens next** (right)
  - Eyebrow + small heading
  - Existing `StepFlow orientation="vertical"` with the 3 `NEXT_STEPS`

Both wrapped in `Reveal` with a small stagger.

### 3. Cleanup

- Remove the old left-rail `<aside>` block.
- `LogoStrip` stays at the bottom, unchanged.
- No content rewording beyond the new editorial intro on the left.
- No changes to hero, stat banner, schema, validation, or submit handler.

### Technical notes

- File touched: `src/pages/Contact.tsx` only.
- Imports: `IBMPlatinumBadge`, `MapPin`, `Mail`, `Phone`, `StepFlow` stay (now used in the new band). No new dependencies.
- Tokens only — `bg-muted/30`, `border-border`, `text-secondary`, `text-primary`, `text-muted-foreground`. No raw hex.
- Sticky behavior on the left intro: `lg:sticky lg:top-24` so it holds while the form scrolls.
- Mobile: stacks naturally (intro → form → location/steps band → logos).
