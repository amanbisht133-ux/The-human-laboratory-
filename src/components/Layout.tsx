import { useState, createContext, useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import caliLogo from './images/cali_logo.jpeg';

const TransitionContext = createContext<(path: string, state?: any) => void>(() => { });
export const useTransitionNavigate = () => useContext(TransitionContext);

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [targetPath, setTargetPath] = useState<string | null>(null);
    const [curtainState, setCurtainState] = useState<'idle' | 'active' | 'exit'>('idle');

    const navigateWithTransition = (path: string, state?: any) => {
        setTargetPath(path);
        setCurtainState('active');
        setTimeout(() => {
            navigate(path, { state });
            window.scrollTo(0, 0);
            setTimeout(() => {
                setCurtainState('exit');
                setTimeout(() => {
                    setCurtainState('idle');
                }, 800);
            }, 300); // Brief pause at peak for branding
        }, 1000); // Allow staggered layers to cover
    };

    const getHeaderText = () => {
        switch (location.pathname) {
            case '/calisthenics-lab':
                return 'calisthenics lab india';
            case '/yog-lab':
                return 'the yog lab';
            default:
                return 'the human laboratory';
        }
    };

    const activeBrandingPath = targetPath || location.pathname;
    const isYogLab = activeBrandingPath === '/yog-lab';

    return (
        <TransitionContext.Provider value={navigateWithTransition}>
            <div className="flex flex-col min-h-screen font-sans">
                {/* Triple-Layer Staggered Wipe */}
                <div className={`curtain-container ${curtainState === 'active' ? 'active' : ''} ${curtainState === 'exit' ? 'exit' : ''}`}>
                    <div className="curtain-layer curtain-layer-1" />
                    <div className="curtain-layer curtain-layer-2" />
                    <div className="curtain-layer curtain-layer-3" />
                    <div className="curtain-logo flex items-center justify-center">
                        {isYogLab ? (
                            <span className="text-brand-orange font-black text-3xl md:text-5xl uppercase tracking-[0.2em] italic drop-shadow-[0_0_20px_rgba(234,88,12,0.5)] text-center whitespace-nowrap">
                                THE YOG LAB
                            </span>
                        ) : (
                            <img
                                src={caliLogo}
                                alt="CALI"
                                className="w-full h-auto drop-shadow-[0_0_30px_rgba(242,110,24,0.5)] rounded-2xl"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://ui-avatars.com/api/?name=CALI&background=f26e18&color=fff&bold=true&size=128';
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Header */}
                <header className="h-20 flex items-center justify-center px-6 lg:px-12 relative z-50 bg-black">
                    <Link to="/" className="flex items-center w-full justify-center" style={{ textAlign: 'center' }}>
                        <span className="text-2xl tracking-[0.3em] uppercase font-black text-white hover:text-gray-300 transition-colors" style={{ textAlign: 'center' }}>
                            {getHeaderText()}
                        </span>
                    </Link>
                </header>

                {/* Main Content */}
                <div className="flex-1 w-full bg-black">
                    <Outlet />
                </div>

                {/* Footer */}
                {/* <footer className="bg-black py-12 px-6 lg:px-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <div className="text-2xl font-extrabold mb-1 tracking-tighter">CALI</div>
                        <p className="text-brand-orange text-xs font-semibold uppercase tracking-widest mb-2">By The Community, For The Community</p>
                        <p className="text-gray-400 text-sm mb-1">Hitec City, Hyderabad &bull; +91 88267 62234</p>
                        <p className="text-gray-500 text-sm">&copy; 2025 CALI Fitness Lab. All rights reserved.</p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Download Brochures</span>
                        <div className="flex gap-4">
                            <a className="text-gray-400 hover:text-brand-orange transition-colors text-sm font-medium border border-white/10 px-4 py-2 rounded-[8px]" href="/brochures/cali-lab-brochure.pdf" download>Calisthenics Lab</a>
                            <a className="text-gray-400 hover:text-brand-orange transition-colors text-sm font-medium border border-white/10 px-4 py-2 rounded-[8px]" href="/brochures/yog-lab-brochure.pdf" download>YOG Lab</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <a className="hover:opacity-80 transition-opacity flex items-center justify-center p-1" href="https://www.instagram.com/calisthenics.lab.india?igsh=MWI1YnZ0YWRicmNjaA==" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <img src={instaLogo} alt="Instagram" className="w-8 h-8 object-contain" />
                        </a>
                        <a className="hover:opacity-80 transition-opacity flex items-center justify-center p-1" href="https://wa.me/918826762234" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                            <img src={whatsappLogo} alt="WhatsApp" className="w-8 h-8 object-contain" />
                        </a>
                        <a className="hover:opacity-80 transition-opacity flex items-center justify-center p-1" href="https://maps.app.goo.gl/695SVZHotKEeK4zJ7" target="_blank" rel="noreferrer" aria-label="Google Maps">
                            <img src={mapLogo} alt="Google Maps" className="w-8 h-8 object-contain" />
                        </a>
                    </div>
                </div>
            </footer> */}
            </div>
        </TransitionContext.Provider>
    );
}
