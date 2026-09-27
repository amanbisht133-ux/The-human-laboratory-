// Generates per-route static HTML from dist/index.html so crawlers see the
// correct title/description/canonical/JSON-LD on first fetch, instead of the
// homepage's tags (the useSEO hook only fixes them client-side, after JS runs).
// Keep the title/description/schema values below in sync with the matching
// useSEO() call and JsonLd schema constants in src/pages/*.tsx.
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const baseUrl = 'https://www.calisthenicslabindia.club';

const LOCAL_BUSINESS_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "Calisthenics Lab India",
    "description": "Calisthenics and bodyweight strength training academy in Madhapur, HITEC City, Hyderabad. Group coaching batches, one-on-one personal training, and a dedicated kids calisthenics & gymnastics program.",
    "url": `${baseUrl}/calisthenics-lab`,
    "image": `${baseUrl}/images/cali_trainers_brochure_v2.jpg`,
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Madhapur, HITEC City, Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
    },
    "telephone": "+918826762234",
    "openingHours": "Mo-Fr 06:30-22:00",
    "priceRange": "₹₹",
    "sameAs": [
        "https://www.instagram.com/calisthenics.lab.india"
    ]
};

const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Where is Calisthenics Lab India located?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We're based in Madhapur, HITEC City, Hyderabad, Telangana. Find us on Google Maps: https://maps.app.goo.gl/695SVZHotKEeK4zJ7"
            }
        },
        {
            "@type": "Question",
            "name": "What programs does Calisthenics Lab India offer?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Structured weekday group coaching batches (morning and evening), a weekend reset batch, one-on-one personal training, and a dedicated weekend kids program covering calisthenics and gymnastics fundamentals."
            }
        },
        {
            "@type": "Question",
            "name": "Is calisthenics suitable for complete beginners?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Coaching is structured by level, starting with foundational bodyweight movements — push-ups, rows, squats, mobility work — before progressing to skills like pull-ups, dips, and handstands."
            }
        },
        {
            "@type": "Question",
            "name": "Does Calisthenics Lab India offer training for kids?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes — a dedicated weekend program for young learners covering calisthenics and gymnastics fundamentals in a structured, age-appropriate format."
            }
        },
        {
            "@type": "Question",
            "name": "How long does it take to learn a muscle-up or handstand?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most consistent beginners build the base for a first muscle-up in 3–5 months of regular training. Handstand progress varies, but structured progressions typically yield freestanding balance within 4–6 months of dedicated practice."
            }
        }
    ]
};

const YOG_LAB_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "The Yog Lab",
    "description": "Yoga and intentional movement studio in Madhapur, HITEC City, Hyderabad. Monday, Wednesday, Friday sessions with structured plans for all levels.",
    "url": `${baseUrl}/yog-lab`,
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Madhapur, HITEC City, Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
    },
    "telephone": "+918826762234",
    "openingHours": "Mo 06:30-08:30, We 06:30-08:30, Fr 06:30-08:30",
    "priceRange": "₹₹",
    "sameAs": [
        "https://www.instagram.com/calisthenics.lab.india"
    ]
};

const routes = [
    {
        path: 'calisthenics-lab',
        title: 'Calisthenics Lab India | Bodyweight Training in Madhapur, Hyderabad',
        description: 'Calisthenics and bodyweight strength training in Madhapur, HITEC City, Hyderabad. Group coaching, personal training, and kids calisthenics program. All levels welcome.',
        schemas: [LOCAL_BUSINESS_SCHEMA, FAQ_SCHEMA],
    },
    {
        path: 'yog-lab',
        title: 'The Yog Lab | Yoga Classes in Madhapur, Hyderabad — Mon, Wed, Fri',
        description: 'Structured yoga and intentional movement classes in Madhapur, HITEC City, Hyderabad. Monday, Wednesday, Friday sessions. Monthly, quarterly, and yearly plans available.',
        schemas: [YOG_LAB_SCHEMA],
    },
];

function escapeAttr(value) {
    return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function escapeText(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

for (const route of routes) {
    const url = `${baseUrl}/${route.path}`;
    let html = template;

    html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeText(route.title)}</title>`);
    html = html.replace(
        /<meta name="description" content=".*?" \/>/,
        `<meta name="description" content="${escapeAttr(route.description)}" />`
    );
    html = html.replace(
        /<meta property="og:title" content=".*?" \/>/,
        `<meta property="og:title" content="${escapeAttr(route.title)}" />`
    );
    html = html.replace(
        /<meta property="og:description" content=".*?" \/>/,
        `<meta property="og:description" content="${escapeAttr(route.description)}" />`
    );
    html = html.replace(
        /<meta property="og:url" content=".*?" \/>/,
        `<meta property="og:url" content="${escapeAttr(url)}" />`
    );
    html = html.replace(
        /<meta name="twitter:title" content=".*?" \/>/,
        `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`
    );
    html = html.replace(
        /<meta name="twitter:description" content=".*?" \/>/,
        `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`
    );
    html = html.replace(
        /<link rel="canonical" href=".*?" \/>/,
        `<link rel="canonical" href="${escapeAttr(url)}" />`
    );

    const jsonLdScripts = route.schemas
        .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
        .join('\n    ');
    html = html.replace('</head>', `    ${jsonLdScripts}\n  </head>`);

    const outDir = join(distDir, route.path);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    console.log(`Generated ${route.path}/index.html`);
}
