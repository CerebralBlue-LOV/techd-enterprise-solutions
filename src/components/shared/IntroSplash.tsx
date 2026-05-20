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
  // Initialize synchronously so the overlay paints on the very first frame
  // — otherwise the page content flashes through before the effect runs.
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
    const fadeAt = reduced ? 500 : 2600;
    const removeAt = fadeAt + 350;
    timers.push(window.setTimeout(() => !cancelled && setPhase("fading"), fadeAt));
    timers.push(window.setTimeout(() => !cancelled && setPhase("hidden"), removeAt));

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, [force, playKey]);


  if (phase === "hidden") return null;

  // Final lockup proportions, matching the source logo (gear:gap:word ≈ 70:2:192 over 70 tall).
  // Gear rendered at 96px → wordmark height 80px, width ≈ 265px, gap ≈ 4px.
  const GEAR = 96;
  const GAP = 4;
  const WORD_H = 80;
  const WORD_W = Math.round(WORD_H * (192 / 58)); // ≈ 265
  const LOCKUP_W = GEAR + GAP + WORD_W;
  // Distance gear must travel from "alone, centered" to its final left-edge position.
  const GEAR_OFFSET = (LOCKUP_W - GEAR) / 2; // ≈ 86px

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
      style={{
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 300ms ease-out",
      }}
    >
      <style>{`
        @keyframes techd-gear-translate {
          0%, 62%  { transform: translateX(var(--gear-offset)); }
          78%, 100%{ transform: translateX(0); }
        }
        @keyframes techd-gear-fade {
          0%   { opacity: 0; transform: scale(0.85); }
          12%, 100% { opacity: 1; transform: scale(1); }
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
          90%, 100%{ opacity: 1; transform: translate(0, -2px); }
        }
        .techd-gear-translate { animation: techd-gear-translate 2600ms cubic-bezier(0.65, 0, 0.35, 1) both; }
        .techd-gear-fade { animation: techd-gear-fade 2600ms cubic-bezier(0.65, 0, 0.35, 1) both; }
        .techd-gear-spin { animation: techd-gear-spin 2600ms cubic-bezier(0.65, 0, 0.35, 1) both; transform-origin: 50% 50%; }
        .techd-gear-trail-wrap { animation: techd-gear-trail 2600ms ease-in-out both; }
        .techd-word { animation: techd-word-in 2600ms ease-out both; }
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
            {/* Trailing echoes rotated slightly behind the sharp gear to fake rotational motion blur */}
            {[-24, -16, -10, -5].map((deg, i) => (
              <div
                key={deg}
                className="techd-gear-trail-wrap absolute inset-0"
                style={{ ["--trail-opacity" as string]: `${0.12 + i * 0.06}` } as React.CSSProperties}
              >
                {/* Static angular offset on the outer wrapper... */}
                <div className="absolute inset-0" style={{ transform: `rotate(${deg}deg)` }}>
                  {/* ...spin animation on the inner wrapper so the offset isn't clobbered */}
                  <div className="techd-gear-spin absolute inset-0">
                    <img src={techdGear} alt="" width={GEAR} height={GEAR} className="techd-gear-art" style={{ filter: "blur(1px)" }} />
                  </div>
                </div>
              </div>
            ))}
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
