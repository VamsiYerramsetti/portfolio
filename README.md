# Vamsi — Portfolio

Personal portfolio built with [Next.js](https://nextjs.org/docs) (App Router + static export), designed to deploy cleanly to [GitHub Pages](https://docs.github.com/pages) as a **project site** under `/portfolio/`.

## What this repo includes
- Static-export friendly Next.js setup (`output: "export"`) for GitHub Pages.
- Projects index + case-study pages (App Router + `generateStaticParams`).
- LinkedIn carousel that can render LinkedIn embeds, PDFs, and images.
- Skills grid with locally generated SVG icons (no hotlinking).
- Official-doc linkification (terms → official documentation only).
- Letters of Recommendation page powered by a small generator pipeline.

## Tech stack
- Next.js + React + TypeScript
- Tailwind CSS
- Framer Motion (small reveal/transition effects)
- `simple-icons` (SVG icon generation)
- `pdf-parse` (LOR PDF text extraction for blurbs)

## Quick start (local)

### Without Docker
```bash
npm install
npm run dev
```
Dev server: `http://localhost:3000`

### With Docker (recommended)
Dev mode (hot reload):
```bash
docker compose up --build
```
Dev server: `http://localhost:3002`

Export preview (matches GitHub Pages basePath):
```bash
docker compose --profile export up --build
```
Export preview: `http://localhost:3001/portfolio`

## How the site works (high-level)

### Static export + basePath
This repo is configured for GitHub Pages as a project site, so the app expects a base path:
- `NEXT_PUBLIC_BASE_PATH=/portfolio`

That base path is applied during export so assets and routes work under `/portfolio/`.

### Content is data-driven
Most visible content is defined in `src/content/` and rendered by App Router pages in `src/app/`.

### Generators keep public assets in sync
There are two small generators used during development/build:
- Icons generator: creates `public/icons/*.svg`
- LOR generator: copies PDFs into `public/lors/` and creates a typed index used by `/lors`

## Project structure
- `src/app/` — App Router pages (`/`, `/projects`, `/projects/[slug]`, `/lors`)
- `src/components/` — UI components
- `src/content/` — site data + mappings (projects, skills, doc links, generated LOR index)
- `scripts/` — generators and local export preview helper
- `public/` — static assets (icons, project media, LOR PDFs)

## Editing content (cookbook)

### Update site info, links, and skills
Edit `src/content/site.ts`.

If you add a new skill icon:
1. Make sure its icon exists (see “Icons” below)
2. Run `npm run icons`

### Add or update projects
Edit `src/content/projects.ts`.

Notes:
- `slug` controls the route at `/projects/[slug]`.
- `tags` are auto-linked to official documentation when the term exists in the docs map.
- `media` should point to files under `public/` (e.g., `public/project-media/foo.png` → `/project-media/foo.png`).

### Official documentation linkification
Edit `src/content/docLinks.ts`.

How it’s used:
- Tags/skills look up a URL and become clickable when a mapping exists.
- Curated paragraphs use a small text linkifier to auto-link known terms.

Guideline: add **official docs** (vendor docs / standards bodies) — not Wikipedia.

## Icons (skills + socials)

Icons are generated into `public/icons/`:
```bash
npm run icons
```

How it works:
- Pulls brand icons from [`simple-icons`](https://github.com/simple-icons/simple-icons)
- Falls back to tiny local placeholder SVGs for concepts that don’t have official brand marks

If an icon is missing:
- Prefer adding a `simple-icons` slug to `scripts/generate-icons.mjs`
- Otherwise add a minimal placeholder SVG in the same script

## Letters of Recommendation (LORs)

### Source of truth
- Input PDFs live in: `LORS for website/`
- Generated public copies live in: `public/lors/`
- Generated index lives in: `src/content/lors.generated.ts`

The generator runs automatically on:
- `npm run dev` (via `predev`)
- `npm run build` (via `prebuild`)

You can also run it manually:
```bash
node scripts/generate-lors.mjs
```

### Customizing titles/order/people
Edit `src/content/lors.meta.json`.

Each entry is keyed by a **slug** derived from the PDF filename.

Common overrides:
- `order`: number (lower shows first)
- `title`: string
- `blurb`: string
- `person`: a single recommender block
- `people`: multiple recommender blocks (for co-authored letters)

### Troubleshooting LOR updates
- If Docker dev doesn’t pick up PDF changes reliably: `docker compose restart web`
- If an override looks ignored: confirm the slug matches the filename-derived slug

## LinkedIn carousel

The carousel accepts an array of `activityIds` where each entry can be:
- A LinkedIn post URL
- A LinkedIn embed URL
- A raw LinkedIn activity ID
- A local PDF path (e.g., `/project-media/foo.pdf`)
- A local image path (or a stacked pair split by `||`)

Embeds work best if the post is public + embeddable.

## Deployment (GitHub Pages)

1. In GitHub: Settings → Pages → Source → GitHub Actions
2. Push to `main`
3. The workflow exports and deploys `out/`

### basePath notes
- Project site (this repo’s default): `NEXT_PUBLIC_BASE_PATH=/portfolio`
- Custom domain (root site): remove basePath and redeploy

### Local export preview
Two good options:
- Docker export profile: `docker compose --profile export up --build`
- Local: `npm run build && npm run start`

## Common issues

### “Works locally but GitHub Pages is blank”
This is almost always a basePath mismatch. Ensure the deploy build sets:
- `NEXT_PUBLIC_BASE_PATH=/portfolio`

### Icons not showing
Run:
- `npm run icons`

### LinkedIn embed shows an error
The post might not be public/embeddable. Try a different post URL or a screenshot/PDF instead.
