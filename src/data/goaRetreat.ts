// Content for the "Strength & Stillness" Goa retreat, transcribed from the
// retreat brochure (Strength-and-Stillness-Brochure-v2.pdf). Used by the
// retreat page, the home-page popup and the home-page activity section.

export const RETREAT_PATH = '/goa-retreat';
const IMG = '/images/goa';

export const retreat = {
    name: 'Strength & Stillness',
    tagline: 'A four-day wellness retreat by the sea',
    dates: '10 – 13 December 2026',
    shortDates: '10–13 Dec 2026',
    footer: 'Strength & Stillness · North Goa · 10–13 Dec 2026',
    facts: [
        { label: 'When', value: '10 – 13 December 2026' },
        { label: 'Where', value: 'North Goa, beachfront' },
        { label: 'Stay', value: '3 nights, with a pool' }
    ],
    images: {
        cover: `${IMG}/cover.webp`,
        invitation: `${IMG}/invitation.webp`,
        aman: `${IMG}/aman.webp`,
        days12: `${IMG}/days-1-2.webp`,
        days34: `${IMG}/days-3-4.webp`,
        handstand: `${IMG}/handstand.webp`,
        jungle: `${IMG}/jungle.webp`,
        stay: `${IMG}/stay.webp`,
        texture: `${IMG}/palms-texture.webp`
    },

    invitation: {
        title: 'Come back to yourself.',
        paragraphs: [
            'Most of us live in a constant rush. Alarms, screens, deadlines, traffic. We train hard, work harder, and rarely stop long enough to notice how we actually feel.',
            'Strength & Stillness is four days to press pause. On a quiet beachfront in North Goa, we wake with the sun, move with intention, breathe deeply and let the sea set the pace. No rush, no noise, no pressure to perform.',
            'You build real strength in the mornings and find real stillness in the evenings: yoga by the water, a sound bath under the stars, long conversations around a bonfire.',
            'You leave lighter, calmer and stronger than you arrived, with people who started as strangers and leave as friends.'
        ],
        quote: ['Strength is built in effort.', 'Peace is found in stillness.'],
        quoteCaption: 'Here, you get both',
        pillars: [
            { word: 'Move', caption: 'With purpose' },
            { word: 'Breathe', caption: 'With intention' },
            { word: 'Rest', caption: 'Without guilt' }
        ]
    },

    experiences: [
        {
            numeral: 'I', kicker: 'Move', title: 'Calisthenics by the sea', image: `${IMG}/move.webp`,
            text: 'Calisthenics sessions with Aman, by the pool and on the sand, coached at three levels so first-timers and athletes train side by side. Focused skill work on the handstand, L-sit, pull-ups and elbow lever, with clear progressions you can take home.'
        },
        {
            numeral: 'II', kicker: 'Breathe', title: 'Yoga, breathwork & body cleansing', image: `${IMG}/breathe.webp`,
            text: 'Yoga every day, from partner yoga on the beach to a deep session on bends and splits. Guided breathwork teaches you to calm your nervous system on demand, and a traditional body cleansing session (jal neti, sutra neti and kunjal kriya) prepares you for practice.'
        },
        {
            numeral: 'III', kicker: 'Heal', title: 'Sound healing & recovery', image: `${IMG}/heal.webp`,
            text: 'Lie back as bowls and gongs wash over you in a sound bath under the night sky. Daily recovery with mobility and stretching helps your body absorb the work, so you wake up fresh every morning.'
        },
        {
            numeral: 'IV', kicker: 'Explore', title: 'Arambol jungle trek & water sports', image: `${IMG}/jungle.webp`,
            text: 'Set off at sunrise into the jungle trails of Arambol and come out onto the beach for partner yoga by the sea. On Day 2, trade calm for adrenaline with a morning of water sports right across from the resort.'
        },
        {
            numeral: 'V', kicker: 'Celebrate', title: 'Bonfire, music jam & ecstatic dance', image: `${IMG}/celebrate.webp`,
            text: 'Evenings belong to the group. Gather around a bonfire for a live music jam, let go completely on the ecstatic dance night, and close the retreat with a farewell dinner together.'
        },
        {
            numeral: 'VI', kicker: 'Rest', title: 'Beach, pool & quiet time', image: `${IMG}/rest.webp`,
            text: 'Long, unhurried afternoons are part of the plan. Swim in the pool, walk the silent beach, journal in the shade or nap without guilt. Stillness is a practice too.'
        }
    ],

    lead: {
        role: 'Retreat lead',
        name: 'Aman Bisht',
        credentials: 'Founder of Calisthenics Lab India, Indian Calisthenics School and Hyderabad Calisthenics.',
        paragraphs: [
            'Multiple-time national calisthenics champion who has represented India.',
            'Aman builds strength the patient way; solid foundations, clean progressions and a lot of fun along the way. At the retreat he leads every calisthenics and skills session, and makes sure everyone, at every level, feels at home.'
        ]
    },
    facilitators: [
        { title: 'Yoga, breathwork & cleansing', text: 'A certified teacher leads the yoga, breathwork and body cleansing sessions.' },
        { title: 'Sound healing', text: 'A trained sound healer leads the sound bath under the stars.' },
        { title: 'Ecstatic dance', text: 'A facilitator holds the space for a night of free, joyful movement.' },
        { title: 'The CLI team', text: 'On the ground for all four days, so you can switch off completely.' }
    ],
    audience: [
        { title: 'First timers', caption: 'No experience needed' },
        { title: 'Regular trainees', caption: 'Chasing new skills' },
        { title: 'Anyone', caption: 'Craving a real reset' }
    ],

    days: [
        {
            number: '01', date: 'Thu · 10 Dec', title: 'Arrive & connect',
            items: [
                ['12–2 PM', 'Check-in, welcome drink, retreat kit'],
                ['4:00 PM', 'Opening circle'],
                ['5:00 PM', 'Skills: handstand, L-sit, pull-ups, elbow lever'],
                ['6:15 PM', 'Sunset beach walk and breathwork'],
                ['8:30 PM', 'Sound healing under the stars']
            ]
        },
        {
            number: '02', date: 'Fri · 11 Dec', title: 'Train, play & jam',
            items: [
                ['6:30 AM', 'Body cleansing (jal neti, sutra neti & kunjal kriya)'],
                ['7:15 AM', 'Sunrise yoga'],
                ['8:30 AM', 'Breakfast'],
                ['9:30 AM', 'Water sports, across from the resort'],
                ['1–3:30 PM', 'Lunch on your own, pool time'],
                ['3:30 PM', 'Calisthenics workout by the pool'],
                ['5:30 PM', 'Recovery stretch and breathwork'],
                ['7:30 PM', 'Bonfire and music jam under the stars']
            ]
        },
        {
            number: '03', date: 'Sat · 12 Dec', title: 'Explore & dance',
            items: [
                ['6:00 AM', 'Sunrise jungle trek in Arambol, before the heat'],
                ['8:30 AM', 'Partner yoga on Arambol beach, at the end of the trail'],
                ['9:30 AM', 'Breakfast on your own, in Arambol or at the resort'],
                ['11:00 AM', 'Free time: pool, beach or rest'],
                ['1–4 PM', 'Lunch on your own'],
                ['4:00 PM', 'Yoga: mastery and beyond (techniques for forward bends, backbends, side and front splits)'],
                ['7:30 PM', 'Ecstatic dance night'],
                ['9:00 PM', 'Farewell dinner together at the resort, on us']
            ]
        },
        {
            number: '04', date: 'Sun · 13 Dec', title: 'Integrate & depart',
            items: [
                ['7:00 AM', 'Gentle yoga and meditation'],
                ['8:30 AM', 'Breakfast'],
                ['9:30 AM', 'Closing circle, training plan, certificates'],
                ['11:00 AM', 'Checkout; onward travel on your own']
            ]
        }
    ],

    stay: {
        title: 'A home on the beach',
        text: 'Your home for four days is a beachfront property on a silent stretch of the North Goa coast. Step out of your room onto the sand, wake to the sound of the waves and cool off in the pool between sessions.',
        features: [
            { title: 'On the beach', caption: 'Steps from the sand' },
            { title: 'Silent coast', caption: 'Away from the crowds' },
            { title: 'Swimming pool', caption: 'Between sessions' },
            { title: 'Twin sharing', caption: 'Single rooms on request' }
        ],
        included: [
            "3 nights' beachfront stay, twin sharing",
            'Breakfast on Days 2 and 4',
            'Farewell dinner on the last night',
            'All sessions, workshops and ceremonies',
            'Water sports session',
            'Arambol trek with transport',
            'Retreat T-shirt and Full Kit',
            'Photos and video of your retreat'
        ],
        notIncluded: [
            'Travel to and from the resort',
            'Lunches, Day 3 breakfast, dinners on Days 1 and 2',
            'Personal expenses'
        ],
        gettingThere: 'Make your own way to the resort. Mopa airport and Thivim station are the closest. The exact location is shared once you book.',
        whatToPack: 'Training clothes for 4 days, swimwear, trek shoes, a light layer for the evening, sunscreen and a water bottle.'
    },

    community: {
        title: "You'll be in good company.",
        text: 'From open sessions on the streets of Hyderabad to Holi at the gym and mornings on the beach, this is a community that trains, celebrates and shows up for each other.',
        photos: [1, 2, 3, 4, 5, 6, 7].map(n => `${IMG}/community-${n}.webp`)
    },

    investment: {
        intro: 'One price covers your stay, breakfasts, the farewell dinner, every session, the trek, water sports and your retreat kit. The first ten spots are offered at the early-bird price.',
        earlyBird: { price: '₹25,000', was: '₹30,000', note: 'Per person · Twin sharing', saving: 'You save ₹5,000' },
        regular: { price: '₹30,000', badge: 'After the first 10 spots', note: 'Per person · Twin sharing', caption: 'Once early-bird spots are gone' },
        extras: [
            { label: 'Single room', value: '+ ₹5,500' },
            { label: 'Deposit to book', value: '₹10,000' },
            { label: 'Balance due', value: '28 Nov 2026' }
        ],
        howToBook: [
            'Fill in the registration form',
            'We WhatsApp you to confirm your spot',
            'Pay the ₹10,000 deposit to lock it in',
            'Pay the balance by 28 Nov 2026'
        ],
        cancellation: [
            'Before 15 Nov: full refund, minus ₹1,000',
            '15 – 28 Nov: 50% refund',
            'After 28 Nov: no refund, but your spot can be transferred'
        ]
    }
};

export const RETREAT_REGISTER_URL = 'https://tally.so/r/dbWe7o';

export const RETREAT_WHATSAPP_URL = `https://api.whatsapp.com/send?phone=918826762234&text=${encodeURIComponent(
    "Hi! I'd like to reserve a spot for Strength & Stillness, the Goa retreat (10–13 Dec 2026)."
)}`;
