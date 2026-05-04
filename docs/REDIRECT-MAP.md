# Redirect Map — techd.com legacy → new site

**Total:** 208 redirectable URLs (210 crawled minus 2 static assets)
**All redirects:** 301 Permanent
**Date:** 2026-05-04 (Day 2)

---

## ⚠️ Implementation note — GitHub Pages cannot serve 301s

GitHub Pages returns HTTP 200 for all served paths and has no redirect configuration file. This map **cannot be applied** until one of the following is in place:

1. **Cloudflare proxy in front of GitHub Pages** — Cloudflare Workers or Page Rules can intercept requests to `techd.com` and return 301s before they reach GitHub. This is the Day-4 Cloudflare Worker decision.
2. **DNS cutover to a host that supports `_redirects`** — Cloudflare Pages or Netlify support a `_redirects` file that would apply these rules. Switching from GitHub Pages is an architectural decision for pre-launch hardening.

**Day 4–5 action:** Once the Cloudflare Worker / domain strategy is decided, implement this map either as Worker routes or as a `_redirects` / `nginx.conf` file. Do not assume these are live on Friday.

---

## Bucket summary

| From | Count | To |
|---|---:|---|
| Homepage | 1 | `/` (same path, rebuilt) |
| Core nav pages (IBM partner, customers landing) | 3 | `/` |
| Contact page | 1 | `/contact` |
| About cluster | 3 | `/contact` |
| Customer case-study pages | 5 | `/` |
| Misc company news | 1 | `/` |
| Orphan posts (`?p=N`) | 14 | `/` |
| Data-solution overview + detail pages | 51 | `/solutions` |
| Services overview + detail pages | 16 | `/services` |
| Privacy policy | 1 | `/privacy-policy` _(or `/contact` — Day 3 decision)_ |
| All webinars | 63 | `/resources` |
| All events / user groups / workshops | 21 | `/resources` |
| Resource archives + news pages | 12 | `/resources` |
| WP category archives | 16 | `/resources` (15) or `/solutions` (1) |
| **Total** | **208** | |

---

## Redirect table

### → `/` (Homepage)

| Legacy path | New path | Type |
|---|---|---|
| `/` | `/` | 301 |
| `/ibm-business-partner/` | `/` | 301 |
| `/ibm-business-partnership/` | `/` | 301 |
| `/our-customers/` | `/` | 301 |
| `/cancer-treatment-center/` | `/` | 301 |
| `/communications-firm/` | `/` | 301 |
| `/large-hospital/` | `/` | 301 |
| `/large-university-system/` | `/` | 301 |
| `/pharmaceutical-sales-and-marketing/` | `/` | 301 |
| `/techd-announces-the-opening-of-new-headquarters-at-489-devon-park-drive-suite-318-wayne-pennsylvania-19087/` | `/` | 301 |
| `/?p=3` | `/` | 301 |
| `/?p=363` | `/` | 301 |
| `/?p=365` | `/` | 301 |
| `/?p=798` | `/` | 301 |
| `/?p=800` | `/` | 301 |
| `/?p=802` | `/` | 301 |
| `/?p=804` | `/` | 301 |
| `/?p=806` | `/` | 301 |
| `/?p=984` | `/` | 301 |
| `/?p=986` | `/` | 301 |
| `/?p=988` | `/` | 301 |
| `/?p=990` | `/` | 301 |
| `/?p=992` | `/` | 301 |
| `/?p=994` | `/` | 301 |

### → `/contact`

| Legacy path | New path | Type |
|---|---|---|
| `/contact-us/` | `/contact` | 301 |
| `/about-us/` | `/contact` | 301 |
| `/our-story/` | `/contact` | 301 |
| `/depth-of-experience/` | `/contact` | 301 |

### → `/solutions`

