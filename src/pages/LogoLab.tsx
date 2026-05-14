import { useMemo, useState } from "react";
import Layout from "@layout/Layout";
import { CUSTOMERS, type Customer } from "@/content/site";
import { INDUSTRIES } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";
import LogoTile from "@/sections/logo-lab/LogoTile";
import { SIZE_PRESETS, DEFAULT_CLASS, matchPreset } from "@/sections/logo-lab/sizePresets";
import { cn } from "@/lib/utils";

interface IndustriesLogosSectionProps {
  edits: Record<string, string | null>;
  onChange: (name: string, next: string | null) => void;
}

const IndustriesLogosSection = ({ edits, onChange }: IndustriesLogosSectionProps) => {
  const byName = useMemo(
    () => Object.fromEntries(CUSTOMERS.map((c) => [c.name, c])) as Record<string, Customer>,
    [],
  );

  const groups = INDUSTRIES.map((ind) => {
    const clients = INDUSTRIES_EXTRAS[ind.id]?.clients ?? [];
    const tiles = clients
      .filter((c) => c.name !== "Federal Agency")
      .map((c) => ({ name: c.name, customer: byName[c.name] }));
    return { industry: ind, tiles };
  }).filter((g) => g.tiles.length > 0);

  const assignedNames = new Set(groups.flatMap((g) => g.tiles.map((t) => t.name)));
  const unassigned = CUSTOMERS.filter((c) => !assignedNames.has(c.name));

  const initialsOf = (name: string) =>
    name
      .replace(/[^A-Za-z0-9& ]/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  return (
    <section className="container py-12 border-t border-border">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        Internal · Industries logos
      </p>
      <h2 className="mt-2 text-3xl font-bold text-secondary">
        Industries clients section
      </h2>
      <p className="mt-2 max-w-2xl text-sm font-light text-muted-foreground">
        Read-only QA of the exact logos rendered on each Industries page's
        Clients section. Logos appear on the same dark surface used in
        production. Missing logos surface as initials with a red flag.
      </p>

      <div className="mt-8 space-y-12">
        {groups.map(({ industry, tiles }) => (
          <div key={industry.id}>
            <div className="flex items-baseline gap-3">
              <h3 className="text-xl font-bold text-secondary">{industry.name}</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {tiles.length} logo{tiles.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {tiles.map(({ name, customer }) => {
                const missing = !customer?.logo;
                const src = customer?.logo
                  ? `${import.meta.env.BASE_URL}${(customer.logoOnDark ?? customer.logo).replace(/^\//, "")}`
                  : null;
                const path = customer?.logoOnDark ?? customer?.logo ?? "—";
                const current = customer ? edits[customer.name] ?? null : null;
                const dirty =
                  customer != null &&
                  current !== (customer.logoClass ?? null);
                const sizeClass = current ?? DEFAULT_CLASS;
                const activePreset = matchPreset(current ?? undefined);
                return (
                  <div key={name} className="flex flex-col gap-2">
                    <div
                      className={cn(
                        "relative flex h-32 items-center justify-center rounded-2xl border bg-secondary p-5 transition",
                        dirty
                          ? "border-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.18)]"
                          : "border-white/10",
                      )}
                    >
                      {missing && (
                        <span className="absolute left-2 top-2 rounded bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
                          missing logo
                        </span>
                      )}
                      {src ? (
                        <img
                          src={src}
                          alt={`${name} logo`}
                          loading="lazy"
                          className={cn(
                            sizeClass,
                            "w-auto max-w-[200px] object-contain",
                            !customer?.logoOnDark && "brightness-0 invert",
                          )}
                        />
                      ) : (
                        <span className="text-2xl font-bold leading-none tracking-tight text-white/85">
                          {initialsOf(name)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-secondary">{name}</p>
                      <p className="truncate text-[11px] font-light text-muted-foreground">
                        {path}
                      </p>
                    </div>
                    {customer && (
                      <>
                        <div className="flex flex-wrap gap-1.5">
                          {SIZE_PRESETS.map((p) => {
                            const active = activePreset.className === p.className;
                            return (
                              <button
                                key={p.label}
                                type="button"
                                onClick={() => onChange(customer.name, p.className)}
                                className={cn(
                                  "rounded-md px-2 py-1 text-[11px] font-bold transition",
                                  active
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted/40 text-secondary hover:bg-muted",
                                )}
                                title={p.className ?? DEFAULT_CLASS}
                              >
                                {p.label}
                              </button>
                            );
                          })}
                        </div>
                        <p className="text-[10px] font-mono text-muted-foreground">
                          {current ?? `${DEFAULT_CLASS}  (default)`}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {unassigned.length > 0 && (
          <div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-xl font-bold text-secondary">Not in any industry</h3>
              <span className="rounded bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
                {unassigned.length} unassigned
              </span>
            </div>
            <p className="mt-1 text-xs font-light text-muted-foreground">
              Logos that exist in CUSTOMERS but are not referenced by any industry's clients list. They appear in the home LogoStrip only.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {unassigned.map((customer) => {
                const src = customer.logo
                  ? `${import.meta.env.BASE_URL}${(customer.logoOnDark ?? customer.logo).replace(/^\//, "")}`
                  : null;
                const path = customer.logoOnDark ?? customer.logo ?? "—";
                const current = edits[customer.name] ?? null;
                const dirty = current !== (customer.logoClass ?? null);
                const sizeClass = current ?? DEFAULT_CLASS;
                const activePreset = matchPreset(current ?? undefined);
                return (
                  <div key={customer.name} className="flex flex-col gap-2">
                    <div
                      className={cn(
                        "relative flex h-32 items-center justify-center rounded-2xl border border-dashed bg-secondary p-5 transition",
                        dirty ? "border-primary" : "border-border",
                      )}
                    >
                      {src ? (
                        <img
                          src={src}
                          alt={`${customer.name} logo`}
                          loading="lazy"
                          className={cn(
                            sizeClass,
                            "w-auto max-w-[200px] object-contain",
                            !customer.logoOnDark && "brightness-0 invert",
                          )}
                        />
                      ) : (
                        <span className="text-2xl font-bold leading-none tracking-tight text-white/85">
                          {initialsOf(customer.name)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-secondary">{customer.name}</p>
                      <p className="truncate text-[11px] font-light text-muted-foreground">{path}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {SIZE_PRESETS.map((p) => {
                        const active = activePreset.className === p.className;
                        return (
                          <button
                            key={p.label}
                            type="button"
                            onClick={() => onChange(customer.name, p.className)}
                            className={cn(
                              "rounded-md px-2 py-1 text-[11px] font-bold transition",
                              active
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted/40 text-secondary hover:bg-muted",
                            )}
                            title={p.className ?? DEFAULT_CLASS}
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      {current ?? `${DEFAULT_CLASS}  (default)`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/**
 * /logo-lab — internal page to QA + reorder the customer logos used in
 * LogoStrip ("Trusted by Fortune 500 leaders"). Drag tiles to reorder; pick
 * size presets per tile. Save writes the new logoClass + array order back
 * into src/content/site.ts via Download or Copy diff.
 */
const LogoLab = () => {
  const initialEdits = useMemo(
    () => Object.fromEntries(CUSTOMERS.map((c) => [c.name, c.logoClass ?? null])),
    [],
  );
  const initialOrder = useMemo(() => CUSTOMERS.map((c) => c.name), []);

  const [edits, setEdits] = useState<Record<string, string | null>>(initialEdits);
  const [order, setOrder] = useState<string[]>(initialOrder);
  const [dragName, setDragName] = useState<string | null>(null);
  const [overName, setOverName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const byName = useMemo(
    () => Object.fromEntries(CUSTOMERS.map((c) => [c.name, c])),
    [],
  );

  const dirtyClassCount = CUSTOMERS.reduce(
    (n, c) => n + (edits[c.name] !== (c.logoClass ?? null) ? 1 : 0),
    0,
  );
  const orderDirty =
    order.length !== initialOrder.length ||
    order.some((n, i) => n !== initialOrder[i]);
  const dirtyCount = dirtyClassCount + (orderDirty ? 1 : 0);

  const handleDragStart = (name: string) => setDragName(name);
  const handleDragOver = (e: React.DragEvent, name: string) => {
    e.preventDefault();
    if (dragName && name !== dragName) setOverName(name);
  };
  const handleDrop = (target: string) => {
    if (!dragName || dragName === target) {
      setDragName(null);
      setOverName(null);
      return;
    }
    setOrder((prev) => {
      const next = prev.filter((n) => n !== dragName);
      const idx = next.indexOf(target);
      next.splice(idx, 0, dragName);
      return next;
    });
    setDragName(null);
    setOverName(null);
  };

  // Rewrite the CUSTOMERS array in site.ts to reflect new order + logoClass edits.
  const buildPatchedFile = (sourceText: string) => {
    let src = sourceText;

    // 1. Apply logoClass edits in place.
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

    // 2. Reorder the array body if needed. Replace everything between
    //    `export const CUSTOMERS: Customer[] = [` and the matching `];`
    //    with the objects in the new order.
    if (orderDirty) {
      const headRe = /export const CUSTOMERS:\s*Customer\[\]\s*=\s*\[/;
      const head = src.match(headRe);
      if (head && head.index !== undefined) {
        const start = head.index + head[0].length;
        // find matching closing `];`
        let i = start;
        let depth = 1;
        while (i < src.length && depth > 0) {
          const ch = src[i];
          if (ch === "[") depth++;
          else if (ch === "]") depth--;
          if (depth === 0) break;
          i++;
        }
        if (depth === 0) {
          const end = i; // position of closing ]
          // Extract every object literal in the current body by name.
          const body = src.slice(start, end);
          const objects: Record<string, string> = {};
          const objRe = /\{[^{}]*name:\s*"([^"]+)"[^{}]*\}/g;
          let m: RegExpExecArray | null;
          while ((m = objRe.exec(body)) !== null) {
            objects[m[1]] = m[0];
          }
          const reordered = order
            .map((name) => objects[name])
            .filter(Boolean)
            .map((line) => `  ${line},`)
            .join("\n");
          const newBody = `\n${reordered}\n`;
          src = src.slice(0, start) + newBody + src.slice(end);
        }
      }
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
      setMessage(
        `Downloaded site.ts with ${dirtyCount} change(s). Replace src/content/site.ts with this file.`,
      );
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
      const lines: string[] = [];
      if (orderDirty) {
        lines.push("New order:");
        order.forEach((n, i) => lines.push(`  ${i + 1}. ${n}`));
      }
      CUSTOMERS.filter((c) => edits[c.name] !== (c.logoClass ?? null)).forEach(
        (c) => {
          const v = edits[c.name];
          lines.push(
            v
              ? `  ${c.name}: logoClass: "${v}"`
              : `  ${c.name}: (remove logoClass)`,
          );
        },
      );
      await navigator.clipboard.writeText(lines.join("\n"));
      setMessage(`Copied ${dirtyCount} change(s) to clipboard.`);
    } catch (err) {
      setMessage(`Error: ${String(err)}`);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setEdits(initialEdits);
    setOrder(initialOrder);
  };

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
              Drag tiles to reorder. Pick a size preset per logo. Use{" "}
              <strong>Copy diff</strong> or <strong>Download</strong> to write
              the new order + sizes back into{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
                src/content/site.ts
              </code>
              .
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {dirtyCount} unsaved
              {orderDirty && (
                <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                  order changed
                </span>
              )}
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
              className="rounded-md bg-primary px-3 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50"
            >
              Download site.ts
            </button>
          </div>
        </div>
        {message && (
          <p className="mt-3 text-xs font-bold text-primary">{message}</p>
        )}

        <IndustriesLogosSection
          edits={edits}
          onChange={(name, next) =>
            setEdits((prev) => ({ ...prev, [name]: next }))
          }
        />

        <h2 className="mt-12 text-2xl font-bold text-secondary">
          Customer logos (LogoStrip — drag to reorder)
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {order.map((name, i) => {
            const c = byName[name];
            if (!c) return null;
            const isDragging = dragName === name;
            const isOver = overName === name;
            return (
              <div
                key={name}
                draggable
                onDragStart={() => handleDragStart(name)}
                onDragOver={(e) => handleDragOver(e, name)}
                onDragLeave={() => setOverName((p) => (p === name ? null : p))}
                onDrop={() => handleDrop(name)}
                onDragEnd={() => {
                  setDragName(null);
                  setOverName(null);
                }}
                className={`relative cursor-grab active:cursor-grabbing transition ${
                  isDragging ? "opacity-40" : ""
                } ${
                  isOver
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-xl"
                    : ""
                }`}
              >
                <div className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded-md bg-secondary/90 px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                  <span aria-hidden>#</span>
                  <input
                    type="number"
                    min={1}
                    max={order.length}
                    defaultValue={i + 1}
                    key={`${name}-${i}`}
                    aria-label={`Position for ${name}`}
                    title="Type a position then press Enter"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                    }}
                    onBlur={(e) => {
                      const raw = parseInt(e.currentTarget.value, 10);
                      if (!Number.isFinite(raw)) {
                        e.currentTarget.value = String(i + 1);
                        return;
                      }
                      const target = Math.max(1, Math.min(order.length, raw)) - 1;
                      if (target === i) return;
                      setOrder((prev) => {
                        const next = prev.filter((n) => n !== name);
                        next.splice(target, 0, name);
                        return next;
                      });
                    }}
                    className="w-9 rounded bg-background/20 px-1 text-center text-[10px] font-bold text-primary-foreground outline-none ring-1 ring-transparent focus:ring-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>
                <LogoTile
                  customer={c}
                  current={edits[c.name]}
                  dirty={edits[c.name] !== (c.logoClass ?? null)}
                  onChange={(next) =>
                    setEdits((prev) => ({ ...prev, [c.name]: next }))
                  }
                />
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default LogoLab;
