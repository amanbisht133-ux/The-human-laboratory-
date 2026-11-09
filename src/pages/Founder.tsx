import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { getPageMeta } from '../seo/pages';
import PageHero from '../components/PageHero';
import ContactButtons from '../components/ContactButtons';
import { founder } from '../data/founder';

const PATH = founder.path;

const H2 = 'font-condensed uppercase text-4xl md:text-5xl tracking-wide';
const P = 'mt-4 text-white/80 leading-relaxed md:text-lg';

function Photo({ src, alt, w, h, pos = 'center', ratio = 'aspect-[4/3]' }: { src: string; alt: string; w: number; h: number; pos?: string; ratio?: string }) {
    return (
        <div className={`mt-8 rounded-3xl overflow-hidden edge-ember ${ratio} reveal`}>
            <img src={src} alt={alt} width={w} height={h} loading="lazy" className="w-full h-full object-cover" style={{ objectPosition: pos }} />
        </div>
    );
}

export default function Founder() {
    usePageMeta(PATH);
    useReveal();
    const meta = getPageMeta(PATH);

    return (
        <article className="text-white">
            <PageHero crumbs={[{ name: 'About', to: '/about' }, { name: meta.name }]} eyebrow="Athlete · Coach · Founder" title={meta.h1}>
                <p>{founder.summary}</p>
            </PageHero>

            <div className="px-6 pb-20">
                <div className="max-w-3xl mx-auto">
                    <div className="rounded-3xl overflow-hidden edge-ember aspect-[4/5] sm:aspect-[3/2] reveal">
                        <img
                            src="/images/founder/aman-namaste.webp"
                            alt="Aman Bisht greeting the crowd at a calisthenics competition"
                            width={1598}
                            height={1066}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: '42% center' }}
                        />
                    </div>

                    <section className="mt-10 glass edge-ember rounded-3xl p-6 md:p-8 reveal" aria-labelledby="glance">
                        <h2 id="glance" className="font-semibold uppercase tracking-[0.18em] text-xs text-brand-orange">Aman Bisht at a glance</h2>
                        <dl className="mt-4 divide-y divide-white/10">
                            {founder.glance.map(item => (
                                <div key={item.label} className="py-3 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-4">
                                    <dt className="text-xs uppercase tracking-widest text-white/50">{item.label}</dt>
                                    <dd className="mt-1 sm:mt-0 text-white/90">{item.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section className="mt-14">
                        <h2 className={H2}>It began in <span className="ember-text">Dehradun</span>, for free</h2>
                        <p className={P}>
                            Aman's coaching started at home. Around 2019 he began teaching calisthenics in Dehradun, Uttarakhand, and he
                            did not charge for it. Anyone who turned up at the bars could learn.
                        </p>
                        <p className={P}>
                            Two of the people he trained there, {founder.students[0]} and {founder.students[1]}, went on to win national
                            calisthenics championships and represent India. Both now coach alongside him in Hyderabad.
                        </p>
                    </section>

                    <section className="mt-14">
                        <h2 className={H2}>Hyderabad: from scattered groups to <span className="ember-text">one community</span></h2>
                        <p className={P}>
                            When Aman moved to Hyderabad he started teaching in parks and gyms. People in the city were already doing
                            bodyweight workouts, but in small groups that never met.
                        </p>
                        <blockquote className="mt-6 border-l-2 border-brand-orange pl-5 text-xl md:text-2xl leading-snug text-white">
                            “People were doing calisthenics, but they were not together. There was no community.”
                        </blockquote>
                        <p className={P}>
                            So the same year, he started Hyderabad Calisthenics to bring them together. The first meetup drew five to ten
                            people. Today 40 to 50 people turn up to every event, from open park sessions and group runs to
                            inter-academy competitions.
                        </p>
                        <p className={P}>
                            He also shared what he had learned as a competitor. Coaches who were already teaching in the city trained
                            with him on technique and took it back to their own students.
                        </p>
                        <Photo src="/images/founder/aman-start-flag.webp" alt="Aman Bisht flagging off a Hyderabad Calisthenics community run" w={1600} h={2000} pos="center 40%" ratio="aspect-[4/5] sm:aspect-[3/2]" />
                    </section>

                    <section className="mt-14">
                        <h2 className={H2}>Competing for <span className="ember-text">India</span></h2>
                        <p className={P}>Aman has worn the India jersey three times and won the national title more than once.</p>
                        <ol className="mt-6 space-y-3">
                            {founder.record.map(item => (
                                <li key={item.what} className="glass rounded-2xl p-5 reveal">
                                    <p className="ember-text font-bold uppercase tracking-widest text-xs">{item.when} · {item.where}</p>
                                    <p className="mt-2 text-white/85 leading-relaxed">{item.what}</p>
                                </li>
                            ))}
                        </ol>
                        <Photo src="/images/founder/aman-judging.webp" alt="Aman Bisht on the judging panel at a calisthenics competition" w={1598} h={1066} pos="51% center" />
                    </section>

                    <section className="mt-14">
                        <h2 className={H2}>Hundreds of <span className="ember-text">workshops</span></h2>
                        <p className={P}>
                            Aman has taught hundreds of calisthenics workshops in schools, colleges and corporate offices, along with
                            outdoor events and sessions at his academies. For many people in those rooms it was the first time they
                            had heard the word calisthenics.
                        </p>
                        <p className={P}>
                            One of his early street workout videos is still on YouTube.{' '}
                            <a href={founder.earlyVideo} target="_blank" rel="noopener" className="text-brand-orange underline underline-offset-4">Watch it here</a>.
                        </p>
                        <Photo src="/images/founder/aman-stage-talk.webp" alt="Aman Bisht speaking on stage at a calisthenics event" w={1800} h={1200} pos="46% center" />
                    </section>

                    <section className="mt-14">
                        <h2 className={H2}>Two academies in <span className="ember-text">Hyderabad</span></h2>
                        <p className={P}>The community needed a place to train properly, so Aman built two.</p>
                        <div className="mt-6 grid sm:grid-cols-2 gap-4">
                            <Link to="/" className="glass rounded-2xl p-5 hover:border-brand-orange/40 transition-colors reveal">
                                <p className="ember-text font-bold uppercase tracking-widest text-xs">Kondapur</p>
                                <p className="mt-2 font-semibold text-white">Calisthenics Lab India</p>
                                <p className="mt-1 text-sm text-white/70 leading-relaxed">Adult batches, personal coaching, The Mighty Tribe kids program and yoga.</p>
                            </Link>
                            <a href="https://www.indiancalisthenicsschool.com/" target="_blank" rel="noopener" className="glass rounded-2xl p-5 hover:border-brand-orange/40 transition-colors reveal">
                                <p className="ember-text font-bold uppercase tracking-widest text-xs">Madhapur</p>
                                <p className="mt-2 font-semibold text-white">Indian Calisthenics School</p>
                                <p className="mt-1 text-sm text-white/70 leading-relaxed">Morning and evening calisthenics batches near HITEC City.</p>
                            </a>
                        </div>
                    </section>

                    <aside className="mt-14 glass edge-ember rounded-3xl p-6 md:p-8 text-center reveal">
                        <p className="font-condensed uppercase text-3xl md:text-4xl tracking-wide">Train with Aman's team</p>
                        <p className="mt-3 text-white/70">
                            For workshops, events and media, message us on WhatsApp. <Link to="/about" className="text-brand-orange underline underline-offset-4">About the academy</Link>.
                        </p>
                        <ContactButtons message="Hi! I read about Aman Bisht and would like to get in touch." className="mt-6 justify-center" />
                    </aside>
                </div>
            </div>
        </article>
    );
}
