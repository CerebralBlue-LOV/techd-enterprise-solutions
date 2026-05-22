import { Suspense, lazy, type ComponentType } from "react";
import { useIsMobile } from "@hooks/use-mobile";
import HeroFigureFallback from "@shared/heroFigures/HeroFigureFallback";
import { type Solution } from "@content/solutions";

const AiGenerativeFigure = lazy(
  () => import("@shared/heroFigures/solutions/AiGenerativeFigure")
);
const DataAnalyticsFigure = lazy(
  () => import("@shared/heroFigures/solutions/DataAnalyticsFigure")
);
const AutomationFinOpsFigure = lazy(
  () => import("@shared/heroFigures/solutions/AutomationFinOpsFigure")
);
const SecurityComplianceFigure = lazy(
  () => import("@shared/heroFigures/solutions/SecurityComplianceFigure")
);

const FIGURES: Record<Solution["id"], ComponentType> = {
  "ai-generative": AiGenerativeFigure,
  "data-analytics": DataAnalyticsFigure,
  "automation-finops": AutomationFinOpsFigure,
  "security-compliance": SecurityComplianceFigure,
};

interface Props {
  practiceId: Solution["id"];
}

/** Lazy wrapper that renders the right hero figure for a practice.
 *  Mobile renders only a static cyan glow — three.js is never loaded. */
export const PracticeFigure = ({ practiceId }: Props) => {
  const isMobile = useIsMobile();
  const Figure = FIGURES[practiceId];
  if (!Figure) return null;
  if (isMobile) return <HeroFigureFallback />;
  return (
    <Suspense fallback={<HeroFigureFallback />}>
      <Figure />
    </Suspense>
  );
};

export default PracticeFigure;
