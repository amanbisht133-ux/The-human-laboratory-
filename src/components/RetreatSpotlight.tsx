import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin, Waves } from 'lucide-react';
import { retreat, RETREAT_PATH } from '../data/goaRetreat';

/** Home-page "Activities" section featuring the upcoming Goa retreat. */
export default function RetreatSpotlight() {
    return (
        <section className="relative py-16 md:py-24 px-4 md:px-6 section-glow overflow-hidden" id="activities">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 md:mb-14 reveal">
                    <span className="eyebrow">Upcoming Activity</span>
                    <h2 className="mt-4 font-condensed uppercase text-white text-5xl md:text-7xl leading-[0.9] tracking-wide">
                        Beyond <span className="ember-text">The Lab</span>
                    </h2>
                </div>

                <Link
                    to={RETREAT_PATH}
                    className="group grid lg:grid-cols-[1.05fr_1fr] rounded-[2rem] overflow-hidden bg-sand text-espresso shadow-[0_40px_90px_-40px_rgba(243,131,32,0.45)] reveal"
                >
                    <div className="relative min-h-[300px] md:min-h-[420px] overflow-hidden">
                        <img
                            src={retreat.images.cover}
                            alt="Retreat group resting on a North Goa beach"
                            width="993"
                            height="1404"
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover object-[50%_72%] transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent"></div>
                        <div className="absolute left-5 right-5 bottom-5 flex flex-wrap gap-2">
                            <span className="rounded-full bg-rust px-3 py-1.5 brochure-label !tracking-[0.2em] text-white">Goa Retreat</span>
                            <span className="rounded-full bg-white/15 backdrop-blur px-3 py-1.5 brochure-label !tracking-[0.2em] text-white">{retreat.shortDates}</span>
                        </div>
                    </div>

                    <div className="p-7 md:p-10 lg:p-12 flex flex-col">
                        <p className="brochure-label text-rust">Calisthenics Lab India · Presents</p>
                        <h3 className="mt-3 font-italiana leading-none">
                            <span className="block text-5xl md:text-7xl tracking-[0.04em]">STRENGTH</span>
                            <span className="block mt-2 font-work font-medium text-rust text-sm md:text-lg tracking-[0.42em]">&amp; STILLNESS</span>
                        </h3>
                        <p className="mt-5 font-dm text-[15px] leading-relaxed text-espresso/75">
                            {retreat.tagline}. Calisthenics on the sand, daily yoga and breathwork, a sound bath under the stars, a sunrise jungle trek, water sports and a bonfire jam, with people who start as strangers and leave as friends.
                        </p>

                        <ul className="mt-6 grid sm:grid-cols-3 gap-4 border-y border-espresso/15 py-5 font-dm text-sm">
                            <li className="flex items-start gap-2"><CalendarDays size={18} className="text-rust shrink-0" />{retreat.facts[0].value}</li>
                            <li className="flex items-start gap-2"><MapPin size={18} className="text-rust shrink-0" />{retreat.facts[1].value}</li>
                            <li className="flex items-start gap-2"><Waves size={18} className="text-rust shrink-0" />{retreat.facts[2].value}</li>
                        </ul>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {retreat.experiences.map(e => (
                                <span key={e.kicker} className="rounded-full border border-espresso/20 px-3 py-1 brochure-label !tracking-[0.18em] text-espresso/70">{e.kicker}</span>
                            ))}
                        </div>

                        <div className="mt-auto pt-8 flex flex-wrap items-end justify-between gap-5">
                            <div>
                                <p className="brochure-label text-taupe">Early bird · first 10 spots</p>
                                <p className="mt-1 font-crimson text-4xl md:text-5xl leading-none">
                                    {retreat.investment.earlyBird.price}
                                    <span className="ml-3 text-xl text-taupe line-through">{retreat.investment.earlyBird.was}</span>
                                </p>
                            </div>
                            <span className="btn-rust px-7 py-4">Explore the retreat <ArrowRight size={16} /></span>
                        </div>
                    </div>
                </Link>
            </div>
        </section>
    );
}
