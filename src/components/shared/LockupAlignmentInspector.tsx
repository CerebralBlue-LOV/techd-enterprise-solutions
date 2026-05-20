import { useState } from "react";
import techdLogo from "@/assets/techd-logo.webp";

/**
 * Side-by-side alignment check for the final intro lockup vs the original
 * source logo. Sliders let you nudge gear size, gap, wordmark height, and
 * vertical offsets until the lockup matches the original — then copy the
 * snippet at the bottom and paste it back to bake the values into IntroSplash.
 */

type Tune = {
  gear: number;       // gear px size
  gap: number;        // px gap between gear and wordmark
  wordH: number;      // wordmark height in px
  gearY: number;      // gear vertical nudge (px)
  wordY: number;      // wordmark vertical nudge (px)
};

const DEFAULT_TUNE: Tune = {
  gear: 96,
  gap: 4,
  wordH: 80,
  gearY: 0,
  wordY: 0,
};

const WORD_ASPECT = 192 / 58; // matches IntroSplash math

const Slider = ({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  onReset,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  onReset: () => void;
}) => (
  <div className="space-y-1">
    <div className="flex items-baseline justify-between">
      <label className="text-xs font-bold uppercase tracking-wider text-secondary">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {value.toFixed(step < 1 ? 2 : 0)}
          {unit}
        </span>
        <button
          type="button"
          onClick={onReset}
          className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary"
        >
          reset
        </button>
      </div>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-primary"
    />
  </div>
);

const Lockup = ({ tune, showGuides }: { tune: Tune; showGuides: boolean }) => {
  const wordW = Math.round(tune.wordH * WORD_ASPECT);
  const totalW = tune.gear + tune.gap + wordW;
  const totalH = Math.max(tune.gear, tune.wordH);
  return (
    <div
      className="relative flex items-center"
      style={{ width: totalW, height: totalH }}
    >
      <img
        src="/logos/techd-gear.png"
        alt=""
        width={tune.gear}
        height={tune.gear}
        style={{
          display: "block",
          transform: `translateY(${tune.gearY}px)`,
        }}
      />
      <img
        src="/logos/techd-wordmark.png"
        alt="TechD"
        width={wordW}
        height={tune.wordH}
        style={{
          display: "block",
          marginLeft: tune.gap,
          height: tune.wordH,
          width: wordW,
          transform: `translateY(${tune.wordY}px)`,
        }}
      />
      {showGuides && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-px bg-primary/60" />
          <div
            className="absolute top-0 bottom-0 w-px bg-primary/40"
            style={{ left: tune.gear }}
          />
          <div
            className="absolute top-0 bottom-0 w-px bg-primary/40"
            style={{ left: tune.gear + tune.gap }}
          />
        </div>
      )}
    </div>
  );
};

/** Shared reference canvas: 10% grid + cartesian axes so both panels compare on the same frame. */
const CanvasFrame = ({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: React.ReactNode;
}) => (
  <div
    className="relative bg-background"
    style={{ width, height }}
  >
    {/* 10% grid */}
    <div
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "linear-gradient(to right, hsl(var(--muted-foreground) / 0.25) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--muted-foreground) / 0.25) 1px, transparent 1px)",
        backgroundSize: "10% 10%",
      }}
    />
    {/* Cartesian axes */}
    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/60" />
    <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-primary/60" />
    {/* Center dot */}
    <div className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
    {/* Content, centered */}
    <div className="absolute inset-0 flex items-center justify-center">
      {children}
    </div>
  </div>
);

export const LockupAlignmentInspector = () => {
  const [tune, setTune] = useState<Tune>(DEFAULT_TUNE);
  const [guides, setGuides] = useState(true);
  const [overlay, setOverlay] = useState(false);

  // Match the original webp render height to the lockup height for fair compare.
  const refHeight = Math.max(tune.gear, tune.wordH);

  // Shared canvas dimensions for both panels — gives a common grid to align against.
  const CANVAS_W = 560;
  const CANVAS_H = 240;


  const snippet =
    `GEAR: ${tune.gear}px   GAP: ${tune.gap}px   WORD_H: ${tune.wordH}px\n` +
    `gearY: ${tune.gearY}px   wordY: ${tune.wordY}px`;

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="rounded-lg border border-border bg-background p-5 space-y-4">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
            Lockup tuner
          </h3>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={guides}
                onChange={(e) => setGuides(e.target.checked)}
                className="accent-primary"
              />
              guides
            </label>
            <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={overlay}
                onChange={(e) => setOverlay(e.target.checked)}
                className="accent-primary"
              />
              overlay mode
            </label>
            <button
              type="button"
              onClick={() => setTune(DEFAULT_TUNE)}
              className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary"
            >
              reset all
            </button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Slider
            label="Gear size"
            value={tune.gear}
            min={48}
            max={160}
            step={1}
            unit="px"
            onChange={(v) => setTune((s) => ({ ...s, gear: v }))}
            onReset={() => setTune((s) => ({ ...s, gear: DEFAULT_TUNE.gear }))}
          />
          <Slider
            label="Gap"
            value={tune.gap}
            min={-20}
            max={32}
            step={1}
            unit="px"
            onChange={(v) => setTune((s) => ({ ...s, gap: v }))}
            onReset={() => setTune((s) => ({ ...s, gap: DEFAULT_TUNE.gap }))}
          />
          <Slider
            label="Wordmark height"
            value={tune.wordH}
            min={40}
            max={140}
            step={1}
            unit="px"
            onChange={(v) => setTune((s) => ({ ...s, wordH: v }))}
            onReset={() => setTune((s) => ({ ...s, wordH: DEFAULT_TUNE.wordH }))}
          />
          <Slider
            label="Gear Y offset"
            value={tune.gearY}
            min={-20}
            max={20}
            step={0.5}
            unit="px"
            onChange={(v) => setTune((s) => ({ ...s, gearY: v }))}
            onReset={() => setTune((s) => ({ ...s, gearY: 0 }))}
          />
          <Slider
            label="Wordmark Y offset"
            value={tune.wordY}
            min={-20}
            max={20}
            step={0.5}
            unit="px"
            onChange={(v) => setTune((s) => ({ ...s, wordY: v }))}
            onReset={() => setTune((s) => ({ ...s, wordY: 0 }))}
          />
        </div>
        <pre className="overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs text-secondary whitespace-pre">
          {snippet}
        </pre>
      </div>

      {/* Comparison */}
      {overlay ? (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
            Overlay · original webp behind, lockup on top (50% opacity)
          </h4>
          <div className="flex items-center justify-center rounded-lg border border-border bg-background p-10">
            <div className="relative" style={{ height: refHeight }}>
              <img
                src={techdLogo}
                alt="Original TechD logo"
                style={{ height: refHeight, width: "auto", display: "block" }}
              />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2"
                style={{ opacity: 0.5 }}
              >
                <Lockup tune={tune} showGuides={guides} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
              Original · techd-logo.webp
            </h4>
            <div className="flex items-center justify-center rounded-lg border border-border bg-background p-10 min-h-[200px]">
              <img
                src={techdLogo}
                alt="Original TechD logo"
                style={{ height: refHeight, width: "auto", display: "block" }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
              Final lockup · gear + wordmark
            </h4>
            <div className="flex items-center justify-center rounded-lg border border-border bg-background p-10 min-h-[200px]">
              <Lockup tune={tune} showGuides={guides} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LockupAlignmentInspector;
