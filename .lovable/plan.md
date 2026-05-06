## What the reference shows

The Stripe-style halo in your video has each particle drifting **outward and back along its own radius** with a unique phase. There's no rotation — the ring just slowly inhales and exhales. Outer particles travel further than inner ones, which is what makes the cloud look like it's gently breathing into space.

## Change

Update `src/sections/home/_shared/ParticleOrbit.tsx` to animate per-particle radial drift.

### Per-particle params (computed once at build)

For each of the 4,200 particles, store:
- `angle` — its fixed angular position (no rotation)
- `baseR` — its resting radius (current gaussian distribution, unchanged)
- `amp` — drift distance: `0.08 + outwardness * 0.55 + jitter`, so outer particles travel further
- `phase` — random `0..2π` so they don't pulse in sync
- `speed` — `0.35..0.7` rad/s, slow and varied

### Per-frame update (`useFrame`)

```text
r = baseR + sin(t * speed + phase) * amp
x = cos(angle) * r
y = sin(angle) * r
```

Mutate the position buffer in place, set `needsUpdate = true`. Highlights re-sample from the same indices each frame so they ride along.

### Other details

- Switch canvas `frameloop` from `"demand"` to `"always"` (only when motion is allowed).
- Honor `prefers-reduced-motion` — keep current static render in that case.
- Subtle highlight opacity pulse: `0.75 + sin(t * 1.2) * 0.2`.
- No global rotation, no z-axis motion — purely radial breathing, matching the reference.

### Files

- Edit: `src/sections/home/_shared/ParticleOrbit.tsx`
