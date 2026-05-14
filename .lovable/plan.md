## Goal

Consolidate Industries from 8 → 7 by folding Insurance into Financial Services, then reorder the dropdown by client strength. Energy & Utilities and Public Sector stay as-is (narrative-led).

## Final shape

| # | Industry | Slug | Logos |
|---|---|---|---|
| 1 | Financial Services & Insurance | `/industries/financial-services` | 12 (11 banking/payments + MetLife) |
| 2 | Healthcare & Life Sciences | `/industries/healthcare` | 3 |
| 3 | Manufacturing & Industrials | `/industries/manufacturing` | 6 |
| 4 | Higher Education & Research | `/industries/higher-education` | 5 |
| 5 | Media & Entertainment | `/industries/media-entertainment` | 3 |
| 6 | Energy & Utilities | `/industries/energy-utilities` | 1 |
| 7 | Public Sector | `/industries/public-sector` | 0 (narrative-only) |

Removed: `Insurance` (slug `/industries/insurance`).

## File changes

### 1. `src/content/industries.ts`
- Reorder array to the 7 entries above.
- Delete the `insurance` entry.
- Rename Financial Services entry: `name` → "Financial Services & Insurance", expand `outcome` to mention carriers + underwriting.
- Update its `regulation` to `"PCI-DSS · SOX · NAIC · Basel III"`.

### 2. `src/content/industries-extras.ts`
- Delete the `insurance` block.
- In `financial-services` block:
  - `headline`: "Banking, payments, and insurance — engineered for the regulator and the customer."
  - `lede`: extend to include carriers / underwriting.
  - Append `MetLife` to `clients` (carries the existing MetLife note).
  - Add 2 new `whyPoints`: one on **Underwriting copilots** and one on **Claims acceleration** (lifted from current Insurance whyPoints) so the carrier story isn't lost.
  - Trim back to 4 whyPoints total (keep "Bank-grade controls", "Payments depth", "Underwriting copilots", "Claims acceleration"; drop "Global reach" and "Fraud and AML" from the list — they survive in the lede).
  - Add an `insurance` proof line to the `practices` mapping if not duplicating banking proof.
  - Update `stats`: 12 named clients, NAIC + SOX + PCI-DSS standards.

### 3. `src/pages/industries/`
- Delete `Insurance.tsx`.
- Rename FS page label is data-driven — no file rename needed (slug stays `financial-services`).

### 4. `src/app/routes.tsx`
- Remove `import Insurance` and its `<Route />`.
- Add a 301-style redirect: `/industries/insurance` → `/industries/financial-services`.
- Keep all other industry routes; the redirect at `/industries` still goes to its first child but **change first-child to `/industries/financial-services`** to match the new order.

### 5. `src/content/site.ts` (nav dropdown)
- Reorder the 6 remaining industry items to the new order, drop the Insurance item, rename the FS label to "Financial Services & Insurance".

### 6. `IndustryClientsSection` cap
- Already capped at 12 — no change needed; FS hits exactly 12.

### 7. Sanity sweep for stale references
- `rg "industries/insurance"` and `rg "\"insurance\""` across `src/content/`, `src/sections/`, `src/pages/` to catch any practice cross-links pointing at the old slug. Most likely hit: solutions-extras `industries[].id === "insurance"` proof entries — repoint those to `"financial-services"` so practice pages still surface the carrier proof.
- Update Logo Lab's "Industries clients section" — auto-picks up new order/grouping; no edit needed.

## Out of scope
- No new copy for Energy & Utilities or Public Sector (kept as-is).
- No nav redesign, no homepage industry-grid changes beyond data reordering.
- No deletion of MetLife from CUSTOMERS.
- No new components.

## Risk + mitigation
- **Risk:** existing inbound links / SEO to `/industries/insurance`. **Mitigation:** add the redirect in `routes.tsx`.
- **Risk:** practice pages (e.g. AI Generative) reference industry id `"insurance"` for cross-sell proof. **Mitigation:** ripgrep sweep in step 7 retargets to `"financial-services"`.

## Deliverable
After the change: 7 industries, FS leads the dropdown with 12 logos including MetLife, carrier-grade story preserved inside the FS page, `/industries/insurance` 301s to `/industries/financial-services`.