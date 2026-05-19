import { useState } from "react";
import { Sheet, SheetContent } from "@ui/sheet";
import { ChatLauncher } from "./ChatLauncher";
import { ChatPanel } from "./ChatPanel";
import { useChat } from "./useChat";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { messages, loading, send } = useChat();

  return (
    <>
      <ChatLauncher open={open} onClick={() => setOpen((v) => !v)} />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col p-0 sm:max-w-[420px]"
          aria-label="TechD AI assistant"
        >
          <ChatPanel messages={messages} loading={loading} onSend={send} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ChatWidget;
