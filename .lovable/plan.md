# Homepage content pass — refresh audit, then rewrite copy

## Why this is two phases, not one

The current homepage copy was written from a generic "IBM Platinum partner" sketch. Before rewriting, we need to lock down what's actually true about TechD **today** vs. what's stale from the 2020 WordPress site. I pulled the live legacy pages and an IBM case-study blog post co-authored by TechD to separate fact from drift.

**What I confirmed is current (use it):**

- IBM Platinum Business Partner since 2009 (verified, both `/our-story` and IBM case study)
- HQ: Miami, FL (per `/our-story`) — *not* "Wayne, PA" as the old press release claims
- Resources across USA + Canada
- Real 2024 productized stack: **IBM Db2 + watsonx Assistant + NeuralSeek** (gen-AI / RAG focus, per ibm.com/case-studies/blog)
- Co-authored IBM case study with Cerebral Blue (Garrett Rowe) + Scott Nichols (TechD Sr. Developer Analyst) — recent, real
- Real client list (verified on `/our-story`): Burlington, CHOP, Comcast, Genesis HealthCare, Hamilton Beach, Johns Hopkins, J&J, L3Harris, **Memorial Sloan Kettering**, **Quest Diagnostics**, Smith College, Villanova, **City of Philadelphia**, Jefferson, VCU Health, Temple, **Affinion**, PURE Insurance, **Buckeye**, Princeton, **EZ Storage**

**What is stale and must be dropped or de-emphasized:**

- "CogSuite" tools for Cognos Analytics — 2015-era product, not the story we want to lead with in 2026
- Heavy Cognos / TM1 / Netezza / Tivoli / QRadar Guardium emphasis — IBM has rebranded most of this under watsonx + Cloud Pak; lead with watsonx, mention legacy as "modernization"
- Watson Assistant / Discovery / NLU as separate products — they are now **watsonx Assistant** and watsonx.ai
- "since 2009" + "25+ years" — pick one. 2009→2026 = 17 years. Fix the inconsistency. Recommend **"15+ years as an IBM Platinum partner"**
- "Premier IBM Business Partner" language — IBM retired the Premier tier; "Platinum" in the new IBM Partner Plus program is correct
- Old "watsonx isn't available right now" chatbot code in old site — not relevant
- "62% faster, $18M savings, 11wk to first agent" pharma stat block on current homepage — **invented placeholder, not in any source**. Either replace with the real Db2 + watsonx + NeuralSeek retail case (family-owned US retailer) or remove until a real client lets us name them.

---

## Phase 1 — Refresh the audit docs (grounded in 2024–2026 reality)

### `docs/CONTENT-AUDIT.md` updates

- Add a "Content freshness" section noting which legacy pages are stale (2020 product framing) vs. still-valid (client list, IBM partnership, mission).
- Append a new "Verified 2024–2026 facts" subsection citing the IBM case-study blog as the source of truth for the current product story.
- Flag which `/our-story` claims to keep vs. drop in the rewrite.

### New file: `docs/COPY-SOURCE.md`

Single source-of-truth for approved copy snippets, organized by homepage section. Each block tagged `verified` (from live legacy + IBM blog), `inferred` (reasonable extension), or `placeholder` (needs PO sign-off). This is what the homepage actually pulls from — no invented stats.

### `docs/progress.md`

Append Day 3 log entry: audit refresh complete, homepage rewrite kicked off.

---

## Phase 2 — Homepage copy pass (`src/pages/Index.tsx` + `src/content/*`)

Section-by-section rewrite using only verified or inferred copy. No invented stats.

### 1. Hero

