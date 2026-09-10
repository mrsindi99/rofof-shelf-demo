# Editing or replacing products on the shelf

Each product is controlled by a single identifier. The identifier links its photo, bilingual copy, QR/deep link, selection behavior, and shelf position.

## Quick replacement: keep the same product ID

Use this when the product stays conceptually the same but its photography or copy changes.

1. Replace `public/products/<id>.webp` with the new photo, keeping the existing filename. For example, replace `public/products/dates.webp` to update the date box.
2. In `src/main.js`, edit the matching item in the `products` array near the top. Update both `ar` and `en` values: `name`, `short`, `description`, and `material`.
3. Run `npm run dev`, then test the product button, its QR stand, the glass detail card, Arabic/English switching, and a page refresh.

The current IDs are `tote`, `pouch`, `flower`, `dates`, and `slippers`.

## Add a completely new product

1. Choose a short, stable lowercase ID, for example `incense-box`. Avoid spaces and changing the ID later: it becomes part of the shareable `?product=` URL and QR code.
2. Add an image at `public/products/incense-box.webp`.
3. Add a bilingual object to the `products` array in `src/main.js`:

```js
{
  id: 'incense-box',
  page: 0,
  ar: {
    name: 'اسم المنتج بالعربية',
    short: 'اسم قصير',
    description: 'وصف قصير ودقيق للمنتج.',
    material: 'الخامة'
  },
  en: {
    name: 'English product name',
    short: 'Short name',
    description: 'A short, accurate product description.',
    material: 'Material'
  }
}
```

4. Put the ID into one of the three-product groups in `collections` in `src/main.js`.

```js
const collections = [
  ['tote', 'flower', 'incense-box'],
  ['pouch', 'dates', 'slippers']
];
```

Each group must contain exactly three product IDs. The first, second, and third items occupy the left, center, and right plinth positions respectively. To keep the phone layout balanced, place the tallest product in the center and keep two lower or narrower products at the sides.

## Prepare the product photo

- Use a square, high-resolution WebP image on a pure white background; 1200 × 1200 px or larger is a good source size.
- Photograph or render one complete object only: no shelf, text, QR code, labels, or UI baked into the image.
- Match the existing studio direction: frontal/slightly elevated view, soft lighting, a natural ground shadow, and enough white margin around the object.
- Do not crop the object tightly. The demo enlarges selected items, and tight crops cause clipping.
- Keep the file reasonably small; the current images are roughly 65–121 KB each.

## Fine-tune shelf fit

The three shelf positions are shared by all products. If a replacement is unusually tall, wide, or sits too high/low, add a small per-product rule in `src/hero.css` next to the current product-specific rules:

```css
.product-slot[data-id="incense-box"] .product-object {
  width: 138%;
  margin-bottom: -12%;
}
```

Use the smallest adjustment that makes the resting product sit naturally on its plinth. Then test selection: it must lift and enlarge without crossing the phone edge or the product detail card.

## Remove a product

Remove its object from `products`, remove its image from `public/products/`, and remove its ID from every `collections` group. Replace it so each group still has exactly three IDs.

## Before handing off

```bash
npm run build
```

Check at 320 × 569 and 390 × 693 phone viewports, in Arabic and English:

- All three products and their QR stands remain inside the shelf frame.
- The selected product lifts upward and remains fully visible.
- The glass details card is next to—not on top of—the selected product.
- Closing a product leaves no selection styling or purple focus border.
- `?product=<id>` opens the intended product and its QR code leads to the same canonical URL.
