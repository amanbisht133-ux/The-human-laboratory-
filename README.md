# Calisthenics Lab India

Marketing and booking site for [Calisthenics Lab India](https://www.calisthenicslabindia.club), a calisthenics gym in Kondapur, Hyderabad.

It is a single-page React app with no backend. The booking form opens a prefilled WhatsApp chat (+91 88267 62234) and fires a Meta Pixel `Lead` event.

## Commands

```bash
npm install
npm run dev       # local dev server (client-rendered)
npm run build     # type-check, build, then prerender every route to static HTML + sitemap
npm run images    # convert new photos to WebP and refresh src/data/imageSizes.json
npm run lint
```

## How SEO works

- `src/data/business.ts`: name, address, phone, hours, geo and links. Keep them identical to the Google Business Profile.
- `src/seo/pages.ts`: every page's title, description, H1, social image, lastmod and JSON-LD. Add new pages here.
- `npm run build` renders each route with `src/entry-server.tsx` (`scripts/prerender.mjs`), so the HTML for every URL contains its full content, meta tags and JSON-LD. It also writes `404.html` and `sitemap.xml`, and fails if a title exceeds 60 characters, a description exceeds 160, or a page has more or fewer than one H1.
- FAQ text lives in `src/data/faqs.ts`, and the FAQPage schema is generated from it.
- `vercel.json`: clean URLs, 301 from non-www and `/calisthenics-lab` to the home page, and real 404s.
