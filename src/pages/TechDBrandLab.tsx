import { useState } from "react";
import Layout from "@layout/Layout";
import { cn } from "@/lib/utils";

// Brand-snapped (token-locked recolor)
import logoBrand from "@/assets/brand/lab/techd-logo-upscale-brand.png";
import wordmarkBrand from "@/assets/brand/lab/techd-wordmark-upscale-brand.png";
import gearBrand from "@/assets/brand/lab/techd-gear-upscale-brand.png";
import gearBrandWhite from "@/assets/brand/lab/techd-gear-upscale-white-brand.png";


type AssetShape = "horizontal" | "square";

type Candidate = {
  label: string;
  method: string;
  src: string;
  note: string;
};

type Asset = {
  id: string;
  name: string;
  filename: string;
  shape: AssetShape;
  /** single size (px) at which to render the asset */
  size: number;
  /** which surfaces to render — defaults to ["light"] */
  surfaces?: ("light" | "dark")[];
  candidates: Candidate[];
};

const ASSETS: Asset[] = [
  {
    id: "logo",
    name: "Full logo (gears + wordmark)",
    filename: "techd-logo.webp",
    shape: "horizontal",
    size: 800,
    // Show on both surfaces so transparency / white-halo issues are visible.
    surfaces: ["light", "dark"],
    candidates: [
      {
        label: "Brand-snapped",
        method: "Token-locked recolor · #00B3E3 / #56565A / #A7A5A8",
        src: logoBrand,
        note: "Every opaque pixel classified by hue/luminance and snapped to a brand token. Alpha preserved for clean edges.",
      },
    ],
  },
  {
    id: "wordmark",
    name: "Wordmark only",
    filename: "techd-wordmark.png",
    shape: "horizontal",
    size: 800,
    candidates: [
      {
        label: "Brand-snapped",
        method: "Token-locked recolor · Tech #00B3E3 / D #56565A",
        src: wordmarkBrand,
        note: "Cyan letters snapped to primary; D snapped to secondary. Alpha preserved.",
      },
    ],
  },
  {
    id: "gear",
    name: "Gear mark (color)",
    filename: "techd-gear.png",
    shape: "square",
    size: 800,
    candidates: [
      {
        label: "Brand-snapped",
        method: "Token-locked recolor · top #56565A / right #A7A5A8 / bottom #00B3E3",
        src: gearBrand,
        note: "Three pieces snapped to their brand tokens by source color. Alpha preserved.",
      },
    ],
  },
  {
    id: "gear-white",
    name: "Gear mark (white)",
    filename: "techd-gear-upscale-white.png",
    shape: "square",
    size: 800,
    surfaces: ["dark"],
    candidates: [
      {
        label: "Brand-snapped · white",
        method: "Token-locked recolor · all opaque → #FFFFFF",
        src: gearBrandWhite,
        note: "Every opaque pixel forced to pure white. Alpha preserved.",
      },
    ],
  },
];

const TechDBrandLab = () => {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [sizes, setSizes] = useState<Record<string, number>>(() =>
    Object.fromEntries(ASSETS.map((a) => [a.id, a.size])),
  );


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
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-secondary">
                  {asset.name}
                </h2>
                <code className="mt-1 inline-block text-xs text-muted-foreground">
                  {asset.filename}
                </code>
              </div>
              <label className="flex items-center gap-3 min-w-[280px]">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap">
                  Scale
                </span>
                <input
                  type="range"
                  min={80}
                  max={1200}

                  step={8}
                  value={sizes[asset.id] ?? asset.size}
                  onChange={(e) =>
                    setSizes((prev) => ({
                      ...prev,
                      [asset.id]: Number(e.target.value),
                    }))
                  }
                  className="flex-1 accent-primary"
                />
                <code className="text-xs font-mono text-secondary tabular-nums w-14 text-right">
                  {sizes[asset.id] ?? asset.size}px
                </code>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {asset.candidates.map((c) => {
                const isPicked = picks[asset.id] === c.label;
                const currentSize = sizes[asset.id] ?? asset.size;
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

                    {/* One or more surface panels (light / dark) per the asset config. */}
                    {(asset.surfaces ?? ["light"]).map((surfaceKind) => {
                      const surface =
                        surfaceKind === "dark"
                          ? {
                              key: "dark" as const,
                              label: "White / on dark",
                              bgClass: "bg-secondary",
                              labelClass: "text-background/60",
                              checkerLight: "hsl(var(--secondary))",
                              checkerDark: "hsl(0 0% 28%)",
                            }
                          : {
                              key: "light" as const,
                              label: "Colored / on light",
                              bgClass: "bg-background",
                              labelClass: "text-muted-foreground",
                              checkerLight: "hsl(0 0% 96%)",
                              checkerDark: "hsl(0 0% 90%)",
                            };
                      const fileLabel =
                        c.src.split("/").pop()?.split("?")[0] ?? "";
                      return (
                        <div
                          key={surface.key}
                          className={cn("px-4 py-4 space-y-3", surface.bgClass)}
                        >
                          <div className="flex items-baseline justify-between gap-3">
                            <p
                              className={cn(
                                "text-[10px] font-bold uppercase tracking-[0.15em]",
                                surface.labelClass,
                              )}
                            >
                              {surface.label}
                            </p>
                            <code
                              className={cn(
                                "text-[10px] font-mono truncate",
                                surface.labelClass,
                              )}
                            >
                              {fileLabel}
                            </code>
                          </div>
                          <div
                            className="flex items-center justify-center rounded"
                            style={{
                              minHeight: Math.max(240, currentSize + 80),
                              backgroundImage: `linear-gradient(45deg, ${surface.checkerDark} 25%, transparent 25%), linear-gradient(-45deg, ${surface.checkerDark} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${surface.checkerDark} 75%), linear-gradient(-45deg, transparent 75%, ${surface.checkerDark} 75%)`,
                              backgroundSize: "16px 16px",
                              backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
                              backgroundColor: surface.checkerLight,
                            }}
                          >
                            <img
                              src={c.src}
                              alt={`${c.label} (${surface.label})`}
                              style={
                                asset.shape === "horizontal"
                                  ? { height: currentSize, width: "auto" }
                                  : { height: currentSize, width: currentSize }
                              }
                              className="object-contain"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      );
                    })}

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
