import { Suspense, lazy } from "react";

const PillarsScene = lazy(() => import("./IndustryPillarsScene"));

interface BackdropProps {
  /** Kept for API compatibility. */
  cursor?: { x: number; y: number } | null;
}

export const IndustryHeroBackdrop = (_: BackdropProps) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Engineered grid */}
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

      <div className="absolute inset-y-0 right-0 hidden md:block md:w-[60%] lg:w-[55%]">
        <Suspense fallback={null}>
          <PillarsScene tiltX={0} tiltY={0} />
        </Suspense>
      </div>
    </div>
  );
};

export default IndustryHeroBackdrop;
