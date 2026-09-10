import { chromium } from '/Users/dr.sindi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base=process.env.DEMO_URL || 'http://127.0.0.1:4173/';
const browser=await chromium.launch({headless:true,channel:'chrome'});
const context=await browser.newContext();
const page=await context.newPage();
const issues=[];const results=[];
page.on('pageerror',error=>issues.push(error.message));
page.on('response',response=>{if(response.status()>=400)issues.push(`${response.status()} ${response.url()}`)});
const settle=()=>page.evaluate(async()=>{
  await document.fonts.ready;
  await Promise.all(document.getAnimations().map(animation=>animation.finished.catch(()=>{})));
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  await Promise.all(document.getAnimations().map(animation=>animation.finished.catch(()=>{})));
  await new Promise(resolve=>setTimeout(resolve,260));
});
const overlaps=(first,second)=>first.x<second.x+second.width&&first.x+first.width>second.x&&first.y<second.y+second.height&&first.y+first.height>second.y;
await mkdir('output/playwright',{recursive:true});
const sizes=process.env.QUICK ? [[320,569],[390,693],[1440,900]] : [[320,569],[360,640],[375,667],[390,693],[390,844],[430,764],[600,960],[768,1024],[1024,768],[1440,900]];
for(const [width,height] of sizes){
  await page.setViewportSize({width,height});
  for(const language of ['ar','en']){
    await page.goto(base+(language==='en'?'?lang=en':''));
    await settle();
    const dimensions=await page.evaluate(()=>({w:innerWidth,h:innerHeight,scrollW:document.documentElement.scrollWidth,scrollH:document.documentElement.scrollHeight,shell:document.querySelector('.hero-shell').getBoundingClientRect().height,headline:document.querySelector('h1').getBoundingClientRect().toJSON(),actions:document.querySelector('.hero-actions').getBoundingClientRect().toJSON(),productTop:Math.min(...[...document.querySelectorAll('.product-object')].map(image=>image.getBoundingClientRect().top))}));
    assert.ok(dimensions.scrollW<=width,`Horizontal overflow ${width} ${language}`);
    assert.ok(dimensions.scrollH<=height,`Vertical overflow ${width} ${language}`);
    assert.ok(width>760 || dimensions.actions.bottom < dimensions.productTop+8,`CTA/product overlap ${width} ${language}: ${dimensions.actions.bottom} vs ${dimensions.productTop}`);
    assert.equal(await page.locator('.product-toggle').count(),3);
    const image=page.locator('.product-slot[data-id=flower] .product-object');
    const before=await image.boundingBox();
    if(language==='ar' && [320,390,1440].includes(width))await page.screenshot({path:`output/playwright/hero-${width}x${height}-idle.png`});
    await page.locator('.product-toggle[data-product=flower]').click();await settle();
    const after=await image.boundingBox();
    const panel=await page.locator('#product-panel').boundingBox();
    assert.ok(after.height>before.height*1.15,`No enlargement ${width}`);
    assert.ok(after.y<before.y-20,`No lift ${width}`);
    assert.ok(panel.y>dimensions.headline.bottom || width>760,`Panel obscures headline ${width}`);
    assert.ok(panel.x>=0 && panel.x+panel.width<=width && panel.y+panel.height<=height,`Panel out of viewport ${width}`);
    if(width<=760) assert.ok(!overlaps(panel,after),`Glass panel covers selected flower at ${width} ${language}`);
    const glass=await page.locator('#product-panel').evaluate(node=>{const style=getComputedStyle(node);return {backdrop:style.backdropFilter||style.webkitBackdropFilter,background:style.background,opacity:style.opacity}});
    assert.notEqual(glass.backdrop,'none',`Missing glass treatment at ${width} ${language}`);
    assert.equal(glass.opacity,'1',`Panel opacity should not reduce text legibility at ${width} ${language}`);
    assert.equal(await page.evaluate(()=>scrollY),0);
    if([320,390,1440].includes(width))await page.screenshot({path:`output/playwright/hero-${width}x${height}-${language}-selected.png`});
    await page.keyboard.press('Escape');await settle();
    assert.equal(await page.locator('#product-panel').isVisible(),false);
    assert.equal(await page.locator('.product-slot.selected').count(),0,`Selection remains after close at ${width} ${language}`);
    assert.equal(await page.locator('.hero.is-selected').count(),0,`Hero remains selected after close at ${width} ${language}`);
    assert.equal(await page.locator('.product-toggle[data-product=flower]').evaluate(node=>getComputedStyle(node).outlineStyle),'none',`Closed product keeps an outline at ${width} ${language}`);
    await page.locator('.qr-button[data-product=dates]').click();await settle();
    assert.ok(page.url().includes('product=dates'));
    await page.locator('#show-qr').click();assert.equal(await page.locator('#qr-dialog').isVisible(),true);
    await page.keyboard.press('Escape');assert.equal(await page.locator('#product-panel').isVisible(),true);
    await page.locator('#next-products').click();
    assert.deepEqual(await page.locator('.product-slot').evaluateAll(slots=>slots.map(slot=>slot.dataset.id)),['pouch','flower','slippers']);
    await page.locator('.product-toggle[data-product=slippers]').click();await settle();
    assert.ok(page.url().includes('product=slippers'));
    assert.equal(await page.locator('.product-slot.selected').count(),1,`More than one product selected at ${width} ${language}`);
    results.push({width,height,language,canvasHeight:dimensions.shell,scale:Math.round(after.height/before.height*100)/100,lift:Math.round(before.y-after.y)});
    console.log(`PASS ${width}x${height} ${language}`);
  }
}
for (const [width,height] of [[320,569],[390,693]]) {
  await page.setViewportSize({width,height});
  for (const productId of collectionsForRegression()) {
    await page.goto(base+`?product=${productId}`);await settle();
    const product=page.locator(`.product-slot[data-id=${productId}] .product-object`);
    const bounds=await product.boundingBox();
    const panel=await page.locator('#product-panel').boundingBox();
    assert.ok(bounds.x>=0 && bounds.x+bounds.width<=width,`Selected ${productId} escapes phone frame at ${width}`);
    assert.ok(panel.x>=0 && panel.x+panel.width<=width && panel.y+panel.height<=height,`Panel escapes phone frame for ${productId} at ${width}`);
    assert.ok(!overlaps(panel,bounds),`Panel covers selected ${productId} at ${width}`);
    const horizontalGap = Math.max(panel.x - (bounds.x + bounds.width), bounds.x - (panel.x + panel.width));
    assert.ok(horizontalGap >= 0 && horizontalGap <= 18,`Card too far from ${productId} at ${width}: ${horizontalGap}px`);
    assert.ok(Math.abs(panel.y + panel.height / 2 - bounds.y - bounds.height / 2) <= 32,`Card vertically detached from ${productId} at ${width}`);
    assert.equal(await page.evaluate(()=>scrollY),0);
    if(productId==='dates' && width===320) await page.screenshot({path:'output/playwright/hero-dates-320-v3.png'});
  }
}
await page.setViewportSize({width:390,height:693});
await page.goto(base+'?product=slippers');await settle();
assert.equal(await page.locator('.product-slot.selected').getAttribute('data-id'),'slippers');
assert.equal(await page.evaluate(()=>scrollY),0);
await page.screenshot({path:'output/playwright/hero-mobile-deep-link.png'});
await page.locator('#language').click();await settle();
assert.ok(page.url().includes('lang=en'));assert.equal(await page.locator('.product-slot.selected').getAttribute('data-id'),'slippers');
await page.emulateMedia({reducedMotion:'reduce'});
assert.ok(parseFloat(await page.locator('.product-object').first().evaluate(node=>getComputedStyle(node).transitionDuration))<.001);

