import { useMemo, useState } from "react";
import Layout from "@layout/Layout";
import { CUSTOMERS } from "@/content/site";
import LogoTile from "@/sections/logo-lab/LogoTile";

/**
 * /logo-lab — internal page to QA the customer logos used in LogoStrip
 * ("Trusted by Fortune 500 leaders"). Lets you change each logoClass and
 * persist back into src/content/site.ts via a dev-only endpoint.
 */
const LogoLab = () => {
  const initial = useMemo(
    () => Object.fromEntries(CUSTOMERS.map((c) => [c.name, c.logoClass ?? null])),
    [],
  );
  const [edits, setEdits] = useState<Record<string, string | null>>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const dirtyCount = CUSTOMERS.reduce(
    (n, c) => n + (edits[c.name] !== (c.logoClass ?? null) ? 1 : 0),
    0,
  );

  const buildPatchedFile = (sourceText: string) => {
    let src = sourceText;
    for (const c of CUSTOMERS) {
      const next = edits[c.name];
      const current = c.logoClass ?? null;
      if (next === current) continue;

      const escName = c.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const objRe = new RegExp(`\\{[^{}]*name:\\s*"${escName}"[^{}]*\\}`, "m");
      const m = src.match(objRe);
      if (!m) continue;
      const orig = m[0];
      let updated = orig;
      const hasClass = /logoClass:\s*"[^"]*"/.test(updated);

      if (next && next.length > 0) {
        if (hasClass) {
          updated = updated.replace(/logoClass:\s*"[^"]*"/, `logoClass: "${next}"`);
        } else {
          updated = updated.replace(/\s*\}\s*$/, `, logoClass: "${next}" }`);
        }
      } else if (hasClass) {
        updated = updated.replace(/,\s*logoClass:\s*"[^"]*"/, "");
      }
      if (updated !== orig) src = src.replace(orig, updated);
    }
    return src;
  };

  const handleDownload = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/src/content/site.ts?raw");
      if (!res.ok) throw new Error("Could not read site.ts");
      const text = await res.text();
      const patched = buildPatchedFile(text);
      const blob = new Blob([patched], { type: "text/typescript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "site.ts";
      a.click();
      URL.revokeObjectURL(url);
      setMessage(`Downloaded site.ts with ${dirtyCount} change(s). Replace src/content/site.ts with this file.`);
    } catch (err) {
      setMessage(`Error: ${String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyDiff = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const lines = CUSTOMERS.filter((c) => edits[c.name] !== (c.logoClass ?? null))
        .map((c) => {
          const v = edits[c.name];
          return v ? `  ${c.name}: logoClass: "${v}"` : `  ${c.name}: (remove logoClass)`;
        })
        .join("\n");
      await navigator.clipboard.writeText(lines);
      setMessage(`Copied ${dirtyCount} change(s) to clipboard.`);
    } catch (err) {
      setMessage(`Error: ${String(err)}`);
    } finally {
      setSaving(false);
    }
  };


  const handleReset = () => setEdits(initial);

  return (
    <Layout>
      <section className="container py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Internal · Logo lab
            </p>
            <h1 className="mt-2 text-3xl font-bold text-secondary">
              Customer logos QA
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-light text-muted-foreground">
              Pick a size preset for each logo. Save writes the new{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[11px]">logoClass</code>{" "}
              back into <code className="rounded bg-muted px-1 py-0.5 text-[11px]">src/content/site.ts</code>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {dirtyCount} unsaved
            </span>
            <button
              type="button"
              onClick={handleReset}
              disabled={dirtyCount === 0 || saving}
              className="rounded-md border border-border px-3 py-2 text-xs font-bold text-secondary disabled:opacity-50 hover:border-primary"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleCopyDiff}
              disabled={dirtyCount === 0 || saving}
              className="rounded-md border border-border px-3 py-2 text-xs font-bold text-secondary disabled:opacity-50 hover:border-primary"
            >
              Copy diff
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={dirtyCount === 0 || saving}
              className="rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50"
            >
              {saving ? "Working…" : "Download site.ts"}
            </button>
          </div>
        </div>
        {message && (
          <p className="mt-3 text-xs font-bold text-primary">{message}</p>
        )}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CUSTOMERS.map((c) => (
            <LogoTile
              key={c.name}
              customer={c}
              current={edits[c.name]}
              dirty={edits[c.name] !== (c.logoClass ?? null)}
              onChange={(next) =>
                setEdits((prev) => ({ ...prev, [c.name]: next }))
              }
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default LogoLab;
