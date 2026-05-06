import type { ImgHTMLAttributes } from "react";

interface Props {
  image: string;
  alt?: string;
}

/**
 * PlexusMotif — single image-based motif used by all flip cards.
 * Anchors bottom-right inside the card with a soft glow halo behind.
 */
export const PlexusMotif = ({ image, alt = "" }: Props) => (
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

export default PlexusMotif;
