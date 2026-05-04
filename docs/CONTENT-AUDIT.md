# Content Audit — techd.com legacy pages

**Source:** 210 HTML pages from site crawl (Day 1)
**Method:** URL-tag only. No body extraction. Redirect targets assigned by category.
**Date:** 2026-05-04 (Day 2)

---

## Summary

| Category | Count | Action | Target |
|---|---:|---|---|
| Homepage | 1 | keep | `/` |
| Core navigation (IBM partner, customers landing, contact) | 5 | merge | `/` or `/contact` |
| Data-solution overview + detail pages | 50 | merge | `/solutions` |
| Services overview + detail pages | 16 | merge | `/services` |
| About cluster | 3 | merge | `/contact` |
| Customer case-study pages | 5 | merge | `/` (homepage proof section) |
| Webinar landing pages | 63 | drop | `/resources` |
| Event / user group / workshop pages | 23 | drop | `/resources` |
| Resource archive + news pages | 11 | drop | `/resources` |
| WordPress category archives | 16 | drop | `/resources` or `/solutions` |
| Orphan `?p=N` posts | 14 | drop | `/` |
| Static assets | 2 | no redirect | n/a |
| **Total** | **209** | | |

> Note: 210 crawled — robots.txt and a PNG asset account for 2 entries with no redirect needed; counted separately.

---

## Decisions applied

- **About pages** — folded into `/contact`. No `/about` route created.
- **Detail pages** (data-solutions, services) — coarse 301 to section overview. Individual detail pages deferred.
- **Webinar + event pages** — all dropped → `/resources`. Resources hub starts clean.
- **Customer pages** — folded as proof material into homepage. No detail pages.
- **`/privacy-policy/`** — only legacy URL without a clear P0 target. Flag for Day 3 decision: build minimal page or 301 to `/contact`.

---

## Group 1 — Target: `/` (Homepage)

| Legacy path | Category | Action | Notes |
|---|---|---|---|
| `/` | core | keep | Rebuilt; content migrated |
| `/ibm-business-partner/` | core | merge | IBM Platinum badge → homepage proof |
| `/ibm-business-partnership/` | core | merge | Duplicate of above |
| `/our-customers/` | core | merge | Customer logos → homepage LogoStrip |
| `/cancer-treatment-center/` | customer | merge | Homepage proof section candidate |
| `/communications-firm/` | customer | merge | Homepage proof section candidate |
| `/large-hospital/` | customer | merge | Homepage proof section candidate |
| `/large-university-system/` | customer | merge | Homepage proof section candidate |
| `/pharmaceutical-sales-and-marketing/` | customer | merge | Homepage proof section candidate |
| `/techd-announces-the-opening-of-new-headquarters-at-489-devon-park-drive-suite-318-wayne-pennsylvania-19087/` | event | drop | Old office announcement → homepage |
| `/?p=3` | orphan-post | drop | |
| `/?p=363` | orphan-post | drop | |
| `/?p=365` | orphan-post | drop | |
| `/?p=798` | orphan-post | drop | |
| `/?p=800` | orphan-post | drop | |
| `/?p=802` | orphan-post | drop | |
| `/?p=804` | orphan-post | drop | |
| `/?p=806` | orphan-post | drop | |
| `/?p=984` | orphan-post | drop | |
| `/?p=986` | orphan-post | drop | |
| `/?p=988` | orphan-post | drop | |
| `/?p=990` | orphan-post | drop | |
| `/?p=992` | orphan-post | drop | |
| `/?p=994` | orphan-post | drop | |

---

## Group 2 — Target: `/contact`

| Legacy path | Category | Action | Notes |
|---|---|---|---|
| `/contact-us/` | core | keep | Direct equivalent — rename from contact-us to contact |
| `/about-us/` | about | merge | About content folds into /contact page |
| `/our-story/` | about | merge | Company narrative → /contact |
| `/depth-of-experience/` | about | merge | Track record / credentials → /contact |

---

## Group 3 — Target: `/solutions`

