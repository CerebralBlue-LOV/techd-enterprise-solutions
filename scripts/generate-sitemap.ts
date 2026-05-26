// Runs before `vite dev` and `vite build` (predev/prebuild hooks).
// Writes public/sitemap.xml from a curated route list + dynamic resource detail pages.

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://techd.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

// Static, indexable routes. Mirrors src/app/routes.tsx — excludes redirects, *,
// admin/lab pages, and dynamic :param routes (those are appended below).
const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },

  // Solutions
  { path: "/solutions/ai-generative",       changefreq: "monthly", priority: "0.9" },
  { path: "/solutions/data-analytics",      changefreq: "monthly", priority: "0.9" },
  { path: "/solutions/automation-finops",   changefreq: "monthly", priority: "0.9" },
  { path: "/solutions/security-compliance", changefreq: "monthly", priority: "0.9" },
  { path: "/solutions/infrastructure",      changefreq: "monthly", priority: "0.9" },

  // Services
  { path: "/services/advisory",         changefreq: "monthly", priority: "0.9" },
  { path: "/services/implementation",   changefreq: "monthly", priority: "0.9" },
  { path: "/services/managed-services", changefreq: "monthly", priority: "0.9" },
  { path: "/services/training",         changefreq: "monthly", priority: "0.9" },

  // Industries
  { path: "/industries/financial-services",  changefreq: "monthly", priority: "0.8" },
  { path: "/industries/healthcare",          changefreq: "monthly", priority: "0.8" },
  { path: "/industries/media-entertainment", changefreq: "monthly", priority: "0.8" },
  { path: "/industries/energy-utilities",    changefreq: "monthly", priority: "0.8" },
  { path: "/industries/higher-education",    changefreq: "monthly", priority: "0.8" },
  { path: "/industries/public-sector",       changefreq: "monthly", priority: "0.8" },
  { path: "/industries/manufacturing",       changefreq: "monthly", priority: "0.8" },

  // Resources hubs
  { path: "/resources/case-studies", changefreq: "weekly", priority: "0.7" },
  { path: "/resources/blog",         changefreq: "weekly", priority: "0.7" },
  { path: "/resources/webinars",     changefreq: "weekly", priority: "0.7" },
  { path: "/resources/events",       changefreq: "weekly", priority: "0.7" },

  // Company
  { path: "/company/about",                 changefreq: "monthly", priority: "0.7" },
  { path: "/company/ibm-partnership",       changefreq: "monthly", priority: "0.7" },
  { path: "/company/delivery-methodology",  changefreq: "monthly", priority: "0.7" },

  // Conversion
  { path: "/contact", changefreq: "monthly", priority: "0.9" },
];

// Dynamic: pull published resource slugs straight from the content module.
async function loadResourceEntries(): Promise<SitemapEntry[]> {
  const mod = await import("../src/content/resources.ts");
  const RESOURCES = (mod as { RESOURCES?: Array<Record<string, unknown>> }).RESOURCES ?? [];
  const typeToPath: Record<string, string> = {
    "case-studies": "/resources/case-studies",
    "blog": "/resources/blog",
    "webinars": "/resources/webinars",
    "events": "/resources/events",
  };
  return RESOURCES.filter((r) => !r.draft && r.slug && r.type && typeToPath[r.type as string]).map(
    (r) => ({
      path: `${typeToPath[r.type as string]}/${r.slug}`,
      changefreq: "monthly" as const,
      priority: "0.6",
    }),
  );
}

function renderSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    "",
  ].join("\n");
}

(async () => {
  let dynamicEntries: SitemapEntry[] = [];
  try {
    dynamicEntries = await loadResourceEntries();
  } catch (err) {
    console.warn("[sitemap] could not load resource entries:", err);
  }
  const entries = [...staticEntries, ...dynamicEntries];
  writeFileSync(resolve("public/sitemap.xml"), renderSitemap(entries));
  console.log(`sitemap.xml written (${entries.length} entries)`);
})();
