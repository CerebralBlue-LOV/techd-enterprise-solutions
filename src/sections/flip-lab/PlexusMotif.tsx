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
    <div
      aria-hidden="true"
      className="absolute right-0 bottom-0 h-[85%] w-[85%] rounded-full opacity-60 blur-2xl"
      style={{
        background:
          "radial-gradient(circle at 70% 70%, hsl(var(--primary) / 0.35), transparent 65%)",
      }}
    />

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
  const base = "pointer-events-none absolute inset-0 flip-fx-layer flip-fx-" + variant;
  switch (variant) {
    case "ai":
      // Concentric "thought wave" rings rippling out
      return (
        <div aria-hidden="true" className={base}>
          <span className="flip-fx-ring" style={{ animationDelay: "0s" }} />
          <span className="flip-fx-ring" style={{ animationDelay: "1.3s" }} />
          <span className="flip-fx-ring" style={{ animationDelay: "2.6s" }} />
        </div>
      );
    case "data":
      // Equalizer bars rising from bottom-right
      return (
        <div aria-hidden="true" className={base}>
          <div className="flip-fx-eq">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      );
    case "automation":
      // Dashed ring with a traveling spark
      return (
        <div aria-hidden="true" className={base}>
          <span className="flip-fx-cog-ring" />
          <span className="flip-fx-cog-spark">
            <span />
          </span>
        </div>
      );
    case "security":
      // Corner brackets locking inward + center diamond glow
      return (
        <div aria-hidden="true" className={base}>
          <span className="flip-fx-bracket flip-fx-bracket-tl" />
          <span className="flip-fx-bracket flip-fx-bracket-tr" />
          <span className="flip-fx-bracket flip-fx-bracket-bl" />
          <span className="flip-fx-bracket flip-fx-bracket-br" />
          <span className="flip-fx-diamond" />
        </div>
      );
    case "cloud":
      // Soft drifting gradient blobs (mist)
      return (
        <div aria-hidden="true" className={base}>
          <span className="flip-fx-mist flip-fx-mist-a" />
          <span className="flip-fx-mist flip-fx-mist-b" />
          <span className="flip-fx-mist flip-fx-mist-c" />
        </div>
      );
  }
};

export default PlexusMotif;
