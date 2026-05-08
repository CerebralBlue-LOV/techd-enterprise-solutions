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
      <div className="absolute inset-y-0 right-0 hidden md:block md:w-[60%] lg:w-[55%]">
        <Suspense fallback={null}>
          <PillarsScene tiltX={0} tiltY={0} />
        </Suspense>
      </div>
    </div>
  );
};

export default IndustryHeroBackdrop;
