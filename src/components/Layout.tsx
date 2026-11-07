import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { trackPixelEvent } from '../lib/metaPixel';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function Layout() {
    const location = useLocation();

    // Start every page at the top (SPA navigation keeps the old scroll position otherwise).
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const isFirstPageView = useRef(true);
    useEffect(() => {
        if (isFirstPageView.current) {
            // Base pixel code in index.html already fires the initial PageView.
            isFirstPageView.current = false;
            return;
        }
        trackPixelEvent('PageView');
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            <SiteHeader />
            <main className="flex-1 w-full bg-ink">
                <Outlet />
            </main>
            <SiteFooter />
        </div>
    );
}
