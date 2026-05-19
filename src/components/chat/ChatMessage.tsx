import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import type { Message } from "./types";

const markdownComponents = {
  p: ({ node, ...props }: any) => <p className="mb-2 last:mb-0" {...props} />,
  ul: ({ node, ...props }: any) => (
    <ul className="my-2 list-disc space-y-1 pl-5" {...props} />
  ),
  ol: ({ node, ...props }: any) => (
    <ol className="my-2 list-decimal space-y-1 pl-5" {...props} />
  ),
  li: ({ node, ...props }: any) => <li className="leading-relaxed" {...props} />,
  strong: ({ node, ...props }: any) => (
    <strong className="font-bold text-secondary" {...props} />
  ),
  em: ({ node, ...props }: any) => <em className="italic" {...props} />,
  a: ({ node, ...props }: any) => (
    <a
      className="text-primary underline underline-offset-2 hover:text-primary/80"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: ({ node, inline, ...props }: any) =>
    inline ? (
      <code
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-secondary"
        {...props}
      />
    ) : (
      <code className="block font-mono text-[0.9em]" {...props} />
    ),
  pre: ({ node, ...props }: any) => (
    <pre className="my-2 overflow-x-auto rounded-lg bg-muted p-3 text-sm" {...props} />
  ),
  h1: ({ node, ...props }: any) => <h1 className="mb-2 text-lg font-bold" {...props} />,
  h2: ({ node, ...props }: any) => <h2 className="mb-2 text-base font-bold" {...props} />,
  h3: ({ node, ...props }: any) => <h3 className="mb-1 text-base font-bold" {...props} />,
};

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
