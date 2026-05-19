import { useEffect, useRef, useState, useCallback } from "react";
import { ChatLauncher } from "./ChatLauncher";
import { ChatPanel } from "./ChatPanel";
import { useChat } from "./useChat";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "techd.chat.size";
const DEFAULT_SIZE = { width: 420, height: 600 };
const MIN_SIZE = { width: 320, height: 480 };

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const getMaxSize = () => {
  if (typeof window === "undefined") return { width: 720, height: 840 };
  return {
    width: Math.min(720, window.innerWidth - 48),
    height: Math.min(840, window.innerHeight - 120),
  };
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(DEFAULT_SIZE);
  const { messages, loading, send } = useChat();
  const panelRef = useRef<HTMLDivElement>(null);

  // Load persisted size
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.width && parsed?.height) {
          const max = getMaxSize();
          setSize({
            width: clamp(parsed.width, MIN_SIZE.width, max.width),
            height: clamp(parsed.height, MIN_SIZE.height, max.height),
          });
        }
      }
    } catch {
      /* noop */
    }
  }, []);

  // Persist size
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(size));
    } catch {
      /* noop */
    }
  }, [size]);

  // Escape to close + outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(t)) {
        // Don't close when clicking the launcher (it toggles itself)
        const launcher = document.querySelector("[data-chat-launcher]");
        if (launcher && launcher.contains(t)) return;
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Resize handler (anchored bottom-right, grip on top-left)
  const onResizeStart = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startW = size.width;
      const startH = size.height;
      const max = getMaxSize();

      const onMove = (ev: PointerEvent) => {
        const dx = startX - ev.clientX;
        const dy = startY - ev.clientY;
        setSize({
          width: clamp(startW + dx, MIN_SIZE.width, max.width),
          height: clamp(startH + dy, MIN_SIZE.height, max.height),
        });
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [size],
  );

  return (
    <>
      <div data-chat-launcher>
        <ChatLauncher open={open} onClick={() => setOpen((v) => !v)} />
      </div>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="TechD AI assistant"
          aria-modal="false"
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden bg-background",
            "border border-border shadow-2xl",
            "animate-in fade-in slide-in-from-bottom-2 duration-200 motion-reduce:animate-none",
            // Mobile: full-screen drawer from bottom
            "inset-x-0 bottom-0 top-16 rounded-t-2xl",
            // Desktop: floating square anchored above launcher
            "sm:inset-auto sm:bottom-24 sm:right-6 sm:top-auto sm:rounded-2xl",
          )}
          style={
            typeof window !== "undefined" && window.innerWidth >= 640
              ? { width: size.width, height: size.height }
              : undefined
          }
        >
          {/* Resize grip — top-left, desktop only */}
          <div
            onPointerDown={onResizeStart}
            role="separator"
            aria-label="Resize chat"
            aria-orientation="vertical"
            tabIndex={0}
            className={cn(
              "absolute left-0 top-0 z-10 hidden h-5 w-5 sm:flex",
              "cursor-nwse-resize items-center justify-center",
              "text-muted-foreground/60 hover:text-primary",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            )}
          >
            <svg
              viewBox="0 0 12 12"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M10 2 L2 10" />
              <path d="M6 2 L2 6" />
            </svg>
          </div>

          <ChatPanel messages={messages} loading={loading} onSend={send} />
        </div>
      )}
    </>
  );
}

export default ChatWidget;
