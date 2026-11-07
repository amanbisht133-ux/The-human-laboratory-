import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { retreat, RETREAT_PATH, RETREAT_REGISTER_URL } from '../data/goaRetreat';
import { trackPixelEvent } from '../lib/metaPixel';

const DELAY_MS = 2000;

// Shown once per page load: a full reload shows it again, but navigating to the
// retreat page and back within the app does not.
let shownThisLoad = false;

/** "Upcoming GOA Retreat" announcement, shown 2 s after landing on the home page. */
export default function GoaRetreatPopup() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (shownThisLoad) return;
        const timer = setTimeout(() => {
            shownThisLoad = true;
            setOpen(true);
        }, DELAY_MS);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="goa-popup-title">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-reveal" onClick={() => setOpen(false)}></div>

            {/* Capped to the viewport height so it never spills off small screens */}
            <div className="relative w-full max-w-[21rem] max-h-[calc(100svh-2rem)] overflow-y-auto custom-scrollbar-hide rounded-3xl bg-sand text-espresso shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] animate-popup">
                <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="absolute top-3 right-3 z-10 size-8 rounded-full bg-espresso/70 text-white flex items-center justify-center hover:bg-rust transition-colors"
                >
                    <X size={16} />
                </button>

                <div className="relative h-36 overflow-hidden">
                    <img src={retreat.images.cover} alt="Retreat group on a North Goa beach" width="993" height="1404" className="absolute inset-0 w-full h-full object-cover object-[50%_75%]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-sand via-sand/10 to-transparent"></div>
                </div>

                <div className="relative -mt-6 px-6 pb-6 text-center">
                    <p className="brochure-label text-rust">Upcoming GOA Retreat</p>
                    <h2 id="goa-popup-title" className="mt-2 font-italiana leading-none">
                        <span className="block text-4xl tracking-[0.04em]">STRENGTH</span>
                        <span className="block mt-1.5 pl-[0.4em] font-work font-medium text-rust text-xs tracking-[0.4em]">&amp; STILLNESS</span>
                    </h2>
                    <p className="mt-4 font-dm text-sm text-espresso/80">{retreat.shortDates} · Just across North Goa</p>
                    <p className="mt-1 font-dm text-sm">
                        Early bird <span className="font-crimson text-2xl align-middle">{retreat.investment.earlyBird.price}</span>
                        <span className="ml-1.5 text-xs text-taupe line-through">{retreat.investment.earlyBird.was}</span>
                    </p>

                    <a
                        href={RETREAT_REGISTER_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => { trackPixelEvent('Lead', { content_name: 'Goa Retreat Registration' }); setOpen(false); }}
                        className="btn-rust mt-5 w-full py-3.5 whitespace-nowrap"
                    >
                        Register now <ArrowUpRight size={16} />
                    </a>
                    <Link
                        to={RETREAT_PATH}
                        onClick={() => setOpen(false)}
                        className="mt-3 inline-block font-work font-semibold text-[0.7rem] tracking-[0.2em] uppercase text-espresso/70 underline underline-offset-4 decoration-rust/60 hover:text-rust transition-colors"
                    >
                        View retreat details
                    </Link>
                </div>
            </div>
        </div>
    );
}
