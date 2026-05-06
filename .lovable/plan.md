## Plan: uniform logo strip, no names

**1. `src/shared/LogoStrip.tsx`** — drop the `<span>` company name beneath each logo, switch the link from `flex-col` to a single-row `flex items-center`, and use one fixed size class (`h-12 md:h-14`) for every logo, ignoring per-item `logoClass` overrides so all logos render identically sized.

**2. `src/content/site.ts`** — strip every `logoClass` override from the `CUSTOMERS` array (J&J, Sony Pictures, Temple Health, Sony Interactive, Hamilton Beach, White Cap, VCU) so nothing forces a size variation. Keep the `logoClass` field in the `Customer` type for future flexibility but unused.

This makes Hamilton Beach and White Cap larger (they were `h-14 md:h-16` capped — now `h-12 md:h-14` applied to ALL logos uniformly, so visually they'll match Princeton, Comcast, etc., which is bigger than what they appeared next to those before since the strip is now name-free with more breathing room).

Note: with all logos forced to the same height, logos with extra padding/whitespace baked into the artwork (J&J, VCU were shrunk for that reason) may visually appear smaller than peers. If that becomes an issue after seeing it live, we can crop those specific PNGs rather than re-introducing per-logo size overrides.