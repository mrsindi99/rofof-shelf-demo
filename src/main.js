import QRCode from 'qrcode';
import './hero.css';

const products = [
  {id:'tote',page:13,ar:{name:'حقيبة الخوص والجلد',short:'حقيبة خوص وجلد',description:'نسج من جريد النخيل يلتقي بالجلد، في حقيبة يد وكتف بتفاصيل مستلهمة من النقش السعودي.',material:'خوص جريد النخيل وجلد'},en:{name:'Palm & leather tote',short:'Palm & leather tote',description:'Woven palm fronds meet leather in a hand and shoulder bag inspired by Saudi patterns.',material:'Palm fronds & leather'}},
  {id:'pouch',page:26,ar:{name:'حافظة الخوص',short:'حافظة من الخوص',description:'حافظة متعددة الاستخدامات، بنسيج من الخوص ونقوش سعودية ترافق تفاصيل يومك.',material:'خوص جريد النخيل وخشب'},en:{name:'Woven palm pouch',short:'Woven pouch',description:'An everyday keepsake, woven from palm fronds with Saudi-inspired patterns.',material:'Palm fronds & wood'}},
  {id:'flower',page:8,ar:{name:'حقيبة ورد متعددة الاستخدام',short:'حقيبة الورد',description:'من سعف النخيل إلى قطعة ترافقك؛ حقيبة للورد بتصميم قابل للفتح والاستخدام بأكثر من طريقة.',material:'خوص جريد النخيل'},en:{name:'The flower carrier',short:'Flower carrier',description:'Palm fibers become a versatile flower bag, designed to open and unfold into different uses.',material:'Woven palm fronds'}},
  {id:'dates',page:33,ar:{name:'صندوق التمر',short:'صندوق التمر',description:'صندوق تقديم للتمر يجمع دفء الخشب ونسج الخوص بتفاصيل مستلهمة من النقوش السعودية.',material:'خوص جريد النخيل وخشب'},en:{name:'The date presentation box',short:'Date box',description:'A date presentation box combining warm wood and woven palm panels with Saudi-inspired detailing.',material:'Palm fronds & wood'}},
  {id:'slippers',page:22,ar:{name:'خفّ من الخوص',short:'خفّ من الخوص',description:'خوص جريد النخيل في قطعة للاستخدام اليومي، مشغولة بتفاصيل ونقوش سعودية.',material:'خوص جريد النخيل'},en:{name:'Woven palm slippers',short:'Palm slippers',description:'An everyday piece made with woven palm fronds and Saudi-inspired geometric details.',material:'Woven palm fronds'}}
];

