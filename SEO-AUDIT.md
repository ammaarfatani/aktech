# SEO audit — rechecked 8 November 2026

## Recheck
Next.js 16.2.6 App Router is confirmed. Programmatic registry, sitemap, robots, www-to-apex redirect, draft gating and lead validation were already in the repository. This pass did not redesign the site and did not deploy.

Location records that shared the same benefits and FAQs were rewritten into five distinct review drafts (Karachi, Lahore, UAE, UK, USA). They remain `status: review` with an empty `approvedBy`, so they 404, stay out of the sitemap, and are not linked as live URLs. The /locations hub now names those markets as remote-collaboration contexts, not offices.

No Search Console, Analytics property, keyword-volume tool, or Google Business Profile was accessed. No ranking or traffic numbers are claimed. Core Web Vitals were not measured in this pass.

## Original audit — 5 November 2026

## Baseline and rollback
Clean working tree on main at 04bf8a1d370aaa02e8b8c156724e938f54a5bad3. Work isolated on codex/seo-lead-generation. Review the diff before committing; roll back by reverting the implementation commit or redeploying the baseline. Do not reset or discard subsequent work. No production changes authorized or performed.

## Architecture and strengths
Next.js 16.2.6 App Router, React 19, TypeScript, Tailwind 4; client-rendered interactive components are server-prerendered by Next. Existing service routes, case studies and products, reusable navigation, JSON-LD, metadata, robots and sitemap. Fonts use next/font with swap. English document language and responsive utilities already present. Real configured Karachi locality, phone and WhatsApp reused.

## Initial findings / priority
- P0: Seven client service pages inherit /services metadata and canonical; absent from sitemap.
- P0: Contact browser POST retries after CORS failure and treats opaque response as success; can duplicate leads or report unconfirmed delivery. Private submissions stored indefinitely in localStorage. No local server validation/rate limit.
- P1: /og-image.jpg missing. Sitemap marks every URL freshly updated on each execution.
- P1: ProfessionalService includes city-centre coordinates, hours and price range with no supporting configuration. Remove unverified details.
- P1: /work and /portfolio render identical content. Consolidate canonical without deleting either URL.
- P1: Hero #contact link does not match footer #contact-cta. Service discovery incomplete for ERP.
- P2: Image optimization globally disabled; large JPGs (up to 3.8MB), video hero (~7.5MB), global forced 2-second loader, motion/cursor/physics increase load and interaction risks. No field Core Web Vitals access.
- P2: Existing form labels are not programmatically connected. Extensive animation requires reduced-motion review. Preserve design and existing case-study copy; claims/testimonials need owner evidence review.
- Missing: governed content registry, publication checks, page-specific service schema, privacy-conscious conversion events, qualified-lead reporting and content/market editorial plan.

## Scope
Improve seven existing services and a controlled eight-page non-location pilot using real portfolio references. Prepare location/country content in review only, without public preview. Reuse server templates for service, industry, technology, solution and geographic records. No keyword volumes, ranking results, Google account access, physical overseas offices or client outcomes inferred.

## Measurement limits
Repository inspection is not a live ranking audit. Baseline lint recorded in output/seo-lint-before.txt. Build, route checks and implementation validation recorded below after changes. No Search Console, GA or keyword tool connected. No production form submissions will be made as tests.

## Implementation delivered
- Fifteen-page pilot: seven existing service pages with unique canonical/meta/schema, eight explicit new server-rendered landing records; additional remote-working hub and two unpublished geographic review records.
- Sitemap includes service and approved landing routes; no fabricated build-time lastmod for unchanged legacy pages. /work canonicalized to /portfolio without removing either route.
- Generated social image; removed unverified schema hours, coordinates and price range; escaped JSON-LD; added draft/404 publication gating and validation.
- Server-validated contact proxy, bounded best-effort rate limits, honeypot, size limit and confirmed-response semantics; country and contact preference fields; optional budget and accessible labels; private browser backups removed.
- Opt-in GA preparation, query-free manual pageviews and conversion events, GSC metadata configuration. No GA/GSC verification performed.
- Contextual WhatsApp messages, service directory, footer links and broken hero contact anchor fixed. Crawl found /case-studies/crypto-bitcoin linked from the portfolio although no case-study record exists: case-study CTA now appears only for actual records; all portfolio visuals preserved.
- Enabled Next image optimization and removed the artificial 2-second global loading overlay. Compact mobile AI launcher preserves the assistant while reducing overlap with form controls. Added skip navigation.