// Race regression: selection starts before delayed image responses complete.
const raceContext=await browser.newContext({viewport:{width:320,height:569}});
await raceContext.route('**/products/*.webp',async route=>{await new Promise(resolve=>setTimeout(resolve,120));await route.continue();});
const racePage=await raceContext.newPage();
for(const productId of collectionsForRegression()){
  await racePage.goto(`${base}?refresh-race=${productId}`,{waitUntil:'domcontentloaded'});
  if(['pouch','slippers'].includes(productId)) await racePage.locator('#next-products').click();
  await racePage.locator(`.product-toggle[data-product=${productId}]`).click();
  await racePage.waitForTimeout(1250);
  const product=await racePage.locator(`.product-slot[data-id=${productId}] .product-object`).boundingBox();
  const panel=await racePage.locator('#product-panel').boundingBox();
  assert.ok(product.x>=0&&product.x+product.width<=320,`Refresh race lets ${productId} escape the phone frame`);
  assert.ok(!overlaps(panel,product),`Refresh race lets panel cover ${productId}`);
}
await raceContext.close();
assert.deepEqual(issues,[]);
await writeFile('output/hero-verification.json',JSON.stringify({base,results,issues},null,2));
console.log(JSON.stringify({base,results,issues},null,2));
await browser.close();

function collectionsForRegression(){return ['tote','flower','dates','pouch','slippers'];}