| Legacy path | New path | Type |
|---|---|---|
| `/data-solutions/` | `/solutions` | 301 |
| `/data-solutions/business-analytics/` | `/solutions` | 301 |
| `/data-solutions/business-analytics/cognos-analytics/` | `/solutions` | 301 |
| `/data-solutions/business-analytics/cognos-controller/` | `/solutions` | 301 |
| `/data-solutions/business-analytics/planning-analytics/` | `/solutions` | 301 |
| `/data-solutions/data-science/data-science-watson-studio/` | `/solutions` | 301 |
| `/data-solutions/data-science/ibm-spss-modeler/` | `/solutions` | 301 |
| `/data-solutions/data-science/ibm-spss-statistics/` | `/solutions` | 301 |
| `/data-solutions/data-science/predictive-spss/` | `/solutions` | 301 |
| `/data-solutions/enterprise-insights/` | `/solutions` | 301 |
| `/data-solutions/enterprise-insights/cloud-pak-data/` | `/solutions` | 301 |
| `/data-solutions/enterprise-insights/cloud-pak-data-system-with-ibm-performance-server/` | `/solutions` | 301 |
| `/data-solutions/enterprise-insights/ibm-cloud-pak-data/` | `/solutions` | 301 |
| `/data-solutions/enterprise-insights/ibm-datastage-integration/` | `/solutions` | 301 |
| `/data-solutions/hybrid-data-management/` | `/solutions` | 301 |
| `/data-solutions/hybrid-data-management/db2-database/` | `/solutions` | 301 |
| `/data-solutions/hybrid-data-management/db2-warehouse/` | `/solutions` | 301 |
| `/data-solutions/hybrid-data-management/hadoop-data-lakes/` | `/solutions` | 301 |
| `/data-solutions/hybrid-data-management/industry-data-models/` | `/solutions` | 301 |
| `/data-solutions/ibm-business-intelligence-and-analytics/` | `/solutions` | 301 |
| `/data-solutions/ibm-business-intelligence-and-analytics/cognos-analytics/` | `/solutions` | 301 |
| `/data-solutions/ibm-business-intelligence-and-analytics/cognos-controller/` | `/solutions` | 301 |
| `/data-solutions/ibm-business-intelligence-and-analytics/ibm-planning-analytics/` | `/solutions` | 301 |
| `/data-solutions/ibm-business-intelligence-and-analytics/planning-analytics/` | `/solutions` | 301 |
| `/data-solutions/ibm-cloud/` | `/solutions` | 301 |
| `/data-solutions/ibm-cognos-analytics-administration/` | `/solutions` | 301 |
| `/data-solutions/ibm-data-science-platform/` | `/solutions` | 301 |
| `/data-solutions/ibm-data-science-platform/data-science-ibm-watson-studio/` | `/solutions` | 301 |
| `/data-solutions/ibm-data-science-platform/ibm-watson-ai-applications/` | `/solutions` | 301 |
| `/data-solutions/ibm-data-science-platform/predictive-analytics-ibm-spss/` | `/solutions` | 301 |
| `/data-solutions/ibm-data-science-platform/predictive-spss/` | `/solutions` | 301 |
| `/data-solutions/security-intelligence/` | `/solutions` | 301 |
| `/data-solutions/security-intelligence/security-guardium/` | `/solutions` | 301 |
| `/data-solutions/security-intelligence/security-qradar/` | `/solutions` | 301 |
| `/data-solutions/security-intelligence/security-resilient/` | `/solutions` | 301 |
| `/data-solutions/techd-cogsuite/` | `/solutions` | 301 |
| `/data-solutions/unified-governance-and-integration/` | `/solutions` | 301 |
| `/data-solutions/unified-governance-and-integration/data-replication/` | `/solutions` | 301 |
| `/data-solutions/unified-governance-and-integration/information-server/` | `/solutions` | 301 |
| `/data-solutions/unified-governance-and-integration/master-data-management/` | `/solutions` | 301 |
| `/data-solutions/unified-governance-and-integration/watson-knowledge-catalog/` | `/solutions` | 301 |
| `/data-solutions/watson-assisstant-ai-chatbot-transformative-ai-applications-techd-ibm/` | `/solutions` | 301 |
| `/cognos-analytics-ibm-techd-business-intelligence/` | `/solutions` | 301 |
| `/cognos-analytics-upgrade/` | `/solutions` | 301 |
| `/download-free-trial-versions-of-techds-ibm-cogsuite-software-tools/` | `/solutions` | 301 |
| `/harrisburg-cognos-analytics-reporting/` | `/solutions` | 301 |
| `/ibm-data-solutions/` | `/solutions` | 301 |
| `/ibm-turbonomic-cloud-cost-optimization/` | `/solutions` | 301 |
| `/netezza-netezza-performance-server-on-cloud/` | `/solutions` | 301 |
| `/real-time-observability-with-ibm-instana/` | `/solutions` | 301 |
| `/category/ibm-data-solutions/` | `/solutions` | 301 |

### → `/services`

