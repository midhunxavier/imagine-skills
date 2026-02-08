# Chart patterns (Imagine)

## Layout and margins

Start by choosing fixed margins and computing a plot area:

- `margin.left` should fit y-axis tick labels and y-label (often 60–80px).
- `margin.bottom` should fit x tick labels and x-label (often 50–70px).

Compute:
- `plotW = width - left - right`
- `plotH = height - top - bottom`

## Scales and domains

- Use `linearScale([min, max], [0, plotW])` and `linearScale([min, max], [plotH, 0])`.
- Pad domains when points hit the edge (e.g., extend by a small percentage).
- For multiple series, compute extents over the concatenated dataset.

## Axes

- Keep tick counts small (4–6).
- Use explicit units in labels (e.g., `Time (s)`, `Concentration (µM)`).
- For scientific notation or formatting, pass a custom tick formatter.

## Gridlines

- Gridlines should be subtle; avoid competing with data strokes.
- Consider only horizontal gridlines for dense plots.

## Legends

- Prefer legends inside unused plot area (top-right) or outside to avoid occluding data.
- Use labels that match the manuscript terminology (conditions, cohorts, models).

## Error bars (pattern)

If you need error bars:
- Compute center points and error extents in data space.
- Render as SVG lines/caps in plot coordinates.
- Keep stroke widths consistent with series strokes.
