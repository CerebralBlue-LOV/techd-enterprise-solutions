import { useMemo, useState } from "react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import { Button } from "@ui/button";
import { toast } from "@hooks/use-toast";
import { LogoTile } from "@sections/clients-lab/LogoTile";
import {
  MARC_CLIENTS,
  toLogoClass,
  type HeightToken,
} from "@sections/clients-lab/clients-lab-data";

/**
 * Internal sizing lab for Marc's 13-client logo list.
 * Hidden route — not in nav, noindex.
 * Workflow: tune each logo's height, hit "Copy ALL entries", paste into
 * src/content/site.ts CUSTOMERS.
 */
const ClientsLab = () => {
  const [heights, setHeights] = useState<Record<string, HeightToken>>(() =>
    Object.fromEntries(MARC_CLIENTS.map((c) => [c.name, c.defaultHeight]))
  );

  const setHeight = (name: string, h: HeightToken) =>
    setHeights((prev) => ({ ...prev, [name]: h }));

  const snippet = useMemo(() => {
    const lines = [
      "// Paste into CUSTOMERS in src/content/site.ts",
      "// Reminder: move the 7 revived logos from public/images/deprecated/partners-deprecated/",
      "// into public/images/partners/ before this works on the live site.",
      "",
    ];
    for (const c of MARC_CLIENTS) {
      const cls = toLogoClass(heights[c.name]);
      if (c.placeholder) {
        lines.push(`// TODO add logo file: ${c.logo}`);
        lines.push(
          `// { name: "${c.name}", url: "${c.url}", logo: "${c.logo}", logoClass: "${cls}" },`
        );
      } else {
        lines.push(
          `{ name: "${c.name}", url: "${c.url}", logo: "${c.logo}", logoClass: "${cls}" },`
        );
      }
    }
    return lines.join("\n");
  }, [heights]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      toast({
        title: "Copied to clipboard",
        description: `${MARC_CLIENTS.length} entries ready to paste into site.ts`,
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Select the snippet below and copy manually.",
        variant: "destructive",
      });
    }
  };

  const placeholderCount = MARC_CLIENTS.filter((c) => c.placeholder).length;

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
              Sizing sandbox for the home-page logo strip. Not linked from nav.
              Not indexed.
            </span>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Clients Lab
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground font-light">
                Marc's list of {MARC_CLIENTS.length} TechD clients.{" "}
                {MARC_CLIENTS.length - placeholderCount} have logos,{" "}
                {placeholderCount} are placeholders. Adjust each height with the
                slider, then copy the generated snippet into{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                  src/content/site.ts
                </code>
                .
              </p>
            </div>
            <Button onClick={handleCopy} className="btn-glow shrink-0">
              Copy ALL entries
            </Button>
          </div>

          {/* Grid */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {MARC_CLIENTS.map((c) => (
              <LogoTile
                key={c.name}
                client={c}
                height={heights[c.name]}
                onHeightChange={(h) => setHeight(c.name, h)}
              />
            ))}
          </div>

          {/* Snippet preview */}
          <div className="mt-12">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">
                Generated snippet
              </h2>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                Copy
              </Button>
            </div>
            <pre className="max-h-96 overflow-auto rounded-lg border border-border bg-muted/30 p-4 font-mono text-xs leading-relaxed text-foreground">
              {snippet}
            </pre>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ClientsLab;
