const { chromium } = require('C:/Users/DT/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
 const browser = await chromium.launch({ channel: 'msedge', headless: true });
 const page = await browser.newPage();
 const errors = [];
 page.on('pageerror', error => errors.push(error.message));
 const results = [];
 for (const width of [1440, 768, 390]) {
  await page.setViewportSize({width, height: 1000});
  for (const route of ['/products','/products/acadivo','/products/restro-erp','/products/fitivo','/case-studies','/case-studies/zurane']) {
   const response = await page.goto('http://localhost:3006'+route, {waitUntil:'networkidle'});
   await page.waitForTimeout(3200); await page.evaluate(async () => { await Promise.all([...document.images].filter(image => new URL(image.src).origin === location.origin).map(async image => { image.loading = "eager"; await Promise.race([image.decode().catch(() => {}), new Promise(resolve => setTimeout(resolve, 5000))]); })); }); for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 800) { await page.evaluate(value => window.scrollTo(0, value), y); await page.waitForTimeout(80); } await page.waitForTimeout(700); await page.evaluate(() => window.scrollTo(0,0));
   const details = await page.evaluate(() => ({ heading: document.querySelector('h1')?.textContent, overflow: document.documentElement.scrollWidth > window.innerWidth, brokenImages: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image=>image.src), links: [...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(href=>href.startsWith('/products')||href.startsWith('/case-studies/zurane')) }));
   results.push({width,route,status:response.status(),...details});
   if (width !== 768 && ['/products','/products/acadivo','/products/fitivo','/case-studies/zurane'].includes(route)) await page.screenshot({path:`output/verification/${route.replaceAll('/','-').slice(1)}-${width}.png`,fullPage:true});
  }
 }
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://localhost:3006/products');
 await page.getByRole('button',{name:'Toggle Navigation Menu'}).click();
 await page.getByRole('link',{name:'Products',exact:true}).first().waitFor({state:'visible'});
 await page.getByRole('link',{name:'Products',exact:true}).first().click();
 results.push({mobileNavigation:'Products link visible and clickable'});
 for(const route of ['/products/not-a-product','/case-studies/not-a-case']) {
  const response = await page.goto('http://localhost:3006'+route);
  results.push({route,status:response.status()});
 }
 require('fs').writeFileSync('output/verification/results.json', JSON.stringify({results,errors},null,2)); console.log(JSON.stringify({ checks:results.length, failed:results.filter(result=>result.overflow || result.brokenImages?.length || result.status >= 500), errors },null,2));
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});



