import Reveal from "@shared/Reveal";
import SectionHeading from "@shared/SectionHeading";
import SectionMarker from "@shared/SectionMarker";
import { SOLUTIONS } from "@content/solutions";
import FlipCard from "@sections/home/_components/FlipCard";
import AiGenerativeFigure from "@/components/shared/heroFigures/solutions/AiGenerativeFigure";
import DataAnalyticsFigure from "@/components/shared/heroFigures/solutions/DataAnalyticsFigure";
import AutomationFinOpsFigure from "@/components/shared/heroFigures/solutions/AutomationFinOpsFigure";
import SecurityComplianceFigure from "@/components/shared/heroFigures/solutions/SecurityComplianceFigure";
import HybridCloudFigure from "@/components/shared/heroFigures/solutions/HybridCloudFigure";
import type { ComponentType } from "react";

const FIGURES: Record<string, { Figure: ComponentType; backTitle: string; footer: string }> = {
  "ai-generative": { Figure: AiGenerativeFigure, backTitle: "Production-grade AI", footer: "United States" },
  "data-analytics": { Figure: DataAnalyticsFigure, backTitle: "Data foundations", footer: "United States" },
  "automation-finops": { Figure: AutomationFinOpsFigure, backTitle: "Run smarter", footer: "Global" },
  "security-compliance": { Figure: SecurityComplianceFigure, backTitle: "Defense in depth", footer: "Regulated industries" },
  "hybrid-cloud": { Figure: HybridCloudFigure, backTitle: "Anywhere, governed", footer: "United States" },
};

/**
 * Section: Home / Solutions Grid
 * Five practice flip cards. Card motifs use the shared per-practice r3f
 * wireframe figures so the home grid speaks the same graphic line as the
 * /solutions/* hero backdrops.
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

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((s, i) => {
          const m = FIGURES[s.id];
          if (!m) return null;
          const { Figure } = m;
          return (
            <Reveal key={s.id} delay={i * 50}>
              <FlipCard
                to={`/solutions/${s.id}`}
                eyebrow={s.name}
                title={s.outcome}
                footer={m.footer}
                backTitle={m.backTitle}
                backBody={s.pitch}
                chips={s.products.slice(0, 5).map((p) => p.name)}
                ctaLabel={s.ctaLabel}
                motif={<Figure />}
              />
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default SolutionsGridSection;