| Legacy path | New path | Type |
|---|---|---|
| `/services/` | `/services` | 301 |
| `/apptio-setup-implementation-services/` | `/services` | 301 |
| `/services/advisory-assessment-services/` | `/services` | 301 |
| `/services/advisory-assessment-services/analytics/` | `/services` | 301 |
| `/services/advisory-assessment-services/data-assessment/` | `/services` | 301 |
| `/services/advisory-assessment-services/security/` | `/services` | 301 |
| `/services/strategy-and-consulting/` | `/services` | 301 |
| `/services/strategy-and-consulting/field-services/` | `/services` | 301 |
| `/services/strategy-and-consulting/implementation/` | `/services` | 301 |
| `/services/strategy-and-consulting/lifecycle-services-and-customer-success/` | `/services` | 301 |
| `/services/strategy-and-consulting/solution-design/` | `/services` | 301 |
| `/services/techd-ibm-ai-data-quick-start-advisory-service/` | `/services` | 301 |
| `/services/techd-ibm-ai-data-quick-start-advisory-services/` | `/services` | 301 |
| `/services/techd-managed-services/` | `/services` | 301 |
| `/services/technology-expertise/` | `/services` | 301 |
| `/services/training/` | `/services` | 301 |

### → `/privacy-policy` _(Day 3 decision pending)_

| Legacy path | New path | Type |
|---|---|---|
| `/privacy-policy/` | `/privacy-policy` | 301 |

### → `/resources` (webinars)

