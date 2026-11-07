# Publishing Insights articles

AKTECH Insights is Git-based. There is no paid CMS. Articles live in `src/data/insights.ts` and appear on the site after a Vercel deployment.

## Add an article

1. Open `src/data/insights.ts`.
2. Copy an existing object in `insightArticles`.
3. Set:
   - `slug` — URL path, lowercase, hyphenated, unique
   - `title` and `description` (used for meta title/description)
   - `category` — one of `INSIGHT_CATEGORIES`
   - `tags`
   - `date` — publication date `YYYY-MM-DD` (use the day you publish, not a backdated date)
   - `readingTime`
   - `status` — `"draft"` until you are ready; `"published"` to show on `/insights`, sitemap, and article routes
   - `ctaLabel` / `ctaHref`
   - `body` — paragraphs; headings start with `## `; internal links use `[label](/path)`
4. Covers are generated from category (no stock photos required). Optional later: add an image under `public/insights/` and wire it in the Insights components.
5. Commit and deploy. Preview deployments stay noindex via existing robots rules.

## Drafts

Keep `status: "draft"` until the article is finished. Drafts are omitted from `publishedInsights()`, so they are not listed, not in the sitemap, and not statically generated as public article pages.

## Do not

- Invent statistics, customer quotes, or awards
- Publish empty “coming soon” posts
- Duplicate titles or slugs
