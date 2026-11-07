import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/nav';

export default function SiteHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `transition-colors ${isActive ? 'text-brand-orange' : 'text-white/75 hover:text-white'}`;

    return (
        <header className="sticky top-0 z-50 bg-ink/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto h-16 md:h-20 px-4 md:px-8 flex items-center justify-between gap-6">
                <Link to="/" className="font-condensed text-xl md:text-2xl tracking-[0.18em] uppercase text-white shrink-0" aria-label="Calisthenics Lab India home">
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
                    className="xl:hidden size-11 -mr-1 rounded-full flex items-center justify-center text-white hover:text-brand-orange transition-colors"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <nav id="mobile-nav" aria-label="Mobile" className={`xl:hidden border-t border-white/5 bg-ink/95 ${menuOpen ? 'block' : 'hidden'}`}>
                <ul className="max-w-7xl mx-auto px-4 py-3 grid sm:grid-cols-2 gap-1">
                    {navLinks.map(l => (
                        <li key={l.to}>
                            <NavLink to={l.to} end onClick={() => setMenuOpen(false)} className={({ isActive }) => `block rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] ${isActive ? 'text-brand-orange bg-white/5' : 'text-white/80 hover:bg-white/5'}`}>
                                {l.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
