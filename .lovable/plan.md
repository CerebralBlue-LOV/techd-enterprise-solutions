# Plan: Audit techd.com Demos + About Us → `docs/audit/`

Same playbook as Services and Resources. Two small audit docs in `docs/audit/`, one per area, since they're unrelated content domains and folding them together would be confusing later. Both should be fast — combined inventory is ~5 pages.

## What the live site actually has (verified with `fetch_website`)

**Demos (`/demos/`):** 🚫 Broken. Returns the WordPress "It looks like nothing was found at this location" fallback — same dead-page pattern we hit on `/services/techd-managed-services/` and `/webinars/`. **There is no Demos section on the live techd.com.** The "Featured Clients" logo strip is the only thing that renders.

**About Us:** Three sibling pages, no proper hub:
- `/about-us/` — basically empty. One-line tagline ("dedicated to helping organizations gain truth from their data") + Contact CTA + clients strip. No real about content.
- `/our-story/` — substantive (~261 lines). Company description, IBM Platinum since 2009, Miami HQ, mission statement, solutions overview.
- `/depth-of-experience/` — substantive (~138 lines). Team capabilities, then **management team profiles** (Marc Martina / President + others). This is the only place on the live site that names people.

> **Homepage is unrecoverable.** `https://techd.com/` returns the SEO-cloaking spam payload ("Betzoid's Guide to the Leading Kenyan Betting Sites for 2024") documented in `docs/SPAM-REPORT.md`. Confirms again: do not migrate the homepage. About-Us audit ignores it.

## Scope

### Audit doc 1 — `docs/audit/DEMOS-AUDIT.md` (≤1 page)

Single-page write-up. Confirms:
- The `/demos/` URL exists in the WordPress install but the page is broken (WP 404 fallback, no content, no items in the feed).
- No Demos appear anywhere else in the live mega-menu, sub-nav, or sitemap.
- Migration scope: **0 assets**. If the new site needs Demos, it's a from-scratch build (live walkthroughs of TechD/IBM/NeuralSeek joint demos, recorded product tours, sandbox links), not a migration.
- Recommendation on whether to even include a Demos route in the new IA, or fold it into Resources → Webinars.

### Audit doc 2 — `docs/audit/ABOUT-AUDIT.md`

Curated catalog of the 3 About-area pages, same template as `SERVICES-AUDIT.md`:

- Header block + status legend (✅ keep / ⚠️ refresh / ❌ drop) + copy-quality flag (📄 substantive / 🪶 thin / 🚫 broken).
- Inventory table: page | URL | status | copy summary | gotchas.
- Per-page fact-check against `docs/COPY-SOURCE.md` (the homepage source-of-truth that already flagged stale claims like "Premier" tier, Wayne PA HQ, "25+ years" math, CogSuite, Watson Assistant pre-watsonx).
- **Management team section gets special handling.** Names of executives are sensitive in a public repo (`CLAUDE.md` rule: "No personal names ... in any file"). The audit will *count* the named execs and note their titles, but **will not write the names into the audit doc**. Decision item for the user: do we re-publish the team section on the new site or drop it (current `/contact` scaffold collapses About into Contact and doesn't list people).
- Cross-reference against current code: the new site has **no `/about` route** by design (Day 2 decision in `docs/CONTENT-AUDIT.md`: about pages fold into `/contact`). Audit confirms whether that decision still holds after seeing the live About copy, or if there's enough substance in `/our-story` to justify a dedicated `/about` page.

## Status assessment per item

For each About page capture:

- **Stale claims** — IBM tier ("Gold" / "Premier" / "Platinum"), HQ location, founding year, tenure math ("25+ years" was wrong on the homepage), product references (Cognos generations, CP4D vs. watsonx).
- **Substantive vs. boilerplate.**
- **People mentioned** — count only, not names.
- **Reusable snippets** — short paragraphs that could lift into the new site's `/contact` hero or a future `/about` page.

## Deliverables

- `docs/audit/DEMOS-AUDIT.md` — ~30 lines, one finding ("page is dead, nothing to migrate, decide whether to keep the route").
- `docs/audit/ABOUT-AUDIT.md` — ~80–120 lines, follows `SERVICES-AUDIT.md` shape, ends with "Gaps vs. current `/contact` scaffold and `docs/COPY-SOURCE.md`" section.
- No code changes. No content rewrites. Audit only.

## Out of scope

- Re-fetching the homepage spam payload (already documented in `docs/SPAM-REPORT.md`).
- Writing actual About copy (separate task — input is `docs/COPY-SOURCE.md`).
- Building a `/demos` route or `/about` route (separate task, after the user decides).
- Names of TechD executives — referenced as roles only.

## Open questions

1. **Two files vs. one combined?** Defaulting to two (`DEMOS-AUDIT.md` + `ABOUT-AUDIT.md`) since the topics are unrelated. Want them merged into one `ABOUT-DEMOS-AUDIT.md` instead?
2. **Management team names** — keep them out of the audit doc per the public-repo rule, correct? (We can list roles, count people, and call out that the source pages name them.)
3. **`/demos` route in new IA** — recommend dropping it (no source content, no clear product offering for demos right now), or keep a stub for future use?
