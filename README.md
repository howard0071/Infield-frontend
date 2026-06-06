# Notes empty-state style backup

This folder is a self-contained backup of the notes empty-state page look and feel.
It is designed to be copied into another project and run from its own folder.

## Folder contents

- `index.html` - entry page
- `example.tsx` - self-contained React component
- `vite.config.ts` - local Vite config
- `package.json` - minimal dependencies and scripts

## Run locally (important)

Open this page with a local dev server, not by double-clicking `index.html`.
`index.html` is ESM and must be loaded from a dev server so browser modules work.

From the `example-backup` folder:

```bash
cd C:\infield\example-backup
bun install
bun run dev -- --open
```

If using npm instead:

```bash
cd C:\infield\example-backup
npm install
npm run dev
```

The backup should open in your browser at `http://localhost:4174` (or the printed
Vite local URL in your terminal). You can also use `bun run build` and `bun run
preview` once installed.

If you move this folder into another project:

- run `bun install` (or `npm install`) inside that new folder
- run the same `dev` command there
"# Infield-frontend" 
