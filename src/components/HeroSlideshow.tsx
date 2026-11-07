// Home hero background: community photos that slowly cross-fade one at a time,
// each with a gentle zoom. Pure CSS (see .hero-slide in index.css), so it also
// works in the prerendered HTML and needs no JavaScript.
const SLIDES = [
    { src: '/images/hero/street-run-crew.webp', w: 1280, h: 1600, pos: 'center 58%', alt: 'Calisthenics Lab India community after an outdoor group session in Hyderabad' },
    { src: '/images/hero/gym-group.webp', w: 1600, h: 1066, pos: 'center 62%', alt: 'Members at the Calisthenics Lab India studio in Kondapur' },
    { src: '/images/hero/holi.webp', w: 1200, h: 1600, pos: 'center 62%', alt: 'Holi celebration with the community at the studio' },
    { src: '/images/hero/gym-flex.webp', w: 1600, h: 1200, pos: 'center 55%', alt: 'Members flexing after a class at the studio' },
    { src: '/images/hero/night-session.webp', w: 1007, h: 1600, pos: 'center 55%', alt: 'Night calisthenics meetup with the Hyderabad community' },
    { src: '/images/hero/courtyard-meetup.webp', w: 1320, h: 922, pos: 'center 55%', alt: 'Large community meetup group photo' },
    { src: '/images/hero/ics-certificates.webp', w: 1600, h: 901, pos: 'center 55%', alt: 'Workshop participants holding their certificates' },
    { src: '/images/hero/halloween.webp', w: 1200, h: 1600, pos: 'center 62%', alt: 'Community Halloween party in costumes' },
];

export const HERO_SLIDE_SECONDS = 3.5;

export default function HeroSlideshow() {
    const total = SLIDES.length * HERO_SLIDE_SECONDS;
    return (
        <div className="absolute inset-0 overflow-hidden">
            {SLIDES.map((s, i) => (
                <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    width={s.w}
                    height={s.h}
                    decoding="async"
                    fetchPriority={i === 0 ? 'high' : 'low'}
                    className="hero-slide absolute inset-0 w-full h-full object-cover brightness-[0.45] saturate-[0.8]"
                    style={{
                        objectPosition: s.pos,
                        animationDuration: `${total}s`,
                        // First slide starts already faded in; the rest follow in turn.
                        animationDelay: `${i * HERO_SLIDE_SECONDS - HERO_SLIDE_SECONDS / 4}s`,
                    }}
                />
            ))}
        </div>
    );
}