- **Eyebrow:** "IBM Platinum Business Partner · Since 2009"
- **Headline:** "Turn enterprise data into trustworthy AI."  *(directly from TechD's verified mission "help organizations gain truth from their data," modernized for the gen-AI era)*
- **Subhead:** "We design, build, and run secure AI, data, and hybrid cloud systems for Fortune 500 healthcare, media, energy, and public sector organizations — on IBM watsonx, Db2, and the open stack around them."
- **CTAs:** primary "Talk to a principal" → `/contact`, secondary "See our solutions" → `/solutions`

### 2. LogoStrip — already done, no changes

### 3. Solutions grid — rewrite `src/content/solutions.ts`

Reframe around what TechD actually delivers in 2026 (per IBM blog + audit), not generic "5 practices":

- **AI & Generative Solutions** — watsonx Assistant + NeuralSeek RAG, agentic workflows, enterprise knowledge retrieval
- **Data Platforms** — IBM Db2, lakehouse, governance, AI-ready data products (replaces "Data Solutions")
- **Hybrid Cloud** — IBM Cloud + AWS/Azure landing zones, OpenShift, mainframe integration
- **Security & Governance** — Guardium, identity, zero-trust for regulated industries
- **Analytics Modernization** — Cognos → watsonx.ai migration, BI modernization (this is where the legacy Cognos expertise becomes a *modernization* story, not the headline)

### 4. Industries grid — `src/content/industries.ts`

Keep the 6 verticals but rewrite each `outcome` line to match a real client + a concrete capability. Examples:

- Healthcare → "Trusted by Johns Hopkins Medicine, CHOP, Jefferson, Genesis. HIPAA-grade data platforms and clinical knowledge agents."
- Media & Entertainment (new — split out, justified by Sony Pictures + Sony Interactive + Comcast/Peacock)
- Insurance → "PURE, National General. Underwriting and claims acceleration."
- etc.

### 5. Featured proof section — replace the invented pharma stat block

Two options for PO to choose from:

- **Option A (recommended):** Use the real, IBM-published joint case — gen AI + Db2 + watsonx Assistant + NeuralSeek for a US family-owned retailer. Pull a quote and the three concrete capability bullets from the IBM blog. Link to the IBM case-study URL.
- **Option B:** Replace stat cards with a "Built on IBM" diagram — Db2 + watsonx Assistant + NeuralSeek logos + 3 capability bullets. No fake numbers.

### 6. Why TechD — keep section, refresh copy

- "Senior people on the keyboard" → keep, true to TechD's positioning
- "Built for regulators" → keep
- "Outcome contracts" → soften to "Outcome-aligned engagements" (no source for fixed-price guarantee)
- "IBM-deep, multi-cloud fluent" → keep, list watsonx, Db2, OpenShift, AWS, Azure
- IBM Platinum badge: "15+ years · Platinum since 2009" (fix the year math)

### 7. Final CTA — keep structure, tighten copy

- Headline: "Talk to a TechD principal."
- Subhead: "30-minute conversation. No sales pass-through, no slide deck. Just engineering."
- CTA: "Start the conversation" → `/contact`

### 8. SEO tag

- Title: "TechD — IBM Platinum Partner for Enterprise AI, Data & Hybrid Cloud"
- Description: "TechD has helped Fortune 500 enterprises turn data into trustworthy AI since 2009. IBM Platinum Business Partner specializing in watsonx, Db2, hybrid cloud, and security for regulated industries."

---

## Files touched

- `docs/CONTENT-AUDIT.md` — add freshness section + verified-facts block
- `docs/COPY-SOURCE.md` — **new**, source-of-truth for approved homepage copy
- `docs/progress.md` — Day 3 log entry
- `src/pages/Index.tsx` — section copy + stat block + SEO
- `src/content/solutions.ts` — reframe 5 practices around watsonx + Db2 reality
- `src/content/industries.ts` — real client names per vertical, concrete outcomes
- `src/content/site.ts` — minor: confirm `CUSTOMERS` ordering matches "most recognizable first" if PO wants

---

## What I will NOT do without PO sign-off

- Invent any new client names, dollar figures, percentages, or timelines
- Name a specific client in a quote unless it's already public (the IBM blog is public; anything else needs approval)
- Change the LogoStrip (just shipped)
- Touch the Cloudflare Worker / contact form (Day 4 work)

---

## Two questions before build mode

1. **The pharma stat block** — replace with real IBM/NeuralSeek retail case (Option A) or with a "Built on IBM" capability block (Option B)? Go with option A
2. **Tagline direction** — go with the modernized mission *"Turn enterprise data into trustworthy AI"*, or stay closer to the original *"Helping organizations gain truth from their data"*? Modernized vision

Approve the plan and I'll start with the audit refresh, then the homepage rewrite — answer those two when you approve and I'll build the right variant.