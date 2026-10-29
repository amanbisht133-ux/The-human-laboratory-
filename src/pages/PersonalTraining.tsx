import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { getPageMeta } from '../seo/pages';
import PageHero from '../components/PageHero';
import ContactButtons from '../components/ContactButtons';
import FaqList from '../components/FaqList';
import { personalTrainingFaqs } from '../data/faqs';
import reviews from '../data/reviews.json';

const PATH = '/personal-training';
const WA_MESSAGE = "Hi! I'd like to book a consultation for personal calisthenics coaching.";
const SKILLS = ['Pull-ups', 'Push-ups', 'Dips', 'Handstands', 'L-sit', 'Muscle-ups', 'Levers'];
// A Google review that specifically describes personal training.
const ptReview = reviews.find(r => r.text.includes('personal training'));

export default function PersonalTraining() {
    usePageMeta(PATH);
    useReveal();
    const meta = getPageMeta(PATH);

    return (
        <div className="text-white">
            <PageHero crumbs={[{ name: meta.name }]} eyebrow="Personal Training" title={meta.h1}>
                <p>
                    One-on-one calisthenics coaching at Calisthenics Lab India in Kondapur, Hyderabad. We build a programme
                    around your goals, whether that is your first pull-up or advanced skills like handstands, muscle-ups and levers.
                </p>
                <ContactButtons message={WA_MESSAGE} className="pt-2" />
            </PageHero>

            <section className="px-6 pb-16">
                <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.1fr] gap-8 items-center">
                    <div className="rounded-3xl overflow-hidden edge-ember reveal">
                        <img
                            src="/images/goa/handstand.webp"
                            alt="Coach spotting a student in a handstand during a one-on-one skills session"
                            width="933"
                            height="1400"
                            loading="lazy"
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="reveal">
                        <h2 className="font-condensed uppercase text-4xl md:text-5xl tracking-wide">Skills we <span className="ember-text">coach</span></h2>
                        <ul className="mt-6 grid grid-cols-2 gap-3">
                            {SKILLS.map(skill => (
                                <li key={skill} className="flex items-center gap-3">
                                    <span className="size-7 shrink-0 rounded-full ember-bg text-ink flex items-center justify-center"><Check size={15} strokeWidth={3} /></span>
                                    <span className="text-white/90">{skill}</span>
                                </li>
                            ))}
                        </ul>
                        <h2 className="mt-10 font-condensed uppercase text-4xl md:text-5xl tracking-wide">How it <span className="ember-text">works</span></h2>
                        <ol className="mt-5 space-y-4">
                            {[
                                ['Consultation', 'Message or call us and tell us your goals, schedule and training history.'],
                                ['Your programme', 'We build progressions around where you are today and where you want to get to.'],
                                ['One-on-one sessions', 'Coached sessions with feedback on every rep, adjusted as you progress.'],
                            ].map(([title, text], i) => (
                                <li key={title} className="flex gap-4">
                                    <span className="font-condensed text-3xl ember-text leading-none">0{i + 1}</span>
                                    <div>
                                        <p className="font-semibold uppercase tracking-wide">{title}</p>
                                        <p className="text-white/70 text-sm leading-relaxed">{text}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <p className="mt-6 text-white/60 text-sm">Pricing depends on your goals and schedule and is shared after the consultation.</p>
                    </div>
                </div>
            </section>

            {ptReview && (
                <section className="px-6 pb-16">
                    <figure className="max-w-4xl mx-auto glass edge-ember rounded-3xl p-6 md:p-10 reveal">
                        <blockquote className="text-white/85 leading-relaxed md:text-lg">"{ptReview.text}"</blockquote>
                        <figcaption className="mt-5 text-sm text-white/60">{ptReview.name}, Google review</figcaption>
                    </figure>
                </section>
            )}

            <section className="px-6 pb-20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-condensed uppercase text-4xl md:text-5xl tracking-wide mb-8 reveal">Personal training <span className="ember-text">FAQs</span></h2>
                    <div className="reveal"><FaqList faqs={personalTrainingFaqs} /></div>
                    <p className="mt-8 text-white/70 reveal">
                        Prefer training in a group? See our <Link to="/" className="text-brand-orange underline underline-offset-4">adult calisthenics batches</Link>, or read{' '}
                        <Link to="/blog/how-to-do-your-first-pull-up" className="text-brand-orange underline underline-offset-4">how to do your first pull-up</Link>.
                    </p>
                    <div className="mt-10 glass edge-ember rounded-3xl p-6 md:p-8 text-center reveal">
                        <p className="font-condensed uppercase text-3xl md:text-4xl tracking-wide">Book a consultation</p>
                        <ContactButtons message={WA_MESSAGE} className="mt-5 justify-center" />
                    </div>
                </div>
            </section>
        </div>
    );
}
