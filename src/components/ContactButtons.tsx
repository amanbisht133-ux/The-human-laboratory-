import { Phone } from 'lucide-react';
import { business, whatsappUrl } from '../data/business';
import { trackPixelEvent } from '../lib/metaPixel';

function WhatsAppIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
        </svg>
    );
}

/** Call + WhatsApp buttons. `message` pre-fills the WhatsApp chat. */
export default function ContactButtons({ message, className = '' }: { message: string; className?: string }) {
    return (
        <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
            <a
                href={whatsappUrl(message)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackPixelEvent('Contact', { method: 'WhatsApp' })}
                className="btn-ember px-7 py-4 text-sm"
            >
                <WhatsAppIcon /> WhatsApp us
            </a>
            <a
                href={business.phoneHref}
                onClick={() => trackPixelEvent('Contact', { method: 'Phone' })}
                className="glass rounded-full inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white hover:text-brand-orange transition-colors"
            >
                <Phone size={18} /> Call {business.phoneDisplay}
            </a>
        </div>
    );
}
