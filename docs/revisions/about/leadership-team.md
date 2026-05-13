# Leadership Team

## 1. Extracted & Verified Data

Executive profiles from `/depth-of-experience/`. Names and career details are explicitly permitted in `docs/revisions/` per the CLAUDE.md leadership exception (added 2026-05-13).

**Marc Martina — President**
- Co-founded TechD in 2009.
- IBM Cognos BI, Data Warehousing, TM1, and Big Data implementation specialist. 15+ years consulting.
- Prior roles: Systems architect and partner at ISA Consulting; software engineer at MBNA.
- Education: Computer Engineering, Villanova University.
- IBM domain depth: Cognos Analytics, Planning Analytics (TM1), IBM Db2, Data Warehousing, Big Data implementation.

**Garrett Rowe — VP of Artificial Intelligence & Managing Partner**
- Joined TechD in 2022.
- 15 years at IBM in geo-level Sales and Engineering leadership roles across the IBM Data and AI portfolio.
- Education: US Naval Academy.
- Based in California.
- IBM domain depth: Data & AI portfolio (full IBM side), enterprise sales cycles for IBM Data and AI, watsonx suite adoption.

**Combined leadership coverage:**
- Marc: implementation depth across the full analytics and data stack (17 years).
- Garrett: IBM institutional knowledge — he led the IBM teams that sold and engineered the same products TechD now implements (15 years on the IBM side).
- Together: practitioner depth (Marc) + IBM-side knowledge (Garrett) is a differentiator versus resellers who are commercially certified but lack delivery experience.

## 2. Legacy Data Discarded

- **Headshot URLs** (`techd.com/wp-content/uploads/2022/09/IMG_1361-180x200.jpg`, `techd.com/wp-content/uploads/2024/02/Image-from-iOS-180x200.jpg`) — WordPress media URLs, inaccessible externally. Do not republish. New headshots must be sourced directly.
- **"Sought-after presenter at conferences and events" (Marc)** — unverifiable superlative. Drop.
- **"Passionate about TechD's customer relationships" (Garrett)** — filler. Drop.
- **"Commitment to thinking BIG is the engine driving innovation" (Garrett)** — marketing copy, no factual content. Drop.
- **"Focused on delivering new insights and values" (Garrett)** — generic. Drop.
- **"Modern Slavery & Anti Human Trafficking Statement TechD 2022" PDF link** — a legal compliance document attached to the leadership page on the legacy site. If this is a required disclosure, it belongs in a Legal or Compliance section, not adjacent to executive bios. Do not carry it into the leadership component.
- **Specific California location for Garrett** — geographic detail below the level useful for the site. The company's geographic reach statement (Miami HQ, distributed US/Canada delivery) is sufficient.
- **Photo alt text and WordPress image metadata** — not applicable to the new site.

## 3. 2026 IBM Partner Alignment

Garrett Rowe's 15-year IBM tenure spans the exact period of IBM's product evolution: Watson era → Cloud Pak for Data era → watsonx era. He was inside IBM when TechD's clients were making the decisions we now implement. That institutional knowledge — understanding how IBM's product strategy, pricing, and field teams actually operate — is a concrete differentiator when positioning TechD against generalist SIs who hold IBM certifications but have no IBM-side experience.

Marc Martina's 15+ years of implementation depth covers the full analytics and data stack TechD delivers. Having built the company from a 2009 IBM Cognos specialist practice to a four-practice Platinum partner positions him as the technical continuity behind TechD's delivery record.

Combined: the leadership team covers both sides of every IBM engagement — the IBM field perspective (Garrett) and the customer-side implementation reality (Marc). This is the "why this team" argument for a CIO evaluating IBM Business Partners.

## 4. Content to Update

**No leadership content exists in `src/content/site.ts` or any page component.** This is entirely net-new.

Options for content structure:
1. Add a `LEADERSHIP` export to `src/content/site.ts` — consistent with how `CUSTOMERS` and `NAV` are already structured there.
2. Create a dedicated `src/content/about.ts` module with both `LEADERSHIP` and `COMPANY` exports — cleaner separation if the About section grows beyond two executives.

Recommended: option 2. As the About section expands (company overview, IBM partnership, methodology, leadership), a dedicated content module will be easier to maintain than extending `site.ts`.

**Headshots:**
- WordPress originals are inaccessible. New photos must be sourced from LinkedIn or a fresh shoot.
- File naming convention when added to `src/assets/`: `marc-martina.webp`, `garrett-rowe.webp`. Optimize to ≤80KB at 400×400px.

## 5. Proposed New Sections

**Leadership bio block**
Two cards, one per executive. Format per card: name, title, 2–3 factual sentences (no filler adjectives), headshot. Sentence structure: tenure at TechD + relevant prior role + specific IBM domain depth. Example:

> **Marc Martina — President**
> Marc co-founded TechD in 2009. He has spent 15+ years implementing IBM Cognos Analytics, Planning Analytics, and Db2 environments for healthcare, higher education, and financial services clients. He holds a degree in Computer Engineering from Villanova University.

> **Garrett Rowe — VP of Artificial Intelligence & Managing Partner**
> Garrett joined TechD in 2022 following 15 years at IBM, where he led geo-level Sales and Engineering teams across the IBM Data and AI portfolio. He focuses on TechD's AI practice areas: watsonx.ai, watsonx Orchestrate, and Automation & FinOps. He is a graduate of the US Naval Academy.

**IBM domain coverage attribution**
A brief scannable mapping below the bios: which practice areas each leader is closest to.
- Marc: Data & Analytics (Cognos Analytics, Planning Analytics, IBM Db2), Data Warehousing, Big Data implementation.
- Garrett: AI & Generative Solutions (watsonx.ai, watsonx Orchestrate, watsonx Assistant), Automation & FinOps (Apptio, Turbonomic, Instana).

**"Why this team" paragraph (for CIO audience)**
One focused paragraph, no filler. The argument: "Marc has spent 15+ years on the customer side of IBM implementations. Garrett spent 15 years on the IBM side. Between them, they have been on both ends of every procurement, architecture, and delivery decision TechD's clients face. That is the context behind our advisory engagements." Do not use phrases like "we care about your success" or "we are committed to your outcomes."
