import { useEffect, useRef, useState } from "react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Industry } from "@content/industries";
import { INDUSTRIES_EXTRAS } from "@content/industries-extras";
import { cn } from "@/lib/utils";

interface Props {
  industry: Industry;
}

/**
 * Pull-quote + ledger. Click any ledger note to promote it
 * into the quote slot with a soft cross-fade.
 * Mirrors src/sections/solutions/WhyPracticeSection.tsx.
 */
export const WhyIndustrySection = ({ industry }: Props) => {
  const extras = INDUSTRIES_EXTRAS[industry.id];
  const points = extras?.whyPoints ?? [];

  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    if (active === displayed) return;
    setPhase("out");
    const t1 = window.setTimeout(() => {
      setDisplayed(active);
      const t2 = window.setTimeout(() => setPhase("in"), 20);
      const t3 = window.setTimeout(() => setPhase("idle"), 340);
      timeouts.current.push(t2, t3);
    }, 200);
    timeouts.current.push(t1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(window.clearTimeout);
      timeouts.current = [];
    };
  }, []);

  if (!points.length) return null;

  const activePoint = points[displayed] ?? points[0];

  const quoteState =
    phase === "out"
      ? "opacity-0 translate-y-1"
      : "opacity-100 translate-y-0";

  return (
    <section
      id="why"
      className="relative py-14 md:py-20 scroll-mt-24 border-t border-border bg-background overflow-hidden"
    >
      <SectionMarker page={`Industries / ${industry.name}`} name="Why TechD" />

      <div className="container-page relative">
        <Reveal>
          <p className="eyebrow">
            Why TechD · {industry.name}
          </p>
        </Reveal>

        {/* Pull-quote — soft cross-fade between active points */}
        <div
          className={cn(
            "mt-6 max-w-5xl min-h-[110px] sm:min-h-[120px] md:min-h-[140px] transition-all duration-300 ease-out motion-reduce:transition-none",
            quoteState,
          )}
          aria-live="polite"
        >
          <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.15] md:leading-[1.1] tracking-tight text-secondary">
            <span className="text-primary font-bold">“</span>
            {activePoint.title}
            <span className="text-primary font-bold">”</span>
          </p>
          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl">
            {activePoint.body}
          </p>
        </div>

        {/* Ledger of all notes — clickable to promote, active is highlighted in place */}
        {points.length > 1 && (
          <div className="relative mt-8 md:mt-10 border-y border-border py-4 md:py-6">
            <div
              className={cn(
                "grid grid-cols-1 divide-y divide-border md:divide-y-0 md:divide-x",
                points.length === 2 && "md:grid-cols-2",
                points.length === 3 && "md:grid-cols-3",
                points.length >= 4 && "md:grid-cols-4",
              )}
            >
              {points.map((p, i) => {
                const isActive = i === displayed;
                return (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "group text-left py-2 first:pt-0 last:pb-0 md:py-1 md:px-4 md:first:pt-1 md:last:pb-1 md:first:pl-0 md:last:pr-0",
                      "transition-all duration-200 ease-out motion-reduce:transition-none cursor-pointer",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                    )}
                  >
                    <p
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
                        isActive ? "text-secondary" : "text-muted-foreground group-hover:text-secondary",
                      )}
                    >
                      Note · {String(i + 1).padStart(2, "0")}
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-3">
                      <h2
                        className={cn(
                          "text-lg md:text-xl font-light leading-snug tracking-tight transition-colors",
                          isActive ? "text-secondary" : "text-muted-foreground group-hover:text-secondary",
                        )}
                      >
                        {p.title}
                      </h2>
                      {isActive && (
                        <span
                          aria-hidden
                          className="shrink-0 text-primary font-bold text-2xl leading-none -mt-1"
                        >
                          “
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyIndustrySection;
