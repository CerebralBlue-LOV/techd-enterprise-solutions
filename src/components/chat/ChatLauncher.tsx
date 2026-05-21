import { Sparkles, X } from "lucide-react";
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
        "hover:shadow-[0_0_32px_4px_hsl(var(--primary)/0.45),0_8px_24px_-4px_hsl(var(--primary)/0.35)]",
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
        <X className="relative h-6 w-6" aria-hidden />
      ) : (
        <Sparkles className="relative h-6 w-6" fill="currentColor" strokeWidth={1.5} aria-hidden />
      )}
    </button>
  );
}
