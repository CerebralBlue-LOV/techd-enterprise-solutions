## Goal

Add **IBM Concert** as a 4th product under the **Automation & FinOps** practice (`/solutions/automation-finops`), with its own internal detail page at `/solutions/automation-finops/ibm-concert`, matching the depth and voice of the existing Apptio / Instana / Turbonomic entries.

## What Concert is (sourced from ibm.com/products/concert, May 2026)

- **Positioning:** "Agentic IT Ops platform" — unified operational layer that connects signals across apps, infra, network, and cost; uses agentic AI to surface, prioritize, and orchestrate action through governed workflows.
- **Status:** Currently **preview / waitlist** ("Experience the preview" CTA on ibm.com). Not yet GA.
- **Modules:** Concert Observe, Concert Operate, Concert Optimize, Concert Protect, Concert Resilience, Concert Workflows.
- **Use cases:** Prevent (early warning across domains), Resolve (AI-guided root cause + automated remediation), Scale (perf + cost right-sizing across infra/cloud/AI), Govern (vulnerabilities, certs, compliance, change-impact).
- **Fits naturally** in the Automation & FinOps practice — it's the cross-domain orchestration layer that sits over Instana (observability) + Turbonomic (resource action) + Apptio (cost).

## Changes

### 1. `src/content/solutions.ts` — Automation & FinOps practice block (~line 677)

Append a 4th product entry after Turbonomic:

```ts
{
  name: "IBM Concert",
  tagline: "Agentic IT Ops — one operational layer connecting observability, cost, and risk into governed automated action.",
  description: "...",
  link: { kind: "internal", slug: "ibm-concert" },
  vendorUrl: "https://www.ibm.com/products/concert",
  detail: {
    overview: [ /* 2 paragraphs — what Concert is + how TechD delivers it */ ],
    capabilities: [ /* 7 bullets — Observe, Operate, Optimize, Protect, Resilience, Workflows, plus governance/agentic AI */ ],
    useCases: [ /* 4 — Prevent / Resolve / Scale / Govern, framed for regulated enterprises */ ],
    whyTechD: [ /* 4 — Instana→Turbonomic→Apptio→Concert integration story, governance-first rollout, preview/early-access positioning, regulated industry fit */ ],
    stats: [ /* 2 — drawn only from IBM-published material; likely qualitative (e.g. "Preview — 2026" + cross-domain integration claim) since no Forrester TEI exists yet */ ],
  },
},
```

Also update the practice-level `highlights` array (currently 3 bullets) to optionally mention "agentic cross-domain orchestration", and the `pitch` sentence to acknowledge Concert as the connective layer.

### 2. Practice `description` field

Currently lists "IBM Apptio, IBM Instana, IBM Turbonomic — the spend-aware observability and automation stack…". Update to include Concert as the orchestration layer over the three.

### 3. No route / page-component changes needed

`ProductDetail.tsx` already renders any product whose `link.kind === "internal"` and that has a `detail` block. The route `/solutions/automation-finops/ibm-concert` will work automatically once the data is added.

### 4. No image / icon asset needed

Practice pages and product detail pages don't use per-product imagery — they use the shared `PracticeFigure` and typography-led layouts.

## Voice & content rules to apply

- Follow `CLAUDE.md` content rules: practitioner voice, no superlatives, capabilities as `Feature — what it does`, whyTechD in first person ("we configure…"), stats only from IBM-published or Forrester-published sources.
- **Honest preview framing:** Concert is preview/waitlist (May 2026). Copy must not imply TechD has shipped production Concert deployments. Frame as "early-access partner" / "design partner positioning" / "ready when GA lands" — same tone TechD uses for QRadar's on-prem-only framing.
- Lean into the **integration story**: Concert is most compelling for TechD clients who already run Instana + Turbonomic + Apptio. That's the differentiator vs. a generalist SI.

## Out of scope

- No new practice page, no new section component, no nav change.
- No changes to Apptio / Instana / Turbonomic copy (only the practice-level `description` / `pitch` to acknowledge Concert).
- No imagery/figure changes.
- No redirect map changes.

## Questions before I write copy

1. **Preview framing — how forward should we lean?** Three options:
   - **(a) Conservative** — "TechD is tracking IBM Concert through preview; engagements available when GA lands." Lowest risk, weakest pitch.
   - **(b) Design-partner** — "TechD is an early-access partner positioning clients for Concert rollouts as modules reach GA." Stronger, only honest if TechD actually has preview access.
   - **(c) Aggressive** — write as if GA, with a small "currently in preview with IBM" footnote.
   My default would be **(b)** if you confirm TechD has (or is pursuing) preview access; otherwise **(a)**.

2. **Stats slot** — Concert has no Forrester TEI or Gartner MQ yet. Options:
   - Leave `stats` empty (the ProductCtaSection / hero handles missing stats gracefully — I'd verify).
   - Use qualitative stats like `{ value: "6 modules", label: "Observe · Operate · Optimize · Protect · Resilience · Workflows" }` and `{ value: "Preview 2026", label: "IBM Concert availability" }`.
   - Borrow the Instana/Turbonomic numbers as "stack-level" stats (not honest — I wouldn't recommend).
   My default: **qualitative stats** unless you'd rather leave it empty.

3. **Should I also add Concert as a cross-link** from the Instana, Turbonomic, and Apptio detail pages' `whyTechD` or related-products section? It strengthens the cross-sell story, but it touches three other product entries. Default: **yes, add Concert to `ProductRelatedSection` automatically** (already practice-scoped, no code change), and **leave the existing whyTechD bullets alone**.
