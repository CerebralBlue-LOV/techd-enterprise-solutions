## Goal

Apply the confirmed May 2026 product schema to the Solutions area:
- **Remove** 9 products + the entire Hybrid Cloud & Infrastructure practice
- **Keep** 15 products as-is (no copy rewrites)
- **Add** 5 new products with full detail pages
- **Reorder** products inside each practice so the home flip-card chips lead with flagship brands

The "KEEP / NEW / REMOVE" labels in your spec are planning-only — no badge UI exists in the codebase, so nothing to strip there.

---

## Final per-practice list (shipped order — first 5 become home-card chips)

**AI & Generative Solutions** (6)
1. watsonx.ai *(keep)*
2. watsonx — platform *(new)*
3. watsonx Orchestrate *(new)*
4. NeuralSeek *(keep, external)*
5. IBM Bob *(new — internal page, vendorUrl `bob.ibm.com`)*
6. IBM SPSS Modeler *(keep)*
— drop watsonx Assistant, IBM Knowledge Catalog

**Data & Analytics** (9)
1. IBM Db2 *(keep)*
2. watsonx.data *(keep — rename card from "watsonx.data / Cloud Pak for Data" to "watsonx.data")*
3. Cloud Pak for Data *(new)*
4. Cognos Analytics *(keep)*
5. Planning Analytics *(keep)*
6. IBM DataStage *(keep)*
7. IBM Netezza Performance Server *(keep)*
8. watsonx.data intelligence *(new)*
9. watsonx.data integration *(new)*
— drop Cognos Controller, IBM MDM

**Automation & FinOps** (3, all keep): Apptio · Instana · Turbonomic

**Security & Compliance** (3)
1. IBM Guardium *(keep)*
2. IBM QRadar *(keep)*
3. IBM Resilient *(keep — relabel as "IBM Resilient (QRadar SOAR)")*
— drop IBM MDM, IBM Data Replication

**Hybrid Cloud & Infrastructure** — *removed entirely*

---

## Changes by file

**`src/content/solutions.ts`**
- Delete the 9 removed product entries.
- Delete the entire `hybrid-cloud` Solution.
- Add 5 new product entries with `name`, `tagline`, `description`, `link` (internal slug), `vendorUrl`, and full `detail` block (overview / capabilities / use cases) drafted in TechD's existing voice.
- Reorder products inside each practice to the order above.
- Rename watsonx.data card title (drop "/ Cloud Pak for Data").
- Update Data & Analytics `description` / `pitch` / `highlights` to reflect the new line-up.
- Update Security & Compliance `description` to drop MDM and Data Replication mentions.

**`src/content/solutions-extras.ts`** — remove `hybrid-cloud` key + `APPROACH_HYBRID`.

**`src/content/practice-motifs.ts`** — remove `hybrid-cloud` motif.

**`src/content/site.ts`** — remove Hybrid Cloud from Solutions nav dropdown and footer.

**`src/app/routes.tsx`**
- Delete `/solutions/hybrid-cloud` route + `HybridCloud` import.
- Redirect `/solutions/hybrid-cloud` and `/solutions/hybrid-cloud/:product` → `/solutions/ai-generative`.
- Add legacy redirects for the 9 removed product URLs → their parent practice page (protects inbound and Google-cached links).

**`src/sections/home/SolutionsGridSection.tsx`**
- Remove `HybridCloudFigure` import + `hybrid-cloud` entry from the `FIGURES` map.
- Switch grid from `lg:grid-cols-3` to `lg:grid-cols-2` so 4 cards lay out cleanly (2×2). Confirm visually after.
- Card chips auto-update from the reordered `SOLUTIONS` array.

**Files to delete**
- `src/pages/solutions/HybridCloud.tsx`
- `src/components/shared/heroFigures/solutions/HybridCloudFigure.tsx`
- Any `hybrid-cloud` branch in `PracticeFigure.tsx`, `PracticeIcon.tsx`, `motifs/index.ts`, `industries-extras.ts`, `services-extras.ts`, `FigureLab.tsx` — strip cleanly so TS compiles.

**Docs**
- Update `docs/rebuild/solutions.md` and `docs/REDIRECT-MAP.md` to match the new schema and redirects.

---

## Out of scope

- No copy rewrites on KEEP products.
- No visible "New" badge anywhere (planning-only labels).
- No changes to home hero/figures beyond what's needed for the build to pass.