import { CONTACT_ENDPOINT } from "@/content/site";

export type ContactPayload = Record<string, unknown>;

/**
 * POSTs a contact form payload to the Google Apps Script web app.
 *
 * Notes:
 * - `mode: "no-cors"` because Apps Script does not return CORS headers.
 *   The response is opaque; we treat a non-thrown fetch as success.
 * - `Content-Type: text/plain` keeps the request "simple" (no preflight),
 *   which is required under no-cors. Apps Script reads the raw body.
 * - 10s timeout via AbortController.
 */
export async function submitContact(payload: ContactPayload): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}
