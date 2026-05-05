import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Cloud,
  Database,
  Lock,
  Sparkles,
} from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";
import { SOLUTIONS } from "@content/solutions";

/** Map of solution id → lucide icon. Kept colocated with the section that uses it. */
const SOLUTION_ICONS: Record<string, typeof Bot> = {
  ai: Bot,
  "data-analytics": Database,
  automation: Sparkles,
  security: Lock,
  "hybrid-cloud": Cloud,
};

/**
 * Section: Home / Solutions Grid
 * Purpose: Showcase the five practice areas as clickable cards.
 * Order:   3 of 7 on the Home page.
 * Data:    @content/solutions (SOLUTIONS array).
 * Notes:   The "ai" card is featured (primary border + ring).
 *          Each card links to /solutions#<id> for in-page navigation.
 */
export const SolutionsGridSection = () => (
  <section className="section">
    <SectionMarker page="Home" name="Solutions Grid" />
    <div className="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Solutions"
          title="Five practices. One outcome: leverage."
          subtitle="Each practice is led by senior IBM-certified practitioners with a decade-plus of enterprise delivery on watsonx, Db2, OpenShift, and the modern data stack."
        />
      </Reveal>

      {/* Card grid — 3-up on lg, 2-up on md, single column on mobile. */}
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((s, i) => {
          const Icon = SOLUTION_ICONS[s.id] ?? Sparkles;
          const featured = s.id === "ai";
          return (
            <Reveal key={s.id} delay={i * 50}>
              <Link
                to={`/solutions#${s.id}`}
                className={
                  "group relative block h-full rounded-xl p-7 border transition-all duration-300 hover:-translate-y-0.5 " +
                  (featured
                    ? "bg-background border-primary ring-1 ring-primary/20 shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.35)] hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.5)]"
                    : "bg-background border-border hover:border-primary hover:shadow-lg")
                }
              >
                {featured && (
                  <span className="absolute right-5 top-5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                    Featured
                  </span>
                )}
                <div
                  className={
                    "inline-flex h-14 w-14 items-center justify-center rounded-xl border transition-colors duration-300 " +
                    (featured
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-muted/50 text-secondary group-hover:border-primary group-hover:bg-primary/10 group-hover:text-primary")
                  }
                >
                  <Icon className="!size-6" strokeWidth={1.5} />
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {s.name}
                </p>
                <h3 className="mt-3 text-2xl leading-tight">{s.outcome}</h3>
                <p className="mt-4 text-sm font-light text-muted-foreground">
                  {s.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.products.slice(0, 3).map((p) => (
                    <li
                      key={p.name}
                      className={
                        "rounded-full border px-3 py-1 text-[11px] font-light " +
                        (featured
                          ? "border-primary/40 bg-primary/5 text-secondary"
                          : "border-border text-muted-foreground")
                      }
                    >
                      {p.name}
                    </li>
                  ))}
                </ul>
                <span className="mt-7 inline-flex items-center gap-1 text-sm font-bold text-primary">
                  Learn more{" "}
                  <ArrowRight className="!size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default SolutionsGridSection;
