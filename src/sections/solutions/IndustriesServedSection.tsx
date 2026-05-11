import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionMarker from "@shared/SectionMarker";
import SectionHeading from "@shared/SectionHeading";
import { cn } from "@/lib/utils";
import { type Solution } from "@content/solutions";
import { PRACTICE_EXTRAS } from "@content/solutions-extras";
import { INDUSTRIES, type Industry } from "@content/industries";

interface Props {
  practice: Solution;
}

type Item = { ind: Industry; proof: string };

export const IndustriesServedSection = ({ practice }: Props) => {
  const extras = PRACTICE_EXTRAS[practice.id];
  const [active, setActive] = useState(0);

  if (!extras?.industries?.length) return null;

  const items: Item[] = extras.industries
    .map((i) => {
      const ind = INDUSTRIES.find((x) => x.id === i.id);
      return ind ? { ind, proof: i.proof } : null;
    })
    .filter((x): x is Item => Boolean(x));

  const current = items[active];

  return (
    <section id="industries" className="section scroll-mt-24">
      <SectionMarker page={`Solutions / ${practice.name}`} name="Industries served" />
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Industries we serve"
            title="Where this practice has shipped"
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: minimal dark preview panel */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-2xl bg-secondary">
              {/* Single subtle cyan glow */}
              <div
                aria-hidden
                className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-[blob-drift_22s_ease-in-out_infinite]"
              />

              {/* Faint grid */}
              <svg
                aria-hidden
                className="absolute inset-0 h-full w-full opacity-[0.05]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="practice-ind-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-background" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#practice-ind-grid)" />
              </svg>

              {/* Content — keyed so it re-mounts and re-animates on change */}
              <div key={current.ind.id} className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10 animate-fade-in">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
                    {current.ind.regulation}
                  </p>
                  <h3 className="mt-4 text-3xl md:text-4xl font-bold text-background leading-[1.1] tracking-tight">
                    {current.ind.name}
                  </h3>
                  <p className="mt-4 max-w-md text-sm md:text-base font-light text-background/70 leading-relaxed">
                    {current.proof}
                  </p>
                </div>

                <Link
                  to={`/industries/${current.ind.id}`}
                  className="group/cta mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-primary transition-all duration-300 hover:gap-2.5"
                >
                  View {current.ind.name}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: minimal interactive list */}
          <div className="lg:col-span-6 flex items-center">
            <ul className="w-full flex flex-col" role="tablist" aria-label="Industries">
              {items.map((it, i) => {
                const isActive = i === active;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <li key={it.ind.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="group relative w-full text-left py-5 border-b border-border flex items-center gap-5"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-0 top-1/2 -translate-y-1/2 w-[2px] bg-primary transition-all duration-500",
                          isActive ? "h-10 opacity-100" : "h-0 opacity-0",
                        )}
                      />
                      <span
                        className={cn(
                          "text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 w-8",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {num}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-xl md:text-2xl font-bold leading-tight tracking-tight transition-all duration-500",
                          isActive ? "text-secondary translate-x-1" : "text-muted-foreground/70 group-hover:text-secondary",
                        )}
                      >
                        {it.ind.name}
                      </span>
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 transition-all duration-500",
                          isActive
                            ? "text-primary opacity-100 translate-x-0"
                            : "text-muted-foreground opacity-0 -translate-x-2",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesServedSection;
