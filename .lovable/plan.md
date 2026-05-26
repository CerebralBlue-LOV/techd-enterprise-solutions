## Goal

Finish the Infrastructure / Fusion HCI rollout by aligning documentation, legacy URL redirects, and industry-page cross-links with the live IA (5 practices: AI, Data, Automation/FinOps, Security, Infrastructure — Hybrid Cloud has been removed).

---

## 1. Docs sync — `docs/rebuild/solutions.md`

- Replace the "Practice 5 — Hybrid Cloud & Infrastructure" section with a new **Practice 5 — Infrastructure (`/solutions/infrastructure`)** section:
  - Outcome line, scope statement (Fusion HCI only today), sales motion (implementation-only, no resell).
  - Product table with one row: **IBM Storage Fusion HCI** — hyperconverged appliance bundling Red Hat OpenShift + IBM container-native storage + integrated data protection; on-prem runtime for watsonx and Cloud Pak for Data.
  - Note that IBM Power, IBM Z, IBM FlashSystem, and CP4D System are explicitly out of scope today and would be absorbed here later without IA changes.
- Update the 5-practice summary table at the top of the file (row 34): rename "Hybrid Cloud & Infrastructure" → "Infrastructure" with the new one-line outcome.
- Update the URL map block (rows 133, 157–159): drop `/solutions/hybrid-cloud/*` example paths; add `/solutions/infrastructure` and `/solutions/infrastructure/ibm-storage-fusion-hci`.
- Leave the CP4D System exclusion note (row 101) as-is — still correct.

## 2. Redirect map — `docs/REDIRECT-MAP.md`

- Add a small **→ `/solutions/infrastructure`** bucket to the redirect table for the handful of legacy paths that map naturally to the new practice:
  - `/data-solutions/cloud/` → `/solutions/infrastructure`
  - `/data-solutions/enterprise-insights/cloud-pak-data-system-with-ibm-performance-server/` → `/solutions/infrastructure/ibm-storage-fusion-hci`
  - Any `*hybrid-cloud*` slugs currently pointed at `/solutions` get repointed to `/solutions/infrastructure` only when the legacy page was about on-prem CP4D / appliance content; pure "hybrid cloud strategy" pages stay at `/solutions` (the catch-all).
- Update the bucket-summary table counts accordingly and bump the total/footnote.
- Keep the GitHub Pages caveat block at the top unchanged.

## 3. Industry cross-links — `src/content/industries-extras.ts`

Add a 4th `practices[]` entry `{ id: "infrastructure", proof: "…" }` to the four target verticals:

- **healthcare** — proof framed around HIPAA + on-prem PHI runtime for watsonx clinical assistants.
- **financial-services** — proof framed around data-residency / latency / regulatory rulings that keep core workloads off public cloud (covers the former "insurance" target since insurance was folded into FS).
- **public-sector** — proof framed around air-gap / FedRAMP-High / sovereign-cloud needs.
- **energy-utilities** — proof framed around NERC-CIP and OT-adjacent workloads needing on-prem AI/data runtime.

Each proof: one sentence, practitioner voice, names Fusion HCI as the runtime for watsonx / Cloud Pak for Data. No edits to `clients`, `whyPoints`, or `lede`. Other industries (media, higher ed, manufacturing) get no Infrastructure link — not a fit today.

---

## Out of scope

- No code changes to industry page components (`_IndustryPage.tsx` already renders whatever practices the content lists).
- No new redirects file in `public/` — this is doc-only; the live redirect implementation is the deferred Cloudflare Worker.
- No edits to `CLAUDE.md` route table beyond what's already correct.
- Items 4 (Resources stubs), 5 (ProductDetail route), 6 (visual QA) — user confirmed already done / acceptable.

## Files touched

- `docs/rebuild/solutions.md`
- `docs/REDIRECT-MAP.md`
- `src/content/industries-extras.ts`