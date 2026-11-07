import { CalendarDays, Sparkles } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { getPageMeta } from '../seo/pages';
import PageHero from '../components/PageHero';
import ContactButtons from '../components/ContactButtons';
import FaqList from '../components/FaqList';
import { kidsFaqs } from '../data/faqs';
import { BATCH_TIMINGS, KIDS_LEVELS, PRICING_TIERS } from '../data/programs';

const PATH = '/kids-calisthenics';
const WA_MESSAGE = "Hi! I'd like to know more about the kids calisthenics, gymnastics & parkour batch.";

export default function KidsCalisthenics() {
    usePageMeta(PATH);
    useReveal();
    const meta = getPageMeta(PATH);

    return (
        <div className="text-white">
            <PageHero
                crumbs={[{ name: meta.name }]}
                eyebrow="Kids Calisthenics, Gymnastics & Parkour · Kondapur"
                title={meta.h1}
                logo={{ src: '/images/the-mighty-tribe-logo.webp', alt: 'The Mighty Tribe logo', size: 480 }}
            >
                <p>
                    The Mighty Tribe is our kids program at Calisthenics Lab India in Kondapur, Hyderabad. It combines calisthenics, gymnastics and
                    parkour in one subscription for kids aged 3 to 15, taught in three clear levels. Batches run on weekday
                    evenings and weekend mornings, close to HITEC City, Gachibowli and Madhapur.
                </p>
                <ContactButtons message={WA_MESSAGE} className="pt-2" />
            </PageHero>

            <section className="px-6 pb-16">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <div className="rounded-3xl overflow-hidden edge-ember reveal">
                        <img
                            src="/images/goa/community-6.webp"
                            alt="Coach demonstrating a handstand during a skills workshop at Calisthenics Lab India"
                            width="1260"
                            height="1400"
                            loading="lazy"
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="reveal">
                        <h2 className="font-condensed uppercase text-4xl md:text-5xl tracking-wide">
                            Calisthenics, Gymnastics <span className="ember-text">+ Parkour</span>
                        </h2>
                        <p className="mt-4 text-white/75 leading-relaxed">
                            One subscription covers all three. Every class is about 40% calisthenics, 40% gymnastics and 20%
                            parkour, so kids build strength, balance, body control and the confidence to move freely.
                        </p>
                        <ul className="mt-6 space-y-3">
                            {[
                                'For ages 3 to 15, with play-based classes for the youngest',
                                'Three levels with a skills checklist and a certificate at each step',
                                'Strong kids can be selected for competitions',
                                'Weekday evening and weekend morning batches',
                            ].map(item => (
                                <li key={item} className="flex gap-3">
                                    <Sparkles size={18} className="text-brand-orange shrink-0 mt-0.5" />
                                    <span className="text-white/85">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-condensed uppercase text-4xl md:text-5xl tracking-wide reveal">Three levels, <span className="ember-text">one clear path</span></h2>
                    <p className="mt-4 max-w-3xl text-white/75 leading-relaxed reveal">
                        Kids move up when they pass their level's skills checklist, not because of their age. Skills are tested
                        every 3 months, parents get a progress card, and every level passed earns a certificate. Ages 3–5 learn
                        Level 1 through games and obstacle courses.
                    </p>
                    <div className="mt-8 grid md:grid-cols-3 gap-5">
                        {KIDS_LEVELS.map(l => (
                            <div key={l.level} className="glass edge-ember rounded-3xl p-6 reveal">
                                <p className="eyebrow">{l.level}</p>
                                <h3 className="mt-2 font-condensed uppercase text-3xl tracking-wide">{l.name}</h3>
                                <p className="mt-3 text-white/80 leading-relaxed">{l.goal}</p>
                                <ul className="mt-4 space-y-2">
                                    {l.skills.map(sk => (
                                        <li key={sk} className="flex gap-3 text-white/85">
                                            <Sparkles size={16} className="text-brand-orange shrink-0 mt-1" />
                                            <span>{sk}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 pb-16">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
                    <div className="glass edge-ember rounded-3xl p-6 md:p-8 reveal">
                        <h2 className="flex items-center gap-3 font-condensed uppercase text-3xl md:text-4xl tracking-wide">
                            <CalendarDays className="text-brand-orange" /> Batch timings
                        </h2>
                        {Object.entries(BATCH_TIMINGS['Kids Batch']).map(([session, times]) => (
                            <div key={session} className="mt-5">
                                <p className="text-brand-orange font-bold uppercase tracking-widest text-xs">{session}</p>
                                <ul className="mt-2">
                                    {times.map(t => <li key={t} className="py-2 border-b border-white/5 last:border-b-0 text-lg">{t}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="glass edge-ember rounded-3xl p-6 md:p-8 reveal">
                        <h2 className="font-condensed uppercase text-3xl md:text-4xl tracking-wide">Plans</h2>
                        <table className="mt-5 w-full text-left">
                            <tbody>
                                {Object.entries(PRICING_TIERS['Kids Batch']).map(([plan, price]) => (
                                    <tr key={plan} className="border-b border-white/5 last:border-b-0">
                                        <th scope="row" className="py-2.5 font-normal text-white/80">{plan === '1 Day' ? 'Single session' : plan}</th>
                                        <td className="py-2.5 text-right font-condensed text-2xl tracking-wide">{price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-condensed uppercase text-4xl md:text-5xl tracking-wide mb-8 reveal">Kids program <span className="ember-text">FAQs</span></h2>
                    <div className="reveal"><FaqList faqs={kidsFaqs} /></div>
                    <div className="mt-10 glass edge-ember rounded-3xl p-6 md:p-8 text-center reveal">
                        <p className="font-condensed uppercase text-3xl md:text-4xl tracking-wide">Book your child's spot</p>
                        <ContactButtons message={WA_MESSAGE} className="mt-5 justify-center" />
                    </div>
                </div>
            </section>
        </div>
    );
}
