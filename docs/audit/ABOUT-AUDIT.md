# TechD — About Us Audit
**Source:** https://techd.com/about-us/, /our-story/, /depth-of-experience/
**Audited:** 2026-05-07
**Method:** Page-by-page `fetch_website` of the three live About-area pages. Cross-referenced against `docs/COPY-SOURCE.md` (homepage source-of-truth) and the Day 2 decision in `docs/CONTENT-AUDIT.md` to fold About into `/contact`.
**Purpose:** Catalog the live About content, fact-check it against what we know is true in 2026, and decide whether the Day 2 "no `/about` route" decision still holds.

---

> **Status legend**
> - ✅ Keep — copy still true in 2026, lift with light edit
> - ⚠️ Refresh — concept fine, copy stale or internally inconsistent
> - ❌ Drop — copy is wrong, broken, or has no substance
>
> **Copy-quality flag**
> - 📄 Substantive · 🪶 Thin · 🚫 Broken

---

## Live About-area structure

```text
About area (no proper hub)
├── /about-us/             — 🪶 Thin (essentially empty)
├── /our-story/            — 📄 Substantive (~261 lines, the real "about" page)
└── /depth-of-experience/  — 📄 Substantive (~138 lines, includes management team)
```

There is **no `/about/` parent route** on the live site. The three pages are siblings, not a hub-and-spoke. Day 2 decision (`docs/CONTENT-AUDIT.md`): all three fold into `/contact`.

---

## 1. `/about-us/`

| Field | Value |
|---|---|
| **Status** | ❌ Drop |
| **Copy quality** | 🪶 Thin |
| **Total content** | 1 H3 tagline + Contact CTA + Featured Clients strip |

The "main" About page has zero About content. Just the company tagline ("TechD is dedicated to helping organizations gain truth from their data") and a Contact button. Whatever real About copy exists lives on `/our-story/` and `/depth-of-experience/`.

**Action:** Don't migrate. Already covered by the homepage hero tagline and the existing `/contact` page.

---

## 2. `/our-story/`

| Field | Value |
|---|---|
| **Status** | ⚠️ Refresh — substantive but contains internal contradiction + dated product list |
| **Copy quality** | 📄 Substantive |
| **Total content** | ~261 lines: company description, mission, solutions overview, product suite (CogSuite), IBM offerings, ~30-name client list |

### Stale / wrong / inconsistent claims

| Claim | Source line | Issue | Truth (2026) |
|---|---|---|---|
| "**IBM Platinum Business Partner** since 2009" | Opening paragraph | ✅ Correct — matches `docs/COPY-SOURCE.md` | Keep |
| "**Premier IBM Business Partner** since 2009" | Solutions section | ❌ **Contradicts the opening paragraph on the same page.** "Premier" is a discontinued IBM tier. | Use **Platinum** everywhere |
| "headquartered in **Miami, FL**" | Who We Are | ✅ Correct (matches `COPY-SOURCE.md`; not Wayne PA as some legacy assets claim) | Keep |
| "IBM AI & ML Offering: Watson Assistant / Watson Discovery / Watson Natural Language Understanding" | Product Suite | ⚠️ Pre-watsonx branding. These products were folded into watsonx.ai / watsonx.assistant. | Rewrite as watsonx |
| "TechD CogSuite (Administrator / Content Manager / License Manager)" | Product Suite | ⚠️ Tied to Cognos Analytics 11.x admin workflows. Cognos 12.x changes the admin model. | Verify with TechD whether CogSuite is still maintained / sold |
| "Big Data Management... **Hadoop & Open-Source Applications**" | Hybrid Data Mgmt | ❌ Hadoop has been deprecated in IBM's stack since BigInsights end-of-life. | Drop or replace with watsonx.data lakehouse |
| "Security Guardium / QRadar / **Tivoli**" | Security Offerings | ❌ Tivoli was decommissioned/rebranded across the IBM portfolio years ago. | Drop Tivoli; Guardium + QRadar are still current |
| "**Watson Applications**" | end-to-end paragraph | ⚠️ Pre-watsonx | Rewrite |

### Reusable snippets (lift into new copy)

- **Opening paragraph** (with "Premier" → "Platinum" fix, watsonx branding update): the "since 2009 / IBM partnership / consulting + solutions + training across multiple industries" framing is solid. Already echoed in `docs/COPY-SOURCE.md`.
- **Mission statement**: "TechD is dedicated to helping organizations gain truth from their data." — already used as homepage tagline. Keep verbatim.
- **Miami HQ + USA/Canada delivery footprint** sentence — clean fact, lift as-is.

### Client list (~30 named on this page)

Useful as a credibility signal but **most are already in the homepage `LogoStrip`**. Cross-check against `src/shared/LogoStrip.tsx` to see which are missing:
- Likely already present: Comcast, Sony (×2), J&J, Princeton, CHOP, Johns Hopkins, L3Harris, DHS, Burlington, Genesis HealthCare, Jefferson Health, Temple Health, Dominion, Pure Insurance, National General, Hamilton Beach, MISO Energy, VCU, Corning CCU, Kennedy Center, KenSeal.
- Possibly missing from the strip: Hamilton Beach, Memorial Sloan Kettering, Quest Diagnostics, Smith College, Villanova University, City of Philadelphia, Affinion, Buckeye, EZ Storage, Thomas Jefferson University. **Action item for the new site:** decide which additional logos to source.

