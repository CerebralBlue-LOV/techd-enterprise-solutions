/**
 * Reusable decorative backdrop matching the hero:
 *  1. Faint engineered grid (masked radial fade)
 *  2. Soft drifting cyan gradient blobs
 *  3. Top + bottom vignettes into background
 *
 * Place inside a `relative overflow-hidden` section, before the content.
 * Use `intensity="soft"` (default) for in-page sections, `"strong"` for hero-like areas.
 */
type Props = {
  intensity?: "soft" | "strong";
  /** Tailwind background color class for vignettes (defaults to bg-background). */
  vignetteClass?: string;
};

export const SectionBackdrop = ({
  intensity = "soft",
  vignetteClass = "from-background",
}: Props) => {
  const strong = intensity === "strong";
  const gridOpacity = strong ? 0.55 : 0.4;
  const blobA = strong ? "bg-primary/15" : "bg-primary/10";
  const blobB = strong ? "bg-primary/10" : "bg-primary/[0.07]";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1. Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--border) / ${gridOpacity}) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / ${gridOpacity}) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          WebkitMaskImage:
            "radial-gradient(80% 90% at 50% 50%, black 35%, transparent 85%)",
          maskImage:
            "radial-gradient(80% 90% at 50% 50%, black 35%, transparent 85%)",
        }}
      />

      {/* 2. Gradient wash */}
      <div
        className={`absolute -top-40 -right-32 h-[640px] w-[640px] rounded-full ${blobA} blur-3xl animate-gradient-drift`}
      />
      <div
        className={`absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full ${blobB} blur-3xl animate-gradient-drift`}
        style={{ animationDelay: "-9s" }}
      />

      {/* 3. Vignettes */}
      <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${vignetteClass} to-transparent`} />
      <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${vignetteClass} to-transparent`} />
    </div>
  );
};

export default SectionBackdrop;
