import { Figure } from '@/framework/Figure';
import type { FigureComponentBaseProps } from '@/framework/types';
import { theme } from '@/framework/theme';

export default function BlankFigure({
  width,
  height,
  background,
  title = 'Blank figure',
  subtitle = 'Start drawing SVG here'
}: FigureComponentBaseProps & { title?: string; subtitle?: string }) {
  return (
    <Figure width={width} height={height} background={background} title="Blank figure">
      <rect x={40} y={60} width={width - 80} height={height - 100} rx={theme.radii.md} fill={theme.colors.panel} stroke={theme.colors.grid} />
      <text x={60} y={96} fontSize={18} fontWeight={800} fill={theme.colors.text}>
        {title}
      </text>
      <text x={60} y={124} fontSize={13} fill={theme.colors.subtleText}>
        {subtitle}
      </text>
    </Figure>
  );
}
