import { useEffect, useMemo, useRef, useState } from "react";
import { Beaker, Eraser, Send, Trash2 } from "lucide-react";
import Layout from "@layout/Layout";
import { Button } from "@/components/ui/button";
import ContactForm from "@/sections/contact/ContactForm";
import { CONTACT_ENDPOINT } from "@/content/site";

type LogLevel = "info" | "success" | "error";
type LogEntry = {
  id: string;
  ts: Date;
  level: LogLevel;
  title: string;
  detail?: unknown;
};

const TEST_PAYLOAD = {
  name: "Test User",
  email: "test+lab@techd.com",
  company: "TechD Lab",
  role: "QA Engineer",
  phone: "+1 (555) 010-1234",
  heardAbout: "Web search",
  area: "AI & Automation",
  timeline: "Exploring",
  message:
    "This is an automated submission from /contact-lab — please ignore. Verifying Apps Script email + Sheet append.",
};

/**
 * Sets the value of a React-controlled <input>/<textarea> in a way that
 * triggers RHF's onChange handler (React intercepts the native setter).
 */
function setReactValue(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const proto =
    el instanceof HTMLTextAreaElement
      ? window.HTMLTextAreaElement.prototype
      : window.HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  setter?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

function clickByText(root: ParentNode, selector: string, text: string) {
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(selector));
  const match = nodes.find((n) => n.textContent?.trim() === text);
  match?.click();
}

