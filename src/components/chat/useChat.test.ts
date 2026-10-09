// generated-for: useChat.ts@9f333d8bea49
import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useChat } from "./useChat";
import type { SeekResponse } from "./types";

const FALLBACK =
  "I couldn't find a specific answer. Please try rephrasing, or contact TechD directly at 888-98-TECHD.";
const ERROR =
  "Something went wrong. Please try again or call us at 888-98-TECHD (888-988-3243).";

const fetchMock = vi.fn();

function respond(body: SeekResponse, ok = true, status = 200) {
  fetchMock.mockResolvedValueOnce({ ok, status, json: async () => body });
}

async function ask(question = "What does TechD do?") {
  const hook = renderHook(() => useChat());
  await act(async () => {
    await hook.result.current.send(question);
  });
  return hook.result.current;
}

async function lastAssistant(body: SeekResponse) {
  respond(body);
  const { messages } = await ask();
  return messages[messages.length - 1];
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useChat send", () => {
  it("posts the trimmed question to /seek with the embedcode header", async () => {
    respond({ answer: "Hi" });
    await ask("  hello  ");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toMatch(/\/seek$/);
    expect(init.method).toBe("POST");
    expect(init.headers.embedcode).toBeTruthy();
    expect(JSON.parse(init.body)).toEqual({ question: "hello" });
  });

  it("appends the user message then the trimmed assistant answer", async () => {
    respond({ answer: "  TechD is an IBM partner.  " });
    const { messages, loading } = await ask("  Who are you?  ");
    expect(loading).toBe(false);
    expect(messages).toHaveLength(2);
    expect(messages[0]).toMatchObject({ role: "user", content: "Who are you?" });
    expect(messages[1]).toMatchObject({ role: "assistant", content: "TechD is an IBM partner." });
  });

  it("ignores blank questions without calling fetch", async () => {
    const { messages } = await ask("   ");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(messages).toEqual([]);
  });

  it("clear() empties the message list", async () => {
    respond({ answer: "x" });
    const hook = renderHook(() => useChat());
    await act(async () => {
      await hook.result.current.send("q");
    });
    expect(hook.result.current.messages).toHaveLength(2);
    act(() => hook.result.current.clear());
    expect(hook.result.current.messages).toEqual([]);
  });
});

describe("answer extraction", () => {
  it("falls back to answersText, then fwd, when answer is missing", async () => {
    expect((await lastAssistant({ answersText: "from answersText" })).content).toBe("from answersText");
    expect((await lastAssistant({ fwd: "from fwd" })).content).toBe("from fwd");
  });

  it.each([
    ["empty string", { answer: "" }],
    ["whitespace only", { answer: "   " }],
    ["missing entirely", {}],
  ])("uses the phone-number fallback when the answer is %s", async (_label, body) => {
    const msg = await lastAssistant(body as SeekResponse);
    expect(msg.content).toBe(FALLBACK);
    expect(msg.error).toBeUndefined();
  });
});

describe("citation extraction", () => {
  it.each([
    "https://techd.com/solutions/ai-generative",
    "http://example.com/doc",
    "/solutions/data-analytics",
  ])("adds a citation for safe url %s", async (url) => {
    const msg = await lastAssistant({ answer: "a", url, document: "Some Page" });
    expect(msg.citations).toEqual([{ title: "Some Page", url }]);
  });

  it("trims whitespace around the url", async () => {
    const msg = await lastAssistant({ answer: "a", url: "  /contact  ", document: "Contact" });
    expect(msg.citations).toEqual([{ title: "Contact", url: "/contact" }]);
  });

  it.each([
    ["empty", ""],
    ["whitespace", "   "],
    ["protocol-relative //host", "//evil.example.com/x"],
    ["javascript:", "javascript:alert(1)"],
    ["data:", "data:text/html,<script>alert(1)</script>"],
    ["ftp:", "ftp://example.com/file"],
    ["unparseable relative", "solutions/ai"],
  ])("adds no citation for %s url", async (_label, url) => {
    const msg = await lastAssistant({ answer: "a", url, document: "Doc" });
    expect(msg.citations).toEqual([]);
  });

  it("adds no citation when url is missing", async () => {
    const msg = await lastAssistant({ answer: "a", document: "Doc" });
    expect(msg.citations).toEqual([]);
  });

  it.each([
    ["00-site-meta.md", "site meta"],
    ["12-ai-generative-practice.MD", "ai generative practice"],
    ["  Contact Us  ", "Contact Us"],
    ["", "Source"],
    [undefined, "Source"],
  ])("cleans document title %j to %j", async (document, expected) => {
    const msg = await lastAssistant({ answer: "a", url: "/x", document });
    expect(msg.citations).toEqual([{ title: expected, url: "/x" }]);
  });

  it("still attaches the citation when the answer falls back", async () => {
    const msg = await lastAssistant({ answer: "", url: "/x", document: "00-site-meta.md" });
    expect(msg.content).toBe(FALLBACK);
    expect(msg.citations).toEqual([{ title: "site meta", url: "/x" }]);
  });
});

describe("error paths", () => {
  it("produces an error message when fetch rejects", async () => {
    fetchMock.mockRejectedValueOnce(new Error("network down"));
    const { messages, loading } = await ask();
    expect(loading).toBe(false);
    expect(messages).toHaveLength(2);
    expect(messages[1]).toMatchObject({ role: "assistant", content: ERROR, error: true });
  });

  it("produces an error message on a non-ok response", async () => {
    respond({ answer: "ignored" }, false, 500);
    const { messages } = await ask();
    expect(messages[1]).toMatchObject({ content: ERROR, error: true });
  });

  it("produces an error message when the body is not JSON", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError("bad json");
      },
    });
    const { messages } = await ask();
    expect(messages[1]).toMatchObject({ content: ERROR, error: true });
  });
});
