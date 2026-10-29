import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { MapPin, Mail, Sparkles, Sun, MoonStar, CalendarDays, Plus, ArrowRight, ChevronDown, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import reviews from '../data/reviews.json';
import { Link } from 'react-router-dom';
import caliLogo from '../components/images/CALI@2x.webp';
import communityStory from '../components/images/community_collage.webp';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import FaqList from '../components/FaqList';
import { homeFaqs } from '../data/faqs';
import { business } from '../data/business';
import GoaRetreatPopup from '../components/GoaRetreatPopup';
import RetreatSpotlight from '../components/RetreatSpotlight';
import { trackPixelEvent } from '../lib/metaPixel';
import { PRICING_TIERS, WEEKEND_ONE_HOUR_MONTHLY, WEEKEND_ONE_HOUR_SLOTS, BATCH_TIMINGS, WEEKLY_SCHEDULE, MEMBERSHIP_PLANS } from '../data/programs';

const SKILLS = ['Muscle-Up', 'Handstand', 'Front Lever', 'Human Flag', 'Planche', 'Back Lever', 'Pistol Squat', 'L-Sit'];

function SectionHeading({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
    return (
        <div className="text-center mb-12 md:mb-14 reveal">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-4 font-condensed uppercase text-white text-5xl md:text-7xl leading-[0.9] tracking-wide">{children}</h2>
        </div>
    );
}

function Accordion({ index, title, open, onToggle, children }: { index: string; title: string; open: boolean; onToggle: () => void; children: ReactNode }) {
    return (
        <div className={`glass rounded-2xl transition-colors duration-300 ${open ? 'edge-ember' : 'hover:bg-white/[0.04]'}`}>
            <button onClick={onToggle} aria-expanded={open} className="w-full flex items-center gap-4 md:gap-6 px-5 md:px-8 py-5 md:py-6 text-left">
                <span className="font-condensed text-2xl md:text-3xl ember-text">{index}</span>
                <span className="flex-1 font-condensed uppercase text-white text-2xl md:text-3xl tracking-wide">{title}</span>
                <span className={`size-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${open ? 'ember-bg text-ink rotate-45' : 'border border-white/15 text-brand-orange'}`}>
                    <Plus size={20} />
                </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <div className="px-5 md:px-8 pb-6 md:pb-8">
                        <div className="hairline mb-6"></div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
    return (
        <li className="flex flex-col gap-2 p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-brand-orange/30 transition-colors">
            <span className="ember-text font-bold text-xs uppercase tracking-widest">{title}</span>
            <p className="text-sm text-white/75 leading-relaxed">{desc}</p>
        </li>
    );
}

function CheckList({ items }: { items: string[] }) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map(item => (
                <li key={item} className="flex items-center gap-4">
                    <span className="size-7 shrink-0 rounded-full ember-bg text-ink flex items-center justify-center">
                        <Check size={15} strokeWidth={3} />
                    </span>
                    <span className="text-base md:text-lg text-white font-medium tracking-wide">{item}</span>
                </li>
            ))}
        </ul>
    );
}

function getPrice(batch: string, duration: string, timing: string) {
    if (!batch || !duration) return '';
    if (batch === 'Weekend' && duration === '1 Month' && WEEKEND_ONE_HOUR_SLOTS.some(slot => timing.endsWith(slot))) {
        return WEEKEND_ONE_HOUR_MONTHLY;
    }
    return PRICING_TIERS[batch][duration];
}

// White icon disc overlapping an orange label with a notched right edge.
function BatchBadge({ Icon, label }: { Icon: LucideIcon; label: string }) {
    return (
        <div className="flex items-center">
            <div className="relative z-10 size-14 md:size-16 shrink-0 rounded-full bg-white flex items-center justify-center shadow-lg">
                <Icon className="text-brand-orange size-8 md:size-9" strokeWidth={1.75} />
            </div>
            <div
                className="-ml-4 ember-bg text-ink font-condensed uppercase text-2xl md:text-3xl tracking-wide pl-7 pr-10 pt-1.5 pb-1 whitespace-nowrap"
                style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 1rem) 50%, 100% 100%, 0 100%)' }}
            >
                {label}
            </div>
        </div>
    );
}

