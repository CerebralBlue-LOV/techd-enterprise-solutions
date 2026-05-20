import { useState } from "react";

/**
 * Frame-by-frame inspector + offset tuner for the intro splash gear spin.
 *
 * Three live sliders nudge the gear artwork inside its rotating canvas:
 *   - offsetX (% of canvas, -20..20)
 *   - offsetY (% of canvas, -20..20)
 *   - scale   (0.6..1.4)
 * The current values render as a copy-ready snippet you can paste back so the
 * crop script (or component) can bake them in.
 */

const DURATION_MS = 3200;

const SHARED_KEYFRAMES = `
  @keyframes gear-inspector-spin {
    0%, 12%  { transform: rotate(0deg); }
    62%, 100%{ transform: rotate(720deg); }
  }
`;

type Tune = { offsetX: number; offsetY: number; scale: number };

const DEFAULT_TUNE: Tune = { offsetX: 0, offsetY: 0, scale: 1 };

/** A single paused gear at time `t` (ms into the 3200ms animation), with offset tuning. */
const FrozenGear = ({
  t,
  size,
  tune,
}: {
  t: number;
  size: number;
  tune: Tune;
}) => (
  <div className="relative" style={{ width: size, height: size }}>
    <div
      className="absolute inset-0"
      style={{
        animation: `gear-inspector-spin ${DURATION_MS}ms cubic-bezier(0.65, 0, 0.35, 1) both`,
        animationDelay: `-${t}ms`,
        animationPlayState: "paused",
        transformOrigin: "50% 50%",
      }}
    >
      <img
        src="/logos/techd-gear.png"
        alt=""
        width={size}
        height={size}
        draggable={false}
        style={{
          display: "block",
          transform: `translate(${tune.offsetX}%, ${tune.offsetY}%) scale(${tune.scale})`,
          transformOrigin: "50% 50%",
        }}
      />
    </div>
    {/* Crosshair marks the rotation pivot (canvas center) */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/40" />
      <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-primary/40" />
      <div className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
    </div>
  </div>
);

const STRIP_FRAMES = 16;

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

export const GearSpinInspector = () => {
  const [t, setT] = useState(0);
  const [tune, setTune] = useState<Tune>(DEFAULT_TUNE);

  const stripTimes = Array.from(
    { length: STRIP_FRAMES },
    (_, i) => Math.round((i / (STRIP_FRAMES - 1)) * DURATION_MS),
  );

  const snippet = `offsetX: ${tune.offsetX.toFixed(2)}%   offsetY: ${tune.offsetY.toFixed(2)}%   scale: ${tune.scale.toFixed(2)}`;

  return (
    <div className="space-y-10">
      <style>{SHARED_KEYFRAMES}</style>

      {/* Offset tuner */}
      <div className="rounded-lg border border-border bg-background p-5 space-y-4">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
            Centering tuner
          </h3>
          <button
            type="button"
            onClick={() => setTune(DEFAULT_TUNE)}
            className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-primary"
          >
            reset all
          </button>
        </div>
        <p className="text-xs font-light text-muted-foreground">
          Nudge the artwork until the gear's true center sits on the cyan dot.
          Then copy the values below and paste them back.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <Slider
            label="Offset X"
            value={tune.offsetX}
            min={-20}
            max={20}
            step={0.25}
            unit="%"
            onChange={(v) => setTune((s) => ({ ...s, offsetX: v }))}
            onReset={() => setTune((s) => ({ ...s, offsetX: 0 }))}
          />
          <Slider
            label="Offset Y"
            value={tune.offsetY}
            min={-20}
            max={20}
            step={0.25}
            unit="%"
            onChange={(v) => setTune((s) => ({ ...s, offsetY: v }))}
            onReset={() => setTune((s) => ({ ...s, offsetY: 0 }))}
          />
          <Slider
            label="Scale"
            value={tune.scale}
            min={0.6}
            max={1.4}
            step={0.01}
            unit="×"
            onChange={(v) => setTune((s) => ({ ...s, scale: v }))}
            onReset={() => setTune((s) => ({ ...s, scale: 1 }))}
          />
        </div>
        <pre className="overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs text-secondary">
          {snippet}
        </pre>
      </div>

      {/* Scrub view */}
      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
            Scrub
          </h3>
          <div className="font-mono text-xs text-muted-foreground tabular-nums">
            t = {t.toString().padStart(4, "0")}ms · {((t / DURATION_MS) * 100).toFixed(1)}%
          </div>
        </div>

        <div className="flex items-center justify-center rounded-lg border border-border bg-background p-10">
          <FrozenGear t={t} size={220} tune={tune} />
        </div>

        <input
          type="range"
          min={0}
          max={DURATION_MS}
          step={16}
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          className="w-full accent-primary"
          aria-label="Scrub spin time"
        />
        <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
          <span>0ms · start</span>
          <span>384ms · spin starts</span>
          <span>1984ms · spin ends</span>
          <span>3200ms · end</span>
        </div>
      </div>

      {/* Frame strip */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
          Frame strip · {STRIP_FRAMES} samples across {DURATION_MS}ms
        </h3>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {stripTimes.map((time) => (
            <div
              key={time}
              className="flex flex-col items-center gap-1.5 rounded-md border border-border bg-background p-2"
            >
              <FrozenGear t={time} size={64} tune={tune} />
              <span className="font-mono text-[10px] text-muted-foreground">
                {time}ms
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GearSpinInspector;
