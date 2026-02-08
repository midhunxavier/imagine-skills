# Scientific Figure Best Practices

Creating figures for scientific articles requires attention to detail, precision, and specific formatting standards.

## 1. Resolution and Dimensions

- **Print Size**: Always define your figure size in `mm` based on the target journal's column width.
    - Single column: ~85-90 mm
    - 1.5 column: ~120 mm
    - Double column: ~180 mm
- **DPI**: Set `dpi: 300` (or 600) in `manifest.ts` for raster (PNG) exports. This ensures crisp text and lines when embedded in Word/LaTeX.
- **Vector Graphics**: Always prefer SVG export (`npm run render -- --formats svg`) for the final PDF submission. It scales infinitely.

## 2. Typography

- **Font Family**: Use standard, legible sans-serif fonts (Arial, Helvetica, Roboto) unless the journal specifies otherwise.
- **Font Size**: Ensure text is readable at the printed size. A good rule of thumb is 8-10pt for axis labels and 10-12pt for panel labels (A, B, C).
- **Consistency**: Use the same font size and family across all panels in a multi-panel figure.

## 3. Colors

- **Colorblind Safe**: Use color palettes that are distinguishable by colorblind readers (e.g., Viridis, Cividis, Okabe-Ito).
- **Grayscale Compatibility**: Check if your figure is legible when printed in black and white.
- **Contrast**: Ensure high contrast between data points and background.

## 4. Multi-panel Figures

- Use a grid layout to align panels.
- Label panels clearly with bold uppercase letters (A, B, C) in the top-left corner.
- Imagine's component model allows you to compose multiple sub-figures into one main figure component easily.

## 5. Reproducibility

- Store the data used to generate the figure alongside the code (e.g., in a JSON file).
- Use props to inject data, making it easy to update the figure if the data changes.
