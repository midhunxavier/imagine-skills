# imagine-best-practices

`$ npx skills add https://github.com/melwin-dev/imagine-skills --skill imagine-best-practices`

SKILL.md

## When to use

Use this skill when developing or modifying figures in the Imagine framework, especially for creating scientific visualizations, charts, diagrams, and multi-panel figures for publication.

## How to use

Read individual rule files for detailed explanations and code examples:

- [rules/structure.md](./rules/structure.md) - Project organization: `project.ts`, `manifest.ts`, and `figures/` directory.
- [rules/manifest.md](./rules/manifest.md) - Defining figures, variants, sizes (px vs mm), and props in `manifest.ts`.
- [rules/components.md](./rules/components.md) - Writing React components for figures, using props, and ensuring SVG compatibility.
- [rules/scientific.md](./rules/scientific.md) - Best practices for scientific figures: high DPI, vector output, consistent typography, and D3 usage.
- [rules/rendering.md](./rules/rendering.md) - Using the CLI (`npm run render`) to export PNG/SVG, debug modes, and output handling.
