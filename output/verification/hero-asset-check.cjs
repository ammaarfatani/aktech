const { chromium } = require('C:/Users/DT/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({channel:'msedge',headless:true});
  const page = await browser.newPage({viewport:{width:390,height:844}});
  await page.goto('http://localhost:3006/products');
  await page.getByRole('button',{name:'Fitivo',exact:true}).click();
  const image = page.getByAltText('Illustration of software design and development');
  await image.waitFor();
  await image.evaluate(img=>img.decode());
  console.log('Final optimized hero image loaded successfully');
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
