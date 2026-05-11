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

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: interactive list */}
          <div className="lg:col-span-5">
            <ul className="flex flex-col" role="tablist" aria-label="Industries">
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
                      className={cn(
                        "group relative w-full text-left py-6 border-b border-border transition-colors duration-300",
                        "flex items-center gap-5",
                      )}
                    >
                      {/* Active indicator bar */}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-0 top-1/2 -translate-y-1/2 w-[3px] bg-primary transition-all duration-500",
                          isActive ? "h-12 opacity-100" : "h-0 opacity-0",
                        )}
                      />
                      {/* Index */}
                      <span
                        className={cn(
                          "text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 w-8",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {num}
                      </span>
                      {/* Name */}
                      <span
                        className={cn(
                          "flex-1 text-2xl md:text-3xl font-bold leading-tight tracking-tight transition-all duration-500",
                          isActive ? "text-secondary translate-x-1" : "text-muted-foreground/70 group-hover:text-secondary",
                        )}
                      >
                        {it.ind.name}
                      </span>
                      {/* Arrow */}
                      <ArrowRight
                        className={cn(
                          "h-5 w-5 transition-all duration-500",
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

          {/* Right: animated preview panel */}
          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl bg-secondary">
              {/* Animated cyan gradient blobs */}
              <div
                aria-hidden
                className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/30 blur-3xl animate-[blob-drift_18s_ease-in-out_infinite]"
              />
              <div
                aria-hidden
                className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-[blob-drift_22s_ease-in-out_infinite_reverse]"
              />

              {/* Decorative grid lines */}
              <svg
                aria-hidden
                className="absolute inset-0 h-full w-full opacity-[0.08]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="practice-ind-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-background" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#practice-ind-grid)" />
              </svg>

              {/* Orbiting decorative ring */}
              <div
                aria-hidden
                className="absolute -right-32 -bottom-32 h-[28rem] w-[28rem] rounded-full border border-primary/20 animate-[spin_60s_linear_infinite]"
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary" />
              </div>
              <div
                aria-hidden
                className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full border border-primary/10 animate-[spin_45s_linear_infinite_reverse]"
              />

              {/* Content — keyed so it re-mounts and re-animates on change */}
              <div key={current.ind.id} className="relative z-10 flex h-full flex-col justify-between p-10 md:p-14 animate-fade-in">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                    {current.ind.regulation}
                  </p>
                  <h3 className="mt-4 text-4xl md:text-5xl font-bold text-background leading-[1.05] tracking-tight">
                    {current.ind.name}
                  </h3>
                  <p className="mt-5 max-w-lg text-base md:text-lg font-light text-background/75 leading-relaxed">
                    {current.proof}
                  </p>
                </div>

                <Link
                  to={`/industries/${current.ind.id}`}
                  className="group/cta mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-background transition-all duration-300 hover:gap-3 hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
                >
                  View {current.ind.name}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesServedSection;
