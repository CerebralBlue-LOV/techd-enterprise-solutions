# Spam Injection Analysis — techd.com

**Scan date:** 2026-05-04  
**Method:** Full crawl of 209 HTML pages, checked with both browser and crawler User-Agents

## Finding: Single-page cloaked injection on homepage only

### Attack type
**SEO spam cloaking** — hidden `<div style="overflow: hidden; height: 1px;">` injected on the homepage, containing Kenyan sports betting content (Betzoid, Betway, SportPesa, Betika, 22Bet).

### Key behavior
- Spam is **only served to specific User-Agents** (Googlebot, raw curl) — not to real browsers
- Spam is **only on the homepage** (`https://techd.com/`) — all 209 other pages are clean
- The injection is in the **WordPress theme** (right after `<body>` tag), not in any page content via the WP editor
- WP REST API page/post content is unaffected — the injection is in theme PHP (likely `header.php` or `functions.php`)

### Confirmed spam URL
| URL | Status | Action |
|-----|--------|--------|
| `https://techd.com/` | SPAM (theme-level) | Fixed by new site — no 410 needed (homepage can't 410) |

### Why spam-urls.txt was empty (original command)
The original grep searched for spam keywords IN URL PATHS — but the spam is in HTML BODY content of an otherwise-clean URL. There are no dedicated spam URL paths to 410.

### Implication for redirect map
- No legacy URLs need to be 410'd for spam reasons
- The homepage spam is a WordPress theme compromise, not a URL structure problem
- The new Vite/React site will not have this issue
- **Recommend:** tell Cesar the current WordPress site has a compromised theme and needs immediate cleanup (or just accelerate cutover)

### What Google sees
Google has indexed the spam content on the homepage. Recovery requires two parallel actions in Google Search Console — using only one is slower:

1. **URL Inspection → "Request Indexing"** — triggers a recrawl of the clean homepage. This is what pushes the new content into the index.
2. **Removals tool** — temporarily hides the cached spam version from search results within ~24 hours. This is separate from recrawling; use it to suppress the spam while the recrawl propagates.

Both together recover faster than either alone. Do this on cutover day, not after.

**Day 5 task (before sending handoff):** run `site:techd.com` in Google search and spot-check 10 minutes of results. This shows what Google actually has indexed. If any other pages were previously injected (even if they're clean now), they may still show spam snippets in search results — GSC Removals can suppress those too.

---

## Security implications (escalate to Cesar immediately)

Theme-level PHP injection means the attacker had **file-system write access** to the server — not just a compromised WP admin account or a plugin vulnerability. This has consequences beyond the visible spam:

### What may still be on the server

- **Web shells** — PHP backdoor files (often named `wp-config-backup.php`, `wp-xmlrpc.php`, random strings in `/uploads/`) that give the attacker persistent remote access. Launching the new site on a different host doesn't eliminate these if the old server stays live.
- **Cron jobs** — attackers commonly add server-level cron jobs to re-inject spam after it's cleaned, or to maintain persistence. Check `crontab -l` and `/etc/cron.d/` on the host.
- **Modified `wp-config.php` or `.htaccess`** — common targets for adding redirect rules or harvesting DB credentials.
- **Additional WP admin users** — check the WordPress user list for accounts that shouldn't be there.

### What should be treated as compromised

- **WordPress database** — contact form submissions, comments, any user accounts stored in WP. These should be considered potentially exfiltrated. If Cesar's site collected any PII via contact forms, that's a notification-level event depending on jurisdiction.
- **Email** — if the current hosting server also handles `@techd.com` mail, the attacker may have had access to outbound mail configuration (SMTP credentials, SPF/DKIM keys). Worth auditing after cutover.
- **Server credentials** — any credentials stored in WP config or environment files on that server should be rotated.

### Recommended actions before cutover

| Action | Who | When |
|--------|-----|-------|
| Audit WP admin user list for unknowns | Cesar / host admin | Before Friday |
| Scan `/uploads/` and theme dirs for PHP files | Host admin or security plugin | Before Friday |
| Check server crontab | Host admin | Before Friday |
| Rotate WP DB password and any API keys in wp-config | Cesar | Before Friday |
| Notify relevant parties if PII was in contact form DB | Cesar / legal | Depends on data |
| After cutover: take old WP server offline or lock it down | Host admin | Cutover day |

**The new Vite/React site on GitHub Pages has none of these attack surfaces** (no PHP, no database, no server-side execution). The security posture improves dramatically at cutover. But the old server needs to be locked down — not just left running — or the attacker retains access to a live domain-adjacent server.