---

## 3. `/depth-of-experience/`

| Field | Value |
|---|---|
| **Status** | ⚠️ Refresh — capabilities copy is reusable; team section needs a product-owner decision |
| **Copy quality** | 📄 Substantive |
| **Total content** | ~138 lines: team capabilities, customer-success blurb, **management team profiles** (×2), Modern Slavery PDF link, clients strip |

### Capabilities copy (top half)

- "10+ years of experience and possess certifications across Big Data and Data Warehouse, Hybrid Cloud, Data Governance, Cognos, Predictive Analytics, and Security tools and software" — ✅ reusable with a watsonx swap.
- "Focus on Customer Success" sub-paragraph — ✅ short, generic, lift-able.

### Management team

The page lists **2 management team profiles** (President; VP of Artificial Intelligence & Managing Partner). Each profile includes a headshot, title, tenure, prior employer, alma mater, and location.

**Names intentionally omitted from this audit doc** — `CLAUDE.md` rule: "No personal names, email addresses, or phone numbers in any file" in this public repo.

**Notable facts captured (no names):**
- Founder/President — co-founded TechD in 2009; IBM Cognos / TM1 / Data Warehousing background; degree from Villanova.
- VP AI / Managing Partner — joined TechD in 2022 after 15 years at IBM in Sales/Engineering for the Data and AI portfolio; based in California; US Naval Academy graduate.

> The 2022 hire of a senior IBM-pedigree AI lead is a **strong credibility signal** for the new positioning ("AI delivery for the Fortune 500"). Worth surfacing in copy without naming the individual: e.g. *"Our AI practice is led by a former IBM Data & AI executive."*

### Decision item: do we re-publish the team section on the new site?

| Option | Pros | Cons |
|---|---|---|
| **A. Drop names entirely** (current scaffold) | Matches public-repo rule. Keeps focus on the company, not individuals. | Loses a real credibility moment (the IBM-pedigree AI hire). |
| **B. Add a `/team` or `/about` page with names + bios** | Standard B2B trust signal. Helps with sales conversations. | Requires moving names out of the public repo (env vars, CMS, or static JSON behind auth) — adds infra. |
| **C. Reference roles only, no names** ("Founder & President", "VP of AI") | Compromise. Public-repo-safe. Surfaces the IBM-pedigree story. | Less personal than full bios. |

**Recommendation: Option C** for launch. Revisit Option B if/when TechD has a CMS or post-launch admin surface.

### Other items on the page

- **Modern Slavery & Anti Human Trafficking Statement (PDF, 2022)** — ⚠️ Compliance artifact. If TechD wants to keep it visible, link from the footer (not About). Update the date or refresh the PDF before re-hosting.
- **Featured Clients strip** — duplicated 3× on the live page (rendering bug). Already handled by `LogoStrip` on the new site.

---

## Cross-cutting findings

1. **The two substantive pages contradict each other on the IBM partner tier.** `/our-story/` says "Platinum" in one paragraph and "Premier" in another. Locked answer: **Platinum since 2009** (verified in `docs/COPY-SOURCE.md` against the IBM-published case study).
2. **Product references are pre-watsonx everywhere.** Watson Assistant / Discovery / NLU / Knowledge Catalog / "Watson Applications" all need to become watsonx.* in any reused copy.
3. **No founding date inconsistency.** "Since 2009" is consistent across pages and matches the IBM-published case study. Safe to use.
4. **No team page on new site by design.** Day 2 (`docs/CONTENT-AUDIT.md`): all three About URLs 301 to `/contact`. This audit confirms `/our-story` has enough substance to *justify* a dedicated `/about` page if we want one — but it's not *required* to migrate the content.

---

## Gaps vs current `/contact` scaffold and `docs/COPY-SOURCE.md`

The current new site has:
- `/contact` page (scaffold) — does not currently include any About copy.
- `docs/COPY-SOURCE.md` — homepage source-of-truth, already covers the Platinum-since-2009 + Miami-HQ + mission claims, but does not have an About copy block.

**Action items if we decide to keep "no `/about` route" (Day 2 decision):**
- Add a short "About TechD" block at the top of `/contact` lifting the corrected `/our-story/` opening paragraph (with "Platinum" + watsonx fixes).
- Optional: a one-line credibility sentence about the AI practice lead (Option C above, no name).
- Move the Modern Slavery PDF to a footer link — don't surface it on `/contact`.

**Action items if we revisit and add an `/about` route:**
- New page consumes: corrected `/our-story/` opening + mission + Miami HQ; `/depth-of-experience/` capabilities paragraph + customer-success blurb; Option C role-only team mention; LogoStrip.
- Out of scope for this audit. Separate decision + build task.

---

## Bottom line

- `/about-us/` — drop, nothing there.
- `/our-story/` — usable opening paragraph + mission + HQ sentence after fact-fixes (Platinum, watsonx, drop Tivoli/Hadoop). Everything else (CogSuite product spec, full IBM portfolio list) is too dated to reuse.
- `/depth-of-experience/` — usable capabilities/customer-success copy. Team section needs a product-owner decision (Option A/B/C above). Modern Slavery PDF moves to footer.
- Day 2 decision (no `/about` route) **still holds** — but with the option to revisit if TechD wants a team page later.