## Performance and accessibility evidence
Initial image configuration disabled optimization; hero videos are multi-megabyte files and global client interactions remain substantial. New landing content is static server output. No before/after Lighthouse score or field Core Web Vitals metric was measured; no performance score is claimed. Browser inspection verified the e-commerce page at 390px, contact form at 390px and technology page at 1440px: no horizontal overflow, one landing-page H1, service preselection and associated form labels. This is representative QA, not an exhaustive accessibility audit. Existing animations and video assets warrant a measured follow-up.

## Remaining risks
- Real contact delivery and receiver acknowledgment contract need owner verification before launch. Unit tests mock the receiver and never send external inquiries.
- Process-local rate limiting is not a distributed anti-abuse service; configure hosting/receiver protection for multi-instance production.
- Analytics is prepared but real property events and consent withdrawal require account-assisted QA; attribution across pages is not implemented. No organic lead or ranking results claimed.
- Existing testimonials, satisfaction percentages, project/client counts and 24-hour response promises remain owner claims requiring evidence. Public homepage retrieval confirmed these claims are also present on the existing site; they were not introduced by the pilot.
- Non-www remains the repository canonical. Hosting TLS/redirect alignment and Google selected canonicals require production checks.
- Geographic drafts intentionally do not count as published pilot pages. No country-specific expertise, office or legal compliance was invented.
- New content validation checks completeness and references, not truthfulness or editorial originality. Owner signoff before release remains part of the workflow.

## Final verification — 6 November 2026
| Check | Result / evidence |
|---|---|
| Production build | PASS; output/seo-build.txt; all pilot routes statically generated |
| TypeScript | PASS after refreshing stale Next development route types; output/seo-types.txt empty |
| Automated tests | 24/24 PASS; output/seo-tests.txt; registry failures, draft exclusion, lead validation/limits, mocked delivery, analytics consent and query exclusion |
| Production HTTP crawl | PASS: 35 pages and 36 internal targets; output/seo-http-results.json; zero broken targets |
| Canonical/meta/schema | One expected canonical per crawled page, description, indexability and parseable JSON-LD checked |
| Sitemap/robots | Expected services included; review pages excluded; robots references canonical sitemap |
| Redirects/status | www host 308, trailing slash 308, unknown/review URLs 404, invalid form request 400 |
| Social image | /opengraph-image returns image content with 200 |
| Focused lint | PASS for new SEO components/utilities, contact handler/form, analytics/tracking, WhatsApp and test scripts; output/seo-changed-lint.txt |
| Repository lint | FAIL: 19 errors, 59 warnings; baseline 19 errors, 61 warnings. Existing errors include CommonJS audit files under output/verification, unescaped JSX in existing services, effect-state rules in work/assistant and assistant purity rules. No new error count added. |
| Browser QA | Representative 390px and 1440px layouts checked as described above; not a full device or assistive-technology certification |
| External services | No successful production form test, GA/GSC verification, Google Business Profile creation, or deployment performed |

Public-source research is documented in SEO-KEYWORD-STRATEGY.md. A successful web retrieval of https://aktech.tech/ is not a ranking or indexing test; www availability could not be established by that web tool.

## Delivery file inventory
Implementation and documentation files created or modified (logs are listed separately):

