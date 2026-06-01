# Go-live checklist

Target domain: `www.techd.com`
Hosting: GitHub Pages (`cerebralblue-lov/techd-enterprise-solutions`)
Staging URL (current): `cerebralblue-lov.github.io/techd-enterprise-solutions/`

---

## Fabio (code) — DONE

- [x] `vite.config.ts` — base changed from `/techd-enterprise-solutions/` to `/`
- [x] `public/CNAME` — created with `www.techd.com`
- [x] Legacy WordPress URL redirects — ~228 URLs mapped (Tier 1 explicit, Tier 2 category catch-alls, Tier 3 slug router). See `src/app/routes.tsx`, `src/app/TrailingSlashRedirect.tsx`, `src/app/LegacySlugRouter.tsx`
- [ ] Merge branch once Marc confirms DNS is live

---

## Bryan Syring (Apps Script) — DONE

Switch contact form from test to production recipients.

Recipients updated to `['fvargas@techd.com', 'bsyring@techd.com', 'info@techd.com']` and redeployed. `/exec` URL unchanged.

---

## Marc Martina (DNS in Bluehost) — PENDING

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

## Fabio — after DNS is confirmed

- [ ] Merge `main` → GitHub Actions builds & deploys (~3 min)
- [ ] GitHub Pages detects `CNAME`, validates DNS, provisions HTTPS cert (~15 min)
- [ ] Verify `https://www.techd.com` loads correctly
- [ ] Verify `https://techd.com` redirects to `www.techd.com`
- [ ] Test contact form (submit a lead, confirm Bryan/Brian receives it)
- [ ] Test a few routes: `/solutions/ai-generative`, `/contact`, `/industries/healthcare`
- [ ] Check browser console — no 404s for assets

---

## Notes

- The old WordPress techd.com site will stop serving as soon as Marc's DNS records propagate. Marc should be aware of this timing.
- HTTPS cert is auto-provisioned by GitHub Pages (Let's Encrypt). No action needed.
- If the cert takes >30 min, check GitHub → Settings → Pages — it will show a status.
- Success stories can be added post-launch (confirmed by Cesar).
