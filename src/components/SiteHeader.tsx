import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks, staffLoginUrl } from '../data/nav';

export default function SiteHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();

    // Close the menu whenever the page changes.
    useEffect(() => { setMenuOpen(false); }, [pathname]);

    // While the menu is open, freeze the page behind it so it can't scroll or shift.
    useEffect(() => {
        if (!menuOpen) return;
        // Lock only <body>: also locking <html> turns <body> into its own scroll box,
        // which makes the sticky header (and the menu inside it) jump to the top of
        // the page and disappear when the visitor has scrolled down.
        const { body } = document;
        const prevBody = body.style.overflow;
        body.style.overflow = 'hidden';
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => {
            body.style.overflow = prevBody;
            window.removeEventListener('keydown', onKey);
        };
    }, [menuOpen]);

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `transition-colors ${isActive ? 'text-brand-orange' : 'text-white/75 hover:text-white'}`;

    return (
        <>
        {menuOpen && (
            <div
                aria-hidden="true"
                onClick={() => setMenuOpen(false)}
                className="xl:hidden fixed inset-0 z-40 bg-black/60"
            />
        )}
        <header className="sticky top-0 z-50 bg-ink/80 backdrop-blur-xl border-b border-white/5">
            {/* Phones/tablets: [spacer | centered name | menu button]. Desktop: name left, links right. */}
            <div className="max-w-7xl mx-auto h-16 md:h-20 px-3 md:px-8 grid grid-cols-[2.75rem_1fr_2.75rem] items-center xl:flex xl:justify-between xl:gap-6">
                <span aria-hidden="true" className="xl:hidden" />

                <Link to="/" className="justify-self-center text-center whitespace-nowrap font-condensed text-[1.1rem] sm:text-xl md:text-2xl tracking-[0.12em] sm:tracking-[0.18em] uppercase text-white xl:shrink-0" aria-label="Calisthenics Lab India home">
                    Calisthenics Lab <span className="ember-text">India</span>
                </Link>

                <nav aria-label="Main" className="hidden xl:block">
                    <ul className="flex items-center gap-6 text-[0.78rem] font-semibold uppercase tracking-[0.14em]">
                        {navLinks.map(l => (
                            <li key={l.to}><NavLink to={l.to} end className={linkClass}>{l.label}</NavLink></li>
                        ))}
                    </ul>
                </nav>

                <button
                    onClick={() => setMenuOpen(o => !o)}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-nav"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    className="xl:hidden justify-self-end size-11 rounded-full flex items-center justify-center text-white hover:text-brand-orange transition-colors"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Menu floats over the page (doesn't push it down); tapping outside closes it. */}
            {menuOpen && (
                    <nav
                        id="mobile-nav"
                        aria-label="Mobile"
                        className="xl:hidden absolute inset-x-0 top-full border-t border-white/5 bg-ink/95 backdrop-blur-xl max-h-[calc(100dvh-4rem)] md:max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain shadow-2xl"
                    >
                        <ul className="max-w-7xl mx-auto px-4 py-3 grid sm:grid-cols-2 gap-1">
                            {navLinks.map(l => (
                                <li key={l.to}>
                                    <NavLink to={l.to} end onClick={() => setMenuOpen(false)} className={({ isActive }) => `block rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] ${isActive ? 'text-brand-orange bg-white/5' : 'text-white/80 hover:bg-white/5'}`}>
                                        {l.label}
                                    </NavLink>
                                </li>
                            ))}
                            <li>
                                <a href={staffLoginUrl} rel="nofollow noopener" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white/80 hover:bg-white/5">
                                    Staff Login
                                </a>
                            </li>
                        </ul>
                    </nav>
            )}
        </header>
        </>
    );
}