| Legacy path | New path | Type |
|---|---|---|
| `/5-best-practices-to-help-kick-start-your-data-governance-program-live-webinar/` | `/resources` | 301 |
| `/attend-techd-ibm-q4-live-webinar-redefining-customer-care-eu-ibm-ai/` | `/resources` | 301 |
| `/cloud-pak-for-data-with-ibm-performance-server-live-webinar/` | `/resources` | 301 |
| `/cognos-analytics-upgrade-available-december-31st/` | `/resources` | 301 |
| `/cognos-analytics-webinar-jan21/` | `/resources` | 301 |
| `/employ-ibm-planning-analytics-fast-powerful-collaborative-budgeting-forecasting-live-webinar-oct-17-2019/` | `/resources` | 301 |
| `/ibm-cognos-analytics-for-ibm-cloud-pak-for-data-webinar/` | `/resources` | 301 |
| `/ibm-datastage-on-cloud-pak-for-data-webinar-july-22nd/` | `/resources` | 301 |
| `/ibm-planning-analytics-for-cloud-pak-for-data-webinar-oct-27th/` | `/resources` | 301 |
| `/ibm-watson-ai-applications-live-webinar/` | `/resources` | 301 |
| `/ibm-watson-data-science-techd-ibm-live-webinar-oct-6th/` | `/resources` | 301 |
| `/improving-business-foresight-and-performance-with-ibm-planning-analytics-webinar-march-17th/` | `/resources` | 301 |
| `/next-generation-netezza-system-is-here-webinar-april-16th/` | `/resources` | 301 |
| `/protecting-critical-data-with-ibm-security-guardium-solutions-august-21-2018/` | `/resources` | 301 |
| `/smarter-data-protection-with-ibm-security-guardium-solutions-live-webinar-dec-10th-2019/` | `/resources` | 301 |
| `/techd-announces-big-data-webinar-for-healthcare-providers/` | `/resources` | 301 |
| `/techd-ibm-live-webinars-series-july-2020/` | `/resources` | 301 |
| `/techd-live-lunch-and-learn-cognos-analytics-power-bi-comparison/` | `/resources` | 301 |
| `/techd-webinar-big-data-healthcare/` | `/resources` | 301 |
| `/techd-webinar-cognos-analytics-whats-new-improved/` | `/resources` | 301 |
| `/techd-webinar-ibm-big-data-for-retail-may-26-1000-am-1100-am-et/` | `/resources` | 301 |
| `/techd-webinar-spss-healthcare-may-26-2016/` | `/resources` | 301 |
| `/techd-webinar-spss-highered/` | `/resources` | 301 |
| `/techd-webinar-transform-planning-process-ibm-cognos-tm1-june-28-2016-2-3-pm-et/` | `/resources` | 301 |
| `/techd-webinar-webinar-big-data-cloud-for-higher-ed/` | `/resources` | 301 |
| `/watson-knowledge-catalog-activate-data-for-ai-analytics-live-webinar-nov-12-2019/` | `/resources` | 301 |
| `/watson-knowledge-catalog-activate-data-for-ai-analytics-webinar-april-22nd/` | `/resources` | 301 |
| `/webinar-big-data-and-analytics-for-healthcare/` | `/resources` | 301 |
| `/webinar-big-data-what-it-means/` | `/resources` | 301 |
| `/webinar-business-foresight-performance-power-ibm-planning-analytics-march-28th-2019/` | `/resources` | 301 |
| `/webinar-business-foresight-performance-with-the-power-of-ibm-planning-analytics/` | `/resources` | 301 |
| `/webinar-business-foresight-performance-with-the-power-of-ibm-planning-analytics-november-13/` | `/resources` | 301 |
| `/webinar-cognos-analytics/` | `/resources` | 301 |
| `/webinardata-science-new-age-analytics-communications-utilities/` | `/resources` | 301 |
| `/webinardeliver-stronger-business-foresight-and-improve-performance-with-the-power-of-ibm-planning-analytics/` | `/resources` | 301 |
| `/webinar-exclusive-first-look-at-ibm-cognos-analytics-11-1-october-16th-2018/` | `/resources` | 301 |
| `/webinar-future-healthcare-big-data/` | `/resources` | 301 |
| `/webinar-improving-organizational-performance-patient-outcomes-ibm-advanced-analytics-april-24th-2019/` | `/resources` | 301 |
| `/webinar-improving-patient-outcomes-at-childrens-hospital-of-philadelphia-with-ibm-advanced-analytics-june-7-2018/` | `/resources` | 301 |
| `/webinar-introducing-ibm-integrated-analytics-system/` | `/resources` | 301 |
| `/webinar-make-ibm-cognos-analytics-11-1-3-an-integral-part-of-your-analytics-cycle/` | `/resources` | 301 |
| `/webinar-make-ibm-cognos-analytics11-1-an-integral-part-of-your-analytics-cycle/` | `/resources` | 301 |
| `/webinar-predictive-analytics-changing-higher-education/` | `/resources` | 301 |
| `/webinar-protecting-critical-data-ibm-security-guardium-solutions-march-28th-2019/` | `/resources` | 301 |
| `/webinar-run-analytics-faster-iias-ibm-next-generation-analytics-warehouse-feb-21st-2019/` | `/resources` | 301 |
| `/webinar-series-qrt-4-finish-2019-strong-start-2020-even-stronger-techd-ibm-solutions/` | `/resources` | 301 |
| `/webinar-star-analytics/` | `/resources` | 301 |
| `/webinar-transform-retail-with-big-data/` | `/resources` | 301 |
| `/webinar-turn-data-insights-cognos-analytics-r7/` | `/resources` | 301 |
| `/webinar-turn-data-insights-cognos-analytics-r9/` | `/resources` | 301 |
| `/webinar-turn-data-into-insights-cognos-analytics-r10-r11-is-here-june-12-2018/` | `/resources` | 301 |
| `/webinar-unify-your-data-ai-platform-with-cloud-pak-for-data/` | `/resources` | 301 |
| `/webinar-universities-competitive-advantage/` | `/resources` | 301 |
| `/webinar-upgrading-cognos-11/` | `/resources` | 301 |
| `/webinar-whats-new-ibm-infosphere-datastage-v11-7-2/` | `/resources` | 301 |
| `/webinar-whats-new-improved-cognos-analytics/` | `/resources` | 301 |
| `/webinar-whats-new-improved-with-cognos-analytics-r6/` | `/resources` | 301 |
| `/whats-new-in-3-5-cloud-pak-for-data-for-hybrid-cloud-webinar/` | `/resources` | 301 |
| `/whats-new-with-ibm-cognos-analytics-11-1-5-live-webinar-jan-28th/` | `/resources` | 301 |
| `/whats-new-with-ibm-cognos-analytics11-1-6-webinar-may-7th/` | `/resources` | 301 |
| `/whats-new-with-ibm-cognos-analytics-11-2-0-live-webinar/` | `/resources` | 301 |
| `/whats-new-with-ibm-cognos-analytics-11-2-3-live-webinar-nov-29-2022/` | `/resources` | 301 |

### → `/resources` (events / user groups / workshops)

