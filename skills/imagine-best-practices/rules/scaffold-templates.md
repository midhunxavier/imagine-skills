# Scaffold templates and defaults

This skill includes reusable templates under:

- `assets/templates/project/`
- `assets/templates/figures/`

Use these through the scaffold scripts in `scripts/` instead of manual copy-paste.

## Project templates

- `project.ts.tpl` - `ProjectDefinition` boilerplate with `validateProject()`
- `manifest.ts.tpl` - `figures` array plus insertion markers:
  - `// IMAGINE-SCAFFOLD:FIGURES-START`
  - `// IMAGINE-SCAFFOLD:FIGURES-END`
- `props.json.tpl` - initializes overrides with version `1`

## Figure templates by `--kind`

- `chart-line` -> `chart-line.tsx.tpl`
- `chart-scatter` -> `chart-scatter.tsx.tpl`
- `chart-bar` -> `chart-bar.tsx.tpl`
- `diagram-pipeline` -> `diagram-pipeline.tsx.tpl`
- `diagram-architecture` -> `diagram-architecture.tsx.tpl`
- `layout-multi-panel` -> `layout-multi-panel.tsx.tpl`
- `math-equation` -> `math-equation.tsx.tpl`
- `blank-svg` -> `blank-svg.tsx.tpl`

## Default sizes by kind

- `chart-*` -> `mm:85x60@600`
- `diagram-pipeline` -> `px:1000x380`
- `diagram-architecture` -> `px:1100x700`
- `layout-multi-panel` -> `px:1100x650`
- `math-equation` -> `px:900x260`
- `blank-svg` -> `px:900x520`
