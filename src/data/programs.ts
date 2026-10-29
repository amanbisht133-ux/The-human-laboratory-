// Calisthenics and Yog Lab pricing and timings, shared by the home page,
// the kids page, the Yog Lab page and the booking form.

export const PRICING_TIERS: Record<string, Record<string, string>> = {
    'Weekday Batch': {
        '1 Day': '₹800',
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
    { day: 'Monday', focus: 'Upperbody Push & Pull' },
    { day: 'Tuesday', focus: 'Legs & Core' },
    { day: 'Wednesday', focus: 'Skills & Upperbody' },
    { day: 'Thursday', focus: 'Full Body Endurance' },
    { day: 'Friday', focus: 'Skills | Upperbody' }
];

export const MEMBERSHIP_PLANS = [
    { plan: 'Kids Batch', price: PRICING_TIERS['Kids Batch']['1 Month'] },
    { plan: 'Monthly Membership', price: PRICING_TIERS['Weekday Batch']['1 Month'] },
    { plan: '3-Month Membership', price: PRICING_TIERS['Weekday Batch']['3 Months'] },
    { plan: '6-Month Membership', price: PRICING_TIERS['Weekday Batch']['6 Months'] },
    { plan: '1-Year Membership*', price: PRICING_TIERS['Weekday Batch']['1 Year'] }
];

export const YOG_LAB = {
    days: ['Monday', 'Wednesday', 'Friday'],
    timings: ['6:30 AM - 7:30 AM', '7:30 AM - 8:30 AM'],
    plans: [
        { plan: 'Monthly', price: '₹3,333' },
        { plan: 'Quarterly', price: '₹8,888' },
        { plan: 'Yearly', price: '₹33,333' },
    ],
};
