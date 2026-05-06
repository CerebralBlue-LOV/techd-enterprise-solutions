import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";
import { SOLUTIONS } from "@content/solutions";
import { Suspense, lazy } from "react";
import SolutionCard from "./_shared/SolutionCard";

// Lazy-load each particle scene so the 5 canvases don't block initial paint.
const AIScene = lazy(() => import("./_shared/cards/AINeuralScene"));
const DataScene = lazy(() => import("./_shared/cards/DataGridScene"));
const AutoScene = lazy(() => import("./_shared/cards/AutomationFlowScene"));
const SecScene = lazy(() => import("./_shared/cards/SecurityDomeScene"));
const CloudScene = lazy(() => import("./_shared/cards/CloudOrbitScene"));

const SCENE_MAP: Record<string, React.LazyExoticComponent<React.FC<{ active?: boolean }>>> = {
  ai: AIScene,
  "data-analytics": DataScene,
  automation: AutoScene,
  security: SecScene,
  "hybrid-cloud": CloudScene,
};

/**
 * Section: Home / Solutions Grid
 * Five practice cards with three.js particle scenes, slide-up reveal panel
 * holding 3 key capabilities, and an underlined-text CTA. No icons. No flips.
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
          const Scene = SCENE_MAP[s.id];
          const featured = s.id === "ai";
          return (
            <Reveal key={s.id} delay={i * 50}>
              <SolutionCard
                to={`/solutions#${s.id}`}
                featured={featured}
                highlights={s.highlights}
                ctaLabel={s.ctaLabel}
                scene={(active) =>
                  Scene ? (
                    <Suspense fallback={null}>
                      <Scene active={active} />
                    </Suspense>
                  ) : null
                }
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
              </SolutionCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default SolutionsGridSection;
