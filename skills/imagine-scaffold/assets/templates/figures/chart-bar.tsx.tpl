import { Figure } from '@/framework/Figure';
import type { FigureComponentBaseProps } from '@/framework/types';
import { theme } from '@/framework/theme';
import { linearScale } from '@/framework/charts/scales';
import { AxisLeft } from '@/framework/charts/Axes';

const values = [
  { label: 'A', value: 12 },
  { label: 'B', value: 18 },
  { label: 'C', value: 9 },
  { label: 'D', value: 22 }
];

export default function BarChartFigure({
  width,
  height,
  background,
  title = 'Example: bar chart',
  xLabel = 'Group',
  yLabel = 'Value'
}: FigureComponentBaseProps & { title?: string; xLabel?: string; yLabel?: string }) {
  const margin = { left: 70, top: 40, right: 20, bottom: 60 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;

  const yMax = Math.max(...values.map((d) => d.value), 1);
  const yScale = linearScale([0, yMax], [plotH, 0]);

  const barGap = 14;
  const barW = (plotW - barGap * (values.length - 1)) / values.length;

  return (
    <Figure width={width} height={height} background={background} title="Bar chart">
      <text x={margin.left} y={22} fontSize={14} fill={theme.colors.text} fontWeight={700}>
        {title}
      </text>

      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <line x1={0} y1={plotH} x2={plotW} y2={plotH} stroke={theme.colors.axis} strokeWidth={theme.strokes.normal} />

        {values.map((d, i) => {
          const x = i * (barW + barGap);
          const y = yScale(d.value);
          const h = plotH - y;
          return (
            <g key={d.label} transform={`translate(${x}, 0)`}>
              <rect x={0} y={y} width={barW} height={h} rx={theme.radii.sm} fill={theme.colors.teal} />
              <text x={barW / 2} y={plotH + 18} fontSize={11} fill={theme.colors.text} textAnchor="middle">
                {d.label}
              </text>
            </g>
          );
        })}

        <text x={plotW / 2} y={plotH + 42} fontSize={12} fill={theme.colors.text} textAnchor="middle">
          {xLabel}
        </text>
      </g>

      <AxisLeft x={margin.left} y={margin.top} scale={yScale} label={yLabel} />
    </Figure>
  );
}
