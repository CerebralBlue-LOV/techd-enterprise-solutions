# Surface IBM Concert everywhere the Automation & FinOps stack is listed

Concert was added to `src/content/solutions.ts` (4th product + practice description/pitch). But the trio "Apptio · Instana · Turbonomic" is hard-coded in ~15 other places. This plan reviews each surface and updates copy so Concert appears where it belongs — without inflating claims (Concert is preview-stage).

## Audit results — where the trio appears

### A. Will be updated (Concert added)

**Navigation / structural**
1. `src/content/site.ts:28` — navbar dropdown description: `"IBM Apptio, Instana, Turbonomic."` → add Concert.

**Company / About page**
2. `src/content/about.ts:42` — capability bullet listing the three products.
3. `src/content/about.ts:91` — `products: ["IBM Apptio", "IBM Instana", "IBM Turbonomic"]` (the practice "Stack" card you mentioned).
4. `src/content/about.ts:243` — credentials/stack chip `"Apptio · Turbonomic · Instana"`.

**Chatbot FAQ**
5. `src/content/chatbot-faq.ts:58` — "21 IBM products" inventory line + product count.
6. `src/content/chatbot-faq.ts:60` — `tags` array.
7. `src/content/chatbot-faq.ts:81` — Automation & FinOps practice summary.
8. `src/content/chatbot-faq.ts:83` — `tags` array.

**Solutions practice extras (industry proof / approach copy)**
9. `src/content/solutions-extras.ts:38` — "Architect" step (mention Concert governance for cross-domain workflows).
10. `src/content/solutions-extras.ts:96-97` — practice value props (add a 3rd bullet for agentic orchestration).
11. `src/content/solutions-extras.ts:102-103` — industry proof points (light touch — only if natural).

**Services pages (Advisory / Implementation / Managed / Training)**
12. `src/content/services-extras.ts:97` — Managed Services "Optimize" step.
13. `src/content/services-extras.ts:118` — IBM-certified products list.
14. `src/content/services-extras.ts:152` — Advisory "Automate" maturity dimension.
15. `src/content/services-extras.ts:160, 238, 316, 395` — `practice: "Automation & FinOps"` product arrays (Advisory, Implementation, Managed, Training coverage tables).
16. `src/content/services-extras.ts:196, 353` — long product enumerations in section intros.
17. `src/content/services-extras.ts:258, 336, 414` — practice proof lines per service page.
18. `src/content/services-extras.ts:278, 290, 296, 329, 374-375, 407-408` — FinOps/managed/training body copy (add Concert only where it reads natural; Concert is preview, so we won't claim it's running in production engagements).
19. `src/content/services-extras.ts:324` — Managed cross-link blurb.

### B. Will NOT be changed (and why)

- **`src/content/resources.ts:230-238, 324-333, 447-450`** — these are specific past/scheduled webinars and case studies titled around the Apptio/Turbonomic/Instana workflow. Concert wasn't part of those events. Adding it would fabricate event content.
- **`src/sections/home/SolutionsGridSection.tsx`** — already pulls products dynamically from `SOLUTIONS`; Concert appears automatically (caps at 6 with "+N more"). No code change.
- **`src/components/shared/heroFigures/solutions/AutomationFinOpsFigure.tsx`** — visual figure, not product-list-driven. No change.
- **`src/sections/services/ServiceProductCoverageSection.tsx`** — renders from `services-extras.ts` data; updated via the data edits above.

## Voice rules to apply (per CLAUDE.md)

- Concert is preview/2026 — never claim "we run Concert in production today."
- Where the trio is sold as a *delivered* workflow (managed services SLAs, past case studies), keep the trio and add Concert with framing like "tracking IBM Concert as the agentic orchestration layer" or "Concert (preview) for cross-domain workflows."
- Where it's a capability list ("we cover X products"), Concert joins the list cleanly.
- Don't bump claimed product counts in chatbot FAQ unless the new total is accurate (21 → 22).

## Out of scope

- No new routes, components, images, or visual figures.
- No edits to `src/components/ui/`.
- No changes to webinar/case-study content in `resources.ts`.
- No changes to the `solutions.ts` Concert entry itself (already done).

## Open question before I implement

For Managed Services + Implementation product coverage tables (items 15, 18) — do you want Concert listed as a delivered offering with a "(preview tracking)" suffix, or held out of the operational/managed lists entirely until GA and only added to Advisory + Training + capability mentions? Default if you don't specify: **add with "(preview)" suffix in operational lists**, full inclusion in Advisory/Training/About/Navbar/Chatbot.
