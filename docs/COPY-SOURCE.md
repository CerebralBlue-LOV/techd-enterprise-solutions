# Homepage Copy — Source of Truth

**Purpose:** Single approved source for every line of copy on `/`. No invented stats, no unverifiable client quotes. The homepage component pulls from this doc; if it's not here, it's not on the page.

**Tags**
- `verified` — pulled from live techd.com legacy pages or IBM-published material
- `inferred` — reasonable modernization of verified content (e.g., "Watson Assistant" → "watsonx Assistant")
- `placeholder` — needs PO sign-off before going live

**Sources**
- `https://techd.com/our-story/` (legacy, 2020 vintage)
- `https://techd.com/about-us/` (legacy)
- `https://techd.com/depth-of-experience/` (legacy)
- `https://www.ibm.com/case-studies/blog/ibm-and-techd-partner-to-securely-share-data-and-power-insights-with-gen-ai` (IBM, recent — co-authored by TechD)

---

## 1. Hero (`home:hero`)

| Slot | Copy | Tag |
|---|---|---|
| Eyebrow | `IBM Platinum Business Partner · Since 2009` | verified |
| Headline | `Turn enterprise data into trustworthy AI.` | inferred (modernization of TechD mission "gain truth from their data") |
| Subhead | `We design, build, and run secure AI, data, and hybrid cloud systems for Fortune 500 healthcare, media, energy, and public sector organizations — on IBM watsonx, Db2, and the open stack around them.` | inferred |
| CTA primary | `Talk to a principal` → `/contact` | placeholder |
| CTA secondary | `See our solutions` → `/solutions` | placeholder |

---

## 2. Solutions grid (`home:solutions`) → `src/content/solutions.ts`

Five practices, reframed around the 2024–2026 IBM stack TechD actually delivers.

### AI & Generative Solutions (`ai-automation`)
- **Outcome:** `Ship trustworthy gen AI on top of governed enterprise data.`
- **Description:** `Production RAG, agentic workflows, and conversational interfaces built on IBM watsonx Assistant, watsonx.ai, and NeuralSeek — grounded in your data, not the open web.`
- **Capabilities:** watsonx Assistant + NeuralSeek RAG · Agentic workflows on watsonx.ai · Enterprise knowledge retrieval · MLOps and model governance
- Tag: inferred (verified IBM stack)

### Data Platforms (`data`)
- **Outcome:** `Make your data AI-ready, governed, and defensible.`
- **Description:** `IBM Db2, lakehouse, and data fabric architectures — the foundation that decides whether your AI tells the truth.`
- **Capabilities:** IBM Db2 + watsonx.data lakehouse · Data fabric and unified governance · Master data and lineage · AI-ready data products
- Tag: inferred

### Hybrid Cloud (`cloud`)
- **Outcome:** `Run mission workloads where they belong — and move them when you need to.`
- **Description:** `Hybrid landing zones across IBM Cloud, AWS, Azure, and on-prem, with OpenShift and mainframe integration where it matters.`
- **Capabilities:** Hybrid + multi-cloud strategy · Red Hat OpenShift · Landing zone and FinOps · Mainframe (Z) integration
- Tag: inferred

### Security & Governance (`security`)
- **Outcome:** `Pass the audit. Survive the breach attempt.`
- **Description:** `Identity, zero-trust, and data protection programs designed for HIPAA, FedRAMP, PCI, and the next regulator on the horizon.`
- **Capabilities:** IBM Guardium data protection · Identity and access modernization · Zero-trust network architecture · Compliance and audit readiness
- Tag: inferred

