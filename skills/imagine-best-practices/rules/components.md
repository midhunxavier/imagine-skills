# Writing Figure Components

Figures in Imagine are standard React components. They receive the `props` defined in your manifest variant.

## Basic Component

```tsx
import React from 'react';

// Define the expected props interface
interface MyFigureProps {
  title: string;
  data: number[];
  showGrid?: boolean;
}

const MyFigure: React.FC<MyFigureProps> = ({ title, data, showGrid = true }) => {
  // Use fixed dimensions if possible, or 100% width/height to fill container
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <h1>{title}</h1>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {/* Render your SVG content here */}
        {data.map((val, i) => (
           <rect key={i} x={i * 10} y={100 - val} width={8} height={val} />
        ))}
      </svg>
    </div>
  );
};

export default MyFigure;
```

## SVG Compatibility

For best results (especially for print), prioritize **SVG** output.
- Use `<svg>`, `<path>`, `<rect>`, `<text>`, etc., instead of HTML `<div>` or `<span>` where possible.
- If you must use HTML text, be aware that it might not scale perfectly in all vector viewers.
- Avoid `foreignObject` if you want pure SVG compatibility with strict vector editors (like Illustrator or Inkscape). Imagine *can* render HTML to image, but pure SVG is more robust for scientific workflows.

## Styling

- **CSS Modules**: Supported and recommended for scoping.
- **Inline Styles**: Useful for dynamic properties driven by props.
- **Tailwind**: Can be configured, but standard CSS or styled-components are often simpler for standalone figures.

## Using D3

D3 is excellent for calculating scales, shapes, and axes. Use it to *compute* values, then let React *render* them.

```tsx
import * as d3 from 'd3';

// ... inside component
const xScale = d3.scaleLinear().domain([0, 10]).range([0, width]);
const lineGenerator = d3.line<DataPoint>().x(d => xScale(d.x)).y(d => yScale(d.y));

return (
  <svg>
    <path d={lineGenerator(data)} stroke="black" fill="none" />
  </svg>
);
```