const translations = {
  ar:{skip:'انتقل إلى المحتوى',home:'الرئيسية',about:'عن رفوف',how:'كيف تعمل رفوف؟',login:'تسجيل الدخول <span aria-hidden="true">↗</span>',eyebrow:'حضور فعلي. تشغيل سحابي.',headline1:'علامتك ما<br /> تحتاج فرع.',headline2:'علامتك تحتاج<br /> <span class="rofof-word">رفوف.</span>',description:'مشغّل سحابي يفتح لعلامتك مساحات بيع فعلية جاهزة، بلا فروع جديدة ولا إدارة تشغيل معقّدة.',start:'ابدأ كعلامة تجارية',try:'جرّب الرف بنفسك',brandNote:'هويتك ظاهرة في كل مساحة، وكل نقطة بيع.',collection:'من مختارات رفوف',collectionCaption:'صناعة محلية، تستحق الوصول.',shelfIntro:'وراء كل منتج، حكاية.<br /><span>اضغط لتكتشفها.</span>',productStory:'من الرف إلى التفاصيل',share:'نسخ رابط المنتج',hint:'اضغط على المنتج أو امسح رمز QR',benefitIntro:'مساحة صغيرة.<br /><strong>فرص أكبر.</strong>',physical:'مساحات بيع فعلية',physicalText:'قرّب منتجاتك من عملائك',dashboard:'لوحة تحكّم واحدة',dashboardText:'تابع كل شيء من مكان واحد',identity:'هويتك هي الظاهرة',identityText:'في كل مساحة وكل نقطة بيع',demoNote:'تصوّر تفاعلي لرفوف · المنتجات للعرض التجريبي',journey:'رحلتك مع رفوف',howTitle:'ثلاث خطوات، وتبدأ البيع.',step1:'سجّل في رفوف',step1Text:'أنشئ حساب علامتك التجارية في دقائق.',step2:'اختر المساحات',step2Text:'اختر المساحات الفعلية المناسبة لعلامتك.',step3:'تابع مبيعاتك',step3Text:'تابع حركة مبيعاتك من لوحة تحكّم واحدة.',material:'الخامة',origin:'بلد الصنع',originValue:'صناعة محلية · السعودية',preparation:'مدة التنفيذ',preparationValue:'١٥ يومًا وفق الكتالوج',delivery:'التوصيل',deliveryValue:'يُحدّد عند تأكيد الطلب',close:'إغلاق تفاصيل المنتج',discover:'اكتشف',qr:'افتح تفاصيل',copied:'تم نسخ رابط المنتج',copyFail:'يمكنك نسخ رابط المنتج من شريط العنوان',title:'رفوف — علامتك ما تحتاج فرع'},
  en:{skip:'Skip to content',home:'Home',about:'About Rofof',how:'How it works',login:'Log in <span aria-hidden="true">↗</span>',eyebrow:'Physical presence. Cloud operations.',headline1:'Your brand doesn’t<br /> need a branch.',headline2:'Your brand needs<br /> <span class="rofof-word">Rofof.</span>',description:'A cloud operator connecting your brand to ready-to-sell physical spaces, without new branches or complicated operations.',start:'Get started as a brand',try:'Try the shelf',brandNote:'Your identity, in every space and at every point of sale.',collection:'THE ROFOF SELECTION',collectionCaption:'Locally made. Ready to go further.',shelfIntro:'Every product has a story.<br /><span>Click to discover it.</span>',productStory:'FROM SHELF TO STORY',share:'Copy product link',hint:'Click a product or scan its QR code',benefitIntro:'A smaller space.<br /><strong>A bigger opportunity.</strong>',physical:'Physical retail spaces',physicalText:'Bring your products closer to customers',dashboard:'One dashboard',dashboardText:'Manage everything in one place',identity:'Your brand stays visible',identityText:'In every space and at every point of sale',demoNote:'Rofof interactive concept · Demonstration products',journey:'YOUR JOURNEY WITH ROFOF',howTitle:'Three steps. Ready to sell.',step1:'Join Rofof',step1Text:'Create an account for your brand in minutes.',step2:'Choose your spaces',step2Text:'Find the physical spaces that suit your brand.',step3:'Follow your sales',step3Text:'Track your sales from one dashboard.',material:'Material',origin:'Made in',originValue:'Locally made · Saudi Arabia',preparation:'Preparation',preparationValue:'15 days, per catalog',delivery:'Delivery',deliveryValue:'Confirmed when ordering',close:'Close product details',discover:'Discover',qr:'Open details for',copied:'Product link copied',copyFail:'Copy the product URL from the address bar',title:'Rofof — Your brand doesn’t need a branch'}
};
let lang = new URL(location.href).searchParams.get('lang') === 'en' ? 'en' : 'ar';
Object.assign(translations.ar,{headline1:'علامتك ما تحتاج فرع.',headline2:'علامتك تحتاج <span class="rofof-word">رفوف.</span>',hint:'المس منتجًا. اكتشف حكايته.',scan:'امسح الرمز لفتح حكاية المنتج',demoNote:'تصوّر تفاعلي · منتجات للعرض التجريبي',description:'مساحات بيع فعلية جاهزة لعلامتك، بتشغيل سحابي. بلا فروع جديدة ولا إدارة تشغيل معقّدة.'});
Object.assign(translations.en,{headline1:'Your brand. No branch.',headline2:'Just <span class="rofof-word">Rofof.</span>',hint:'Touch a product. Discover its story.',scan:'Scan to open the product story',demoNote:'Interactive concept · Demonstration products',description:'Ready-to-sell physical spaces for your brand, managed in the cloud. No new branches. No complex operations.'});
const collections = [['tote','flower','dates'],['pouch','flower','slippers']];
let collection = 0;
let selected = null;
let returnFocus = null;
let toastTimer;
const scene = document.querySelector('#scene');
const shelf = document.querySelector('#shelf-products');
const qrDisplays = document.querySelector('#qr-displays');
const panel = document.querySelector('#product-panel');
const stage = document.querySelector('#stage');
const howDialog = document.querySelector('#how-dialog');
const qrDialog = document.querySelector('#qr-dialog');
const t = key => translations[lang][key];
let shelfReady = Promise.resolve();
let layoutRevision = 0;
let selectionRevision = 0;
let reflowFrame = 0;
const icon = kind => {
  const shapes={material:'M3 17C3 8 9 4 21 3c0 12-5 18-12 18M3 21 15 9',origin:'M12 22s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13Z M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0',preparation:'M12 7v6l4 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',delivery:'M2 5h12v13H2ZM14 10h4l4 5v3h-8M7 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4M18 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4'};
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${shapes[kind]}"/></svg>`;
};

