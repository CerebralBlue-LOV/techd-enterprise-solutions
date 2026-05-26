# Phase 3 — Per-page copy rewrites for SEO

Apply the recommendations in `docs/SEO-KEYWORD-MAP.md` to the live site. **Surgical edits only**: `<SEO>` props, hero H1, hero lede, and the first body paragraph on each page. No layout, no component, no design changes.

## Scope of edit per page

For every page in scope:

1. **`<SEO>` props** — `title`, `description`, `canonical`, and (where useful) `jsonLd`. Lengths enforced: title ≤60 chars, description ≤160 chars.
2. **Hero H1** — lead with the primary keyword phrasing (still natural English; voice rules in `CLAUDE.md` apply — no "world-class", no "best-in-class").
3. **Hero lede / subhead** — one sentence under ~25 words, includes the keyword + a concrete differentiator.
4. **First body paragraph** of the page's primary section — reinforces the keyword cluster naturally.

Nothing else moves. Bullets, stats, images, CTAs, components — untouched.

## Where the edits actually land

Most pages share template wrappers, so the real edits land in **content modules**, not the page files:

- Solutions → `src/content/solutions.ts`, `src/content/solutions-extras.ts`, rendered via `pages/solutions/_PracticePage.tsx`
- Services → `src/content/services.ts`, rendered via `pages/services/_ServicePage.tsx`
- Industries → `src/content/industries.ts`, rendered via `pages/industries/_IndustryPage.tsx`
- Home → `pages/Home.tsx` + `sections/home/HeroSection.tsx`
- Contact, Company pages, Resources index, NotFound → page files directly
- Case studies, blog posts, webinars, events → `src/content/resources.ts` (titles only; bodies are out of scope this phase)

I'll read the relevant content files before each batch to land edits in the right shape.

## Execution order (six batches, one user review between each)

Each batch ships in a single response, you review, then I move to the next.

1. **Batch 1 — Top of funnel** (`/`, `/contact`)
2. **Batch 2 — Solutions** (5 practice pages)
3. **Batch 3 — Industries** (7 pages, including legacy `financial-services`)
4. **Batch 4 — Services** (4 pages)
5. **Batch 5 — Company** (`/company/about`, `/company/ibm-partnership`, `/company/delivery-methodology`)
6. **Batch 6 — Resources** (4 hub index pages + recommended titles on 7 case studies, 9 blog posts, 7 webinars, 5 events)

## Hard constraints

- Voice rules from `CLAUDE.md` are non-negotiable (no "world-class", "cutting-edge", "robust", "powerful", "industry-leading"; no passive voice in delivery claims; practitioner-to-practitioner).
- IBM tier rule: "IBM Gold Business Partner" everywhere. Never "Platinum" except the single approved historical line on `/company/ibm-partnership`.
- "Talk to an expert" CTA stays exactly as it is — Phase 3 doesn't touch CTAs.
- No new components, no new dependencies.
- No edits to `src/components/ui/`.

## What this phase does NOT touch

- Page layout, sections, components, or visual design
- Bullets, stats, capability lists, case-study bodies
- OG images (that's Phase 4)
- Redirects from legacy URLs (that's Phase 4 / cutover)
- New blog posts or new pages

## Verification per batch

After each batch:

- Grep the edited files for forbidden words (`world-class`, `best-in-class`, `cutting-edge`, `robust`, `powerful`, `industry-leading`, `Platinum` outside the approved line)
- Confirm every edited `<SEO title>` ≤60 chars and `description` ≤160 chars
- Confirm `<h1>` reads naturally and includes the primary keyword
- Build is clean (Lovable auto-builds)

## Verification at end of Phase 3

- Every URL in `docs/SEO-KEYWORD-MAP.md` has an updated title + description that matches the map
- Run `seo--list_findings` and mark anything now resolved

## Deliverable

Each page now ranks on a real keyword cluster, reads in TechD's voice, and is ready for Phase 4 (OG images + GA4 + Search Console + 301 redirect map enforcement).

---

**Want me to start with Batch 1 (`/` + `/contact`) right after approval, or batch differently?**
