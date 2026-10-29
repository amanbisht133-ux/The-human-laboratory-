import { CalendarDays, Sparkles } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { getPageMeta } from '../seo/pages';
import PageHero from '../components/PageHero';
import ContactButtons from '../components/ContactButtons';
import FaqList from '../components/FaqList';
import { kidsFaqs } from '../data/faqs';
import { BATCH_TIMINGS, PRICING_TIERS } from '../data/programs';

const PATH = '/kids-calisthenics';
const WA_MESSAGE = "Hi! I'd like to know more about the kids calisthenics & gymnastics batch.";

export default function KidsCalisthenics() {
    usePageMeta(PATH);
    useReveal();
    const meta = getPageMeta(PATH);

    return (
        <div className="text-white">
            <PageHero crumbs={[{ name: meta.name }]} eyebrow="Kids Program" title={meta.h1}>
                <p>
                    Our kids program at Calisthenics Lab India in Kondapur, Hyderabad combines calisthenics and gymnastics
                    fundamentals in one subscription, coached in a structured, age-appropriate format. Batches run on weekday
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
                            Calisthenics <span className="ember-text">+ Gymnastics</span>
                        </h2>
                        <p className="mt-4 text-white/75 leading-relaxed">
                            One subscription covers both disciplines. Kids build strength, balance and body control through
                            bodyweight training and gymnastics fundamentals, coached step by step in small groups.
                        </p>
                        <ul className="mt-6 space-y-3">
                            {[
                                'Calisthenics and gymnastics fundamentals in a single subscription',
                                'Structured, age-appropriate coaching',
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