| Legacy path | Category | Action | Notes |
|---|---|---|---|
| `/data-solutions/` | data-solution | merge | Top-level overview — primary redirect for all detail pages |
| `/data-solutions/business-analytics/` | data-solution | merge | |
| `/data-solutions/business-analytics/cognos-analytics/` | data-solution | merge | |
| `/data-solutions/business-analytics/cognos-controller/` | data-solution | merge | |
| `/data-solutions/business-analytics/planning-analytics/` | data-solution | merge | |
| `/data-solutions/data-science/data-science-watson-studio/` | data-solution | merge | |
| `/data-solutions/data-science/ibm-spss-modeler/` | data-solution | merge | |
| `/data-solutions/data-science/ibm-spss-statistics/` | data-solution | merge | |
| `/data-solutions/data-science/predictive-spss/` | data-solution | merge | |
| `/data-solutions/enterprise-insights/` | data-solution | merge | |
| `/data-solutions/enterprise-insights/cloud-pak-data/` | data-solution | merge | |
| `/data-solutions/enterprise-insights/cloud-pak-data-system-with-ibm-performance-server/` | data-solution | merge | |
| `/data-solutions/enterprise-insights/ibm-cloud-pak-data/` | data-solution | merge | |
| `/data-solutions/enterprise-insights/ibm-datastage-integration/` | data-solution | merge | |
| `/data-solutions/hybrid-data-management/` | data-solution | merge | |
| `/data-solutions/hybrid-data-management/db2-database/` | data-solution | merge | |
| `/data-solutions/hybrid-data-management/db2-warehouse/` | data-solution | merge | |
| `/data-solutions/hybrid-data-management/hadoop-data-lakes/` | data-solution | merge | |
| `/data-solutions/hybrid-data-management/industry-data-models/` | data-solution | merge | |
| `/data-solutions/ibm-business-intelligence-and-analytics/` | data-solution | merge | |
| `/data-solutions/ibm-business-intelligence-and-analytics/cognos-analytics/` | data-solution | merge | |
| `/data-solutions/ibm-business-intelligence-and-analytics/cognos-controller/` | data-solution | merge | |
| `/data-solutions/ibm-business-intelligence-and-analytics/ibm-planning-analytics/` | data-solution | merge | |
| `/data-solutions/ibm-business-intelligence-and-analytics/planning-analytics/` | data-solution | merge | |
| `/data-solutions/ibm-cloud/` | data-solution | merge | |
| `/data-solutions/ibm-cognos-analytics-administration/` | data-solution | merge | |
| `/data-solutions/ibm-data-science-platform/` | data-solution | merge | |
| `/data-solutions/ibm-data-science-platform/data-science-ibm-watson-studio/` | data-solution | merge | |
| `/data-solutions/ibm-data-science-platform/ibm-watson-ai-applications/` | data-solution | merge | |
| `/data-solutions/ibm-data-science-platform/predictive-analytics-ibm-spss/` | data-solution | merge | |
| `/data-solutions/ibm-data-science-platform/predictive-spss/` | data-solution | merge | |
| `/data-solutions/security-intelligence/` | data-solution | merge | |
| `/data-solutions/security-intelligence/security-guardium/` | data-solution | merge | |
| `/data-solutions/security-intelligence/security-qradar/` | data-solution | merge | |
| `/data-solutions/security-intelligence/security-resilient/` | data-solution | merge | |
| `/data-solutions/techd-cogsuite/` | data-solution | merge | |
| `/data-solutions/unified-governance-and-integration/` | data-solution | merge | |
| `/data-solutions/unified-governance-and-integration/data-replication/` | data-solution | merge | |
| `/data-solutions/unified-governance-and-integration/information-server/` | data-solution | merge | |
| `/data-solutions/unified-governance-and-integration/master-data-management/` | data-solution | merge | |
| `/data-solutions/unified-governance-and-integration/watson-knowledge-catalog/` | data-solution | merge | |
| `/data-solutions/watson-assisstant-ai-chatbot-transformative-ai-applications-techd-ibm/` | data-solution | merge | |
| `/cognos-analytics-ibm-techd-business-intelligence/` | data-solution | merge | Standalone product page |
| `/cognos-analytics-upgrade/` | data-solution | merge | Standalone product page |
| `/download-free-trial-versions-of-techds-ibm-cogsuite-software-tools/` | data-solution | merge | CogSuite → /solutions |
| `/harrisburg-cognos-analytics-reporting/` | data-solution | merge | Regional Cognos service → /solutions |
| `/ibm-data-solutions/` | data-solution | merge | Duplicate overview |
| `/ibm-turbonomic-cloud-cost-optimization/` | data-solution | merge | Cloud/infra product |
| `/netezza-netezza-performance-server-on-cloud/` | data-solution | merge | Data warehouse product |
| `/real-time-observability-with-ibm-instana/` | data-solution | merge | Observability product |
| `/category/ibm-data-solutions/` | category-archive | drop | Category → /solutions |

