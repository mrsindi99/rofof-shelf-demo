# Developer integration handoff

## Recommended handoff

Start by running this repository as an isolated Vite route. It is a complete, responsive hero experience with no backend, authentication, checkout, or order flow. Once approved, move the hero into the Rofof frontend as one unit rather than copying individual product images.

```bash
npm install
npm run dev
npm run build
```

`npm run build` produces a static `dist/` folder that can be hosted by any static host. Vercel configuration is optional for integration into the main site.

## Files that belong together

| Keep | Purpose |
| --- | --- |
| `index.html` hero markup and inline SVG icon sprite | Required IDs, dialogs, and accessible controls |
| `src/main.js` | Product data, QR generation, selection, URL state, RTL/English copy |
| `src/hero.css` | The mobile-first 9:16 composition and glass panel placement |
| `public/products/`, `public/shelf-studio.webp` | Product and shelf imagery |
| `public/fonts/`, `public/rofof-logo.svg` | Local typography and brand mark |

Do not remove these DOM hooks without updating `src/main.js`: `#scene`, `#stage`, `#shelf-products`, `#qr-displays`, `#product-panel`, `#close-product`, `#show-qr`, `#qr-dialog`, `#language`, `#previous-products`, and `#next-products`.

## React or Next.js

Make this a client-side component because product selection, dialogs, QR rendering, and browser-history state run in the browser. Keep the HTML structure and IDs above, import `hero.css`, and either keep the current vanilla controller as a client module or port its state into React without changing the responsive layout rules.

Assets currently use root-relative paths such as `/products/flower.webp`. In a framework with a base path or asset pipeline, update every asset reference consistently. The canonical QR/deep-link host is set in `src/main.js`; update it if this experience moves from the demo domain to the final Rofof domain.

## Acceptance checks

- On a 9:16 phone viewport, the header, Arabic hero text, three products, QR stands, controls, and disclosure all fit one hero canvas without page scrolling.
- Selecting a product lifts and enlarges it; its glass detail card stays beside it and never intersects it.
- Closing clears all product selection styling and does not leave a purple focus border after touch interaction.
- The same behavior works after refresh, product deep links, language switching, page switching, and reduced-motion preference.
- QR codes contain the canonical product URL and remain scannable when expanded.

## Content and production notes

Product imagery is visual concept work, not final SKU photography. Product claims use the supplied catalog references and should be replaced or approved by Rofof before production. The demo intentionally has no commerce, analytics, tracking, login, or payment integration.
