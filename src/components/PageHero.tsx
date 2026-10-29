import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Crumb = { name: string; to?: string };

/** Inner-page header: visible breadcrumb (mirrors the BreadcrumbList schema), H1 and intro. */
export default function PageHero({ crumbs, eyebrow, title, children }: { crumbs: Crumb[]; eyebrow: string; title: string; children?: ReactNode }) {
    return (
        <section className="section-glow px-6 pt-10 md:pt-14 pb-12 md:pb-16">
            <div className="max-w-4xl mx-auto">
                <nav aria-label="Breadcrumb" className="text-xs text-white/50">
                    <ol className="flex flex-wrap items-center gap-2">
                        <li><Link to="/" className="hover:text-brand-orange transition-colors">Home</Link></li>
                        {crumbs.map(c => (
                            <li key={c.name} className="flex items-center gap-2">
                                <span aria-hidden="true">/</span>
                                {c.to ? <Link to={c.to} className="hover:text-brand-orange transition-colors">{c.name}</Link> : <span className="text-white/80" aria-current="page">{c.name}</span>}
                            </li>
                        ))}
                    </ol>
                </nav>
                <span className="eyebrow mt-8">{eyebrow}</span>
                <h1 className="mt-4 font-condensed uppercase text-white text-5xl md:text-7xl leading-[0.92] tracking-wide">{title}</h1>
                {children && <div className="mt-6 text-base md:text-lg text-white/75 leading-relaxed max-w-3xl space-y-4">{children}</div>}
            </div>
        </section>
    );
}
