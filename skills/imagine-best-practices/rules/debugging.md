# Debugging exports

## Empty SVG

SVG export extracts `outerHTML` from `#figure-root svg`.

Fix:
- Ensure your component renders an `<svg>` root (use `@/framework/Figure`).

## Clipping

Fix:
- Increase margins or adjust layout inside the SVG coordinate space.

## Fonts missing / inconsistent

Fix:
- Prefer system fonts for reproducibility.
- If using web fonts, ensure they load before render; the renderer waits for `document.fonts.ready`.

## Playwright missing browser

If you see an error about missing Chromium:

```bash
npx playwright install chromium
```

## Isolate failures

- Render one figure at a time (`--fig` + `--variant`).
- Use `--mode dev` to iterate quickly while inspecting logs.
