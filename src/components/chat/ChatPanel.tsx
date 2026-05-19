import { useEffect, useRef } from "react";
import { Bot, RotateCcw } from "lucide-react";
import { ScrollArea } from "@ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChatMessage } from "./ChatMessage";
import { ChatComposer } from "./ChatComposer";
import type { Message } from "./types";

const STARTER_PROMPTS = [
  "What IBM products does TechD implement?",
  "How do I start an engagement?",
  "Which industries does TechD work with?",
  "What is the IBM Platform Assessment?",
];

interface Props {
  messages: Message[];
  loading: boolean;
  onSend: (text: string) => void;
}

export function ChatPanel({ messages, loading, onSend }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-muted/20 to-background">
      {/* Gradient header */}
      <header className="relative bg-gradient-to-r from-primary to-primary/70 px-5 py-4 shadow-[inset_0_-1px_0_hsl(var(--primary)/0.4),0_2px_8px_-2px_hsl(var(--primary)/0.3)]">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold leading-tight text-white">Ask TechD</h2>
          <p className="text-sm font-light text-white/90">
            Powered by NeuralSeek
          </p>
        </div>
      </header>

      <ScrollArea className="flex-1 px-4 py-5">
        {messages.length === 0 ? (
          <div className="flex flex-col gap-5">
            {/* Intro card */}
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-white p-5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-[0_4px_16px_-4px_hsl(var(--primary)/0.5)]">
                <Bot className="h-6 w-6 text-white" aria-hidden />
              </div>
              <h3 className="text-lg font-bold text-secondary">
                Hi — I'm the TechD assistant
              </h3>
              <p className="text-sm font-light text-muted-foreground">
                Ask anything about our IBM solutions, services, or industries.
              </p>
            </div>

            {/* Starter prompts */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {STARTER_PROMPTS.map((text) => (
                <button
                  key={text}
                  onClick={() => onSend(text)}
                  className={cn(
                    "rounded-xl border border-border/60 bg-white px-3 py-3 text-left",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
                    "transition-all duration-200 ease-out",
                    "hover:border-primary/60 hover:shadow-[0_4px_16px_-6px_hsl(var(--primary)/0.35)] hover:-translate-y-0.5",
                    "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                  )}
                >
                  <span className="text-sm font-normal leading-snug text-secondary">
                    {text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {loading && (
              <div className="flex items-start gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-[0_2px_8px_-2px_hsl(var(--primary)/0.5)]">
                  <Bot className="h-3.5 w-3.5 text-white" aria-hidden />
                </div>
                <div className="rounded-2xl rounded-bl-sm border border-border/60 bg-white px-4 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <div className="flex gap-1.5">
                    {([0, 200, 400] as const).map((delay, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full bg-primary/60",
                          "animate-bounce motion-reduce:animate-none",
                          delay === 200 && "[animation-delay:200ms]",
                          delay === 400 && "[animation-delay:400ms]",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </ScrollArea>

      <ChatComposer onSend={onSend} loading={loading} />
    </div>
  );
}
