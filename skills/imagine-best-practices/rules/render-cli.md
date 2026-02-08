# Render CLI cookbook

Render a project:

```bash
npm run render -- --project example
```

Render a specific figure/variant:

```bash
npm run render -- --project example --fig line-chart
npm run render -- --project example --fig hello-world --variant transparent
```

Choose formats:

```bash
npm run render -- --project example --formats png,svg
```

Dev-mode rendering (requires `npm run dev` already running):

```bash
npm run render:dev -- --project example
```

Ignore Studio-saved overrides:

```bash
npm run render -- --project example --no-props
```
