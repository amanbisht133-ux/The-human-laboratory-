import { useState } from 'react';
import { X, Sparkles, Trophy } from 'lucide-react';
import { useTransitionNavigate } from '../components/Layout';
import main1Image from '../components/images/main1.png';
import caliLogo from '../components/images/cali_logo.jpeg';
import yogaBg from '../components/images/yoga_bg.jpeg';

export default function Home() {
    const navigateWithTransition = useTransitionNavigate();
    const [showPromo, setShowPromo] = useState(true);

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

            {/* KIDS BATCH PROMO MODAL */}
            {showPromo && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 transition-opacity duration-500">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={closePromo}
                    ></div>

                    <div className="relative w-full max-w-lg bg-black/80 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-[0_0_50px_rgba(242,110,24,0.3)] overflow-hidden">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 blur-[60px] rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-orange/10 blur-[60px] rounded-full -ml-16 -mb-16"></div>

                        <button
                            onClick={closePromo}
                            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="mb-4">
                                <span className="text-brand-orange font-black text-xs md:text-sm uppercase tracking-[0.4em] drop-shadow-[0_0_10px_rgba(242,110,24,0.5)]">
                                    Kids Batch
                                </span>
                            </div>

                            <div className="mb-6 p-4 bg-brand-orange/10 rounded-full border border-brand-orange/20">
                                <Sparkles className="text-brand-orange animate-pulse" size={40} />
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-white italic leading-tight uppercase tracking-tighter mb-4">
                                Empower the <br /> <span className="text-brand-orange">Next Generation</span>
                            </h2>

                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6 group transition-all hover:bg-brand-orange/10">
                                <Trophy size={16} className="text-brand-orange" />
                                <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest">
                                    Calisthenics + Gymnastics
                                </span>
                            </div>

                            <p className="text-base md:text-lg text-white/80 font-bold leading-relaxed mb-10 px-4">
                                Build strength, agility, and absolute confidence in your child.
                                <span className="text-white block mt-2">Get both disciplines in a single, elite subscription.</span>
                            </p>

                            <button
                                onClick={() => {
                                    closePromo();
                                    navigateWithTransition('/calisthenics-lab#info');
                                }}
                                className="group relative w-full py-5 bg-brand-orange text-black font-black text-lg md:text-xl uppercase tracking-widest rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
                            >
                                <span className="relative z-10">Secure Their Spot</span>
                            </button>

                            <p className="mt-6 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                                Limited Slots Available
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
