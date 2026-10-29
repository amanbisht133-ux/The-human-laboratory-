import { useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import caliLogo from '../components/images/CALI@2x.webp';
import { retreat, RETREAT_PATH, RETREAT_REGISTER_URL, RETREAT_WHATSAPP_URL } from '../data/goaRetreat';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { trackPixelEvent } from '../lib/metaPixel';
import imageSizes from '../data/imageSizes.json';

const sizeOf = (src: string) => (imageSizes as Record<string, number[]>)[src] ?? [];

// Styled after the "Strength & Stillness" brochure: cream editorial pages,
// Italiana headlines, spaced Work Sans labels and burnt-orange accents.
// Key facts sit up front; the detail lives in accordions further down.

function Label({ children, className = 'text-rust' }: { children: ReactNode; className?: string }) {
    return <p className={`brochure-label ${className}`}>{children}</p>;
}

function SectionHead({ kicker, title }: { kicker: string; title: ReactNode }) {
    return (
        <div className="reveal">
            <Label>{kicker}</Label>
            <h2 className="mt-3 font-italiana text-5xl md:text-6xl leading-[1.02] text-espresso">{title}</h2>
        </div>
    );
}

function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
    return (
        <div className={`overflow-hidden rounded-sm shadow-[0_24px_50px_-28px_rgba(28,24,19,0.55)] ${className}`}>
            {/* Slight zoom crops the thin dark edges some brochure photos carry from the PDF */}
            <img src={src} alt={alt} width={sizeOf(src)[0]} height={sizeOf(src)[1]} loading="lazy" className="w-full h-full object-cover scale-[1.07] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.12]" />
        </div>
    );
}

function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
    return (
        <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">{children}</div>
        </div>
    );
}

function Toggle({ open }: { open: boolean }) {
    return (
        <span className={`size-9 md:size-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${open ? 'bg-rust text-white rotate-45' : 'border border-espresso/25 text-rust'}`}>
            <Plus size={18} />
        </span>
    );
}

function DetailAccordion({ kicker, title, summary, open, onToggle, children }: {
    kicker: string; title: string; summary: string; open: boolean; onToggle: () => void; children: ReactNode;
}) {
    return (
        <div className="border-b border-espresso/20">
            <button onClick={onToggle} aria-expanded={open} className="w-full flex items-center gap-5 py-6 md:py-7 text-left group">
                <div className="flex-1 min-w-0">
                    <Label>{kicker}</Label>
                    <p className="mt-2 font-italiana text-3xl md:text-4xl leading-tight group-hover:text-rust transition-colors">{title}</p>
                    <p className={`mt-1 text-sm text-taupe transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`}>{summary}</p>
                </div>
                <Toggle open={open} />
            </button>
            <Collapse open={open}>
                <div className="pb-10">{children}</div>
            </Collapse>
        </div>
    );
}

function RegisterButton({ className = '' }: { className?: string }) {
    return (
        <a
            href={RETREAT_REGISTER_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackPixelEvent('Lead', { content_name: 'Goa Retreat Registration' })}
            className={`btn-rust px-8 py-4 whitespace-nowrap ${className}`}
        >
            Register now <ArrowUpRight size={16} />
        </a>
    );
}

function WhatsAppLink() {
    return (
        <a
            href={RETREAT_WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackPixelEvent('Contact', { content_name: 'Goa Retreat WhatsApp' })}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 font-work font-semibold text-xs tracking-[0.2em] uppercase text-white whitespace-nowrap hover:border-rust-light hover:text-rust-light transition-colors"
        >
            Ask on WhatsApp <ArrowRight size={16} />
        </a>
    );
}

type Detail = 'journey' | 'stay' | 'guides' | 'booking' | 'invitation' | 'community';

