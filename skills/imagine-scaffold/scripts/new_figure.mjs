import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function hasFlag(name) {
  return process.argv.includes(name);
}

function getFlag(name) {
  const idx = process.argv.findIndex((a) => a === name || a.startsWith(`${name}=`));
  if (idx === -1) return undefined;
  const a = process.argv[idx];
  if (a.startsWith(`${name}=`)) return a.slice(name.length + 1);
  return process.argv[idx + 1];
}

function usage() {
  const text = `
Imagine scaffold: new_figure

Usage:
  node skills/imagine-scaffold/scripts/new_figure.mjs --project <projectId> --id <figureId> --kind <kind>
    [--title "<Title>"] [--size <sizeSpec>] [--background white|transparent]
    [--force] [--no-manifest-edit]

Kinds:
  chart-line | chart-scatter | chart-bar
  diagram-pipeline | diagram-architecture
  layout-multi-panel
  math-equation
  blank-svg

Size spec:
  px:<w>x<h>         (example: px:900x520)
  mm:<w>x<h>@<dpi>   (example: mm:85x60@600)
`.trim();
  // eslint-disable-next-line no-console
  console.log(text);
}

function tsStringLiteral(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n')}'`;
}

function validateId(label, value) {
  if (!value || !String(value).trim()) throw new Error(`${label} is required`);
  const id = String(value).trim();
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    throw new Error(`${label} must match /^[a-zA-Z0-9_-]+$/ (got: ${id})`);
  }
  return id;
}

function parseSizeSpec(spec) {
  if (!spec) return null;
  const s = String(spec).trim();
  if (s.startsWith('px:')) {
    const m = s.slice(3).match(/^(\d+)x(\d+)$/);
    if (!m) throw new Error(`Invalid --size px syntax: ${s} (expected px:<w>x<h>)`);
    const width = Number(m[1]);
    const height = Number(m[2]);
    if (width <= 0 || height <= 0) throw new Error(`Invalid --size: width/height must be positive`);
    return { unit: 'px', width, height };
  }
  if (s.startsWith('mm:')) {
    const m = s.slice(3).match(/^(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)@(\d+(?:\.\d+)?)$/);
    if (!m) throw new Error(`Invalid --size mm syntax: ${s} (expected mm:<w>x<h>@<dpi>)`);
    const width = Number(m[1]);
    const height = Number(m[2]);
    const dpi = Number(m[3]);
    if (width <= 0 || height <= 0 || dpi <= 0) throw new Error(`Invalid --size: mm and dpi must be positive`);
    return { unit: 'mm', width, height, dpi };
  }
  throw new Error(`Invalid --size: ${s} (expected px:<w>x<h> or mm:<w>x<h>@<dpi>)`);
}

function defaultSizeForKind(kind) {
  if (kind.startsWith('chart-')) return { unit: 'mm', width: 85, height: 60, dpi: 600 };
  if (kind === 'diagram-pipeline') return { unit: 'px', width: 1000, height: 380 };
  if (kind === 'diagram-architecture') return { unit: 'px', width: 1100, height: 700 };
  if (kind === 'layout-multi-panel') return { unit: 'px', width: 1100, height: 650 };
  if (kind === 'math-equation') return { unit: 'px', width: 900, height: 260 };
  if (kind === 'blank-svg') return { unit: 'px', width: 900, height: 520 };
  throw new Error(`Unknown kind: ${kind}`);
}

function defaultTitleForKind(kind) {
  switch (kind) {
    case 'chart-line':
      return 'Line chart';
    case 'chart-scatter':
      return 'Scatter plot';
    case 'chart-bar':
      return 'Bar chart';
    case 'diagram-pipeline':
      return 'Pipeline diagram';
    case 'diagram-architecture':
      return 'Architecture diagram';
    case 'layout-multi-panel':
      return 'Multi-panel layout';
    case 'math-equation':
      return 'Equation';
    case 'blank-svg':
      return 'Blank figure';
    default:
      return kind;
  }
}

function templateForKind(kind) {
  switch (kind) {
    case 'chart-line':
      return 'chart-line.tsx.tpl';
    case 'chart-scatter':
      return 'chart-scatter.tsx.tpl';
    case 'chart-bar':
      return 'chart-bar.tsx.tpl';
    case 'diagram-pipeline':
      return 'diagram-pipeline.tsx.tpl';
    case 'diagram-architecture':
      return 'diagram-architecture.tsx.tpl';
    case 'layout-multi-panel':
      return 'layout-multi-panel.tsx.tpl';
    case 'math-equation':
      return 'math-equation.tsx.tpl';
    case 'blank-svg':
      return 'blank-svg.tsx.tpl';
    default:
      return null;
  }
}

async function readTemplate(relPath) {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const skillRoot = path.resolve(here, '..');
  const p = path.join(skillRoot, 'assets', 'templates', relPath);
  return fs.readFile(p, 'utf8');
}

async function fileExists(p) {
  return fs
    .stat(p)
    .then((s) => s.isFile() || s.isDirectory())
    .catch(() => false);
}

function sizeLiteral(size) {
  if (size.unit === 'px') return `{ unit: 'px', width: ${size.width}, height: ${size.height} }`;
  return `{ unit: 'mm', width: ${size.width}, height: ${size.height}, dpi: ${size.dpi} }`;
}

function variantPropsAndControls(kind, title) {
  switch (kind) {
    case 'chart-line':
      return {
        props: [
          `          title: ${tsStringLiteral(title)}`,
          `          xLabel: 'Time (a.u.)'`,
          `          yLabel: 'Response'`,
          `          seriesALabel: 'Condition A'`,
          `          seriesBLabel: 'Condition B'`
        ],
        controls: [
          `{ kind: 'text', key: 'title', label: 'Title' }`,
          `{ kind: 'text', key: 'xLabel', label: 'X label' }`,
          `{ kind: 'text', key: 'yLabel', label: 'Y label' }`,
          `{ kind: 'text', key: 'seriesALabel', label: 'Series A label' }`,
          `{ kind: 'text', key: 'seriesBLabel', label: 'Series B label' }`
        ]
      };
    case 'chart-scatter':
      return {
        props: [`          title: ${tsStringLiteral(title)}`, `          xLabel: 'X'`, `          yLabel: 'Y'`],
        controls: [
          `{ kind: 'text', key: 'title', label: 'Title' }`,
          `{ kind: 'text', key: 'xLabel', label: 'X label' }`,
          `{ kind: 'text', key: 'yLabel', label: 'Y label' }`
        ]
      };
    case 'chart-bar':
      return {
        props: [`          title: ${tsStringLiteral(title)}`, `          xLabel: 'Group'`, `          yLabel: 'Value'`],
        controls: [
          `{ kind: 'text', key: 'title', label: 'Title' }`,
          `{ kind: 'text', key: 'xLabel', label: 'X label' }`,
          `{ kind: 'text', key: 'yLabel', label: 'Y label' }`
        ]
      };
    case 'diagram-pipeline':
      return {
        props: [
          `          title: ${tsStringLiteral(title)}`,
          `          subtitle: 'Pure-SVG boxes/arrows + theme tokens'`,
          `          step1: 'Ingest'`,
          `          step2: 'Process'`,
          `          step3: 'Publish'`,
          `          callout: 'Edit labels in Controls'`
        ],
        controls: [
          `{ kind: 'text', key: 'title', label: 'Title' }`,
          `{ kind: 'text', key: 'subtitle', label: 'Subtitle' }`,
          `{ kind: 'text', key: 'step1', label: 'Step 1' }`,
          `{ kind: 'text', key: 'step2', label: 'Step 2' }`,
          `{ kind: 'text', key: 'step3', label: 'Step 3' }`,
          `{ kind: 'text', key: 'callout', label: 'Callout' }`
        ]
      };
    case 'diagram-architecture':
      return {
        props: [
          `          title: ${tsStringLiteral(title)}`,
          `          subtitle: 'Boxes + arrows (pure SVG)'`,
          `          userInput: 'User Input'`,
          `          orchestrator: 'Orchestrator'`,
          `          llm: 'LLM / Model'`,
          `          memory: 'Memory / Context'`,
          `          tools1: 'Tool A'`,
          `          tools2: 'Tool B'`,
          `          tools3: 'Tool C'`,
          `          output: 'Output'`,
          `          notes: 'Edit labels in Controls'`
        ],
        controls: [
          `{ kind: 'text', key: 'title', label: 'Title' }`,
          `{ kind: 'text', key: 'subtitle', label: 'Subtitle' }`,
          `{ kind: 'text', key: 'userInput', label: 'User Input' }`,
          `{ kind: 'text', key: 'orchestrator', label: 'Orchestrator' }`,
          `{ kind: 'text', key: 'llm', label: 'LLM' }`,
          `{ kind: 'text', key: 'memory', label: 'Memory' }`,
          `{ kind: 'text', key: 'tools1', label: 'Tool 1' }`,
          `{ kind: 'text', key: 'tools2', label: 'Tool 2' }`,
          `{ kind: 'text', key: 'tools3', label: 'Tool 3' }`,
          `{ kind: 'text', key: 'output', label: 'Output' }`,
          `{ kind: 'text', key: 'notes', label: 'Notes' }`
        ]
      };
    case 'layout-multi-panel':
      return {
        props: [
          `          title: ${tsStringLiteral(title)}`,
          `          subtitle: 'Use PanelGrid to compose sub-panels (a, b, c…)'`,
          `          panelA: 'Panel: raw'`,
          `          panelB: 'Panel: processed'`,
          `          panelC: 'Panel: ablation'`,
          `          panelD: 'Panel: summary'`
        ],
        controls: [
          `{ kind: 'text', key: 'title', label: 'Title' }`,
          `{ kind: 'text', key: 'subtitle', label: 'Subtitle' }`,
          `{ kind: 'text', key: 'panelA', label: 'Panel A' }`,
          `{ kind: 'text', key: 'panelB', label: 'Panel B' }`,
          `{ kind: 'text', key: 'panelC', label: 'Panel C' }`,
          `{ kind: 'text', key: 'panelD', label: 'Panel D' }`
        ]
      };
    case 'math-equation':
      return {
        props: [
          `          title: ${tsStringLiteral(title)}`,
          `          subtitle: 'Uses MathJax tex2svg (pure SVG; no foreignObject)'`,
          `          tex: ${tsStringLiteral('E=mc^2')}`
        ],
        controls: [
          `{ kind: 'text', key: 'title', label: 'Title' }`,
          `{ kind: 'text', key: 'subtitle', label: 'Subtitle' }`,
          `{ kind: 'text', key: 'tex', label: 'LaTeX', multiline: true }`
        ]
      };
    case 'blank-svg':
      return {
        props: [`          title: ${tsStringLiteral(title)}`, `          subtitle: 'Start drawing SVG here'`],
        controls: [
          `{ kind: 'text', key: 'title', label: 'Title' }`,
          `{ kind: 'text', key: 'subtitle', label: 'Subtitle' }`
        ]
      };
    default:
      return { props: [], controls: [] };
  }
}

function buildManifestItem({ figureId, title, size, kind, background }) {
  const { props, controls } = variantPropsAndControls(kind, title);
  const controlsBlock = controls.length
    ? ['        controls: [', ...controls.map((c) => `          ${c},`), '        ],'].join('\n')
    : '';

  const propsBlock = props.length ? ['        props: {', ...props.map((p) => `${p},`), '        },'].join('\n') : '';

  const lines = [
    '  {',
    `    id: ${tsStringLiteral(figureId)},`,
    `    title: ${tsStringLiteral(title)},`,
    `    moduleKey: ${tsStringLiteral(figureId)},`,
    `    size: ${sizeLiteral(size)},`,
    '    variants: [',
    '      {',
    "        id: 'default',",
    "        title: 'Default',",
    `        background: ${tsStringLiteral(background)},`,
    propsBlock,
    controlsBlock,
    '      }',
    '    ]',
    '  },'
  ].filter(Boolean);

  return lines.join('\n');
}

async function tryInsertManifestItem({ manifestPath, snippet, figureId, noManifestEdit }) {
  if (noManifestEdit) {
    // eslint-disable-next-line no-console
    console.log(snippet);
    return { ok: true, edited: false };
  }

  const raw = await fs.readFile(manifestPath, 'utf8').catch(() => null);
  if (raw == null) {
    // eslint-disable-next-line no-console
    console.log(snippet);
    throw new Error(`manifest.ts not found: ${manifestPath}`);
  }

  if (raw.includes(`id: '${figureId}'`) || raw.includes(`id: "${figureId}"`)) {
    // eslint-disable-next-line no-console
    console.log(snippet);
    throw new Error(`manifest.ts already contains a figure with id "${figureId}"`);
  }

  const lines = raw.split(/\r?\n/);
  const endIdx = lines.findIndex((l) => l.includes('// IMAGINE-SCAFFOLD:FIGURES-END'));
  const startIdx = lines.findIndex((l) => l.includes('// IMAGINE-SCAFFOLD:FIGURES-START'));
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    // eslint-disable-next-line no-console
    console.log(snippet);
    throw new Error(
      `manifest.ts missing insertion markers. Add the markers or re-create the project with imagine-scaffold new_project.`
    );
  }

  const snippetLines = snippet.trimEnd().split('\n');
  lines.splice(endIdx, 0, ...snippetLines);
  await fs.writeFile(manifestPath, lines.join('\n').trimEnd() + '\n', 'utf8');
  return { ok: true, edited: true };
}

async function main() {
  if (hasFlag('--help') || hasFlag('-h')) {
    usage();
    return;
  }

  const projectId = validateId('--project', getFlag('--project'));
  const figureId = validateId('--id', getFlag('--id'));
  const kind = getFlag('--kind');
  if (!kind || !String(kind).trim()) throw new Error('--kind is required');
  const templateName = templateForKind(String(kind).trim());
  if (!templateName) throw new Error(`Invalid --kind: ${kind}`);

  const title = String(getFlag('--title') ?? defaultTitleForKind(kind)).trim();
  const size = parseSizeSpec(getFlag('--size')) ?? defaultSizeForKind(kind);
  const background = (getFlag('--background') ?? 'white').trim();
  if (background !== 'white' && background !== 'transparent') {
    throw new Error(`Invalid --background: ${background} (expected white|transparent)`);
  }
  const force = hasFlag('--force');
  const noManifestEdit = hasFlag('--no-manifest-edit');

  const projectDir = path.join(process.cwd(), 'projects', projectId);
  if (!(await fileExists(projectDir))) {
    throw new Error(`Project not found: ${projectDir}`);
  }

  await fs.mkdir(path.join(projectDir, 'figures'), { recursive: true });
  const outFigurePath = path.join(projectDir, 'figures', `${figureId}.tsx`);
  if ((await fileExists(outFigurePath)) && !force) {
    throw new Error(`Figure already exists: ${outFigurePath} (use --force to overwrite)`);
  }

  const tpl = await readTemplate(path.join('figures', templateName));
  await fs.writeFile(outFigurePath, tpl.trimEnd() + '\n', 'utf8');

  const manifestPath = path.join(projectDir, 'manifest.ts');
  const snippet = buildManifestItem({ figureId, title, size, kind, background });

  try {
    const result = await tryInsertManifestItem({ manifestPath, snippet, figureId, noManifestEdit });
    // eslint-disable-next-line no-console
    console.log(
      result.edited
        ? `Added ${figureId} (${kind}) and updated ${manifestPath}`
        : `Added ${figureId} (${kind}). Paste the manifest snippet above into ${manifestPath}.`
    );
  } catch (err) {
    if (noManifestEdit) return;
    // eslint-disable-next-line no-console
    console.error(err?.message ?? err);
    // eslint-disable-next-line no-console
    console.error(`\nPaste the manifest snippet above into ${manifestPath} between the scaffold markers.`);
    process.exitCode = 1;
    return;
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err?.message ?? err);
  process.exitCode = 1;
});