### Analytics Modernization (`app-mod`)
- **Outcome:** `Modernize Cognos, TM1, and legacy BI without breaking the business.`
- **Description:** `Fifteen years of Cognos, TM1, and Netezza in production — now used to migrate clients to watsonx.ai, lakehouse, and modern BI without losing institutional knowledge.`
- **Capabilities:** Cognos → watsonx.ai migration · TM1 / Planning Analytics modernization · BI consolidation · Custom Cognos SDK extensions
- Tag: verified (TechD's actual deepest expertise per `/our-story`)

---

## 3. Industries grid (`home:industries`) → `src/content/industries.ts`

Each line names verified clients from `/our-story`.

### Healthcare & Life Sciences (`healthcare`)
- **Outcome:** `HIPAA-grade data platforms and clinical knowledge agents. Trusted by Johns Hopkins Medicine, CHOP, Jefferson Health, Temple Health, Genesis HealthCare, Memorial Sloan Kettering, and Quest Diagnostics.`
- Tag: verified

### Media & Entertainment (`media`) — **NEW vertical**
- **Outcome:** `AI-powered content, audience, and operations platforms. Trusted by Sony Pictures, Sony Interactive Entertainment, and Comcast / Peacock.`
- Tag: verified (clients listed on `/about-us`)

### Insurance (`insurance`)
- **Outcome:** `Underwriting copilots, claims acceleration, actuarial analytics. Trusted by PURE Insurance, National General, and Affinion.`
- Tag: verified

### Energy & Utilities (`energy`)
- **Outcome:** `Grid analytics, asset performance, and OT/IT security. Trusted by Dominion Energy and MISO.`
- Tag: verified

### Higher Education & Research (`education`)
- **Outcome:** `Research computing, identity, and student data platforms. Trusted by Princeton, Johns Hopkins, Villanova, Smith College, VCU Health, and Temple.`
- Tag: verified

### Public Sector (`public`)
- **Outcome:** `Auditable AI and modernized records for mission delivery. Trusted by DHS, the City of Philadelphia, and L3Harris.`
- Tag: verified

> **Removed:** generic "Financial Services" — TechD has no verified Fortune 500 banking client on the public list. Replaced with Media & Entertainment, which has three.

---

## 4. Featured proof (`home:case-study`) — Option A (approved)

Replace the invented pharma stat block with the **real, IBM-published joint case** (Db2 + watsonx Assistant + NeuralSeek for a US family-owned retailer).

| Slot | Copy | Tag |
|---|---|---|
| Eyebrow | `Featured Case · Published by IBM` | verified |
| Headline | `A US family-owned retailer rebuilt online shopping on IBM Db2, watsonx Assistant, and NeuralSeek.` | verified (paraphrase of IBM blog) |
| Capability 1 | `Personalized product descriptions delivered through retrieval-augmented generation.` | verified |
| Capability 2 | `Call-center efficiency gains and reduced customer frustration.` | verified |
| Capability 3 | `Real-time insight into shopper behavior across virtual and in-store channels.` | verified |
| Quote | *(omit — no public attributable quote in the source. Replace with byline note below.)* | n/a |
| Byline | `Co-authored by Scott Nichols, Senior Developer Analyst at TechD, and Garrett Rowe, President of Cerebral Blue.` | verified |
| CTA | `Read on IBM.com` → `https://www.ibm.com/case-studies/blog/ibm-and-techd-partner-to-securely-share-data-and-power-insights-with-gen-ai` | verified |

> **No invented numbers.** No "62%", no "$18M", no "11 weeks". If PO later approves named-client metrics we'll add them here first.

---

## 5. Why TechD (`home:why-techd`)

| Card | Title | Body | Tag |
|---|---|---|---|
| 1 | `Senior people on the keyboard` | `Principals deliver, not just sell. TechD's technical team averages 10+ years of certified IBM delivery experience.` | verified (`/depth-of-experience`) |
| 2 | `Built for regulators` | `Auditable AI, governed data, and defensible architecture across HIPAA, FedRAMP, and PCI environments.` | inferred |
| 3 | `Outcome-aligned engagements` | `We commit to business outcomes — not staff augmentation hours.` | placeholder (soft claim, no fixed-price guarantee implied) |
| 4 | `IBM-deep, multi-cloud fluent` | `watsonx, Db2, OpenShift, and Z — plus AWS, Azure, and GCP at enterprise scale.` | verified |

**IBM badge:** `Platinum · IBM Business Partner` / `15+ years · Platinum since 2009` (fix the "25+ years" inconsistency)

---

## 6. Final CTA (`home:final-cta`)

| Slot | Copy | Tag |
|---|---|---|
| Eyebrow | `Ready to talk?` | placeholder |
| Headline | `Talk to a TechD principal.` | placeholder |
| Subhead | `30-minute conversation. No sales pass-through, no slide deck. Just engineering.` | placeholder |
| CTA | `Start the conversation` → `/contact` | placeholder |

---

## 7. SEO (`<SEO>` on `/`)

| Slot | Copy |
|---|---|
| Title | `TechD — IBM Platinum Partner for Enterprise AI, Data & Hybrid Cloud` |
| Description | `TechD has helped Fortune 500 enterprises turn data into trustworthy AI since 2009. IBM Platinum Business Partner specializing in watsonx, Db2, hybrid cloud, and security for regulated industries.` |

---

## Pending PO decisions

1. Tagline `Turn enterprise data into trustworthy AI` — **approved (modernized direction)**
2. Featured case format — **approved Option A (real IBM-published case)**
3. "Outcome-aligned engagements" wording — confirm we're comfortable with this softer framing vs. "outcome contracts"
4. Adding **Media & Entertainment** as a 6th industry (replaces "Financial Services") — confirm
5. HQ: switch homepage / footer to **Miami, FL** (per `/our-story`) — confirm
