# Knowledge Base: Calisthenics Lab India website

> Updated 2026-10-29 on branch `feat/cinematic-upgrade` (not yet committed): multi-page, prerendered, SEO build.

## 1. What this is

The marketing and lead-capture site for **Calisthenics Lab India (CALI)**, a calisthenics academy in Kondapur, Hyderabad. It has a home page with adult batches, pages for kids, personal training, about, contact and a blog, plus the Goa retreat and The Yog Lab (yoga, listed last in the navigation).

- Live domain: `https://www.calisthenicslabindia.club` (www is canonical)
- Repo: `github.com/amanbisht133-ux/The-human-laboratory-`
- Hosting: Vercel, as static prerendered HTML
- There is no backend. Bookings go to **WhatsApp** as a prefilled message, and leads are tracked with the **Meta Pixel**.

## 2. Tech stack

| Area | Choice |
|---|---|
| Framework | React 19 + TypeScript ~6.0, Vite 8 (rolldown) |
| Rendering | Every route is prerendered at build time (`react-dom/static` `prerender` + `StaticRouter`), then hydrated in the browser |
| Routing | react-router-dom 7, routes in `src/AppRoutes.tsx`; unknown paths render `NotFound` (Vercel serves `404.html` with status 404) |
| Styling | Tailwind CSS v4; theme tokens in `src/index.css` `@theme` |
| Icons | `lucide-react` + Google Material Symbols font (review stars and carousel arrows) |
| Images | WebP via `npm run images` (sharp); sizes in `src/data/imageSizes.json` |
| Analytics | Meta Pixel `1608877717310193` |

Scripts: `npm run dev`, `npm run build` (= `tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs`), `npm run images`, `npm run lint`.

## 3. File map

```
index.html                  HTML template (default meta tags, fonts, Pixel, no-JS fallback for .reveal)
vercel.json                 cleanUrls, 301s (non-www → www, /calisthenics-lab → /), asset caching
scripts/prerender.mjs       Renders each route into dist/<route>.html with its own head + JSON-LD,
                            writes dist/404.html and dist/sitemap.xml, enforces title ≤60, desc ≤160, one H1
scripts/optimize-images.mjs JPG/PNG → WebP + src/data/imageSizes.json
public/                     robots.txt, llms.txt, favicon, images/ (WebP + JPGs used for social previews)
src/
  main.tsx                  Browser entry: hydrates prerendered HTML (createRoot in dev)
  entry-server.tsx          Build-time render(url) used by the prerender script
  AppRoutes.tsx             Route table (lazy pages)
  seo/pages.ts              ★ SEO registry: title, description, H1, image, lastmod, JSON-LD per page
  data/business.ts          ★ NAP, hours, geo, links. Must match the Google Business Profile
  data/faqs.ts              Visible FAQ text; FAQPage schema is generated from it
  data/programs.ts          Pricing, batch timings, weekly schedule, Yog Lab plans
  data/blog.ts              Blog posts
  data/goaRetreat.ts        Retreat content
  data/nav.ts               Header/footer links (Yog Lab last)
  hooks/usePageMeta.ts      Applies a page's meta + JSON-LD after client-side navigation
  hooks/useReveal.ts        Scroll-reveal observer
  components/               Layout, SiteHeader, SiteFooter (NAP + hours), PageHero (breadcrumb + H1),
                            ContactButtons (Call/WhatsApp), FaqList, GoaRetreatPopup, RetreatSpotlight
  pages/                    CaliLab (/), KidsCalisthenics, PersonalTraining, About, Contact, Blog,
                            BlogPost (/blog/:slug), GoaRetreat, YogLab, NotFound
```

### Routes

| Path | Page |
|---|---|
| `/` | Home: adult calisthenics batches, plans, FAQ |
| `/kids-calisthenics` | Kids calisthenics & gymnastics |
| `/personal-training` | One-on-one coaching |
| `/about` | Founder and team |
| `/contact` | Map, address, hours, phone |
| `/blog`, `/blog/:slug` | 3 posts |
| `/goa-retreat` | Strength & Stillness retreat |
| `/yog-lab` | The Yog Lab yoga classes |

## 4. Page anatomy (`src/pages/CaliLab.tsx`)

