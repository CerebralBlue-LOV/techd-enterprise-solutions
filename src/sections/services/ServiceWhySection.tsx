import { useEffect, useRef, useState } from "react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import { type Service } from "@content/services";
import { SERVICES_EXTRAS } from "@content/services-extras";
import { cn } from "@/lib/utils";

interface Props {
  service: Service;
}

/**
 * Pull-quote + ledger. Click any ledger note to promote it
 * into the quote slot with a soft cross-fade.
 * Mirrors src/sections/solutions/WhyPracticeSection.tsx.
 */
export const ServiceWhySection = ({ service }: Props) => {
  const extras = SERVICES_EXTRAS[service.id];
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
      <SectionMarker page={`Services / ${service.name}`} name="Why TechD" />

      <div className="container-page relative">
        <Reveal>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Why TechD · {service.name}
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

        {/* Ledger of all notes — clickable to promote, active is highlighted in place */}
        {points.length > 1 && (
          <div className="relative mt-10 md:mt-16 border-y border-border py-6 md:py-16">
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
                      "group text-left py-5 first:pt-0 last:pb-0 md:py-3 md:px-6 md:first:pt-3 md:last:pb-3 md:first:pl-0 md:last:pr-0",
                      "transition-all duration-300 ease-out motion-reduce:transition-none",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                      isActive
                        ? "opacity-100"
                        : "opacity-70 hover:opacity-100 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
                    )}
                  >
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                      Note · {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className={cn(
                        "mt-2 md:mt-3 text-base font-bold leading-snug transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-secondary group-hover:text-primary",
                      )}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm font-light text-muted-foreground leading-relaxed">
                      {p.body}
                    </p>
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

export default ServiceWhySection;
