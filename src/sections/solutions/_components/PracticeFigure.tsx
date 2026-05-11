import { Suspense, lazy, type ComponentType } from "react";
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
const HybridCloudFigure = lazy(
  () => import("@shared/heroFigures/solutions/HybridCloudFigure")
);

const FIGURES: Record<Solution["id"], ComponentType> = {
  "ai-generative": AiGenerativeFigure,
  "data-analytics": DataAnalyticsFigure,
  "automation-finops": AutomationFinOpsFigure,
  "security-compliance": SecurityComplianceFigure,
  "hybrid-cloud": HybridCloudFigure,
};

interface Props {
  practiceId: Solution["id"];
}

/** Lazy wrapper that renders the right hero figure for a practice. */
export const PracticeFigure = ({ practiceId }: Props) => {
  const Figure = FIGURES[practiceId];
  if (!Figure) return null;
  return (
    <Suspense fallback={null}>
      <Figure />
    </Suspense>
  );
};

export default PracticeFigure;
