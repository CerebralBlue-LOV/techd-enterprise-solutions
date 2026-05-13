# Resources — Raw Page Content Audit

Verbatim scrape of every page under `https://techd.com/resources-big-data-solutions/` requested for the Resources audit. Boilerplate "Featured Clients" logo grid and the global "TechD is dedicated to…" CTA bar are stripped from each page file — they are identical across all pages and already captured in the services audit.

**Scraped:** 2026-05-13

## Pages

| # | Section | URL | File | Status |
|---|---|---|---|---|
| 1 | Resources (hub) | `/resources-big-data-solutions/` | [resources-hub.md](./resources-hub.md) | 200 |
| 2 | Events and Webinars | `/resources-big-data-solutions/events-and-webinars/` | [events-and-webinars.md](./events-and-webinars.md) | 200 |
| 3 | White Papers | `/resources-big-data-solutions/white-papers/` | [white-papers.md](./white-papers.md) | 200 |
| 4 | Blogs and Insights | `/resources-big-data-solutions/blogs-and-insights/` | [blogs-and-insights.md](./blogs-and-insights.md) | 200 |
| 5 | Success Stories | `/resources-big-data-solutions/success-stories/` | [success-stories.md](./success-stories.md) | 200 |
| 6 | Past Events | `/resources-big-data-solutions/past-events/` | [past-events.md](./past-events.md) | 200 |
| 7 | Social Media (empty body) | `/resources-big-data-solutions/social-media/` | [social-media.md](./social-media.md) | 200 |

## Findings

- **All 7 URLs return 200.** No 404s in this set.
- **`/social-media/`** returns 200 but the article body is empty — only the global "TechD is dedicated to…" CTA bar and Featured Clients carousel render. No social links, no embeds, no copy.
- **The hub, Events and Webinars, and Blogs and Insights pages are very large feeds (~1,200–2,700 lines of markdown each).** The website fetcher's preview-size limit truncates the captured markdown before the end of the feed. The captured files include items roughly back to 2015–2018. If you need every tile to the bottom of each feed, the live page is browseable.
- **Tag taxonomy is messy and items overlap across sections.** The same item routinely appears under Blogs and Insights, Events, Webinars, Past Events, Press Releases, and Publications because each post is multi-tagged. Expect ~50–70% overlap between the Events and Webinars / Blogs and Insights / Past Events feeds.
- **Newest content is from late 2022.** Nothing 2023, 2024, 2025, or 2026 surfaces in any of the feeds. The entire library predates watsonx, the Cloud Pak for Data → watsonx.data rebrand, and the current IBM partner-tier program.
- **`/white-papers/`** has 8–10 items, mostly Cognos Analytics and Cloud Pak for Data whitepapers from 2018–2020. A handful link to PDFs hosted on `techd.com/wp-content/uploads/`.
- **`/success-stories/`** is mislabeled — its top items are a whitepaper, a webinar, and a product release announcement. The Cesar/Larry-style "client X did Y with TechD" narratives the section name implies are absent.
- **`/past-events/`** is the cleanest of the long feeds — it's a chronological list of 25–30+ past TechD events, webinars, and lunch-and-learns, useful as raw inventory for a 2026 events page.
- The **global page chrome** (filter dropdown + search box) appears at the top of every section page and uses the WordPress tag system: `AllTechD News, Events, White Papers, Blogs and Insights, Webinars, Success Stories, Publications, IBM Data Solutions, Cognos User Groups`. Filtering happens client-side; there is no separate URL per filter.
