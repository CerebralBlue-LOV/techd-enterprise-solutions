import { useState } from "react";
import type { Customer } from "@/content/site";
import { SIZE_PRESETS, DEFAULT_CLASS, matchPreset } from "./sizePresets";

interface Props {
  customer: Customer;
  current: string | null; // null = default
  dirty: boolean;
  onChange: (next: string | null) => void;
}

export const LogoTile = ({ customer, current, dirty, onChange }: Props) => {
  const [broken, setBroken] = useState(false);
  const cls = current ?? DEFAULT_CLASS;
  const status = !customer.logo
    ? { label: "Missing file", tone: "danger" as const }
    : broken
    ? { label: "Broken", tone: "danger" as const }
    : { label: "OK", tone: "ok" as const };

  const activePreset = matchPreset(current ?? undefined);

  return (
    <div
      className={`rounded-xl border p-5 transition ${
        dirty
          ? "border-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]"
          : "border-border"
      } ${status.tone === "danger" ? "border-destructive/60" : ""}`}
    >
      {/* Logo preview area */}
      <div className="grid h-28 place-items-center rounded-lg bg-background border border-border/60">
        {customer.logo ? (
          <img
            src={customer.logo}
            alt={customer.name}
            onError={() => setBroken(true)}
            className={`${cls} w-auto object-contain opacity-70 grayscale`}
          />
        ) : (
          <span className="text-xs text-muted-foreground">no logo file</span>
        )}
      </div>

      {/* Meta */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-secondary">
            {customer.name}
          </p>
          <p className="truncate text-[11px] text-muted-foreground">
            {customer.logo ?? "—"}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
            status.tone === "ok"
              ? "bg-primary/10 text-primary"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {status.label}
        </span>
      </div>

      {/* Size presets */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {SIZE_PRESETS.map((p) => {
          const active = activePreset.className === p.className;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => onChange(p.className)}
              className={`rounded-md px-2 py-1 text-[11px] font-bold transition ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/40 text-secondary hover:bg-muted"
              }`}
              title={p.className ?? DEFAULT_CLASS}
            >
              {p.label}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[10px] font-mono text-muted-foreground">
        {current ?? `${DEFAULT_CLASS}  (default)`}
      </p>
    </div>
  );
};

export default LogoTile;
