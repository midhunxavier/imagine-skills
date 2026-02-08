---
name: imagine-best-practices
description: Publication-quality scientific figures with the Imagine framework (React → SVG/PNG). Use when designing, reviewing, or exporting charts/diagrams/multi-panel figures for papers, posters, or preprints, especially when you need mm+dpi sizing, vector-first SVG, typography/color guidance, and final submission checks.
---

# imagine-best-practices

Install:

`$ npx skills add https://github.com/midhunxavier/imagine-skills --skill imagine-best-practices`

## Quick workflow (paper-ready)

1. Pick a target size in **mm** (journal column width) + **dpi** for PNG export.
2. Implement the figure as **pure SVG** (avoid `foreignObject`) for robust vector output.
3. Use consistent typography, line weights, and color (colorblind-safe).
4. Export `svg` for final submission; export `png` for drafts or systems that don’t embed SVG well.

## References

- [references/project-structure.md](./references/project-structure.md) — Files/folders: `projects/<id>/`, `project.ts`, `manifest.ts`, `figures/`, `props.json`, previews.
- [references/manifest-and-variants.md](./references/manifest-and-variants.md) — `FigureManifestItem`, variants, `px` vs `mm+dpi`, props, controls.
- [references/components-svg-only.md](./references/components-svg-only.md) — Writing figure components that export clean SVG.
- [references/publication-quality.md](./references/publication-quality.md) — Typography, sizing, color, multi-panel conventions, checklist.
- [references/rendering-and-export.md](./references/rendering-and-export.md) — `npm run render` flags, outputs, dev vs build.
- [references/troubleshooting.md](./references/troubleshooting.md) — Empty SVG, clipping, fonts, MathJax, Playwright.

## Related skills

- Use `imagine-scaffold` to create new projects/figures with ready-to-render templates and manifest insertion.
- Use `imagine-charts` for chart layout + D3 scale/axis patterns.
- Use `imagine-diagrams` for pure-SVG diagrams (boxes/arrows/callouts).
- Use `imagine-layout` for multi-panel composition and panel labels.
- Use `imagine-math` for MathJax/`MathSvg` equation figures.
- Use `imagine-rendering` for export workflows and renderer debugging.
