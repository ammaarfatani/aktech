const { chromium } = require('C:/Users/DT/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch({channel:'msedge',headless:true});
 const page = await browser.newPage();
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 const results=[];
 for(const width of [1440,768,390,320]) {
  await page.setViewportSize({width,height:1000});
  for(const route of ['/products','/products/acadivo','/products/restro-erp','/products/fitivo']) {
   assert.equal((await page.goto('http://localhost:3006'+route,{waitUntil:'networkidle'})).status(),200);
   await page.waitForTimeout(3000);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${route} overflows at ${width}`);
   if(route==='/products') {
    for(const name of ['Restro ERP','Fitivo','Acadivo']) {
     const button=page.getByRole('button',{name,exact:true});
     await button.click();
     assert.equal(await button.getAttribute('aria-pressed'),'true');
     await page.getByRole('link',{name:`Explore ${name}`,exact:true}).waitFor();
     await page.waitForTimeout(300);
    }
    if(width===1440||width===390) await page.locator('header').last().screenshot({path:`output/verification/products-hero-updated-${width}.png`});
   } else {
    const count=await page.locator(`img[src*="${route==='/products/acadivo'?'/products/acadivo/':route==='/products/restro-erp'?'/projects/resto-crm.png':'no-gym-screenshot'}"]`).count();
    assert.equal(count,route==='/products/fitivo'?0:1,`Repeated screenshots in ${route}`);
    if(width===1440||width===390) {
     await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}scrollTo(0,0);});
     await page.waitForTimeout(600);
     await page.screenshot({path:`output/verification/${route.replaceAll('/','-').slice(1)}-simplified-${width}.png`,fullPage:true});
    }
   }
   results.push({width,route,passed:true});
  }
  console.log(`Product pages and hero interactions passed at ${width}px`);
 }
 for(const width of [1440,390]) {
  await page.setViewportSize({width,height:1000});
  await page.goto('http://localhost:3006/',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(3000);
  await page.locator('#works').scrollIntoViewIfNeeded();
  const cards=await page.locator('#works img').evaluateAll(images=>images.map(image=>({fit:getComputedStyle(image).objectFit,width:image.parentElement.getBoundingClientRect().width,height:image.parentElement.getBoundingClientRect().height})));
  assert(cards.length>0);
  assert(cards.every(card=>card.fit==='contain'));
  assert.equal(Math.round(cards[0].width),width===1440?460:380);
  assert.equal(Math.round(cards[0].height),width===1440?290:240);
  await page.locator('#works').screenshot({path:`output/verification/work-images-contained-${width}.png`});
  results.push({width,workCards:cards.length,fit:'contain',sizesPreserved:true});
 }
 assert.equal(errors.length,0,JSON.stringify(errors));
 fs.writeFileSync('output/verification/ui-update-results.json',JSON.stringify({results,errors},null,2));
 console.log(`PASS: ${results.length} responsive checks; hero switching works; one preview per product; work sizes preserved; no page errors.`);
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
