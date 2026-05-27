import { lazy, Suspense, type ComponentType } from "react";
import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";
import { SOLUTIONS } from "@content/solutions";
import FlipCard from "@sections/home/_components/FlipCard";
import HeroFigureFallback from "@shared/heroFigures/HeroFigureFallback";

const AiGenerativeFigure = lazy(() => import("@shared/heroFigures/solutions/AiGenerativeFigure"));
const DataAnalyticsFigure = lazy(() => import("@shared/heroFigures/solutions/DataAnalyticsFigure"));
const AutomationFinOpsFigure = lazy(() => import("@shared/heroFigures/solutions/AutomationFinOpsFigure"));
const SecurityComplianceFigure = lazy(() => import("@shared/heroFigures/solutions/SecurityComplianceFigure"));
const InfrastructureFigure = lazy(() => import("@shared/heroFigures/solutions/InfrastructureFigure"));

const FIGURES: Record<string, { Figure: ComponentType; backTitle: string; footer: string }> = {
  "ai-generative": { Figure: AiGenerativeFigure, backTitle: "Production-grade AI", footer: "United States" },
  "data-analytics": { Figure: DataAnalyticsFigure, backTitle: "Data foundations", footer: "United States" },
  "automation-finops": { Figure: AutomationFinOpsFigure, backTitle: "Run smarter", footer: "Global" },
  "security-compliance": { Figure: SecurityComplianceFigure, backTitle: "Defense in depth", footer: "Regulated industries" },
  "infrastructure": { Figure: InfrastructureFigure, backTitle: "On-prem, cloud-grade", footer: "Sovereign & regulated" },
};

/**
 * Section: Home / Solutions Grid
 * Four practice flip cards. Card motifs use the shared per-practice r3f
 * wireframe figures so the home grid speaks the same graphic line as the
 * /solutions/* hero backdrops.
 */
export const SolutionsGridSection = () => (
  <section id="solutions" className="section">
    <SectionMarker page="Home" name="Solutions Grid" />
    <div className="container-page">
      <Reveal>
        <SectionHeading
          eyebrow="Solutions"
          title="Four practices. One outcome: leverage."
          subtitle="Each practice is led by senior IBM-certified practitioners with a decade-plus of enterprise delivery on watsonx, Db2, Cognos, and the modern data stack."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {SOLUTIONS.map((s, i) => {
          const m = FIGURES[s.id];
          if (!m) return null;
          const { Figure } = m;
          const isLastOdd = i === SOLUTIONS.length - 1 && SOLUTIONS.length % 2 === 1;
          return (
            <Reveal
              key={s.id}
              delay={i * 50}
              className={isLastOdd ? "md:col-span-2 md:max-w-[calc(50%-12px)] md:mx-auto md:w-full" : ""}
            >
              <FlipCard
                to={`/solutions/${s.id}`}
                eyebrow={s.name}
                title={s.outcome}
                footer={m.footer}
                backTitle={m.backTitle}
                backBody={s.pitch}
                chips={(() => {
                  const CAP = 6;
                  const all = s.products.map((p) => ({
                    label: p.name,
                    to: p.link.kind === "internal"
                      ? `/solutions/${s.id}/${p.link.slug}`
                      : p.link.url,
                    external: p.link.kind === "external",
                  }));
                  if (all.length <= CAP) return all;
                  const extra = all.length - CAP;
                  return [
                    ...all.slice(0, CAP),
                    { label: `+${extra} more`, to: `/solutions/${s.id}` },
                  ];
                })()}
                ctaLabel={s.ctaLabel}
                motif={<Suspense fallback={<HeroFigureFallback />}><Figure /></Suspense>}
              />
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default SolutionsGridSection;
