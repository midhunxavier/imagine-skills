# Publication-quality checklist

## Sizing

- Prefer `mm + dpi` sizing in `manifest.ts` for paper submission.
- Single column: ~85–90mm; double column: ~175–180mm (check target venue).
- Use `dpi: 300` for general use; `600` for dense plots or small text.

## Typography

- Keep font choices consistent across all figures and panels.
- Aim for ~8–10pt equivalent for axis labels at final print size; ~10–12pt for panel labels and titles.
- Use sentence case for axis labels unless your field expects otherwise.

## Color and accessibility

- Use colorblind-safe palettes (e.g., Viridis/Cividis/Okabe–Ito).
- Ensure the figure remains interpretable in grayscale (different line styles/markers help).
- Use sufficient contrast against white background.

## Lines, markers, and grids

- Use consistent stroke widths across charts (avoid hairlines that disappear in print).
- Don’t overuse gridlines; keep them subtle.
- Use markers sparingly; prefer them when distinguishing series in grayscale.

## Multi-panel figures

- Use consistent margins and axes across panels when comparing values.
- Label panels clearly (a), b), c)…) and keep placement consistent.
- Share legends where possible to reduce clutter.

## Final export checklist

- Export **SVG** for final submission when accepted by the venue.
- Verify SVG opens in Inkscape/Illustrator without missing content.
- If submitting PNG:
  - Confirm dpi meets requirements
  - Confirm text is crisp at 100% zoom in a PDF
- Confirm backgrounds match requirements (white vs transparent).
- Confirm no clipping at edges (labels, legends, callouts).
