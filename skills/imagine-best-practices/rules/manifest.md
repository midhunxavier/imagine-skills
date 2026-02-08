# Defining Figures in Manifest

The `manifest.ts` file is the source of truth for your project's figures. It defines the available figures, their default sizes, and their variants.

## Basic Structure

```typescript
import type { FigureManifestItem } from '../../src/core/manifest';

export const figures: FigureManifestItem[] = [
  {
    id: 'fig-1',
    title: 'Figure 1: Overview',
    moduleKey: 'fig-1', // Must match the key in src/main.tsx component map
    size: { unit: 'mm', width: 180, height: 120, dpi: 300 }, // Print size
    variants: [
      {
        id: 'default',
        title: 'Default (Color)',
        background: 'white',
        props: {
          showLegend: true,
          colorScheme: 'viridis'
        }
      },
      {
        id: 'grayscale',
        title: 'Grayscale (Print)',
        background: 'white',
        props: {
          showLegend: true,
          colorScheme: 'gray'
        }
      }
    ]
  }
];
```

## Sizing

Imagine supports two units for sizing:

1.  **Pixels (`px`)**:
    ```typescript
    size: { unit: 'px', width: 800, height: 600 }
    ```
    Best for screen-based figures or web diagrams.

2.  **Millimeters (`mm`)**:
    ```typescript
    size: { unit: 'mm', width: 85, height: 60, dpi: 300 }
    ```
    Best for print publications (e.g., scientific papers). The `dpi` ensures high-resolution raster export (PNG), while SVG export remains vector-based.
    *   **Single column width**: Typically ~85-90mm.
    *   **Double column width**: Typically ~180mm.

## Variants

Variants allow you to reuse the same component with different configurations. Each variant has:
- `id`: Unique variant ID.
- `props`: Object passed to the component.
- `controls`: (Optional) UI controls for interactive editing in dev mode.
- `size`: (Optional) Override the figure's default size.
- `background`: 'white' or 'transparent'.

## Props and Controls

Props defined in `variants` are the initial values. You can add `controls` to make them editable in the UI:

```typescript
controls: [
  { kind: 'text', key: 'title', label: 'Chart Title' },
  { kind: 'boolean', key: 'showLegend', label: 'Show Legend' },
  { kind: 'number', key: 'yMax', label: 'Y-Axis Max', min: 0, max: 100 }
]
```
