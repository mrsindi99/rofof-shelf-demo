import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require('/Users/dr.sindi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
import {mkdir} from 'node:fs/promises';
const sources = {
  "tote": "/Users/dr.sindi/.codex/generated_images/01a088d1-9e08-77b1-ad3c-cad0c7d8f606/exec-b4856f33-276b-4228-8a4b-064df7356b6b.png",
  "pouch": "/Users/dr.sindi/.codex/generated_images/01a088d1-9e08-77b1-ad3c-cad0c7d8f606/exec-dc8eb28d-f99a-4f59-9516-d888d65ad85c.png",
  "flower": "/Users/dr.sindi/.codex/generated_images/01a088d1-9e08-77b1-ad3c-cad0c7d8f606/exec-580b1c51-7610-4076-908d-78b038127dc2.png",
  "dates": "/Users/dr.sindi/.codex/generated_images/01a088d1-9e08-77b1-ad3c-cad0c7d8f606/exec-868ae9e9-6346-4dc0-ab86-4ae9b5a92595.png",
  "slippers": "/Users/dr.sindi/.codex/generated_images/01a088d1-9e08-77b1-ad3c-cad0c7d8f606/exec-7e90ff9d-8215-4cc9-8cff-7ed674430608.png"
};
await mkdir('public/products', {recursive:true});
for (const [id, path] of Object.entries(sources)) {
  await sharp(path).resize({width:700,withoutEnlargement:true}).webp({quality:91}).toFile(`public/products/${id}.webp`);
  console.log(`Encoded ${id} for the web`);
}
