# Open Question: Should Support Be a Fifth Service Line?

**Date:** 2026-05-13
**Context:** Services IA rebuild — currently four service lines (Advisory, Implementation, Managed Services, Training)

## The gap

The legacy site had a named page — "Lifecycle Services and Customer Success" — that described reactive, post-implementation support: ongoing help with IBM platforms after a solution is deployed and the team is trained. It was positioned as distinct from proactive managed operations.

In the current 4-service IA, this offering is either folded silently into Managed Services or absent entirely.

## The question

Does TechD sell reactive support contracts (break-fix, IBM escalation, incident response) as a standalone commercial engagement — separate from proactive 24×7 managed operations?

## Option A — Keep 4 service lines

Post-go-live support is a named tier *within* Managed Services. No new route needed. Add a "Support Tiers" section to the Managed Services page describing reactive vs. proactive options and the conditions under which each applies.

**Pros:** Cleaner IA, no new route or content file, aligns with how most enterprise IBM partners structure this commercially.
**Cons:** Support buyers searching for "IBM support" may not find it if it's buried in a Managed Services page.

## Option B — Add a fifth service line: Support

Route: `/services/support`
Scope: time-and-materials or retainer-based reactive support — break-fix, IBM issue escalation, environment health checks, on-call access to certified practitioners. Distinct from Managed Services (proactive, SLA-driven, continuous operations).

**Pros:** Explicit surface for support-seeking buyers; cleaner commercial separation; maps to IBM's own advisory/implementation/support service motion language.
**Cons:** Adds a fifth route, a new content entry in `services.ts`, and a new page component to maintain.

## Decision needed from

PM / Cesar — confirm whether TechD structures support as a distinct commercial offering or bundles it into Managed Services engagements.

## Impact if Option B proceeds

- New entry in `src/content/services.ts` (id: "support")
- New route added to `src/app/routes.tsx` and redirect rule for `/services` → first child updated
- New page: `src/pages/services/Support.tsx`
- Redirect from legacy `/services/strategy-and-consulting/lifecycle-services-and-customer-success/` → `/services/support` (update `docs/REDIRECT-MAP.md`)
- New revision planning doc: `docs/revisions/services/support.md`
