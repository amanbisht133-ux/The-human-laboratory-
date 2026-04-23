import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useTransitionNavigate } from '../components/Layout';
import main1Image from '../components/images/main1.png';
import caliLogo from '../components/images/cali_logo.jpeg';
import yogaBg from '../components/images/yoga_bg.jpeg';

export default function Home() {
    const navigateWithTransition = useTransitionNavigate();
    const [showPromo, setShowPromo] = useState(true);

    useEffect(() => {
        if (showPromo) {
            const timer = setTimeout(() => {
                setShowPromo(false);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [showPromo]);

    const closePromo = () => {
        setShowPromo(false);
    };

    return (
        <>
            <main className="split-container flex flex-col lg:flex-row w-full overflow-hidden">
                {/* CALISTHENICS SIDE */}
                <section className="hero-section flex-1 relative flex flex-col justify-between min-h-[70vh] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-white/10 group pt-6 pb-6 lg:pt-8 lg:pb-8">
                    <div className="section-bg absolute inset-0 z-0 bg-contain bg-center bg-no-repeat transform scale-[0.8] lg:scale-90" style={{ backgroundImage: `url(${main1Image})` }}></div>
                    <div className="bg-dots absolute inset-0 z-10 pointer-events-none"></div>

                    {/* Top Content */}
                    <div className="relative z-20 flex justify-center">
                        <img
                            src={caliLogo}
                            alt="CALI"
                            className="w-36 sm:w-40 lg:w-56 h-auto drop-shadow-2xl rounded-2xl"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://ui-avatars.com/api/?name=CALI&background=f26e18&color=fff&bold=true&size=256';
                            }}
                        />
                    </div>

                    {/* Bottom Content */}
                    <div className="relative z-20 text-center">
                        <button onClick={() => navigateWithTransition('/calisthenics-lab')} className="btn-12">
                            <span>Enter the Lab</span>
                        </button>
                    </div>
                </section>

                {/* YOG LAB SIDE */}
                <section className="hero-section flex-1 relative flex flex-col justify-between min-h-[70vh] lg:min-h-0 border-b lg:border-b-0 border-white/10 group overflow-hidden pt-6 pb-6 lg:pt-8 lg:pb-8">
                    <div className="section-bg absolute inset-0 z-0 bg-cover bg-top transition-transform duration-[1.5s] origin-top scale-[1.3] md:scale-[1.4] group-hover:scale-[1.35] md:group-hover:scale-[1.45]" style={{ backgroundImage: `url(${yogaBg})` }}></div>
                    <div className="bg-dots absolute inset-0 z-10 pointer-events-none"></div>

                    {/* Top Content */}
                    <div className="relative z-20 text-center w-full px-4">
                        <span className="font-black uppercase leading-none drop-shadow-2xl block w-full text-center" style={{ color: '#ed880c', fontSize: 'clamp(2rem, 8vw, 5rem)', letterSpacing: '0.05em', textShadow: '0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7), 2px 2px 8px rgba(0,0,0,1)' }}>THE YOG LAB</span>
                    </div>

                    {/* Bottom Content */}
                    <div className="relative z-20 text-center">
                        <button onClick={() => navigateWithTransition('/yog-lab')} className="btn-12">
                            <span>Start Your Flow</span>
                        </button>
                    </div>
                </section>
            </main>

            {/* KIDS BATCH PROMO TOAST */}
            {showPromo && (
                <div className="fixed top-24 right-6 z-[200] w-[calc(100%-3rem)] max-w-[320px] animate-reveal">
                    <div className="relative bg-brand-dark/90 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-brand-orange/20 blur-[40px] rounded-full -mr-10 -mt-10"></div>

                        <button
                            onClick={closePromo}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1"
                        >
                            <X size={16} />
                        </button>

                        <div className="relative z-10 flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-brand-orange/10 rounded-lg border border-brand-orange/20">
                                    <Sparkles className="text-brand-orange" size={16} />
                                </div>
                                <span className="text-brand-orange font-black text-[10px] uppercase tracking-[0.2em]">
                                    Kids Batch
                                </span>
                            </div>

                            <h2 className="text-lg font-black text-white italic uppercase tracking-tighter leading-tight">
                                Empower the <span className="text-brand-orange">Next Gen</span>
                            </h2>

                            <p className="text-[11px] text-white/70 font-bold leading-snug">
                                Calisthenics + Gymnastics <br />
                                <span className="text-white/40 text-[9px] uppercase tracking-widest mt-1 block">Limited Slots Available</span>
                            </p>

                            <button
                                onClick={() => {
                                    closePromo();
                                    navigateWithTransition('/calisthenics-lab', { openBooking: true, selectedBatch: 'Kids Batch' });
                                }}
                                className="group relative w-full py-2.5 bg-brand-orange text-black font-black text-[10px] uppercase tracking-widest rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span className="relative z-10">Secure Spot</span>
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-brand-orange animate-progress-shrink"></div>
                    </div>
                </div>
            )}
        </>
    );
}
