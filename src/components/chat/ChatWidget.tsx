import { useCallback, useEffect, useRef, useState } from "react";
import { Sheet, SheetContent } from "@ui/sheet";
import { ChatLauncher } from "./ChatLauncher";
import { ChatPanel } from "./ChatPanel";
import { ChatCta } from "./ChatCta";
import { useChat } from "./useChat";
import { useChatCta } from "./useChatCta";
import { useIsMobile } from "@/hooks/use-mobile";

const MIN_WIDTH = 320;
const MAX_WIDTH = 900;
const DEFAULT_WIDTH = 520;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const draggingRef = useRef(false);
  const isMobile = useIsMobile();
  const { messages, loading, send, clear } = useChat();
  const { visible: ctaVisible, dismiss: dismissCta, markOpened } = useChatCta({
    open,
    isMobile,
  });

  const openChat = useCallback(() => {
    markOpened();
    setOpen(true);
  }, [markOpened]);

  const toggleChat = useCallback(() => {
    setOpen((v) => {
      const next = !v;
      if (next) markOpened();
      return next;
    });
  }, [markOpened]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    draggingRef.current = true;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      const next = window.innerWidth - e.clientX;
      setWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, next)));
    };
    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <ChatLauncher open={open} onClick={() => setOpen((v) => !v)} />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex flex-col p-0 max-w-none sm:max-w-none [&>button]:text-white [&>button]:opacity-90 [&>button:hover]:opacity-100"
          style={isMobile ? { width: "100vw", maxWidth: "100vw" } : { width: `${width}px` }}
          aria-label="TechD AI assistant"
        >
          {/* Resize handle — desktop only */}
          {!isMobile && (
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize chat panel"
              onMouseDown={onMouseDown}
              className="absolute left-0 top-0 z-50 h-full w-1.5 -translate-x-1/2 cursor-ew-resize bg-transparent transition-colors hover:bg-primary/40"
            />
          )}
          <ChatPanel messages={messages} loading={loading} onSend={send} onReset={clear} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ChatWidget;
