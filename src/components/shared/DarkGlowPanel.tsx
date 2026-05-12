import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Intensity = "vivid" | "soft";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** "vivid" = featured-card intensity. "soft" = CTA-panel intensity. */
  intensity?: Intensity;
  /** Override outer rounding. Defaults to rounded-3xl. */
  rounded?: string;
}

const PANEL_BG: CSSProperties = {
  background:
    "linear-gradient(160deg, hsl(var(--secondary)) 0%, hsl(var(--secondary) / 0.92) 60%, hsl(220 15% 12%) 100%)",
};

const LEVELS: Record<
  Intensity,
  {
    shimmerOpacity: string;
    shimmerStop1: string;
    shimmerStop2: string;
    blobA: string;
    blobB: string;
    blobC: string;
    shadow: string;
  }
> = {
  vivid: {
    shimmerOpacity: "opacity-60",
    shimmerStop1: "0.7",
    shimmerStop2: "0.5",
    blobA: "0.9",
    blobB: "0.8",
    blobC: "0.75",
    shadow: "shadow-[0_30px_80px_-30px_hsl(var(--secondary)/0.6)]",
  },
  soft: {
    shimmerOpacity: "opacity-30",
    shimmerStop1: "0.35",
    shimmerStop2: "0.25",
    blobA: "0.4",
    blobB: "0.35",
    blobC: "0.3",
    shadow: "shadow-[0_30px_80px_-30px_hsl(var(--secondary)/0.6)]",
  },
};

/**
 * Shared dark cyan-glow panel — the secondary-base gradient with a rotating
 * conic shimmer, three drifting cyan blobs, and a subtle dotted overlay.
 * Used for the featured product carousel (vivid) and the site-wide final CTA
 * (soft). Respects prefers-reduced-motion.
 */
export const DarkGlowPanel = forwardRef<HTMLDivElement, Props>(
  (
    { children, intensity = "soft", className, rounded = "rounded-3xl", style, ...rest },
    ref,
  ) => {
    const lv = LEVELS[intensity];
    return (
      <div
        ref={ref}
        {...rest}
        className={cn(
          "relative overflow-hidden ring-1 ring-white/10 motion-reduce:[&_*]:!animate-none",
          rounded,
          lv.shadow,
          className,
        )}
        style={{ ...PANEL_BG, ...style }}
      >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={cn("absolute -inset-1/2 animate-shimmer-rotate", lv.shimmerOpacity)}
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, hsl(var(--primary) / ${lv.shimmerStop1}) 60deg, transparent 140deg, hsl(var(--primary) / ${lv.shimmerStop2}) 240deg, transparent 320deg)`,
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute -top-1/4 -left-1/4 h-[80%] w-[80%] rounded-full animate-blob-a"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / ${lv.blobA}) 0%, transparent 60%)`,
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute top-0 -right-1/4 h-[75%] w-[75%] rounded-full animate-blob-b"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / ${lv.blobB}) 0%, transparent 65%)`,
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-1/4 left-1/4 h-[70%] w-[70%] rounded-full animate-blob-c"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / ${lv.blobC}) 0%, transparent 60%)`,
            filter: "blur(55px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(hsl(0 0% 100%) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        />
      </div>

      {children}
    </div>
  );
};

export default DarkGlowPanel;
