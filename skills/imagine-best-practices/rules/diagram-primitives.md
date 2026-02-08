# Diagram primitives

Imagine’s diagram primitives are designed to keep diagrams consistent and SVG-first:

- `Box`: labeled rectangle with theme defaults
- `Arrow`: line with a marker arrowhead
- `Label`: positioned SVG text
- `Callout`: highlighted note box

## Usage patterns

- Use `Box` for nodes and keep widths/heights consistent across a diagram.
- Use `Arrow` for directed edges; keep stroke widths consistent.
- Use `Label` for subtitles and secondary text (use a subtle color).
- Use `Callout` sparingly for a single key takeaway.

## IDs and SVG markers

`Arrow` defines an SVG marker id (arrowhead). Keep each arrow in its own component or ensure ids won’t collide (Imagine uses `useId()` in the primitive).
