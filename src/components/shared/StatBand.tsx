import { cn } from "@/lib/utils";

export type StatItem = { value: string; label: string };

interface Props {
  items: StatItem[];
  className?: string;
}

/**
 * Thin border-only row of 2–4 stats. Each cell shows a large value and
 * a short eyebrow label. Reused on About, Customers and IBM Partnership.
 */
export const StatBand = ({ items, className }: Props) => (
  <div
    className={cn(
      "grid divide-y divide-border rounded-xl border border-border overflow-hidden",
      "sm:grid-cols-2 sm:divide-y-0 sm:divide-x",
      items.length >= 3 && "lg:grid-cols-3",
      items.length >= 4 && "lg:grid-cols-4",
      className,
    )}
  >
    {items.map((s) => (
      <div key={s.label} className="px-6 py-5 transition-colors hover:bg-muted/40">
        <p className="text-2xl md:text-3xl font-bold text-secondary leading-none">
          {s.value}
        </p>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          {s.label}
        </p>
      </div>
    ))}
  </div>
);

export default StatBand;
