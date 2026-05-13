import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Layout from "@layout/Layout";
import SectionHeading from "@shared/SectionHeading";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";
import { SOLUTIONS } from "@content/solutions";
import { PRACTICE_MOTIFS } from "@content/practice-motifs";
import { cn } from "@/lib/utils";

/**
 * /section-lab — internal lab for visual design experiments on real
 * sections. Use it to iterate on motion, gradients, dark vs. light
 * treatments, etc., without touching the live pages. Currently focused on
 * the per-industry "Solutions in this industry" section, rendered with
 * Healthcare data.
 */

const extras = INDUSTRIES_EXTRAS["healthcare"];
const rows = (extras?.practices ?? [])
  .map((p) => {
    const sol = SOLUTIONS.find((s) => s.id === p.id);
    return sol ? { sol, proof: p.proof } : null;
  })
  .filter((x): x is { sol: (typeof SOLUTIONS)[number]; proof: string } => Boolean(x));

const TITLE = "Where TechD's practices have shipped in Healthcare";

/* ═════════════════════════════════════════════════════════════
 * "Why TechD" proposals — alternatives to the current cyan/gray
 * card treatment used on Solutions, Industries, and Services.
 * Rendered with Healthcare whyPoints as production data.
 * ═════════════════════════════════════════════════════════════ */
const WHY_POINTS = extras?.whyPoints ?? [];
const WHY_TITLE = "Why teams pick TechD for regulated, high-stakes work";