function SlotGroup({ title, times }: { title: string; times: string[] }) {
    return (
        <div className="mt-6">
            <p className="mb-1 text-brand-orange font-bold uppercase tracking-widest text-xs md:text-sm">{title}</p>
            <ul>
                {times.map(time => (
                    <li key={time} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-b-0 text-white text-lg md:text-xl font-medium tracking-wide">
                        <span className="size-1.5 shrink-0 rounded-full ember-bg"></span>
                        {time}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function CaliLab() {
    usePageMeta('/');
    const [isWeekdayOpen, setIsWeekdayOpen] = useState(false);
    const [isWeekendOpen, setIsWeekendOpen] = useState(false);
    const [isAdvantageOpen, setIsAdvantageOpen] = useState(false);
    const [isVsGymOpen, setIsVsGymOpen] = useState(false);
    const [isProgramsOpen, setIsProgramsOpen] = useState(false);
    const [isWhyUsOpen, setIsWhyUsOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        batch: '',
        duration: '',
        timing: ''
    });

    useReveal();

    const [errors, setErrors] = useState({ name: '', email: '', phone: '', batch: '', duration: '', timing: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const validateForm = () => {
        const newErrors = { name: '', email: '', phone: '', batch: '', duration: '', timing: '' };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
            isValid = false;
        } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Invalid phone number (10 digits)';
            isValid = false;
        }

        if (!formData.batch) {
            newErrors.batch = 'Batch selection is required';
            isValid = false;
        }

        if (!formData.duration) {
            newErrors.duration = 'Duration selection is required';
            isValid = false;
        }

        if (formData.batch !== 'Personal Training' && !formData.timing) {
            newErrors.timing = 'Timing selection is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Craft WhatsApp Message
        const price = getPrice(formData.batch, formData.duration, formData.timing);
        const message = encodeURIComponent(
            `*NEW BOOKING INQUIRY - CALI LAB*\n\n` +
            `*Name:* ${formData.name}\n` +
            `*Email:* ${formData.email}\n` +
            `*Phone:* ${formData.phone}\n` +
            `*Batch:* ${formData.batch}\n` +
            `*Duration:* ${formData.duration}\n` +
            (formData.timing ? `*Timing:* ${formData.timing}\n` : '') +
            `*Total Price:* ${price}\n\n` +
            `_I'm interested in joining Calisthenics Lab India. Please provide further details._`
        );

        const whatsappNumber = "918826762234";
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;

        trackPixelEvent('Lead', { content_name: 'Calisthenics Lab Booking', batch: formData.batch });
        setIsSubmitted(true);

        // Redirect after a short delay for visual feedback
        setTimeout(() => {
            const newWindow = window.open(whatsappUrl, '_blank');

            // If the popup was blocked, fallback to redirecting the current tab
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                window.location.href = whatsappUrl;
            }

            setIsSubmitted(false);
            setIsBookingModalOpen(false);
            setFormData({ name: '', email: '', phone: '', batch: '', duration: '', timing: '' });
            setErrors({ name: '', email: '', phone: '', batch: '', duration: '', timing: '' });
        }, 1500);
    };
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollPos = useRef(0);
    const [isPaused, setIsPaused] = useState(false);

    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (scrollRef.current) {
            observer.observe(scrollRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let animationFrameId: number;
        let lastTimestamp: number;

        const animate = (timestamp: number) => {
            if (!isInView || isPaused) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            if (!lastTimestamp) lastTimestamp = timestamp;
            const delta = timestamp - lastTimestamp;

            if (scrollRef.current) {
                const speed = 0.12;
                scrollPos.current += speed * delta;

                const maxScroll = scrollRef.current.scrollWidth / 3;
                if (scrollPos.current >= maxScroll) {
                    scrollPos.current = 0;
                }
                scrollRef.current.scrollLeft = scrollPos.current;
            }

            lastTimestamp = timestamp;
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, isInView]);

    const scroll = (direction: 'left' | 'right') => {
        setIsPaused(true);
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            // Update virtual pos after smooth scroll
            setTimeout(() => {
                if (scrollRef.current) scrollPos.current = scrollRef.current.scrollLeft;
            }, 500);
        }
        setTimeout(() => setIsPaused(false), 10000);
    };

    return (
        <div className="bg-ink font-sans text-white">
            <div className="relative flex w-full flex-col overflow-x-hidden">
                {/* HERO SECTION */}
                <section className="relative min-h-[calc(100svh-5rem)] flex flex-col items-center justify-center overflow-hidden px-6 py-16">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/cali_hero_bg.webp"
                            alt="Collage of Calisthenics Lab India community group photos from training sessions in Hyderabad"
                            className="w-full h-full object-cover scale-105 brightness-[0.55] saturate-[0.85]"
                            width="1600"
                            height="1022"
                            fetchPriority="high"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink"></div>
                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(50% 40% at 50% 45%, rgba(243,131,32,0.22), transparent 70%)' }}></div>
                    </div>

                    <div className="relative z-20 flex flex-col items-center text-center animate-reveal">
                        <img
                            src={caliLogo}
                            alt="Calisthenics Lab India (CALI) logo"
                            className="w-28 md:w-36 h-auto drop-shadow-[0_10px_40px_rgba(243,131,32,0.35)] mb-5"
                            width="1054"
                            height="1460"
                            fetchPriority="high"
                        />

                        <h1 className="font-condensed uppercase text-white text-2xl sm:text-3xl md:text-4xl tracking-[0.12em] mb-4">
                            Calisthenics Academy in <span className="ember-text">Kondapur, Hyderabad</span>
                        </h1>

                        <p className="font-condensed uppercase leading-[0.85] tracking-wide text-6xl sm:text-8xl md:text-[7rem] mb-6">
                            <span className="block text-white">By The Community</span>
                            <span className="block ember-text">For The Community</span>
                        </p>

                        <p className="max-w-2xl text-sm md:text-base text-white/75 leading-relaxed mb-8">
                            {business.name} is a calisthenics academy in Kondapur, Hyderabad, near HITEC City, Gachibowli and Madhapur.
                            We coach adults from beginner to advanced in group batches (including weekends), offer{' '}
                            <Link to="/personal-training" className="text-white underline decoration-brand-orange/60 underline-offset-4 hover:text-brand-orange">personal coaching</Link>, run a{' '}
                            <Link to="/kids-calisthenics" className="text-white underline decoration-brand-orange/60 underline-offset-4 hover:text-brand-orange">kids calisthenics &amp; gymnastics program</Link> and host yoga at{' '}
                            <Link to="/yog-lab" className="text-white underline decoration-brand-orange/60 underline-offset-4 hover:text-brand-orange">The Yog Lab</Link>.
                        </p>

                        <button onClick={() => setIsBookingModalOpen(true)} className="btn-ember px-10 md:px-12 py-4 text-base md:text-lg mb-8">
                            Book Now <ArrowRight size={20} />
                        </button>

                        <div className="flex items-center gap-4">
                            {[
                                { href: business.googleBusinessProfile, label: 'Google Maps', icon: <MapPin size={20} /> },
                                {
                                    href: 'https://www.instagram.com/calisthenics.lab.india?igsh=MWI1YnZ0YWRicmNjaA==',
                                    label: 'Instagram',
                                    icon: (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                    )
                                },
                                { href: 'mailto:Calisthenicslabindia@gmail.com', label: 'Email', icon: <Mail size={20} /> }
                            ].map(({ href, label, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                                    rel="noreferrer"
                                    aria-label={label}
                                    className="glass rounded-full p-3 text-white/80 hover:text-brand-orange hover:-translate-y-0.5 transition-all"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <a href="#schedule" aria-label="Scroll down" className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/50 hover:text-brand-orange transition-colors">
                        <ChevronDown className="animate-bounce" size={28} />
                    </a>
                </section>

                {/* SKILLS TICKER */}
                <div className="relative overflow-hidden border-y border-white/10 bg-ink py-4" aria-hidden="true">
                    <div className="flex w-max animate-marquee">
                        {[0, 1].map(copy => (
                            <div key={copy} className="flex shrink-0 items-center">
                                {SKILLS.map(skill => (
                                    <span key={skill} className="flex items-center font-condensed uppercase text-2xl md:text-3xl tracking-[0.2em] text-white/80 pl-10">
                                        {skill}
                                        <span className="ember-text pl-10">✦</span>
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* OUR SCHEDULE */}
                <section className="relative overflow-hidden" id="schedule">
                    <img
                        src="/images/cali_hero_bg.webp"
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale"
                        width="1600"
                        height="1022"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink"></div>
                    <div className="relative z-10 max-w-3xl mx-auto px-6 pt-14 pb-14 reveal">
                        <div
                            className="inline-block ember-bg pl-6 pr-12 py-1.5 mb-8"
                            style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 1.25rem) 100%, 0 100%)' }}
                        >
                            <h2 className="text-ink font-condensed uppercase text-4xl md:text-6xl tracking-wide leading-none pt-1">Our Schedule</h2>
                        </div>
                        <ul className="glass rounded-3xl px-5 md:px-8 py-3">
                            {WEEKLY_SCHEDULE.map(({ day, focus }) => (
                                <li key={day} className="group grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 items-center py-3 border-b border-white/5 last:border-b-0">
                                    <span className="flex items-center gap-3 text-white font-bold uppercase tracking-wider text-sm sm:text-base md:text-xl">
                                        <span className="size-1.5 rounded-full ember-bg shadow-[0_0_10px_rgba(243,131,32,0.8)] transition-transform group-hover:scale-150"></span>{day}
                                    </span>
                                    <span className="text-white/75 font-medium uppercase tracking-wide text-sm sm:text-base md:text-xl group-hover:text-white transition-colors">
                                        {focus}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* PLANS & TIMINGS */}
                <section className="relative py-16 md:py-20 px-4 section-glow overflow-hidden" id="plans">
                    <div className="max-w-3xl mx-auto relative z-10">
                        {/* Ribbon */}
                        <div className="flex items-center mb-8 reveal">
                            <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-transparent to-brand-orange"></div>
                            <p className="mx-auto sm:mx-6 glass rounded-full px-8 md:px-10 py-2 font-condensed text-white text-2xl md:text-4xl tracking-[0.15em] whitespace-nowrap">
                                Calisthenics Lab <span className="ember-text">India</span>
                            </p>
                            <div className="hidden sm:block flex-1 h-px bg-gradient-to-l from-transparent to-brand-orange"></div>
                        </div>

                        <h2 className="text-center font-condensed uppercase text-white leading-[0.9] mb-10 reveal">
                            <span className="block text-6xl md:text-8xl">Choose Your Plan</span>
                            <span className="block text-3xl md:text-5xl">&amp; Begin Your <span className="ember-text">Transformation</span></span>
                        </h2>

                        {/* Memberships table */}
                        <div className="max-w-xl mx-auto mb-8 glass edge-ember rounded-3xl overflow-hidden reveal">
                            <div className="ember-bg text-center font-condensed uppercase text-ink text-2xl md:text-3xl pt-2 pb-1 tracking-wide">
                                Calisthenics Memberships
                            </div>
                            <div className="px-5 md:px-8 pt-3 pb-5">
                                <div className="grid grid-cols-[1fr_8rem] md:grid-cols-[1fr_10rem] font-condensed uppercase text-brand-orange text-xl md:text-2xl tracking-wider">
                                    <span>Plans</span>
                                    <span className="pl-4 md:pl-6">Price</span>
                                </div>
                                {MEMBERSHIP_PLANS.map(({ plan, price }) => (
                                    <div key={plan} className="grid grid-cols-[1fr_8rem] md:grid-cols-[1fr_10rem] border-b border-white/10 last:border-b-0 font-condensed uppercase text-white text-xl md:text-3xl tracking-wide hover:bg-white/[0.03] transition-colors">
                                        <span className="py-2.5 md:py-3">{plan}</span>
                                        <span className="py-2.5 md:py-3 pl-4 md:pl-6 border-l border-white/10">{price}/-</span>
                                    </div>
                                ))}
                                <p className="mt-3 font-condensed uppercase text-brand-orange text-base md:text-lg tracking-wide">
                                    *Pay for 10 months, get 2 months free
                                </p>
                            </div>
                        </div>

                        {/* Weekend membership */}
                        <div className="w-fit max-w-full mx-auto mb-16 glass edge-ember rounded-3xl px-5 md:px-8 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 reveal">
                            <div className="flex items-center gap-4">
                                <CalendarDays className="text-brand-orange size-12 md:size-14 shrink-0" strokeWidth={1.5} />
                                <p className="font-condensed uppercase leading-none whitespace-nowrap">
                                    <span className="block ember-text text-2xl md:text-3xl">Monthly Weekend</span>
                                    <span className="block text-white text-3xl md:text-4xl">Membership</span>
                                </p>
                            </div>
                            <div className="sm:border-l border-white/15 sm:pl-6 font-condensed uppercase text-white text-2xl md:text-3xl leading-tight text-center sm:text-left whitespace-nowrap">
                                <p>1.5 Hour Slot - {PRICING_TIERS['Weekend']['1 Month']}/-</p>
                                <p>1 Hour Slot - {WEEKEND_ONE_HOUR_MONTHLY}/-</p>
                            </div>
                        </div>

                        {/* Timings */}
                        <h2 className="text-center font-condensed uppercase text-white text-7xl md:text-8xl tracking-[0.15em] mb-10 reveal" id="timings">
                            Timings
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 reveal">
                            <div className="glass edge-ember rounded-3xl p-5 md:p-7">
                                <BatchBadge Icon={Sun} label="Morning Batches" />
                                <SlotGroup title="Adult Batches" times={BATCH_TIMINGS['Weekday Batch']['Morning']} />
                            </div>
                            <div className="glass edge-ember rounded-3xl p-5 md:p-7">
                                <BatchBadge Icon={MoonStar} label="Evening Batches" />
                                <SlotGroup title="Kids Batch" times={BATCH_TIMINGS['Kids Batch']['Weekday']} />
                                <SlotGroup title="Adult Batches" times={BATCH_TIMINGS['Weekday Batch']['Evening']} />
                            </div>
                        </div>

                        <div className="glass edge-ember rounded-3xl px-5 md:px-8 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-10 reveal">
                            <BatchBadge Icon={Sun} label="Weekend Batches" />
                            <div className="text-white">
                                <p className="font-bold uppercase tracking-widest text-xs md:text-sm text-brand-orange">Adult</p>
                                {['Morning', 'Evening'].map(session => (
                                    <p key={session} className="text-sm md:text-lg font-medium">
                                        {BATCH_TIMINGS['Weekend'][session].join(' | ')}
                                    </p>
                                ))}
                                <p className="mt-2 font-bold uppercase tracking-widest text-xs md:text-sm text-brand-orange">Kids</p>
                                <p className="text-sm md:text-lg font-medium">{BATCH_TIMINGS['Kids Batch']['Weekend'].join(' | ')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ACTIVITIES */}
                <RetreatSpotlight />

                {/* THE METHOD */}
                <section className="pt-16 md:pt-20 pb-6 px-6 md:px-20 relative overflow-hidden" id="advantage">
                    <div className="max-w-4xl mx-auto relative z-10">
                        <SectionHeading eyebrow="The Method">
                            Why <span className="ember-text">Calisthenics</span>
                        </SectionHeading>
                        <div className="flex flex-col gap-4 reveal">
                            <Accordion index="01" title="The Calisthenics Advantage" open={isAdvantageOpen} onToggle={() => setIsAdvantageOpen(!isAdvantageOpen)}>
                                <p className="text-base md:text-lg text-white/90 font-medium leading-relaxed mb-6">
                                    True strength isn't about moving dead weight; it's about absolute control over your own movement. We don't just chase numbers; we build functional, athletic bodies.
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { title: "Deep Mind-Muscle Connection", desc: "Train your nervous system and muscles to fire together as a highly efficient unit." },
                                        { title: "Total Coordination & Balance", desc: "Develop spatial awareness and stability that translates directly into real-world agility." },
                                        { title: "True Mobility & Flexibility", desc: "Build strength through a full range of motion to bulletproof your joints and move without restriction." },
                                        { title: "The Ultimate Byproduct", desc: "Fat loss, lean muscle gain, and a chiseled physique aren't just goals—they are the inevitable, natural results of mastering these skills." }
                                    ].map(item => <FeatureCard key={item.title} {...item} />)}
                                </ul>
                            </Accordion>

                            <Accordion index="02" title="Calisthenics vs Gym" open={isVsGymOpen} onToggle={() => setIsVsGymOpen(!isVsGymOpen)}>
                                <p className="text-base md:text-lg text-white/90 font-medium leading-relaxed">
                                    In a traditional gym, you use machines to isolate muscles; at <span className="ember-text font-bold uppercase tracking-wider">Calisthenics Lab India</span>, you use your body to build mastery. While most people go to the gym just for the look—focusing on fat loss and muscle gain—we treat those as mere by-products of our training. Our focus is on deep body awareness and movement control. We don't just build a physique; we build a body that knows exactly what it's capable of.
                                </p>
                            </Accordion>
                        </div>
                    </div>
                </section>

                {/* PROGRAMS */}
                <section className="pt-16 pb-16 px-6 md:px-20 relative overflow-hidden" id="programs">
                    <div className="max-w-4xl mx-auto relative z-10">
                        <SectionHeading eyebrow="Programs">
                            Train <span className="ember-text">Your Way</span>
                        </SectionHeading>
                        <div className="flex flex-col gap-4 reveal">
                            <Accordion index="01" title="The Weekday Operation" open={isWeekdayOpen} onToggle={() => setIsWeekdayOpen(!isWeekdayOpen)}>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { title: "6 Opportunity Windows", desc: "With three batches in the morning and three in the evening, you never have to miss a workout. Your fitness fits your lifestyle, not the other way around." },
                                        { title: "The 2-Trainer Standard", desc: "Unlike traditional gyms where you're on your own, every weekday slot at the Lab ensures a high coach-to-student ratio. You get the energy of a group with the precision of personal training." },
                                        { title: "End-to-End Coaching", desc: "From the moment you walk in to your final stretch, our coaches manage the clock and the intensity. We handle the programming; you just show up and put in the work." },
                                        { title: "Extended Training", desc: "Finished the session but still have fuel in the tank? Our weekday format allows athletes the freedom to stay back for extra practice, making it the perfect environment for those chasing advanced skills." }
                                    ].map(item => <FeatureCard key={item.title} {...item} />)}
                                </ul>
                            </Accordion>

                            <Accordion index="02" title="The Weekend Reset" open={isWeekendOpen} onToggle={() => setIsWeekendOpen(!isWeekendOpen)}>
                                <p className="font-condensed uppercase text-2xl md:text-3xl text-white tracking-wide mb-2">
                                    1.5-hour or 1-hour slots <span className="text-brand-orange">|</span> Saturday & Sunday <span className="text-brand-orange">|</span> 2 trainers
                                </p>
                                <p className="text-sm md:text-base text-white/75 font-medium leading-relaxed">
                                    A high-energy group environment designed to level up your skills.
                                </p>
                            </Accordion>
                        </div>

                        {/* EXPERIENCE THE LAB */}
                        <div
                            onClick={() => setIsBookingModalOpen(true)}
                            className="group relative mt-10 glass edge-ember rounded-[2.5rem] p-8 md:p-12 text-center overflow-hidden cursor-pointer reveal"
                        >
                            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[70%] h-48 rounded-full bg-brand-orange/25 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <span className="eyebrow relative">Free Demo Session</span>
                            <h2 className="relative mt-4 font-condensed uppercase text-4xl md:text-6xl text-white leading-none">
                                Experience the Lab – <span className="ember-text">On Us.</span>
                            </h2>
                            <p className="relative mt-5 text-sm md:text-xl text-white/75 font-medium leading-relaxed max-w-3xl mx-auto">
                                Book your <span className="text-brand-orange font-bold">Free Demo Session</span> today to feel the energy of our space. If you decide to join the movement, we'll fold the session into your package. If not, it's completely free with no strings attached.
                            </p>
                            <span className="btn-ember relative mt-8 px-8 py-3 text-sm">
                                Book Now <ArrowRight size={16} />
                            </span>
                        </div>
                    </div>
                </section>

                {/* TRAINERS & TIMINGS BROCHURE */}
                <section className="pb-6 px-4 relative overflow-hidden" id="info">
                    <div className="w-full md:w-[85%] mx-auto relative z-10 rounded-3xl overflow-hidden edge-ember shadow-[0_30px_80px_-30px_rgba(243,131,32,0.35)] reveal">
                        <img
                            src="/images/cali_trainers_brochure_v2.webp"
                            alt="Collage of group photos from Calisthenics Lab India sessions and community events"
                            className="w-full h-auto"
                            width="1546"
                            height="1005"
                            loading="lazy"
                        />
                    </div>
                </section>

                {/* WHAT YOU GET */}
                <section className="pt-16 md:pt-20 pb-20 px-6 md:px-20 relative overflow-hidden">
                    <div className="max-w-4xl mx-auto relative z-10">
                        <SectionHeading eyebrow="The Offer">
                            What You're <span className="ember-text">Going To Get</span>
                        </SectionHeading>
                        <div className="flex flex-col gap-4 reveal">
                            <Accordion index="01" title="Training Programs Include" open={isProgramsOpen} onToggle={() => setIsProgramsOpen(!isProgramsOpen)}>
                                <CheckList items={[
                                    "Strength & Conditioning",
                                    "Calisthenics Fundamentals",
                                    "Weight Loss & Fat Burning",
                                    "Handstands & Balance Training",
                                    "Core & Mobility Development",
                                    "Advanced Skill Progressions"
                                ]} />
                            </Accordion>

                            <Accordion index="02" title="Why Choose Cali?" open={isWhyUsOpen} onToggle={() => setIsWhyUsOpen(!isWhyUsOpen)}>
                                <CheckList items={[
                                    "Expert trainers",
                                    "Small batch focus",
                                    "Result-driven programming",
                                    "Beginner-friendly progressions",
                                    "Motivating training environment"
                                ]} />
                            </Accordion>
                        </div>
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className="pt-16 md:pt-20 pb-12 section-glow overflow-hidden relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <SectionHeading eyebrow="Client Testimonials">
                            Voices of <span className="ember-text">The Lab</span>
                        </SectionHeading>
                    </div>

                    <div className="relative group px-6 md:px-20 reveal">
                        <div className="absolute top-1/2 left-2 -translate-y-1/2 z-20 hidden md:block">
                            <button
                                onClick={() => scroll('left')}
                                className="glass p-4 rounded-full text-white hover:text-brand-orange transition-all hover:scale-110 active:scale-90"
                                aria-label="Previous Review"
                            >
                                <span className="material-symbols-outlined text-3xl">chevron_left</span>
                            </button>
                        </div>
                        <div className="absolute top-1/2 right-2 -translate-y-1/2 z-20 hidden md:block">
                            <button
                                onClick={() => scroll('right')}
                                className="glass p-4 rounded-full text-white hover:text-brand-orange transition-all hover:scale-110 active:scale-90"
                                aria-label="Next Review"
                            >
                                <span className="material-symbols-outlined text-3xl">chevron_right</span>
                            </button>
                        </div>

                        <div
                            ref={scrollRef}
                            onClick={() => setIsPaused(!isPaused)}
                            className="py-8 flex gap-6 md:gap-8 overflow-x-auto custom-scrollbar-hide cursor-pointer"
                        >
                            {[...reviews, ...reviews, ...reviews].map((review, i) => (
                                <div key={i} className="glass w-[300px] md:w-[440px] p-6 md:p-10 rounded-[2rem] shrink-0 hover:-translate-y-1 hover:border-brand-orange/40 transition-all duration-500 relative group/card overflow-hidden">
                                    <span className="absolute -top-4 right-6 font-condensed text-[9rem] leading-none ember-text opacity-20 select-none">“</span>
                                    <div className="flex flex-col gap-5 md:gap-6 relative z-10">
                                        <div className="flex gap-1">
                                            {[...Array(review.stars)].map((_, j) => (
                                                <span key={j} className="material-symbols-outlined text-sm text-brand-orange fill-1">star</span>
                                            ))}
                                        </div>
                                        <p className="text-white/80 font-light leading-relaxed whitespace-normal text-sm md:text-base line-clamp-4 group-hover/card:line-clamp-none transition-all duration-500">"{review.text}"</p>
                                        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=f38320&color=0a0a0b&bold=true`}
                                                alt={`${review.name} initials avatar`}
                                                className="size-10 md:size-12 rounded-full object-cover ring-2 ring-brand-orange/30"
                                                width="48"
                                                height="48"
                                                loading="lazy"
                                            />
                                            <p className="text-white font-semibold uppercase text-xs tracking-widest">{review.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* COMMUNITY */}
                <section className="py-16 md:py-20 px-6 md:px-20">
                    <div className="max-w-7xl mx-auto">
                        <SectionHeading eyebrow="Community First">
                            We Are More Than <span className="ember-text">A Training Space</span>
                        </SectionHeading>
                        <div className="rounded-3xl overflow-hidden edge-ember shadow-[0_30px_80px_-30px_rgba(243,131,32,0.35)] reveal">
                            <img
                                src={communityStory}
                                alt="Calisthenics Lab India community collage: group workouts, skills sessions and beach training"
                                className="w-full h-auto md:grayscale md:hover:grayscale-0 transition-all duration-1000"
                                width="723"
                                height="1024"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </section>

                {/* FAQ SECTION — visible page text for SEO/GEO */}
                <section className="pt-16 md:pt-20 pb-24 px-6 md:px-20 section-glow" id="faq" aria-label="Frequently Asked Questions">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeading eyebrow="Got Questions?">
                            Quick <span className="ember-text">Answers</span>
                        </SectionHeading>

                        <div className="reveal">
                            <FaqList faqs={homeFaqs} />
                        </div>
                    </div>
                </section>
            </div>

            <GoaRetreatPopup />

            {/* BOOKING MODAL */}
            {
                isBookingModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                            onClick={() => setIsBookingModalOpen(false)}
                        ></div>

                        {/* Modal Content */}
                        <div className="relative w-[95vw] max-w-lg max-h-[90vh] bg-zinc-900/95 edge-ember p-6 md:p-10 rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(243,131,32,0.35)] overflow-y-auto custom-scrollbar">
                            <button
                                onClick={() => setIsBookingModalOpen(false)}
                                className="absolute top-6 right-8 text-white/50 hover:text-brand-orange transition-colors"
                            >
                                <span className="material-symbols-outlined text-3xl">close</span>
                            </button>

                            {!isSubmitted ? (
                                <>
                                    <h2 className="font-condensed text-5xl md:text-6xl text-white tracking-wide leading-none mb-2 uppercase">Join the <span className="ember-text">Lab</span></h2>                                    <p className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-8">Few slots available - reserve your spot now</p>

                                    <form onSubmit={handleBookingSubmit} noValidate className="space-y-4">
                                        {/* NAME INPUT */}
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                required
                                                placeholder=" "
                                                className={`peer w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-brand-orange'} rounded-2xl px-6 py-5 text-white outline-none transition-all placeholder-transparent`}
                                                value={formData.name}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, name: e.target.value });
                                                    if (errors.name) setErrors({ ...errors, name: '' });
                                                }}
                                            />
                                            <label className={`absolute left-6 transition-all pointer-events-none uppercase font-black tracking-[0.2em] text-[10px] 
                                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/30
                                            peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-zinc-900 peer-focus:px-2 peer-focus:text-brand-orange
                                            ${formData.name ? '-top-2 left-4 bg-zinc-900 px-2 text-brand-orange' : ''}`}>
                                                Full Name
                                            </label>
                                            {errors.name && <p className="text-[10px] text-red-500 mt-1 ml-4 uppercase font-bold">{errors.name}</p>}
                                        </div>

                                        {/* EMAIL INPUT */}
                                        <div className="relative group">
                                            <input
                                                type="email"
                                                required
                                                placeholder=" "
                                                className={`peer w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-brand-orange'} rounded-2xl px-6 py-5 text-white outline-none transition-all placeholder-transparent`}
                                                value={formData.email}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, email: e.target.value });
                                                    if (errors.email) setErrors({ ...errors, email: '' });
                                                }}
                                            />
                                            <label className={`absolute left-6 transition-all pointer-events-none uppercase font-black tracking-[0.2em] text-[10px] 
                                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/30
                                            peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-zinc-900 peer-focus:px-2 peer-focus:text-brand-orange
                                            ${formData.email ? '-top-2 left-4 bg-zinc-900 px-2 text-brand-orange' : ''}`}>
                                                Email Address
                                            </label>
                                            {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-4 uppercase font-bold">{errors.email}</p>}
                                        </div>

                                        {/* PHONE INPUT */}
                                        <div className="relative group">
                                            <input
                                                type="tel"
                                                required
                                                placeholder=" "
                                                className={`peer w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10 focus:border-brand-orange'} rounded-2xl px-6 py-5 text-white outline-none transition-all placeholder-transparent`}
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, phone: e.target.value });
                                                    if (errors.phone) setErrors({ ...errors, phone: '' });
                                                }}
                                            />
                                            <label className={`absolute left-6 transition-all pointer-events-none uppercase font-black tracking-[0.2em] text-[10px] 
                                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/30
                                            peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-zinc-900 peer-focus:px-2 peer-focus:text-brand-orange
                                            ${formData.phone ? '-top-2 left-4 bg-zinc-900 px-2 text-brand-orange' : ''}`}>
                                                Phone Number
                                            </label>
                                            {errors.phone && <p className="text-[10px] text-red-500 mt-1 ml-4 uppercase font-bold">{errors.phone}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* BATCH DROPDOWN */}
                                            <div className="space-y-2 relative">
                                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-4">Preferred Batch</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveDropdown(activeDropdown === 'batch' ? null : 'batch')}
                                                    className={`w-full bg-white/5 border ${errors.batch ? 'border-red-500' : (activeDropdown === 'batch' ? 'border-brand-orange shadow-[0_0_15px_rgba(242,110,24,0.2)]' : 'border-white/10')} rounded-2xl px-6 py-4 flex justify-between items-center transition-all group`}
                                                >
                                                    <span className={`font-black text-xs uppercase tracking-tighter ${formData.batch ? 'text-white' : 'text-white/30'}`}>
                                                        {formData.batch || 'Select Preferred Batch'}
                                                    </span>
                                                    <span className={`material-symbols-outlined transition-transform duration-300 ${activeDropdown === 'batch' ? 'rotate-180 text-brand-orange' : 'text-white/30'}`}>expand_more</span>
                                                </button>

                                                {errors.batch && <p className="text-[10px] text-red-500 mt-1 ml-4 uppercase font-bold">{errors.batch}</p>}

                                                {activeDropdown === 'batch' && (
                                                    <>
                                                        <div className="fixed inset-0 z-[105]" onClick={() => setActiveDropdown(null)}></div>
                                                        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-zinc-900/95 border border-brand-orange/30 rounded-2xl overflow-hidden z-[110] backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                            {Object.keys(PRICING_TIERS).map(batch => (
                                                                <div
                                                                    key={batch}
                                                                    onClick={() => {
                                                                        setFormData({
                                                                            ...formData,
                                                                            batch,
                                                                            duration: '',
                                                                            timing: ''
                                                                        });
                                                                        setActiveDropdown(null);
                                                                        if (errors.batch) setErrors({ ...errors, batch: '', duration: '', timing: '' });
                                                                    }}
                                                                    className={`px-6 py-4 hover:bg-brand-orange hover:text-black transition-all cursor-pointer font-black text-xs uppercase tracking-widest ${formData.batch === batch ? 'text-brand-orange bg-white/5' : 'text-white/70'}`}
                                                                >
                                                                    {batch}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {/* KIDS BATCH INFO NOTE */}
                                            {formData.batch === 'Kids Batch' && (
                                                <div className="md:col-span-2 p-4 bg-brand-orange/10 border border-brand-orange/30 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <div className="flex gap-3 items-center">
                                                        <Sparkles className="text-brand-orange shrink-0" size={18} />
                                                        <p className="text-[10px] md:text-xs font-black text-white/90 uppercase tracking-[0.1em] leading-relaxed">
                                                            Elite Curriculum: Includes <span className="text-brand-orange underline underline-offset-4 decoration-2">Calisthenics + Gymnastics</span> in a single subscription.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* DURATION DROPDOWN */}
                                            <div className="space-y-2 relative">
                                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-4">Training Period</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveDropdown(activeDropdown === 'duration' ? null : 'duration')}
                                                    className={`w-full bg-white/5 border ${errors.duration ? 'border-red-500' : (activeDropdown === 'duration' ? 'border-brand-orange shadow-[0_0_15px_rgba(242,110,24,0.2)]' : 'border-white/10')} rounded-2xl px-6 py-4 flex justify-between items-center transition-all group`}
                                                >
                                                    <span className={`font-black text-xs uppercase tracking-tighter ${formData.duration ? 'text-white' : 'text-white/30'}`}>
                                                        {formData.duration || 'Select Duration'}
                                                    </span>
                                                    <span className={`material-symbols-outlined transition-transform duration-300 ${activeDropdown === 'duration' ? 'rotate-180 text-brand-orange' : 'text-white/30'}`}>expand_more</span>
                                                </button>

                                                {errors.duration && <p className="text-[10px] text-red-500 mt-1 ml-4 uppercase font-bold">{errors.duration}</p>}

                                                {activeDropdown === 'duration' && formData.batch && (
                                                    <>
                                                        <div className="fixed inset-0 z-[105]" onClick={() => setActiveDropdown(null)}></div>
                                                        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-zinc-900/95 border border-brand-orange/30 rounded-2xl overflow-hidden z-[110] backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                            {Object.keys(PRICING_TIERS[formData.batch]).map(period => (
                                                                <div
                                                                    key={period}
                                                                    onClick={() => {
                                                                        setFormData({ ...formData, duration: period, timing: '' });
                                                                        setActiveDropdown(null);
                                                                        if (errors.duration) setErrors({ ...errors, duration: '', timing: '' });
                                                                    }}
                                                                    className={`px-6 py-4 hover:bg-brand-orange hover:text-black transition-all cursor-pointer font-black text-xs uppercase tracking-widest ${formData.duration === period ? 'text-brand-orange bg-white/5' : 'text-white/70'}`}
                                                                >
                                                                    {period}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* TIMING DROPDOWN (Conditional) */}
                                        {formData.batch && formData.batch !== 'Personal Training' && (
                                            <div className="space-y-2 relative">
                                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-4">Available Timings</label>
                                                <button
                                                    type="button"
                                                    disabled={!formData.batch}
                                                    onClick={() => setActiveDropdown(activeDropdown === 'timing' ? null : 'timing')}
                                                    className={`w-full bg-white/5 border ${errors.timing ? 'border-red-500' : (activeDropdown === 'timing' ? 'border-brand-orange shadow-[0_0_15px_rgba(242,110,24,0.2)]' : 'border-white/10')} rounded-2xl px-6 py-4 flex justify-between items-center transition-all group ${!formData.batch ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    <span className={`font-black text-xs uppercase tracking-tighter ${formData.timing ? 'text-white' : 'text-white/30'}`}>
                                                        {formData.timing || 'Select Time Slot'}
                                                    </span>
                                                    <span className={`material-symbols-outlined transition-transform duration-300 ${activeDropdown === 'timing' ? 'rotate-180 text-brand-orange' : 'text-white/30'}`}>expand_more</span>
                                                </button>

                                                {errors.timing && <p className="text-[10px] text-red-500 mt-1 ml-4 uppercase font-bold">{errors.timing}</p>}

                                                {activeDropdown === 'timing' && (
                                                    <>
                                                        <div className="fixed inset-0 z-[105]" onClick={() => setActiveDropdown(null)}></div>
                                                        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-zinc-900/95 border border-brand-orange/30 rounded-2xl overflow-hidden z-[110] backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-[250px] overflow-y-auto custom-scrollbar">
                                                            {Object.entries(BATCH_TIMINGS[formData.batch]).map(([session, times]) => (
                                                                <div key={session}>
                                                                    <div className="px-6 py-2 bg-white/5 text-[10px] font-black text-white/30 uppercase tracking-widest">{session}</div>
                                                                    {times.map(time => (
                                                                        <div
                                                                            key={time}
                                                                            onClick={() => {
                                                                                setFormData({ ...formData, timing: `(${session}) ${time}` });
                                                                                setActiveDropdown(null);
                                                                                if (errors.timing) setErrors({ ...errors, timing: '' });
                                                                            }}
                                                                            className={`px-6 py-4 hover:bg-brand-orange hover:text-black transition-all cursor-pointer font-black text-xs uppercase tracking-widest ${formData.timing === `(${session}) ${time}` ? 'text-brand-orange bg-white/5' : 'text-white/70'}`}
                                                                        >
                                                                            {time}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}

                                        {/* Dynamic Price Display */}
                                        <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-2xl p-4 flex items-center justify-between group overflow-hidden relative">
                                            <div className="relative z-10">
                                                <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest">Energy Exchange</p>
                                                <p className="text-2xl font-black text-white italic">
                                                    {getPrice(formData.batch, formData.duration, formData.timing) || 'Select Options'}
                                                </p>
                                            </div>
                                            <div className="text-right relative z-10">
                                                <span className="text-[10px] font-bold text-white/40 block">Subject to terms</span>
                                                {formData.batch === 'Personal Training' ? (
                                                    <span className="text-xs font-black text-brand-orange uppercase animate-pulse">Request Details Below</span>
                                                ) : (
                                                    <span className="text-xs font-black text-white/60 uppercase">Selected Plan</span>
                                                )}
                                            </div>
                                            <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-brand-orange/5 to-transparent skew-x-12 translate-x-1/2 transition-transform group-hover:translate-x-1/3"></div>
                                        </div>

                                        {formData.duration === '1 Day' && (
                                            <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <span className="material-symbols-outlined text-brand-orange text-lg">info</span>
                                                <p className="text-[10px] font-black text-white/50 uppercase leading-relaxed tracking-[0.1em]">
                                                    <span className="text-brand-orange">Professional Continuity:</span> This trial investment can be fully credited toward your membership if you decide to upgrade your training plan.
                                                </p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="btn-ember w-full py-5 text-lg mt-8"
                                        >
                                            Send Details
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                                    <div className="relative size-24 mx-auto">
                                        <div className="absolute inset-0 bg-brand-orange rounded-full animate-ping opacity-20"></div>
                                        <div className="relative size-full bg-brand-orange rounded-full flex items-center justify-center shadow-glow shadow-brand-orange/40">
                                            <span className="material-symbols-outlined text-black text-5xl font-bold animate-pulse">chat</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Redirecting...</h2>
                                        <p className="text-brand-orange font-bold uppercase tracking-widest text-[10px]">Moving to WhatsApp to finalize your booking</p>
                                    </div>
                                    <p className="text-white/40 text-xs font-medium max-w-[200px] mx-auto leading-relaxed">
                                        If the chat doesn't open automatically, please check your browser pop-up settings.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    );
}
