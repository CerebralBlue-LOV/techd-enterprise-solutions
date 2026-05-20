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

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!force) sessionStorage.setItem(STORAGE_KEY, "1");
    setPhase("playing");

    const fadeAt = reduced ? 400 : 1800;
    const removeAt = fadeAt + 300;

    const t1 = window.setTimeout(() => setPhase("fading"), fadeAt);
    const t2 = window.setTimeout(() => setPhase("hidden"), removeAt);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [force, playKey]);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
      style={{
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 250ms ease-out",
      }}
    >
      <style>{`
        @keyframes techd-gear-in {
          0%   { opacity: 0; transform: translateX(0) rotate(0deg) scale(0.85); }
          14%  { opacity: 1; transform: translateX(0) rotate(0deg) scale(1); }
          61%  { opacity: 1; transform: translateX(0) rotate(540deg) scale(1); }
          100% { opacity: 1; transform: translateX(-68px) rotate(540deg) scale(1); }
        }
        @keyframes techd-word-in {
          0%, 58%  { opacity: 0; transform: translateX(-16px); }
          86%, 100%{ opacity: 1; transform: translateX(0); }
        }
        @keyframes techd-underline-in {
          0%, 86%  { transform: scaleX(0); }
          97%, 100%{ transform: scaleX(1); }
        }
        .techd-gear   { animation: techd-gear-in 1550ms cubic-bezier(0.65, 0, 0.35, 1) both; }
        .techd-word   { animation: techd-word-in 1800ms ease-out both; }
        .techd-uline  { animation: techd-underline-in 1800ms ease-out both; transform-origin: left center; }
        @media (prefers-reduced-motion: reduce) {
          .techd-gear  { animation: none; transform: translateX(-68px); }
          .techd-word  { animation: none; opacity: 1; transform: none; }
          .techd-uline { animation: none; transform: scaleX(1); }
        }
      `}</style>

      <div className="relative flex items-center" style={{ width: 280, height: 96 }}>
        <img
          src="/apple-touch-icon.png"
          alt=""
          width={96}
          height={96}
          className="techd-gear absolute left-1/2 top-1/2 -mt-12 -ml-12"
          style={{ willChange: "transform, opacity" }}
        />
        <div
          className="techd-word absolute"
          style={{ left: "calc(50% + 28px)", top: "50%", transform: "translateY(-50%)" }}
        >
          <span className="font-bold text-secondary leading-none tracking-tight" style={{ fontSize: 64 }}>
            TechD
          </span>
          <div
            className="techd-uline mt-2 h-[2px] bg-primary"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroSplash;
