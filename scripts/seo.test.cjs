/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test harness. */
const {test}=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const {load}=require("./load-ts.cjs");
const {validatePages}=load("src/lib/seo-validation.ts");
const lead=load("src/lib/lead-validation.ts");
const pages=require("../src/data/seo-pages.json");
const services=require("../src/data/seo-services.json");
const {FEATURED_CASE_STUDIES}=load("src/data/caseStudies.ts");
const existing=[...services.map(p=>p.path),"/case-studies","/contact","/services"];
const portfolio=FEATURED_CASE_STUDIES.map(p=>p.slug);
const validate=p=>validatePages(p,existing,portfolio);
test("complete pilot validates",()=>assert.equal(validate(pages),true));
for(const [label,change] of Object.entries({duplicate:p=>p.push(p[0]),canonical:p=>p[0].canonical="https://www.aktech.tech/services/x",metadata:p=>p[0].title="",approval:p=>p[0].approvedBy="",content:p=>p[0].benefits=[],date:p=>p[0].updated="2026-02-31",portfolio:p=>p[0].portfolio=["invented"],link:p=>p[0].related=["/locations/uae/web-development"],duplicateMetadata:p=>p[1].description=p[0].description,existingRoute:p=>p[0].path="/services/web-development"})) test(`rejects ${label}`,()=>{const copy=structuredClone(pages);change(copy);assert.throws(()=>validate(copy));});
test("location drafts excluded from publication",()=>assert.equal(pages.filter(p=>p.kind==="location"&&p.status==="published").length,0));
test("location review pages are distinct",()=>{const locations=pages.filter(p=>p.kind==="location");assert.ok(locations.length>=5);assert.equal(new Set(locations.map(p=>p.introduction)).size,locations.length);assert.equal(new Set(locations.map(p=>p.benefits.join("|"))).size,locations.length);assert.ok(locations.every(p=>p.status==="review"&&p.approvedBy===""));});
const good={fullName:"Test",email:"test@example.com",country:"Pakistan",service:"Web Development",preferredContact:"Email",description:"Test project description",landingPath:"/services/web-development"};
test("lead validation and source sanitization",()=>{assert.equal(lead.validateLead(good).landingPath,good.landingPath);assert.equal(lead.validateLead({...good,landingPath:"/?email=private"}).landingPath,"/contact");});
for(const bad of [{email:"invalid"},{country:""},{description:"x"},{service:"Invented"},{preferredContact:"Phone",phone:""},{fullName:123},{description:"x".repeat(5001)}]) test(`rejects invalid lead ${Object.keys(bad)[0]}`,()=>assert.throws(()=>lead.validateLead({...good,...bad})));
test("limiter enforces cap and expires",()=>{const store=new Map();for(let i=0;i<5;i++)assert.ok(lead.consumeLimit(store,"test",0));assert.equal(lead.consumeLimit(store,"test",1),false);assert.ok(lead.consumeLimit(store,"test",900001));});
test("contact endpoint validates, confirms delivery and does not retry",async()=>{
 const {POST}=load("src/app/api/contact/route.ts",{"@/lib/lead-validation":lead});
 const original=global.fetch;let calls=0;
 const request=(body,origin="http://localhost")=>new Request("http://localhost/api/contact",{method:"POST",headers:{origin,"content-type":"application/json"},body:JSON.stringify(body)});
 try {global.fetch=async()=>{calls++;return Response.json({success:true});};
 assert.equal((await POST(request(good,"https://evil.test"))).status,403);
 assert.equal((await POST(request({...good,country:""}))).status,400);
 assert.equal((await POST(request({...good,website:"spam"}))).status,400);
 assert.equal(calls,0);
 assert.equal((await POST(request(good))).status,200);assert.equal(calls,1);
 global.fetch=async()=>{calls++;return new Response("opaque success page");};
 assert.equal((await POST(request(good))).status,502);assert.equal(calls,2);
 global.fetch=async()=>{calls++;throw new Error("network");};
 assert.equal((await POST(request(good))).status,502);assert.equal(calls,3);
 }finally{global.fetch=original;}
});
test("all existing service routes have specific metadata",()=>{for(const page of services){const source=fs.readFileSync(`src/app${page.path}/layout.tsx`,"utf8");assert.ok(source.includes(page.path));assert.ok(source.includes("seoMetadata"));}});
test("analytics respects consent and sends no query or form values",()=>{
 const previousWindow=global.window,previousStorage=global.localStorage; const events=[];
 try {
  global.window={location:{origin:"https://aktech.tech",pathname:"/contact",search:"?email=private@example.com"},gtag:(...args)=>events.push(args)};
  global.localStorage={getItem:()=>"denied"};
  const analytics=load("src/lib/analytics.ts");analytics.trackConversion("generate_lead","Web Development");assert.equal(events.length,0);
  global.localStorage={getItem:()=>"granted"};analytics.trackConversion("generate_lead","Web Development");assert.equal(events.length,1);
  assert.deepEqual(events[0],["event","generate_lead",{page_location:"https://aktech.tech/contact",page_referrer:"",landing_path:"/contact",service:"Web Development"}]);
  global.localStorage={getItem:()=>{throw new Error("blocked");}};analytics.trackConversion("whatsapp_click");assert.equal(events.length,1);
 } finally {global.window=previousWindow;global.localStorage=previousStorage;}
});
test("preview indexing protection never applies to production",async()=>{
 const before=process.env.VERCEL_ENV;
 try {const config=load('next.config.ts').default;
 process.env.VERCEL_ENV='preview';assert.deepEqual(await config.headers(),[{source:'/:path*',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow, noarchive'}]}]);
 process.env.VERCEL_ENV='production';assert.deepEqual(await config.headers(),[]);
 delete process.env.VERCEL_ENV;assert.deepEqual(await config.headers(),[]);
 }finally{if(before===undefined)delete process.env.VERCEL_ENV;else process.env.VERCEL_ENV=before;}
});
