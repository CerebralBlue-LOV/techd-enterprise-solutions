import { useState } from "react";
import Layout from "@layout/Layout";
import { cn } from "@/lib/utils";

// AI upscale (hi-res raster)
import logoUpscale from "@/assets/brand/lab/techd-logo-upscale.png";
import logoUpscaleWhite from "@/assets/brand/lab/techd-logo-upscale-white.png";
import wordmarkUpscale from "@/assets/brand/lab/techd-wordmark-upscale.png";
import wordmarkUpscaleWhite from "@/assets/brand/lab/techd-wordmark-upscale-white.png";
import gearUpscale from "@/assets/brand/lab/techd-gear-upscale.png";
import gearUpscaleWhite from "@/assets/brand/lab/techd-gear-upscale-white.png";


type AssetShape = "horizontal" | "square";

type Candidate = {
  label: string;
  method: string;
  src: string;
  /** Optional override used when rendered on the dark surface */
  darkSrc?: string;
  note: string;
};

type Asset = {
  id: string;
  name: string;
  filename: string;
  shape: AssetShape;
  /** sizes (px) at which to render the asset for comparison */
  sizes: number[];
  /** if true, also render against a dark surface */
  needsDark: boolean;
  candidates: Candidate[];
};

const ASSETS: Asset[] = [
  {
    id: "logo",
    name: "Full logo (gears + wordmark)",
    filename: "techd-logo.webp",
    shape: "horizontal",
    sizes: [70, 140, 280, 560],
    needsDark: true,
    candidates: [
      {
        label: "AI upscale",
        method: "Nano-Banana · 4× PNG · white on dark",
        src: logoUpscale,
        darkSrc: logoUpscaleWhite,
        note: "Color version on light; auto-swaps to pure white on dark surfaces (no more colored lines).",
      },
    ],
  },
  {
    id: "wordmark",
    name: "Wordmark only",
    filename: "techd-wordmark.png",
    shape: "horizontal",
    sizes: [70, 140, 280, 560],
    needsDark: true,
    candidates: [
      {
        label: "AI upscale",
        method: "Nano-Banana · 4× PNG · white on dark",
        src: wordmarkUpscale,
        darkSrc: wordmarkUpscaleWhite,
        note: "Color version on light; auto-swaps to pure white on dark surfaces.",
      },
    ],
  },
  {
    id: "gear",
    name: "Gear mark (color)",
    filename: "techd-gear.png",
    shape: "square",
    sizes: [40, 80, 160, 320],
    needsDark: true,
    candidates: [
      {
        label: "AI upscale",
        method: "Nano-Banana · 4× PNG · white on dark",
        src: gearUpscale,
        darkSrc: gearUpscaleWhite,
        note: "Color version on light; auto-swaps to pure white on dark surfaces.",
      },
    ],
  },
];

