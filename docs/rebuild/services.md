# TechD Services — Rebuild Rationale

**Date:** 2026-05-08
**Based on:** `docs/audit/SERVICES-AUDIT.md`

---

## Structure

The original techd.com services were scattered across multiple nav levels with inconsistent naming. Consolidated into 4 clean top-level service lines:

| Route | Page | Notes |
|---|---|---|
| `/services/advisory` | Advisory | Strategy, assessments, roadmaps |
| `/services/implementation` | Implementation | Deployment, migration, integration |
| `/services/managed-services` | Managed Services | Ongoing operations, monitoring, support |
| `/services/training` | Training | IBM product training, enablement |

## What changed

- All 15+ legacy service sub-pages collapsed into these 4 routes via 301 redirects (`docs/REDIRECT-MAP.md`)
- "Consulting" and "Advisory" were merged — both mapped to `/services/advisory`
- No content was invented; all copy sourced from audited techd.com pages

## What is deferred

- Individual service detail pages (e.g., specific advisory offerings, training catalog) — Phase 2+
- CRM-routed "Talk to an Expert" form tied to service type — Phase 2+
