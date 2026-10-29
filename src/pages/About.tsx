import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { getPageMeta } from '../seo/pages';
import PageHero from '../components/PageHero';
import ContactButtons from '../components/ContactButtons';
import { business } from '../data/business';

const PATH = '/about';

export default function About() {
    usePageMeta(PATH);
    useReveal();
    const meta = getPageMeta(PATH);

    return (
        <div className="text-white">
            <PageHero crumbs={[{ name: meta.name }]} eyebrow={business.tagline} title={meta.h1}>
                <p>
                    Calisthenics Lab India is a calisthenics academy in Kondapur, Hyderabad, built around one idea: by the
                    community, for the community. We coach adults from complete beginners to advanced athletes, run a kids
                    calisthenics &amp; gymnastics program, offer personal coaching and host yoga at The Yog Lab.
                </p>
            </PageHero>

            <section className="px-6 pb-16">
                <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-10 items-center">
                    <div className="rounded-3xl overflow-hidden edge-ember reveal">
                        <img
                            src="/images/goa/aman.webp"
                            alt="Aman Bisht, founder and head coach of Calisthenics Lab India, on the beach"
                            width="1021"
                            height="1400"
                            loading="lazy"
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="reveal">
                        <span className="eyebrow">Founder & head coach</span>
                        <h2 className="mt-3 font-condensed uppercase text-5xl md:text-6xl tracking-wide">{business.founder.name}</h2>
                        <p className="mt-4 text-white/85 font-semibold">{business.founder.credentials}.</p>
                        <p className="mt-4 text-white/75 leading-relaxed">
                            Aman is the founder of Calisthenics Lab India, Indian Calisthenics School and Hyderabad Calisthenics.
                            He builds strength the patient way: solid foundations, clean progressions and a lot of fun along the way.
                        </p>
                        <p className="mt-4 text-white/75 leading-relaxed">
                            He leads a coaching team of three, so every batch gets close attention, from first push-ups to
                            muscle-ups, handstands and levers.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-condensed uppercase text-4xl md:text-5xl tracking-wide reveal">What we <span className="ember-text">teach</span></h2>
                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: 'Adult batches', text: 'Beginner to advanced group coaching on weekdays and weekends.', to: '/' },
                            { title: 'Personal coaching', text: 'One-on-one programmes built around your goals.', to: '/personal-training' },
                            { title: 'Kids program', text: 'Calisthenics and gymnastics fundamentals for kids.', to: '/kids-calisthenics' },
                            { title: 'The Yog Lab', text: 'Yoga classes on Monday, Wednesday and Friday mornings.', to: '/yog-lab' },
                        ].map(item => (
                            <Link key={item.title} to={item.to} className="glass rounded-2xl p-5 hover:border-brand-orange/40 transition-colors reveal">
                                <p className="ember-text font-bold uppercase tracking-widest text-xs">{item.title}</p>
                                <p className="mt-2 text-sm text-white/75 leading-relaxed">{item.text}</p>
                            </Link>
                        ))}
                    </div>
                    <p className="mt-8 text-white/75 leading-relaxed reveal">
                        Skills we coach: pull-ups, push-ups, dips, handstands, L-sits, muscle-ups and levers.
                    </p>
                </div>
            </section>

            <section className="px-6 pb-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-condensed uppercase text-4xl md:text-5xl tracking-wide reveal">Our <span className="ember-text">community</span></h2>
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 reveal">
                        {[
                            ['community-1', 1400, 510, 'Large group photo of Calisthenics Lab India members at the gym'],
                            ['community-4', 1260, 1400, 'Members celebrating Holi together after a training session'],
                            ['community-5', 1260, 1400, 'Aerial view of a group bodyweight workout in rows'],
                            ['community-3', 1400, 554, 'Calisthenics Lab India community group photo'],
                            ['community-6', 1260, 1400, 'Handstand demonstration during a skills workshop'],
                            ['community-7', 1400, 390, 'Group resting on the beach after a morning session'],
                        ].map(([name, w, h, alt]) => (
                            <div key={name} className="rounded-2xl overflow-hidden aspect-square">
                                <img src={`/images/goa/${name}.webp`} alt={alt as string} width={w} height={h} loading="lazy" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-4xl mx-auto glass edge-ember rounded-3xl p-6 md:p-10 text-center reveal">
                    <p className="font-condensed uppercase text-3xl md:text-4xl tracking-wide">Train with us in Kondapur</p>
                    <p className="mt-3 text-white/70">
                        Visit us near HITEC City, Gachibowli and Madhapur. <Link to="/contact" className="text-brand-orange underline underline-offset-4">See address and hours</Link>.
                    </p>
                    <ContactButtons message="Hi! I'd like to know more about training at Calisthenics Lab India." className="mt-6 justify-center" />
                </div>
            </section>
        </div>
    );
}
