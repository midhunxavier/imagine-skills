# Figure components (SVG-first)

For robust scientific workflows, implement figures as **pure SVG**.

## Requirements for clean export

- The figure component should render an `<svg>` at the root (or use Imagine’s `<Figure>` wrapper, which renders an `<svg>` root).
- Avoid `foreignObject` if you want maximum compatibility with Illustrator/Inkscape and journal pipelines.
- Keep rendering deterministic: no `Math.random()` without a fixed seed; avoid time-based animation for exports.

## Recommended component shape

Figure components receive base props:
- `width`, `height` (resolved pixels)
- `background` (`white` or `transparent`)

Pattern:

```tsx
import { Figure } from '@/framework/Figure';
import type { FigureComponentBaseProps } from '@/framework/types';
import { theme } from '@/framework/theme';

export default function MyFigure({
  width,
  height,
  background,
  title = 'My figure'
}: FigureComponentBaseProps & { title?: string }) {
  return (
    <Figure width={width} height={height} background={background} title="My figure">
      <text x={40} y={60} fontSize={18} fontWeight={800} fill={theme.colors.text}>
        {title}
      </text>
    </Figure>
  );
}
```

## Text, fonts, and layout

- Use a consistent font family (Imagine’s theme uses system sans-serif by default).
- Ensure labels are legible at the final printed size; avoid tiny fonts that only look good in Studio.
- Prefer simple layout math (margins, grid spacing) over CSS-based layout for SVG.
