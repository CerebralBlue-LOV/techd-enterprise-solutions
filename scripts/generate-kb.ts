/**
 * KB generator for the NeuralSeek techd-website instance.
 *
 * Usage:   npm run kb:build
 * Output:  dist/kb/*.md  (gitignored — dist/ is excluded)
 * Upload:  drag dist/kb/ folder into the NeuralSeek admin knowledge tab
 *          at https://staging.neuralseek.com/techd-website/
 *
 * Relative imports are intentional — tsx (esbuild) does not resolve Vite @-aliases.
 */

import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { SOLUTIONS } from "../src/content/solutions.js";
import { PRACTICE_EXTRAS } from "../src/content/solutions-extras.js";
import { SERVICES } from "../src/content/services.js";
import { SERVICES_EXTRAS } from "../src/content/services-extras.js";
import { INDUSTRIES } from "../src/content/industries.js";
import { INDUSTRIES_EXTRAS } from "../src/content/industries-extras.js";
import { RESOURCES } from "../src/content/resources.js";
import {
  COMPANY_FACTS,
  PRACTICE_AREAS,
  PORTFOLIO_BY_PRACTICE,
  LEADERSHIP,
  ENGAGEMENT_STAGES,
  IBM_PLATFORM_ASSESSMENT,
  COMPLIANCE_FRAMEWORKS,
  SAME_PRACTITIONERS_COMMITMENT,
  WHY_THIS_TEAM,
} from "../src/content/about.js";
import { CONTACT, NAV } from "../src/content/site.js";
import { CHATBOT_FAQ } from "../src/content/chatbot-faq.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUT_DIR = join(__dirname, "..", "kb");

mkdirSync(OUT_DIR, { recursive: true });

function emit(filename: string, content: string) {
  writeFileSync(join(OUT_DIR, filename), content.trimStart(), "utf-8");
  console.log(`  ✓  ${filename}`);
}

function bullets(items: string[]): string {
  return items.map((s) => `- ${s}`).join("\n");
}

function sections<T>(items: T[], fn: (item: T) => string): string {
  return items.map(fn).join("\n\n");
}

// ─── 00 — Site meta ──────────────────────────────────────────────────────────

emit(
  "00-site-meta.md",
  `---
title: TechD — Site Overview and Contact Information
route: /
source: src/content/site.ts
---

# TechD — Enterprise AI, Data, Security & Automation

TechD is an IBM Gold Business Partner specializing in enterprise AI, data analytics, automation, FinOps, and security for Fortune 500 organizations. Founded in ${CONTACT.ibmPartnerSince}, headquartered in ${CONTACT.address.city}, ${CONTACT.address.state}.

## Contact TechD

- **Phone:** 888-98-TECHD (888-988-3243)
- **Response SLA:** ${CONTACT.responseSla}
- **Contact form:** /contact

## Navigation — Key Practice Areas

${NAV.map((item) =>
  `### ${item.label}\n${(item.children ?? []).map((c) => `- [${c.label}](${c.href})${c.description ? ` — ${c.description}` : ""}`).join("\n")}`
).join("\n\n")}
`,
);

// ─── 01 — Home ───────────────────────────────────────────────────────────────

emit(
  "01-home.md",
  `---
title: TechD Home — IBM Gold Partner for Enterprise AI, Data & Hybrid Cloud
route: /
source: src/content/solutions.ts, src/content/about.ts
---

# TechD — Enterprise AI, Engineered for Outcomes

TechD has helped Fortune 500 enterprises turn data into trustworthy AI since 2009. IBM Gold Business Partner specializing in watsonx, Db2, hybrid cloud, and security for regulated industries.

## Our Four Solution Practices

${sections(SOLUTIONS, (s) => `### ${s.name}\n${s.outcome}\n\n${s.description}`)}

## Why TechD

${WHY_THIS_TEAM}

${SAME_PRACTITIONERS_COMMITMENT}

## Key Facts

${COMPANY_FACTS.map((f) => `- **${f.label}:** ${f.value}`).join("\n")}

## Compliance Frameworks We Deliver Against