---

## Group 4 — Target: `/services`

| Legacy path | Category | Action | Notes |
|---|---|---|---|
| `/services/` | core | keep | Direct equivalent |
| `/apptio-setup-implementation-services/` | service | merge | Apptio implementation → /services |
| `/services/advisory-assessment-services/` | service | merge | |
| `/services/advisory-assessment-services/analytics/` | service | merge | |
| `/services/advisory-assessment-services/data-assessment/` | service | merge | |
| `/services/advisory-assessment-services/security/` | service | merge | |
| `/services/strategy-and-consulting/` | service | merge | |
| `/services/strategy-and-consulting/field-services/` | service | merge | |
| `/services/strategy-and-consulting/implementation/` | service | merge | |
| `/services/strategy-and-consulting/lifecycle-services-and-customer-success/` | service | merge | |
| `/services/strategy-and-consulting/solution-design/` | service | merge | |
| `/services/techd-ibm-ai-data-quick-start-advisory-service/` | service | merge | |
| `/services/techd-ibm-ai-data-quick-start-advisory-services/` | service | merge | Duplicate of above (singular vs plural) |
| `/services/techd-managed-services/` | service | merge | |
| `/services/technology-expertise/` | service | merge | |
| `/services/training/` | service | merge | |

---

## Group 5 — Target: `/resources`

### Webinars (63)

