const {chromium}=require('C:/Users/DT/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true}); const page=await browser.newPage();
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:1000});await page.goto('http://localhost:3006/products');await page.waitForTimeout(3200);
  const hero=page.locator('header').last();
  const colors=await hero.evaluate(element=>({hero:getComputedStyle(element).backgroundColor,root:getComputedStyle(element.parentElement).backgroundColor,gradient:getComputedStyle(element.parentElement).backgroundImage}));
  assert.equal(colors.hero,'rgba(0, 0, 0, 0)');assert.equal(colors.root,'rgb(245, 243, 240)');assert.notEqual(colors.gradient,'none');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:`output/verification/products-continuous-background-${width}.png`});
  await page.goto('http://localhost:3006/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(3200);
  const work=page.locator('#works');await work.scrollIntoViewIfNeeded();
  const styles=await work.locator('img').evaluateAll(images=>images.map(image=>({fit:getComputedStyle(image).objectFit,padding:getComputedStyle(image).padding,width:image.parentElement.offsetWidth,height:image.parentElement.offsetHeight})));
  assert(styles.every(style=>style.fit==='cover'&&style.padding==='0px'));assert.equal(styles[0].width,width===1440?460:380);assert.equal(styles[0].height,width===1440?290:240);
  await work.screenshot({path:`output/verification/work-full-box-${width}.png`});console.log(`PASS ${width}px: continuous Products background, edge-to-edge Work images, original card sizes`);
 }
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
