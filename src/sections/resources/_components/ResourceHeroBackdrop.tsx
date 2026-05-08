import ResourcesFigure from "@/components/shared/heroFigures/ResourcesFigure";

interface BackdropProps {
  /** Kept for API compatibility — not used by this layout. */
  cursor?: { x: number; y: number } | null;
}

/**
 * Resource hero backdrop — engineered grid + ResourcesFigure on the right,
 * with the same soft cyan washes / vignette family used elsewhere.
 */
export const ResourceHeroBackdrop = (_: BackdropProps) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
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
        <ResourcesFigure />
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

      <div className="absolute -top-40 -right-32 h-[640px] w-[640px] rounded-full bg-primary/15 blur-3xl animate-gradient-drift" />
      <div
        className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="absolute bottom-0 left-[10%] h-[420px] w-[680px] rounded-full bg-background blur-3xl animate-gradient-drift"
        style={{ animationDelay: "-4s" }}
      />

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
};

export default ResourceHeroBackdrop;
