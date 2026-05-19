import { MessageCircle, X } from "lucide-react";
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
        "fixed bottom-6 right-6 z-50",
        "flex h-14 w-14 items-center justify-center rounded-full",
        "bg-primary text-white shadow-lg",
        "transition-all duration-200 motion-reduce:transition-none",
        "hover:-translate-y-0.5 hover:shadow-xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <span className="sr-only">{open ? "Close chat" : "Ask TechD"}</span>
      {open ? (
        <X className="h-6 w-6" aria-hidden />
      ) : (
        <MessageCircle className="h-6 w-6" aria-hidden />
      )}
    </button>
  );
}
