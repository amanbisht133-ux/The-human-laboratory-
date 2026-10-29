import { Link, useLocation } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { navLinks } from '../data/nav';

export default function NotFound() {
    const { pathname } = useLocation();
    usePageMeta(pathname === '/' ? '/404' : pathname);

    return (
        <section className="section-glow px-6 py-24 text-center text-white">
            <p className="eyebrow">Error 404</p>
            <h1 className="mt-4 font-condensed uppercase text-6xl md:text-8xl tracking-wide">Page not found</h1>
            <p className="mt-4 text-white/70">This page doesn't exist. Try one of these instead:</p>
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
                {navLinks.map(l => (
                    <li key={l.to}><Link to={l.to} className="glass rounded-full px-5 py-3 inline-block text-sm font-semibold uppercase tracking-widest hover:text-brand-orange">{l.label}</Link></li>
                ))}
            </ul>
        </section>
    );
}
