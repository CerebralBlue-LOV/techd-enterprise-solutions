## Goal

Add two new industries — **Financial Services** and **Manufacturing** — so all 32 customer logos have a home on an Industries page. Bring the unmapped 19 in with conservative, public-info-only notes. Cap each industry's clients grid at 12.

## Logo assignments (the 19 unmapped → industries)

**Financial Services (11)** — banks, fintech, payments
```text
Santander · Mizuho · NatWest · Itaú · Banorte
Sicoob · Dah Sing Bank · Banco del Pacífico · BROU
Fiserv · Clip
```

**Manufacturing (6)** — automotive, materials, industrials, rail, bearings, trading conglomerate
```text
Mercedes-Benz · Dow · Seagate · Wabtec · NSK · Itochu
```

**Stays in existing industries (no change):** Healthcare (3), Media & Ent. (3), Insurance (1: MetLife), Energy & Util. (1: TEPSCO), Higher Ed (5), Public Sector (placeholder).

**Still unassigned (2)** — flagged in Logo Lab, not added to any industry until we have a clear vertical:
- Great Day Improvements (home improvement / consumer)
- Vornado Realty Trust (commercial real estate)

These stay in the home `LogoStrip` only.

## File changes

### 1. `src/content/industries.ts` — add two entries
Append after Public Sector:
- `{ id: "financial-services", name: "Financial Services", regulation: "PCI-DSS · SOX · Basel III", outcome: "..." }`
- `{ id: "manufacturing", name: "Manufacturing & Industrials", regulation: "ISO 27001 · NIST CSF", outcome: "..." }`

### 2. `src/content/industries-extras.ts` — add two `INDUSTRIES_EXTRAS` entries
Each gets the same shape as the existing five (`headline`, `lede`, `whyPoints` × 4, `clients` × N, `practices`, `stats`). Conservative public-info notes for each client (e.g. "Santander — Global universal bank, retail and commercial banking.").

Practices mapping:
- **Financial Services** → data-analytics, security-compliance, automation-finops, ai-generative
- **Manufacturing** → data-analytics, automation-finops, security-compliance

### 3. `src/pages/industries/` — two new page files
- `FinancialServices.tsx`
- `Manufacturing.tsx`

Both follow the existing `_IndustryPage` pattern (same sections in the same order as Healthcare.tsx, etc.). No new components.

### 4. `src/app/routes.tsx` — two new routes
- `/industries/financial-services` → `FinancialServices`
- `/industries/manufacturing` → `Manufacturing`

The existing `/industries` redirect still goes to `/industries/healthcare` (no change).

### 5. `src/components/layout/Header.tsx` (and any nav source in `src/content/site.ts`)
Add the two new items to the Industries dropdown so they're navigable.

### 6. `IndustryClientsSection.tsx` — add a 12-logo cap
One-line change: `extras.clients.slice(0, 12)` before mapping. Today no industry exceeds 12 (max is 11), so the cap is a guardrail, not a visible cut.

### 7. `src/pages/LogoLab.tsx` — auto-picks up the new mappings
The Industries Logos QA section already iterates over `INDUSTRIES` × `INDUSTRIES_EXTRAS.clients`, so adding the entries above makes the new groups appear without further edits. Great Day + Vornado will surface as "unassigned" if I add a small "Not in any industry" tail group (small addition, ~15 lines).

## Out of scope
- No new copy beyond the conservative public-info client notes and the two new industry pages' standard sections.
- No nav redesign, no footer changes beyond adding the two industry links.
- No changes to LogoStrip, brand tokens, or shared components.
- No engagement claims for the new clients — public sector / regulated language only.

## Risk + mitigation
- **Risk:** new industry pages look thin without case studies. **Mitigation:** they use the same template as the existing five; copy depth matches what we have for Insurance and Energy & Utilities (also single-client industries today).
- **Risk:** any client objects to being publicly listed. **Mitigation:** conservative notes contain only public-information descriptors, no engagement details. Easy to remove individually from `industries-extras.ts`.

## Deliverable
After the change, `/industries/financial-services` and `/industries/manufacturing` are live, all 30 mappable logos render on at least one industry page, and Logo Lab shows the full assignment (plus the 2 unassigned flagged for later).