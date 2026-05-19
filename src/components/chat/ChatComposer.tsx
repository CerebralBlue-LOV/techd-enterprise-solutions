import { useState, useRef, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@ui/button";
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

  return (
    <div className="flex gap-2 border-t border-border p-3">
      <label className="sr-only" htmlFor="chat-input">
        Ask TechD
      </label>
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
          "min-h-0 flex-1 resize-none text-sm font-light",
          "focus-visible:ring-primary",
        )}
      />
      <Button
        size="icon"
        onClick={submit}
        disabled={!value.trim() || loading}
        aria-busy={loading}
        aria-label="Send message"
        className="h-9 w-9 shrink-0 self-end bg-primary hover:bg-primary/90"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
