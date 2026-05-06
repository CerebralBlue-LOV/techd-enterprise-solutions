import { ArrowRight } from "lucide-react";
import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";
import { SOLUTIONS } from "@content/solutions";
import SolutionCard from "./_shared/SolutionCard";
import { SOLUTION_MOTIFS } from "./_shared/motifs";

/**
 * Section: Home / Solutions Grid
 * Five practice cards with unique animated SVG motifs, cursor-following
 * spotlight, and a subtle 3D tilt on hover. No icons, no flips.
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

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((s, i) => {
          const Motif = SOLUTION_MOTIFS[s.id];
          const featured = s.id === "ai";
          return (
            <Reveal key={s.id} delay={i * 50}>
              <SolutionCard
                to={`/solutions#${s.id}`}
                featured={featured}
                motif={Motif ? <Motif featured={featured} /> : null}
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
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
              </SolutionCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default SolutionsGridSection;