const ContactLab = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const formHostRef = useRef<HTMLDivElement | null>(null);
  const originalFetchRef = useRef<typeof window.fetch | null>(null);

  const addLog = (entry: Omit<LogEntry, "id" | "ts">) => {
    setLogs((prev) => [
      { ...entry, id: crypto.randomUUID(), ts: new Date() },
      ...prev,
    ]);
  };

  // Intercept window.fetch while the lab is mounted so we can log
  // submissions to the Apps Script endpoint (response is opaque under
  // no-cors, but we can still log the request + completion).
  useEffect(() => {
    originalFetchRef.current = window.fetch.bind(window);
    addLog({
      level: "info",
      title: "Lab mounted — fetch interceptor active",
      detail: { endpoint: CONTACT_ENDPOINT },
    });

    window.fetch = async (input, init) => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof Request
            ? input.url
            : String(input);

      const isContact = url.includes("script.google.com/macros");
      const started = performance.now();

      if (isContact) {
        let body: unknown = init?.body ?? null;
        if (typeof body === "string") {
          try {
            body = JSON.parse(body);
          } catch {
            /* leave as string */
          }
        }
        addLog({
          level: "info",
          title: `→ POST ${new URL(url).pathname.slice(0, 32)}…`,
          detail: { mode: init?.mode, body },
        });
      }

      try {
        const res = await originalFetchRef.current!(input, init);
        if (isContact) {
          const ms = Math.round(performance.now() - started);
          addLog({
            level: "success",
            title: `✓ Request completed in ${ms}ms`,
            detail: {
              type: res.type, // "opaque" under no-cors
              status: res.status, // 0 under no-cors
              ok: res.ok,
            },
          });
        }
        return res;
      } catch (err) {
        if (isContact) {
          const ms = Math.round(performance.now() - started);
          addLog({
            level: "error",
            title: `✗ Request failed after ${ms}ms`,
            detail: err instanceof Error ? err.message : err,
          });
        }
        throw err;
      }
    };

    return () => {
      if (originalFetchRef.current) {
        window.fetch = originalFetchRef.current;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fillTestData = () => {
    const host = formHostRef.current;
    if (!host) return;

    const setInput = (name: keyof typeof TEST_PAYLOAD, value: string) => {
      const el = host.querySelector<HTMLInputElement>(`[name="${name}"]`);
      if (el) setReactValue(el, value);
    };

    setInput("name", TEST_PAYLOAD.name);
    setInput("email", TEST_PAYLOAD.email);
    setInput("company", TEST_PAYLOAD.company);
    setInput("role", TEST_PAYLOAD.role);
    setInput("phone", TEST_PAYLOAD.phone);

    const messageEl = host.querySelector<HTMLTextAreaElement>(
      'textarea[name="message"]',
    );
    if (messageEl) setReactValue(messageEl, TEST_PAYLOAD.message);

    // Area: pill toggle group — click the matching button
    clickByText(host, 'button[role="radio"]', TEST_PAYLOAD.area);
    clickByText(host, 'button[role="radio"]', TEST_PAYLOAD.timeline);

    // "How did you hear about us?" — shadcn Select. Open then pick option.
    const selectTrigger = host.querySelector<HTMLButtonElement>(
      'button[role="combobox"]',
    );
    if (selectTrigger) {
      selectTrigger.click();
      // Options render in a portal; wait a tick.
      setTimeout(() => {
        clickByText(document.body, '[role="option"]', TEST_PAYLOAD.heardAbout);
      }, 50);
    }

    addLog({
      level: "info",
      title: "Form filled with test data",
      detail: TEST_PAYLOAD,
    });
  };

  const triggerSubmit = () => {
    const submit = formHostRef.current?.querySelector<HTMLButtonElement>(
      'button[type="submit"]',
    );
    if (submit) {
      submit.click();
    } else {
      addLog({ level: "error", title: "Submit button not found" });
    }
  };

  const resetForm = () => {
    // Re-mount the form to reset all state cleanly.
    setFormKey((k) => k + 1);
    addLog({ level: "info", title: "Form re-mounted (state reset)" });
  };

  const [formKey, setFormKey] = useState(0);

  const logCounts = useMemo(() => {
    return logs.reduce(
      (acc, l) => {
        acc[l.level] += 1;
        return acc;
      },
      { info: 0, success: 0, error: 0 } as Record<LogLevel, number>,
    );
  }, [logs]);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-10 flex flex-col gap-3">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            <Beaker className="size-3.5" /> Internal lab
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
            Contact form lab
          </h1>
          <p className="max-w-2xl text-base font-light text-muted-foreground">
            Test the contact form end-to-end: auto-fill realistic data, submit
            to the Google Apps Script endpoint, and inspect every request in
            the log panel below. Real emails will be sent to the configured
            recipient list.
          </p>
          <p className="text-xs font-light text-muted-foreground">
            Endpoint:{" "}
            <code className="rounded bg-muted/50 px-1.5 py-0.5 text-[11px] text-secondary">
              {CONTACT_ENDPOINT.replace(/^https:\/\/script\.google\.com/, "")}
            </code>
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* Left: controls + form */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-3 rounded-xl border border-border bg-muted/20 p-4">
              <Button onClick={fillTestData} className="btn-glow">
                <Beaker className="mr-1 size-4" />
                Fill with test data
              </Button>
              <Button
                onClick={triggerSubmit}
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
              >
                <Send className="mr-1 size-4" />
                Submit form
              </Button>
              <Button onClick={resetForm} variant="ghost">
                <Eraser className="mr-1 size-4" />
                Reset form
              </Button>
            </div>

            <div ref={formHostRef}>
              <ContactForm key={formKey} />
            </div>
          </div>

          {/* Right: logs */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-background">
              <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    Logs
                  </p>
                  <p className="mt-0.5 text-xs font-light text-muted-foreground">
                    {logs.length} entries · {logCounts.success} ok ·{" "}
                    {logCounts.error} errors
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setLogs([])}
                  disabled={logs.length === 0}
                  className="h-8"
                >
                  <Trash2 className="mr-1 size-3.5" />
                  Clear
                </Button>
              </header>

              <div className="max-h-[640px] overflow-y-auto p-3">
                {logs.length === 0 ? (
                  <p className="px-2 py-8 text-center text-xs font-light text-muted-foreground">
                    No activity yet. Fill the form and submit to see requests.
                  </p>
                ) : (
                  <ol className="space-y-2">
                    {logs.map((l) => (
                      <li
                        key={l.id}
                        className={`rounded-md border p-3 text-xs ${
                          l.level === "success"
                            ? "border-primary/30 bg-primary/5"
                            : l.level === "error"
                              ? "border-destructive/40 bg-destructive/5"
                              : "border-border bg-muted/20"
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <p
                            className={`font-bold ${
                              l.level === "error"
                                ? "text-destructive"
                                : l.level === "success"
                                  ? "text-primary"
                                  : "text-secondary"
                            }`}
                          >
                            {l.title}
                          </p>
                          <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                            {l.ts.toLocaleTimeString()}
                          </span>
                        </div>
                        {l.detail !== undefined && (
                          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words rounded bg-background/60 p-2 font-mono text-[10px] text-muted-foreground">
                            {typeof l.detail === "string"
                              ? l.detail
                              : JSON.stringify(l.detail, null, 2)}
                          </pre>
                        )}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default ContactLab;
