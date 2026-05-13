# Contact page — visual & UX upgrade

Goal: turn `/contact` from a plain two‑column form into the most polished page on the site — the moment a CIO decides to reach out. Quiet, confident, typography‑led (Stripe/Linear feel), still on brand tokens only.

## Scope

Presentation-only refinements to `src/pages/Contact.tsx` plus 1–2 small shared pieces. No backend changes (form still console‑logs + toasts), no new routes, no new colors outside `primary / secondary / muted / background`, Roboto Condensed only, respects `prefers-reduced-motion`.

## Sections (top → bottom)

1. **Hero band** — full‑bleed, uses `RingsHeroBackdrop` (already in repo) behind a tight headline.
   - Eyebrow: `CONTACT`
   - H1: "Talk to an expert."
   - Subtitle: existing copy ("No SDR queue…").
   - Right side: a small `StatBand` (3 stats: e.g. "1 business day response", "IBM Platinum since 2019", "Senior architect, first call").

2. **Two-column working area** (the form is the hero of the page)
   - **Left rail (sticky on lg+):**
     - "Where to find us" — Miami, FL + email/phone placeholders, each on its own row with a thin divider.
     - "What happens next" — 3 numbered steps using `StepFlow` vertical (Submit → Routed to a principal → 30‑min working call).
     - Small trust block: IBM Platinum badge (`IBMPlatinumBadge`) + line "21 IBM products. 6 regulated industries."
   - **Right column (form card):**
     - Wrap form in a `DarkGlowPanel` `intensity="soft"` style? **No** — keep the form on light surface for legibility, but lift it: `rounded-2xl border bg-background shadow-[0_1px_0_hsl(var(--border))] ring-1 ring-border/60`, generous padding, focus rings in `primary`.
     - Field grouping with subtle section labels ("About you", "About the project").
     - Replace plain `Select` for "Area of interest" with a chip‑style toggle row (uses existing `ToggleGroup`) — one tap, no dropdown.
     - Add an optional "Timeline" chip row (Now / This quarter / Exploring) — purely informational, included in payload.
     - Submit button: full‑width on mobile, right‑aligned `btn-glow` on desktop with arrow icon, matches site CTA standard.
     - Inline success state: on submit, swap the form for a calm confirmation panel ("Thanks — a principal will be in touch within one business day.") with a "Back to site" link. (Still no backend.)

3. **Closing trust strip** — thin row above footer:
   - Left: "Trusted by Fortune 500 leaders." Right: muted `LogoStrip` (reuse existing component, slowed to 60s, grayscale → color on hover).

4. **No final CTA panel** on this page — it would be redundant; the form *is* the CTA.

## Interaction & motion

- `Reveal` on each section (existing 16px/500ms pattern).
- Form fields: focus ring transitions to `primary` over 150ms; labels stay static (no float labels — keep readable).
- Submit button: 1px lift on hover, glow already provided by `btn-glow`.
- Success state: cross‑fade swap inside the card, no layout jump.
- Sticky left rail uses `position: sticky; top: 6rem` on `lg+` only.

## Accessibility

- Maintain semantic order, visible focus rings, `aria-live="polite"` on the success panel, `aria-required` on required inputs, error messages already wired via `FormMessage`.
- Honor `prefers-reduced-motion` for the rings backdrop and reveals (existing components already do).

## Files

- **Edit:** `src/pages/Contact.tsx` (full rewrite of layout, same schema + submit handler).
- **Reuse, no edits:** `RingsHeroBackdrop`, `StatBand`, `StepFlow`, `IBMPlatinumBadge`, `LogoStrip`, `Reveal`, `SectionHeading`, `SectionMarker`, all `components/ui/*`.
- **Possibly add (only if needed for the chip groups):** nothing new — `ToggleGroup` from shadcn is already in the repo.

## Out of scope

- No real form backend / Lambda wiring.
- No copy rewrites beyond the small additions above (stat labels, step labels, section labels).
- No new colors, fonts, or 3D scenes.
- No changes to header/footer.

## Open question (one)

For the "What happens next" 3‑step list, OK to use these labels?
1. You submit the form
2. A senior principal reviews it the same day
3. We schedule a 30‑minute working call within one business day
