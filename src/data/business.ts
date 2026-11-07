// Single source of truth for Calisthenics Lab India's business details (NAP,
// hours, links). Pages, the footer and the JSON-LD all read from here, so keep
// these values identical to the Google Business Profile.

export const SITE_URL = 'https://www.calisthenicslabindia.club';

export const business = {
    name: 'Calisthenics Lab India',
    tagline: 'By The Community, For The Community',
    phoneDisplay: '+91 88267 62234',
    phoneHref: 'tel:+918826762234',
    phoneE164: '+918826762234',
    whatsappNumber: '918826762234',
    email: 'Calisthenicslabindia@gmail.com',
    address: {
        streetAddress: 'Kondapur Road, Kondapur, New Hafeezpet, Raghavendra Colony, Gachibowli',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500084',
        addressCountry: 'IN',
    },
    addressLines: [
        'Kondapur Road, Kondapur, New Hafeezpet,',
        'Raghavendra Colony, Gachibowli,',
        'Hyderabad, Telangana 500084, India',
    ],
    geo: { latitude: 17.4731247, longitude: 78.3641366 },
    nearby: ['HITEC City', 'Gachibowli', 'Madhapur'],
    instagram: 'https://www.instagram.com/calisthenics.lab.india',
    googleBusinessProfile: 'https://maps.app.goo.gl/695SVZHotKEeK4zJ7',
    mapEmbed: 'https://www.google.com/maps?q=17.4731247,78.3641366&z=16&output=embed',
    founder: {
        name: 'Aman Bisht',
        credentials: 'Multiple-time national calisthenics champion who has represented India',
    },
    logo: `${SITE_URL}/images/cali-logo.png`,
    image: `${SITE_URL}/images/cali_hero_bg.jpg`,
};

export const fullAddress = `${business.addressLines.join(' ')}`.replace(/,\s*$/, '');

/** Calisthenics hours as shown to visitors. */
export const hours = [
    { days: 'Monday – Friday', times: ['6:30 – 9:30 AM', '6:00 – 9:00 PM'] },
    { days: 'Saturday – Sunday', times: ['8:30 – 11:00 AM', '5:30 – 8:00 PM'] },
];

/** Same hours in schema.org form. */
export const openingHoursSpecification = [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:30', closes: '09:30' },
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '18:00', closes: '21:00' },
    { days: ['Saturday', 'Sunday'], opens: '08:30', closes: '11:00' },
    { days: ['Saturday', 'Sunday'], opens: '17:30', closes: '20:00' },
].map(({ days, opens, closes }) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: days.map(d => `https://schema.org/${d}`),
    opens,
    closes,
}));

export function whatsappUrl(message: string) {
    return `https://api.whatsapp.com/send?phone=${business.whatsappNumber}&text=${encodeURIComponent(message)}`;
}
