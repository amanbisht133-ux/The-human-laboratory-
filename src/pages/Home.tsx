import { useTransitionNavigate } from '../components/Layout';
import main1Image from '../components/images/main1.png';
import caliLogo from '../components/images/cali_logo.jpeg';
import yogaBg from '../components/images/yoga_bg.jpeg';

export default function Home() {
    const navigateWithTransition = useTransitionNavigate();

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

            {/* Quick Stats */}
            {/* <section className="bg-brand-dark py-12 px-6 border-y border-white/10" data-purpose="brand-stats">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-brand-orange text-3xl font-bold">5</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Certified Trainers</div>
                    </div>
                    <div>
                        <div className="text-brand-orange text-3xl font-bold">500+</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Transformations</div>
                    </div>
                    <div>
                        <div className="text-brand-orange text-3xl font-bold">3</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Premium Programs</div>
                    </div>
                    <div>
                        <div className="text-brand-orange text-3xl font-bold">6:30AM-9PM</div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 mt-1">Daily Batches</div>
                    </div>
                </div>
            </section> */}
        </>
    );
}
