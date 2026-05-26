# Plan — Add "Infrastructure" practice with IBM Storage Fusion HCI

5th outcome-based practice alongside AI, Data & Analytics, Automation & FinOps, Security & Compliance. Single product at launch: **IBM Storage Fusion HCI**. Implementation-led voice (TechD does not resell hardware). Surfaces everywhere the other 4 practices appear.

---

## 1. Product framing — IBM Storage Fusion HCI

Source: ibm.com/products/storage-fusion

- Hyperconverged appliance bundling Red Hat OpenShift + IBM container-native storage on a rack-ready node cluster
- Purpose-built runtime for Cloud Pak for Data, watsonx, and other containerized AI/data workloads on-prem
- Use cases: data sovereignty, low-latency AI inference, regulated workloads that can't leave the data center, mainframe-adjacent modernization
- TechD positioning: **we implement, integrate, and operate Fusion HCI; the client procures the appliance from IBM.** Page voice = services + architecture, not vendor resale.

---

## 2. Practice definition


| Field           | Value                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| id              | `infrastructure`                                                                                                                          |
| name            | Infrastructure                                                                                                                            |
| route           | `/solutions/infrastructure`                                                                                                               |
| outcome         | Run mission AI and data workloads on-prem with cloud-grade operations — where sovereignty, latency, or regulation rules out public cloud. |
| ctaLabel        | Explore Infrastructure practice                                                                                                           |
| launch products | IBM Storage Fusion HCI (only)                                                                                                             |


---

## 3. File-by-file changes

### Navigation & routing

- `**src/content/site.ts**` — add 5th nav child under Solutions: "Infrastructure — IBM Storage Fusion HCI for on-prem watsonx and Cloud Pak for Data."
- `**src/app/routes.tsx**` — add `/solutions/infrastructure` and product detail route `/solutions/infrastructure/ibm-storage-fusion-hci`
- `**src/pages/solutions/Infrastructure.tsx**` — new page using shared `_PracticePage` composition (same as the other 4)

### Practice content

- `**src/content/solutions.ts**` — append 5th `SOLUTIONS[]` entry with full Product object for Fusion HCI (overview, capabilities, use cases, whyTechD, stats — practitioner voice per CLAUDE.md content rules)
- `**src/content/solutions-extras.ts**` — add `PRACTICE_EXTRAS["infrastructure"]` block: whyTitle, 4 whyPoints, industry proof lines (healthcare data residency, financial services sovereignty, public sector FedRAMP/air-gap, energy & utilities OT proximity), 4-step approach (Discover / Architect / Deliver / Operate)
- `**src/content/practice-motifs.ts**` — add motif/accent entry for `infrastructure`

### Cross-surface updates

- `**src/sections/home/SolutionsGridSection.tsx**` — extend grid from 4 → 5 cards (confirmed by user). Layout becomes 3 across × 2 rows with one card centered on the second row, or 2×2 + 1 — picked at implementation time based on visual balance.
- `**src/content/about.ts**` — Stack section gets a 5th capability card "Infrastructure"; capability bullet + products array updated to include Fusion HCI
- `**src/content/services-extras.ts**` — product coverage tables on Advisory / Implementation / Managed Services / Training get an "Infrastructure" row mentioning Fusion HCI
- `**src/content/chatbot-faq.ts**` — bump product count 22 → 23, add `infrastructure` + `fusion-hci` tags, add "IBM Storage Fusion HCI" to product list, add Q/A pair "Does TechD deploy on-prem appliances? / Yes — we implement IBM Storage Fusion HCI as the runtime for watsonx and Cloud Pak for Data when sovereignty or latency requires on-prem."
- `**.lovable/plan.md**` — append a dated entry recording the new practice and product

### Documentation

- `**docs/rebuild/solutions.md**` — add Infrastructure practice section + Fusion HCI row + route to the route table; clarify this revives a narrower version of the original 5th practice (Fusion HCI only, not IBM Cloud / OpenShift / Mainframe — those remain in scope of other practices or deferred)

---

## 4. Out of scope (explicit)

- IBM Power, IBM Z, IBM FlashSystem, Cloud Pak for Data System — not added now; the practice is designed to absorb them later without IA changes
- Reselling Fusion HCI — voice stays implementation-only
- New 3D figure for the practice page — reuse existing `PracticeWireframeScene` pattern with a new motif variant; no new asset pipeline

---

## 5. Technical notes

- `_PracticePage.tsx` is already practice-agnostic (driven by `Solution.id`) — no changes needed there
- `ProductDetail.tsx` reads from `SOLUTIONS[].products` by slug — Fusion HCI page works automatically once the data is added
- Solutions index redirect (`/solutions` → first child) stays pointed at `ai-generative` — no change
- All content follows existing voice rules: practitioner-to-practitioner, named features only, no superlatives, stats only from documented sources (IBM datasheet, Forrester TEI if available)

---

## 6. Open questions before I build

1. **Practice headline outcome** — proposed: *"Run mission AI and data workloads on-prem with cloud-grade operations."* OK, or do you want it more sovereignty-focused / more AI-focused? answer: more ai focused
2. **Industries to feature on the practice page** — proposing healthcare, financial services, public sector, energy & utilities (the 4 with the strongest "can't go to public cloud" stories). Swap any?  not sure about it, take the better dessition and let me know
3. **Home grid layout when going to 5** — preference between 3+2 (top-heavy) or 2+2+1 (centered last card)? I'll pick visually if you don't care. yes pick it we can change it latter but i think it is better 2 +2 +1
4. &nbsp;