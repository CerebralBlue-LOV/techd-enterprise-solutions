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
        "group fixed bottom-6 right-6 z-50",
        "flex h-14 w-14 items-center justify-center rounded-2xl",
        "bg-primary text-white shadow-lg ring-0 ring-primary/30",
        "transition-[transform,box-shadow,border-radius] duration-[250ms] ease-out",
        "hover:scale-105 hover:shadow-xl hover:ring-4 hover:rounded-3xl",
        "active:scale-95",
        "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
    >
      <span className="sr-only">{open ? "Close chat" : "Ask TechD"}</span>
      {open ? (
        <X
          className="h-6 w-6 transition-transform duration-300 ease-out group-hover:rotate-90 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
          aria-hidden
        />
      ) : (
        <MessageCircle
          className="h-6 w-6 transition-transform duration-300 ease-out group-hover:rotate-12 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
          aria-hidden
        />
      )}
    </button>
  );
}
