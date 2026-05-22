# Plan: optimize 3D hero bundles

## Findings from exploration

- **13 files** import from `three` or `@react-three/fiber` across hero figures, particle scenes, and section scenes.
- **`@react-three/drei` is installed but never imported anywhere in `src/`.** It sits in `package.json` only.
- `vite.config.ts` has no `manualChunks` config, so Rollup decides chunking per dynamic import. Each `React.lazy` hero chunk currently risks pulling its own copy of `three` (~150 KB minified).

This changes the original two-step plan:
1. Manual chunks for `three` + `r3f` — still valuable.
2. ~~Audit drei imports~~ → **Remove drei entirely** since nothing uses it.

## Changes

### 1. Share `three` and `@react-three/fiber` across all lazy chunks

Edit `vite.config.ts` — add `build.rollupOptions.output.manualChunks`:

```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        three: ['three'],
        r3f: ['@react-three/fiber'],
      },
    },
  },
},
```

Result: one `three-[hash].js` chunk (~150 KB gz) and one `r3f-[hash].js` chunk (~20 KB gz) load once and are reused by every hero. No duplication across route chunks.

### 2. Remove the unused `@react-three/drei` dependency

```bash
bun remove @react-three/drei
```

Saves install time, removes ~500 KB from `node_modules`, eliminates the risk of a future contributor adding a barrel `import * from '@react-three/drei'`.

## Verification

- Run the build (auto-runs after edits).
- Confirm the dist output shows a single `three-*.js` chunk and that hero route chunks shrank.
- Smoke-check each hero in preview: `/`, `/solutions/*`, `/services/*`, `/industries/*`, `/company`, `/resources/*`, `/contact`. They should look and animate identically.

## Out of scope (saved for later)

- Pausing `<Canvas>` render loop when off-screen (item 3 from prior message)
- Static-image fallback on mobile (item 5)
- `prefers-reduced-motion` particle reductions (item 6)
