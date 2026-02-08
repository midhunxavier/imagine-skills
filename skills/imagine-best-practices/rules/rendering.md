# Rendering Figures

Imagine provides a CLI to render your figures to image files.

## Basic Usage

Run the render script from your project root:

```bash
npm run render
```

By default, this renders all figures in the default project (`example`) to `out/example/`.

## Options

- **Target Project**:
  ```bash
  npm run render -- --project my-project
  ```

- **Specific Figure/Variant**:
  ```bash
  npm run render -- --fig fig1 --variant default
  ```

- **Output Formats**:
  ```bash
  npm run render -- --formats png,svg
  ```
  Note: `svg` export extracts the SVG DOM directly. `png` uses Puppeteer to screenshot the page.

- **Dev Mode**:
  ```bash
  npm run render -- --mode dev
  ```
  Connects to a running dev server instead of building the production bundle first. Faster for iteration.

## Output Structure

The output directory (`out/<project-id>/`) will contain:
- `fig1--default.png`
- `fig1--default.svg`
- `manifest.json`: Metadata about the render run.

## Troubleshooting

- **Empty SVG**: Ensure your component renders an `<svg>` at the root or wraps content in one.
- **Clipped Content**: Check the `viewBox` and `width`/`height` styles.
- **Fonts Missing**: Ensure web fonts are loaded (e.g., via Google Fonts in your CSS) before rendering starts. Imagine waits for `document.fonts.ready`.