2. **Hero**: background image, CALI logo, the H1 "Calisthenics Academy in Kondapur, Hyderabad", an intro paragraph linking to the service pages, the tagline "BY THE COMMUNITY / FOR THE COMMUNITY", the line "Experiment. Evolve. Repeat.", Maps/Instagram/Email icons, and a **Book Now** button.
3. **Accordions**: The Calisthenics Advantage · Calisthenics vs Gym · The Weekday Operation · The Weekend Reset.
4. **Free demo CTA card**, which opens the booking modal.
5. **Community photo collage** (`cali_trainers_brochure_v2.jpg`), followed by **Our Schedule** (weekly focus), then **Choose Your Plan** (membership table, weekend membership, Timings). All of these are built from `WEEKLY_SCHEDULE`, `PRICING_TIERS` and `BATCH_TIMINGS`.
6. **"What You're Going To Get"**: Training Programs Include · Why Choose Cali?.
7. **Testimonials carousel**: reviews are tripled and auto-scrolled with `requestAnimationFrame`. It pauses on click or arrows (10 s) and only runs while in view. Avatars are ui-avatars initials.
8. **Community collage.**
9. **FAQ**, rendered from `homeFaqs` in `src/data/faqs.ts`, so the visible text and the schema can't diverge.
10. **Booking modal.**

### Booking flow
Name → Email → Phone (10 digits) → Batch → Duration → Timing (skipped for Personal Training) → price ("Energy Exchange") → submit. Validation is custom only (`noValidate`). On submit it fires the Pixel `Lead` event, then after 1.5 s opens `api.whatsapp.com/send?phone=918826762234&text=…`. If the popup is blocked, it redirects the current tab instead.

### Pricing (`PRICING_TIERS` in `src/data/programs.ts`)
| Batch | 1 Day | 1 Month | 3 Months | 6 Months | 1 Year |
|---|---|---|---|---|---|
| Weekday Batch | ₹800 | ₹7,777 | ₹22,222 | ₹44,444 | ₹77,777 |
| Weekend | ₹800 | ₹5,555 | ₹15,151 | ₹31,313 | ₹60,606 |
| Kids Batch | ₹800 | ₹5,555 | ₹15,151 | ₹31,313 | ₹60,606 |
| Personal Training | Consultation | Consultation | – | – | – |

### Timings (`BATCH_TIMINGS`, grouped as `{ heading: slots[] }`)
- Weekday Batch: Morning 6:30–9:30 AM (3 × 1 h), Evening 6–9 PM (3 × 1 h)
- Weekend: Morning 8:30–10:00 AM (1.5 h) and 10–11 AM (1 h); Evening 5:30–7:00 PM (1.5 h) and 7–8 PM (1 h)
- Kids Batch: Weekday 5–6 and 6–7 PM, Weekend 9–10 AM
- A 1-hour weekend slot is ₹4,444/month (`WEEKEND_ONE_HOUR_MONTHLY`, applied by `getPrice()`). 1.5-hour slots use the Weekend tier.
- Weekly focus (`WEEKLY_SCHEDULE`): Mon push & pull · Tue legs & core · Wed skills & upper body · Thu full-body endurance · Fri skills / upper body

## 4a. Design system ("ember on obsidian")

Defined in `src/index.css`. Use these rather than hard-coding colours.

| Piece | What it is |
|---|---|
| `bg-ink` / `--color-ink` | Page background `#0a0a0b` |
| `.ember-text`, `.ember-bg` | Orange gradient (`#ffb15c` → `#f38320` → `#e2531a`) as text or fill |
| `.btn-ember` | Primary CTA: gradient pill with a shine sweep on hover |
| `.glass` | Frosted card (translucent fill, blur, hairline border) |
| `.edge-ember` | Gradient hairline border. Pair with `.glass` and a `rounded-*` class |
| `.eyebrow` | Small orange label above a heading, with fading side lines |
| `.hairline`, `.section-glow` | Divider line; soft orange glow at the top of a section |
| `.reveal` | Fades and slides up when scrolled into view (`useReveal`; respects reduced motion; visible without JS) |
| Fonts | `font-condensed` = Bebas Neue for display headings; body = Lexend (`font-sans`) |

