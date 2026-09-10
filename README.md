# Rofof interactive shelf

An Arabic-first, responsive hero demonstration for Rofof. Built with vanilla JavaScript, CSS, Vite, and node-qrcode.

Live demo: https://rofof-shelf-demo.vercel.app/

Open with a product selected: https://rofof-shelf-demo.vercel.app/?product=flower

## Run

```bash
npm install
npm run dev
```

`npm run build` creates the static `dist/` site.

## Integrate into the Rofof site

This is deliberately framework-neutral, so the developer can either use it as a self-contained Vite route or move it into an existing React/Next.js/Laravel frontend. See [the integration handoff](docs/INTEGRATION.md) for the exact files, DOM hooks, assets, and behavior that must stay together. For changing the shelf assortment, follow [the product replacement guide](docs/PRODUCTS.md).

## Interaction

- The entire mobile experience fits one 9:16 hero canvas, including header, brand copy, CTA, three products, shelf controls, and demo disclosure. Desktop uses the same integrated composition.
- Click a product or the small angled QR display stand beside it to lift, tilt, and enlarge the product and show its information panel.
- Select another product to switch; click the same product, the close control, outside the shelf, or Escape to close. Touch interactions clear selection without leaving a focus border; keyboard navigation retains a soft focus cue.
- Arrow keys move between product buttons. Enter/Space selects. Reduced-motion preferences are respected.
- Two three-product arrangements keep the shelf uncluttered; arrow controls reveal the remaining catalog pieces. On phones a selected product lifts to the left of its detail card, without scrolling. The headline remains visible; description and CTA temporarily give their space to details.
- QR codes encode the canonical public product URL (`?product=flower`, etc.), even in local development. Tapping the card opens details; the QR control inside details opens a larger, scannable code. Product links can be copied.
- Arabic and English can be switched without losing the selected product. Browser back/forward restores product and language state.
- Rofof registration/login/website links open the official site. This demonstration accepts no orders or payments.

## Sources and interpretation

- Main Arabic positioning, logo paths, brand purple (#635cc7), IBM Plex Sans Arabic, and journey content: https://rofof.sa/ (checked September 10, 2026).
- Product concepts and material/preparation specifications: supplied Thrr catalog “مركز الوطني للنخيل والتمور.pdf”, pages 8, 13, 22, 26, 33. Page 2 describes local manufacturing in Saudi Arabia. The original PDF is not deployed.
- Product photos are generated visual interpretations based on the approved mockup and catalog references, not final SKU photography. No prices or shipping-time promises are invented. 15 days is catalog preparation time, not shipping time.
- Animation uses CSS perspective transforms on photographic images; these are not rotatable 3D models.

## Images

Built-in image generation created five separate product images: a palm-and-leather tote, a woven pouch, a flower carrier, a date presentation box, and woven slippers. The prompt for each specified a single photorealistic product matching the approved reference, complete object, detailed palm fibers/leather, soft studio lighting, no shelf/labels/QR/interface/text. A second image edit replaced the generated background with pure white while preserving the product. WebP encoding is performed by `scripts/optimize-assets.mjs`; final assets are in `public/products/`.

All source images were inspected. The site itself generates functional QR codes; no image-generated QR graphics are used. Brand fonts and logo are hosted locally. Generated images and intermediate PDF pages stay outside the deployment allowlist.

### Physical shelf revision

`public/shelf-studio.webp` is a new built-in image-generation asset, encoded at 1600px. The final prompt requested a photorealistic honey-oak shelf with visible grain and three ivory travertine plinths (low rectangular sides, raised cylinder in the center), viewed straight-on from slightly above on a pure white studio background. It explicitly excluded products, text, QR codes and props so real interactive product elements could be layered over it. The shelf and photos use multiply compositing; QR stands occupy a separate non-blended layer to retain opaque paper surfaces.

The responsive composition is implemented in `src/hero.css`; `src/styles.css` is retained as the previous iteration and is no longer imported. The current verification runner is `scripts/verify-hero.mjs`. It checks Arabic and English, mobile 9:16 viewports, desktop, product lift/enlargement, QR interaction, collection switching, deep links, selection reset/touch-focus cleanup, and reduced motion. It uses the bundled local Playwright package and installed Chrome; scripts and evidence are excluded from deployment.

## Publication

Deploy as its own Vercel project, `rofof-shelf-demo`. Never attach this demo to Rofof's actual domain. `vercel.json` restricts scripts/network assets to this origin, disables embedding, and marks the demo noindex. `.vercelignore` excludes PDF intermediates, scripts, test evidence, and local metadata. Only the static built site is served.