function productUrl(id) {
  const url = new URL(location.href);
  url.hash = '';
  url.search = '';
  if (id) url.searchParams.set('product', id);
  if (lang === 'en') url.searchParams.set('lang', 'en');
  return url;
}

const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

function waitForImage(image) {
  if (image.complete) return image.decode ? image.decode().catch(() => undefined) : Promise.resolve();
  return new Promise(resolve => {
    image.addEventListener('load', resolve, {once:true});
    image.addEventListener('error', resolve, {once:true});
  });
}

function getMobilePanelMetrics() {
  const width = document.documentElement.clientWidth;
  const compact = panel.classList.contains('is-compact');
  return {
    width: compact ? 132 : Math.min(180, Math.max(140, width * .42)),
    edge: Math.min(16, Math.max(8, width * .03))
  };
}

function setPanelPlacement(product) {
  const index = collections[collection].indexOf(product.id);
  panel.dataset.side = index === 0 ? 'right' : 'left';
  // On a phone, the panel sits on the opposite side of the active object.
  // This is deliberate rather than a visual preference: it protects the product story.
  panel.dataset.mobileSide = index === 2 ? 'left' : 'right';
}

function stabilizeShelf() {
  const revision = ++layoutRevision;
  stage.dataset.ready = 'false';
  const fontReady = document.fonts?.ready?.catch(() => undefined) ?? Promise.resolve();
  const imageReady = [...shelf.querySelectorAll('.product-object')].map(waitForImage);
  shelfReady = Promise.all([fontReady, ...imageReady]).then(async () => {
    // Decode + two frames prevents stale offset measurements after a refresh.
    await nextFrame();
    await nextFrame();
    if (revision !== layoutRevision) return false;
    updateLift();
    stage.dataset.ready = 'true';
    return true;
  }).catch(() => {
    if (revision === layoutRevision) {
      updateLift();
      stage.dataset.ready = 'true';
    }
    return false;
  });
  return shelfReady;
}

function waitForProductMotion(image) {
  if (!image) return Promise.resolve();
  return new Promise(resolve => {
    let complete = false;
    const finish = () => {
      if (complete) return;
      complete = true;
      clearTimeout(timer);
      image.removeEventListener('transitionend', onEnd);
      resolve();
    };
    const onEnd = event => {
      if (event.target === image && event.propertyName === 'transform') finish();
    };
    const timer = setTimeout(finish, 560);
    image.addEventListener('transitionend', onEnd);
  });
}

