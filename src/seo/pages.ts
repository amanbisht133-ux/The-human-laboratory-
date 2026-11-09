// SEO registry: one entry per indexable page. Used by the pages (usePageMeta),
// the build-time prerender (head tags, JSON-LD) and the generated sitemap.
import { SITE_URL, business, openingHoursSpecification } from '../data/business';
import { homeFaqs, kidsFaqs, personalTrainingFaqs, yogFaqs, type Faq } from '../data/faqs';
import { blogPosts } from '../data/blog';
import { founder } from '../data/founder';

export type PageMeta = {
    path: string;
    /** Short name used in breadcrumbs and navigation. */
    name: string;
    title: string;
    description: string;
    h1: string;
    /** Absolute or root-relative social preview image. */
    image: string;
    lastmod: string;
    noindex?: boolean;
    schemas: object[];
};

const abs = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path}`);

const FOUNDER_ID = `${SITE_URL}/about#aman-bisht`;

/** Aman Bisht, founder of both academies and the Hyderabad Calisthenics community. */
const founderSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: business.founder.name,
    jobTitle: 'Calisthenics athlete, coach and founder',
    description: founder.summary,
    url: abs(founder.path),
    mainEntityOfPage: abs(founder.path),
    image: abs('/images/goa/aman.jpg'),
    nationality: { '@type': 'Country', name: 'India' },
    homeLocation: { '@type': 'City', name: 'Hyderabad' },
    knowsAbout: ['Calisthenics', 'Street workout', 'Freestyle calisthenics', 'Bodyweight strength training', 'Calisthenics coaching'],
    award: founder.awards,
    // The same person's profile on the sister academy's site
    sameAs: [founder.instagram, 'https://www.indiancalisthenicsschool.com/aman-bisht'],
    worksFor: [
        { '@id': `${SITE_URL}/#business` },
        { '@type': 'SportsActivityLocation', name: 'Indian Calisthenics School', url: 'https://www.indiancalisthenicsschool.com/' },
    ],
    memberOf: { '@type': 'Organization', name: 'Hyderabad Calisthenics', sameAs: ['https://www.instagram.com/hyderabad.calisthenics/'] },
};

/** The founder page is a profile of one person; this tells Google who the page is about. */
const founderProfileSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateModified: '2026-11-10',
    mainEntity: founderSchema,
};

export const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': `${SITE_URL}/#business`,
    name: business.name,
    description: 'Calisthenics academy in Kondapur, Hyderabad: adult group batches, personal coaching, a kids calisthenics, gymnastics & parkour program and yoga at The Yog Lab.',
    url: `${SITE_URL}/`,
    logo: business.logo,
    image: business.image,
    telephone: business.phoneE164,
    email: business.email,
    address: { '@type': 'PostalAddress', ...business.address },
    geo: { '@type': 'GeoCoordinates', ...business.geo },
    hasMap: business.googleBusinessProfile,
    openingHoursSpecification,
    areaServed: ['Kondapur', 'Gachibowli', 'HITEC City', 'Madhapur', 'Hyderabad'].map(name => ({ '@type': 'Place', name })),
    founder: { '@id': FOUNDER_ID },
    sameAs: [business.instagram, business.googleBusinessProfile],
};

function faqSchema(faqs: Faq[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    };
}

function breadcrumbSchema(trail: { name: string; path: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: abs(item.path === '/' ? '/' : item.path),
        })),
    };
}

const goaEventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Strength & Stillness: a four-day wellness retreat by the sea',
    description: 'Calisthenics, yoga, breathwork, sound healing, an Arambol jungle trek, water sports and a beachfront stay in North Goa, led by Calisthenics Lab India.',
    startDate: '2026-12-10',
    endDate: '2026-12-13',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: abs('/images/goa/cover.jpg'),
    url: abs('/goa-retreat'),
    location: {
        '@type': 'Place',
        name: 'Beachfront resort, North Goa',
        address: { '@type': 'PostalAddress', addressRegion: 'Goa', addressCountry: 'IN' },
    },
    organizer: { '@type': 'Organization', name: business.name, url: `${SITE_URL}/` },
    offers: [
        { '@type': 'Offer', name: 'Early bird (first 10 spots)', price: '25000', priceCurrency: 'INR', availability: 'https://schema.org/LimitedAvailability', url: abs('/goa-retreat') },
        { '@type': 'Offer', name: 'Regular', price: '30000', priceCurrency: 'INR', url: abs('/goa-retreat') },
    ],
};

const UPDATED = '2026-11-10';

const corePages: PageMeta[] = [
    {
        path: '/',
        name: 'Home',
        title: 'Calisthenics in Hyderabad | Calisthenics Lab India, Kondapur',
        description: 'Calisthenics academy in Kondapur, Hyderabad, near HITEC City & Gachibowli. Group batches for all levels, personal coaching, kids classes and yoga.',
        h1: 'Calisthenics Academy in Kondapur, Hyderabad',
        image: '/images/cali_hero_bg.jpg',
        lastmod: UPDATED,
        schemas: [localBusinessSchema, faqSchema(homeFaqs)],
    },
    {
        path: '/kids-calisthenics',
        name: 'Kids Calisthenics',
        title: 'The Mighty Tribe: Kids Calisthenics in Kondapur, Hyderabad',
        description: 'The Mighty Tribe kids program in Kondapur, Hyderabad: calisthenics, gymnastics & parkour for ages 3–15 in three levels. Weekday & weekend batches.',
        h1: 'The Mighty Tribe',
        image: '/images/goa/community-6.jpg',
        lastmod: UPDATED,
        schemas: [faqSchema(kidsFaqs), breadcrumbSchema([{ name: 'Kids Calisthenics', path: '/kids-calisthenics' }])],
    },
    {
        path: '/personal-training',
        name: 'Personal Training',
        title: 'Personal Calisthenics Training in Kondapur, Hyderabad',
        description: 'One-on-one calisthenics coaching in Kondapur, Hyderabad for pull-ups, handstands, muscle-ups and levers. Book a consultation on WhatsApp or call us.',
        h1: 'Personal Calisthenics Coaching in Hyderabad',
        image: '/images/goa/handstand.jpg',
        lastmod: UPDATED,
        schemas: [faqSchema(personalTrainingFaqs), breadcrumbSchema([{ name: 'Personal Training', path: '/personal-training' }])],
    },
    {
        path: '/about',
        name: 'About',
        title: 'About Us | Calisthenics Lab India, Kondapur',
        description: 'Meet Calisthenics Lab India: founded by Aman Bisht, a multiple-time national calisthenics champion, with a coaching team of three in Kondapur, Hyderabad.',
        h1: 'About Calisthenics Lab India',
        image: '/images/goa/aman.jpg',
        lastmod: UPDATED,
        schemas: [founderSchema, breadcrumbSchema([{ name: 'About', path: '/about' }])],
    },
    {
        path: founder.path,
        name: 'Aman Bisht',
        title: 'Aman Bisht | Calisthenics Athlete & Coach, Hyderabad',
        description: 'Aman Bisht is a national calisthenics champion who has represented India three times, and the founder of Hyderabad Calisthenics and two academies.',
        h1: 'Aman Bisht',
        image: '/images/goa/aman.jpg',
        lastmod: UPDATED,
        schemas: [founderProfileSchema, breadcrumbSchema([{ name: 'About', path: '/about' }, { name: 'Aman Bisht', path: founder.path }])],
    },
    {
        path: '/contact',
        name: 'Contact',
        title: 'Contact & Location | Calisthenics Lab India, Kondapur',
        description: 'Find Calisthenics Lab India on Kondapur Road, Hyderabad 500084. Batch hours, map, phone and WhatsApp: +91 88267 62234. Near HITEC City and Gachibowli.',
        h1: 'Contact Calisthenics Lab India',
        image: '/images/cali_hero_bg.jpg',
        lastmod: UPDATED,
        schemas: [localBusinessSchema, breadcrumbSchema([{ name: 'Contact', path: '/contact' }])],
    },
    {
        path: '/blog',
        name: 'Blog',
        title: 'Calisthenics Blog | Tips from Calisthenics Lab India',
        description: 'Calisthenics guides from our coaches in Hyderabad: your first pull-up, where beginners should start, and how calisthenics compares with the gym.',
        h1: 'Calisthenics Blog',
        image: '/images/goa/move.jpg',
        lastmod: UPDATED,
        schemas: [breadcrumbSchema([{ name: 'Blog', path: '/blog' }])],
    },
];

