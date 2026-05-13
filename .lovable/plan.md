
# Preview the new Resources content

Goal: see all the new Case Studies, Blog, Webinars, and Events entries rendered in the live preview without claiming they're production-ready.

## Approach

Temporarily set `draft: false` on every new entry in `src/content/resources.ts`. This is a one-file edit — the page components and routes are already wired up. Nothing else moves.

Important: this is a **preview-only** change. PM/legal sign-off is still required before this state is acceptable for the public site, so this edit must be reverted (or selectively flipped back to `draft: true`) before shipping. I'll add a clear `// PREVIEW ONLY — revert before publish` comment block at the top of the file so we can find and undo it in one step.

## What gets flipped

All entries currently marked `draft: true` in `src/content/resources.ts`:

**Case Studies (7)**
- Pharma sales/marketing Cognos · Hospital data warehouse · Cancer treatment center BI · University Cognos rollout · Communications firm Planning Analytics · Insurance claims modernization · R1 university research cloud

**Blog (9)**
- Agentic AI operating model · watsonx governance · Zero-trust · DataStage → watsonx.data · Cognos 12 vs. 11.2 cutoff · FinOps loop (Apptio + Turbonomic + Instana) · watsonx Orchestrate + ERP · Planning Analytics 2.1 · SPSS Modeler AutoML

**Webinars (7)**
- AI agents that pass an audit · Data lake to data product · NeuralSeek RAG · Turbonomic + Instana · Planning Analytics 2.1 migration · Guardium DDR · Cognos 12 agentic BI

**Events (5)**
- IBM Think 2026 · NYC Enterprise AI roundtable · Lunch & Learn watsonx.ai · Workshop data governance · Roundtable FinOps

The single already-published case study (US retailer / Db2 / watsonx Assistant / NeuralSeek) is unaffected.

## What you'll see after the change

- `/resources/case-studies` → 8 cards (1 real + 7 previewed)
- `/resources/blog` → 9 cards with tag chips
- `/resources/webinars` → 7 cards with product chips
- `/resources/events` → 5 cards with format + location

Each card links to its detail page (`/resources/<type>/<slug>`) using the layout already built last turn.

## Reverting later

When you're ready to lock back to "drafts hidden":
- Either delete the preview edit (one revert)
- Or selectively re-flip individual entries back to `draft: true` as PM approves them one by one

## Out of scope for this preview pass

- No copy edits, no real dates/locations/registration links, no real client names
- No new pages, components, or routes (already in place)
- No changes to the published case study

## Files touched

- `src/content/resources.ts` only.