- `PROGRAMMATIC-SEO-GUIDE.md`
- `SEO-AUDIT.md`
- `SEO-KEYWORD-STRATEGY.md`
- `SEO-LAUNCH-CHECKLIST.md`
- `SEO-LEAD-TRACKING.md`
- `next.config.ts`
- `package.json`
- `scripts/load-ts.cjs`
- `scripts/seo-http.mjs`
- `scripts/seo.test.cjs`
- `src/app/api/contact/route.ts`
- `src/app/contact/page.tsx`
- `src/app/industries/[...segments]/page.tsx`
- `src/app/layout.tsx`
- `src/app/locations/[...segments]/page.tsx`
- `src/app/locations/page.tsx`
- `src/app/opengraph-image.tsx`
- `src/app/services/[slug]/page.tsx`
- `src/app/services/ai-agent/layout.tsx`
- `src/app/services/crm-business-systems/layout.tsx`
- `src/app/services/erp-systems/layout.tsx`
- `src/app/services/layout.tsx`
- `src/app/services/mobile-app-development/layout.tsx`
- `src/app/services/seo/layout.tsx`
- `src/app/services/uiux-design/layout.tsx`
- `src/app/services/web-development/layout.tsx`
- `src/app/sitemap.ts`
- `src/app/solutions/[slug]/page.tsx`
- `src/app/technologies/[slug]/page.tsx`
- `src/app/work/layout.tsx`
- `src/app/work/page.tsx`
- `src/components/seo/LandingPage.tsx`
- `src/components/seo/ServiceDirectory.tsx`
- `src/components/shared/AIAssistant.tsx`
- `src/components/shared/Analytics.tsx`
- `src/components/shared/ConversionTracking.tsx`
- `src/components/shared/Footer.tsx`
- `src/components/shared/JsonLd.tsx`
- `src/components/ui/WhatsAppButton.tsx`
- `src/config/site.ts`
- `src/data/seo-pages.json`
- `src/data/seo-services.json`
- `src/lib/analytics.ts`
- `src/lib/lead-validation.ts`
- `src/lib/seo-validation.ts`
- `src/lib/seo.ts`
- `src/sections/home/Hero.tsx`

Verification artifacts are the `output/seo-*` logs and JSON report. Temporary implementation scripts were removed. Existing output/verification files were preserved. No dependency added, no credentials changed, no commit or deployment performed.

## Predeployment review — 6 November 2026
Vercel authentication was refreshed and verified. The correct project is **aktech-wupq** (prj_3djZrggpZsu14d32Hlrjh80XEiwI), owner team_tq2RaiT49npNelHWJqUJVvme. It owns both aktech.tech and www.aktech.tech, is linked to ammaarfatani/aktech, and uses **main** as production. Current production is dpl_HFMNVGLuGzBzjEQmzrgnMLoF5ytY at baseline commit 04bf8a1d370aaa02e8b8c156724e938f54a5bad3. Other similarly named projects are not the live-domain target. Both live domains returned 200 before these changes; no existing redirect loop was observed.

The explicit VERCEL_ENV=preview header rule applies X-Robots-Tag: noindex, nofollow, noarchive to every preview response, including legacy pages. Production gets no such header from this rule. Tests cover preview, production and unset environments. Existing Vercel Authentication protection remains enabled; do not disable it to test.

Exactly one user-authorized dummy contact submission was made through the current contact handler. Google Apps Script returned HTTP 200 with success:true, and the handler returned HTTP 200 with success:true. No receiver code, Sheet, Gmail notification, environment variable or integration was changed. The owner still needs to confirm the AKTECH SEO TEST row and notification; a success acknowledgment alone does not independently prove the inbox/Sheet contents. No second test is authorized.

WhatsApp links consistently use +92 371 3410797. The floating service button and new landing CTAs supply contextual inquiry text; existing generic contact/social links intentionally open the same number without a prefilled message. No WhatsApp messages were sent.

Deploy only a clean archive of the reviewed commit to the verified project with the explicit preview environment. Do not push or merge main. .vercelignore excludes local logs, environment files, credentials and build caches. Production, DNS and production environment variables remain unchanged. Vercel uses Node 24.x; local Node 22 checks are supplemented by the actual preview build.

### Predeployment check results
Preview-mode production build PASS; TypeScript PASS; 25/25 tests PASS; focused lint PASS. Production-server crawl PASS across 35 pages and 36 internal targets, including noindex response headers for all checked pages and correct WhatsApp number/message checks. The repository-wide lint scan remains at its pre-existing 19 errors and 59 warnings; no new error count was introduced. The owner confirmed the single test was received in both Google Sheets and Gmail. No design changes were made during this predeployment round; the prior representative responsive checks and preserved route/component review remain applicable.
