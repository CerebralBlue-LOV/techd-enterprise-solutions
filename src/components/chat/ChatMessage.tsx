import { cn } from "@/lib/utils";
import type { Message } from "./types";

interface Props {
  message: Message;
}

export function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-light leading-relaxed",
          isUser
            ? "rounded-br-sm bg-primary text-white"
            : message.error
              ? "rounded-bl-sm border border-red-200 bg-red-50 text-red-700"
              : "rounded-bl-sm border border-border bg-muted/40 text-secondary",
        )}
      >
        {message.content}
      </div>

      {!isUser && message.citations && message.citations.length > 0 && (
        <div className="flex max-w-[85%] flex-wrap gap-1.5 px-1">
          {message.citations.map((c, i) =>
            c.url ? (
              <a
                key={i}
                href={c.url}
                target={c.url.startsWith("http") ? "_blank" : undefined}
                rel={c.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className={cn(
                  "inline-flex items-center rounded-full border border-border px-2.5 py-0.5",
                  "text-xs font-normal text-muted-foreground",
                  "transition-colors duration-200 hover:border-primary hover:text-primary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                )}
              >
                {c.title}
              </a>
            ) : (
              <span
                key={i}
                className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-normal text-muted-foreground"
              >
                {c.title}
              </span>
            ),
          )}
        </div>
      )}
    </div>
  );
}
