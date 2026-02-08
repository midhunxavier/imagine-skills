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
Imagine scaffold: new_project

Usage:
  node skills/imagine-scaffold/scripts/new_project.mjs --id <projectId> --title "<Title>"
    [--description "<Desc>"] [--with-hello] [--force]
`.trim();
  // eslint-disable-next-line no-console
  console.log(text);
}

function tsStringLiteral(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n')}'`;
}

async function readTemplate(relPath) {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const skillRoot = path.resolve(here, '..');
  const p = path.join(skillRoot, 'assets', 'templates', relPath);
  return fs.readFile(p, 'utf8');
}

function applyReplacements(input, replacements) {
  let out = input;
  for (const [key, value] of Object.entries(replacements)) {
    out = out.split(`{{${key}}}`).join(String(value));
  }
  return out;
}

function validateId(label, value) {
  if (!value || !String(value).trim()) throw new Error(`${label} is required`);
  const id = String(value).trim();
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    throw new Error(`${label} must match /^[a-zA-Z0-9_-]+$/ (got: ${id})`);
  }
  return id;
}

async function fileExists(p) {
  return fs
    .stat(p)
    .then((s) => s.isFile() || s.isDirectory())
    .catch(() => false);
}

function helloWorldManifestItem() {
  return [
    '  {',
    "    id: 'hello-world',",
    "    title: 'Hello world',",
    "    moduleKey: 'hello-world',",
    "    size: { unit: 'px', width: 900, height: 520 },",
    '    variants: [',
    '      {',
    "        id: 'default',",
    "        title: 'Default',",
    "        background: 'white',",
    '        props: {',
    "          heading: 'Imagine',",
    "          subtitle: 'React components → scientific figures (PNG + SVG)',",
    "          tipHeading: 'Tips',",
    "          tip1: 'Edit the figure component and watch this update live.',",
    "          tip2: 'Use the Controls panel to adjust text, then export via `npm run render`.'",
    '        },',
    '        controls: [',
    "          { kind: 'text', key: 'heading', label: 'Heading' },",
    "          { kind: 'text', key: 'subtitle', label: 'Subtitle' },",
    "          { kind: 'text', key: 'tipHeading', label: 'Tips heading' },",
    "          { kind: 'text', key: 'tip1', label: 'Tip #1' },",
    "          { kind: 'text', key: 'tip2', label: 'Tip #2' }",
    '        ]',
    '      },',
    '      {',
    "        id: 'transparent',",
    "        title: 'Transparent',",
    "        background: 'transparent',",
    '        props: {',
    "          heading: 'Imagine',",
    "          subtitle: 'Transparent background variant',",
    "          tipHeading: 'Notes',",
    "          tip1: 'Checkerboard mode helps preview transparency.',",
    "          tip2: 'PNG export uses omitBackground for transparency.'",
    '        }',
    '      }',
    '    ]',
    '  },'
  ].join('\n');
}

async function main() {
  if (hasFlag('--help') || hasFlag('-h')) {
    usage();
    return;
  }

  const projectId = validateId('--id', getFlag('--id'));
  const title = getFlag('--title');
  if (!title || !String(title).trim()) throw new Error('--title is required');
  const description = getFlag('--description');
  const withHello = hasFlag('--with-hello');
  const force = hasFlag('--force');

  const projectsDir = path.join(process.cwd(), 'projects');
  const projectDir = path.join(projectsDir, projectId);
  if ((await fileExists(projectDir)) && !force) {
    throw new Error(`Project already exists: ${projectDir} (use --force to overwrite project files)`);
  }

  await fs.mkdir(path.join(projectDir, 'figures'), { recursive: true });

  const projectTemplate = await readTemplate(path.join('project', 'project.ts.tpl'));
  const manifestTemplate = await readTemplate(path.join('project', 'manifest.ts.tpl'));
  const propsTemplate = await readTemplate(path.join('project', 'props.json.tpl'));

  const descriptionLine =
    description && String(description).trim() ? `  description: ${tsStringLiteral(description)},` : '';

  const projectTs = applyReplacements(projectTemplate, {
    PROJECT_ID: tsStringLiteral(projectId),
    PROJECT_TITLE: tsStringLiteral(String(title)),
    PROJECT_DESCRIPTION_LINE: descriptionLine
  });

  const figureItems = withHello ? `${helloWorldManifestItem()}\n` : '';
  const manifestTs = applyReplacements(manifestTemplate, {
    FIGURE_ITEMS: figureItems
  });

  await fs.writeFile(path.join(projectDir, 'project.ts'), projectTs.trimEnd() + '\n', 'utf8');
  await fs.writeFile(path.join(projectDir, 'manifest.ts'), manifestTs.trimEnd() + '\n', 'utf8');
  await fs.writeFile(path.join(projectDir, 'props.json'), propsTemplate.trimEnd() + '\n', 'utf8');

  if (withHello) {
    const helloTemplate = await readTemplate(path.join('figures', 'hello-world.tsx.tpl'));
    await fs.writeFile(path.join(projectDir, 'figures', 'hello-world.tsx'), helloTemplate.trimEnd() + '\n', 'utf8');
  }

  // eslint-disable-next-line no-console
  console.log(`Created project ${projectId} at ${projectDir}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err?.message ?? err);
  process.exitCode = 1;
});