Shared components in `CaliLab.tsx`: `SectionHeading`, `Accordion`, `FeatureCard`, `CheckList`, `BatchBadge`, `SlotList`. A body-wide film-grain overlay is in `body::after`. The skills ticker under the hero reads from `SKILLS`.

## 4b. Goa retreat ("Strength & Stillness", 10–13 Dec 2026)

- **Page:** `/goa-retreat` → `src/pages/GoaRetreat.tsx`, built from the brochure `Strength-and-Stillness-Brochure-v2.pdf`. The main information is up front: cover, a short intro, six experience cards (tap one for its description) and pricing with the reserve CTA (**Register now** → Tally form `https://tally.so/r/dbWe7o`, `RETREAT_REGISTER_URL`, plus **Ask on WhatsApp**). Everything else is in the "Everything you need to know" accordions: the journey (day tabs), the stay, the guides, booking and cancellation, the full invitation, and the community collage.
- **Content:** all copy, prices and the schedule live in `src/data/goaRetreat.ts`. The page, the popup and the home section all read from it.
- **Images:** `public/images/goa/*.webp`, extracted from the PDF.
- **Popup:** `src/components/GoaRetreatPopup.tsx`, titled "Upcoming GOA Retreat". It's a small centred card capped to the screen height, with dates, early-bird price, **Register now** (Tally) and a "View retreat details" link. It appears 2 s after the home page loads, once per page load: a reload shows it again, but going to the retreat page and back does not. It closes on ×, Esc, the backdrop or "Maybe later".
- **Home section:** `src/components/RetreatSpotlight.tsx`, "Upcoming Activity / Beyond The Lab", placed between Plans & Timings and the Method accordions.
- **Look:** brochure palette `bg-sand` `#f1eeea`, `text-espresso` `#1c1813`, `text-rust` `#c4652e`, `text-taupe`; fonts `font-italiana` (headlines), `font-dm` (body), `font-work` via `.brochure-label` (spaced caps) and `font-crimson` (prices); button `.btn-rust`.
- **SEO:** title, description, image and Event schema are in `src/seo/pages.ts`.
- **Tracking:** Register buttons fire a Pixel `Lead` event (`Goa Retreat Registration`); the WhatsApp button fires `Contact`.

## 5. Business facts (source: `src/data/business.ts`)

- Address: Kondapur Road, Kondapur, New Hafeezpet, Raghavendra Colony, Gachibowli, Hyderabad, Telangana 500084, India
- Geo: 17.4731247, 78.3641366. Nearby (not our address): HITEC City, Gachibowli, Madhapur
- Phone/WhatsApp: +91 88267 62234 · Email: Calisthenicslabindia@gmail.com
- Hours: Mon–Fri 6:30–9:30 AM and 6:00–9:00 PM; Sat–Sun 8:30–11:00 AM and 5:30–8:00 PM. Kids weekday batches start at 5 PM.
- Yog Lab: Mon/Wed/Fri 6:30–7:30 and 7:30–8:30 AM; ₹3,333/month, ₹8,888/quarter, ₹33,333/year
- Founder: Aman Bisht, a multiple-time national calisthenics champion who has represented India; coaching team of three
- Instagram: `https://www.instagram.com/calisthenics.lab.india` · Google Business Profile: `https://maps.app.goo.gl/695SVZHotKEeK4zJ7`

## 6. SEO setup

- **Add or edit a page's SEO in `src/seo/pages.ts`.** The build fails if a title exceeds 60 characters, a description exceeds 160, or a page has more or fewer than one `<h1>`.
- JSON-LD: SportsActivityLocation (home, contact), FAQPage (home, kids, personal training, Yog Lab), BreadcrumbList (inner pages, mirrored by the visible breadcrumb), Article (posts), Event (Goa retreat). There is no review or rating schema.
- `sitemap.xml` is generated at build time from the registry. `robots.txt` points to it.
- No meta keywords tag.

## 7. Remaining notes

- The brochure PDFs (6.5 MB) are deployed but not linked from the site. They're kept so links shared elsewhere still work.
- Live Google reviews were removed. The old browser-side Places API call couldn't work because of CORS. Adding live reviews later needs a server/edge function. Until then, edit `reviews.json` by hand.
