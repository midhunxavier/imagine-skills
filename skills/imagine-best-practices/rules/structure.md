# Imagine Project Structure

A typical Imagine project follows this structure:

```bash
projects/
  <project-id>/
    project.ts       # Entry point exporting ProjectDefinition
    manifest.ts      # Defines figures, variants, and props
    figures/         # React components for figures
      my-figure.tsx
      ...
    previews/        # (Optional) Generated preview images
```

## `project.ts`

This file exports the `ProjectDefinition`, which links the project ID, title, and figures (from `manifest.ts`).

```typescript
import type { ProjectDefinition } from '../../src/core/manifest';
import { validateProject } from '../../src/core/manifest';
import { figures } from './manifest';

const project: ProjectDefinition = {
  id: 'my-project',
  title: 'My Scientific Figures',
  description: 'Figures for my upcoming paper.',
  examples: [
    // Optional: examples for the gallery
    { figureId: 'fig1', variantId: 'default', src: '...', caption: '...' }
  ],
  figures
};

validateProject(project);
export default project;
```

## `manifest.ts`

This file defines the `figures` array, where each figure has:
- `id`: Unique identifier (e.g., `fig1`).
- `moduleKey`: Key used to lazy-load the component (must match `main.tsx` map).
- `size`: Default size (`px` or `mm`).
- `variants`: Configurations (props, background, size overrides).

See [rules/manifest.md](./manifest.md) for details.

## `figures/` directory

Contains the React components implementing the figures. Each file typically exports a default component that accepts `props` defined in the manifest variants.

See [rules/components.md](./components.md) for details.
