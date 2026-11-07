import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import { getPageMeta } from '../seo/pages';
import PageHero from '../components/PageHero';
import { blogPosts } from '../data/blog';

const PATH = '/blog';

export default function Blog() {
    usePageMeta(PATH);
    useReveal();
    const meta = getPageMeta(PATH);

    return (
        <div className="text-white">
            <PageHero crumbs={[{ name: meta.name }]} eyebrow="Guides from our coaches" title={meta.h1}>
                <p>Practical calisthenics advice from Calisthenics Lab India in Kondapur, Hyderabad: where to start, how to get your first pull-up, and how bodyweight training compares with the gym.</p>
            </PageHero>
            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                    {blogPosts.map(post => (
                        <article key={post.slug} className="glass rounded-3xl overflow-hidden group reveal">
                            <Link to={`/blog/${post.slug}`} className="block">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img src={post.image} alt={post.imageAlt} width={post.imageWidth} height={post.imageHeight} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <div className="p-6">
                                    <h2 className="font-condensed uppercase text-3xl tracking-wide leading-none group-hover:text-brand-orange transition-colors">{post.title}</h2>
                                    <p className="mt-3 text-sm text-white/70 leading-relaxed">{post.description}</p>
                                    <span className="mt-4 inline-flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-widest">Read guide <ArrowRight size={14} /></span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
