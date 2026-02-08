# Rendering and export

Imagine exports figures via its renderer (Playwright + Studio render route).

## Common commands

Render a whole project:

```bash
npm run render -- --project example
```

Limit to one figure or variant:

```bash
npm run render -- --project example --fig line-chart
npm run render -- --project example --fig hello-world --variant transparent
```

Choose formats and output directory:

```bash
npm run render -- --project example --formats png,svg --out out/example
```

## Dev vs build mode

- `--mode build` (default): runs `npm run build`, serves `dist/`, then renders (slow but reproducible).
- `--mode dev`: renders from an already running `npm run dev` server (fast iteration).

## Outputs

By default, outputs go to `out/<projectId>/`:
- `<figureId>--<variantId>.png`
- `<figureId>--<variantId>.svg`
- `manifest.json` (unless `--no-manifest`)

## How SVG export works (important)

SVG export extracts `outerHTML` from `#figure-root svg`.

If you see an empty SVG file:
- Ensure your component renders an `<svg>` at the root (use `<Figure>`).
- Ensure you aren’t rendering only HTML `<div>` content.
