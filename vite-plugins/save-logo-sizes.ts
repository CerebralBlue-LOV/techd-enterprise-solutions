import type { Plugin } from "vite";
import fs from "node:fs";
import path from "node:path";

interface Entry {
  name: string;
  logoClass: string | null;
}

/**
 * Dev-only endpoint: POST /__lab/save-logo-sizes
 * Body: Entry[] — updates/inserts/removes logoClass for each customer in
 * src/content/site.ts. Works only in development.
 */
export function saveLogoSizesPlugin(): Plugin {
  const filePath = path.resolve(process.cwd(), "src/content/site.ts");

  return {
    name: "save-logo-sizes",
    apply: "serve",
    configureServer(server) {
      return () => {
        server.middlewares.use("/__lab/save-logo-sizes", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end("Method Not Allowed");
          return;
        }
        let raw = "";
        req.on("data", (c) => (raw += c));
        req.on("end", () => {
          try {
            const entries: Entry[] = JSON.parse(raw);
            let src = fs.readFileSync(filePath, "utf8");
            let changed = 0;

            for (const e of entries) {
              const escName = e.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              // Match a single object literal containing this exact name
              const objRe = new RegExp(
                `\\{[^{}]*name:\\s*"${escName}"[^{}]*\\}`,
                "m",
              );
              const m = src.match(objRe);
              if (!m) continue;
              const orig = m[0];
              let next = orig;

              const hasClass = /logoClass:\s*"[^"]*"/.test(next);

              if (e.logoClass && e.logoClass.length > 0) {
                if (hasClass) {
                  next = next.replace(
                    /logoClass:\s*"[^"]*"/,
                    `logoClass: "${e.logoClass}"`,
                  );
                } else {
                  // Insert before closing brace
                  next = next.replace(/\s*\}\s*$/, `, logoClass: "${e.logoClass}" }`);
                }
              } else if (hasClass) {
                next = next.replace(/,\s*logoClass:\s*"[^"]*"/, "");
              }

              if (next !== orig) {
                src = src.replace(orig, next);
                changed++;
              }
            }

            fs.writeFileSync(filePath, src, "utf8");
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true, changed }));
          } catch (err) {
            res.statusCode = 500;
            res.end(String(err));
          }
        });
      });
    },
  };
}

export default saveLogoSizesPlugin;
