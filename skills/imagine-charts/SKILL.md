---
name: imagine-charts
description: Chart-specific patterns for Imagine scientific figures (axes, scales, ticks, legends, grids, line/marker styling). Use when building or reviewing line/scatter/bar charts in Imagine for paper-ready SVG/PNG export.
---

# imagine-charts

Use this skill to implement consistent, publication-ready charts in Imagine.

## Workflow

1. Start from a scaffolded chart figure (`imagine-scaffold` kinds: `chart-line`, `chart-scatter`, `chart-bar`).
2. Define margins first (so axes/labels never clip).
3. Use D3 scales for numeric axes; keep tick density low and readable at print size.
4. Use subtle gridlines and consistent stroke widths.

## References

- [references/chart-patterns.md](./references/chart-patterns.md)
- [references/publication-chart-style.md](./references/publication-chart-style.md)
