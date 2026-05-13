import { useEffect, useRef, useState } from "react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";
import { cn } from "@/lib/utils";

interface Props {
  practice: Solution;
}

/**
 * Pull-quote + ledger ("W2"). Click any ledger note to promote it
 * into the quote slot with a soft cross-fade.
 */
export const WhyPracticeSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  const points = extras?.whyPoints ?? [];

  const [active, setActive] = useState(0);
  // Displayed point lags `active` by one fade-out cycle so we can cross-fade.
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
    // Intentionally only depend on `active` so the in-flight timeouts
    // aren't cleared when `displayed` updates mid-transition.
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
  const rest = points
    .map((p, i) => ({ p, i }))
    .filter(({ i }) => i !== displayed);

  const quoteState =
    phase === "out"
      ? "opacity-0 translate-y-1"
      : phase === "in"
        ? "opacity-100 translate-y-0"
        : "opacity-100 translate-y-0";

  return (
    <section
      id="why"
      className="relative py-14 md:py-20 scroll-mt-24 border-t border-border bg-background overflow-hidden"
    >
      <SectionMarker page={`Solutions / ${practice.name}`} name="Why TechD" />

      <div className="container-page relative">
        <Reveal>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Why TechD · {practice.name}
          </p>
        </Reveal>

        {/* Pull-quote — soft cross-fade between active points */}
        <div
          className={cn(
            "mt-6 max-w-5xl min-h-[180px] sm:min-h-[200px] md:min-h-[240px] transition-all duration-300 ease-out motion-reduce:transition-none",
            quoteState,
          )}
          aria-live="polite"
        >
          <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light leading-[1.15] md:leading-[1.1] tracking-tight text-secondary">
            <span className="text-primary font-bold">“</span>
            {activePoint.title}
            <span className="text-primary font-bold">”</span>
          </p>
          <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-2xl">
            {activePoint.body}
          </p>
        </div>

        {/* Ledger of remaining notes — clickable to promote */}
        {rest.length > 0 && (
          <div className="relative mt-10 md:mt-16 border-y border-border py-6 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y divide-border md:divide-y-0 md:divide-x">
              {rest.map(({ p, i }) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group text-left py-5 first:pt-0 last:pb-0 md:py-3 md:px-6 md:first:pt-3 md:last:pb-3 md:first:pl-0 md:last:pr-0",
                    "transition-all duration-300 ease-out motion-reduce:transition-none",
                    "hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                  )}
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                    Note · {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 md:mt-3 text-base font-bold text-secondary leading-snug transition-colors group-hover:text-primary">
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
      </div>
    </section>
  );
};

export default WhyPracticeSection;
