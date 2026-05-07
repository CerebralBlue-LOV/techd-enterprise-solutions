# Plan: Scrape techd.com/services and produce SERVICES-AUDIT.md

Mirror the approach already used for `SOLUTIONS-AUDIT.md` and `INDUSTRIES-AUDIT.md`: crawl the live techd.com Services area, catalog every menu item and sub-page, then output a single markdown audit doc to `docs/SERVICES-AUDIT.md`.

## Scope (from the live techd.com Services nav)

Top-level items to audit (This are placeholder values, review them carefully):

1. **Strategy & Consulting** — has sub-menu
  - Solution Design
  - Implementation
  - Field Services
  - Lifecycle Services
  - Customer Success
  - (verify any additional sub-items found during crawl)
2. **TechD and IBM** — flat
3. **AI and Data Assessment** — has sub-menu (verify children during crawl)
4. **Technology Expertise** — flat
5. **Training** — flat

Anything not in this list that appears in the live Services mega-menu gets added during the crawl, not silently dropped.

## How we'll scrape

Use **Firecrawl** (already documented in our connectors knowledge). Two-step pattern:

1. **Map** `https://techd.com` filtered to service-related URLs to discover every page under the Services area.
  - `firecrawl.map(url, { search: "service", limit: 500 })`
  - Plus targeted maps for each known section slug.
2. **Scrape** each discovered page as markdown.
  - `firecrawl.scrape(url, { formats: ["markdown"], onlyMainContent: true })`

Run as a one-off Node script in `/tmp/scrape-services.ts` (not committed). Output raw markdown to `/tmp/techd-services/*.md` for reference, then hand-curate the audit doc from those files.

Alternative if Firecrawl isn't connected: fall back to `code--fetch_website` per URL. Slower but no connector dependency.

## Deliverable: `docs/SERVICES-AUDIT.md`

Same shape as `SOLUTIONS-AUDIT.md`:

- Header block (Source, Audited date, Purpose)
- "How to use" + status legend (✅ / ⚠️ / ❌ / 🔄)
- One numbered section per top-level Services menu item
- For sections with sub-menus → table (Sub Menu Name | Page Name | Link | Status)
- For flat sections → inline summary paragraph + key offerings
- Per-section "Note" callouts where TechD-specific decisions are needed (e.g. "Field Services overlaps with Managed Services in our new IA — pick one home")

## Status assessment per item

For each scraped page, capture:

- Does the offering still map to a current IBM/TechD service line in 2026?
- Is the page copy generic boilerplate or substantive (drives whether we rewrite or reuse)?
- Cross-reference against `src/content/services.ts` (today: Advisory, Implementation, Managed Services, Training) — flag gaps and duplicates.

## Steps

1. Connect Firecrawl via `standard_connectors--connect` (if not already linked).
2. Write `/tmp/scrape-services.ts`: map → scrape → save markdown per URL.
3. Run script, review raw output in `/tmp/techd-services/`.
4. Hand-write `docs/SERVICES-AUDIT.md` using the SOLUTIONS-AUDIT template.
5. Add a short "Gaps vs current `src/content/services.ts`" section at the bottom so the refactor we discussed has a clear input.

## Out of scope (explicitly)

- Resources, Demos, About Us — you mentioned them but said "first" services, so those are follow-up audits using the same playbook.
- No code changes to the app in this pass. Audit doc only.
- No content rewrites. We catalog first, decide second.

## Open questions

1. **Firecrawl connection** — OK to connect it now if not already linked? (Required for the map+scrape approach; otherwise we use `fetch_website` page-by-page.)
2. **Output location** — `docs/SERVICES-AUDIT.md` to match the existing pattern, correct? (you know what create a folder docs/audit/(here the services-audit once you finish everithing jsut re-locate others audits files))
3. **Depth** — for "Strategy & Consulting", scrape only the 5 named sub-pages, or recursively follow any deeper links found there?(also revierw the information for each page)  
  
Important:  
  

  Why do we want to do this specific scrape? Because we want to know if the information is old, is not old. So we need to, um, review if the information it is... You know, like we need to ma-- we need to do information for 2026. If you need to, I don't know, review another pages like, uh, maybe, I don't know, their pages, you, you, you can, for example, IBM. You can review on IBM, um, IBM 2026 page, and you h- you need to let me know, or yeah, you need to review if that information is old or if the information is deprecated or something like that. But what we need to do is review the information. That's what I... We're doing the scrape