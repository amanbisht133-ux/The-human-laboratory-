import { useEffect } from 'react';
import { getPageMeta, absoluteUrl } from '../seo/pages';

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
    document.querySelector(selector)?.setAttribute(attr, value);
}

/**
 * Applies a page's title, meta tags, canonical and JSON-LD from the SEO registry
 * after client-side navigation. The prerendered HTML already ships the same
 * tags (scripts/prerender.mjs), so crawlers never depend on this running.
 */
export function usePageMeta(path: string) {
    useEffect(() => {
        const meta = getPageMeta(path);
        const url = absoluteUrl(meta.path === '/404' ? path : meta.path);
        const image = absoluteUrl(meta.image);

        document.title = meta.title;
        setMeta('meta[name="description"]', 'content', meta.description);
        setMeta('meta[name="robots"]', 'content', meta.noindex ? 'noindex, follow' : 'index, follow');
        setMeta('link[rel="canonical"]', 'href', url);
        setMeta('meta[property="og:title"]', 'content', meta.title);
        setMeta('meta[property="og:description"]', 'content', meta.description);
        setMeta('meta[property="og:url"]', 'content', url);
        setMeta('meta[property="og:image"]', 'content', image);
        setMeta('meta[name="twitter:title"]', 'content', meta.title);
        setMeta('meta[name="twitter:description"]', 'content', meta.description);
        setMeta('meta[name="twitter:image"]', 'content', image);

        document.querySelectorAll('script[data-page-ld]').forEach(el => el.remove());
        meta.schemas.forEach(schema => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.dataset.pageLd = '';
            script.textContent = JSON.stringify(schema);
            document.head.appendChild(script);
        });
    }, [path]);
}
