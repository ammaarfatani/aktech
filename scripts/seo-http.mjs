import http from "node:http";
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base=process.env.SEO_TEST_URL || 'http://localhost:3011';
const records=JSON.parse(fs.readFileSync('src/data/seo-pages.json','utf8'));
const services=JSON.parse(fs.readFileSync('src/data/seo-services.json','utf8'));
const sitemap=await (await fetch(base+'/sitemap.xml')).text();
const paths=[...sitemap.matchAll(/<loc>https:\/\/aktech.tech([^<]*)<\/loc>/g)].map(m=>m[1]||'/');
assert.equal(new Set(paths).size,paths.length);
const results=[]; const links=new Set();
for(const path of [...paths,'/work']) {
 const response=await fetch(base+path);assert.equal(response.status,200,path);
 if(process.env.SEO_EXPECT_PREVIEW === '1') assert.ok(response.headers.get('x-robots-tag')?.includes('noindex'), `preview noindex ${path}`);
 const html=await response.text();
 for(const match of html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)) { const url=new URL(match[1].replaceAll("&amp;","&")); assert.equal(url.pathname,"/923713410797",`WhatsApp number ${path}`); if(url.searchParams.has("text")) assert.ok(url.searchParams.get("text").trim().length>10,`WhatsApp message ${path}`); }
 const expected=path==='/work'?'/portfolio':path;
 const canonicals=[...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(canonicals.length,1,`canonical count ${path}`);
 assert.equal(canonicals[0].replace(/\/$/,''),('https://aktech.tech'+expected).replace(/\/$/,''),`canonical ${path}`);
 assert.ok(/<meta name="description" content="[^"]+"/.test(html),`description ${path}`);
 assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html),`indexable ${path}`);
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1]));
 assert.ok(schemas.length>=3,`schema ${path}`);
 for(const match of html.matchAll(/href="(\/[^"?#]*)(?:[^\"]*)"/g)) {if(!match[1].startsWith('/_next/')&&!match[1].startsWith('//'))links.add(match[1]);}
 results.push({path,status:response.status,canonical:canonicals[0],schemas:schemas.length,h1:(html.match(/<h1[ >]/g)||[]).length});
}
for(const p of services)assert.ok(paths.includes(p.path));
for(const p of records.filter(p=>p.status!=='published')) {assert.ok(!paths.includes(p.path));assert.equal((await fetch(base+p.path)).status,404,p.path);}
assert.equal((await fetch(base+'/services/unknown-service')).status,404);
assert.equal((await fetch(base+'/missing-page')).status,404);
const robots=await (await fetch(base+'/robots.txt')).text();assert.ok(robots.includes('Sitemap: https://aktech.tech/sitemap.xml'));
const social=await fetch(base+'/opengraph-image');assert.equal(social.status,200);assert.ok(social.headers.get('content-type').startsWith('image/'));
const slash=await fetch(base+'/services/web-development/',{redirect:'manual'});assert.equal(slash.status,308);
const host=await new Promise((resolve,reject)=>{http.get(base+'/services/web-development',{headers:{Host:'www.aktech.tech'}},res=>{res.resume();resolve({status:res.statusCode,location:res.headers.location});}).on('error',reject);});assert.equal(host.status,308);assert.equal(host.location,'https://aktech.tech/services/web-development');
const broken=[];for(const link of links){const response=await fetch(base+link);if(response.status>=400)broken.push({link,status:response.status});}
const invalid=await fetch(base+'/api/contact',{method:'POST',headers:{origin:base,'content-type':'application/json'},body:'{}'});assert.equal(invalid.status,400);
fs.writeFileSync('output/seo-http-results.json',JSON.stringify({results,linksChecked:links.size,broken},null,2));
assert.deepEqual(broken,[]);
console.log(`PASS: ${results.length} pages, ${links.size} internal targets, metadata, JSON-LD, robots, sitemap, drafts, 404s, redirects and invalid contact request.`);
