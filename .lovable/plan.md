# Plan: Audit techd.com Resources → `docs/audit/RESOURCES-AUDIT.md`

Same playbook as the Services audit we just shipped. Goal is a single curated markdown doc that catalogs what lives under Resources on the live techd.com, flags what's stale or dead, and gives us a clear "keep / drop / merge" call for each category before we touch `src/content/resources.ts`.

## Scope

Top-level Resources sections to audit (verify against live mega-menu during crawl):

1. **Case Studies** — full inventory, every item.
2. **Blog** — categories + top ~10 most recent and top ~10 most-trafficked-looking posts. Not every post.
3. **Webinars** — full inventory (live + on-demand).
4. **Events** — full inventory (past + upcoming).
5. **Whitepapers / TechD and IBM** — the `/techd-and-ibm/` feed flagged during the Services audit lives here, not under Services.
6. Anything else that appears in the live Resources mega-menu (Newsletters, Podcasts, Press, etc. — added during crawl, not silently dropped).

## How we'll scrape

`code--fetch_website` page-by-page (Firecrawl was declined). Order:

1. Hit `https://techd.com/resources/` (or whatever the hub URL is) and the mega-menu source to enumerate sub-sections.
2. For each sub-section, fetch the index page → extract item URLs.
3. Fetch each item page in markdown form.
4. Save raw markdown to `/tmp/techd-resources/<section>/<slug>.md` for reference (not committed).

**Hard cap on Blog:** ~20 posts total. The Day 2 decision was already "drop all → `/resources` hub starts clean," so this audit is confirming nothing surprising is buried, not building a full archive.

## Deliverable: `docs/audit/RESOURCES-AUDIT.md`

Same shape as `SERVICES-AUDIT.md`:

- Header block (Source, Audited date, Purpose)
- "How to use" + status legend (✅ keep / ⚠️ refresh / ❌ drop / 🔄 merge)
- One numbered section per Resources sub-area
- Inventory table per section: Title | URL | Date | Status | Note
- Per-section recommendation paragraph (keep N items, drop the rest, etc.)
- Final "Gaps vs current `src/content/resources.ts`" section — today it has 3 case studies, 3 blog posts, 2 webinars, 2 events, all placeholder copy. Output of this audit drives the rewrite.

## Status assessment per item

For each scraped page capture:

- **Date** — anything pre-2023 is a strong drop candidate unless it's a flagship case study.
- **Product references** — flag anything mentioning discontinued IBM products (BigInsights, PureData, Cognos 10, Watson Assistant pre-watsonx, "Premier" partner tier).
- **Client mention** — case studies naming Fortune 500 clients (J&J, Comcast, Sony, Princeton, Johns Hopkins, IBM-published TechD + NeuralSeek retail case) are keep-candidates regardless of age.
- **Substantive vs boilerplate** — does the page have real content or is it a 3-line stub.
- **Dead/broken** — WordPress 404 fallbacks like we hit on `/services/techd-managed-services/`.

## Out of scope (explicitly)

- Demos and About Us — separate audits later, same playbook.
- No code changes to `src/content/resources.ts` in this pass. Audit doc only.
- No content rewrites. Catalog first, decide second.
- Not auditing every blog post. Sampling only.

## Open questions

1. **Blog cap** — ~20 posts (recent + featured) the right ceiling, or do you want full inventory? Full would be ~80+ URLs and a lot of fetch calls.
2. **Whitepapers / `/techd-and-ibm/`** — confirm this belongs under Resources (my read from the Services crawl), not as its own top-level item.
3. **Events** — keep past events in the audit for reference, or only future-dated ones?
