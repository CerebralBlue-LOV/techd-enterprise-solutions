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

const SolutionsForIndustryLab = () => (
  <Layout>
    <div className="container-page pt-12 pb-6">
      <p className="eyebrow">Internal · Lab</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold text-secondary tracking-tight">
        Solutions in this industry — directions
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground font-light">
        Four design directions for the per-industry "Solutions" section.
        Rendered with Healthcare data. Pick one to ship.
      </p>
    </div>

    <VariantShell
      index="01"
      name="Numbered editorial list"
      blurb="Stripe-style. Big practice name, proof beside it, thin rules. Calm, confident, fits the rest of the site."
    >
      <VariantList />
    </VariantShell>

    <VariantShell
      index="02"
      name="Bento with practice motifs"
      blurb="Asymmetric grid. Plexus motifs reused as ambient art. One large hero card, the rest smaller."
    >
      <VariantBento />
    </VariantShell>

    <VariantShell
      index="03"
      name="Tabbed practice viewer"
      blurb="Sticky left rail of practices, detail panel on the right. Lets us fit more depth without scrolling."
    >
      <VariantTabs />
    </VariantShell>

    <VariantShell
      index="04"
      name="Outcome-first cards"
      blurb="Lead with the outcome in big type. Demote the practice name to the eyebrow. Reframes the section from 'our practices' to 'what happens when we work with you.'"
    >
      <VariantOutcome />
    </VariantShell>

    <div className="container-page py-16" />
  </Layout>
);

export default SolutionsForIndustryLab;