/* ───────── Why A — Editorial manifesto ───────── */
const WhyProposalEditorial = () => (
  <div className="px-6 md:px-12 py-16 md:py-20 bg-background">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Left: oversized headline with cyan rule */}
      <div className="lg:col-span-5 relative lg:pl-6">
        <span
          aria-hidden="true"
          className="hidden lg:block absolute left-0 top-2 bottom-2 w-px bg-primary"
        />
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Why TechD · Healthcare
        </p>
        <h2 className="mt-5 text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-secondary">
          {WHY_TITLE}
        </h2>
        <p className="mt-6 text-base font-light text-muted-foreground leading-relaxed max-w-md">
          Four reasons CIOs and chief data officers keep us in the room after
          the procurement deck closes.
        </p>
      </div>

      {/* Right: numbered ledger */}
      <ol className="lg:col-span-7 lg:border-l lg:border-border lg:pl-10">
        {WHY_POINTS.map((p, i) => (
          <li
            key={p.title}
            className="grid grid-cols-12 gap-4 py-7 border-b border-border last:border-b-0"
          >
            <span className="col-span-2 md:col-span-1 text-sm font-mono tabular-nums text-primary pt-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="col-span-10 md:col-span-11">
              <h3 className="text-lg md:text-xl font-bold text-secondary leading-snug tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                {p.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

/* ───────── Why B — Pull-quote + ledger ───────── */
const WhyProposalQuote = () => {
  const [hero, ...rest] = WHY_POINTS;
  if (!hero) return null;
  return (
    <div className="relative px-6 md:px-12 py-16 md:py-24 overflow-hidden bg-background">
      {/* faint dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          WebkitMaskImage:
            "radial-gradient(60% 70% at 30% 30%, black 30%, transparent 80%)",
          maskImage:
            "radial-gradient(60% 70% at 30% 30%, black 30%, transparent 80%)",
        }}
      />
      <div className="relative max-w-5xl">
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
          Why TechD
        </p>
        <p className="mt-6 text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-secondary">
          <span className="text-primary font-bold">“</span>
          {hero.title}
          <span className="text-primary font-bold">”</span>
        </p>
        <p className="mt-8 text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl">
          {hero.body}
        </p>
      </div>

      {/* ledger row */}
      <div className="relative mt-14 md:mt-20 border-t border-border pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-border">
          {rest.map((p, i) => (
            <div
              key={p.title}
              className={cn(
                "py-5 md:py-2 md:px-8 first:md:pl-0 last:md:pr-0",
                i === 0 && "md:pl-0",
              )}
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                Note · 0{i + 2}
              </p>
              <h3 className="mt-3 text-base font-bold text-secondary leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ───────── Why C — Spec sheet (off-white frame, cyan corner) ───────── */
const WhyProposalSpec = () => (
  <div className="px-6 md:px-10 py-12 md:py-16 bg-muted/30">
    <div className="relative rounded-2xl border border-border bg-background p-8 md:p-12">
      {/* cyan corner bracket */}
      <span
        aria-hidden="true"
        className="absolute -top-px -left-px h-6 w-6 border-t-2 border-l-2 border-primary rounded-tl-2xl"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-primary rounded-br-2xl"
      />

      <div className="max-w-2xl">
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary">
          Why TechD · Spec
        </p>
        <h2 className="mt-4 text-2xl md:text-4xl font-bold leading-[1.1] tracking-tight text-secondary">
          {WHY_TITLE}
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border">
        {WHY_POINTS.map((p, i) => (
          <article
            key={p.title}
            className="group relative bg-background p-6 md:p-7 flex flex-col"
          >
            {/* animated cyan top hairline */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-border overflow-hidden">
              <span className="block h-full w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                {String(i + 1).padStart(2, "0")} / {String(WHY_POINTS.length).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Reason
              </span>
            </div>
            <h3 className="mt-5 text-base md:text-lg font-bold text-secondary leading-snug tracking-tight">
              {p.title}
            </h3>
            <p className="mt-3 text-sm font-light text-muted-foreground leading-relaxed">
              {p.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  </div>
);

const VariantShell = ({
  index,
  name,
  blurb,
  children,
}: {
  index: string;
  name: string;
  blurb: string;
  children: React.ReactNode;
}) => (
  <section className="border-t border-border">
    <div className="container-page py-10">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="text-xs font-mono text-muted-foreground">{index}</span>
        <h2 className="text-2xl font-bold text-secondary">{name}</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-8 max-w-2xl">{blurb}</p>
      <div className="rounded-2xl border border-border bg-background overflow-hidden">
        {children}
      </div>
    </div>
  </section>
);

/* ───────── Variant 1: Numbered editorial list ───────── */
const VariantList = () => (
  <div className="px-6 md:px-10 py-12">
    <SectionHeading
      eyebrow="Solutions in this industry"
      title={TITLE}
    />
    <ul className="mt-10 divide-y divide-border border-y border-border">
      {rows.map(({ sol, proof }, i) => (
        <li key={sol.id}>
          <Link
            to={`/solutions/${sol.id}`}
            className="group grid grid-cols-12 items-start gap-6 py-7 transition-colors hover:bg-muted/30"
          >
            <span className="col-span-1 text-sm font-mono text-muted-foreground tabular-nums pt-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="col-span-7">
              <h3 className="text-2xl md:text-3xl font-bold text-secondary leading-tight tracking-tight transition-colors group-hover:text-primary">
                {sol.name}
              </h3>
            </div>
            <p className="col-span-3 text-sm font-light text-muted-foreground leading-relaxed pt-1">
              {proof}
            </p>
            <ArrowUpRight className="col-span-1 size-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-auto mt-1" />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/* ───────── Variant 2: Bento with motifs ───────── */
const VariantBento = () => {
  const spans = ["md:col-span-2 md:row-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2"];
  return (
    <div className="px-6 md:px-10 py-12">
      <SectionHeading
        eyebrow="Solutions in this industry"
        title={TITLE}
      />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {rows.map(({ sol, proof }, i) => {
          const motif = PRACTICE_MOTIFS[sol.id];
          const big = i === 0;
          return (
            <Link
              key={sol.id}
              to={`/solutions/${sol.id}`}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-background to-muted/40 p-6 flex flex-col justify-between transition-all hover:border-primary/40 hover:shadow-[0_8px_32px_-12px_hsl(var(--primary)/0.25)]",
                spans[i % spans.length],
              )}
            >
              {motif ? (
                <img
                  src={motif.image}
                  alt=""
                  aria-hidden="true"
                  className={cn(
                    "absolute opacity-[0.18] transition-opacity group-hover:opacity-30 pointer-events-none",
                    big
                      ? "right-0 bottom-0 w-[55%] max-w-[260px]"
                      : "right-0 top-1/2 -translate-y-1/2 w-[40%] max-w-[140px]",
                  )}
                />
              ) : null}
              <p className="eyebrow relative z-10">Practice · 0{i + 1}</p>
              <div className="relative z-10">
                <h3
                  className={cn(
                    "font-bold text-secondary leading-tight tracking-tight",
                    big ? "text-3xl md:text-4xl" : "text-lg",
                  )}
                >
                  {sol.name}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm font-light text-muted-foreground leading-relaxed",
                    big ? "max-w-md" : "line-clamp-2",
                  )}
                >
                  {proof}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  View practice <ArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

/* ───────── Variant 3: Tabbed practice viewer ───────── */
const VariantTabs = () => {
  const [active, setActive] = useState(0);
  const current = rows[active];
  if (!current) return null;
  const motif = PRACTICE_MOTIFS[current.sol.id];
  return (
    <div className="px-6 md:px-10 py-12">
      <SectionHeading
        eyebrow="Solutions in this industry"
        title={TITLE}
      />
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left rail */}
        <ul className="lg:col-span-4 flex flex-col border-l border-border">
          {rows.map(({ sol }, i) => {
            const isActive = i === active;
            return (
              <li key={sol.id}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full text-left py-4 pl-5 pr-3 -ml-px border-l-2 transition-all",
                    isActive
                      ? "border-primary bg-muted/40"
                      : "border-transparent hover:border-muted hover:bg-muted/20",
                  )}
                >
                  <span
                    className={cn(
                      "block text-xs font-mono mb-1",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={cn(
                      "block text-base font-bold leading-tight transition-colors",
                      isActive ? "text-secondary" : "text-muted-foreground",
                    )}
                  >
                    {sol.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right panel */}
        <div className="lg:col-span-8 relative rounded-xl border border-border bg-gradient-to-br from-background to-muted/30 p-8 min-h-[320px] overflow-hidden">
          {motif ? (
            <img
              src={motif.image}
              alt=""
              aria-hidden="true"
              className="absolute right-0 bottom-0 w-[40%] max-w-[220px] opacity-[0.18] pointer-events-none"
            />
          ) : null}
          <div className="relative z-10 max-w-xl">
            <p className="eyebrow">Practice</p>
            <h3 className="mt-2 text-3xl font-bold text-secondary leading-tight">
              {current.sol.name}
            </h3>
            <p className="mt-4 text-base font-light text-muted-foreground leading-relaxed">
              {current.proof}
            </p>
            <p className="mt-6 text-sm text-secondary leading-relaxed">
              {current.sol.outcome}
            </p>
            <Link
              to={`/solutions/${current.sol.id}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary group"
            >
              Explore the practice
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────── Variant 4: Outcome-first cards ───────── */
const VariantOutcome = () => (
  <div className="px-6 md:px-10 py-12">
    <SectionHeading
      eyebrow="Solutions in this industry"
      title={TITLE}
    />
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
      {rows.map(({ sol, proof }) => (
        <Link
          key={sol.id}
          to={`/solutions/${sol.id}`}
          className="group relative block rounded-xl border border-border bg-background p-7 overflow-hidden transition-all hover:border-primary/40 hover:-translate-y-0.5"
        >
          {/* cyan top rail */}
          <span className="absolute inset-x-0 top-0 h-px bg-border overflow-hidden">
            <span className="block h-full w-0 bg-primary transition-all duration-500 group-hover:w-full" />
          </span>
          <p className="eyebrow">{sol.name}</p>
          <h3 className="mt-3 text-2xl md:text-[1.65rem] font-bold text-secondary leading-[1.1] tracking-tight">
            {sol.outcome}
          </h3>
          <p className="mt-4 text-sm font-light text-muted-foreground leading-relaxed">
            {proof}
          </p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              In Healthcare
            </span>
            <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

/* ───────── Variant 5: Dark bento with cyan accents ───────── */
const VariantDarkBento = () => (
  <div className="relative px-6 md:px-10 py-12 bg-secondary overflow-hidden">
    {/* ambient cyan washes */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-primary/30 blur-3xl animate-gradient-drift"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 -left-32 h-[360px] w-[360px] rounded-full bg-primary/15 blur-3xl animate-gradient-drift"
      style={{ animationDelay: "-9s" }}
    />
    <div className="relative">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
        Solutions in this industry
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold text-background leading-tight max-w-2xl">
        {TITLE}
      </h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
        {rows.map(({ sol, proof }, i) => {
          const motif = PRACTICE_MOTIFS[sol.id];
          const big = i === 0;
          return (
            <Link
              key={sol.id}
              to={`/solutions/${sol.id}`}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-background/10 bg-background/[0.04] backdrop-blur-sm p-6 flex flex-col justify-between transition-all hover:border-primary/60 hover:bg-background/[0.08] hover:-translate-y-0.5",
                big ? "md:col-span-2 md:row-span-2" : "md:col-span-1",
                i === 3 && "md:col-span-2",
              )}
            >
              {/* hover cyan glow */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/40"
              />
              {motif ? (
                <img
                  src={motif.image}
                  alt=""
                  aria-hidden="true"
                  className={cn(
                    "absolute opacity-30 mix-blend-screen transition-transform duration-700 group-hover:scale-110 pointer-events-none",
                    big
                      ? "right-0 bottom-0 w-[55%] max-w-[280px]"
                      : "right-2 top-1/2 -translate-y-1/2 w-[42%] max-w-[140px]",
                  )}
                />
              ) : null}
              <p className="relative text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                Practice · 0{i + 1}
              </p>
              <div className="relative">
                <h3
                  className={cn(
                    "font-bold text-background leading-tight tracking-tight",
                    big ? "text-3xl md:text-4xl" : "text-lg",
                  )}
                >
                  {sol.name}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm font-light text-background/70 leading-relaxed",
                    big ? "max-w-md" : "line-clamp-2",
                  )}
                >
                  {proof}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                  View practice <ArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </div>
);

/* ───────── Variant 6: Cyan-gradient hero card ───────── */
const VariantCyanHero = () => {
  const [hero, ...rest] = rows;
  if (!hero) return null;
  const motif = PRACTICE_MOTIFS[hero.sol.id];
  return (
    <div className="px-6 md:px-10 py-12">
      <SectionHeading
        eyebrow="Solutions in this industry"
        title={TITLE}
      />
      {/* Hero card */}
      <Link
        to={`/solutions/${hero.sol.id}`}
        className="group relative mt-10 block overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-[hsl(195_100%_38%)] p-8 md:p-10 transition-transform hover:-translate-y-0.5"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(60% 80% at 80% 20%, hsl(var(--background) / 0.3) 0%, transparent 60%), radial-gradient(40% 60% at 20% 100%, hsl(var(--secondary) / 0.4) 0%, transparent 70%)",
          }}
        />
        {motif ? (
          <img
            src={motif.image}
            alt=""
            aria-hidden="true"
            className="absolute right-0 bottom-0 w-[45%] max-w-[320px] opacity-25 mix-blend-screen transition-transform duration-700 group-hover:scale-105 pointer-events-none"
          />
        ) : null}
        <div className="relative z-10 max-w-xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-background/80">
            Featured practice · 01
          </p>
          <h3 className="mt-3 text-3xl md:text-5xl font-bold text-background leading-[1.05] tracking-tight">
            {hero.sol.name}
          </h3>
          <p className="mt-4 text-base md:text-lg font-light text-background/85 leading-relaxed">
            {hero.proof}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-background">
            Explore the practice
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>

      {/* Supporting tiles */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {rest.map(({ sol, proof }, i) => (
          <Link
            key={sol.id}
            to={`/solutions/${sol.id}`}
            className="group relative block rounded-xl border border-border bg-background p-6 overflow-hidden transition-all hover:border-primary/40 hover:shadow-[0_8px_32px_-12px_hsl(var(--primary)/0.25)]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            />
            <p className="text-xs font-mono text-muted-foreground">0{i + 2}</p>
            <h3 className="mt-2 text-lg font-bold text-secondary leading-tight">
              {sol.name}
            </h3>
            <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed line-clamp-3">
              {proof}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

/* ───────── Variant 7: Floating gradient cards w/ motion ───────── */
const VariantFloat = () => (
  <div className="relative px-6 md:px-10 py-14 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, hsl(var(--border) / 0.4) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.4) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        WebkitMaskImage:
          "radial-gradient(70% 80% at 50% 40%, black 30%, transparent 85%)",
        maskImage:
          "radial-gradient(70% 80% at 50% 40%, black 30%, transparent 85%)",
      }}
    />
    <div className="relative">
      <SectionHeading
        eyebrow="Solutions in this industry"
        title={TITLE}
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {rows.map(({ sol, proof }, i) => {
          const motif = PRACTICE_MOTIFS[sol.id];
          return (
            <Link
              key={sol.id}
              to={`/solutions/${sol.id}`}
              style={{ animationDelay: `${i * 600}ms` }}
              className="group relative block rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.35)] hover:border-primary/50 animate-float"
            >
              {/* gradient corner glow */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl transition-all duration-700 group-hover:bg-primary/35 group-hover:scale-110"
              />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                    0{i + 1} · Practice
                  </p>
                  <h3 className="mt-3 text-xl md:text-2xl font-bold text-secondary leading-tight tracking-tight transition-colors group-hover:text-primary">
                    {sol.name}
                  </h3>
                </div>
                {motif ? (
                  <img
                    src={motif.image}
                    alt=""
                    aria-hidden="true"
                    className="size-16 opacity-60 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110"
                  />
                ) : null}
              </div>
              <p className="relative mt-4 text-sm font-light text-muted-foreground leading-relaxed">
                {proof}
              </p>
              <div className="relative mt-6 flex items-center gap-2 text-xs font-bold text-primary">
                <span className="block h-px w-6 bg-primary transition-all duration-500 group-hover:w-12" />
                Explore practice
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </div>
);

const SectionLab = () => (
  <Layout>
    <div className="container-page pt-12 pb-6">
      <p className="eyebrow">Internal · Section Lab</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold text-secondary tracking-tight">
        Section Lab
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground font-light">
        Visual experiments for real sections — motion, gradients, dark
        treatments. Currently focused on the per-industry{" "}
        <span className="font-bold text-secondary">Solutions in this industry</span>{" "}
        section, rendered with Healthcare data.
      </p>
    </div>

    <VariantShell
      index="01"
      name="Numbered editorial list"
      blurb="Stripe-style. Big practice name, proof beside it, thin rules. Calm, confident."
    >
      <VariantList />
    </VariantShell>

    <VariantShell
      index="02"
      name="Bento with practice motifs"
      blurb="Asymmetric grid. Plexus motifs as ambient art. One hero card, the rest smaller."
    >
      <VariantBento />
    </VariantShell>

    <VariantShell
      index="03"
      name="Tabbed practice viewer"
      blurb="Sticky left rail, detail panel on the right. More depth without more scroll."
    >
      <VariantTabs />
    </VariantShell>

    <VariantShell
      index="04"
      name="Outcome-first cards"
      blurb="Lead with the outcome in big type. Demote the practice name to the eyebrow."
    >
      <VariantOutcome />
    </VariantShell>

    <VariantShell
      index="05"
      name="Dark bento with cyan accents"
      blurb="Secondary background, drifting cyan washes, frosted tiles, motifs blend over the dark surface. Same energy as the home WhyTechD card."
    >
      <VariantDarkBento />
    </VariantShell>

    <VariantShell
      index="06"
      name="Cyan-gradient hero card"
      blurb="One full-bleed cyan gradient hero practice + three quiet supporting tiles. Big, bold, brand-forward."
    >
      <VariantCyanHero />
    </VariantShell>

    <VariantShell
      index="07"
      name="Floating gradient cards w/ motion"
      blurb="Engineered grid backdrop, gentle float animation, soft cyan corner glows that intensify on hover. Most kinetic of the bunch."
    >
      <VariantFloat />
    </VariantShell>

    <div className="container-page py-16" />
  </Layout>
);

export default SectionLab;