const TechDBrandLab = () => {
  const [picks, setPicks] = useState<Record<string, string>>({});

  return (
    <Layout>
      {/* Header */}
      <div className="container-page pt-12 pb-6">
        <p className="eyebrow">Internal · TechD Brand Lab</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-secondary tracking-tight">
          TechD Brand Lab
        </h1>
        <p className="mt-4 max-w-3xl text-muted-foreground font-light">
          The four TechD brand assets ship as tiny rasters (largest is 264×70).
          This lab regenerates each one using three methods so we can pick the
          replacement that holds up at every size. Once you mark a winner per
          asset, I'll move it into{" "}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
            src/assets/brand/
          </code>{" "}
          and wire it into the header, footer, hero, and intro in one pass.
        </p>

      </div>

      {/* Asset sections */}
      {ASSETS.map((asset) => (
        <section key={asset.id} className="border-t border-border">
          <div className="container-page py-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-secondary">
                {asset.name}
              </h2>
              <code className="mt-1 inline-block text-xs text-muted-foreground">
                {asset.filename}
              </code>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {asset.candidates.map((c) => {
                const isPicked = picks[asset.id] === c.label;
                return (
                  <div
                    key={c.label}
                    className={cn(
                      "flex flex-col rounded-xl border bg-background overflow-hidden transition-all",
                      isPicked
                        ? "border-primary shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.4)]"
                        : "border-border",
                    )}
                  >
                    {/* Header */}
                    <div className="px-4 pt-4 pb-3 border-b border-border">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-secondary">
                          {c.label}
                        </span>
                        {isPicked && (
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                            picked
                          </span>
                        )}
                      </div>
                      <code className="mt-1 block text-[10px] text-muted-foreground">
                        {c.method}
                      </code>
                    </div>

                    {/* Three surface panels, each with all sizes side-by-side */}
                    {([
                      {
                        key: "light",
                        label: "Light · color",
                        bgClass: "bg-background",
                        labelClass: "text-muted-foreground",
                        sizeLabelClass: "text-muted-foreground",
                        imgSrc: c.src,
                      },
                      {
                        key: "dark-color",
                        label: "Dark · color",
                        bgClass: "bg-secondary",
                        labelClass: "text-background/60",
                        sizeLabelClass: "text-background/60",
                        imgSrc: c.src,
                      },
                      {
                        key: "dark-white",
                        label: "Dark · white",
                        bgClass: "bg-secondary",
                        labelClass: "text-background/60",
                        sizeLabelClass: "text-background/60",
                        imgSrc: c.darkSrc ?? c.src,
                      },
                    ] as const).map((surface) => (
                      <div
                        key={surface.key}
                        className={cn("px-4 py-4 space-y-3", surface.bgClass)}
                      >
                        <p
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-[0.15em]",
                            surface.labelClass,
                          )}
                        >
                          {surface.label}
                        </p>
                        <div className="flex items-end gap-6 overflow-x-auto pb-2">
                          {asset.sizes.map((size) => (
                            <div
                              key={size}
                              className="flex flex-col items-center gap-2 shrink-0"
                            >
                              <img
                                src={surface.imgSrc}
                                alt={`${c.label} @ ${size}px (${surface.label})`}
                                style={
                                  asset.shape === "horizontal"
                                    ? { height: size, width: "auto" }
                                    : { height: size, width: size }
                                }
                                className="object-contain"
                                loading="lazy"
                              />
                              <span
                                className={cn(
                                  "text-[10px] tabular-nums",
                                  surface.sizeLabelClass,
                                )}
                              >
                                {size}px
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Footer */}
                    <div className="mt-auto px-4 py-3 border-t border-border bg-muted/30">
                      <p className="text-[11px] font-light text-muted-foreground leading-relaxed">
                        {c.note}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setPicks((prev) =>
                            prev[asset.id] === c.label
                              ? Object.fromEntries(
                                  Object.entries(prev).filter(
                                    ([k]) => k !== asset.id,
                                  ),
                                )
                              : { ...prev, [asset.id]: c.label },
                          )
                        }
                        className={cn(
                          "mt-3 w-full text-xs font-bold uppercase tracking-[0.15em] py-2 rounded transition-colors",
                          isPicked
                            ? "bg-primary text-primary-foreground"
                            : "bg-background border border-border text-secondary hover:border-primary/40 hover:text-primary",
                        )}
                      >
                        {isPicked ? "Picked ✓" : "Use this"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Summary of picks */}
      <section className="border-t border-border bg-muted/20">
        <div className="container-page py-10">
          <h2 className="text-xl font-bold text-secondary">Your picks</h2>
          <p className="mt-2 text-sm font-light text-muted-foreground">
            Tell me these in chat and I'll swap them into{" "}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
              src/assets/brand/
            </code>{" "}
            and update every component that imports them.
          </p>
          <div className="mt-6 space-y-2">
            {ASSETS.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-border bg-background"
              >
                <div>
                  <div className="text-sm font-bold text-secondary">
                    {asset.name}
                  </div>
                  <code className="text-[11px] text-muted-foreground">
                    {asset.filename}
                  </code>
                </div>
                <div className="text-sm">
                  {picks[asset.id] ? (
                    <span className="font-bold text-primary">
                      {picks[asset.id]}
                    </span>
                  ) : (
                    <span className="text-muted-foreground italic">
                      not picked yet
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-page py-16" />
    </Layout>
  );
};

export default TechDBrandLab;
