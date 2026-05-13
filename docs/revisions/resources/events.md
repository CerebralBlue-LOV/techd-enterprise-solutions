# Events — Revision Analysis

**Source audits:** `docs/audit/resources/past-events.md`, `docs/audit/resources/events-and-webinars.md`
**Scraped:** 2026-05-13 from `techd.com/resources-big-data-solutions/`
**Current content file:** `src/content/resources.ts`

---

## 1. Extracted & Verified Data

No legacy event content can be ported directly — all events are past and reference outdated product versions. What the legacy data confirms is that two event *formats* were established TechD programs and remain viable for 2026 programming:

**Format 1: TechD Virtual Lunch and Learn**
- Recurring program documented across multiple years (2019–2022)
- Typically 60–90 minutes, virtual, practitioner audience
- Topics historically covered: Cognos Analytics releases, Planning Analytics, Cloud Pak for Data updates
- Registration was managed via TechD directly (PDF/event URLs, now defunct)
- Format is reusable; all product content must be rebuilt for 2026

**Format 2: TechD Half-Day Workshop**
- In-person workshops held in NYC (May 2017), Atlanta (March 2017), Pittsburgh (March 2017)
- Format: 9:00–12:30 AM, morning session, city-based
- Topics covered "Big Data" and IBM analytics — all outdated; requires full content rebuild
- Format is reusable for 2026 with current solution areas

**Already in `resources.ts` and correctly scoped (`draft: true`):**
- "IBM Think 2026" — IBM's annual flagship conference. TechD's presence at Think is referenced in `solutions-extras.ts`. Keep as-is; update `date` and `registrationUrl` when IBM publishes them.
- "NYC Enterprise AI Roundtable" — Executive-level format, AI practice focus, correct vertical (financial/enterprise decision-makers). Keep as-is.

---

## 2. Legacy Data Discarded

| Discarded Item | Reason |
|---|---|
| TechD Workshop: NYC Big Data Workshop (May 2017) | Past event. "Big Data" framing is 2017-era. Product content entirely outdated. |
| TechD Workshop: Atlanta Big Data Workshop (March 2017) | Past event. Same issues as NYC. |
| TechD Workshop: Pittsburgh Big Data Workshop (March 2017) | Past event. Same issues as above. |
| Q1/Q2 2019 Upcoming Events listing | Calendar artifact with no content value. Not an event entry. |
| "Attend TechD & IBM Q4 Live Webinar: Redefining Customer Care in E&U with IBM AI" | Past event. "IBM AI" branding is too vague; not a current product name. |
| "Emerge with Resiliency 2020" IBM community event | Past IBM-organized event, not TechD-produced. Community event format is not part of TechD's current go-to-market. |
| Cognos User Group meetings (multiple) | User group format is not reflected in `solutions.ts` or TechD's current positioning. Cognos User Groups are IBM-organized, not TechD events. |
| All lunch-and-learn events from 2019–2022 | Past events with outdated product versions and defunct registration URLs. Format is salvageable; specific events are not. |
| "On-Demand Webinar: IBM vs. AWS Competitive Analysis" (April 2022) | Competitive deck event, not aligned with the Events page content model. Would belong in Webinars if rebuilt. |
| All events tied to Cognos Analytics 11.x version updates | Version-specific release webinars. All outdated; current version is 12.1.2. |

---

## 3. Solution Alignment

Legacy events provided zero direct content usable for 2026. What the legacy data establishes:

- The **Lunch and Learn** format is TechD's established program for practitioner-level technical sessions — multi-year history validates audience demand
- The **Workshop** format (half-day, in-person) was used for market activation in key cities — format supports all five practices if repackaged
- **IBM Think** and **executive roundtables** are the appropriate formats for C-suite and senior-architect audiences

The two `draft: true` entries already in `resources.ts` cover IBM Think 2026 (IBM partnership signal) and NYC Roundtable (executive AI practice). The Lunch and Learn and Workshop formats have no current entries — those are the gaps.

---

## 4. Content to Update in `resources.ts`

The two existing `draft: true` event entries are correctly scoped. No changes to them.

**Required data structure for new event entries:**

```ts
{
  type: "events",
  title: string,              // ≤10 words, practitioner or executive framing
  description: string,        // ≤50 words, state the operational value; no superlatives
  format: "virtual" | "in-person" | "conference" | "roundtable",  // add this field to Resource type
  location: string | null,    // city or "Virtual" — null until confirmed
  date: string | null,        // ISO date — null until confirmed
  registrationUrl: string | null,  // null until live
  draft: true,
}
```

**Pending type change:** When the first new event entry is added to `resources.ts`, add `format` to the `Resource` type in `src/content/resources.ts`:

```ts
format?: "virtual" | "in-person" | "conference" | "roundtable";
```

This enables format-based filtering on the Events page without breaking existing entries (optional field).

---

## 5. Gaps & Recommendations

The Events page will have only two draft entries (IBM Think 2026, NYC Roundtable) until new programming is created. Proposed 2026 events to add as `draft: true` once scheduling is confirmed:

1. **"TechD Virtual Lunch and Learn: watsonx.ai for the Enterprise — What's Real vs. the Hype"**
   Format: virtual. Audience: solution architects and data engineers. Resurrects the established Lunch and Learn brand with a 2026 topic. Covers watsonx.ai capabilities, TechD's delivery methodology, and what distinguishes production deployment from a demo.
   Practice: AI & Generative | Products: watsonx.ai, NeuralSeek

2. **"TechD Workshop: Data Governance & AI Readiness — Half-Day Hands-On"**
   Format: in-person or virtual. Audience: data platform leads and data architects at healthcare and insurance organizations. Covers watsonx.data lakehouse, Cloud Pak for Data v5.3, and governance tooling. Anchored to HIPAA and PCI-DSS requirements.
   Practice: Data & Analytics | Products: watsonx.data, Cloud Pak for Data

3. **"TechD Roundtable: FinOps in Practice — Closing the Gap Between Spend Visibility and Action"**
   Format: roundtable (executive, ≤20 attendees). Audience: VP/CTO and IT finance leads. Positions TechD's cross-product expertise across Apptio (TBM, Cloudability), Turbonomic (workload optimization), and Instana (APM) as a connected workflow, not three separate tools.
   Practice: Automation & FinOps | Products: IBM Apptio, IBM Turbonomic, IBM Instana

4. **"IBM Think 2026 — TechD Sessions"**
   Format: conference. Already in `resources.ts` as `draft: true`. Update `date` and `registrationUrl` when IBM publishes Think 2026 details. IBM Think is the annual flagship IBM conference; TechD participation is referenced in `solutions-extras.ts` as a delivery credibility signal.
   Practice: All | Products: watsonx suite, full portfolio

**Scheduling note:** All four proposed events should remain `draft: true` until dates, locations, and registration links are confirmed by PM. Do not publish placeholder events with `draft: false` and null dates — the Events page renders date/location as visible fields.
