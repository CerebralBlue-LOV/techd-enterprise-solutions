import { useState } from "react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";
import { cn } from "@/lib/utils";

interface Props {
  practice: Solution;
}

/**
 * Pull-quote + ledger ("W2" from /section-lab).
 * Click any ledger note to promote it into the quote slot;
 * the previously-active point demotes back into the ledger.
 */
export const WhyPracticeSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  const points = extras?.whyPoints ?? [];
  const [active, setActive] = useState(0);

  if (!points.length) return null;

  const activePoint = points[active] ?? points[0];
  const rest = points
    .map((p, i) => ({ p, i }))
    .filter(({ i }) => i !== active);

  return (
    <section
      id="why"
      className="relative py-14 md:py-20 scroll-mt-24 border-t border-border bg-background overflow-hidden"
    >
      <SectionMarker page={`Solutions / ${practice.name}`} name="Why TechD" />

      {/* faint dot grid, masked to upper-left */}
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

      <div className="container-page relative">
        <Reveal>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Why TechD · {practice.name}
          </p>
        </Reveal>

        {/* Pull-quote — re-keyed on active so it animates on swap */}
        <div key={active} className="mt-6 max-w-5xl animate-fade-in motion-reduce:animate-none">
          <p
            className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight text-secondary"
            aria-live="polite"
          >
            <span className="text-primary font-bold">“</span>
            {activePoint.title}
            <span className="text-primary font-bold">”</span>
          </p>
          <p className="mt-6 text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl">
            {activePoint.body}
          </p>
        </div>

        {/* Ledger of remaining notes — clickable to promote */}
        {rest.length > 0 && (
          <div className="relative mt-12 md:mt-16 border-t border-border pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-border">
              {rest.map(({ p, i }, idx) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={false}
                  className={cn(
                    "group relative text-left py-5 md:py-3 md:px-6 first:md:pl-0 last:md:pr-0",
                    "transition-all duration-300 ease-out motion-reduce:transition-none",
                    "hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                    "animate-fade-in motion-reduce:animate-none",
                  )}
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  {/* hover cyan top hairline */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-border overflow-hidden md:left-6 md:right-6 first:md:left-0 last:md:right-0"
                  >
                    <span className="block h-full w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                  </span>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                    Note · {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-base font-bold text-secondary leading-snug transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Section seam — closes Why, opens next */}
        <div className="mt-16 md:mt-20 flex items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap">
            § Next · Products
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-primary/40" />
        </div>
      </div>
    </section>
  );
};

export default WhyPracticeSection;
