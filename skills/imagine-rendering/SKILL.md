---
name: imagine-rendering
description: Export workflow and debugging for Imagine’s Playwright renderer (npm run render), including build vs dev mode, props overrides, backgrounds, fonts, and common export failures. Use when diagnosing rendering issues or standardizing SVG/PNG export for papers.
---

# imagine-rendering

Use this skill to reliably export figures from Imagine and troubleshoot renderer issues.

## Workflow

1. Render in `--mode dev` for fast iteration; switch to `--mode build` for reproducible exports.
2. Export both `svg` (final submission) and `png` (draft/compatibility) when needed.
3. Use `props.json` overrides from Studio unless you explicitly disable them.

## References

- [references/render-cli.md](./references/render-cli.md)
- [references/debugging.md](./references/debugging.md)
