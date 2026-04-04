# Drawers Website

A lightweight landing page build inspired by the Drawers Figma design system.

## Files

- `index.html` contains the page structure.
- `styles.css` holds the visual system and responsive layout.
- `script.js` renders the project cards and wires the CTA links.
- `site-assets/` contains optimized web-ready image assets.
- `assets/` contains the larger raw Figma downloads.

## Preview

From `/Users/gonzalominuto/Documents/IDEP/DrawersWebsite`, run:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Wiring Real Links

Update the `siteLinks` object at the top of `script.js`:

```js
const siteLinks = {
  download: "https://your-download-url",
  about: "https://your-about-page",
};
```

## Ready For Scroll Animation

The page already includes animation-friendly hooks:

- Hero objects use `.motion-layer` plus `data-depth`.
- Content blocks use `.reveal-block` and `data-reveal`.

That will make the next scroll-reactive animation pass much cleaner.
