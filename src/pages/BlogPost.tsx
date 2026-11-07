import { Link, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useReveal } from '../hooks/useReveal';
import PageHero from '../components/PageHero';
import ContactButtons from '../components/ContactButtons';
import NotFound from './NotFound';
import { blogPosts } from '../data/blog';

function formatDate(iso: string) {
    const [y, m, d] = iso.split('-').map(Number);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${d} ${months[m - 1]} ${y}`;
}

function Post({ slug }: { slug: string }) {
    const post = blogPosts.find(p => p.slug === slug)!;
    usePageMeta(`/blog/${slug}`);
    useReveal();

    return (
        <article className="text-white">
            <PageHero crumbs={[{ name: 'Blog', to: '/blog' }, { name: post.title }]} eyebrow={`Published ${formatDate(post.datePublished)}`} title={post.title}>
                <p>{post.intro}</p>
            </PageHero>
            <div className="px-6 pb-20">
                <div className="max-w-3xl mx-auto">
                    <div className="rounded-3xl overflow-hidden edge-ember aspect-[16/10] reveal">
                        <img src={post.image} alt={post.imageAlt} width={post.imageWidth} height={post.imageHeight} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    {post.sections.map(section => (
                        <section key={section.heading} className="mt-10">
                            <h2 className="font-condensed uppercase text-3xl md:text-4xl tracking-wide">{section.heading}</h2>
                            {section.paragraphs?.map(p => <p key={p} className="mt-4 text-white/80 leading-relaxed md:text-lg">{p}</p>)}
                            {section.list && (
                                <ul className="mt-4 space-y-2.5 list-disc pl-5 marker:text-brand-orange text-white/80 md:text-lg">
                                    {section.list.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            )}
                        </section>
                    ))}

                    <aside className="mt-12 glass edge-ember rounded-3xl p-6 md:p-8">
                        <p className="font-condensed uppercase text-3xl tracking-wide">{post.cta.text}</p>
                        <Link to={post.cta.to} className="btn-ember mt-5 px-7 py-3.5 text-sm">{post.cta.label}</Link>
                        <ContactButtons message={`Hi! I read "${post.title}" and want to start training.`} className="mt-4" />
                    </aside>

                    <nav aria-label="Related" className="mt-10">
                        <h2 className="font-semibold uppercase tracking-widest text-xs text-white/60">Related</h2>
                        <ul className="mt-3 space-y-2">
                            {post.related.map(r => (
                                <li key={r.to}><Link to={r.to} className="text-brand-orange underline underline-offset-4">{r.label}</Link></li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </article>
    );
}

export default function BlogPost() {
    const { slug = '' } = useParams();
    if (!blogPosts.some(p => p.slug === slug)) return <NotFound />;
    return <Post slug={slug} />;
}
