import { useState, useRef, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Textarea } from "@ui/textarea";
import { cn } from "@/lib/utils";

interface Props {
  onSend: (text: string) => void;
  loading: boolean;
}

export function ChatComposer({ onSend, loading }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    onSend(trimmed);
    setValue("");
    textareaRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const canSend = !!value.trim() && !loading;

  return (
    <div className="border-t border-border/60 bg-white px-4 py-3">
      <label className="sr-only" htmlFor="chat-input">
        Ask TechD
      </label>
      <div
        className={cn(
          "flex items-end gap-2 rounded-2xl border border-border bg-white py-2 pl-4 pr-2",
          "transition-all duration-200 ease-out",
          "focus-within:border-primary focus-within:shadow-[0_0_0_4px_hsl(var(--primary)/0.12)]",
        )}
      >
        <Textarea
          id="chat-input"
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask about TechD's products, services, or industries…"
          rows={1}
          disabled={loading}
          className={cn(
            "min-h-0 flex-1 resize-none border-0 bg-transparent px-0 py-1.5 text-sm font-light leading-relaxed shadow-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
        />

        <button
          type="button"
          onClick={submit}
          disabled={!canSend}
          aria-busy={loading}
          aria-label="Send message"
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            "bg-primary text-white",
            "transition-all duration-200 ease-out",
            "hover:shadow-[0_0_20px_2px_hsl(var(--primary)/0.45)] hover:scale-105",
            "active:scale-95",
            "disabled:opacity-40 disabled:hover:shadow-none disabled:hover:scale-100",
            "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          )}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
