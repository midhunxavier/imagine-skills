# Manifest, variants, sizes, and props

The `projects/<projectId>/manifest.ts` file is the source of truth for what the Studio and renderer can produce.

## Figure entries

Each entry is a `FigureManifestItem`:
- `id`: Figure id (used in URLs, exports, and overrides)
- `title`: Human-readable title shown in Studio
- `moduleKey`: Must match `projects/<projectId>/figures/<moduleKey>.tsx`
- `size`: Default size (either `px` or `mm + dpi`)
- `variants`: List of variants (different props/background/size)

## Sizes: `px` vs `mm + dpi`

Use:
- `px` for screen-first diagrams or slides.
- `mm + dpi` for paper-first figures (journal column sizing).

Examples:

```ts
size: { unit: 'px', width: 900, height: 520 }
```

```ts
size: { unit: 'mm', width: 85, height: 60, dpi: 600 }
```

Notes:
- `mm + dpi` is converted to pixels for rendering; **SVG export remains vector**.
- Common paper widths: single column ~85–90mm, double column ~175–180mm.

## Variants

Variants reuse the same component with different configuration:
- `variant.props`: passed into the figure component
- `variant.controls`: optional Studio Controls to edit props interactively
- `variant.background`: `white` or `transparent`
- `variant.size`: optional override for the base figure size

Example:

```ts
export const figures = [
  {
    id: 'line-chart',
    title: 'Line chart',
    moduleKey: 'line-chart',
    size: { unit: 'mm', width: 85, height: 60, dpi: 600 },
    variants: [
      {
        id: 'default',
        title: 'Default',
        background: 'white',
        props: { title: 'Signal over time', xLabel: 'Time', yLabel: 'Response' }
      },
      {
        id: 'transparent',
        title: 'Transparent',
        background: 'transparent',
        props: { title: 'Signal over time' }
      }
    ]
  }
];
```

## `props.json` overrides (Studio)

When you edit values in Studio Controls, Imagine saves overrides to:

`projects/<projectId>/props.json`

The renderer automatically applies those overrides unless you pass `--no-props` or change `--props-file`.
