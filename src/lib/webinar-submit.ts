import { WEBINAR_ENDPOINT } from "@/content/site";

export type WebinarRegistrationPayload = Record<string, unknown>;

/**
 * POSTs a webinar registration to its Google Apps Script web app.
 * Transport is identical to `contact-submit.ts` — see the notes there.
 */
export async function submitWebinarRegistration(
  payload: WebinarRegistrationPayload,
): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    await fetch(WEBINAR_ENDPOINT, {
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
