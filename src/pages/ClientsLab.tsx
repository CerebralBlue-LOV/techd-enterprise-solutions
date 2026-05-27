import { useMemo, useState } from "react";
import Layout from "@layout/Layout";
import SEO from "@seo/SEO";
import { Button } from "@ui/button";
import { toast } from "@hooks/use-toast";
import { LogoTile } from "@sections/clients-lab/LogoTile";
import {
  MARC_CLIENTS,
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

  const changed = useMemo(
    () => MARC_CLIENTS.filter((c) => heights[c.name] !== c.defaultHeight),
    [heights]
  );

  const snippet = useMemo(() => {
    if (changed.length === 0) {
      return "// No sizes changed yet. Move a slider to generate an instruction.";
    }
    const lines = [
      `Lovable: update defaultHeight in src/sections/clients-lab/clients-lab-data.ts for these ${changed.length} client${changed.length === 1 ? "" : "s"} (lab is the source of truth — do NOT touch site.ts):`,
      "",
    ];
    for (const c of changed) {
      lines.push(`- ${c.name}: ${heights[c.name]}`);
    }
    return lines.join("\n");
  }, [changed, heights]);

  const currentSnippet = useMemo(() => {
    const lines = [
      `Current sizes for all ${MARC_CLIENTS.length} clients in /clients-lab:`,
      "",
    ];
    for (const c of MARC_CLIENTS) {
      lines.push(`- ${c.name}: ${heights[c.name]}`);
    }
    return lines.join("\n");
  }, [heights]);

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      } catch {
        return false;
      }
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(snippet);
    if (ok) {
      toast({
        title: "Copied to clipboard",
        description: `${changed.length} changed entr${changed.length === 1 ? "y" : "ies"} ready to paste into site.ts`,
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

  const handleCopyCurrent = async () => {
    const ok = await copyToClipboard(currentSnippet);
    if (ok) {
      toast({
        title: "Copied to clipboard",
        description: `Current sizes for all ${MARC_CLIENTS.length} clients`,
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Open this page in a new tab to copy, or check console for the snippet.",
        variant: "destructive",
      });
      // eslint-disable-next-line no-console
      console.log(currentSnippet);
    }
  };




  return (
    <Layout>
      <SEO
        title="Clients Lab — Internal"
        description="Internal logo sizing tool. Not for public viewing."
        noindex
      />
      {/* Light section */}
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Clients Lab
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground font-light">
                Marc's list of {MARC_CLIENTS.length} TechD clients.
              </p>
            </div>
            <Button onClick={handleCopy} className="btn-glow shrink-0" disabled={changed.length === 0}>
              Copy changed sizes ({changed.length})
            </Button>
          </div>

          <p className="mt-10 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Light
          </p>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {MARC_CLIENTS.map((c) => (
              <LogoTile
                key={`light-${c.name}`}
                client={c}
                height={heights[c.name]}
                onHeightChange={(h) => setHeight(c.name, h)}
                variant="light"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Dark section */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-background/70">
            Dark
          </p>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {MARC_CLIENTS.map((c) => (
              <LogoTile
                key={`dark-${c.name}`}
                client={c}
                height={heights[c.name]}
                onHeightChange={(h) => setHeight(c.name, h)}
                variant="dark"
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ClientsLab;