function rectanglesOverlap(first, second, gap = 0) {
  return first.left < second.right + gap && first.right > second.left - gap && first.top < second.bottom + gap && first.bottom > second.top - gap;
}

function panelIsClearOfSelectedProduct() {
  if (!selected || !matchMedia('(max-width:760px)').matches || panel.hidden) return true;
  const image = shelf.querySelector(`.product-slot[data-id="${selected.id}"] .product-object`);
  return !image || !rectanglesOverlap(panel.getBoundingClientRect(), image.getBoundingClientRect(), 2);
}

function anchorPanelToProduct(image) {
  const bounds = image.getBoundingClientRect();
  const sceneBounds = scene.getBoundingClientRect();
  const mobile = matchMedia('(max-width:760px)').matches;
  const gap = 10;
  const width = panel.offsetWidth;
  const height = panel.offsetHeight;
  const headline = document.querySelector('h1').getBoundingClientRect();
  const floor = document.querySelector('.shelf-bottom').getBoundingClientRect().top - 12;
  const ceiling = mobile ? headline.bottom + 14 : sceneBounds.top + 8;
  const leftEdge = Math.max(8, sceneBounds.left + 8);
  const rightEdge = Math.min(innerWidth - 8, sceneBounds.right - 8);
  let x = panel.dataset.mobileSide === 'left' ? bounds.left - gap - width : bounds.right + gap;
  let y = bounds.top + bounds.height / 2 - height / 2;
  if (!mobile) {
    if (bounds.right + gap + width <= rightEdge) x = bounds.right + gap;
    else if (bounds.left - gap - width >= leftEdge) x = bounds.left - gap - width;
    else { x = bounds.left + (bounds.width - width) / 2; y = bounds.top - height - gap; }
  }
  x = Math.max(leftEdge, Math.min(rightEdge - width, x));
  y = Math.max(ceiling, Math.min(floor - height, y));
  panel.style.left = `${x - sceneBounds.left}px`;
  panel.style.right = 'auto';
  panel.style.top = `${y - sceneBounds.top}px`;
}

function renderShelf() {
  const visible = collections[collection].map(id=>products.find(product=>product.id===id));
  shelf.innerHTML = visible.map(product => `<article class="product-slot" data-id="${product.id}">
    <button class="product-toggle" data-product="${product.id}" aria-label="${t('discover')} ${product[lang].name}" aria-expanded="false" aria-controls="product-panel"><img class="product-object" src="/products/${product.id}.webp" alt="${product[lang].name}" width="480" height="480" draggable="false" fetchpriority="${product.id === 'flower' ? 'high' : 'auto'}" /></button>
    <button class="qr-button" data-product="${product.id}" aria-label="${t('qr')} ${product[lang].name} — QR" aria-expanded="false" aria-controls="product-panel"><span class="qr-stand"><canvas role="img" aria-label="QR: ${product[lang].name}"></canvas><small>ROFOF</small></span></button>
  </article>`).join('');
  qrDisplays.replaceChildren();
  shelf.querySelectorAll('.product-slot').forEach(slot=>{
    const display=document.createElement('div');display.className='qr-slot';display.dataset.id=slot.dataset.id;
    display.append(slot.querySelector('.qr-button'));qrDisplays.append(display);
  });
  qrDisplays.querySelectorAll('canvas').forEach((canvas, index) => {
    QRCode.toCanvas(canvas, shareUrl(visible[index].id), {width:180,margin:4,errorCorrectionLevel:'M',color:{dark:'#29242d',light:'#ffffff'}}, error => {
      if (error) console.error('Unable to render QR code', error);
    });
  });
  document.querySelector('#selection-count').textContent = `0${collection+1} / 02`;
  return stabilizeShelf();
}

