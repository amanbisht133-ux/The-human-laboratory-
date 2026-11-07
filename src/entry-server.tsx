// Build-time entry used by scripts/prerender.mjs to render each route to static HTML.
import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

export { pages, notFoundPage, absoluteUrl } from './seo/pages';

export async function render(url: string): Promise<string> {
    // prerender waits for every lazy route chunk to resolve, so the HTML is complete.
    const { prelude } = await prerender(
        <StrictMode>
            <StaticRouter location={url}>
                <AppRoutes />
            </StaticRouter>
        </StrictMode>
    );
    return new Response(prelude).text();
}