| Legacy path | Category | Action |
|---|---|---|
| `/5-best-practices-to-help-kick-start-your-data-governance-program-live-webinar/` | webinar | drop |
| `/attend-techd-ibm-q4-live-webinar-redefining-customer-care-eu-ibm-ai/` | webinar | drop |
| `/cloud-pak-for-data-with-ibm-performance-server-live-webinar/` | webinar | drop |
| `/cognos-analytics-upgrade-available-december-31st/` | webinar | drop |
| `/cognos-analytics-webinar-jan21/` | webinar | drop |
| `/employ-ibm-planning-analytics-fast-powerful-collaborative-budgeting-forecasting-live-webinar-oct-17-2019/` | webinar | drop |
| `/ibm-cognos-analytics-for-ibm-cloud-pak-for-data-webinar/` | webinar | drop |
| `/ibm-datastage-on-cloud-pak-for-data-webinar-july-22nd/` | webinar | drop |
| `/ibm-planning-analytics-for-cloud-pak-for-data-webinar-oct-27th/` | webinar | drop |
| `/ibm-watson-ai-applications-live-webinar/` | webinar | drop |
| `/ibm-watson-data-science-techd-ibm-live-webinar-oct-6th/` | webinar | drop |
| `/improving-business-foresight-and-performance-with-ibm-planning-analytics-webinar-march-17th/` | webinar | drop |
| `/next-generation-netezza-system-is-here-webinar-april-16th/` | webinar | drop |
| `/protecting-critical-data-with-ibm-security-guardium-solutions-august-21-2018/` | webinar | drop |
| `/smarter-data-protection-with-ibm-security-guardium-solutions-live-webinar-dec-10th-2019/` | webinar | drop |
| `/techd-announces-big-data-webinar-for-healthcare-providers/` | webinar | drop |
| `/techd-ibm-live-webinars-series-july-2020/` | webinar | drop |
| `/techd-live-lunch-and-learn-cognos-analytics-power-bi-comparison/` | webinar | drop |
| `/techd-webinar-big-data-healthcare/` | webinar | drop |
| `/techd-webinar-cognos-analytics-whats-new-improved/` | webinar | drop |
| `/techd-webinar-ibm-big-data-for-retail-may-26-1000-am-1100-am-et/` | webinar | drop |
| `/techd-webinar-spss-healthcare-may-26-2016/` | webinar | drop |
| `/techd-webinar-spss-highered/` | webinar | drop |
| `/techd-webinar-transform-planning-process-ibm-cognos-tm1-june-28-2016-2-3-pm-et/` | webinar | drop |
| `/techd-webinar-webinar-big-data-cloud-for-higher-ed/` | webinar | drop |
| `/watson-knowledge-catalog-activate-data-for-ai-analytics-live-webinar-nov-12-2019/` | webinar | drop |
| `/watson-knowledge-catalog-activate-data-for-ai-analytics-webinar-april-22nd/` | webinar | drop |
| `/webinar-big-data-and-analytics-for-healthcare/` | webinar | drop |
| `/webinar-big-data-what-it-means/` | webinar | drop |
| `/webinar-business-foresight-performance-power-ibm-planning-analytics-march-28th-2019/` | webinar | drop |
| `/webinar-business-foresight-performance-with-the-power-of-ibm-planning-analytics/` | webinar | drop |
| `/webinar-business-foresight-performance-with-the-power-of-ibm-planning-analytics-november-13/` | webinar | drop |
| `/webinar-cognos-analytics/` | webinar | drop |
| `/webinardata-science-new-age-analytics-communications-utilities/` | webinar | drop |
| `/webinardeliver-stronger-business-foresight-and-improve-performance-with-the-power-of-ibm-planning-analytics/` | webinar | drop |
| `/webinar-exclusive-first-look-at-ibm-cognos-analytics-11-1-october-16th-2018/` | webinar | drop |
| `/webinar-future-healthcare-big-data/` | webinar | drop |
| `/webinar-improving-organizational-performance-patient-outcomes-ibm-advanced-analytics-april-24th-2019/` | webinar | drop |
| `/webinar-improving-patient-outcomes-at-childrens-hospital-of-philadelphia-with-ibm-advanced-analytics-june-7-2018/` | webinar | drop |
| `/webinar-introducing-ibm-integrated-analytics-system/` | webinar | drop |
| `/webinar-make-ibm-cognos-analytics-11-1-3-an-integral-part-of-your-analytics-cycle/` | webinar | drop |
| `/webinar-make-ibm-cognos-analytics11-1-an-integral-part-of-your-analytics-cycle/` | webinar | drop |
| `/webinar-predictive-analytics-changing-higher-education/` | webinar | drop |
| `/webinar-protecting-critical-data-ibm-security-guardium-solutions-march-28th-2019/` | webinar | drop |
| `/webinar-run-analytics-faster-iias-ibm-next-generation-analytics-warehouse-feb-21st-2019/` | webinar | drop |
| `/webinar-series-qrt-4-finish-2019-strong-start-2020-even-stronger-techd-ibm-solutions/` | webinar | drop |
| `/webinar-star-analytics/` | webinar | drop |
| `/webinar-transform-retail-with-big-data/` | webinar | drop |
| `/webinar-turn-data-insights-cognos-analytics-r7/` | webinar | drop |
| `/webinar-turn-data-insights-cognos-analytics-r9/` | webinar | drop |
| `/webinar-turn-data-into-insights-cognos-analytics-r10-r11-is-here-june-12-2018/` | webinar | drop |
| `/webinar-unify-your-data-ai-platform-with-cloud-pak-for-data/` | webinar | drop |
| `/webinar-universities-competitive-advantage/` | webinar | drop |
| `/webinar-upgrading-cognos-11/` | webinar | drop |
| `/webinar-whats-new-ibm-infosphere-datastage-v11-7-2/` | webinar | drop |
| `/webinar-whats-new-improved-cognos-analytics/` | webinar | drop |
| `/webinar-whats-new-improved-with-cognos-analytics-r6/` | webinar | drop |
| `/whats-new-in-3-5-cloud-pak-for-data-for-hybrid-cloud-webinar/` | webinar | drop |
| `/whats-new-with-ibm-cognos-analytics-11-1-5-live-webinar-jan-28th/` | webinar | drop |
| `/whats-new-with-ibm-cognos-analytics11-1-6-webinar-may-7th/` | webinar | drop |
| `/whats-new-with-ibm-cognos-analytics-11-2-0-live-webinar/` | webinar | drop |
| `/whats-new-with-ibm-cognos-analytics-11-2-3-live-webinar-nov-29-2022/` | webinar | drop |

### Events / user groups / workshops (23)

