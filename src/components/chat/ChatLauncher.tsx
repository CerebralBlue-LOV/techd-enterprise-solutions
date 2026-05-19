import { Bot, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClick: () => void;
}

export function ChatLauncher({ open, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close TechD chat" : "Open TechD chat"}
      aria-expanded={open}
      className={cn(
        "group fixed bottom-6 right-6 z-50 overflow-hidden",
        "flex h-14 w-14 items-center justify-center rounded-2xl",
        "bg-primary text-white shadow-lg",
        "transition-shadow duration-300 ease-out",
        "hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.6)]",
        "motion-reduce:transition-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <span className="sr-only">{open ? "Close chat" : "Ask TechD"}</span>

      {/* Sheen sweep on hover */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -translate-x-full",
          "bg-gradient-to-r from-transparent via-white/30 to-transparent",
          "transition-transform duration-700 ease-out",
          "group-hover:translate-x-full",
          "motion-reduce:hidden",
        )}
      />

      {open ? (
        <X
          className="relative h-6 w-6 transition-transform duration-300 ease-out group-hover:rotate-90 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
          aria-hidden
        />
      ) : (
        <Sparkles
          className={cn(
            "relative h-6 w-6 transition-transform duration-500 ease-out",
            "group-hover:scale-110 group-hover:-rotate-12",
            "motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0",
          )}
          aria-hidden
        />
      )}
    </button>
  );
}
