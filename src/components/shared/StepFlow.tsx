import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Step = {
  label: string;
  detail?: string;
  icon?: ReactNode;
};

interface Props {
  steps: Step[];
  /** "horizontal" on md+, always vertical on mobile. "vertical" stacks always. */
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/**
 * Numbered step flow with a connector line between nodes.
 * Used to visualize multi-stage processes — engagement stages, AI
 * Operating Model pillars, methodology preview.
 */
export const StepFlow = ({ steps, orientation = "horizontal", className }: Props) => {
  const horizontal = orientation === "horizontal";

  return (
    <ol
      className={cn(
        "relative",
        horizontal
          ? "grid gap-6 md:grid-cols-" + steps.length
          : "flex flex-col gap-6",
        className,
      )}
      style={horizontal ? { gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` } : undefined}
    >
      {steps.map((s, i) => (
        <li key={s.label} className="relative">
          {/* connector */}
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className={cn(
                "absolute bg-border",
                horizontal
                  ? "hidden md:block top-4 left-1/2 h-px w-full"
                  : "left-3.5 top-8 h-full w-px",
              )}
            />
          )}
          <div className="relative flex items-start gap-3">
            <span
              className={cn(
                "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary bg-background text-[11px] font-bold text-primary",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-secondary leading-tight">
                {s.icon ? <span className="mr-1.5 inline-flex align-middle text-primary">{s.icon}</span> : null}
                {s.label}
              </p>
              {s.detail && (
                <p className="mt-1.5 text-xs font-light text-muted-foreground leading-relaxed">
                  {s.detail}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default StepFlow;
