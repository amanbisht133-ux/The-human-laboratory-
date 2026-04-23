import { useState } from 'react';
import yogHero from '../components/images/yog_hero_brochure.png';
import yogInfo from '../components/images/yog_info_brochure.png';

export default function YogLab() {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        duration: '',
        timing: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const whatsappNumber = "918826762234";
        const message = encodeURIComponent(
            `*THE YOG LAB INQUIRY*\n\n` +
            `*Name:* ${formData.name}\n` +
            `*Phone:* ${formData.phone}\n` +
            `*Email:* ${formData.email}\n` +
            `*Plan:* ${formData.duration}\n` +
            `*Timing:* ${formData.timing}\n` +
            `*Note:* Yoga classes are on Mon, Wed, Fri`
        );
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;

        setIsSubmitted(true);
        setTimeout(() => {
            const newWindow = window.open(whatsappUrl, '_blank');
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                window.location.href = whatsappUrl;
            }
            setIsSubmitted(false);
            setIsBookingModalOpen(false);
        }, 1500);
    };

    const getPrice = (duration: string) => {
        switch (duration) {
            case 'Monthly': return '3,333';
            case 'Quarterly': return '8,888';
            case 'Half-Yearly': return '17,171';
            case 'Yearly': return '33,333';
            default: return '';
        }
    };

    return (
        <div className="bg-[#fffcf5] font-display text-slate-900 scroll-smooth">
            <div className="relative flex flex-col items-center">

                {/* HERO BROCHURE */}
                <section className="relative w-full flex flex-col items-center pt-24 md:pt-32 pb-4 px-4 bg-white" id="hero">
                    <div className="max-w-7xl w-full mx-auto relative z-10 animate-reveal">
                        <div className="shadow-[0_0_50px_rgba(234,88,12,0.1)] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-orange-100">
                            <img
                                src={yogHero}
                                alt="The Yog Lab - Intentional Movement"
                                className="w-full h-auto"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://ui-avatars.com/api/?name=THE+YOG+LAB&background=ea580c&color=fff&bold=true&size=512';
                                }}
                            />
                        </div>

                        {/* Hero CTA Overlay/Button */}
                        <div className="mt-8 text-center group">
                            <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="px-12 py-5 bg-orange-600 text-white font-black text-xl md:text-2xl uppercase tracking-widest rounded-full transition-all hover:scale-110 active:scale-95 shadow-xl shadow-orange-600/20 hover:shadow-orange-600/40"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </section>

                {/* INFO BROCHURE */}
                <section className="relative w-full py-8 px-4 md:px-8 bg-[#fffcf5]" id="info">
                    <div className="max-w-6xl w-full mx-auto relative z-10">
                        <div className="shadow-[0_0_80px_rgba(0,0,0,0.05)] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border border-orange-50 bg-white">
                            <img
                                src={yogInfo}
                                alt="Yog Lab Plans and Timings"
                                className="w-full h-auto"
                                loading="lazy"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://ui-avatars.com/api/?name=INFO&background=ea580c&color=fff&bold=true&size=512';
                                }}
                            />
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-16 text-center">
                            <h3 className="text-2xl md:text-4xl font-black text-slate-800 italic uppercase tracking-tighter mb-8">
                                Begin Your <span className="text-orange-600">Journey</span> Today
                            </h3>
                            <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="px-10 py-4 border-2 border-orange-600 text-orange-600 font-black text-lg uppercase tracking-widest rounded-full hover:bg-orange-600 hover:text-white transition-all transform hover:scale-105"
                            >
                                Start Your Flow
                            </button>
                        </div>
                    </div>
                </section>

                {/* FOOTER PADDING */}
                <div className="h-24 bg-[#fffcf5] w-full"></div>
            </div>

            {/* BOOKING MODAL */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={() => setIsBookingModalOpen(false)}
                    ></div>

                    <div className="relative w-[95vw] max-w-lg bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-orange-100 overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setIsBookingModalOpen(false)}
                            className="absolute top-8 right-8 text-slate-400 hover:text-orange-600 transition-colors"
                        >
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>

                        {!isSubmitted ? (
                            <>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 italic tracking-tight mb-2 uppercase">The Yog Lab</h2>
                                <p className="text-orange-600 font-bold uppercase tracking-widest text-[10px] mb-8">Start your transformation today</p>

                                <form onSubmit={handleBookingSubmit} className="space-y-4">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            required
                                            placeholder=" "
                                            className="peer w-full bg-slate-50 border border-slate-200 focus:border-orange-600 rounded-2xl px-6 py-5 text-slate-900 outline-none transition-all placeholder-transparent"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        <label className={`absolute left-6 transition-all pointer-events-none uppercase font-black tracking-[0.2em] text-[10px] 
                                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-slate-400
                                            peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-white peer-focus:px-2 peer-focus:text-orange-600
                                            ${formData.name ? '-top-2 left-4 bg-white px-2 text-orange-600' : ''}`}>
                                            Full Name
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <input
                                            type="tel"
                                            required
                                            placeholder=" "
                                            className="peer w-full bg-slate-50 border border-slate-200 focus:border-orange-600 rounded-2xl px-6 py-5 text-slate-900 outline-none transition-all placeholder-transparent"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                        <label className={`absolute left-6 transition-all pointer-events-none uppercase font-black tracking-[0.2em] text-[10px] 
                                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-slate-400
                                            peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-white peer-focus:px-2 peer-focus:text-orange-600
                                            ${formData.phone ? '-top-2 left-4 bg-white px-2 text-orange-600' : ''}`}>
                                            Phone Number
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <input
                                            type="email"
                                            required
                                            placeholder=" "
                                            className="peer w-full bg-slate-50 border border-slate-200 focus:border-orange-600 rounded-2xl px-6 py-5 text-slate-900 outline-none transition-all placeholder-transparent font-bold"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <label className={`absolute left-6 transition-all pointer-events-none uppercase font-black tracking-[0.2em] text-[10px] 
                                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-slate-400
                                            peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-white peer-focus:px-2 peer-focus:text-orange-600
                                            ${formData.email ? '-top-2 left-4 bg-white px-2 text-orange-600' : ''}`}>
                                            Email Address
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* DURATION DROPDOWN */}
                                        <div className="relative group">
                                            <label className="absolute left-6 -top-2 bg-white px-2 transition-all pointer-events-none uppercase font-black tracking-[0.2em] text-[10px] text-orange-600 z-20">
                                                Duration
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setActiveDropdown(activeDropdown === 'duration' ? null : 'duration')}
                                                className={`w-full bg-slate-50 border ${activeDropdown === 'duration' ? 'border-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.1)]' : 'border-slate-200'} rounded-2xl px-6 py-5 flex justify-between items-center transition-all group relative z-10`}
                                            >
                                                <span className={`font-bold text-sm uppercase ${formData.duration ? 'text-slate-900' : 'text-slate-400'}`}>
                                                    {formData.duration || 'Select Duration'}
                                                </span>
                                                <span className={`material-symbols-outlined transition-transform duration-300 ${activeDropdown === 'duration' ? 'rotate-180 text-orange-600' : 'text-slate-400'}`}>expand_more</span>
                                            </button>

                                            {activeDropdown === 'duration' && (
                                                <>
                                                    <div className="fixed inset-0 z-[105]" onClick={() => setActiveDropdown(null)}></div>
                                                    <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-orange-100 rounded-2xl overflow-hidden z-[110] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                        {['Monthly', 'Quarterly', 'Half-Yearly', 'Yearly'].map(plan => (
                                                            <div
                                                                key={plan}
                                                                onClick={() => {
                                                                    setFormData({ ...formData, duration: plan });
                                                                    setActiveDropdown(null);
                                                                }}
                                                                className={`px-6 py-4 hover:bg-orange-600 hover:text-white transition-all cursor-pointer font-bold text-xs uppercase tracking-widest ${formData.duration === plan ? 'text-orange-600 bg-orange-50' : 'text-slate-600'}`}
                                                            >
                                                                {plan}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* TIMING DROPDOWN */}
                                        <div className="relative group">
                                            <label className="absolute left-6 -top-2 bg-white px-2 transition-all pointer-events-none uppercase font-black tracking-[0.2em] text-[10px] text-orange-600 z-20">
                                                Timing
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setActiveDropdown(activeDropdown === 'timing' ? null : 'timing')}
                                                className={`w-full bg-slate-50 border ${activeDropdown === 'timing' ? 'border-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.1)]' : 'border-slate-200'} rounded-2xl px-6 py-5 flex justify-between items-center transition-all group relative z-10`}
                                            >
                                                <span className={`font-bold text-sm uppercase ${formData.timing ? 'text-slate-900' : 'text-slate-400'}`}>
                                                    {formData.timing || 'Select Timing'}
                                                </span>
                                                <span className={`material-symbols-outlined transition-transform duration-300 ${activeDropdown === 'timing' ? 'rotate-180 text-orange-600' : 'text-slate-400'}`}>expand_more</span>
                                            </button>

                                            {activeDropdown === 'timing' && (
                                                <>
                                                    <div className="fixed inset-0 z-[105]" onClick={() => setActiveDropdown(null)}></div>
                                                    <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-orange-100 rounded-2xl overflow-hidden z-[110] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                        {['6:30 AM - 7:30 AM'].map(slot => (
                                                            <div
                                                                key={slot}
                                                                onClick={() => {
                                                                    setFormData({ ...formData, timing: slot });
                                                                    setActiveDropdown(null);
                                                                }}
                                                                className={`px-6 py-4 hover:bg-orange-600 hover:text-white transition-all cursor-pointer font-bold text-xs uppercase tracking-widest ${formData.timing === slot ? 'text-orange-600 bg-orange-50' : 'text-slate-600'}`}
                                                            >
                                                                {slot}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {formData.duration && (
                                        <div className="p-6 bg-orange-50 border border-orange-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Selected Plan:</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">{formData.duration}</span>
                                            </div>
                                            <div className="flex justify-between items-baseline">
                                                <span className="text-slate-900 font-bold">Total Price:</span>
                                                <span className="text-3xl font-black text-slate-900 italic">₹{getPrice(formData.duration)}<span className="text-xs italic text-slate-400 ml-1">/-</span></span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-500 flex items-start gap-2">
                                            <span className="material-symbols-outlined text-sm text-orange-600">info</span>
                                            Note: The classes of yoga will only be on Monday, Wednesday, Friday
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-orange-600 text-white font-black py-5 rounded-2xl uppercase tracking-[0.3em] text-lg mt-8 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-orange-600/20"
                                    >
                                        Send Details
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                                <div className="relative size-24 mx-auto">
                                    <div className="absolute inset-0 bg-orange-600 rounded-full animate-ping opacity-20"></div>
                                    <div className="relative size-full bg-orange-50 rounded-full flex items-center justify-center border-2 border-orange-600">
                                        <span className="material-symbols-outlined text-orange-600 text-5xl font-bold animate-pulse">chat</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Redirecting...</h2>
                                    <p className="text-orange-600 font-bold uppercase tracking-widest text-[10px]">Moving to WhatsApp</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
