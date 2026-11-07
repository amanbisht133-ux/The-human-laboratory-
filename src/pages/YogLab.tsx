import { CalendarDays, Clock, Download } from 'lucide-react';
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
                <div className="inline-block rounded-2xl bg-[#fbf4e8] px-5 py-3">
                    <img
                        src="/images/yog-lab-logo.webp"
                        alt="The Yog Lab logo: Optimize Your Energy, From Root to Crown"
                        width="727"
                        height="329"
                        className="h-20 md:h-24 w-auto"
                    />
                </div>
                <p>
                    Build strength, open up mobility and move with intention. The Yog Lab is the yoga studio at Calisthenics Lab
                    India in Kondapur, Hyderabad, near HITEC City, Gachibowli and Madhapur, with two ways to practise
                    with <strong className="text-white">{YOG_LAB.coach}</strong>.
                </p>
                <ContactButtons message={WA_MESSAGE} className="pt-2" />
                <a
                    href="/brochures/yog-lab-brochure.pdf"
                    download
                    className="inline-flex items-center gap-2 text-sm text-white/80 underline decoration-brand-orange/60 underline-offset-4 hover:text-brand-orange"
                >
                    <Download size={16} aria-hidden="true" /> Download the yoga brochure (PDF)
                </a>
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
                            <h2 className="flex items-center gap-3 font-condensed uppercase text-3xl tracking-wide"><CalendarDays className="text-brand-orange" /> Group class days</h2>
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
                    <h2 className="font-condensed uppercase text-4xl md:text-5xl tracking-wide reveal">Two ways to <span className="ember-text">practise</span></h2>
                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                        {YOG_LAB.programs.map((p, i) => (
                            <div
                                key={p.name}
                                className={`rounded-3xl p-7 flex flex-col reveal ${i === 1 ? 'bg-brand-orange text-black' : 'glass edge-ember'}`}
                            >
                                <span className={`self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${i === 1 ? 'bg-black text-brand-orange' : 'bg-brand-orange text-black'}`}>
                                    {p.tag}
                                </span>
                                <h3 className="mt-4 font-condensed uppercase text-4xl tracking-wide">{p.name}</h3>
                                <p className={`italic ${i === 1 ? 'text-black/75' : 'text-brand-orange'}`}>{p.meaning}</p>
                                <p className={`mt-4 ${i === 1 ? 'text-black/85' : 'text-white/80'}`}>{p.summary}</p>
                                <ul className="mt-4 space-y-2">
                                    {p.points.map(pt => (
                                        <li key={pt} className="flex gap-3"><span aria-hidden="true">—</span>{pt}</li>
                                    ))}
                                </ul>
                                <div className={`mt-6 pt-5 border-t ${i === 1 ? 'border-black/25' : 'border-white/15'}`}>
                                    <p>
                                        <span className="font-condensed text-5xl tracking-wide">{p.price}</span>
                                        <span className={i === 1 ? 'text-black/75' : 'text-white/70'}> / month</span>
                                    </p>
                                    <p className="mt-1 font-semibold">{p.frequency}</p>
                                </div>
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
