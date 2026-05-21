import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  visible: boolean;
  onOpen: () => void;
  onDismiss: () => void;
}

export function ChatCta({ visible, onOpen, onDismiss }: Props) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-24 right-6 z-50 hidden md:block",
        "animate-in fade-in slide-in-from-bottom-2 duration-300",
        "motion-reduce:animate-none",
      )}
    >
      <div className="relative">
        <button
          type="button"
          onClick={onOpen}
          aria-label="Open TechD chat"
          className={cn(
            "group block w-[260px] text-left",
            "rounded-2xl border border-border bg-background pl-4 pr-9 py-3.5",
            "shadow-[0_12px_32px_-12px_hsl(var(--secondary)/0.25)]",
            "transition-all duration-200 ease-out",
            "hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[0_18px_40px_-12px_hsl(var(--primary)/0.35)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "motion-reduce:transition-none",
          )}
        >
          <span
            aria-hidden
            className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r bg-primary"
          />
          <p className="text-sm font-bold text-secondary leading-snug">
            Not sure where to start? Ask me.
          </p>
          <p className="mt-1 text-[11px] font-light text-muted-foreground">
            Senior practitioner · replies in 1 business day
          </p>
        </button>

        {/* Tail pointing at the launcher (bottom-right) */}
        <span
          aria-hidden
          className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-border bg-background"
        />

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className={cn(
            "absolute right-1.5 top-1.5 grid place-items-center h-6 w-6 rounded-md",
            "text-muted-foreground hover:bg-muted hover:text-secondary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            "transition-colors",
          )}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default ChatCta;
