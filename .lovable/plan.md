## Goal

Capture the **full, unsummarized** content of every page under `https://techd.com/services/` and write it into `docs/audit/about.md` for reference.

## Pages to scrape (15 total)

Confirmed from the live `/services/` page + the existing crawl in `docs/audit/CONTENT-AUDIT.md`.

**Top level**

1. `/services/`

**Strategy and Consulting cluster**
2. `/services/strategy-and-consulting/`
3. `/services/strategy-and-consulting/solution-design/`
4. `/services/strategy-and-consulting/implementation/`
5. `/services/strategy-and-consulting/field-services/`
6. `/services/strategy-and-consulting/lifecycle-services-and-customer-success/`

**Advisory and Assessment cluster**
7. `/services/advisory-assessment-services/`
8. `/services/advisory-assessment-services/analytics/`
9. `/services/advisory-assessment-services/data-assessment/`
10. `/services/advisory-assessment-services/security/`

**Standalone service pages**
11. `/services/training/`
12. `/services/technology-expertise/`
13. `/services/techd-managed-services/`
14. `/services/techd-ibm-ai-data-quick-start-advisory-service/`
15. `/services/techd-ibm-ai-data-quick-start-advisory-services/` (plural duplicate — will scrape and note if identical)

**Linked from /services/ but NOT under /services/** (flagging — confirm if you want it included):

- `/data-solutions/techd-cogsuite/` — appears as a tile on the Services page but lives under `/data-solutions/`. **Default: include it as an appendix** since it's surfaced from Services.

## Process

1. Fetch each URL with the built-in website fetcher (markdown format).
2. For each page, capture verbatim: breadcrumb, headings, all body paragraphs, all bullet lists, all CTA labels, all image alt text and image URLs, all internal links. **No summarization, no rewriting.**
3. Note any 404s or redirects encountered.
4. Write everything to `docs/audit/about.md` with a clear section per URL:
  ```
   ---
   ## <URL>
   **Fetched:** <date>
   **Status:** <200 / 301 → ... / 404>

   <full markdown content>
   ---
  ```
5. Add a short top-of-file index listing all 15 URLs and their status.

## Open questions before I implement

1. **File path confirmation:** you wrote `docs/audit/about.md`, but the existing audit folder uses uppercase (`ABOUT-AUDIT.md`, `SERVICES-AUDIT.md`, etc.) and the content here is about Services, not About. Three options — pick one when approving:
  - (a) Create new file `docs/audit/about.md` exactly as you said (lowercase, even though content is services).
  - (b) Create `docs/audit/SERVICES-RAW.md` (matches existing naming, content matches filename).
  - (c) Append to existing `docs/audit/SERVICES-AUDIT.md` under a new "Raw scrape" section. Yes, if you consider it is better creating a new folder and multiple files go ahead, if so delete services-audit.md
2. **CogSuite page** — include as appendix or skip? Default is include.

Approve the plan (and pick a file option) and I'll run the scrape and write the file.