export default function GoaRetreat() {
    usePageMeta(RETREAT_PATH);
    useReveal();

    const [openExperience, setOpenExperience] = useState<number | null>(null);
    const [openDetail, setOpenDetail] = useState<Detail | null>(null);
    const [activeDay, setActiveDay] = useState(0);
    const toggleDetail = (d: Detail) => setOpenDetail(openDetail === d ? null : d);

    const { invitation, experiences, lead, facilitators, audience, days, stay, community, investment } = retreat;
    const day = days[activeDay];

    return (
        <div className="bg-sand text-espresso font-dm overflow-x-hidden">

            {/* COVER */}
            <section className="relative min-h-[calc(100svh-5rem)] flex flex-col overflow-hidden">
                <img
                    src={retreat.images.cover}
                    alt="Retreat group resting on a North Goa beach"
                    width={sizeOf(retreat.images.cover)[0]}
                    height={sizeOf(retreat.images.cover)[1]}
                    className="absolute inset-0 w-full h-full object-cover object-[50%_70%] md:object-[50%_92%]"
                    fetchPriority="high"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #f1eeea 0%, rgba(241,238,234,0.92) 38%, rgba(241,238,234,0.55) 56%, rgba(241,238,234,0) 72%)' }}></div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-espresso via-espresso/70 to-transparent"></div>

                <div className="relative z-10 flex-1 flex flex-col items-center text-center px-6 pt-12 md:pt-16 animate-reveal">
                    <img src={caliLogo} alt="Calisthenics Lab India logo" width="1054" height="1460" className="h-14 md:h-16 w-auto rounded-xl bg-espresso p-1.5 shadow-lg" />
                    <Label className="mt-5 text-espresso">Calisthenics Lab India · Presents</Label>
                    <h1 className="mt-5 font-italiana text-espresso leading-none">
                        <span className="block text-[17vw] md:text-[9.5rem] tracking-[0.06em]">STRENGTH</span>{' '}
                        <span className="block mt-2 font-work font-medium text-rust text-lg md:text-3xl tracking-[0.45em] pl-[0.45em]">&amp; STILLNESS</span>
                    </h1>
                    <span className="mt-6 h-px w-12 bg-rust"></span>
                    <Label className="mt-5 text-espresso/80">{retreat.tagline}</Label>
                    <RegisterButton className="mt-8 !px-7 !py-3.5" />
                </div>

                <div className="relative z-10 px-6 pb-8 md:pb-10">
                    <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 border-t border-white/20 pt-6 text-center">
                        {retreat.facts.map(({ label, value }) => (
                            <div key={label}>
                                <Label className="text-rust-light">{label}</Label>
                                <p className="mt-2 text-white text-sm md:text-lg">{value}</p>
                            </div>
                        ))}
                    </div>
                    <Label className="mt-8 text-center text-white/60">Travel with like-minded people</Label>
                </div>
            </section>

            {/* INTRO */}
            <section className="px-6 pt-16 md:pt-24">
                <div className="max-w-5xl mx-auto grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-14 items-end">
                    <SectionHead kicker="The Invitation" title={<>Come back<br />to yourself.</>} />
                    <div className="reveal">
                        <p className="text-base md:text-lg leading-relaxed text-espresso/80">{invitation.paragraphs[1]}</p>
                        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-espresso/20 pt-5">
                            {invitation.pillars.map(({ word, caption }) => (
                                <div key={word}>
                                    <p className="font-italiana text-2xl md:text-3xl">{word}</p>
                                    <Label className="mt-1 text-taupe !text-[0.58rem]">{caption}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* THE EXPERIENCE: compact cards, tap for detail */}
            <section className="px-6 pt-16 md:pt-24">
                <div className="max-w-5xl mx-auto">
                    <SectionHead kicker="The Experience" title="What we will do together" />
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                        {experiences.map((item, i) => {
                            const open = openExperience === i;
                            return (
                                <article key={item.kicker} className="group rounded-xl bg-white/50 border border-espresso/10 overflow-hidden reveal">
                                    <button onClick={() => setOpenExperience(open ? null : i)} aria-expanded={open} className="w-full text-left">
                                        <Photo src={item.image} alt={item.title} className="aspect-[4/3] !rounded-none !shadow-none" />
                                        <div className="flex items-start gap-3 p-5">
                                            <div className="flex-1">
                                                <Label>{item.numeral} — {item.kicker}</Label>
                                                <h3 className="mt-2 font-italiana text-2xl leading-tight">{item.title}</h3>
                                            </div>
                                            <Toggle open={open} />
                                        </div>
                                    </button>
                                    <Collapse open={open}>
                                        <p className="px-5 pb-5 -mt-1 text-sm leading-relaxed text-espresso/75">{item.text}</p>
                                    </Collapse>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* INVESTMENT: kept up front */}
            <section className="px-6 pt-16 md:pt-24" id="reserve">
                <div className="max-w-5xl mx-auto">
                    <SectionHead kicker="Investment" title="Reserve your spot" />
                    <p className="mt-5 text-[15px] md:text-base leading-relaxed max-w-3xl reveal">{investment.intro}</p>

                    <div className="mt-8 grid md:grid-cols-2 gap-5 reveal">
                        <div className="rounded-2xl bg-espresso text-white p-7 md:p-9 shadow-[0_30px_60px_-30px_rgba(28,24,19,0.8)]">
                            <div className="flex items-center justify-between gap-4">
                                <Label className="text-white/60">Early bird · first 10 spots</Label>
                                <span className="h-3 w-16 rounded-full bg-rust-light"></span>
                            </div>
                            <p className="mt-5 font-crimson text-2xl text-rust-light line-through">{investment.earlyBird.was}</p>
                            <p className="font-crimson text-6xl md:text-7xl leading-none">{investment.earlyBird.price}</p>
                            <Label className="mt-5 text-white/60">{investment.earlyBird.note}</Label>
                            <Label className="mt-2 text-rust-light">{investment.earlyBird.saving}</Label>
                        </div>
                        <div className="rounded-2xl border border-espresso/50 p-7 md:p-9">
                            <span className="inline-block rounded-full border border-espresso/40 px-3 py-1 brochure-label !tracking-[0.2em] text-taupe">{investment.regular.badge}</span>
                            <Label className="mt-4 text-taupe">Regular</Label>
                            <p className="mt-6 font-crimson text-6xl md:text-7xl leading-none">{investment.regular.price}</p>
                            <Label className="mt-5 text-taupe">{investment.regular.note}</Label>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4 reveal">
                        {investment.extras.map(({ label, value }) => (
                            <div key={label}>
                                <Label className="text-taupe">{label}</Label>
                                <p className="mt-2 font-crimson text-2xl md:text-3xl">{value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 rounded-2xl bg-espresso p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 reveal">
                        <img src={caliLogo} alt="Calisthenics Lab India logo" width="1054" height="1460" className="h-14 md:h-16 w-auto rounded-xl bg-black/40 p-1.5" />
                        <p className="font-italiana text-4xl md:text-5xl text-white text-center md:text-left flex-1">Reserve your spot</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <RegisterButton />
                            <WhatsAppLink />
                        </div>
                    </div>
                </div>
            </section>

            {/* DETAILS: everything else, collapsed */}
            <section className="px-6 pt-16 md:pt-24 pb-20">
                <div className="max-w-5xl mx-auto">
                    <SectionHead kicker="The Details" title="Everything you need to know" />
                    <div className="mt-8 border-t border-espresso/20 reveal">
                        <DetailAccordion
                            kicker="Day by day" title="The journey" summary="Four days from opening circle to farewell dinner"
                            open={openDetail === 'journey'} onToggle={() => toggleDetail('journey')}
                        >
                            <div className="flex flex-wrap gap-2" role="tablist">
                                {days.map((d, i) => (
                                    <button
                                        key={d.number}
                                        role="tab"
                                        aria-selected={activeDay === i}
                                        onClick={() => setActiveDay(i)}
                                        className={`rounded-full px-4 py-2 brochure-label !tracking-[0.18em] transition-colors ${activeDay === i ? 'bg-espresso text-white' : 'border border-espresso/25 text-espresso/70 hover:border-espresso'}`}
                                    >
                                        Day {d.number}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-6 grid md:grid-cols-[1.4fr_1fr] gap-8 items-start">
                                <div>
                                    <div className="flex items-end gap-4 border-b border-espresso pb-4">
                                        <span className="font-italiana text-6xl leading-none">{day.number}</span>
                                        <div className="pb-1">
                                            <Label className="text-taupe">{day.date}</Label>
                                            <p className="mt-1 font-italiana text-2xl md:text-3xl">{day.title}</p>
                                        </div>
                                    </div>
                                    <ul>
                                        {day.items.map(([time, what]) => (
                                            <li key={time + what} className="grid grid-cols-[5.5rem_1fr] gap-4 py-3 border-b border-espresso/15">
                                                <span className="brochure-label !tracking-[0.18em] text-taupe pt-0.5">{time}</span>
                                                <span className="text-[15px] font-medium leading-snug">{what}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Photo
                                    src={activeDay < 2 ? retreat.images.handstand : retreat.images.jungle}
                                    alt={activeDay < 2 ? 'Handstand coaching session' : 'Sunrise jungle trek in Arambol'}
                                    className="hidden md:block aspect-[4/5]"
                                />
                            </div>
                        </DetailAccordion>

                        <DetailAccordion
                            kicker="Your stay" title={stay.title} summary="Beachfront, pool, what's included and what to pack"
                            open={openDetail === 'stay'} onToggle={() => toggleDetail('stay')}
                        >
                            <Photo src={retreat.images.stay} alt="Group on the beachfront in North Goa" className="aspect-[16/7]" />
                            <p className="mt-6 text-[15px] md:text-base leading-relaxed text-espresso/80">{stay.text}</p>
                            <div className="mt-6 border-y border-espresso/20 py-6 grid grid-cols-2 md:grid-cols-4 gap-5">
                                {stay.features.map(({ title, caption }) => (
                                    <div key={title}>
                                        <p className="font-italiana text-2xl">{title}</p>
                                        <Label className="mt-1 text-taupe !text-[0.58rem]">{caption}</Label>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 grid md:grid-cols-2 gap-8">
                                <div>
                                    <Label>Included</Label>
                                    <ul className="mt-3 space-y-1.5 text-[15px] font-medium">{stay.included.map(i => <li key={i}>— {i}</li>)}</ul>
                                </div>
                                <div>
                                    <Label>Not included</Label>
                                    <ul className="mt-3 space-y-1.5 text-[15px] font-medium">{stay.notIncluded.map(i => <li key={i}>— {i}</li>)}</ul>
                                    <Label className="mt-6">Getting there</Label>
                                    <p className="mt-2 text-[15px] leading-relaxed">{stay.gettingThere}</p>
                                    <Label className="mt-6">What to pack</Label>
                                    <p className="mt-2 text-[15px] leading-relaxed">{stay.whatToPack}</p>
                                </div>
                            </div>
                        </DetailAccordion>

                        <DetailAccordion
                            kicker="Your guides" title="Led with care" summary={`${lead.name} and specialist facilitators`}
                            open={openDetail === 'guides'} onToggle={() => toggleDetail('guides')}
                        >
                            <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-start">
                                <div>
                                    <Label>{lead.role}</Label>
                                    <p className="mt-2 font-italiana text-4xl md:text-5xl">{lead.name}</p>
                                    <p className="mt-4 font-bold text-[15px] leading-snug">{lead.credentials}</p>
                                    {lead.paragraphs.map(p => <p key={p} className="mt-3 text-[15px] leading-relaxed text-espresso/75">{p}</p>)}
                                </div>
                                <Photo src={retreat.images.aman} alt="Aman, retreat lead, on the beach" className="aspect-[4/5] max-w-xs md:max-w-none" />
                            </div>
                            <Label className="mt-8">With specialist facilitators</Label>
                            <div className="mt-4 grid sm:grid-cols-2 gap-x-10 gap-y-5">
                                {facilitators.map(({ title, text }) => (
                                    <div key={title}>
                                        <p className="font-italiana text-2xl">{title}</p>
                                        <p className="mt-1 text-sm leading-relaxed text-taupe">{text}</p>
                                    </div>
                                ))}
                            </div>
                            <Label className="mt-8">Who it is for</Label>
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                {audience.map(({ title, caption }) => (
                                    <div key={title}>
                                        <p className="font-italiana text-2xl md:text-3xl">{title}</p>
                                        <Label className="mt-1 text-taupe !text-[0.58rem]">{caption}</Label>
                                    </div>
                                ))}
                            </div>
                        </DetailAccordion>

                        <DetailAccordion
                            kicker="How to book" title="Booking & cancellation" summary="₹10,000 deposit, balance by 28 Nov 2026"
                            open={openDetail === 'booking'} onToggle={() => toggleDetail('booking')}
                        >
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <Label>How to book</Label>
                                    <ol className="mt-3 space-y-1.5 text-[15px] font-medium">{investment.howToBook.map((s, i) => <li key={s}>{i + 1}. {s}</li>)}</ol>
                                </div>
                                <div>
                                    <Label>Cancellation</Label>
                                    <ul className="mt-3 space-y-1.5 text-[15px] font-medium">{investment.cancellation.map(l => <li key={l}>{l}</li>)}</ul>
                                </div>
                            </div>
                        </DetailAccordion>

                        <DetailAccordion
                            kicker="The invitation" title="Why this retreat" summary="Strength is built in effort. Peace is found in stillness."
                            open={openDetail === 'invitation'} onToggle={() => toggleDetail('invitation')}
                        >
                            <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-start">
                                <div className="space-y-4 text-[15px] leading-relaxed text-espresso/80">
                                    {invitation.paragraphs.map(p => <p key={p}>{p}</p>)}
                                </div>
                                <Photo src={retreat.images.invitation} alt="Calisthenics session on the beach in North Goa" className="aspect-[3/4] max-w-xs md:max-w-none" />
                            </div>
                            <p className="mt-8 font-italiana text-3xl md:text-5xl leading-tight text-center">
                                {invitation.quote[0]}<br /><span className="text-rust">{invitation.quote[1]}</span>
                            </p>
                        </DetailAccordion>

                        <DetailAccordion
                            kicker="Our community" title="You'll be in good company" summary="Moments from our sessions, events and beach mornings"
                            open={openDetail === 'community'} onToggle={() => toggleDetail('community')}
                        >
                            <p className="text-[15px] leading-relaxed text-espresso/80 max-w-3xl">{community.text}</p>
                            <div className="mt-6 grid grid-cols-3 gap-2 md:gap-3">
                                <Photo src={community.photos[0]} alt="Calisthenics Lab India community" className="col-span-2 aspect-[2.6/1]" />
                                <Photo src={community.photos[1]} alt="Open session crowd" className="row-span-2" />
                                <Photo src={community.photos[2]} alt="Community group photo" className="col-span-2 aspect-[2.4/1]" />
                                <Photo src={community.photos[3]} alt="Holi at the gym" className="aspect-[0.9/1]" />
                                <Photo src={community.photos[4]} alt="Street session from above" className="aspect-[0.9/1]" />
                                <Photo src={community.photos[5]} alt="Handstand workshop" className="aspect-[0.9/1]" />
                                <Photo src={community.photos[6]} alt="Morning on the beach" className="col-span-3 aspect-[3.4/1]" />
                            </div>
                        </DetailAccordion>
                    </div>

                    <div className="mt-16 pt-5 border-t border-espresso/15 flex flex-wrap items-center justify-between gap-4 text-taupe">
                        <span className="brochure-label !tracking-[0.25em]">{retreat.footer}</span>
                        <a href={RETREAT_REGISTER_URL} target="_blank" rel="noreferrer" className="brochure-label !tracking-[0.25em] text-rust hover:text-espresso transition-colors">Register now ↗</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
