# CLI reference

These scripts are intended to be run from the **Imagine repo root**.

If the skill is installed outside your repo (for example under `~/.agents/skills/`), invoke the scripts via their installed path.

## `new_project.mjs`

Create `projects/<projectId>/` with `project.ts`, `manifest.ts` (with insertion markers), and `props.json`.

```bash
node skills/imagine-best-practices/scripts/new_project.mjs --id <projectId> --title "<Title>" \
  [--description "<Desc>"] [--with-hello] [--force]
```

Notes:
- `--with-hello` adds `figures/hello-world.tsx` plus a manifest entry.
- If `projects/<projectId>` exists, the script fails unless `--force` is provided.

## `new_figure.mjs`

Create `projects/<projectId>/figures/<figureId>.tsx` from a template and (by default) update `projects/<projectId>/manifest.ts`.

```bash
node skills/imagine-best-practices/scripts/new_figure.mjs --project <projectId> --id <figureId> --kind <kind> \
  [--title "<Title>"] [--size <sizeSpec>] [--background white|transparent] \
  [--force] [--no-manifest-edit]
```

### Kinds

- Charts: `chart-line`, `chart-scatter`, `chart-bar`
- Diagrams: `diagram-pipeline`, `diagram-architecture`
- Layout: `layout-multi-panel`
- Math: `math-equation`
- Minimal: `blank-svg`

### Size spec

- `px:<w>x<h>` (example: `px:1000x380`)
- `mm:<w>x<h>@<dpi>` (example: `mm:85x60@600`)

### Manifest editing behavior

- Default: insert a `FigureManifestItem` before `// IMAGINE-SCAFFOLD:FIGURES-END`.
- If markers are missing:
  - With `--no-manifest-edit`: prints the manifest snippet and exits 0.
  - Without `--no-manifest-edit`: prints the snippet and exits non-zero.

### Common failure modes

- **Project not found**: `projects/<projectId>/` doesn’t exist.
- **File exists**: `figures/<figureId>.tsx` already exists and `--force` not provided.
- **No markers**: `manifest.ts` doesn’t contain the scaffold markers.

## After scaffolding

In the Imagine repo:

```bash
npm run dev
```

If you created a new project, you may need to restart dev (project discovery is build-time).

Export:

```bash
npm run render -- --project <projectId> --formats png,svg
```
