# Drawers website

Static marketing site for [Drawers](https://drawers.computer). Built with Next.js (App Router, static export), deployed on Cloudflare Pages.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Outputs to `out/`. The `out/` directory is committed to the repo so Cloudflare Pages serves static files without running its own build.

## Deploy

Pushes to `main` trigger `.github/workflows/build.yml`, which rebuilds `out/` and commits it back. Cloudflare Pages serves whatever is in `out/` (configured via `wrangler.jsonc`).

## Structure

```
app/                Next.js App Router pages + globals.css
components/         Section components + EmojiPhysics + EmailForm
public/             Static images (wordmarks, UI preview, favicon)
out/                Built static site (committed)
```

## Notes

- Email capture posts to a Google Apps Script via a hidden iframe (the endpoint doesn't return CORS headers, so `fetch` doesn't work). A formsubmit.co fallback handles the case where the iframe never loads.
- Download CTA links to `https://download.drawers.computer/Drawers.dmg` (defined once in `lib/constants.ts`).
- Emoji physics use unicode glyphs rendered with the OS color emoji font; layout uses `requestAnimationFrame` with direct DOM transform writes (no per-frame React state).
