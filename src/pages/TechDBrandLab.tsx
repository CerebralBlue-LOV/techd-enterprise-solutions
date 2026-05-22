import { useState } from "react";
import Layout from "@layout/Layout";
import { cn } from "@/lib/utils";

// Originals
import logoOriginal from "@/assets/brand/techd-logo.webp";
import wordmarkOriginal from "@/assets/brand/techd-wordmark.png";
import gearOriginal from "@/assets/brand/techd-gear.png";
import markWhiteOriginal from "@/assets/brand/techd-mark-white.png";

// AI upscale (hi-res raster)
import logoUpscale from "@/assets/brand/lab/techd-logo-upscale.png";
import logoUpscaleWhite from "@/assets/brand/lab/techd-logo-upscale-white.png";
import wordmarkUpscale from "@/assets/brand/lab/techd-wordmark-upscale.png";
import wordmarkUpscaleWhite from "@/assets/brand/lab/techd-wordmark-upscale-white.png";
import gearUpscale from "@/assets/brand/lab/techd-gear-upscale.png";
import markWhiteUpscale from "@/assets/brand/lab/techd-mark-white-upscale.png";

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
        label: "Original",
        method: "264×70 webp · raster",
        src: logoOriginal,
        note: "What ships today. Pixelates above ~280px width.",
      },
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
        label: "Original",
        method: "192×58 png · raster",
        src: wordmarkOriginal,
        note: "What ships today.",
      },
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
        label: "Original",
        method: "70×70 png · raster",
        src: gearOriginal,
        note: "What ships today.",
      },
      {
        label: "AI upscale",
        method: "Nano-Banana · 4× PNG",
        src: gearUpscale,
        note: "Higher resolution gear mark.",
      },
    ],
  },
  {
    id: "mark-white",
    name: "Gear mark (white, for dark surfaces)",
    filename: "techd-mark-white.png",
    shape: "square",
    sizes: [40, 80, 160, 320],
    needsDark: true,
    candidates: [
      {
        label: "Original",
        method: "70×70 png · raster",
        src: markWhiteOriginal,
        note: "Used in footer / dark hero surfaces.",
      },
      {
        label: "AI upscale",
        method: "Nano-Banana · 4× PNG",
        src: markWhiteUpscale,
        note: "Higher resolution white mark.",
      },
    ],
  },
];

const TechDBrandLab = () => {
  const [bg, setBg] = useState<"both" | "light" | "dark">("both");
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

        {/* Background toggle */}
        <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-border bg-background p-1">
          {(["both", "light", "dark"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setBg(opt)}
              className={cn(
                "px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-colors",
                bg === opt
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-secondary",
              )}
            >
              {opt}
            </button>
          ))}
        </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    {/* Light surface */}
                    {(bg === "both" || bg === "light") && (
                      <div className="px-4 py-4 bg-background space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                          on light
                        </p>
                        {asset.sizes.map((size) => (
                          <div
                            key={size}
                            className="flex items-center gap-3"
                          >
                            <span className="w-10 shrink-0 text-[10px] text-muted-foreground tabular-nums">
                              {size}px
                            </span>
                            <img
                              src={c.src}
                              alt={`${c.label} @ ${size}px`}
                              style={
                                asset.shape === "horizontal"
                                  ? { height: size, width: "auto" }
                                  : { height: size, width: size }
                              }
                              className="object-contain"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Dark surface */}
                    {asset.needsDark && (bg === "both" || bg === "dark") && (
                      <div className="px-4 py-4 bg-secondary space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-background/60">
                          on dark
                        </p>
                        {asset.sizes.map((size) => (
                          <div
                            key={size}
                            className="flex items-center gap-3"
                          >
                            <span className="w-10 shrink-0 text-[10px] text-background/60 tabular-nums">
                              {size}px
                            </span>
                            <img
                              src={c.darkSrc ?? c.src}
                              alt={`${c.label} @ ${size}px (dark)`}
                              style={
                                asset.shape === "horizontal"
                                  ? { height: size, width: "auto" }
                                  : { height: size, width: size }
                              }
                              className="object-contain"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}

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
