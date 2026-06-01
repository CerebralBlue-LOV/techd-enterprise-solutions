# Go-live checklist

Target domain: `www.techd.com`
Hosting: GitHub Pages (`cerebralblue-lov/techd-enterprise-solutions`)
Staging URL (current): `cerebralblue-lov.github.io/techd-enterprise-solutions/`

---

## Fabio (code) — DONE

- [x] `vite.config.ts` — base changed from `/techd-enterprise-solutions/` to `/`
- [x] `public/CNAME` — created with `www.techd.com`
- [x] Legacy WordPress URL redirects — ~228 URLs mapped (Tier 1 explicit, Tier 2 category catch-alls, Tier 3 slug router). See `src/app/routes.tsx`, `src/app/TrailingSlashRedirect.tsx`, `src/app/LegacySlugRouter.tsx`
- [x] Merge branch — deployed June 1, 2026

---

## Bryan Syring (Apps Script) — DONE

Switch contact form from test to production recipients.

Recipients updated to `['fvargas@techd.com', 'bsyring@techd.com', 'info@techd.com']` and redeployed. `/exec` URL unchanged.

---

## Marc Martina (DNS in Bluehost) — DONE

Add these records in Bluehost DNS:

| Type  | Host | Value                              | TTL     |
|-------|------|------------------------------------|---------|
| CNAME | www  | `cerebralblue-lov.github.io`       | 3600    |
| A     | @    | `185.199.108.153`                  | 3600    |
| A     | @    | `185.199.109.153`                  | 3600    |
| A     | @    | `185.199.110.153`                  | 3600    |
| A     | @    | `185.199.111.153`                  | 3600    |

Once records are saved, confirm with Fabio so the branch can be merged.

> DNS propagation takes up to 24–48h but is usually <1h on Bluehost.

---

## Fabio — after DNS is confirmed — DONE (June 1, 2026)

- [x] Merge `main` → GitHub Actions builds & deploys
- [x] GitHub Pages detects `CNAME`, validates DNS, provisions HTTPS cert
- [x] `https://techd.com` loads correctly
- [x] `https://www.techd.com` redirects to `https://techd.com`

---

## Post-launch backlog

- [ ] Performance — Lighthouse score 51 (TBT 12s from three.js hero). Optimize after things settle.
- [ ] Case studies / success stories — add when Bryan is ready

## Notes

- The old WordPress techd.com site will stop serving as soon as Marc's DNS records propagate. Marc should be aware of this timing.
- HTTPS cert is auto-provisioned by GitHub Pages (Let's Encrypt). No action needed.
- If the cert takes >30 min, check GitHub → Settings → Pages — it will show a status.
- Success stories can be added post-launch (confirmed by Cesar).
