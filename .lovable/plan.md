
## Goal

Tighten the /contact page: replace placeholder copy with real contact details, drop the three "Available at launch" cards, give the map its own titled section, and add vertical rhythm before the "Trusted by leaders" strip.

## Changes

### 1. `src/sections/contact/ContactInfo.tsx` (left column rewrite)

Replace current eyebrow + heading + paragraph + meta line with:

- **Eyebrow:** `Contact`
- **Title (h2):** `Let's talk about your next IBM initiative.`
- **Description (improved from the legacy copy):**
  > Reach out for guidance on IBM AI, data, analytics, security, cloud, and data warehousing — from early scoping through production delivery. Your note routes straight to a senior practitioner, no SDR queue.
- **New `ContactChannels` block below the description** (see component #4) showing:
  - Phone: `888-98-TECHD (83243)` (tel link)
  - General & technical: `info@techd.com` (mailto)
  - Sales: `sales@techd.com` (mailto)
- Keep the IBM Gold / 15+ yrs / Since 2009 meta line at the bottom.

### 2. `src/sections/contact/ContactLocationSection.tsx` (replace cards with titled map)

- Delete the `DETAILS` array, `DetailCard` component, and the `<ul>` grid at the bottom (all three cards: Headquarters / Email / Phone).
- Above the map, add a `SectionHeading` with eyebrow `Visit` and title `Where to find us.` and a short subtitle (`Headquartered in Miami, serving Fortune 500 clients across North America.`).
- Increase top padding so the section breathes: bump `py-16 md:py-20` → `pt-24 md:pt-28 pb-20 md:pb-24` and increase `space-y-10` → `space-y-12`.
- Keep `ContactMap` as-is.

### 3. `src/pages/Contact.tsx` (add spacing before logo strip)

- Currently ends with `<ContactLocationSection />`. The "Trusted by leaders" strip is the global `LogoStrip` rendered elsewhere — verify during implementation; if it's not on /contact today, mount `<LogoStripSection />` (already used on Home) after `<ContactLocationSection />` with a top border + extra `pt-16 md:pt-24` wrapper so it has clear separation.
- If it's already rendered globally, just add a spacer/border before it.

### 4. New reusable component `src/components/shared/ContactChannels.tsx`

Small list component (icon + label + value) consumed by `ContactInfo` and reusable on future pages (e.g., footer, about). Props: `items: { icon, label, value, href }[]`. Uses `Phone`, `Mail` from lucide-react, primary-cyan hover, no card chrome — just a clean stacked list to fit the editorial left column.

### 5. No content/data changes

Phone/emails are hardcoded into `ContactChannels` usage in `ContactInfo` for now (matches how the footer already inlines the phone number). `src/content/site.ts CONTACT` stays untouched — its `status: "pending"` flags only drove the cards we're removing.

## Technical notes

- All colors via existing tokens (`text-primary`, `text-secondary`, `text-muted-foreground`, `border-border`).
- Typography stays Roboto Condensed; reuse `SectionHeading` and `Reveal`.
- No new dependencies.
- No changes to `ContactMap`, `ContactForm`, `ContactHero`.

## Out of scope

- Wiring the form to a backend (still deferred to AWS Lambda).
- Editing `CONTACT` data shape in `site.ts`.
- Changing the global Header/Footer.
