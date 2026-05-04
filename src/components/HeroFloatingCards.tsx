import { Network, TrendingUp, Workflow } from "lucide-react";

const cardBase =
  "absolute rounded-2xl border border-white/60 bg-white/55 backdrop-blur-xl px-5 py-4 " +
  "shadow-[0_20px_50px_-20px_hsl(193_100%_45%/0.22),0_8px_20px_-12px_hsl(240_3%_35%/0.18)] " +
  "animate-float";

/** Decorative floating UI cards over the particle field. md+ only. */
export const HeroFloatingCards = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 hidden md:block"
  >
    {/* Card A — ML Node */}
    <div
      className={`${cardBase} top-[12%] right-[6%] w-60 -rotate-2`}
      style={{ animationDelay: "0s" }}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <Network className="!size-3.5" />
        ML Node
      </div>
      <div className="mt-2 text-sm font-medium text-secondary">
        Inference · 142ms
      </div>
      <div className="mt-3 h-1.5 w-full rounded-full bg-primary/15 overflow-hidden">
        <div className="h-full w-[78%] rounded-full bg-primary" />
      </div>
      <div className="mt-1.5 text-[10px] font-light text-muted-foreground">
        Throughput 78%
      </div>
    </div>

    {/* Card B — Performance Metric */}
    <div
      className={`${cardBase} top-[42%] right-[14%] w-56 rotate-1`}
      style={{ animationDelay: "-2.5s" }}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <TrendingUp className="!size-3.5" />
        Run-rate impact
      </div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-2xl font-bold text-secondary">+$4.2M</div>
        <svg viewBox="0 0 80 24" className="h-6 w-20 text-primary">
          <polyline
            points="0,20 12,16 24,18 36,11 48,13 60,6 72,8 80,2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="mt-1 text-[10px] font-light text-muted-foreground">
        Annualized · last 30d
      </div>
    </div>

    {/* Card C — Pipeline */}
    <div
      className={`${cardBase} bottom-[14%] right-[28%] w-52 -rotate-1`}
      style={{ animationDelay: "-5s" }}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <Workflow className="!size-3.5" />
        Agents online
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <div className="text-sm font-medium text-secondary">23 / 23 healthy</div>
      </div>
    </div>
  </div>
);

export default HeroFloatingCards;
