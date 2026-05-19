import { useEffect, useRef } from "react";

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
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3 pl-8">
        <h2 className="text-base font-bold text-secondary">Ask TechD</h2>
        <p className="text-xs font-light text-muted-foreground">
          Powered by NeuralSeek · Answers cite their source
        </p>
      </div>

      <ScrollArea className="flex-1 px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-light text-muted-foreground">
              Ask anything about TechD's IBM solutions, services, or industries.
            </p>
            <div className="flex flex-col gap-2">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => onSend(prompt)}
                  className="w-full rounded-xl border border-border px-3 py-2.5 text-left text-sm font-light text-secondary transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  {prompt}
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
                <div className="rounded-2xl rounded-bl-sm border border-border bg-muted/40 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    {([0, 200, 400] as const).map((delay, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full bg-muted-foreground/60",
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
