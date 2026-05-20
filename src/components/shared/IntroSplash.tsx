import { useEffect, useState } from "react";

const STORAGE_KEY = "techd-intro-played";

type Props = {
  /** Ignore sessionStorage gating — always play. Used in the lab. */
  force?: boolean;
  /** Key to force a fresh playback when changed. */
  playKey?: number;
};

export const IntroSplash = ({ force = false, playKey = 0 }: Props) => {
  const [phase, setPhase] = useState<"hidden" | "playing" | "fading">("hidden");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!force && sessionStorage.getItem(STORAGE_KEY)) return;

    let cancelled = false;
    const timers: number[] = [];

    const start = () => {
      if (cancelled) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!force) sessionStorage.setItem(STORAGE_KEY, "1");
      setPhase("playing");

      const fadeAt = reduced ? 500 : 3200;
      const removeAt = fadeAt + 350;
      timers.push(window.setTimeout(() => !cancelled && setPhase("fading"), fadeAt));
      timers.push(window.setTimeout(() => !cancelled && setPhase("hidden"), removeAt));
    };

    // Preload both images so the animation doesn't begin before pixels are paintable.
    const sources = ["/logos/techd-gear.png", "/logos/techd-wordmark.png"];
    let remaining = sources.length;
    const tick = () => {
      remaining -= 1;
      if (remaining <= 0) {
        // Wait for the next frame so layout/paint is ready before keyframes start.
        requestAnimationFrame(() => requestAnimationFrame(start));
      }
    };
    sources.forEach((src) => {
      const img = new Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
    });
    // Safety fallback in case onload never fires (e.g. very slow network).
    timers.push(window.setTimeout(() => !cancelled && phase === "hidden" && start(), 1500));

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        @keyframes techd-gear-in {
          0%    { opacity: 0; transform: translateX(var(--gear-offset)) rotate(0deg) scale(0.85); }
          12%   { opacity: 1; transform: translateX(var(--gear-offset)) rotate(0deg) scale(1); }
          62%   { opacity: 1; transform: translateX(var(--gear-offset)) rotate(720deg) scale(1); }
          78%   { opacity: 1; transform: translateX(0) rotate(720deg) scale(1); }
          100%  { opacity: 1; transform: translateX(0) rotate(720deg) scale(1); }
        }
        @keyframes techd-word-in {
          0%, 72%  { opacity: 0; transform: translateX(-20px); }
          90%, 100%{ opacity: 1; transform: translateX(0); }
        }
        .techd-gear { animation: techd-gear-in 3200ms cubic-bezier(0.65, 0, 0.35, 1) both; }
        .techd-word { animation: techd-word-in 3200ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .techd-gear { animation: none; transform: translateX(0); }
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
        <img
          src="/logos/techd-gear.png"
          alt=""
          width={GEAR}
          height={GEAR}
          className="techd-gear shrink-0"
          style={{ willChange: "transform, opacity" }}
        />
        <img
          src="/logos/techd-wordmark.png"
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
