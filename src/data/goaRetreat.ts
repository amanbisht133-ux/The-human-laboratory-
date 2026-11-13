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
    footer: 'Strength & Stillness · Just across North Goa · 10–13 Dec 2026',
    facts: [
        { label: 'When', value: '10 – 13 December 2026' },
        { label: 'Where', value: 'Just across North Goa' },
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
            'Strength & Stillness is four days to press pause. On an untouched beach just across North Goa, we wake with the sun, move with intention, breathe deeply and let the sea set the pace. No rush, no noise, no pressure to perform.',
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
            'National calisthenics champion who has represented India.',
            'Aman builds strength the patient way: solid foundations, clean progressions and a lot of fun along the way. At the retreat he leads every calisthenics and skills session, and makes sure everyone, at every level, feels at home.'
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
            highlights: ['Check-in & retreat kit', 'Opening circle', 'Calisthenics skills', 'Sunset beach walk & breathwork', 'Sound healing under the stars'],
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
            highlights: ['Body cleansing (jal neti, kunjal kriya)', 'Sunrise yoga', 'Water sports', 'Calisthenics by the pool', 'Bonfire & music jam'],
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
            highlights: ['Sunrise Arambol jungle trek', 'Partner yoga on the beach', 'Yoga: bends & splits', 'Ecstatic dance night', 'Farewell dinner together'],
            items: [
                ['6:00 AM', 'Sunrise jungle trek in Arambol, before the heat'],
                ['8:30 AM', 'Partner yoga on Arambol beach, at the end of the trail'],
                ['9:30 AM', 'Breakfast on your own, in Arambol or at the resort'],
                ['11:00 AM', 'Free time: pool, beach or rest'],
                ['1–4 PM', 'Lunch on your own'],
                ['4:00 PM', 'Yoga: mastery and beyond (forward bends, backbends, side and front splits)'],
                ['7:30 PM', 'Ecstatic dance night'],
                ['9:00 PM', 'Farewell dinner together at the resort, on us']
            ]
        },
        {
            number: '04', date: 'Sun · 13 Dec', title: 'Integrate & depart',
            highlights: ['Gentle yoga & meditation', 'Closing circle & certificates', 'Checkout by 11 AM'],
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
        text: 'Your home for four days is a beachfront property on an untouched beach just across North Goa, far from the crowds. Step out of your room onto the sand, wake to the sound of the waves and cool off in the pool between sessions.',
        features: [
            { title: 'On the beach', caption: 'Steps from the sand' },
            { title: 'Silent coast', caption: 'No crowds' },
            { title: 'Swimming pool', caption: 'Sea-facing' },
            { title: 'Twin sharing', caption: 'Single on request' }
        ],
        included: [
            "3 nights' beachfront stay, twin sharing",
            'Breakfast on Days 2 and 4',
            'Farewell dinner on the last night',
            'All sessions, workshops and ceremonies',
            'Water sports session',
            'Arambol trek with transport',
            'Retreat T-shirt and journal',
            'Photos and video of your retreat'
        ],
        notIncluded: [
            'Travel to and from the resort',
            'Lunches, Day 3 breakfast, dinners on Days 1 and 2',
            'Personal expenses'
        ],
        resort: 'Kahuna Resort',
        gallery: [
            { kicker: 'Rooms', title: 'Calm, light-filled', image: `${IMG}/resort-room.webp` },
            { kicker: 'Suites', title: 'Room to rest', image: `${IMG}/resort-suite.webp` },
            { kicker: 'Dining hall', title: 'The farewell dinner', image: `${IMG}/resort-dining.webp` },
            { kicker: 'Swimming pool', title: 'A cool dip between sessions', image: `${IMG}/resort-pool.webp` },
            { kicker: 'Sports court', title: 'Play after practice', image: `${IMG}/resort-court.webp` }
        ],
        gettingThere: 'Make your own way to the resort. Mopa airport in Goa is the closest, under an hour away. The exact location is shared once you book.',
        whatToPack: 'Training clothes for 4 days, swimwear, trek shoes, a light layer for the evening, sunscreen and a water bottle.'
    },

    community: {
        title: "You'll be in good company.",
        text: 'From open sessions on the streets of Hyderabad to Holi at the gym and mornings on the beach, this is a community that trains, celebrates and shows up for each other.',
        photos: [1, 2, 3, 4, 5, 6, 7].map(n => `${IMG}/community-${n}.webp`)
    },

    investment: {
        intro: 'One price covers your stay, breakfasts, the farewell dinner, every session, the trek, water sports and your retreat kit.',
        price: { price: '₹30,000', was: '₹35,000', note: 'Per person · Twin sharing', saving: 'You save ₹5,000' },
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

// What each stop on the illustrated map is, shown in a pop-up when it is tapped.
// Keys match data-stop in src/assets/retreat-map.svg (d<day>-<stop>).
export type RetreatStop = { day: string; time: string; title: string; image?: string; what: string; points: string[]; note: string };
const GOA = '/images/goa';
export const retreatStops: Record<string, RetreatStop> = {
    'd1-1': {
        day: 'Day 1 · Thu 10 Dec', time: '12–2 PM', title: 'Check-in & welcome drink', image: `${GOA}/resort-pool.webp`,
        what: 'You arrive at the beachfront resort, get your room and settle in. This is your slow start: no sessions yet, just the sea, the pool and the people you will spend four days with.',
        points: ['A welcome drink on arrival', 'Your retreat kit: T-shirt and journal', 'Free time on the beach or by the pool until 4 PM'],
        note: 'Travel to the resort is on your own. It is under an hour from Mopa airport.',
    },
    'd1-2': {
        day: 'Day 1 · Thu 10 Dec', time: '4:00 PM', title: 'Opening circle & skills', image: `${GOA}/handstand.webp`,
        what: 'We sit together, meet the coaches and each other, and set an intention for the retreat. Then the first training session: calisthenics skills, which means learning to control your own bodyweight.',
        points: ['Handstand, L-sit, pull-ups and elbow lever', 'Every skill is broken into steps for your level', 'Coaches spot you and correct your form'],
        note: 'Complete beginners are welcome. You do not need to be able to do any of these yet.',
    },
    'd1-3': {
        day: 'Day 1 · Thu 10 Dec', time: '6:15 PM', title: 'Sunset walk & breathwork', image: `${GOA}/breathe.webp`,
        what: 'A slow walk along the beach as the sun goes down, followed by guided breathwork: simple breathing patterns that slow the heart rate and calm a busy mind.',
        points: ['An easy barefoot walk on the sand', 'Guided breathing you can use any time you feel stressed', 'A quiet way to arrive after a day of travel'],
        note: 'Nothing to bring. Come as you are.',
    },
    'd1-4': {
        day: 'Day 1 · Thu 10 Dec', time: '8:30 PM', title: 'Sound healing', image: `${GOA}/heal.webp`,
        what: 'Sound healing, also called a sound bath, is deep relaxation through sound. You lie down comfortably while instruments such as singing bowls and chimes are played around you, and the tones and vibrations help the body let go.',
        points: ['You simply lie down and listen: there is nothing to do', 'Held outdoors, under the stars', 'Many people drift off, and that is completely fine'],
        note: 'Wear something warm and comfortable for the evening breeze.',
    },
    'd2-1': {
        day: 'Day 2 · Fri 11 Dec', time: '6:30 AM', title: 'Body cleansing & sunrise yoga', image: `${GOA}/stay.webp`,
        what: 'We start with traditional yogic cleansing practices, done on an empty stomach and guided step by step by a certified teacher. Then, at 7:15 AM, sunrise yoga by the sea.',
        points: ['Jal neti: rinsing the nose with warm salt water', 'Sutra neti: cleaning the nasal passage with a soft thread', 'Kunjal kriya: drinking warm salt water and bringing it back up to cleanse the stomach'],
        note: 'Every practice is optional. Try what you are comfortable with and watch the rest. Breakfast follows at 8:30 AM.',
    },
    'd2-2': {
        day: 'Day 2 · Fri 11 Dec', time: '9:30 AM', title: 'Water sports',
        what: 'A morning of adrenaline after the calm: water sports in the sea, right across from the resort. It is included in your retreat price.',
        points: ['A fun, playful break from training', 'Done together as a group', 'The activities on the day depend on the sea conditions'],
        note: 'Tell us in advance if you cannot swim or are not comfortable in water, and we will plan around it.',
    },
    'd2-3': {
        day: 'Day 2 · Fri 11 Dec', time: '3:30 PM', title: 'Calisthenics by the pool', image: `${GOA}/move.webp`,
        what: 'Calisthenics is strength training using your own bodyweight: push-ups, pull-ups, dips, squats and core work, with no machines. This is a full workout by the pool, scaled so everyone trains at their own level.',
        points: ['A coached strength workout for the whole body', 'Easier and harder versions of every exercise', 'Recovery stretch and breathwork at 5:30 PM'],
        note: 'Lunch and pool time come first, from 1 to 3:30 PM.',
    },
    'd2-4': {
        day: 'Day 2 · Fri 11 Dec', time: '7:30 PM', title: 'Bonfire & music jam', image: `${GOA}/celebrate.webp`,
        what: 'An evening around the fire. Someone starts a song, someone picks up a drum or a guitar, and it grows from there. No stage and no audience: everyone is part of it.',
        points: ['Singing, rhythm and stories around a bonfire', 'Bring an instrument if you play one', 'You do not need to sing well to join in'],
        note: 'This is where strangers usually become friends.',
    },
    'd3-1': {
        day: 'Day 3 · Sat 12 Dec', time: '6:00 AM', title: 'Sunrise jungle trek', image: `${GOA}/jungle.webp`,
        what: 'We leave early and walk the jungle trails of Arambol while it is still cool, as the forest wakes up. The trail comes out onto the beach.',
        points: ['An easy to moderate walk through the forest', 'Van transfer to the trail is included', 'We finish on Arambol beach, ready for partner yoga'],
        note: 'Wear shoes with grip and carry a water bottle.',
    },
    'd3-2': {
        day: 'Day 3 · Sat 12 Dec', time: '8:30 AM', title: 'Partner yoga on the beach', image: `${GOA}/invitation.webp`,
        what: 'Partner yoga is yoga practised in pairs. You support, balance and stretch each other, which takes you deeper into poses than you can go alone and builds trust quickly.',
        points: ['Simple supported stretches and balances', 'On Arambol beach, at the end of the trail', 'Laughing is part of the practice'],
        note: 'You do not need to come with a partner. We pair everyone up.',
    },
    'd3-3': {
        day: 'Day 3 · Sat 12 Dec', time: '4:00 PM', title: 'Yoga: bends & splits', image: `${GOA}/days-3-4.webp`,
        what: 'A deeper yoga session called mastery and beyond, focused on flexibility: forward bends, backbends, and side and front splits, taught with safe progressions.',
        points: ['Step-by-step progressions, not forcing', 'Learn how to open hips, hamstrings and spine', 'Drills you can keep practising at home'],
        note: 'You will be nicely warmed up after the morning trek. Free time and lunch come before this.',
    },
    'd3-4': {
        day: 'Day 3 · Sat 12 Dec', time: '7:30 PM', title: 'Ecstatic dance & farewell dinner', image: `${GOA}/resort-dining.webp`,
        what: 'Ecstatic dance is free-form movement to music. There are no steps to learn and nobody watching: you move however the music moves you. It is a release, and a celebration of the days together.',
        points: ['No choreography and no dance experience needed', 'No judgement: eyes closed is welcome', 'At 9:00 PM, a farewell dinner together at the resort, on us'],
        note: 'Come barefoot or in whatever lets you move freely.',
    },
    'd4-1': {
        day: 'Day 4 · Sun 13 Dec', time: '7:00 AM', title: 'Gentle yoga & meditation', image: `${GOA}/rest.webp`,
        what: 'A slow, easy session to wake the body after three full days, followed by a guided meditation to let everything settle before you travel home.',
        points: ['Soft stretching, nothing demanding', 'A guided meditation by the sea', 'Breakfast at 8:30 AM'],
        note: 'A calm last morning. Keep your phone away for one more hour.',
    },
    'd4-2': {
        day: 'Day 4 · Sun 13 Dec', time: '9:30 AM', title: 'Closing circle & certificates', image: `${GOA}/community-7.webp`,
        what: 'We sit together one last time and share what we are taking home. You leave with a plan, so the retreat continues after Goa.',
        points: ['A training plan to keep practising at home', 'Your retreat certificate', 'Photos, hugs and goodbyes'],
        note: 'Checkout is at 11:00 AM. Onward travel is on your own.',
    },
};
