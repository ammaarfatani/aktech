# Lead tracking and operations

## Configuration
Keep credentials in the deployment environment; do not commit real IDs or secrets. Current optional variables:

```dotenv
NEXT_PUBLIC_GA_ID=G-REPLACEWITHYOURID
NEXT_PUBLIC_GSC_VERIFICATION=replace-with-url-prefix-verification-token
CONTACT_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT/exec
```

GA only loads for a syntactically valid ID after the visitor enables optional analytics in the footer. Search Console verification is rendered through Next metadata. No GTM is added, avoiding duplicate installations. Public IDs are not secrets. CONTACT_WEBHOOK_URL is server-only; when unset the route retains the existing repository Google Apps Script endpoint. Existing N8N_WEBHOOK_URL remains untouched.

## Contact delivery contract — required launch verification
The browser POSTs to /api/contact. The server validates field types, lengths, required data, service/contact choices, phone requirement, origin, JSON content type and a 16KB streamed request limit. A honeypot rejects obvious spam. One request per attempt is sent to the configured existing receiver with a 15-second timeout. No automatic retries. Success requires HTTP success plus JSON `{ "success": true }` or `{ "status": "success" }`; a login page, opaque response or unrecognized body is not accepted as delivery.

The external Apps Script implementation is not in this repository. An owner must verify its response contract and that the lead is actually persisted before returning success. Verify it accepts country, preferredContact and landingPath alongside existing fields fullName, email, phone, company, service, timeline, budget and description. The website implementation is ready, but successful live receipt is unverified. An ambiguous timeout may occur after receipt; the UI asks visitors to contact WhatsApp before resending. Add receiver-side idempotency for stronger delivery guarantees in a later integration change.

Rate limits are bounded, process-local maps: 5 attempts per normalized-email hash / 15 minutes and a global 100 requests / 15 minutes. They are best-effort protection, reset on restart, do not coordinate across instances and can be bypassed by rotating email addresses. For scaled/serverless deployment, configure the hosting provider's shared rate limit or a durable store; do not trust arbitrary forwarded IP headers. The Google endpoint was already publicly embedded in the old site, so receiver-side validation/rate limits remain important. No IP or form data is logged by this handler.

Old browser backups containing private inquiry data are removed when the contact form mounts. New form values are never persisted in localStorage. Analytics preference is the only new stored value. Agree access control, retention and deletion procedures for the existing Google receiver before launch; review the visible privacy notice for the actual deployment.

## Events and privacy
| Event | Trigger | Meaning |
|---|---|---|
| generate_lead | One confirmed form response | Inquiry accepted by receiver, not a qualified sale |
| whatsapp_click | Delegated click on a wa.me link | Contact intent, not proof of a sent message |
| phone_click | Delegated click on tel link | Call intent, not completed call |
| consultation_request | Dedicated discovery CTA click | Request intent, not a calendar booking |
| page_view | Initial load and pathname changes after opt-in | Sanitized origin/path, no query or referrer |

One delegated click listener prevents per-button duplicate events. No name, email, phone, free text, WhatsApp message, company or full query string is sent in explicit analytics events. Form events include an allowlisted service value. The server receiver gets the originating landing path from the CTA; analytics conversions report the current page path. There is no calendar integration or booking-confirmed event. Verify GA Enhanced Measurement settings: disable automatic form interaction and history/pageview tracking because this application sends manual pageviews and lead events; audit outbound click settings before enabling collection. Do not install a second GA snippet through hosting or GTM.

## Setup and reporting
1. Owner creates/chooses the GA4 property and sets the ID. Check consent off/on, exactly one pageview per navigation, and one generate_lead per confirmed test receipt in DebugView. Mark generate_lead as the primary key event; clicks are secondary intent events.
2. Owner adds the Search Console property. A URL-prefix property can use the configured meta token; a domain property requires an owner-managed DNS verification step. No DNS was changed. Submit https://aktech.tech/sitemap.xml after production verification.
3. Weekly: record clicks, impressions, CTR and average position by query/page/country in Search Console, plus index coverage and excluded URLs. These are not available yet.
4. Record received and qualified inquiries in the existing lead store with service, country, landing path, received date, status and qualification reason. Restrict personal data access. Do not export private details into GA.
5. Monthly: compare organic landing sessions with consented conversions, and report consent-related undercount. Qualification rate = qualified inquiries / received inquiries. Organic inquiry conversion rate requires reliable organic attribution and a consistent session denominator; this pilot does not yet persist acquisition channel or UTM attribution across pages.

Dashboard columns: period, service, country, landing page, impressions, clicks, CTR, average position, indexed pages, organic sessions, confirmed inquiries, qualified leads, conversion rate. Country in GA is approximate geography; country supplied in the form is a separate field. Never label all inquiries organic without attribution evidence.

## Verified contact test — 6 November 2026
With explicit owner permission, exactly one dummy inquiry (AKTECH SEO TEST, test@example.com, Pakistan, Web Development, "Deployment verification only—please ignore") was sent through the current server handler to the existing Apps Script URL. Upstream returned HTTP 200 JSON success:true; the application handler returned HTTP 200 JSON success:true. No integration settings were changed. The owner will check the Google Sheet and automatic Gmail notification manually. Do not resend the test without new permission.

The owner subsequently confirmed **received in both** the Google Sheet and Gmail. The existing integration passed the end-to-end delivery check; no second submission was sent.