function shareUrl(id) { const url=productUrl(id); url.host='rofof-shelf-demo.vercel.app'; url.protocol='https:'; url.port=''; return url.href; }
function updateLift() {
  const mobile = matchMedia('(max-width:760px)').matches;
  const stageBounds=stage.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth;
  if (!stageBounds.width || !viewportWidth) return;
  stage.style.setProperty('--stage-width',`${stageBounds.width}px`);
  const panelMetrics = getMobilePanelMetrics();
  panel.style.setProperty('--panel-width', `${panelMetrics.width}px`);
  panel.style.setProperty('--panel-edge', `${panelMetrics.edge}px`);
  shelf.querySelectorAll('.product-slot').forEach(slot=>{
    const slotBounds=slot.getBoundingClientRect();
    const image=slot.querySelector('.product-object');
    const imageWidth=image.offsetWidth;
    if (!imageWidth) return;
    const imageLeft=slotBounds.left+(slotBounds.width-imageWidth)/2;
    const imageRight=imageLeft+imageWidth;
    const isActiveMobileProduct = mobile && slot.dataset.id === selected?.id;
    const mobileSide = panel.dataset.mobileSide || 'right';
    const visualSpill=imageWidth*(isActiveMobileProduct ? .14 : .08);
    const targetFraction = isActiveMobileProduct ? (mobileSide === 'right' ? .25 : .75) : .5;
    const targetCenter=stageBounds.left+stageBounds.width*targetFraction;
    const intended=targetCenter-(imageLeft+imageWidth/2);
    let minimum=8-(imageLeft-visualSpill);
    let maximum=viewportWidth-8-(imageRight+visualSpill);
    if (isActiveMobileProduct) {
      const panelLeft = mobileSide === 'right' ? viewportWidth - panelMetrics.edge - panelMetrics.width : panelMetrics.edge;
      const panelRight = panelLeft + panelMetrics.width;
      const clearance = 8;
      if (mobileSide === 'right') maximum = Math.min(maximum, panelLeft - clearance - (imageRight + visualSpill));
      else minimum = Math.max(minimum, panelRight + clearance - (imageLeft - visualSpill));
    }
    const safeLift=Math.max(minimum,Math.min(maximum,intended));
    slot.style.setProperty('--lift-x',mobile ? `${safeLift}px` : '0px');
  });
}

function renderDetails(product) {
  document.querySelector('#detail-title').textContent = product[lang].name;
  document.querySelector('#detail-description').textContent = product[lang].description;
  document.querySelector('#product-facts').innerHTML = ['material','origin','preparation','delivery'].map(kind => `<div class="fact"><dt>${icon(kind)}${t(kind)}</dt><dd>${kind === 'material' ? product[lang].material : t(kind+'Value')}</dd></div>`).join('');
}

function syncSelection({showPanel = !!selected} = {}) {
  scene.querySelectorAll('.product-slot,.qr-slot').forEach(slot => {
    const active = slot.dataset.id === selected?.id;
    slot.classList.toggle('selected', active);
    slot.querySelectorAll('button').forEach(button => button.setAttribute('aria-expanded', String(active)));
  });
  scene.classList.toggle('has-selection', !!selected);
  document.querySelector('.hero').classList.toggle('is-selected',!!selected);
  document.querySelector('.hero-description').inert=!!selected && matchMedia('(max-width:760px)').matches;
  document.querySelector('.hero-actions').inert=!!selected && matchMedia('(max-width:760px)').matches;
  panel.hidden = !selected || !showPanel;
  if (selected) renderDetails(selected);
}