| Legacy path | New path | Type |
|---|---|---|
| `/canada-cognos-user-group-april-19-2016/` | `/resources` | 301 |
| `/charlotte-cognos-user-group-ccug-sep-23-2015/` | `/resources` | 301 |
| `/greater-philadelphia-cognos-user-group-gpcug-sep-29-2015/` | `/resources` | 301 |
| `/new-york-metro-cognos-user-group-march-3-2016/` | `/resources` | 301 |
| `/nymcug-march-2015-meeting/` | `/resources` | 301 |
| `/q1-2018-upcoming-events/` | `/resources` | 301 |
| `/q1-q2-2019-upcoming-events/` | `/resources` | 301 |
| `/q2-2018-upcoming-events/` | `/resources` | 301 |
| `/raleigh-durham-cognos-user-group-march-30-2017/` | `/resources` | 301 |
| `/raleigh-durham-cognos-user-group-rdcug-sep-24-2015/` | `/resources` | 301 |
| `/raliegh-durham-cognos-user-group-march-31-2016/` | `/resources` | 301 |
| `/techd-named-sponsor-emerge-with-resiliency-2020-with-ibm/` | `/resources` | 301 |
| `/techd-workshop-atlanta-big-data-workshop-thursday-march-2-2017-930-100-pm/` | `/resources` | 301 |
| `/techd-workshop-chicago-ibm-cognos-analytics-big-data-workshop-thursday-june-8-2017-30-am-1230-pm-2/` | `/resources` | 301 |
| `/techd-workshop-columbus-oh-ibm-cognos-analytics-big-data-workshop-wednesday-october-25-2017-900-am-1230-pm/` | `/resources` | 301 |
| `/techd-workshop-durham-nc-ibm-cognos-analytics-big-data-workshop-modern-healthcare-organization-tuesday-may-15-2018-900-100-pm/` | `/resources` | 301 |
| `/techd-workshop-nyc-big-data-workshop-tuesday-may-9-2017-900-am-1230-pm/` | `/resources` | 301 |
| `/techd-workshop-nyc-ibm-cognos-analytics-big-data-workshop-for-the-modern-healthcare-organization-wednesday-may-9-2018-900-am-100-pm/` | `/resources` | 301 |
| `/techd-workshop-nyc-ibm-data-warehousing-cognos-analytics-tuesday-november-7-2017-900-am-1230-pm/` | `/resources` | 301 |
| `/techd-workshop-philadelphia-pa-ibm-data-warehousing-cognos-analytics-thursday-november-9-2017-900-am-1230-pm/` | `/resources` | 301 |
| `/techd-workshop-pittsburgh-big-data-workshop-tuesday-march-7-2017-930-100-pm/` | `/resources` | 301 |

### → `/resources` (resource archives + news)

| Legacy path | New path | Type |
|---|---|---|
| `/case-studies/` | `/resources` | 301 |
| `/cognos-analytics-latest-news/` | `/resources` | 301 |
| `/making-data-ready-for-ai-ibm-cloud-pak-for-data-whitepaper/` | `/resources` | 301 |
| `/news-and-events/` | `/resources` | 301 |
| `/news-and-events/user-group-presentations/` | `/resources` | 301 |
| `/news-and-events/white-papers/` | `/resources` | 301 |
| `/resources-big-data-solutions/` | `/resources` | 301 |
| `/resources-big-data-solutions/blogs-and-insights/` | `/resources` | 301 |
| `/resources-big-data-solutions/events-and-webinars/` | `/resources` | 301 |
| `/resources-big-data-solutions/past-events/` | `/resources` | 301 |
| `/resources-big-data-solutions/social-media/` | `/resources` | 301 |
| `/resources-big-data-solutions/success-stories/` | `/resources` | 301 |
| `/resources-big-data-solutions/white-papers/` | `/resources` | 301 |
| `/techd-and-ibm-publications/` | `/resources` | 301 |

### → `/resources` (WordPress category archives)

| Legacy path | New path | Type |
|---|---|---|
| `/category/blogs-and-insights/` | `/resources` | 301 |
| `/category/blogs-and-insights/technical-insights/` | `/resources` | 301 |
| `/category/cognos-user-groups/` | `/resources` | 301 |
| `/category/events/` | `/resources` | 301 |
| `/category/events/current-events/` | `/resources` | 301 |
| `/category/events/event-presentations/` | `/resources` | 301 |
| `/category/events/past-events/` | `/resources` | 301 |
| `/category/publications/` | `/resources` | 301 |
| `/category/success-stories/` | `/resources` | 301 |
| `/category/success-stories/case-studies/` | `/resources` | 301 |
| `/category/techd-news/` | `/resources` | 301 |
| `/category/techd-news/press-releases/` | `/resources` | 301 |
| `/category/webinars/` | `/resources` | 301 |
| `/category/webinars/on-demand-webinars/` | `/resources` | 301 |
| `/category/white-papers/` | `/resources` | 301 |