${COMPLIANCE_FRAMEWORKS.map((f) => `- **${f.framework}** (${f.industry}) — ${f.detail}`).join("\n")}
`,
);

// ─── 10–13 — Solutions practice pages ────────────────────────────────────────

const SOLUTION_FILE_PREFIXES: Record<string, string> = {
  "ai-generative":      "10-solutions-ai-generative",
  "data-analytics":     "11-solutions-data-analytics",
  "automation-finops":  "12-solutions-automation-finops",
  "security-compliance":"13-solutions-security-compliance",
};

for (const solution of SOLUTIONS) {
  const prefix = SOLUTION_FILE_PREFIXES[solution.id];
  if (!prefix) continue;
  const extras = PRACTICE_EXTRAS[solution.id];

  const whySection = extras
    ? `## Why TechD for ${solution.name}\n\n${extras.whyTitle}\n\n${extras.whyPoints.map((p) => `**${p.title}** — ${p.body}`).join("\n\n")}`
    : "";

  const approachSection = extras
    ? `## Our Approach\n\n${extras.approach.map((a) => `**${a.step}** — ${a.detail}`).join("\n\n")}`
    : "";

  const industriesSection = extras?.industries?.length
    ? `## Industry Applications\n\n${extras.industries.map((i) => `- **${i.id}:** ${i.proof}`).join("\n")}`
    : "";

  const productsSection = `## Products in This Practice\n\n${sections(
    solution.products,
    (p) => {
      const lines = [`### ${p.name}`, `**Tagline:** ${p.tagline}`, p.description];
      if (p.detail?.capabilities?.length) {
        lines.push(`\n**Capabilities:**\n${bullets(p.detail.capabilities)}`);
      }
      if (p.detail?.useCases?.length) {
        lines.push(`\n**Use cases:**\n${bullets(p.detail.useCases)}`);
      }
      if (p.detail?.whyTechD?.length) {
        lines.push(`\n**Why TechD delivers this:**\n${bullets(p.detail.whyTechD)}`);
      }
      return lines.join("\n\n");
    },
  )}`;

  const ownToolsSection = solution.ownTools?.length
    ? `## TechD-Built Tools\n\n${sections(solution.ownTools, (p) => `### ${p.name}\n${p.tagline}\n\n${p.description}`)}`
    : "";

  emit(
    `${prefix}.md`,
    `---
title: ${solution.name} — TechD
route: /solutions/${solution.id}
source: src/content/solutions.ts#${solution.id}
---

# ${solution.name}

> ${solution.outcome}

${solution.description}

${productsSection}
${ownToolsSection ? `\n${ownToolsSection}` : ""}
${whySection ? `\n${whySection}` : ""}
${industriesSection ? `\n${industriesSection}` : ""}
${approachSection ? `\n${approachSection}` : ""}
`,
  );
}

// ─── 20-x — Individual product detail pages ──────────────────────────────────

