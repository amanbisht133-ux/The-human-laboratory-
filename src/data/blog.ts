// Blog posts. Each post links to the class page it relates to.

export type BlogSection = { heading: string; paragraphs?: string[]; list?: string[]; ordered?: boolean };
export type BlogPost = {
    slug: string;
    title: string;
    description: string;
    datePublished: string;
    image: string;
    imageWidth: number;
    imageHeight: number;
    imageAlt: string;
    intro: string;
    sections: BlogSection[];
    cta: { text: string; to: string; label: string };
    related: { to: string; label: string }[];
};

export const blogPosts: BlogPost[] = [
    {
        slug: 'calisthenics-kondapur-gachibowli',
        title: 'Calisthenics in Kondapur & Gachibowli: Fees and Timings',
        description: 'Calisthenics classes near Kondapur, Gachibowli and HITEC City: batch timings, monthly fees, weekend options, kids classes and how a first session works.',
        datePublished: '2026-11-10',
        image: '/images/goa/community-5.webp',
        imageWidth: 1260,
        imageHeight: 1400,
        imageAlt: 'Members training together at Calisthenics Lab India in Kondapur',
        intro: 'If you live or work around Kondapur, Gachibowli or HITEC City and want to get stronger without machines, calisthenics is one of the most rewarding ways to train. Here is everything you need to know before your first session at Calisthenics Lab India.',
        sections: [
            {
                heading: 'Where we are',
                paragraphs: [
                    'Calisthenics Lab India is on Kondapur Road, Kondapur, New Hafeezpet, Raghavendra Colony, Gachibowli, Hyderabad 500084, close to HITEC City, Gachibowli and Madhapur.',
                ],
            },
            {
                heading: 'Batch timings',
                list: [
                    'Monday to Friday: 6:30–9:30 AM and 6:00–9:00 PM, in one-hour batches',
                    'Saturday and Sunday: 8:30–11:00 AM and 5:30–8:00 PM',
                    'Kids (The Mighty Tribe, ages 3–15): weekdays 5–6 PM and 6–7 PM, weekends 9–10 AM',
                ],
            },
            {
                heading: 'Fees',
                list: [
                    'Weekday batches: ₹7,777 a month, ₹22,222 for 3 months, ₹44,444 for 6 months, ₹77,777 for a year',
                    'Weekend batches: ₹5,555 a month for 1.5-hour slots, ₹4,444 a month for 1-hour slots',
                    'Kids: ₹5,555 a month',
                    'Personal coaching: priced after a short consultation',
                ],
            },
            {
                heading: 'Your first session',
                paragraphs: [
                    'Your demo session is free on any weekday, in any batch slot. A weekend demo is ₹800, adjusted in your package when you join.',
                    'Every session starts with a warm-up, then strength and skill work at your level, then a cool-down. If you cannot do a push-up or pull-up yet, you start with an easier version and build up. No experience is needed.',
                ],
            },
            {
                heading: 'What you can learn',
                paragraphs: [
                    'Pull-ups, push-ups, dips, handstands, L-sits, muscle-ups and levers, each taught with step-by-step progressions. We also run yoga at The Yog Lab and a kids program covering calisthenics, gymnastics and parkour.',
                ],
            },
        ],
        cta: { text: 'Try a session at Calisthenics Lab India in Kondapur.', to: '/', label: 'See batches and book' },
        related: [
            { to: '/blog/calisthenics-for-beginners', label: 'Calisthenics for beginners: where to start' },
            { to: '/kids-calisthenics', label: 'The Mighty Tribe: kids calisthenics, gymnastics & parkour' },
        ],
    },
    {
        slug: 'weekend-calisthenics-hyderabad',
        title: 'Weekend Calisthenics in Hyderabad: Saturdays & Sundays',
        description: 'Can you get strong training only on weekends? How weekend calisthenics batches work in Kondapur, what to expect, timings, fees and tips to progress.',
        datePublished: '2026-11-10',
        image: '/images/goa/community-6.webp',
        imageWidth: 1260,
        imageHeight: 1400,
        imageAlt: 'Coach demonstrating a handstand during a weekend skills session',
        intro: 'Long weekdays in Hyderabad leave many people with only Saturday and Sunday free. The good news: two focused sessions a week are enough to build real strength and learn calisthenics skills, as long as you keep showing up.',
        sections: [
            {
                heading: 'Is training twice a week enough?',
                paragraphs: [
                    'For most beginners, yes. Two well-structured sessions a week, done consistently for a few months, build strength, mobility and your first skills. Progress comes from consistency and good progressions, not from training every day.',
                ],
            },
            {
                heading: 'Weekend batches at Calisthenics Lab India',
                list: [
                    'Saturday and Sunday mornings: 8:30–10:00 AM (1.5 hours) and 10:00–11:00 AM (1 hour)',
                    'Saturday and Sunday evenings: 5:30–7:00 PM (1.5 hours) and 7:00–8:00 PM (1 hour)',
                    'Fees: ₹5,555 a month for 1.5-hour slots, ₹4,444 a month for 1-hour slots',
                ],
            },
            {
                heading: 'How to make the most of weekend training',
                list: [
                    'Pick one slot and keep it every weekend',
                    'Add 10–15 minutes of hangs, push-ups and mobility at home on one or two weekdays',
                    'Sleep well and eat enough protein, so you recover between sessions',
                    'Track your reps and holds, so you can see your progress',
                ],
            },
            {
                heading: 'Try a session',
                paragraphs: [
                    'A weekend demo session is ₹800, adjusted in your package when you join. If you can make it on a weekday, the demo is free.',
                ],
            },
        ],
        cta: { text: 'Book a weekend batch at Calisthenics Lab India, Kondapur.', to: '/', label: 'See weekend batches' },
        related: [
            { to: '/blog/how-to-do-your-first-pull-up', label: 'How to do your first pull-up' },
            { to: '/blog/calisthenics-vs-gym', label: 'Calisthenics vs gym' },
        ],
    },
    {
        slug: 'how-to-do-your-first-pull-up',
        title: 'How to Do Your First Pull-Up',
        description: 'A step-by-step plan to go from zero to your first strict pull-up: hangs, scapular pulls, negatives and rows, with how often to train.',
        datePublished: '2026-10-29',
        image: '/images/blog-pull-up-bar-hang.webp',
        imageWidth: 1000,
        imageHeight: 1500,
        imageAlt: 'Members hanging from the pull-up bars during a group session at Calisthenics Lab India',
        intro: 'The first strict pull-up is a milestone for almost everyone who starts calisthenics. It rarely comes from just trying pull-ups again and again. It comes from building the pieces separately: grip, shoulder control and pulling strength, then putting them together.',
        sections: [
            {
                heading: 'What a strict pull-up actually is',
                paragraphs: [
                    'Hang from a bar with straight arms and hands about shoulder-width apart, palms facing away. Pull until your chin clears the bar, without kicking or swinging, then lower under control to straight arms. If you can do that once, you have your first pull-up.',
                ],
            },
            {
                heading: 'Step 1: Dead hangs for grip',
                paragraphs: [
                    'Hang from the bar with straight arms for 20–30 seconds at a time. If your grip gives out before your back does, this is where you start. Work up to three hangs of 30 seconds or more.',
                ],
            },
            {
                heading: 'Step 2: Scapular pulls',
                paragraphs: [
                    'From a dead hang, keep your arms straight and pull your shoulder blades down and back so your body rises a few centimetres. Lower and repeat. This teaches the first part of every pull-up and protects your shoulders. Aim for 3 sets of 8–10 slow reps.',
                ],
            },
            {
                heading: 'Step 3: Rows',
                paragraphs: [
                    'Horizontal rows on a low bar or rings build the same pulling muscles with less load. Keep your body in a straight line and pull your chest to the bar. Lower your feet or walk them further forward as rows get easier.',
                ],
            },
            {
                heading: 'Step 4: Negatives',
                paragraphs: [
                    'Jump or step up so your chin is over the bar, then lower yourself as slowly as you can, aiming for 3–5 seconds. Negatives build strength in exactly the range you need. Do 3 sets of 3–5 reps, resting well between them.',
                ],
            },
            {
                heading: 'A simple weekly plan',
                list: [
                    'Train pulling 2–3 times a week, with a rest day in between.',
                    'Each session: dead hangs, scapular pulls, rows, then negatives.',
                    'Test a full pull-up once a week when you feel fresh, not at the end of a hard session.',
                    'Keep every rep clean. Swinging hides weak spots instead of fixing them.',
                ],
            },
            {
                heading: 'Get it faster with coaching',
                paragraphs: [
                    'A coach can spot exactly which link is missing, whether it is grip, shoulder position or the top of the pull, and adjust your progressions week by week. Pull-ups are one of the core skills we teach in every adult batch, from complete beginners up.',
                ],
            },
        ],
        cta: { text: 'Want a coach to build your pull-up plan with you?', to: '/personal-training', label: 'Explore personal coaching' },
        related: [
            { to: '/', label: 'Adult calisthenics batches in Kondapur' },
            { to: '/personal-training', label: 'Personal calisthenics coaching' },
            { to: '/blog/calisthenics-for-beginners', label: 'Calisthenics for beginners: where to start' },
        ],
    },
    {
        slug: 'calisthenics-for-beginners',
        title: 'Calisthenics for Beginners: Where to Start',
        description: 'New to calisthenics? The five foundation movements to learn first, how to structure your week, and the mistakes that slow beginners down.',
        datePublished: '2026-10-29',
        image: '/images/goa/move.webp',
        imageWidth: 1400,
        imageHeight: 1091,
        imageAlt: 'Group of beginners and athletes doing push-ups together on the beach',
        intro: 'Calisthenics means training with your own bodyweight. You need very little equipment, every movement scales to your level, and the skills you build (pull-ups, handstands, levers) stay with you. Here is how to start without getting lost or hurt.',
        sections: [
            {
                heading: 'Start with five foundations',
                list: [
                    'Push-ups: start on a bench or wall if a full push-up is not there yet.',
                    'Rows: on a low bar or rings, the beginner version of a pull-up.',
                    'Squats: full depth, heels down, chest up.',
                    'Dead hangs: build grip and shoulder health for later pulling work.',
                    'Hollow body hold: the core position behind almost every calisthenics skill.',
                ],
            },
            {
                heading: 'How often to train',
                paragraphs: [
                    'Three full-body sessions a week is plenty for the first couple of months. Leave a day between sessions so your joints and tendons can catch up with your muscles. They adapt more slowly, and that is where most beginner injuries come from.',
                ],
            },
            {
                heading: 'Progress by changing the exercise, not just the reps',
                paragraphs: [
                    'Calisthenics progresses through harder variations: wall push-ups become incline push-ups, then full push-ups, then deeper or slower ones. Once you can do 3 clean sets of 10–12 reps, move to the next variation and drop your reps back down.',
                ],
            },
            {
                heading: 'Common beginner mistakes',
                list: [
                    'Chasing advanced skills before the basics are solid.',
                    'Doing sloppy reps to hit a number.',
                    'Skipping mobility and warm-ups.',
                    'Training to exhaustion every session instead of building consistently.',
                ],
            },
            {
                heading: 'Train with a group',
                paragraphs: [
                    'Group batches give you structure, coaching on every rep and people to train with, which is what keeps most beginners consistent. All our adult batches are coached by level, so first-timers and experienced athletes train side by side.',
                ],
            },
        ],
        cta: { text: 'Ready to start with a coach and a community?', to: '/', label: 'See batch timings and plans' },
        related: [
            { to: '/', label: 'Adult calisthenics batches in Kondapur' },
            { to: '/kids-calisthenics', label: 'Kids calisthenics, gymnastics & parkour' },
            { to: '/blog/how-to-do-your-first-pull-up', label: 'How to do your first pull-up' },
        ],
    },
    {
        slug: 'calisthenics-vs-gym',
        title: 'Calisthenics vs Gym: Which Is Better?',
        description: 'Calisthenics or weights? An honest comparison of strength, skills, mobility, equipment and results, and how to choose what suits your goals.',
        datePublished: '2026-10-29',
        image: '/images/goa/community-5.webp',
        imageWidth: 1260,
        imageHeight: 1400,
        imageAlt: 'Aerial view of a large group doing a bodyweight workout together in rows',
        intro: 'Both calisthenics and gym training build strength and change your body. They get there differently, and the better choice depends on what you want from your training.',
        sections: [
            {
                heading: 'What the gym does well',
                paragraphs: [
                    'Machines and free weights make it easy to load a single muscle precisely and add weight in small steps. If your only goal is maximum muscle size in specific areas, or you compete in a lifting sport, weights are hard to beat.',
                ],
            },
            {
                heading: 'What calisthenics does differently',
                list: [
                    'Movement control: you learn to move your whole body as one unit, not isolated muscles.',
                    'Skills: handstands, muscle-ups and levers give you goals beyond numbers on a bar.',
                    'Mobility: many movements train strength through a full range of motion.',
                    'Relative strength: you get strong for your own bodyweight, which carries over to sport and daily life.',
                    'Minimal equipment: a bar, rings and the floor are enough.',
                ],
            },
            {
                heading: 'What about fat loss and muscle?',
                paragraphs: [
                    'Both work. Fat loss mostly comes down to consistency and nutrition, and calisthenics builds lean muscle as long as you keep progressing to harder variations. At our lab we treat a leaner, stronger physique as the by-product of mastering movement, not the only goal.',
                ],
            },
            {
                heading: 'So which should you choose?',
                paragraphs: [
                    'Choose the gym if you want to isolate muscles or train for a lifting sport. Choose calisthenics if you want body control, skills, mobility and a training style you can take anywhere. Many people do both, and that works too.',
                ],
            },
        ],
        cta: { text: 'Curious what calisthenics feels like? Try a coached session.', to: '/', label: 'Book a free demo session' },
        related: [
            { to: '/', label: 'Calisthenics classes in Kondapur, Hyderabad' },
            { to: '/personal-training', label: 'Personal calisthenics coaching' },
            { to: '/blog/calisthenics-for-beginners', label: 'Calisthenics for beginners: where to start' },
        ],
    },
];