async function revealSelection(product, ticket, {focus}) {
  await shelfReady;
  if (ticket !== selectionRevision || selected?.id !== product.id) return;
  setPanelPlacement(product);
  updateLift();
  syncSelection({showPanel:false});
  await nextFrame();
  const image = shelf.querySelector(`.product-slot[data-id="${product.id}"] .product-object`);
  await waitForProductMotion(image);
  if (ticket !== selectionRevision || selected?.id !== product.id) return;
  panel.style.visibility = 'hidden';
  syncSelection({showPanel:true});
  await document.fonts.ready;
  await nextFrame();
  if (ticket !== selectionRevision || selected?.id !== product.id) return;
  anchorPanelToProduct(image);
  panel.style.visibility = '';
  await nextFrame();

  // A small runtime safety net backs up the geometric lift bounds. If a browser
  // reports an unusual image size, move the glass card only after the product
  // has reached a clear zone, never through the product itself.
  if (!panelIsClearOfSelectedProduct()) {
    panel.hidden = true;
    panel.dataset.mobileSide = panel.dataset.mobileSide === 'right' ? 'left' : 'right';
    panel.classList.add('is-compact');
    updateLift();
    syncSelection({showPanel:false});
    await nextFrame();
    await waitForProductMotion(shelf.querySelector(`.product-slot[data-id="${product.id}"] .product-object`));
    if (ticket !== selectionRevision || selected?.id !== product.id) return;
    panel.style.visibility = 'hidden';
    syncSelection({showPanel:true});
    await document.fonts.ready;
    await nextFrame();
    if (ticket !== selectionRevision || selected?.id !== product.id) return;
    anchorPanelToProduct(image);
    panel.style.visibility = '';
  }
  if (focus) panel.focus({preventScroll:true});
}

function selectProduct(id, {focus=true,restoreFocus=focus,updateUrl=true,toggle=true,trigger=null} = {}) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  if (selected?.id === id && toggle) { closeProduct(); return; }
  const ticket = ++selectionRevision;
  panel.classList.remove('is-compact');
  selected = product;
  if(!collections[collection].includes(id)){collection=collections.findIndex(group=>group.includes(id));renderShelf();}
  if (updateUrl) history.pushState({}, '', productUrl(id));
  void revealSelection(product, ticket, {focus});
  returnFocus = restoreFocus ? (trigger || shelf.querySelector(`.product-slot[data-id="${id}"] .product-toggle`)) : null;
}

function closeProduct({updateUrl=true,restoreFocus=true} = {}) {
  ++selectionRevision;
  selected = null;
  panel.classList.remove('is-compact');
  syncSelection();
  if (updateUrl) history.pushState({}, '', productUrl(null));
  if (restoreFocus && returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
}

function applyLanguage({restoreSelection=true} = {}) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = t('title');
  document.querySelectorAll('[data-i18n]').forEach(node => node.innerHTML = t(node.dataset.i18n));
  document.querySelector('.login-button [data-i18n]').textContent = lang === 'ar' ? 'تسجيل الدخول' : 'Log in';
  document.querySelector('.language-label').textContent = lang === 'ar' ? 'EN' : 'عربي';
  document.querySelector('#language').setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  document.querySelector('#close-product').setAttribute('aria-label', t('close'));
  document.querySelector('#close-how').setAttribute('aria-label', lang === 'ar' ? 'إغلاق' : 'Close');
  document.querySelector('#close-qr').setAttribute('aria-label',lang==='ar'?'إغلاق رمز QR':'Close QR code');
  document.querySelector('#show-qr').setAttribute('aria-label',lang==='ar'?'تكبير رمز QR':'Enlarge QR code');
  document.querySelector('#previous-products').setAttribute('aria-label',lang==='ar'?'المجموعة السابقة':'Previous collection');
  document.querySelector('#next-products').setAttribute('aria-label',lang==='ar'?'المجموعة التالية':'Next collection');
  document.querySelector('nav').setAttribute('aria-label',lang === 'ar' ? 'التنقل الرئيسي' : 'Main navigation');
  const selectedId = selected?.id;
  renderShelf();
  if (selectedId && restoreSelection) selectProduct(selectedId,{updateUrl:false,toggle:false,focus:false});
  else syncSelection({showPanel:false});
  if (selectedId) returnFocus = shelf.querySelector(`.product-slot[data-id="${selectedId}"] .product-toggle`);
}