let productIndex = 0;
for (const solution of SOLUTIONS) {
  for (const product of solution.products) {
    if (product.link.kind !== "internal") continue;
    const slug = product.link.slug;
    const filename = `20-product-${slug}.md`;
    const detail = product.detail;

    emit(
      filename,
      `---
title: ${product.name} — TechD
route: /solutions/${solution.id}/${slug}
source: src/content/solutions.ts#${solution.id}/${slug}
practice: ${solution.name}
---

# ${product.name}

> ${product.tagline}

${product.description}

${detail?.overview ? `## Overview\n\n${detail.overview.join("\n\n")}` : ""}

${detail?.capabilities?.length ? `## Capabilities\n\n${bullets(detail.capabilities)}` : ""}

${detail?.useCases?.length ? `## Use Cases\n\n${bullets(detail.useCases)}` : ""}

${detail?.whyTechD?.length ? `## Why TechD\n\n${bullets(detail.whyTechD)}` : ""}

${detail?.stats?.length ? `## Key Facts\n\n${detail.stats.map((s) => `- **${s.label}:** ${s.value}`).join("\n")}` : ""}

${product.vendorUrl ? `**Learn more:** ${product.vendorUrl}` : ""}

**Practice:** ${solution.name} ([/solutions/${solution.id}](/solutions/${solution.id}))
`,
    );
    productIndex++;
  }
}

// ─── 30–33 — Services pages ──────────────────────────────────────────────────

const SERVICE_ROUTE_SUFFIX: Record<string, string> = {
  advisory:       "advisory",
  implementation: "implementation",
  managed:        "managed-services",
  training:       "training",
};

const SERVICE_FILE_PREFIXES: Record<string, string> = {
  advisory:       "30-services-advisory",
  implementation: "31-services-implementation",
  managed:        "32-services-managed-services",
  training:       "33-services-training",
};

for (const service of SERVICES) {
  const prefix = SERVICE_FILE_PREFIXES[service.id];
  const routeSuffix = SERVICE_ROUTE_SUFFIX[service.id];
  if (!prefix) continue;
  const extras = SERVICES_EXTRAS[service.id];

  const whySection = extras?.whyPoints?.length
    ? `## Why TechD for ${service.name}\n\n${extras.whyPoints.map((p) => `**${p.title}** — ${p.body}`).join("\n\n")}`
    : "";

  const engagementsSection = extras?.engagements?.length
    ? `## Available Engagements\n\n${extras.engagements.map((e) => `**${e.name}** (${e.duration}) — ${e.summary}`).join("\n\n")}`
    : "";

  const methodologySection = extras?.methodology
    ? `## ${extras.methodology.title}\n\n${extras.methodology.subtitle ?? ""}\n\n${extras.methodology.items.map((i) => `**${i.name}** — ${i.body}`).join("\n\n")}`
    : "";

  const deliverablesSection = extras?.deliverables?.length
    ? `## Deliverables\n\n${extras.deliverables.map((d) => `**${d.title}** — ${d.body}`).join("\n\n")}`
    : "";

  emit(
    `${prefix}.md`,
    `---
title: ${service.name} — TechD Services
route: /services/${routeSuffix}
source: src/content/services.ts#${service.id}
---

# ${service.name}

> ${extras?.headline ?? service.promise}

${extras?.lede ?? service.description}

**Highlights:** ${service.highlights.join(" · ")}

${whySection ? `\n${whySection}` : ""}
${engagementsSection ? `\n${engagementsSection}` : ""}
${methodologySection ? `\n${methodologySection}` : ""}
${deliverablesSection ? `\n${deliverablesSection}` : ""}
`,
  );
}

// ─── 40-x — Industry pages ───────────────────────────────────────────────────

const INDUSTRY_FILE_INDEX: Record<string, string> = {
  "financial-services": "40",
  "healthcare":         "41",
  "manufacturing":      "42",
  "higher-education":   "43",
  "media-entertainment":"44",
  "energy-utilities":   "45",
  "public-sector":      "46",
};

for (const industry of INDUSTRIES) {
  const idx = INDUSTRY_FILE_INDEX[industry.id] ?? "40";
  const filename = `${idx}-industries-${industry.id}.md`;
  const extras = INDUSTRIES_EXTRAS[industry.id];

  const whySection = extras?.whyPoints?.length
    ? `## Why TechD for ${industry.name}\n\n${extras.whyPoints.map((p) => `**${p.title}** — ${p.body}`).join("\n\n")}`
    : "";

  const clientsSection = extras?.clients?.length
    ? `## Clients\n\n${extras.clients.map((c) => `- **${c.name}** — ${c.note}`).join("\n")}`
    : "";

  const practicesSection = extras?.practices?.length
    ? `## Practices Applied\n\n${extras.practices.map((p) => `- **${p.id}:** ${p.proof}`).join("\n")}`
    : "";

  const statsSection = extras?.stats?.length
    ? `## Key Facts\n\n${extras.stats.map((s) => `- **${s.label}:** ${s.value}`).join("\n")}`
    : "";

  emit(
    filename,
    `---
title: ${industry.name} — TechD Industry Focus
route: /industries/${industry.id}
source: src/content/industries.ts#${industry.id}
---

# ${industry.name}

**Regulation:** ${industry.regulation}

> ${extras?.headline ?? industry.outcome}

${extras?.lede ?? industry.outcome}

${whySection ? `\n${whySection}` : ""}
${clientsSection ? `\n${clientsSection}` : ""}
${practicesSection ? `\n${practicesSection}` : ""}
${statsSection ? `\n${statsSection}` : ""}
`,
  );
}

// ─── 50-x — Resources ────────────────────────────────────────────────────────

const resourcesByType = new Map<string, typeof RESOURCES>();
for (const r of RESOURCES) {
  if (r.draft) continue;
  const list = resourcesByType.get(r.type) ?? [];
  list.push(r);
  resourcesByType.set(r.type, list);
}

const RESOURCE_FILE_MAP: Record<string, [string, string]> = {
  "case-studies": ["50-resources-case-studies", "/resources/case-studies"],
  blog:           ["51-resources-blog",          "/resources/blog"],
  webinars:       ["52-resources-webinars",       "/resources/webinars"],
  events:         ["53-resources-events",         "/resources/events"],
};

for (const [type, [filename, route]] of Object.entries(RESOURCE_FILE_MAP)) {
  const items = resourcesByType.get(type as typeof RESOURCES[0]["type"]) ?? [];

  emit(
    `${filename}.md`,
    `---
title: ${type.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — TechD Resources
route: ${route}
source: src/content/resources.ts
---

# TechD ${type.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}

${
  items.length === 0
    ? "Content coming soon."
    : items.map((r) => {
        const parts = [`## ${r.title}`, `**Date:** ${r.date}`];
        if (r.industry) parts.push(`**Industry:** ${r.industry}`);
        if (r.products?.length) parts.push(`**Products:** ${r.products.join(", ")}`);
        parts.push(r.summary);
        if (r.body?.length) parts.push(r.body.join("\n\n"));
        if (r.externalUrl) parts.push(`[Read more](${r.externalUrl})`);
        return parts.join("\n\n");
      }).join("\n\n---\n\n")
}
`,
  );
}

// ─── 60 — Company / About ────────────────────────────────────────────────────

emit(
  "60-company-about.md",
  `---
title: About TechD
route: /company/about
source: src/content/about.ts
---

# About TechD

${COMPANY_FACTS.map((f) => `- **${f.label}:** ${f.value}`).join("\n")}

## Our Four Practice Areas

${sections(PRACTICE_AREAS, (p) => `### ${p.name}\n${p.description}\n\nLearn more: ${p.to}`)}

## Leadership

${sections(LEADERSHIP, (l) => `### ${l.name} — ${l.title}\n${l.bio}\n\n**Domains:** ${l.domains.join(", ")}`)}

## The Same Practitioners Commitment

${SAME_PRACTITIONERS_COMMITMENT}

${WHY_THIS_TEAM}

## Engagement Stages

${ENGAGEMENT_STAGES.map((s) => `**${s.name}** — ${s.detail}`).join("\n\n")}
`,
);

// ─── 61 — IBM Partnership ────────────────────────────────────────────────────

emit(
  "61-company-ibm-partnership.md",
  `---
title: TechD IBM Partnership
route: /company/ibm-partnership
source: src/content/about.ts
---

# TechD IBM Partnership

TechD has been an IBM Gold Business Partner under IBM Partner Plus since ${CONTACT.ibmPartnerSince}. We hold active delivery authorizations across 21 IBM products.

## IBM Product Portfolio by Practice

${sections(
  PORTFOLIO_BY_PRACTICE,
  (p) => `### ${p.practice}\n${bullets(p.products)}\n\n[Explore this practice](${p.to})`,
)}

## IBM Platform Assessment

**Format:** ${IBM_PLATFORM_ASSESSMENT.format}

**Scope:**
${bullets(IBM_PLATFORM_ASSESSMENT.scope as unknown as string[])}

**Deliverables:**
${bullets(IBM_PLATFORM_ASSESSMENT.deliverable as unknown as string[])}

**Next step:** ${IBM_PLATFORM_ASSESSMENT.next}

## Compliance Frameworks

${COMPLIANCE_FRAMEWORKS.map((f) => `**${f.framework}** (${f.industry}) — ${f.detail}`).join("\n\n")}
`,
);

// ─── 99 — Curated FAQ ────────────────────────────────────────────────────────

emit(
  "99-chatbot-faq.md",
  `---
title: TechD Frequently Asked Questions
route: /
source: src/content/chatbot-faq.ts
priority: high
---

# TechD — Frequently Asked Questions

The following questions and answers are the primary reference for the most common visitor questions.

${CHATBOT_FAQ.map((entry) => {
  const lines = [
    `## ${entry.question}`,
    entry.answer,
  ];
  if (entry.links?.length) {
    lines.push(`**Relevant pages:**\n${entry.links.map((l) => `- [${l.label}](${l.href})`).join("\n")}`);
  }
  if (entry.tags?.length) {
    lines.push(`*Keywords: ${entry.tags.join(", ")}*`);
  }
  return lines.join("\n\n");
}).join("\n\n---\n\n")}
`,
);

// ─── Summary ─────────────────────────────────────────────────────────────────

const files = [
  "00-site-meta.md",
  "01-home.md",
  ...Object.values(SOLUTION_FILE_PREFIXES).map((p) => `${p}.md`),
  `(${productIndex} product detail files: 20-product-*.md)`,
  ...Object.values(SERVICE_FILE_PREFIXES).map((p) => `${p}.md`),
  ...INDUSTRIES.map((i) => `${INDUSTRY_FILE_INDEX[i.id] ?? "40"}-industries-${i.id}.md`),
  ...Object.values(RESOURCE_FILE_MAP).map(([f]) => `${f}.md`),
  "60-company-about.md",
  "61-company-ibm-partnership.md",
  "99-chatbot-faq.md",
];

console.log(`\nKB generation complete → kb/`);
console.log(`${files.length} documents ready for upload to NeuralSeek.`);
console.log(`\nNext step: drag kb/ into the knowledge tab at`);
console.log(`  https://staging.neuralseek.com/techd-website/`);
