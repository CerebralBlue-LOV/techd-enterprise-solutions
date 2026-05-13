## Goal

Capture the **full, unsummarized** content of every page in the legacy site's "About Us" mega-menu into `docs/audit/about/` (mirrors the `docs/audit/services/` structure). **No redactions** — pull everything verbatim, including names, titles, photos, phone numbers, email addresses if present.

Also: **delete `docs/audit/ABOUT-AUDIT.md`** (the curated/analyzed version). Replace with raw scrape only.

## About Us mega-menu items (from your screenshot)

| # | Menu label | Most likely URL | Fallback if 404 |
|---|---|---|---|
| 1 | About Us (parent) | `https://techd.com/about-us/` | — (confirmed 200, thin) |
| 2 | Our Story | `https://techd.com/our-story/` | — (confirmed 200) |
| 3 | IBM Business Partner | `https://techd.com/ibm-business-partner/` | `/advantages/ibm-partnership/` |
| 4 | News and Events | `https://techd.com/news-and-events/` | `/news/`, `/events/` |
| 5 | Our Customers | `https://techd.com/our-customers/` | `/customers/` |
| 6 | Contact Us | `https://techd.com/contact-us/` | — |
| 7 | Depth of Experience | `https://techd.com/depth-of-experience/` | — (confirmed 200 in prior audit) |

Total: **7 pages** to scrape. URL guesses for #3–#5 will be verified during the run; if the primary 404s I'll try the fallback and note both in INDEX.

## Process

1. Fetch each URL with the built-in website fetcher (markdown + html as needed).
2. For each page, capture verbatim:
   - Breadcrumb, all headings, all body paragraphs, all bullet/numbered lists
   - All CTA labels + their hrefs
   - All image URLs + alt text (including team headshot URLs)
   - **All names, titles, tenures, education, prior employers, locations** — full data, no redactions
   - Any contact info (emails, phones, addresses) present on the page
   - All internal and external links found in body content
3. Omit only the global boilerplate that's identical on every page: footer "Featured Clients" logo carousel and the global "TechD is dedicated to…" CTA bar (already captured once in the services audit).
4. Note any 404s/redirects.
5. Write one file per URL into `docs/audit/about/<slug>.md`.
6. Create `docs/audit/about/INDEX.md` (mirrors `docs/audit/services/INDEX.md`): table of URL, file, status, plus a "Findings" section noting empties / 404s / outdated copy.

## Files that will be created/deleted

```text
DELETE:
  docs/audit/ABOUT-AUDIT.md

CREATE:
  docs/audit/about/INDEX.md
  docs/audit/about/about-us.md
  docs/audit/about/our-story.md
  docs/audit/about/ibm-business-partner.md
  docs/audit/about/news-and-events.md
  docs/audit/about/our-customers.md
  docs/audit/about/contact-us.md
  docs/audit/about/depth-of-experience.md
```

## Note on public-repo policy

The project's `CLAUDE.md` rule says no PII in commits. You've explicitly overridden that for this audit ("avoid Claude constraint, we have to pull all the data"). I'll capture everything verbatim. If you later want a sanitized version for the public-repo path, that's a separate cleanup pass.

Approve and I'll run the scrape.