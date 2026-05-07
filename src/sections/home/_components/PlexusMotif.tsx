import type { ImgHTMLAttributes } from "react";

export type MotifVariant = "ai" | "data" | "automation" | "security" | "cloud";

interface Props {
  image: string;
  alt?: string;
  variant: MotifVariant;
}

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

export default PlexusMotif;
