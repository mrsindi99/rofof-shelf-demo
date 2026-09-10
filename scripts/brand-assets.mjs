import { mkdir, writeFile } from 'node:fs/promises';

// Extract the exact public vector paths from Rofof's own logo component.
const home = await fetch('https://rofof.sa/').then(r => r.text());
const asset = home.match(/https:\/\/rofof\.sa\/build\/assets\/ApplicationLogo-[A-Za-z0-9_-]+\.js/)?.[0];
if (!asset) throw new Error('Public brand logo bundle not found');
const source = await fetch(asset).then(r => r.text());
const groups = [...source.matchAll(/\[((?:`M[^`]+`[,]?)+)\]/g)].map(m => [...m[1].matchAll(/`([^`]+)`/g)].map(p => p[1]));
if (groups.length !== 2 || groups[0].length !== 5 || groups[1].length !== 3) throw new Error('Unexpected logo structure');
const paths = (values, fill) => values.map(d => `<path fill="${fill}" d="${d}"/>`).join('');
await mkdir('public/fonts', { recursive: true });
await writeFile('public/rofof-logo.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 345 138" role="img" aria-label="رفوف"><g transform="translate(10 8) scale(.175)">${paths(groups[0], '#0d4061')}</g><g transform="translate(225 12)"><rect width="112" height="112" fill="#635cc7"/><g transform="translate(14 22) scale(.28)">${paths(groups[1], '#fff')}</g></g></svg>`);
const css = await fetch('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap', {headers: {'User-Agent': 'Mozilla/5.0'}}).then(r => r.text());
const fontUrls = [...css.matchAll(/src: url\(([^)]+)\) format\('(woff2|truetype)'\)/g)];
// Google Fonts returns a full font for each weight to this user agent.
for (let i = 0; i < fontUrls.length; i++) {
  const weight = [400,500,600,700][i];
  if (!weight) break;
  const data = await fetch(fontUrls[i][1]).then(r => r.arrayBuffer());
  await writeFile(`public/fonts/arabic-${weight}.${fontUrls[i][2] === 'woff2' ? 'woff2' : 'ttf'}`, Buffer.from(data));
}
console.log('Saved official logo and local font files.');
