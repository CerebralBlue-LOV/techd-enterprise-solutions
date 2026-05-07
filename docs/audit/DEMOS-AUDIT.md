# TechD — Demos Audit
**Source:** https://techd.com/demos/
**Audited:** 2026-05-07
**Method:** `fetch_website` against the live URL + cross-check of the live mega-menu and the Day 1 crawl (210 HTML pages).
**Purpose:** Determine whether the live techd.com has any Demos content worth migrating.

---

## Finding

**There is no Demos section on techd.com. Migration scope: 0 assets.**

- `https://techd.com/demos/` returns the WordPress "It looks like nothing was found at this location. Try searching below…" fallback. Same dead-page pattern as `/services/techd-managed-services/` and `/webinars/`.
- The page renders only the Featured Clients logo strip — no demo items, no embeds, no video archive, no list view.
- "Demos" does not appear in the live mega-menu, in any sub-nav, or as a category in the Resources tag taxonomy (`TechD News`, `Events`, `White Papers`, `Blogs and Insights`, `Webinars`, `Success Stories`, `Publications`, `IBM Data Solutions`, `Cognos User Groups`).
- The Day 1 site crawl (210 unique HTML pages) did not surface any `/demo*` URLs other than the broken hub.

> **Status:** 🚫 Broken — WP 404 fallback. No content exists to evaluate.

---

## Recommendation for new IA

The brief mentioned "Demos" as one of the three sections to audit alongside Resources and About Us. Based on this finding:

**Option A (recommended): drop the `/demos` route from the new IA.**
There is no source content, no recorded demo library, and no clear product offering that needs a dedicated demos page in 2026. The closest live equivalent ("Workshops" — NYC/Philadelphia/Durham/Columbus 2017–2018) is already covered in `RESOURCES-AUDIT.md` under Events and recommended for drop.

**Option B: keep a `/demos` stub for future use.**
If TechD plans to publish recorded walkthroughs of joint TechD + IBM + NeuralSeek demos post-launch, scaffold a placeholder route now so the URL is reserved. Empty-state copy: "Live demos by request — book a session via /contact."

**Option C: fold demos into Resources → Webinars.**
A recorded demo is structurally a webinar. If/when TechD records demos, surface them in the existing Resources Webinars tab rather than creating a parallel section.

**Decision needed from product owner.** No code action until then.

---

## Out of scope

- Building any of the three options above.
- Sourcing demo videos from YouTube, Vimeo, or IBM Partner channels — the audit charter is "what's on techd.com today," not "what could exist."
