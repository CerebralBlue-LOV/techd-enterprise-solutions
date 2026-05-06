import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";
import { SOLUTIONS } from "@content/solutions";
import SolutionCard from "./_shared/SolutionCard";

/**
 * Section: Home / Solutions Grid
 * Five practice cards. Hover flips the entire card (slow ease) and reveals a
 * short pitch + CTA on the back. A cyan→white beam rotates around the border.
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
          const featured = s.id === "ai";
          return (
            <Reveal key={s.id} delay={i * 50}>
              <SolutionCard
                to={`/solutions#${s.id}`}
                featured={featured}
                pitch={s.pitch}
                ctaLabel={s.ctaLabel}
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {s.name}
                </p>
                <h3 className="mt-3 text-2xl leading-tight lg:text-[26px]">
                  {s.outcome}
                </h3>
                <p className="mt-4 text-sm font-light text-muted-foreground">
                  {s.description}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6">
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
              </SolutionCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default SolutionsGridSection;