scene.addEventListener('click', event => {
  const trigger = event.target.closest('[data-product]');
  if (trigger) {
    const keyboardActivation = event.detail === 0;
    selectProduct(trigger.dataset.product, {trigger,focus:keyboardActivation,restoreFocus:keyboardActivation});
  }
});
scene.addEventListener('keydown',event => {
  if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  const current = event.target.closest('[data-product]');
  if (!current) return;
  event.preventDefault();
  const ids=collections[collection];
  const index = ids.indexOf(current.dataset.product);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? ids.length-1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + ids.length)%ids.length;
  shelf.querySelector(`.product-slot[data-id="${ids[next]}"] .product-toggle`).focus();
});
document.querySelector('#close-product').addEventListener('click',() => closeProduct());
document.addEventListener('keydown',event => {if(event.key === 'Escape' && selected && !howDialog.open && !qrDialog.open)closeProduct();});
document.addEventListener('click',event => {
  if (selected && !event.target.closest('#showcase,#try-button,#language,#how-dialog,#how-button,#qr-dialog') && !howDialog.open && !qrDialog.open) closeProduct({restoreFocus:false});
});
document.querySelector('#try-button').addEventListener('click',() => {
  selectProduct('flower',{toggle:false,focus:false,restoreFocus:false});
});
document.querySelector('#language').addEventListener('click',() => {
  lang = lang === 'ar' ? 'en' : 'ar';
  applyLanguage();
  history.replaceState({},'',productUrl(selected?.id));
});
document.querySelector('#how-button').addEventListener('click',()=>howDialog.showModal());
document.querySelector('#close-how').addEventListener('click',()=>howDialog.close());
howDialog.addEventListener('click',event=> {if(event.target === howDialog){const rect = howDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)howDialog.close();}});
document.querySelector('#share-product').addEventListener('click', async () => {
  if (!selected) return;
  let message = t('copied');
  try {await navigator.clipboard.writeText(shareUrl(selected.id));} catch {message = t('copyFail');}
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove('visible'),2800);
});
for (const id of ['previous-products','next-products']) document.querySelector('#'+id).addEventListener('click',()=>{
  closeProduct({restoreFocus:false}); collection=(collection+1)%collections.length; renderShelf();
});
document.querySelector('#show-qr').addEventListener('click',()=>{
  if(!selected)return;
  document.querySelector('#qr-title').textContent=selected[lang].name;
  QRCode.toCanvas(document.querySelector('#large-qr'),shareUrl(selected.id),{width:460,margin:4,errorCorrectionLevel:'M'});
  qrDialog.showModal();
});
document.querySelector('#close-qr').addEventListener('click',()=>qrDialog.close());
function scheduleResponsiveLayout() {
  cancelAnimationFrame(reflowFrame);
  reflowFrame = requestAnimationFrame(() => {
    if (!selected) {
      updateLift();
      return;
    }
    const product = selected;
    const ticket = ++selectionRevision;
    panel.hidden = true;
    void revealSelection(product, ticket, {focus:false});
  });
}
window.addEventListener('resize', scheduleResponsiveLayout, {passive:true});
window.visualViewport?.addEventListener('resize', scheduleResponsiveLayout, {passive:true});
document.addEventListener('visibilitychange', () => { if (!document.hidden) scheduleResponsiveLayout(); });
window.addEventListener('popstate',()=>{
  lang = new URL(location.href).searchParams.get('lang') === 'en' ? 'en' : 'ar';
  applyLanguage({restoreSelection:false});
  const id = new URL(location.href).searchParams.get('product');
  if(products.some(product=>product.id===id))selectProduct(id,{updateUrl:false,toggle:false,focus:false});
  else closeProduct({updateUrl:false,restoreFocus:false});
});
applyLanguage();
const initialId = new URL(location.href).searchParams.get('product');
if(products.some(product=>product.id===initialId)) {
  selectProduct(initialId,{updateUrl:false,toggle:false,focus:false});
}
