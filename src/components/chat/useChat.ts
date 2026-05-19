import { useState, useCallback } from "react";
import type { Message, SeekResponse } from "./types";

const SEEK_URL = "https://stagingapi.neuralseek.com/v1/techd-website/seek";
const EMBED_CODE = "611208311";

function uid() {
  return Math.random().toString(36).slice(2);
}

async function seekAnswer(question: string): Promise<SeekResponse> {
  const res = await fetch(SEEK_URL, {
    method: "POST",
    headers: {
      embedcode: EMBED_CODE,
      "content-type": "application/json",
    },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error(`NeuralSeek seek failed: ${res.status}`);
  return res.json() as Promise<SeekResponse>;
}

function extractAnswer(data: SeekResponse): { content: string; citations: { title: string; url?: string }[] } {
  const text = data.answer ?? data.answersText ?? data.fwd ?? "";
  const citations: { title: string; url?: string }[] = [];
  if (data.document?.title) {
    citations.push({ title: data.document.title, url: data.document.url });
  }
  return { content: text.trim(), citations };
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const send = useCallback(async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: uid(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const data = await seekAnswer(trimmed);
      const { content, citations } = extractAnswer(data);
      const assistantMsg: Message = {
        id: uid(),
        role: "assistant",
        content: content || "I couldn't find a specific answer. Please try rephrasing, or contact TechD directly at 888-98-TECHD.",
        citations,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: Message = {
        id: uid(),
        role: "assistant",
        content: "Something went wrong. Please try again or call us at 888-98-TECHD (888-988-3243).",
        error: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const clear = useCallback(() => setMessages([]), []);

  return { messages, loading, send, clear };
}
