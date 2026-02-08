# Imagine project structure

Imagine organizes figures into **projects** under `projects/<projectId>/`.

Recommended structure:

```text
projects/
  <projectId>/
    project.ts        # default-export ProjectDefinition
    manifest.ts       # exports `figures: FigureManifestItem[]`
    figures/          # React components; each file default-exports a component
      <moduleKey>.tsx
    props.json        # Studio-saved prop overrides (optional but recommended)
public/
  projects/<projectId>/previews/  # optional static preview PNGs for Studio gallery
```

## `project.ts`

- Must default-export a `ProjectDefinition`.
- Typically imports `figures` from `./manifest` and calls `validateProject(project)`.

Minimal shape:

```ts
import type { ProjectDefinition } from '../../src/core/manifest';
import { validateProject } from '../../src/core/manifest';
import { figures } from './manifest';

const project: ProjectDefinition = {
  id: 'my-project',
  title: 'My project',
  description: 'Figures for a paper.',
  figures
};

validateProject(project);
export default project;
```

## `manifest.ts`

- Exports `figures: FigureManifestItem[]`.
- Each `FigureManifestItem` references a figure component via `moduleKey`.

Important: `moduleKey` must match the figure filename (without `.tsx`).

Example mapping:
- `projects/example/figures/line-chart.tsx` → `moduleKey: "line-chart"`

## Figure module loading (Studio)

The Studio discovers project and figure modules via Vite `import.meta.glob`:
- Projects: `../../projects/*/project.ts`
- Figures: `../../projects/*/figures/*.tsx`

That’s why new projects and figures are usually **discovered at build time** (restart dev server after adding a project).
