import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { getPageMeta } from '../seo/pages';
import PageHero from '../components/PageHero';
import ContactButtons from '../components/ContactButtons';
import { business, hours } from '../data/business';
import { BATCH_TIMINGS, YOG_LAB } from '../data/programs';

const PATH = '/contact';

export default function Contact() {
    usePageMeta(PATH);
    useReveal();
    const meta = getPageMeta(PATH);

    return (
        <div className="text-white">
            <PageHero crumbs={[{ name: meta.name }]} eyebrow="Visit or message us" title={meta.h1}>
                <p>
                    Calisthenics Lab India is on Kondapur Road in Kondapur, Hyderabad, near HITEC City, Gachibowli and Madhapur.
                    Call or WhatsApp us on {business.phoneDisplay} to book a free demo session or ask about batches.
                </p>
                <ContactButtons message="Hi! I'd like to book a free demo session at Calisthenics Lab India." className="pt-2" />
            </PageHero>

            <section className="px-6 pb-16">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-6">
                    <div className="rounded-3xl overflow-hidden edge-ember min-h-[320px] reveal">
                        <iframe
                            title="Map showing Calisthenics Lab India in Kondapur, Hyderabad"
                            src={business.mapEmbed}
                            className="w-full h-full min-h-[320px] lg:min-h-[460px] border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="glass edge-ember rounded-3xl p-6 md:p-8 space-y-6 reveal">
                        <div className="flex gap-4">
                            <MapPin className="text-brand-orange shrink-0" />
                            <div>
                                <h2 className="font-semibold uppercase tracking-widest text-xs text-white/60">Address</h2>
                                <address className="mt-1 not-italic text-white/90">
                                    {business.name}<br />
                                    {business.addressLines.map(line => <span key={line} className="block">{line}</span>)}
                                </address>
                                <a href={business.googleBusinessProfile} target="_blank" rel="noreferrer" className="mt-2 inline-block text-brand-orange underline underline-offset-4 text-sm">
                                    Get directions on Google Maps
                                </a>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Phone className="text-brand-orange shrink-0" />
                            <div>
                                <h2 className="font-semibold uppercase tracking-widest text-xs text-white/60">Phone & WhatsApp</h2>
                                <a href={business.phoneHref} className="mt-1 block text-white/90 hover:text-brand-orange">{business.phoneDisplay}</a>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Mail className="text-brand-orange shrink-0" />
                            <div>
                                <h2 className="font-semibold uppercase tracking-widest text-xs text-white/60">Email</h2>
                                <a href={`mailto:${business.email}`} className="mt-1 block text-white/90 hover:text-brand-orange break-all">{business.email}</a>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Clock className="text-brand-orange shrink-0" />
                            <div className="w-full">
                                <h2 className="font-semibold uppercase tracking-widest text-xs text-white/60">Calisthenics hours</h2>
                                <dl className="mt-1 space-y-2">
                                    {hours.map(h => (
                                        <div key={h.days}>
                                            <dt className="text-white/90">{h.days}</dt>
                                            <dd className="text-white/70 text-sm">{h.times.join(' · ')}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
                    <div className="glass rounded-3xl p-6 md:p-8 reveal">
                        <h2 className="font-condensed uppercase text-3xl tracking-wide">Kids batches</h2>
                        <p className="mt-3 text-white/75">
                            Weekdays {BATCH_TIMINGS['Kids Batch']['Weekday'].join(' and ')}; weekends {BATCH_TIMINGS['Kids Batch']['Weekend'].join(', ')}.
                        </p>
                    </div>
                    <div className="glass rounded-3xl p-6 md:p-8 reveal">
                        <h2 className="font-condensed uppercase text-3xl tracking-wide">The Yog Lab</h2>
                        <p className="mt-3 text-white/75">{YOG_LAB.days.join(', ')}: {YOG_LAB.timings.join(' and ')}.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
