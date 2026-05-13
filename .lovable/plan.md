## Goal

Capture the **full, unsummarized** content of the 7 Resources pages into `docs/audit/resources/`. Verbatim — no redactions, no summarization. Same convention as `docs/audit/services/` and `docs/audit/about/`.

Also: **delete `docs/audit/RESOURCES-AUDIT.md`** (the curated/analyzed version).

## Pages to scrape (7 total)

| # | URL |
|---|---|
| 1 | `https://techd.com/resources-big-data-solutions/` (hub) |
| 2 | `https://techd.com/resources-big-data-solutions/events-and-webinars/` |
| 3 | `https://techd.com/resources-big-data-solutions/white-papers/` |
| 4 | `https://techd.com/resources-big-data-solutions/blogs-and-insights/` |
| 5 | `https://techd.com/resources-big-data-solutions/success-stories/` |
| 6 | `https://techd.com/resources-big-data-solutions/past-events/` |
| 7 | `https://techd.com/resources-big-data-solutions/social-media/` |

## Process

1. Fetch each URL with the built-in website fetcher (markdown).
2. For each page, capture verbatim:
   - Breadcrumb, all headings, all body paragraphs, all bullet lists
   - Every item tile in the feed: title, thumbnail URL, link href, tags
   - All CTA labels + their hrefs
   - All image URLs + alt text
3. Strip only the global boilerplate: trailing "TechD is dedicated to…" CTA bar + Featured Clients logo carousel.
4. Note any 404s / WP "nothing found" fallbacks.
5. Note where the fetcher's preview-size limit truncates the long feed pages — flag the truncation point in the file.
6. Write one file per URL into `docs/audit/resources/<slug>.md`.
7. Create `docs/audit/resources/INDEX.md`: table of URL + file + status, plus a "Findings" section.

## Files that will be created/deleted

```text
DELETE:
  docs/audit/RESOURCES-AUDIT.md

CREATE:
  docs/audit/resources/INDEX.md
  docs/audit/resources/resources-hub.md
  docs/audit/resources/events-and-webinars.md
  docs/audit/resources/white-papers.md
  docs/audit/resources/blogs-and-insights.md
  docs/audit/resources/success-stories.md
  docs/audit/resources/past-events.md
  docs/audit/resources/social-media.md
```

Approve and I'll run.