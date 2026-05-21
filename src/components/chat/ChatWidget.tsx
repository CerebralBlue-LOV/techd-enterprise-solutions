import { useCallback, useEffect, useState } from "react";
import { ChatLauncher } from "./ChatLauncher";
import { ChatPanel } from "./ChatPanel";
import { ChatCta } from "./ChatCta";
import { useChat } from "./useChat";
import { useChatCta } from "./useChatCta";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  const close = useCallback(() => setOpen(false), []);

  const toggleChat = useCallback(() => {
    setOpen((v) => {
      const next = !v;
      if (next) markOpened();
      return next;
    });
  }, [markOpened]);

  // Drive enter/exit transition.
  useEffect(() => {
    if (!open) {
      setMounted(false);
      return;
    }
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <ChatCta visible={ctaVisible} onOpen={openChat} onDismiss={dismissCta} />
      {!open && <ChatLauncher open={open} onClick={toggleChat} />}

      {open && (
        <div
          role="dialog"
          aria-label="TechD AI assistant"
          aria-modal="false"
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background origin-bottom-right",
            "shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.35),0_8px_24px_-12px_rgba(0,0,0,0.12)]",
            "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            mounted
              ? "opacity-100 scale-100"
              : "opacity-0 scale-[0.05]",
            isMobile
              ? "left-3 right-3 bottom-6"
              : "right-6 bottom-6 w-[400px]",
          )}
          style={
            isMobile
              ? { height: "calc(100vh - 6rem)" }
              : { height: "min(640px, calc(100vh - 4rem))" }
          }
        >
          <ChatPanel
            messages={messages}
            loading={loading}
            onSend={send}
            onReset={clear}
            onClose={close}
          />
        </div>
      )}
    </>
  );
}

export default ChatWidget;
