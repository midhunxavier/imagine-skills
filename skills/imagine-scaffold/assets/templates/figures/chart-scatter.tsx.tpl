import { Figure } from '@/framework/Figure';
import type { FigureComponentBaseProps } from '@/framework/types';
import { theme } from '@/framework/theme';
import type { Point } from '@/framework/charts/scales';
import { extentX, extentY, linearScale } from '@/framework/charts/scales';
import { AxisBottom, AxisLeft } from '@/framework/charts/Axes';
import { GridLines } from '@/framework/charts/GridLines';
import { ScatterSeries } from '@/framework/charts/Series';

const data: Point[] = [
  { x: 0.4, y: 0.6 },
  { x: 0.8, y: 0.9 },
  { x: 1.2, y: 1.1 },
  { x: 1.6, y: 1.45 },
  { x: 2.0, y: 1.55 },
  { x: 2.4, y: 1.9 }
];

export default function ScatterPlotFigure({
  width,
  height,
  background,
  title = 'Example: scatter plot',
  xLabel = 'X',
  yLabel = 'Y'
}: FigureComponentBaseProps & { title?: string; xLabel?: string; yLabel?: string }) {
  const margin = { left: 70, top: 40, right: 20, bottom: 60 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const xScale = linearScale(extentX(data), [0, plotW]);
  const yScale = linearScale(extentY(data), [plotH, 0]);

  return (
    <Figure width={width} height={height} background={background} title="Scatter plot">
      <text x={margin.left} y={22} fontSize={14} fill={theme.colors.text} fontWeight={700}>
        {title}
      </text>

      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <rect x={0} y={0} width={plotW} height={plotH} fill="transparent" />
        <GridLines x={0} y={0} width={plotW} height={plotH} xScale={xScale} yScale={yScale} />
        <ScatterSeries xScale={xScale} yScale={yScale} data={data} fill={theme.colors.orange} r={3.5} />
      </g>

      <AxisLeft x={margin.left} y={margin.top} scale={yScale} label={yLabel} />
      <AxisBottom x={margin.left} y={height - margin.bottom} scale={xScale} label={xLabel} />
    </Figure>
  );
}
