const {chromium}=require('C:/Users/DT/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const page=await browser.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,1024,768,390,320]){
  await page.setViewportSize({width,height:1000});
  assert.equal((await page.goto('http://localhost:3006/products',{waitUntil:'networkidle'})).status(),200);
  await page.waitForTimeout(3200);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow ${width}`);
  const hero=page.locator('header').last();
  assert.equal(await hero.locator('img').count(),1);
  const photo=hero.getByAltText('Sculptural red spiral staircase in a sunlit modern interior');await photo.evaluate(image=>image.decode());
  assert.equal(await hero.locator('img[src*="acadivo"]').count(),0);
  for(const slug of ['acadivo','restro-erp','fitivo'])assert.equal(await hero.locator(`a[href="/products/${slug}"]`).count(),1);
  if(width===1440||width===390){await page.mouse.move(1,1);await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`output/verification/products-light-hero-${width}.png`});}
  console.log(`Hero passed ${width}px`);
 }
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});await page.goto('http://localhost:3006/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(3200);
  const images=page.locator('#works img');await images.first().scrollIntoViewIfNeeded();await page.mouse.move(1,1);
  const styles=await images.evaluateAll(list=>list.map(img=>({fit:getComputedStyle(img).objectFit,padding:getComputedStyle(img).padding,width:img.parentElement.offsetWidth,height:img.parentElement.offsetHeight})));
  assert(styles.every(style=>style.fit==='contain'&&style.padding==='0px'));
  assert.equal(styles[0].width,width===1440?460:380);assert.equal(styles[0].height,width===1440?290:240);
  await page.locator('#works').screenshot({path:`output/verification/work-no-padding-${width}.png`});console.log(`Work image fit and sizes passed ${width}px`);
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://localhost:3006/products');await page.waitForTimeout(3200);assert.equal(errors.length,0,JSON.stringify(errors));
 console.log('PASS: all responsive, asset, product-link, Work padding and page-error checks');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
