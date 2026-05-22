import { useEffect, useState } from "react";
import techdGear from "@/assets/brand/techd-gear.png";
import techdWordmark from "@/assets/brand/techd-wordmark.png";

const STORAGE_KEY = "techd-intro-played";

type Props = {
  /** Ignore sessionStorage gating — always play. Used in the lab. */
  force?: boolean;
  /** Key to force a fresh playback when changed. */
  playKey?: number;
};

const shouldPlayInitially = (force: boolean) => {
  if (typeof window === "undefined") return false;
  if (force) return true;
  try {
    return !sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
};

export const IntroSplash = ({ force = false, playKey = 0 }: Props) => {
  const [phase, setPhase] = useState<"hidden" | "playing" | "fading">(() =>
    shouldPlayInitially(force) ? "playing" : "hidden",
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!force && sessionStorage.getItem(STORAGE_KEY)) return;

    let cancelled = false;
    const timers: number[] = [];

    if (!force) {
      try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* noop */ }
    }
    setPhase("playing");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fadeAt = reduced ? 500 : 3560;  // 3200ms animation + 1000ms hold (lockup completes at 2560ms)
    const removeAt = fadeAt + 1000;
    timers.push(window.setTimeout(() => !cancelled && setPhase("fading"), fadeAt));
    timers.push(window.setTimeout(() => !cancelled && setPhase("hidden"), removeAt));

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, [force, playKey]);

  if (phase === "hidden") return null;

  // Final lockup proportions derived from the actual asset aspect ratios.
  // Both gear and wordmark span the same visual height in the source logo, so we
  // size them to match. Asset aspects: gear 1024×1023 (~1), wordmark 1376×412 (~3.34).
  const GEAR = 96;
  const GAP = 8;
  const WORD_H = GEAR; // match heights
  const WORD_W = Math.round(WORD_H * (1376 / 412)); // ≈ 321
  const LOCKUP_W = GEAR + GAP + WORD_W;
  // Distance gear must travel from "alone, centered" to its final left-edge position.
  const GEAR_OFFSET = (LOCKUP_W - GEAR) / 2;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
      style={{
        opacity: phase === "fading" ? 0 : 1,
        transition: phase === "fading" ? "opacity 1000ms ease-in-out" : "none",
      }}
    >
      <style>{`
        @keyframes techd-gear-translate {
          0%, 62%  { transform: translateX(var(--gear-offset)); }
          78%, 100%{ transform: translateX(0); }
        }
        @keyframes techd-gear-fade {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes techd-gear-spin {
          0%, 12%  { transform: rotate(0deg); }
          62%, 100%{ transform: rotate(720deg); }
        }
        /* Trail echoes ramp up while spinning, then collapse before the lockup */
        @keyframes techd-gear-trail {
          0%, 14%  { opacity: 0; }
          26%, 50% { opacity: var(--trail-opacity, 0.35); }
          62%, 100%{ opacity: 0; }
        }
        @keyframes techd-word-in {
          0%, 72%  { opacity: 0; transform: translate(-20px, -2px); }
          80%, 100%{ opacity: 1; transform: translate(0, -2px); }
        }
        .techd-gear-translate { animation: techd-gear-translate 3200ms cubic-bezier(0.65, 0, 0.35, 1) both; }
        .techd-gear-fade { animation: techd-gear-fade 1000ms ease-out 100ms both; }
        .techd-gear-spin { animation: techd-gear-spin 3200ms cubic-bezier(0.65, 0, 0.35, 1) both; transform-origin: 50% 50%; }
        .techd-gear-trail-wrap { animation: techd-gear-trail 3200ms ease-in-out both; }
        .techd-word { animation: techd-word-in 3200ms ease-out both; }
        .techd-gear-art { display: block; transform: translate(1%, 0%) scale(1); transform-origin: 50% 50%; }
        @media (prefers-reduced-motion: reduce) {
          .techd-gear-translate, .techd-gear-fade, .techd-gear-spin, .techd-gear-trail-wrap { animation: none; transform: none; opacity: 1; }
          .techd-word { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      <div
        className="relative flex items-center"
        style={
          {
            width: LOCKUP_W,
            height: GEAR,
            ["--gear-offset" as string]: `${GEAR_OFFSET}px`,
          } as React.CSSProperties
        }
      >
        <div className="techd-gear-translate shrink-0" style={{ width: GEAR, height: GEAR, willChange: "transform" }}>
          <div className="techd-gear-fade relative" style={{ width: GEAR, height: GEAR, willChange: "transform, opacity" }}>
            {/* Trailing echoes — graduated opacity + blur to fake rotational motion blur */}
            {[-52, -38, -26, -16, -9, -4].map((deg, i, arr) => {
              const t = i / (arr.length - 1); // 0 = furthest, 1 = closest
              const trailOpacity = (0.15 + t * 0.45).toFixed(2); // 0.15 → 0.60
              const blurPx = (4.5 - t * 3.5).toFixed(1);         // 4.5px → 1.0px
              return (
                <div
                  key={deg}
                  className="techd-gear-trail-wrap absolute inset-0"
                  style={{ ["--trail-opacity" as string]: trailOpacity } as React.CSSProperties}
                >
                  <div className="absolute inset-0" style={{ transform: `rotate(${deg}deg)` }}>
                    <div className="techd-gear-spin absolute inset-0">
                      <img src={techdGear} alt="" width={GEAR} height={GEAR} className="techd-gear-art" style={{ filter: `blur(${blurPx}px)` }} />
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Sharp gear on top */}
            <div className="techd-gear-spin absolute inset-0">
              <img src={techdGear} alt="" width={GEAR} height={GEAR} className="techd-gear-art" />
            </div>
          </div>
        </div>
        <img
          src={techdWordmark}
          alt="TechD"
          width={WORD_W}
          height={WORD_H}
          className="techd-word"
          style={{ marginLeft: GAP, height: WORD_H, width: WORD_W }}
        />
      </div>
    </div>
  );
};

export default IntroSplash;
