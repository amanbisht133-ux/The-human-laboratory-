import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
}

/**
 * Updates document title and meta description on page mount.
 * For a CSR app this won't help crawlers directly, but it keeps
 * the browser tab accurate and provides a baseline for any future
 * SSR/prerender setup.
 */
export function useSEO({ title, description, canonicalPath }: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // OG title
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // OG description
    let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    // OG url / canonical
    if (canonicalPath) {
      const base = 'https://the-human-laboratory.vercel.app';
      const fullUrl = `${base}${canonicalPath}`;

      let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', fullUrl);

      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', fullUrl);
    }
  }, [title, description, canonicalPath]);
}
