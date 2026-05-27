import { useMemo, useState } from "react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import { Button } from "@ui/button";
import { toast } from "@hooks/use-toast";
import { LogoTile } from "@sections/clients-lab/LogoTile";
import {
  getLabClients,
  toLogoClass,
  type HeightToken,
  type LabClient,
} from "@sections/clients-lab/clients-lab-data";

/**
 * Internal sizing lab — sandbox for the home-page logo strip.
 * Reads from the live CUSTOMERS array in src/content/site.ts and only emits
 * size-only diffs. It never adds, removes, or renames clients.
 *
 * Hidden route — not in nav, noindex.
 */
const ClientsLab = () => {
  const clients = useMemo<LabClient[]>(() => getLabClients(), []);

  const [heights, setHeights] = useState<Record<string, HeightToken>>(() =>
    Object.fromEntries(clients.map((c) => [c.name, c.currentHeight]))
  );

  const setHeight = (name: string, h: HeightToken) =>
    setHeights((prev) => ({ ...prev, [name]: h }));

  const changed = useMemo(
    () => clients.filter((c) => toLogoClass(heights[c.name]) !== c.currentClass),
    [clients, heights]
  );

  const snippet = useMemo(() => {
    if (changed.length === 0) {
      return "// No entries changed yet. Move a slider to generate a diff.";
    }
    const lines = [
      `// ${changed.length} size change${changed.length === 1 ? "" : "s"} — paste over the matching row(s) in CUSTOMERS in src/content/site.ts`,
      "",
    ];
    for (const c of changed) {
      const cls = toLogoClass(heights[c.name]);
      lines.push(
        `// ${c.name}: ${c.currentClass ?? "(no logoClass)"} → ${cls}`
      );
      lines.push(`logoClass: "${cls}",`);
      lines.push("");
    }
    return lines.join("\n").trimEnd();
  }, [changed, heights]);

  const handleCopy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(snippet);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = snippet;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      toast({
        title: "Copied to clipboard",
        description: `${changed.length} size change${changed.length === 1 ? "" : "s"} ready to paste into site.ts`,
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Open this page in a new tab to copy, or check console for the snippet.",
        variant: "destructive",
      });
      // eslint-disable-next-line no-console
      console.log(snippet);
    }
  };

  return (
    <Layout>
      <SEO
        title="Clients Lab — Internal"
        description="Internal logo sizing tool. Not for public viewing."
        noindex
      />
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Internal banner */}
          <div className="mb-6 rounded border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground">
            <span className="font-bold uppercase tracking-wider text-primary">
              Internal tool
            </span>
            <span className="ml-2 text-muted-foreground">
              Sizing sandbox for the home-page logo strip. Reads live CUSTOMERS from
              site.ts. Emits size-only diffs. Never adds or removes clients.
            </span>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Clients Lab
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground font-light">
                {clients.length} clients currently in the live strip. Adjust any
                slider, then copy the diff and paste it over the matching{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                  logoClass
                </code>{" "}
                in{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                  src/content/site.ts
                </code>
                .
              </p>
            </div>
            <Button onClick={handleCopy} className="btn-glow shrink-0" disabled={changed.length === 0}>
              Copy changed entries ({changed.length})
            </Button>
          </div>

          {/* Grid */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {clients.map((c) => (
              <LogoTile
                key={c.name}
                client={c}
                height={heights[c.name]}
                onHeightChange={(h) => setHeight(c.name, h)}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ClientsLab;
