---
name: imagine-scaffold
description: Scaffold Imagine projects and figure components for scientific articles (project.ts, manifest.ts with insertion markers, props.json, and ready-to-render SVG figure templates). Use when creating a new Imagine project or adding a new chart/diagram/multi-panel/math figure quickly and consistently.
---

# imagine-scaffold

Install:

`$ npx skills add https://github.com/midhunxavier/imagine-skills --skill imagine-scaffold`

## Run location

Run the scripts from the **Imagine repo root** (the directory that contains `projects/`).

If the skill is installed outside your repo (for example under `~/.agents/skills/`), invoke the scripts via their installed path instead of `skills/imagine-scaffold/...`.

## Quick start

Create a project:

```bash
node skills/imagine-scaffold/scripts/new_project.mjs --id paper-figs --title "Paper Figures" --with-hello
```

Add a figure:

```bash
node skills/imagine-scaffold/scripts/new_figure.mjs --project paper-figs --id fig-line --kind chart-line
```

Render exports:

```bash
npm run render -- --project paper-figs --formats png,svg
```

## Figure kinds

`new_figure.mjs` supports:
- `chart-line`, `chart-scatter`, `chart-bar`
- `diagram-pipeline`, `diagram-architecture`
- `layout-multi-panel`
- `math-equation`
- `blank-svg`

## Size syntax

Override the default size with:
- `px:<w>x<h>` (example: `px:900x520`)
- `mm:<w>x<h>@<dpi>` (example: `mm:85x60@600`)

## Manifest insertion markers

Projects created by `new_project.mjs` include these markers in `projects/<id>/manifest.ts`:

- `// IMAGINE-SCAFFOLD:FIGURES-START`
- `// IMAGINE-SCAFFOLD:FIGURES-END`

`new_figure.mjs` inserts new manifest items just before the `FIGURES-END` marker.

For full CLI usage and troubleshooting, see [references/cli.md](./references/cli.md).
