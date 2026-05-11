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

interface BackdropProps {
  /** Kept for API compatibility — not used by the new layout. */
  cursor?: { x: number; y: number } | null;
  practiceId?: Solution["id"];
}

/**
 * Practice hero backdrop — mirrors the home hero pattern, but now renders
 * the per-practice wireframe figure on the right side.
 */
export const PracticeHeroBackdrop = ({ practiceId }: BackdropProps) => {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const Figure = practiceId ? FIGURES[practiceId] : null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* 1. Engineered grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border) / 0.55) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.55) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage:
            "radial-gradient(80% 90% at 50% 35%, black 35%, transparent 85%)",
          maskImage:
            "radial-gradient(80% 90% at 50% 35%, black 35%, transparent 85%)",
        }}
      />

      {/* 2. Right-side per-practice figure */}
      <div className="absolute inset-y-0 right-0 hidden md:block md:w-[60%] lg:w-[55%]">
        {Figure ? (
          <Suspense fallback={null}>
            <Figure />
          </Suspense>
        ) : null}
        {/* Edge fades — radial on the left so it blends only where the graphic sits */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 70% at 0% 60%, hsl(var(--background)) 0%, hsl(var(--background) / 0.85) 35%, transparent 75%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* 3. Gradient wash */}
      <div className="absolute -top-40 -right-32 h-[640px] w-[640px] rounded-full bg-primary/15 blur-3xl animate-gradient-drift" />
      <div
        className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="absolute bottom-0 left-[10%] h-[420px] w-[680px] rounded-full bg-background blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-4s" }}
      />

      {/* 4. Top vignette */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />

      {reduced ? <span className="hidden" data-reduced="true" /> : null}
    </div>
  );
};

export default PracticeHeroBackdrop;
