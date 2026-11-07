// Calisthenics and Yog Lab pricing and timings, shared by the home page,
// the kids page, the Yog Lab page and the booking form.

export const PRICING_TIERS: Record<string, Record<string, string>> = {
    // Weekday demo is free (any one weekday, any slot). Weekend demo is ₹800,
    // adjusted in the package if they join.
    'Weekday Batch': {
        '1 Day': 'Free',
        '1 Month': '₹7,777',
        '3 Months': '₹22,222',
        '6 Months': '₹44,444',
        '1 Year': '₹77,777'
    },
    'Weekend': {
        '1 Day': '₹800',
        '1 Month': '₹5,555',
        '3 Months': '₹15,151',
        '6 Months': '₹31,313',
        '1 Year': '₹60,606'
    },
    'Kids Batch': {
        '1 Day': '₹800',
        '1 Month': '₹5,555',
        '3 Months': '₹15,151',
        '6 Months': '₹31,313',
        '1 Year': '₹60,606'
    },
    'Personal Training': {
        '1 Day': 'Consultation',
        '1 Month': 'Consultation'
    }
};

// Monthly price for a 1-hour weekend slot; 1.5-hour slots use PRICING_TIERS['Weekend'].
export const WEEKEND_ONE_HOUR_MONTHLY = '₹4,444';
export const WEEKEND_ONE_HOUR_SLOTS = ['10:00 AM - 11:00 AM', '7:00 PM - 8:00 PM'];

// Slots grouped under a heading in the timing dropdown. Personal Training has no fixed slots.
// Also drives the Timings section, so the page and the form always agree.
export const BATCH_TIMINGS: Record<string, Record<string, string[]>> = {
    'Weekday Batch': {
        'Morning': ['6:30 AM - 7:30 AM', '7:30 AM - 8:30 AM', '8:30 AM - 9:30 AM'],
        'Evening': ['6:00 PM - 7:00 PM', '7:00 PM - 8:00 PM', '8:00 PM - 9:00 PM']
    },
    'Weekend': {
        'Morning': ['8:30 AM - 10:00 AM', '10:00 AM - 11:00 AM'],
        'Evening': ['5:30 PM - 7:00 PM', '7:00 PM - 8:00 PM']
    },
    'Kids Batch': {
        'Weekday': ['5:00 PM - 6:00 PM', '6:00 PM - 7:00 PM'],
        'Weekend': ['9:00 AM - 10:00 AM']
    }
};

export const WEEKLY_SCHEDULE = [
    { day: 'Monday', focus: 'Upper Body Push & Pull' },
    { day: 'Tuesday', focus: 'Legs & Core' },
    { day: 'Wednesday', focus: 'Skills & Upper Body' },
    { day: 'Thursday', focus: 'Full Body Endurance' },
    { day: 'Friday', focus: 'Skills | Upper Body' }
];

export const MEMBERSHIP_PLANS = [
    { plan: 'Kids Batch', price: PRICING_TIERS['Kids Batch']['1 Month'] },
    { plan: 'Monthly Membership', price: PRICING_TIERS['Weekday Batch']['1 Month'] },
    { plan: '3-Month Membership', price: PRICING_TIERS['Weekday Batch']['3 Months'] },
    { plan: '6-Month Membership', price: PRICING_TIERS['Weekday Batch']['6 Months'] },
    { plan: '1-Year Membership*', price: PRICING_TIERS['Weekday Batch']['1 Year'] }
];

export const YOG_LAB = {
    coach: 'Coach Likhit',
    // Days and timings are for the Yoga Abhyas group class.
    days: ['Monday', 'Wednesday', 'Friday'],
    timings: ['6:30 AM - 7:30 AM', '7:30 AM - 8:30 AM'],
    programs: [
        {
            name: 'Yoga Abhyas',
            tag: 'Group class',
            meaning: 'abhyās: steady practice',
            summary: 'A regular group session to build your yoga foundation.',
            points: ['Strength', 'Mobility & flexibility', 'Basic asanas & breathwork'],
            price: '₹6,666',
            frequency: '3 days a week',
        },
        {
            name: 'Yoga Sankalp',
            tag: 'Personal training',
            meaning: 'saṅkalp: a resolve, a goal',
            summary: '1-on-1, goal-oriented yoga built around you.',
            points: ['Posture correction', 'PCOD / PCOS support', 'Your personal yoga goals'],
            price: '₹11,111',
            frequency: '2 sessions a week',
        },
    ],
};

// Kids program levels (ages 3–15), shown on the kids page. Matches the parent program guide.
export const KIDS_LEVELS = [
    {
        level: 'Level 1',
        name: 'Foundation',
        goal: 'Body control, coordination, safe falling and basic strength. Usually 3–6 months.',
        skills: ['Animal movements and body shapes', 'Forward rolls and soft landings', 'Dead hangs, planks and balance'],
    },
    {
        level: 'Level 2',
        name: 'Builder',
        goal: 'Real strength and the first calisthenics and gymnastics skills. Usually 6–12 months.',
        skills: ['First chin-ups and full push-ups', 'Wall handstands and tuck L-sits', 'Cartwheels, bridges and backward rolls'],
    },
    {
        level: 'Level 3',
        name: 'Advanced',
        goal: 'Master advanced skills, link them into routines and get ready to compete. 12+ months.',
        skills: ['Pull-up sets, dips and tuck front lever', 'Freestanding handstand and full L-sit', 'Round-off, walkovers and a full routine'],
    },
];