const postPages: PageMeta[] = blogPosts.map(post => ({
    path: `/blog/${post.slug}`,
    name: post.title,
    // Longest brand suffix that keeps the title within 60 characters.
    title: [`${post.title} | Calisthenics Lab India`, `${post.title} | Calisthenics Lab`, post.title].find(t => t.length <= 60)!,
    description: post.description,
    h1: post.title,
    image: post.image.replace(/\.webp$/, '.jpg'),
    lastmod: post.datePublished,
    schemas: [
        {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            image: abs(post.image.replace(/\.webp$/, '.jpg')),
            datePublished: post.datePublished,
            dateModified: post.datePublished,
            author: { '@type': 'Person', '@id': FOUNDER_ID, name: business.founder.name, url: abs('/about') },
            publisher: { '@type': 'Organization', name: business.name, logo: { '@type': 'ImageObject', url: business.logo } },
            mainEntityOfPage: abs(`/blog/${post.slug}`),
        },
        breadcrumbSchema([{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]),
    ],
}));

const extraPages: PageMeta[] = [
    {
        path: '/goa-retreat',
        name: 'Goa Retreat',
        title: 'Strength & Stillness: Goa Wellness Retreat, Dec 2026',
        description: 'Four-day beachfront wellness retreat in North Goa by Calisthenics Lab India: calisthenics, yoga, breathwork and sound healing. 10–13 Dec 2026.',
        h1: 'Strength & Stillness',
        image: '/images/goa/cover.jpg',
        lastmod: UPDATED,
        schemas: [goaEventSchema, breadcrumbSchema([{ name: 'Goa Retreat', path: '/goa-retreat' }])],
    },
    {
        path: '/yog-lab',
        name: 'The Yog Lab',
        title: 'Yoga Classes in Kondapur, Hyderabad | The Yog Lab',
        description: 'Yoga classes in Kondapur, Hyderabad with Coach Likhit: Yoga Abhyas group class (3 days a week) and Yoga Sankalp 1-on-1 personal training.',
        h1: 'Yoga Classes in Kondapur, Hyderabad',
        image: '/images/goa/breathe.jpg',
        lastmod: UPDATED,
        schemas: [faqSchema(yogFaqs), breadcrumbSchema([{ name: 'The Yog Lab', path: '/yog-lab' }])],
    },
];

export const notFoundPage: PageMeta = {
    path: '/404',
    name: 'Page not found',
    title: 'Page Not Found | Calisthenics Lab India',
    description: 'This page does not exist. Find calisthenics classes, kids programs, personal coaching and yoga at Calisthenics Lab India, Kondapur.',
    h1: 'Page not found',
    image: '/images/cali_hero_bg.jpg',
    lastmod: UPDATED,
    noindex: true,
    schemas: [],
};

export const pages: PageMeta[] = [...corePages, ...postPages, ...extraPages];

export function getPageMeta(path: string): PageMeta {
    return pages.find(p => p.path === path) ?? notFoundPage;
}

export function absoluteUrl(path: string) {
    return abs(path);
}
