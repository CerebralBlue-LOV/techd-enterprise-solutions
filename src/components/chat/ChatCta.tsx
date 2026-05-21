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
        "fixed bottom-24 right-6 z-50 hidden md:flex items-center gap-1.5",
        "animate-in fade-in slide-in-from-right-1 duration-300",
        "motion-reduce:animate-none",
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          "rounded-full bg-background/95 backdrop-blur",
          "border border-border/80 px-3.5 py-1.5",
          "text-xs font-normal text-secondary",
          "shadow-sm transition-all duration-200 ease-out",
          "hover:border-primary/50 hover:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "motion-reduce:transition-none",
        )}
      >
        Ask me anything
      </button>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className={cn(
          "grid place-items-center h-5 w-5 rounded-full",
          "text-muted-foreground/70 hover:text-secondary hover:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "transition-colors",
        )}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

export default ChatCta;
