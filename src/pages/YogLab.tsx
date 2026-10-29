import { CalendarDays, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { getPageMeta } from '../seo/pages';
import PageHero from '../components/PageHero';
import ContactButtons from '../components/ContactButtons';
import FaqList from '../components/FaqList';
import { yogFaqs } from '../data/faqs';
import { YOG_LAB } from '../data/programs';

const PATH = '/yog-lab';
const WA_MESSAGE = "Hi! I'd like to join yoga classes at The Yog Lab.";

export default function YogLab() {
    usePageMeta(PATH);
    useReveal();
    const meta = getPageMeta(PATH);

    return (
        <div className="text-white">
            <PageHero crumbs={[{ name: meta.name }]} eyebrow="The Yog Lab" title={meta.h1}>
                <p>
                    The Yog Lab is the yoga studio at Calisthenics Lab India in Kondapur, Hyderabad, near HITEC City, Gachibowli
                    and Madhapur. Classes run on Monday, Wednesday and Friday mornings, with monthly, quarterly and yearly plans.
                </p>
                <ContactButtons message={WA_MESSAGE} className="pt-2" />
            </PageHero>

            <section className="px-6 pb-16">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
                    <div className="rounded-3xl overflow-hidden edge-ember reveal">
                        <img
                            src="/images/goa/breathe.webp"
                            alt="Group yoga and breathwork class in an indoor studio"
                            width="1400"
                            height="1091"
                            loading="lazy"
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="grid gap-5 reveal">
                        <div className="glass edge-ember rounded-3xl p-6">
                            <h2 className="flex items-center gap-3 font-condensed uppercase text-3xl tracking-wide"><CalendarDays className="text-brand-orange" /> Class days</h2>
                            <p className="mt-3 text-lg text-white/85">{YOG_LAB.days.join(' · ')}</p>
                        </div>
                        <div className="glass edge-ember rounded-3xl p-6">
                            <h2 className="flex items-center gap-3 font-condensed uppercase text-3xl tracking-wide"><Clock className="text-brand-orange" /> Timings</h2>
                            <ul className="mt-3 space-y-1 text-lg text-white/85">{YOG_LAB.timings.map(t => <li key={t}>{t}</li>)}</ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-condensed uppercase text-4xl md:text-5xl tracking-wide reveal">Yoga <span className="ember-text">plans</span></h2>
                    <div className="mt-8 grid sm:grid-cols-3 gap-5">
                        {YOG_LAB.plans.map(({ plan, price }) => (
                            <div key={plan} className="glass edge-ember rounded-3xl p-6 text-center reveal">
                                <p className="eyebrow">{plan}</p>
                                <p className="mt-3 font-condensed text-5xl tracking-wide">{price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-condensed uppercase text-4xl md:text-5xl tracking-wide mb-8 reveal">The Yog Lab <span className="ember-text">FAQs</span></h2>
                    <div className="reveal"><FaqList faqs={yogFaqs} /></div>
                    <p className="mt-8 text-white/70 reveal">
                        Want strength work too? See <Link to="/" className="text-brand-orange underline underline-offset-4">calisthenics batches</Link> at the same location.
                    </p>
                    <div className="mt-10 glass edge-ember rounded-3xl p-6 md:p-8 text-center reveal">
                        <p className="font-condensed uppercase text-3xl md:text-4xl tracking-wide">Join The Yog Lab</p>
                        <ContactButtons message={WA_MESSAGE} className="mt-5 justify-center" />
                    </div>
                </div>
            </section>
        </div>
    );
}
