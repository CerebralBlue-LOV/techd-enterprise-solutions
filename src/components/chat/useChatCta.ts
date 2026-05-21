import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const STORAGE_KEY = "techd:chat-cta:v1";
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const IDLE_MS = 12_000;
const SCROLL_RATIO = 0.6;

type Persisted = { dismissedAt: number | null; opened: boolean };

const readState = (): Persisted => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { dismissedAt: null, opened: false };
    const parsed = JSON.parse(raw) as Partial<Persisted>;
    return {
      dismissedAt: typeof parsed.dismissedAt === "number" ? parsed.dismissedAt : null,
      opened: Boolean(parsed.opened),
    };
  } catch {
    return { dismissedAt: null, opened: false };
  }
};

const writeState = (state: Persisted) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
};

interface Options {
  open: boolean;
  isMobile: boolean;
}

export function useChatCta({ open, isMobile }: Options) {
  const { pathname } = useLocation();
  const [state, setState] = useState<Persisted>(() =>
    typeof window === "undefined" ? { dismissedAt: null, opened: false } : readState(),
  );
  const [triggered, setTriggered] = useState(false);

  // Reset the trigger when route changes so each page re-arms.
  useEffect(() => {
    setTriggered(false);
  }, [pathname]);

  const allowedByPersistence =
    !state.opened &&
    (state.dismissedAt === null || Date.now() - state.dismissedAt > COOLDOWN_MS);

  const allowedByRoute = pathname !== "/contact";

  const eligible = !isMobile && !open && allowedByPersistence && allowedByRoute;

  // Attach trigger listeners only while eligible and not yet triggered.
  useEffect(() => {
    if (!eligible || triggered) return;

    let idleTimer: number | undefined;
    const resetIdle = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setTriggered(true), IDLE_MS);
    };

    const onScroll = () => {
      const ratio =
        window.scrollY / Math.max(1, window.innerHeight);
      if (ratio >= SCROLL_RATIO) {
        setTriggered(true);
      } else {
        resetIdle();
      }
    };

    const onActivity = () => resetIdle();

    resetIdle();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onActivity);
    window.addEventListener("keydown", onActivity);

    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
    };
  }, [eligible, triggered]);

  const visible = eligible && triggered;

  const dismiss = () => {
    const next = { ...state, dismissedAt: Date.now() };
    setState(next);
    writeState(next);
  };

  const markOpened = () => {
    if (state.opened) return;
    const next = { ...state, opened: true };
    setState(next);
    writeState(next);
  };

  return { visible, dismiss, markOpened };
}
