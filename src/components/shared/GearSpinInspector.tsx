import { useState } from "react";

/**
 * Frame-by-frame inspector for the intro splash gear spin.
 *
 * Replicates only the gear's rotation (not the translate/fade/wordmark) so the
 * spin can be paused and scrubbed. Uses the same keyframe + timing as the real
 * splash, then leverages `animation-delay: -Xms; animation-play-state: paused`
 * to render any single instant of the animation as a static frame.
 */

const DURATION_MS = 3200;
const GEAR = 120;

const SHARED_KEYFRAMES = `
  @keyframes gear-inspector-spin {
    0%, 12%  { transform: rotate(0deg); }
    62%, 100%{ transform: rotate(720deg); }
  }
`;

/** A single paused gear at time `t` (ms into the 3200ms animation). */
const FrozenGear = ({ t, size = GEAR }: { t: number; size?: number }) => (
  <div
    className="relative"
    style={{ width: size, height: size }}
  >
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
      />
    </div>
    {/* Crosshair to visualize the rotation pivot */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/40" />
      <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-primary/40" />
      <div className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
    </div>
  </div>
);

const STRIP_FRAMES = 16;

export const GearSpinInspector = () => {
  const [t, setT] = useState(0);

  const stripTimes = Array.from(
    { length: STRIP_FRAMES },
    (_, i) => Math.round((i / (STRIP_FRAMES - 1)) * DURATION_MS),
  );

  return (
    <div className="space-y-10">
      <style>{SHARED_KEYFRAMES}</style>

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
          <FrozenGear t={t} size={180} />
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
          <span>384ms · spin starts (12%)</span>
          <span>1984ms · spin ends (62%)</span>
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
              <FrozenGear t={time} size={64} />
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
