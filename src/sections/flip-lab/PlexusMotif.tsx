import type { ImgHTMLAttributes } from "react";

export type MotifVariant = "ai" | "data" | "automation" | "security" | "cloud";

interface Props {
  image: string;
  alt?: string;
  variant: MotifVariant;
}

/**
 * PlexusMotif — static webp image with a per-variant CSS effect layer
 * sitting between the cyan halo and the image. The image itself never
 * moves — only the overlay animates.
 */
export const PlexusMotif = ({ image, alt = "", variant }: Props) => (
  <div className="flip-motif-svg flex items-end justify-end">
    {/* Soft cyan glow halo */}
    <div
      aria-hidden="true"
      className="absolute right-0 bottom-0 h-[85%] w-[85%] rounded-full opacity-60 blur-2xl"
      style={{
        background:
          "radial-gradient(circle at 70% 70%, hsl(var(--primary) / 0.35), transparent 65%)",
      }}
    />

    {/* Per-variant effect layer */}
    <VariantFx variant={variant} />

    <img
      src={image}
      alt={alt}
      loading="lazy"
      width={1024}
      height={1024}
      className="relative h-full w-full object-contain object-bottom-right"
      style={{ objectPosition: "bottom right" } as ImgHTMLAttributes<HTMLImageElement>["style"]}
    />
  </div>
);

const VariantFx = ({ variant }: { variant: MotifVariant }) => {
  const base =
    "pointer-events-none absolute inset-0 flip-fx-layer flip-fx-" + variant;
  switch (variant) {
    case "ai":
      return (
        <div aria-hidden="true" className={base}>
          <span className="flip-fx-ai-sweep" />
          <span className="flip-fx-synapse" style={{ top: "32%", right: "38%", animationDelay: "0s" }} />
          <span className="flip-fx-synapse" style={{ top: "48%", right: "22%", animationDelay: "0.6s" }} />
          <span className="flip-fx-synapse" style={{ top: "62%", right: "44%", animationDelay: "1.2s" }} />
        </div>
      );
    case "data":
      return (
        <div aria-hidden="true" className={base}>
          <span className="flip-fx-data-scan" />
          <span className="flip-fx-data-ticker">01001 10110 01101 11010 00111 10101</span>
        </div>
      );
    case "automation":
      return (
        <div aria-hidden="true" className={base}>
          <span className="flip-fx-orbit-ring flip-fx-orbit-a" />
          <span className="flip-fx-orbit-ring flip-fx-orbit-b" />
          <span className="flip-fx-orbit-core" />
        </div>
      );
    case "security":
      return (
        <div aria-hidden="true" className={base}>
          <svg className="flip-fx-hex-grid" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="hexp" width="12" height="10.4" patternUnits="userSpaceOnUse">
                <path
                  d="M6 0 L12 3.46 L12 6.93 L6 10.4 L0 6.93 L0 3.46 Z"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="0.4"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#hexp)" />
          </svg>
          <span className="flip-fx-radar" />
        </div>
      );
    case "cloud":
      return (
        <div aria-hidden="true" className={base}>
          <span className="flip-fx-shimmer" />
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="flip-fx-particle"
              style={{
                left: `${20 + i * 9}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${5 + (i % 3)}s`,
              }}
            />
          ))}
        </div>
      );
  }
};

export default PlexusMotif;
