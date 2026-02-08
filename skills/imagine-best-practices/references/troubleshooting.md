# Troubleshooting

## “Empty SVG” export

Symptoms: SVG file exists but contains nothing useful.

Fixes:
- Ensure the figure component renders an `<svg>` root (use `@/framework/Figure`).
- Avoid `foreignObject` for critical content if you plan to edit in vector tools.

## Clipped labels / cut-off content

Symptoms: axis labels or titles are cut off.

Fixes:
- Increase margins in the component.
- Ensure `viewBox` matches the intended coordinate space (the `<Figure>` default is `0 0 width height`).

## Fonts look different in exported PNG

Symptoms: local dev view differs from exported PNG.

Fixes:
- Prefer system fonts for reproducibility.
- If using web fonts, ensure they load before render; Imagine waits for `document.fonts.ready`, but network timing can still matter.

## MathJax not rendered (equations missing)

Symptoms: equation area is blank or partial.

Fixes:
- Ensure MathJax loads (CDN access required by default).
- The renderer waits for `window.__IMAGINE_READY__` and for pending math tasks to complete; avoid long-running math side effects.

## Playwright / Chromium missing

Symptoms: render fails saying browser executable is missing.

Fix:
- From the Imagine repo root, run:
  - `npx playwright install chromium`

## Debugging render failures

- Render one figure at a time with `--fig` to isolate.
- Use `--mode dev` to iterate faster (keep `npm run dev` running).
- Watch for `[pageerror]` or `console.error` output during rendering.
