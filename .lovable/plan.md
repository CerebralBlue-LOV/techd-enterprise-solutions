# Rebrand: IBM Platinum → IBM Gold

TechD's IBM Partner Plus tier is changing. Every public mention of "Platinum" needs to become "Gold" — copy, metadata, components, content modules, and project memory. This is a content/wording pass; no routes, no features, no design changes.

## Scope

**In scope**
- All visible copy on the live site (pages, sections, components, badges, SEO meta).
- All content data modules under `src/content/`.
- The `IBMPlatinumBadge` component (rename + label change).
- `index.html` meta tags.
- Project memory (`mem://index.md`) and `CLAUDE.md` references.
- Tier-specific claims that only hold at Platinum (see "Claims to soften" below).

**Out of scope (won't touch)**
- `docs/audit/**` — historical crawl of the old site, should stay as-is for reference.
- `docs/revisions/**` — frozen revision notes; we can flag but not rewrite history.
- Route paths (`/company/ibm-partnership` stays — it's the partnership page, tier-agnostic).
- Any IBM logo assets (no Platinum lockup in `src/assets/`).
- Visual design, layout, animations.

## Files to change

### 1. Live copy — components & pages
- `index.html` — 2 meta descriptions
- `src/pages/Home.tsx` — SEO title + description
- `src/pages/company/IBMPartnership.tsx` — hero, credential panel, "What Platinum means" section (rename to "What Gold means"), section ids/labels, final CTA, `WHAT_PLATINUM_MEANS` constant rename
- `src/pages/company/About.tsx` — SEO description, hero headline, body copy
- `src/pages/SectionLab.tsx` — lab string
- `src/components/layout/Footer.tsx` — "IBM Platinum Business Partner" line + badge import
- `src/sections/home/HeroSection.tsx`, `src/sections/home/WhyTechDSection.tsx` — any tier mentions
- `src/sections/contact/ContactInfo.tsx` — tier mention
- `src/sections/industries/IndustryFederalCredentialsSection.tsx` — credential line

### 2. Content data modules
- `src/content/site.ts` — `ibmPlatinumSince` → `ibmGoldSince` (or neutral `ibmPartnerSince`); nav description
- `src/content/about.ts` — stat `{ value: "Platinum", label: "IBM Partner Plus tier" }` → `Gold`
- `src/content/solutions.ts` — ~15 stat values + body copy mentions
- `src/content/solutions-extras.ts` — 2 stat values
- `src/content/services-extras.ts` — 4 stat values + several body copy mentions (including "Platinum escalation path" section)

### 3. Component rename
- `src/components/shared/IBMPlatinumBadge.tsx` → `IBMGoldBadge.tsx`
  - Rename file, exported component, default export
  - Update label text ("Platinum" → "Gold", "Platinum since 2009" → "Gold since 2009" or "IBM partner since 2009")
  - Update `aria-label`s
  - Update all importers: `Footer.tsx`, any other consumers

### 4. Memory & internal docs
- `mem://index.md` — Core line currently says "IBM Platinum partner"
- `CLAUDE.md` — project description line
- `docs/PROJECT-SCOPE.md` — tier mention
- Leave `docs/audit/**` and `docs/revisions/**` untouched (historical).

## Claims to soften (important)

Several content blocks make claims that are **only true at Platinum tier** under IBM Partner Plus. A blind find/replace would leave us asserting Platinum-only benefits while calling ourselves Gold. These need rewording, not just relabeling:

1. **Early/pre-GA access** — `solutions.ts:124`, `solutions.ts:244`, `solutions.ts:457` ("test new Cognos capabilities in our lab before your IT team sees the release notes"), `IBMPartnership.tsx` "Early product access" card.
2. **Direct IBM engineering escalation** — `solutions.ts:163`, `services-extras.ts:279` ("Platinum escalation path" entire item), `IBMPartnership.tsx` "Direct engineering access" card.
3. **Technical roadmap briefings** — `solutions.ts:163`.
4. **"Deepest certifications" / "highest tier"** framing — `IBMPartnership.tsx` hero + "What Platinum means" cards, About hero ("highest commercial tier").

**Recommended replacement angle for Gold:** lead with certified-practitioner depth, 15+ years of continuous IBM delivery, cross-product integration, and regulated-industry track record. Drop pre-GA / early-access / direct-escalation claims unless we can confirm they apply at Gold.

## Naming question (needs your call)

Pick one and I'll apply it consistently:
- **A. "IBM Gold Business Partner"** — direct swap, matches IBM Partner Plus tier naming.
- **B. "IBM Business Partner (Gold tier)"** — slightly softer, decouples brand line from tier.
- **C. Drop tier from brand line entirely** — "IBM Business Partner since 2009" — tier only mentioned on the partnership page.

Also: should `ibmPlatinumSince: 2009` become `ibmGoldSince: 2009` (implies Gold since 2009, which may not be accurate) or `ibmPartnerSince: 2009` (tier-neutral, safer)?

## Execution order

1. Confirm naming choice (A/B/C) and the `Since 2009` framing.
2. Rename component file + update all importers in one pass.
3. Sweep `src/content/` modules (data + body copy).
4. Sweep pages + sections + `index.html`.
5. Rewrite the 4 tier-specific claim clusters above.
6. Update `mem://index.md`, `CLAUDE.md`, `docs/PROJECT-SCOPE.md`.
7. Final `rg -i platinum` to verify zero residual hits outside `docs/audit/` and `docs/revisions/`.

## Out-of-scope reminders

- No route changes. `/company/ibm-partnership` URL stays.
- No logo asset swaps (none found that are tier-specific).
- No design tweaks — wording only.