| Legacy path | Category | Action |
|---|---|---|
| `/canada-cognos-user-group-april-19-2016/` | event | drop |
| `/charlotte-cognos-user-group-ccug-sep-23-2015/` | event | drop |
| `/greater-philadelphia-cognos-user-group-gpcug-sep-29-2015/` | event | drop |
| `/new-york-metro-cognos-user-group-march-3-2016/` | event | drop |
| `/nymcug-march-2015-meeting/` | event | drop |
| `/q1-2018-upcoming-events/` | event | drop |
| `/q1-q2-2019-upcoming-events/` | event | drop |
| `/q2-2018-upcoming-events/` | event | drop |
| `/raleigh-durham-cognos-user-group-march-30-2017/` | event | drop |
| `/raleigh-durham-cognos-user-group-rdcug-sep-24-2015/` | event | drop |
| `/raliegh-durham-cognos-user-group-march-31-2016/` | event | drop |
| `/techd-named-sponsor-emerge-with-resiliency-2020-with-ibm/` | event | drop |
| `/techd-workshop-atlanta-big-data-workshop-thursday-march-2-2017-930-100-pm/` | event | drop |
| `/techd-workshop-chicago-ibm-cognos-analytics-big-data-workshop-thursday-june-8-2017-30-am-1230-pm-2/` | event | drop |
| `/techd-workshop-columbus-oh-ibm-cognos-analytics-big-data-workshop-wednesday-october-25-2017-900-am-1230-pm/` | event | drop |
| `/techd-workshop-durham-nc-ibm-cognos-analytics-big-data-workshop-modern-healthcare-organization-tuesday-may-15-2018-900-100-pm/` | event | drop |
| `/techd-workshop-nyc-big-data-workshop-tuesday-may-9-2017-900-am-1230-pm/` | event | drop |
| `/techd-workshop-nyc-ibm-cognos-analytics-big-data-workshop-for-the-modern-healthcare-organization-wednesday-may-9-2018-900-am-100-pm/` | event | drop |
| `/techd-workshop-nyc-ibm-data-warehousing-cognos-analytics-tuesday-november-7-2017-900-am-1230-pm/` | event | drop |
| `/techd-workshop-philadelphia-pa-ibm-data-warehousing-cognos-analytics-thursday-november-9-2017-900-am-1230-pm/` | event | drop |
| `/techd-workshop-pittsburgh-big-data-workshop-tuesday-march-7-2017-930-100-pm/` | event | drop |
| `/techd-and-ibm-publications/` | resource-archive | drop |
| `/making-data-ready-for-ai-ibm-cloud-pak-for-data-whitepaper/` | resource-archive | drop |

### Resource archives / news (11)

| Legacy path | Category | Action |
|---|---|---|
| `/case-studies/` | resource-archive | drop | 
| `/cognos-analytics-latest-news/` | resource-archive | drop |
| `/news-and-events/` | resource-archive | drop |
| `/news-and-events/user-group-presentations/` | resource-archive | drop |
| `/news-and-events/white-papers/` | resource-archive | drop |
| `/resources-big-data-solutions/` | resource-archive | drop |
| `/resources-big-data-solutions/blogs-and-insights/` | resource-archive | drop |
| `/resources-big-data-solutions/events-and-webinars/` | resource-archive | drop |
| `/resources-big-data-solutions/past-events/` | resource-archive | drop |
| `/resources-big-data-solutions/social-media/` | resource-archive | drop |
| `/resources-big-data-solutions/success-stories/` | resource-archive | drop |
| `/resources-big-data-solutions/white-papers/` | resource-archive | drop |

### WordPress category archives → /resources (15 of 16; see /solutions for 1)

| Legacy path | Category | Action |
|---|---|---|
| `/category/blogs-and-insights/` | category-archive | drop |
| `/category/blogs-and-insights/technical-insights/` | category-archive | drop |
| `/category/cognos-user-groups/` | category-archive | drop |
| `/category/events/` | category-archive | drop |
| `/category/events/current-events/` | category-archive | drop |
| `/category/events/event-presentations/` | category-archive | drop |
| `/category/events/past-events/` | category-archive | drop |
| `/category/publications/` | category-archive | drop |
| `/category/success-stories/` | category-archive | drop |
| `/category/success-stories/case-studies/` | category-archive | drop |
| `/category/techd-news/` | category-archive | drop |
| `/category/techd-news/press-releases/` | category-archive | drop |
| `/category/webinars/` | category-archive | drop |
| `/category/webinars/on-demand-webinars/` | category-archive | drop |
| `/category/white-papers/` | category-archive | drop |

---

## Group 6 — Target: `/privacy-policy` ⚠️ Decision needed Day 3

| Legacy path | Category | Action | Notes |
|---|---|---|---|
| `/privacy-policy/` | core | keep | **Day 3 decision required:** build minimal `/privacy-policy` page, or 301 to `/contact`. Legal page — don't drop. |

---

## Group 7 — No redirect (static assets)

| Legacy path | Category | Action | Notes |
|---|---|---|---|
| `/robots.txt` | asset | no redirect | New `robots.txt` deployed in `/public/` — different content, old URL irrelevant |
| `/wp-content/uploads/2020/08/IBM-Gold-Business-Partner-TechD-Extended-logo.png` | asset | no redirect | Image file — cannot redirect at static host level |
