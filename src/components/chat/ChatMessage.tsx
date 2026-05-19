import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Message } from "./types";

interface Props {
  message: Message;
}

export function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex flex-col items-end gap-1">
        <div
          className={cn(
            "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-base font-light leading-relaxed text-white",
            "shadow-[0_4px_16px_-6px_hsl(var(--primary)/0.45)]",
          )}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-[0_2px_8px_-2px_hsl(var(--primary)/0.5)]">
        <Bot className="h-3.5 w-3.5 text-white" aria-hidden />
      </div>
      <div className="flex max-w-[85%] flex-col gap-1.5">
        <div
          className={cn(
            "rounded-2xl rounded-bl-sm px-4 py-2.5 text-base font-light leading-relaxed",
            message.error
              ? "border border-red-200 bg-red-50 text-red-700"
              : "border border-border/60 bg-white text-secondary shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
          )}
        >
          {message.content}
        </div>

        {message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-1">
            {message.citations.map((c, i) =>
              c.url ? (
                <a
                  key={i}
                  href={c.url}
                  target={c.url.startsWith("http") ? "_blank" : undefined}
                  rel={c.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={cn(
                    "inline-flex items-center rounded-full border border-border/70 bg-white px-2.5 py-0.5",
                    "text-sm font-normal text-muted-foreground",
                    "transition-colors duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  )}
                >
                  {c.title}
                </a>
              ) : (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full border border-border/70 bg-white px-2.5 py-0.5 text-sm font-normal text-muted-foreground"
                >
                  {c.title}
                </span>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
