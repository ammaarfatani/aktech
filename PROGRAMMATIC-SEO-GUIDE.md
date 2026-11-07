# Programmatic SEO guide

## Architecture
Existing routes and interactive designs remain. Seven service-specific server layouts supply metadata and Service schema to the existing client pages. `src/data/seo-services.json` records their keyword ownership. `src/data/seo-pages.json` contains eight non-location pilot records and two geographic records in review. `src/lib/seo.ts` validates records at import and exposes only approved published records. `LandingPage.tsx` renders server content, portfolio links, visible FAQs, service schema, breadcrumbs and service-aware quote/WhatsApp CTAs.

Route adapters use asynchronous Next.js 16 params and generateStaticParams. /services/[slug], /technologies/[slug], /industries/[...segments], /solutions/[slug] and /locations/[...segments] share one template. Each record carries its own introduction, context, use cases, technology options, process and FAQs. No Cartesian-product generation. Unknown, draft and review URLs return 404 and are omitted from sitemap and public link lists. There is no unauthenticated draft preview.

## Publication process
1. Choose an unmet buyer need and check existing routes to avoid cannibalization. Prefer improving a current page when scope overlaps.
2. Add a record in draft. Set path, kind, primary/secondary keywords, intent, title, description, canonical, H1, introduction, context, benefits, stack, portfolio references, process, FAQs, related routes, CTA, service, updated date and approvedBy.
3. Use only repository portfolio slugs with relevant factual support. An empty portfolio list is allowed when there is no matching case study; do not invent one.
4. Move to review. A human editor should verify business capabilities, accuracy, independent value, claims, permissions and useful internal links. Location pages require explicit owner content approval before publication.
5. Set approvedBy to the actual reviewer and status to published after approval. Update the meaningful content date. Pilot non-location pages were reviewed against repository scope during implementation; they still need business-owner review before deployment.
6. Run npm run test:seo, npm run build and npx tsc --noEmit. Inspect the page, metadata, rendered schema and sitemap. Build runs tests automatically and fails validation on invalid published content.
7. Link from a relevant existing page. The service directory currently discovers every pilot record. Add contextual links when content is expanded, rather than hundreds of sitewide links.

## Adding services and locations
For a new service, create a /services record only after confirming capability. For existing designed services, retain the page and maintain its SEO layout and seo-services record together. Add any new static service to route validation and sitemap. All public pages should be reachable from /services or a relevant hub.

For a city use /locations/country/city/service; for a country use /locations/country/service. Start in review and document remote delivery, actual business location, stakeholder needs and specific useful content. Do not merely change city names. The /locations hub communicates remote working without unverified local offices. Future distinct languages or regional editions require a separate canonical/hreflang design; do not add hreflang to these pages.

## Validation and canonical policy
Validators reject duplicate paths (including existing service conflicts), malformed paths, invalid/self-inconsistent canonicals, duplicate published titles/descriptions, missing approval or metadata, incomplete content, invalid dates, nonexistent portfolio references and links to drafts/unknown targets. These checks cannot judge originality or truth; editorial review remains mandatory.

Preserve the repository's canonical https://aktech.tech host. next.config.ts redirects www to non-www with a permanent redirect, retaining paths. Verify hosting does not enforce the opposite direction before deployment. HTTPS enforcement belongs at the host; localhost remains HTTP. Next handles trailing-slash removal. /work remains accessible but canonicalizes to /portfolio and is excluded from sitemap because both render the same page. Deleted content should return 404 unless a genuinely equivalent replacement justifies a permanent redirect.

## Pilot inventory
Seven improved pages: /services/web-development, /services/crm-business-systems, /services/erp-systems, /services/ai-agent, /services/mobile-app-development, /services/seo, /services/uiux-design.

Eight new pages:
- /services/ecommerce-development
- /services/custom-software-development
- /technologies/nextjs-development
- /technologies/react-development
- /industries/education/website-development
- /industries/retail/ecommerce-development
- /industries/restaurants/business-systems
- /solutions/lead-management-automation

Additional hub: /locations. Unpublished review records: /locations/pakistan/karachi/website-development and /locations/uae/web-development.
