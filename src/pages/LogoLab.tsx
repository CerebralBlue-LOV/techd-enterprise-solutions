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

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const payload = CUSTOMERS.filter(
        (c) => edits[c.name] !== (c.logoClass ?? null),
      ).map((c) => ({ name: c.name, logoClass: edits[c.name] }));

      const res = await fetch("/__lab/save-logo-sizes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const body = await res.json();
      setMessage(`Saved ${body.changed} change(s). Reloading…`);
      setTimeout(() => window.location.reload(), 600);
    } catch (err) {
      setMessage(`Error: ${String(err)}`);
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
              onClick={handleSave}
              disabled={dirtyCount === 0 || saving}
              className="rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
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
