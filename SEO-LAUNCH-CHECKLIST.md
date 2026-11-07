# SEO launch checklist

## Before deployment
- [ ] Owner reviews eight new non-location pages and existing capability/portfolio claims. Geographic drafts remain in review.
- [ ] Review all existing testimonials, client counts, rating claims, response SLAs and guarantees against actual evidence; they were preserved, not independently verified.
- [ ] Confirm the Google Apps Script response contract and conduct one controlled end-to-end receipt test. Confirm new form fields are stored and error paths do not duplicate leads.
- [ ] Confirm hosting uses https://aktech.tech and does not redirect it back to www. Test both hostnames and HTTPS at the hosting layer. The public web fetch retrieved non-www; www was inaccessible through that tool, so its production redirect remains unverified.
- [ ] Confirm Next image optimization works on the deployment target and remote image sources remain accessible. This requires a Next server/runtime, not a static-only export.
- [ ] Configure shared rate limiting/receiver protection if using multiple server instances. Review data retention and access to leads.
- [ ] Add valid GA/GSC values only in deployment settings. Disable GA automatic form events and automatic history pageviews before using the manual implementation. Test opt-in and withdrawal.
- [ ] Run npm run test:seo, npm run build, npx tsc --noEmit and npm run lint. Existing unrelated lint debt is listed in SEO-AUDIT.md; do not silently bypass a required CI gate.
- [ ] Start the production build locally and run node scripts/seo-http.mjs (default port 3011). Set SEO_TEST_URL for another local/staging URL. This script sends an invalid form payload only and does not test successful external delivery.
- [ ] Inspect homepage, existing services, new landing pages, products, case studies and contact at desktop/mobile sizes. Verify keyboard navigation, errors, menu, CTA and WhatsApp messages.
- [ ] Run Lighthouse mobile on representative routes with consistent throttling; record LCP, CLS, TBT and test conditions. INP requires field/interaction data; do not equate lab TBT with measured INP.

## Deployment instructions (not executed)
1. Review git diff on codex/seo-lead-generation and commit approved changes. Baseline rollback commit is in SEO-AUDIT.md.
2. Use the existing Node/Next hosting pipeline: npm ci, npm run build, npm run start. Provide the environment settings from SEO-LEAD-TRACKING.md. Existing next/font build needs access to Google Fonts or the cache.
3. Deploy a protected or noindex staging environment first. The application's production robots is indexable: configure staging-wide X-Robots-Tag: noindex at the host or require authentication. Do not submit staging to Search Console.
4. Complete staging checks, then request explicit production deployment approval. No DNS, hosting or external account changes were performed here.
5. After approved release, verify actual HTTP status, canonical host, redirects, metadata, OG image, robots, sitemap, 404s, image optimization and one controlled successful inquiry.
6. If a release fails, redeploy the previous build or revert the implementation commit. Preserve lead records and any later code changes.

## Search Console and local presence
- [ ] Owner verifies the property; submit the production sitemap and inspect representative new/existing URLs. Watch selected canonical, crawl failures and excluded pages. Submission does not guarantee indexing.
- [ ] Confirm Google Business Profile eligibility before creating/editing a profile. Google requires eligible in-person customer contact; online-only businesses do not qualify. A service-area setup is appropriate only when the business actually visits customers. Use the true business name, phone, website and permitted address/area; never add virtual overseas offices. See [Google eligibility guidance](https://support.google.com/business/answer/13763036?hl=en).
- [ ] Verify genuine customer reviews and project permissions; do not manufacture reviews or use the website's unverified rating claim as structured data.

## First 30 days
Complete owner review, delivery testing, GA/GSC setup and production checks. Submit sitemap, record baseline indexing/query data, and review inquiries weekly for response and qualification. Measure mobile performance before changing large videos or animation behavior further. Validate keyword priorities with real country-specific demand.

## Days 31–60
Improve the highest-impression service pages using real buyer questions. Publish one or two reviewed decision guides supported by actual project experience. Review which inquiries become qualified opportunities and strengthen relevant case-study links. Decide whether either geographic draft adds sufficient distinct value; consolidate weak candidates into /locations or /services/web-development.

## Days 61–90
Expand only service/industry/market topics supported by demand, delivery evidence and original content. Review query overlap and consolidate cannibalizing pages. Compare organic qualified leads by service/country/landing page with the baseline, accounting for consent and attribution gaps. Recheck crawl/indexing, conversion errors, Core Web Vitals and lead follow-up performance. Avoid numerical growth guarantees.

## Preview safety update — 6 November 2026
The correct live-domain project is aktech-wupq, production branch main. Use an explicit preview deployment from a clean archive of the reviewed commit. The application now adds noindex/nofollow/noarchive via X-Robots-Tag only when VERCEL_ENV=preview; existing Vercel Authentication remains enabled. Do not use --prod, promote, merge or modify domain settings. The single permitted contact test received success:true; Sheet/Gmail receipt remains for owner confirmation.
