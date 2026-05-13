import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Intensity = "vivid" | "soft";

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** "vivid" = strong cyan glow (centerpiece). "soft" = subdued (transition rail). */
  intensity?: Intensity;
  /** id passed through for anchor links. */
  id?: string;
}

const PANEL_BG: CSSProperties = {
  background:
    "linear-gradient(160deg, hsl(var(--secondary)) 0%, hsl(var(--secondary) / 0.92) 60%, hsl(220 15% 12%) 100%)",
};

const SOFTER_BG: CSSProperties = {
  background:
    "linear-gradient(170deg, hsl(220 15% 14%) 0%, hsl(var(--secondary)) 55%, hsl(var(--secondary) / 0.95) 100%)",
};

const LEVELS: Record<
  Intensity,
  { shimmer: string; stop1: string; stop2: string; blobA: string; blobB: string; blobC: string }
> = {
  vivid: { shimmer: "opacity-50", stop1: "0.55", stop2: "0.35", blobA: "0.55", blobB: "0.45", blobC: "0.4" },
  soft:  { shimmer: "opacity-25", stop1: "0.30", stop2: "0.20", blobA: "0.30", blobB: "0.25", blobC: "0.20" },
};

/**
 * Full-bleed dark section wrapper — same gradient/shimmer/blob system as
 * DarkGlowPanel, but applied to a `<section>` instead of a card. Pairs with
 * the DarkGlowPanel CTA at the bottom of the page so dark beats stitch
 * together. Respects prefers-reduced-motion via animate-none.
 */
export const DarkSection = ({
  children,
  intensity = "vivid",
  id,
  className,
  style,
  ...rest
}: Props) => {
  const lv = LEVELS[intensity];
  const bg = intensity === "soft" ? SOFTER_BG : PANEL_BG;
  return (
    <section
      id={id}
      {...rest}
      className={cn(
        "relative overflow-hidden border-y border-white/10 motion-reduce:[&_*]:!animate-none",
        className,
      )}
      style={{ ...bg, ...style }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn("absolute -inset-1/2 animate-shimmer-rotate", lv.shimmer)}
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, hsl(var(--primary) / ${lv.stop1}) 60deg, transparent 140deg, hsl(var(--primary) / ${lv.stop2}) 240deg, transparent 320deg)`,
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -top-1/4 -left-1/4 h-[70%] w-[70%] rounded-full animate-blob-a"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / ${lv.blobA}) 0%, transparent 60%)`,
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute top-0 -right-1/4 h-[65%] w-[65%] rounded-full animate-blob-b"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / ${lv.blobB}) 0%, transparent 65%)`,
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-1/4 left-1/4 h-[60%] w-[60%] rounded-full animate-blob-c"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / ${lv.blobC}) 0%, transparent 60%)`,
            filter: "blur(75px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: "radial-gradient(hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        />
      </div>

      <div className="relative">{children}</div>
    </section>
  );
};

export default DarkSection;
