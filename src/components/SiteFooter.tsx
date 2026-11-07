import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { business, hours, whatsappUrl } from '../data/business';
import { navLinks } from '../data/nav';

/** Footer with NAP (name, address, phone) and hours on every page. */
export default function SiteFooter() {
    return (
        <footer className="border-t border-white/10 bg-ink px-6 pt-14 pb-10 text-sm text-white/70">
            <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
                <div>
                    <p className="font-condensed text-3xl tracking-[0.12em] uppercase text-white">{business.name}</p>
                    <p className="mt-1 eyebrow !tracking-[0.25em]">{business.tagline}</p>
                    <address className="mt-6 not-italic space-y-3">
                        <a href={business.googleBusinessProfile} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-white transition-colors">
                            <MapPin size={18} className="text-brand-orange shrink-0 mt-0.5" />
                            <span>{business.addressLines.map(line => <span key={line} className="block">{line}</span>)}</span>
                        </a>
                        <a href={business.phoneHref} className="flex gap-3 hover:text-white transition-colors">
                            <Phone size={18} className="text-brand-orange shrink-0" /> {business.phoneDisplay} (call or WhatsApp)
                        </a>
                        <a href={`mailto:${business.email}`} className="flex gap-3 hover:text-white transition-colors break-all">
                            <Mail size={18} className="text-brand-orange shrink-0" /> {business.email}
                        </a>
                    </address>
                    <p className="mt-4 text-white/50">Near {business.nearby.join(', ')}</p>
                </div>

                <div>
                    <p className="font-semibold uppercase tracking-[0.18em] text-white text-xs">Calisthenics hours</p>
                    <dl className="mt-4 space-y-3">
                        {hours.map(h => (
                            <div key={h.days}>
                                <dt className="text-white">{h.days}</dt>
                                <dd>{h.times.join(' · ')}</dd>
                            </div>
                        ))}
                    </dl>
                    <a
                        href={whatsappUrl("Hi! I'd like to know more about Calisthenics Lab India.")}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ember mt-6 px-6 py-3 text-xs"
                    >
                        WhatsApp us
                    </a>
                </div>

                <nav aria-label="Footer">
                    <p className="font-semibold uppercase tracking-[0.18em] text-white text-xs">Explore</p>
                    <ul className="mt-4 grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2.5">
                        {navLinks.map(l => (
                            <li key={l.to}><Link to={l.to} className="hover:text-brand-orange transition-colors">{l.label === 'Home' ? 'Calisthenics Classes' : l.label}</Link></li>
                        ))}
                        <li><a href={business.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-orange transition-colors">Instagram</a></li>
                    </ul>
                </nav>
            </div>
            <p className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-xs text-white/40">© {business.name}. All rights reserved.</p>
        </footer>
    );
}
