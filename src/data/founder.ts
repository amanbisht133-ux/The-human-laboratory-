// Aman Bisht's story and record. The founder page (/aman-bisht) and the Person
// schema both read from here, so a fact is only ever written once. Only add
// things Aman has confirmed.

export const founder = {
    name: 'Aman Bisht',
    path: '/aman-bisht',
    /** One-sentence answer to "who is Aman Bisht?", used as the page intro and in the schema. */
    summary:
        'Aman Bisht is an Indian calisthenics athlete and coach from Dehradun, based in Hyderabad. He has represented India three times, is a multiple-time national calisthenics champion and competition judge, and founded the Hyderabad Calisthenics community, Calisthenics Lab India and Indian Calisthenics School.',
    instagram: 'https://www.instagram.com/gravity_antagonist_sw',
    earlyVideo: 'https://youtu.be/jMsE8AEW3Dw',
    glance: [
        { label: 'From', value: 'Dehradun, Uttarakhand' },
        { label: 'Based in', value: 'Hyderabad, Telangana' },
        { label: 'Coaching since', value: '2019' },
        { label: 'India appearances', value: 'Three: Italy 2023, Russia 2024 and the Asian Championship of Freestyle, Mumbai 2024' },
        { label: 'Judge', value: 'Has judged calisthenics competitions across India' },
        { label: 'National titles', value: 'Multiple-time national calisthenics champion' },
        { label: 'Founder of', value: 'Hyderabad Calisthenics, Calisthenics Lab India and Indian Calisthenics School' },
    ],
    record: [
        { when: '2023', where: 'Italy', what: 'Represented India at the Burningate calisthenics championship.' },
        { when: '2024', where: 'Russia', what: 'Represented India in international competition.' },
        { when: '2024', where: 'Mumbai', what: 'Asian Championship of Freestyle at All India Strength Wars 5.0: second among Indian athletes and third in Asia.' },
        { when: 'Nationals', where: 'India', what: 'Multiple-time national calisthenics champion.' },
    ],
    students: ['Ankush Dhiman', 'Shivani Bamrara'],
    awards: [
        'Third place in Asia and second among Indian athletes, Asian Championship of Freestyle (Mumbai, 2024)',
        'Multiple-time national calisthenics champion',
    ],
};
