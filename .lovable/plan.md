# Contact form → Google Apps Script integration

Goal: keep the branded React form on `/contact`, send submissions to a Google Apps Script web app on `@techd.com` that (1) emails the recipient list instantly and (2) appends a row to a backup Google Sheet. No backend, no secrets, public-repo-safe.

**Testing recipient (for now):** `fvargas@techd.com`
**Production recipients (later swap):** `bsyring@techd.com`, `info@techd.com`
**Deployed endpoint:** `https://script.google.com/macros/s/AKfycbxZzWP0YBibJKvj7Q7zJ5879_cFc_AQ1mhnlPrMgpORp-IEBF0zKqlutkcDdzIMELWqcg/exec`

---

## Part 1 — Google side (already done by you)

- Sheet + Apps Script created in `fvargas@techd.com`.
- Deployed as Web App, Execute as: Me, Access: Anyone.
- Recipient list in the script currently set to `fvargas@techd.com` for testing.
- When ready to go live: edit the `RECIPIENTS` constant in the script → save → Deploy → Manage deployments → New version (URL stays the same).

---

## Part 2 — React side (codebase changes)

Small, contained. Only the contact form touches network code.

### Files to add
- **`src/lib/contact-submit.ts`** — single async `submitContact(payload)` that POSTs JSON to the Apps Script URL.
  - Uses `mode: "no-cors"` (Apps Script doesn't return CORS headers; we accept opaque response and treat a non-thrown fetch as success).
  - `Content-Type: text/plain;charset=utf-8` so the request stays a simple request (no preflight, which `no-cors` blocks anyway).
  - 10s timeout via `AbortController`.
  - Pulls the endpoint URL from `site.ts`.

### Files to edit
- **`src/content/site.ts`** — add a `contactEndpoint` constant with the script URL above. Safe in a public repo.
- **`src/sections/contact/ContactForm.tsx`**:
  - Add a hidden honeypot field `website` (visually hidden, `tabIndex={-1}`, `autoComplete="off"`). If filled → show success screen without POSTing.
  - Add `isSubmitting` + `submitError` state.
  - Replace the `console.info` in `onSubmit` with `await submitContact(...)`. Payload includes all form fields plus `userAgent` and `page` (`window.location.href`).
  - Disable submit button + show spinner while in flight.
  - On failure: inline error above the button with a `mailto:fvargas@techd.com` fallback; keep form filled so the user can retry.
  - Keep existing success screen as-is.

### What does NOT change
- Layout, styling, copy, validation schema, field order, pill toggles, `btn-glow` CTA — untouched.
- No new dependencies.
- No env vars, no secrets, no GitHub Actions changes.

---

## Part 3 — Apps Script reference (already deployed by you)

For documentation only — this is the script running at the URL above:

```javascript
const RECIPIENTS = ['fvargas@techd.com']; // TODO: swap to bsyring@ + info@ before go-live
const SUBJECT_PREFIX = '[techd.com lead]';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.website) return ok(); // honeypot

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      new Date(), data.name, data.email, data.company, data.role,
      data.phone || '', data.heardAbout, data.heardAboutOther || '',
      data.area, data.timeline || '', data.message,
      data.userAgent || '', data.page || ''
    ]);

    MailApp.sendEmail({
      to: RECIPIENTS.join(','),
      replyTo: data.email,
      subject: `${SUBJECT_PREFIX} ${data.name} — ${data.company} (${data.area})`,
      htmlBody: renderEmail(data),
    });
    return ok();
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput(JSON.stringify({ ok: false }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function ok() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function renderEmail(d) {
  return `
    <h2>New contact form submission</h2>
    <p><b>${d.name}</b> — ${d.role} at ${d.company}</p>
    <p><a href="mailto:${d.email}">${d.email}</a>${d.phone ? ' · ' + d.phone : ''}</p>
    <p><b>Area:</b> ${d.area}${d.timeline ? ' · <b>Timeline:</b> ' + d.timeline : ''}</p>
    <p><b>Heard about us:</b> ${d.heardAbout}${d.heardAboutOther ? ' (' + d.heardAboutOther + ')' : ''}</p>
    <hr><p style="white-space:pre-wrap">${d.message.replace(/</g,'&lt;')}</p>
    <hr><small>${d.page || ''}<br>${d.userAgent || ''}</small>`;
}
```

---

## Flow

```text
Branded React form (/contact)
   │   fetch POST (JSON body, text/plain, no-cors)
   ▼
Google Apps Script web app  (runs as fvargas@techd.com)
   ├──► MailApp.sendEmail → fvargas@techd.com  (testing; reply-to = submitter)
   └──► Sheet.appendRow   → backup + edit-notification subscribers
```

---

## Test plan (after build mode)

1. Open `/contact`, fill all required fields with a test email, submit.
2. Confirm success screen renders.
3. Confirm a row appears in the Sheet within ~5s.
4. Confirm `fvargas@techd.com` receives the email, and that "Reply" goes to the submitter's address.
5. Honeypot test: in DevTools, set the hidden `website` input value and submit → success screen shows, but no Sheet row and no email.
6. Network failure test: throttle to offline in DevTools → submit → inline error with `mailto:` fallback appears, form stays filled.

---

## Trade-offs (technical)

- **`no-cors` = opaque response.** We can't read `{ok:true}` back. The Sheet is the source of truth; if a row is missing we know it failed. Acceptable for a contact form.
- **Honeypot only, no CAPTCHA.** Apps Script quotas (~20k emails/day) absorb realistic abuse. Add reCAPTCHA later only if spam appears.
- **Versioning.** Every script edit needs Deploy → Manage deployments → New version. URL stays stable.
- **Migration path.** If we later move to Cloudflare Worker / AWS Lambda, only `src/lib/contact-submit.ts` + the `contactEndpoint` constant change. Form component stays identical.

---

## Go-live checklist (later, not now)

- [ ] In Apps Script, change `RECIPIENTS` to `['bsyring@techd.com', 'info@techd.com']`.
- [ ] Deploy → Manage deployments → New version.
- [ ] Share the Sheet with `bsyring@techd.com` (Editor) so Robert can enable Tools → Notification settings → "Any changes" → "Email right away".
- [ ] Update the `mailto:` fallback in `ContactForm.tsx` from `fvargas@` to `info@techd.com`.

Ready to switch to build mode and wire this up?
