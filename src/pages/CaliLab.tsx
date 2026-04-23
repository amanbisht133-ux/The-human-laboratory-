import { useState, useEffect, useRef } from 'react';
import { MapPin, Mail } from 'lucide-react';
import reviewsData from '../data/reviews.json';
import caliLogo from '../components/images/CALI@2x.png';
import communityStory from '../components/images/community_collage.jpg';

export default function CaliLab() {
    const [isWeekdayOpen, setIsWeekdayOpen] = useState(false);
    const [isWeekendOpen, setIsWeekendOpen] = useState(false);
    const [isAdvantageOpen, setIsAdvantageOpen] = useState(false);
    const [isVsGymOpen, setIsVsGymOpen] = useState(false);
    const [isProgramsOpen, setIsProgramsOpen] = useState(false);
    const [isWhyUsOpen, setIsWhyUsOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        batch: '',
        duration: '',
        timing: ''
    });
    const [errors, setErrors] = useState({ name: '', email: '', phone: '', batch: '', duration: '', timing: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const [reviews, setReviews] = useState(reviewsData);

    useEffect(() => {
        const fetchReviews = async () => {
            const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
            const PLACE_ID = "ChIJL3MBiWi7vDsRUAZ_As5DGVU";


            if (!API_KEY) return;

            try {
                // Official Google Places API call
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`
                );
                const data = await response.json();

                if (data.result?.reviews && data.result.reviews.length > 0) {
                    const formattedReviews = data.result.reviews.map((r: any) => ({
                        name: r.author_name,
                        text: r.text,
                        stars: r.rating,
                        img: r.profile_photo_url || reviewsData[0].img
                    }));
                    setReviews(formattedReviews);
                }
            } catch (error) {
                console.error("Error fetching live reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    const PRICING_TIERS = {
        'Weekday Batch': {
            '1 Day': '₹800',
            '1 Month': '₹7,777',
            '3 Months': '₹22,222',
            '6 Months': '₹44,444',
            '1 Year': '₹77,777'
        },
        'Weekend': {
            '1 Day': '₹800',
            '1 Month': '₹5,555',
            '3 Months': '₹15,151',
            '6 Months': '₹31,313',
            '1 Year': '₹60,606'
        },
        'Kids Batch': {
            '1 Day': '₹800',
            '1 Month': '₹5,555',
            '3 Months': '₹15,151',
            '6 Months': '₹31,313',
            '1 Year': '₹60,606'
        },
        'Personal Training': {
            '1 Day': 'Consultation',
            '1 Month': 'Consultation'
        }
    };

    const BATCH_TIMINGS: any = {
        'Weekday Batch': {
            'Morning': ['6:30 AM - 7:30 AM', '7:30 AM - 8:30 AM', '8:30 AM - 9:30 AM', '9:30 AM - 10:30 AM'],
            'Evening': ['6:00 PM - 7:00 PM', '7:00 PM - 8:00 PM', '8:00 PM - 9:00 PM', '9:00 PM - 10:00 PM']
        },
        'Weekend': ['9:00 AM - 10:00 AM'],
        'Kids Batch': {
            'Morning': ['9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM'],
            'Evening': ['4:00 PM - 5:00 PM', '5:00 PM - 6:00 PM']
        }
    };

    const validateForm = () => {
        let newErrors = { name: '', email: '', phone: '', batch: '', duration: '', timing: '' };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
            isValid = false;
        } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Invalid phone number (10 digits)';
            isValid = false;
        }

        if (!formData.batch) {
            newErrors.batch = 'Batch selection is required';
            isValid = false;
        }

        if (!formData.duration) {
            newErrors.duration = 'Duration selection is required';
            isValid = false;
        }

        if (formData.batch !== 'Personal Training' && !formData.timing) {
            newErrors.timing = 'Timing selection is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Craft WhatsApp Message
        const price = (PRICING_TIERS as any)[formData.batch][formData.duration];
        const message = encodeURIComponent(
            `*NEW BOOKING INQUIRY - CALI LAB*\n\n` +
            `*Name:* ${formData.name}\n` +
            `*Email:* ${formData.email}\n` +
            `*Phone:* ${formData.phone}\n` +
            `*Batch:* ${formData.batch}\n` +
            `*Duration:* ${formData.duration}\n` +
            (formData.timing ? `*Timing:* ${formData.timing}\n` : '') +
            `*Total Price:* ${price}\n\n` +
            `_I'm interested in joining the lab. Please provide further details._`
        );

        const whatsappNumber = "918826762234";
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;

        setIsSubmitted(true);

        // Redirect after a short delay for visual feedback
        setTimeout(() => {
            const newWindow = window.open(whatsappUrl, '_blank');

            // If the popup was blocked, fallback to redirecting the current tab
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                window.location.href = whatsappUrl;
            }

            setIsSubmitted(false);
            setIsBookingModalOpen(false);
            setFormData({ name: '', email: '', phone: '', batch: '', duration: '', timing: '' });
            setErrors({ name: '', email: '', phone: '', batch: '', duration: '', timing: '' });
        }, 1500);
    };
    const scrollRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const scrollPos = useRef(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force muted to true (required for mobile autoplay)
        video.muted = true;
        video.oncontextmenu = (e) => e.preventDefault();

        const attemptPlay = () => {
            video.play().catch(err => {
                console.log("Autoplay prevented, waiting for interaction:", err);

                // Fallback: Play on first touch/click
                const playOnInteraction = () => {
                    video.play().then(() => {
                        window.removeEventListener('click', playOnInteraction);
                        window.removeEventListener('touchstart', playOnInteraction);
                    });
                };
                window.addEventListener('click', playOnInteraction);
                window.addEventListener('touchstart', playOnInteraction);
            });
        };

        attemptPlay();
    }, []);

    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (scrollRef.current) {
            observer.observe(scrollRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let animationFrameId: number;
        let lastTimestamp: number;

        const animate = (timestamp: number) => {
            if (!isInView || isPaused) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            if (!lastTimestamp) lastTimestamp = timestamp;
            const delta = timestamp - lastTimestamp;

            if (scrollRef.current) {
                const speed = 0.12;
                scrollPos.current += speed * delta;

                const maxScroll = scrollRef.current.scrollWidth / 3;
                if (scrollPos.current >= maxScroll) {
                    scrollPos.current = 0;
                }
                scrollRef.current.scrollLeft = scrollPos.current;
            }

            lastTimestamp = timestamp;
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, isInView]);

    const scroll = (direction: 'left' | 'right') => {
        setIsPaused(true);
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            // Update virtual pos after smooth scroll
            setTimeout(() => {
                if (scrollRef.current) scrollPos.current = scrollRef.current.scrollLeft;
            }, 500);
        }
        setTimeout(() => setIsPaused(false), 10000);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="relative flex w-full flex-col overflow-x-hidden">
                {/* HERO SECTION */}
                <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black px-6 py-12">
                    {/* Background Video Layer */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-black/70 z-10"></div>
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover brightness-[0.90b] contrast-125 pointer-events-none"
                            autoPlay
                            loop
                            muted
                            playsInline
                            webkit-playsinline="true"
                            disablePictureInPicture
                            preload="auto"
                            poster={caliLogo}
                        >
                            <source src="/videos/Video.mov" type="video/quicktime" />
                            <source src="/videos/Video.mov" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    {/* Centered Branding */}
                    <div className="relative z-20 flex flex-col items-center text-center mt-[-12vh]">
                        {/* Welcome Text */}
                        <span className="text-white text-base md:text-2xl font-medium uppercase tracking-[0.6em] mb-4 drop-shadow-md opacity-90">Welcome</span>

                        {/* CALI Logo */}
                        <div className="mb-2 max-w-[200px] md:max-w-[400px]">
                            <img
                                src={caliLogo}
                                alt="CALI"
                                className="w-full h-auto drop-shadow-2xl transition-all hover:scale-105"
                            />
                        </div>

                        {/* Tagline & Headlines */}
                        <div className="max-w-6xl mx-auto flex flex-col items-center">
                            <h1 className="text-4xl sm:text-6xl md:text-[6rem] font-black leading-[0.9] text-white tracking-widest flex flex-col uppercase mb-6 italic">
                                <span className="block drop-shadow-2xl">BY THE COMMUNITY</span>
                                <span className="block drop-shadow-2xl text-brand-orange">FOR THE COMMUNITY</span>
                            </h1>

                            <p className="text-lg md:text-2xl text-white/80 font-bold uppercase tracking-[0.4em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-10">
                                Experiment. Evolve. Repeat.
                            </p>

                            {/* Social Icons Row */}
                            <div className="flex items-center gap-8 mb-10">
                                <a
                                    href="https://maps.app.goo.gl/695SVZHotKEeK4zJ7"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:text-brand-orange hover:border-brand-orange transition-all hover:scale-110 shadow-lg"
                                    aria-label="Google Maps"
                                >
                                    <MapPin size={24} />
                                </a>
                                <a
                                    href="https://www.instagram.com/calisthenics.lab.india?igsh=MWI1YnZ0YWRicmNjaA=="
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:text-brand-orange hover:border-brand-orange transition-all hover:scale-110 shadow-lg"
                                    aria-label="Instagram"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>
                                </a>
                                <a
                                    href="mailto:Calisthenicslabindia@gmail.com"
                                    className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:text-brand-orange hover:border-brand-orange transition-all hover:scale-110 shadow-lg"
                                    aria-label="Email"
                                >
                                    <Mail size={24} />
                                </a>
                            </div>

                            {/* CTA Button */}
                            <div>
                                <button
                                    onClick={() => setIsBookingModalOpen(true)}
                                    className="group relative px-12 py-4 bg-brand-orange text-black font-black text-xl md:text-2xl uppercase tracking-widest rounded-full overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(242,110,24,0.4)]"
                                >
                                    <span className="relative z-10">Book Now</span>
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0 opacity-20"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="pt-12 pb-4 px-6 md:px-20 bg-black relative overflow-hidden" id="advantage">
                    <div className="max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
                        {/* THE CALISTHENICS ADVANTAGE */}
                        <div className="group/accordion border-l-4 border-brand-orange bg-white/5 backdrop-blur-md rounded-r-2xl transition-all duration-300 hover:bg-white/10 overflow-hidden shadow-2xl">
                            <button
                                onClick={() => setIsAdvantageOpen(!isAdvantageOpen)}
                                className="w-full flex items-center justify-between px-8 py-6 text-left group"
                            >
                                <span className="text-lg md:text-xl font-black text-white tracking-widest uppercase flex items-center gap-4">
                                    <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_#f26e18]"></span>
                                    The Calisthenics Advantage
                                </span>
                                <div className={`size-10 rounded-full border border-brand-orange flex items-center justify-center transition-all duration-300 ${isAdvantageOpen ? 'bg-brand-orange rotate-180' : 'bg-transparent text-brand-orange'}`}>
                                    <span className={`material-symbols-outlined text-2xl ${isAdvantageOpen ? 'text-black' : 'text-brand-orange'}`}>expand_more</span>
                                </div>
                            </button>
                            <div className={`transition-all duration-500 ease-in-out ${isAdvantageOpen ? 'max-h-[1000px] opacity-100 p-8 pt-0' : 'max-h-0 opacity-0'}`}>
                                <div className="h-px bg-gradient-to-r from-brand-orange/50 to-transparent mb-8"></div>
                                <p className="text-base md:text-lg text-white font-bold leading-relaxed mb-8 drop-shadow-md">
                                    True strength isn't about moving dead weight; it's about absolute control over your own movement. We don't just chase numbers; we build functional, athletic bodies.
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { title: "Deep Mind-Muscle Connection", desc: "Train your nervous system and muscles to fire together as a highly efficient unit." },
                                        { title: "Total Coordination & Balance", desc: "Develop spatial awareness and stability that translates directly into real-world agility." },
                                        { title: "True Mobility & Flexibility", desc: "Build strength through a full range of motion to bulletproof your joints and move without restriction." },
                                        { title: "The Ultimate Byproduct", desc: "Fat loss, lean muscle gain, and a chiseled physique aren't just goals—they are the inevitable, natural results of mastering these skills." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex flex-col gap-2 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-brand-orange/30 transition-all">
                                            <span className="text-brand-orange font-black text-xs uppercase tracking-tighter">{item.title}</span>
                                            <p className="text-sm text-white/80 font-medium leading-tight">{item.desc}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* CALISTHENICS VS GYM */}
                        <div className="group/accordion border-l-4 border-brand-orange bg-white/5 backdrop-blur-md rounded-r-2xl transition-all duration-300 hover:bg-white/10 overflow-hidden shadow-2xl">
                            <button
                                onClick={() => setIsVsGymOpen(!isVsGymOpen)}
                                className="w-full flex items-center justify-between px-8 py-6 text-left group"
                            >
                                <span className="text-lg md:text-xl font-black text-white tracking-widest uppercase flex items-center gap-4">
                                    <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_#f26e18]"></span>
                                    Calisthenics vs Gym
                                </span>
                                <div className={`size-10 rounded-full border border-brand-orange flex items-center justify-center transition-all duration-300 ${isVsGymOpen ? 'bg-brand-orange rotate-180' : 'bg-transparent text-brand-orange'}`}>
                                    <span className={`material-symbols-outlined text-2xl ${isVsGymOpen ? 'text-black' : 'text-brand-orange'}`}>expand_more</span>
                                </div>
                            </button>
                            <div className={`transition-all duration-500 ease-in-out ${isVsGymOpen ? 'max-h-[500px] opacity-100 p-8 pt-0' : 'max-h-0 opacity-0'}`}>
                                <div className="h-px bg-gradient-to-r from-brand-orange/50 to-transparent mb-8"></div>
                                <p className="text-base md:text-lg text-white font-bold leading-relaxed drop-shadow-md">
                                    In a traditional gym, you use machines to isolate muscles; at <span className="text-brand-orange font-black uppercase tracking-wider">Calisthenics Lab India</span>, you use your body to build mastery. While most people go to the gym just for the look—focusing on fat loss and muscle gain—we treat those as mere by-products of our training. Our focus is on deep body awareness and movement control. We don't just build a physique; we build a body that knows exactly what it's capable of.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pt-4 pb-4 px-6 md:px-20 bg-black relative overflow-hidden" id="programs">
                    <div className="max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
                        {/* THE WEEKDAY Opreation */}
                        <div className="group/accordion border-l-4 border-brand-orange bg-white/5 backdrop-blur-md rounded-r-2xl transition-all duration-300 hover:bg-white/10 overflow-hidden shadow-2xl">
                            <button
                                onClick={() => setIsWeekdayOpen(!isWeekdayOpen)}
                                className="w-full flex items-center justify-between px-8 py-6 text-left group"
                            >
                                <span className="text-lg md:text-xl font-black text-white tracking-widest uppercase flex items-center gap-4">
                                    <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_#f26e18]"></span>
                                    The Weekday Operation
                                </span>
                                <div className={`size-10 rounded-full border border-brand-orange flex items-center justify-center transition-all duration-300 ${isWeekdayOpen ? 'bg-brand-orange rotate-180' : 'bg-transparent text-brand-orange'}`}>
                                    <span className={`material-symbols-outlined text-2xl ${isWeekdayOpen ? 'text-black' : 'text-brand-orange'}`}>expand_more</span>
                                </div>
                            </button>
                            <div className={`transition-all duration-500 ease-in-out ${isWeekdayOpen ? 'max-h-[1000px] opacity-100 p-8 pt-0' : 'max-h-0 opacity-0'}`}>
                                <div className="h-px bg-gradient-to-r from-brand-orange/50 to-transparent mb-8"></div>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { title: "8 Opportunity Windows", desc: "With four batches in the morning and four in the evening, you never have to miss a workout. Your fitness fits your lifestyle, not the other way around." },
                                        { title: "The 2-Trainer Standard", desc: "Unlike traditional gyms where you're on your own, every weekday slot at the Lab ensures a high coach-to-student ratio. You get the energy of a group with the precision of personal training." },
                                        { title: "End-to-End Coaching", desc: "From the moment you walk in to your final stretch, our coaches manage the clock and the intensity. We handle the programming; you just show up and put in the work." },
                                        { title: "Extended Training", desc: "Finished the session but still have fuel in the tank? Our weekday format allows athletes the freedom to stay back for extra practice, making it the perfect environment for those chasing advanced skills." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex flex-col gap-2 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-brand-orange/30 transition-all">
                                            <span className="text-brand-orange font-black text-xs uppercase tracking-tighter">{item.title}</span>
                                            <p className="text-sm text-white/80 font-medium leading-tight">{item.desc}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* THE WEEKEND RESET */}
                        <div className="group/accordion border-l-4 border-brand-orange bg-white/5 backdrop-blur-md rounded-r-2xl transition-all duration-300 hover:bg-white/10 overflow-hidden shadow-2xl">
                            <button
                                onClick={() => setIsWeekendOpen(!isWeekendOpen)}
                                className="w-full flex items-center justify-between px-8 py-6 text-left group"
                            >
                                <span className="text-lg md:text-xl font-black text-white tracking-widest uppercase flex items-center gap-4">
                                    <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_#f26e18]"></span>
                                    The Weekend Reset
                                </span>
                                <div className={`size-10 rounded-full border border-brand-orange flex items-center justify-center transition-all duration-300 ${isWeekendOpen ? 'bg-brand-orange rotate-180' : 'bg-transparent text-brand-orange'}`}>
                                    <span className={`material-symbols-outlined text-2xl ${isWeekendOpen ? 'text-black' : 'text-brand-orange'}`}>expand_more</span>
                                </div>
                            </button>
                            <div className={`transition-all duration-500 ease-in-out ${isWeekendOpen ? 'max-h-[500px] opacity-100 p-8 pt-0' : 'max-h-0 opacity-0'}`}>
                                <div className="h-px bg-gradient-to-r from-brand-orange/50 to-transparent mb-8"></div>
                                <div className="bg-black/40 p-6 rounded-xl border border-white/5">
                                    <p className="text-lg md:text-xl font-black text-white tracking-wide mb-3 leading-tight">
                                        1.5-hour deep-dive | Saturday & Sunday | 2 trainers
                                    </p>
                                    <p className="text-sm md:text-base text-white/80 font-bold leading-relaxed">
                                        A high-energy group environment designed to level up your skills.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* EXPERIENCE THE LAB Container */}
                        <div className="mt-8">
                            <div
                                onClick={() => setIsBookingModalOpen(true)}
                                className="bg-brand-orange/5 border-[4px] border-brand-orange rounded-[3rem] p-8 md:p-12 text-center transition-all hover:bg-brand-orange/10 group shadow-2xl shadow-brand-orange/10 cursor-pointer"
                            >
                                <h3 className="text-sm md:text-4xl font-black text-white mb-6 underline decoration-brand-orange underline-offset-12">
                                    Experience the Lab – On Us.
                                </h3>
                                <p className="text-sm md:text-2xl text-white font-bold leading-relaxed max-w-3xl mx-auto px-4">
                                    Book your <span className="text-brand-orange uppercase tracking-wider">Free Demo Session</span> today to feel the energy of our space. If you decide to join the movement, we'll fold the session into your package. If not, it's completely free with no strings attached.
                                </p>

                            </div>
                        </div>
                    </div>
                </section>

                {/* TRAINERS & TIMINGS BROCHURE */}
                <section className="pt-0 pb-4 bg-black relative overflow-hidden" id="info">
                    <div className="w-full md:w-[85%] mx-auto relative z-10 transition-all">
                        <div className="shadow-[0_0_50px_rgba(242,110,24,0.15)] md:rounded-2xl overflow-hidden border-y-2 md:border-2 border-brand-orange/30">
                            <img
                                src="/images/cali_trainers_brochure.jpg"
                                alt="Cali Lab Trainers and Timings"
                                className="w-full h-auto scale-[1.01] origin-top-left"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </section>

                <section className="pt-8 pb-24 px-6 md:px-20 bg-black relative overflow-hidden border-t border-white/5">
                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                                What You're <br /> <span className="text-brand-orange">Going To Get</span>
                            </h2>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* TRAINING PROGRAMS dropdown */}
                            <div className="group/accordion border-l-4 border-brand-orange bg-white/5 backdrop-blur-md rounded-r-2xl transition-all duration-300 hover:bg-white/10 overflow-hidden shadow-2xl">
                                <button
                                    onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                                    className="w-full flex items-center justify-between px-8 py-6 text-left group"
                                >
                                    <span className="text-lg md:text-xl font-black text-white tracking-widest uppercase flex items-center gap-4">
                                        <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_#f26e18]"></span>
                                        Training Programs Include
                                    </span>
                                    <div className={`size-10 rounded-full border border-brand-orange flex items-center justify-center transition-all duration-300 ${isProgramsOpen ? 'bg-brand-orange rotate-180' : 'bg-transparent text-brand-orange'}`}>
                                        <span className={`material-symbols-outlined text-2xl ${isProgramsOpen ? 'text-black' : 'text-brand-orange'}`}>expand_more</span>
                                    </div>
                                </button>
                                <div className={`transition-all duration-500 ease-in-out ${isProgramsOpen ? 'max-h-[1000px] opacity-100 p-8 pt-0' : 'max-h-0 opacity-0'}`}>
                                    <div className="h-px bg-gradient-to-r from-brand-orange/50 to-transparent mb-8"></div>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            "Strength & Conditioning",
                                            "Calisthenics Fundamentals",
                                            "Weight Loss & Fat Burning",
                                            "Handstands & Balance Training",
                                            "Core & Mobility Development",
                                            "Advanced Skill Progressions"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-4 group">
                                                <span className="w-2 h-2 bg-brand-orange rounded-full group-hover:scale-150 transition-transform shadow-[0_0_8px_#f26e18]"></span>
                                                <span className="text-base md:text-lg text-white font-bold tracking-wide">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* WHY CHOOSE CALI dropdown */}
                            <div className="group/accordion border-l-4 border-brand-orange bg-white/5 backdrop-blur-md rounded-r-2xl transition-all duration-300 hover:bg-white/10 overflow-hidden shadow-2xl">
                                <button
                                    onClick={() => setIsWhyUsOpen(!isWhyUsOpen)}
                                    className="w-full flex items-center justify-between px-8 py-6 text-left group"
                                >
                                    <span className="text-lg md:text-xl font-black text-white tracking-widest uppercase flex items-center gap-4">
                                        <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse shadow-[0_0_10px_#f26e18]"></span>
                                        Why Choose Cali?
                                    </span>
                                    <div className={`size-10 rounded-full border border-brand-orange flex items-center justify-center transition-all duration-300 ${isWhyUsOpen ? 'bg-brand-orange rotate-180' : 'bg-transparent text-brand-orange'}`}>
                                        <span className={`material-symbols-outlined text-2xl ${isWhyUsOpen ? 'text-black' : 'text-brand-orange'}`}>expand_more</span>
                                    </div>
                                </button>
                                <div className={`transition-all duration-500 ease-in-out ${isWhyUsOpen ? 'max-h-[1000px] opacity-100 p-8 pt-0' : 'max-h-0 opacity-0'}`}>
                                    <div className="h-px bg-gradient-to-r from-brand-orange/50 to-transparent mb-8"></div>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            "Expert trainers",
                                            "Small batch focus",
                                            "Result-driven programming",
                                            "Beginner-friendly progressions",
                                            "Motivating training environment"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-4 group">
                                                <span className="w-2 h-2 bg-brand-orange rounded-full group-hover:scale-150 transition-transform shadow-[0_0_8px_#f26e18]"></span>
                                                <span className="text-base md:text-lg text-white font-bold tracking-wide">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pt-4 pb-12 bg-black overflow-hidden relative border-t border-white/5">
                    <div className="max-w-7xl mx-auto text-center mb-16 px-6">
                        <span className="text-brand-orange font-bold uppercase tracking-widest text-[10px] mb-2 block">Athlete Testimonials</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Voices of <span className="text-brand-orange">The Lab</span></h2>
                    </div>

                    <div className="relative group px-6 md:px-20">
                        {/* Navigation Buttons */}
                        <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 hidden md:block">
                            <button
                                onClick={() => scroll('left')}
                                className="p-4 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-white hover:text-brand-orange hover:border-brand-orange transition-all hover:scale-110 active:scale-90"
                                aria-label="Previous Review"
                            >
                                <span className="material-symbols-outlined text-3xl">chevron_left</span>
                            </button>
                        </div>
                        <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-20 hidden md:block">
                            <button
                                onClick={() => scroll('right')}
                                className="p-4 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-white hover:text-brand-orange hover:border-brand-orange transition-all hover:scale-110 active:scale-90"
                                aria-label="Next Review"
                            >
                                <span className="material-symbols-outlined text-3xl">chevron_right</span>
                            </button>
                        </div>

                        {/* Manual Scroll Container */}
                        <div
                            ref={scrollRef}
                            onClick={() => setIsPaused(!isPaused)}
                            className="py-12 flex gap-8 overflow-x-auto custom-scrollbar-hide cursor-pointer"
                        >
                            {[...reviews, ...reviews, ...reviews].map((review, i) => (
                                <div key={i} className="w-[320px] md:w-[450px] bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-[2.5rem] shrink-0 hover:border-brand-orange/50 transition-all duration-500 relative group/card overflow-hidden shadow-2xl">
                                    <span className="material-symbols-outlined absolute top-4 right-6 text-6xl text-brand-orange/5 select-none translate-y-2 group-hover/card:translate-y-0 transition-transform">format_quote</span>
                                    <div className="flex flex-col gap-4 md:gap-6 relative z-10">
                                        <p className="text-white/80 font-medium italic leading-relaxed whitespace-normal text-xs md:text-sm line-clamp-4 group-hover/card:line-clamp-none transition-all duration-500">"{review.text}"</p>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={review.img}
                                                alt={review.name}
                                                className="size-10 md:size-12 rounded-full object-cover grayscale group-hover/card:grayscale-0 transition-all border border-white/10"
                                                loading="lazy"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=f26e18&color=fff&bold=true`;
                                                }}
                                            />
                                            <div>
                                                <h4 className="text-white font-black uppercase text-[10px] md:text-xs tracking-widest">{review.name}</h4>
                                                <div className="flex gap-1 mt-1">
                                                    {[...Array(review.stars)].map((_, j) => (
                                                        <span key={j} className="material-symbols-outlined text-[8px] md:text-[10px] text-brand-orange fill-1">star</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-12 px-6 md:px-20 bg-background-light dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-primary font-bold uppercase tracking-widest text-sm">Community First</span>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight mt-2 uppercase">WE ARE MORE THAN A TRAINING SPACE</h2>
                        </div>
                        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-orange/10 hover:border-brand-orange/30 transition-all duration-700">
                            <img
                                src={communityStory}
                                alt="Cali Lab Community"
                                className="w-full h-auto grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-1000"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </section>
            </div>

            {/* BOOKING MODAL */}
            {
                isBookingModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                            onClick={() => setIsBookingModalOpen(false)}
                        ></div>

                        {/* Modal Content */}
                        <div className="relative w-[95vw] max-w-lg max-h-[90vh] bg-zinc-900/95 border border-brand-orange/30 p-6 md:p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-y-auto custom-scrollbar">
                            <button
                                onClick={() => setIsBookingModalOpen(false)}
                                className="absolute top-6 right-8 text-white/50 hover:text-brand-orange transition-colors"
                            >
                                <span className="material-symbols-outlined text-3xl">close</span>
                            </button>

                            {!isSubmitted ? (
                                <>
                                    <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tight mb-2 uppercase">Join the Lab</h2>
                                    <p className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-8">Few slots avaiable - reserve your spot now</p>

                                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                                        {/* NAME INPUT */}
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                required
                                                placeholder=" "
                                                className={`peer w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-brand-orange'} rounded-2xl px-6 py-5 text-white outline-none transition-all placeholder-transparent`}
                                                value={formData.name}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, name: e.target.value });
                                                    if (errors.name) setErrors({ ...errors, name: '' });
                                                }}
                                            />
                                            <label className={`absolute left-6 transition-all pointer-events-none uppercase font-black tracking-[0.2em] text-[10px] 
                                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/30
                                            peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-zinc-900 peer-focus:px-2 peer-focus:text-brand-orange
                                            ${formData.name ? '-top-2 left-4 bg-zinc-900 px-2 text-brand-orange' : ''}`}>
                                                Full Name
                                            </label>
                                            {errors.name && <p className="text-[10px] text-red-500 mt-1 ml-4 uppercase font-bold">{errors.name}</p>}
                                        </div>

                                        {/* EMAIL INPUT */}
                                        <div className="relative group">
                                            <input
                                                type="email"
                                                required
                                                placeholder=" "
                                                className={`peer w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-brand-orange'} rounded-2xl px-6 py-5 text-white outline-none transition-all placeholder-transparent`}
                                                value={formData.email}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, email: e.target.value });
                                                    if (errors.email) setErrors({ ...errors, email: '' });
                                                }}
                                            />
                                            <label className={`absolute left-6 transition-all pointer-events-none uppercase font-black tracking-[0.2em] text-[10px] 
                                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/30
                                            peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-zinc-900 peer-focus:px-2 peer-focus:text-brand-orange
                                            ${formData.email ? '-top-2 left-4 bg-zinc-900 px-2 text-brand-orange' : ''}`}>
                                                Email Address
                                            </label>
                                            {errors.email && <p className="text-[10px] text-red-500 mt-1 ml-4 uppercase font-bold">{errors.email}</p>}
                                        </div>

                                        {/* PHONE INPUT */}
                                        <div className="relative group">
                                            <input
                                                type="tel"
                                                required
                                                placeholder=" "
                                                className={`peer w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10 focus:border-brand-orange'} rounded-2xl px-6 py-5 text-white outline-none transition-all placeholder-transparent`}
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, phone: e.target.value });
                                                    if (errors.phone) setErrors({ ...errors, phone: '' });
                                                }}
                                            />
                                            <label className={`absolute left-6 transition-all pointer-events-none uppercase font-black tracking-[0.2em] text-[10px] 
                                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white/30
                                            peer-focus:-top-2 peer-focus:left-4 peer-focus:bg-zinc-900 peer-focus:px-2 peer-focus:text-brand-orange
                                            ${formData.phone ? '-top-2 left-4 bg-zinc-900 px-2 text-brand-orange' : ''}`}>
                                                Phone Number
                                            </label>
                                            {errors.phone && <p className="text-[10px] text-red-500 mt-1 ml-4 uppercase font-bold">{errors.phone}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* BATCH DROPDOWN */}
                                            <div className="space-y-2 relative">
                                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-4">Preferred Batch</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveDropdown(activeDropdown === 'batch' ? null : 'batch')}
                                                    className={`w-full bg-white/5 border ${errors.batch ? 'border-red-500' : (activeDropdown === 'batch' ? 'border-brand-orange shadow-[0_0_15px_rgba(242,110,24,0.2)]' : 'border-white/10')} rounded-2xl px-6 py-4 flex justify-between items-center transition-all group`}
                                                >
                                                    <span className={`font-black text-xs uppercase tracking-tighter ${formData.batch ? 'text-white' : 'text-white/30'}`}>
                                                        {formData.batch || 'Select Preferred Batch'}
                                                    </span>
                                                    <span className={`material-symbols-outlined transition-transform duration-300 ${activeDropdown === 'batch' ? 'rotate-180 text-brand-orange' : 'text-white/30'}`}>expand_more</span>
                                                </button>

                                                {errors.batch && <p className="text-[10px] text-red-500 mt-1 ml-4 uppercase font-bold">{errors.batch}</p>}

                                                {activeDropdown === 'batch' && (
                                                    <>
                                                        <div className="fixed inset-0 z-[105]" onClick={() => setActiveDropdown(null)}></div>
                                                        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-zinc-900/95 border border-brand-orange/30 rounded-2xl overflow-hidden z-[110] backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                            {Object.keys(PRICING_TIERS).map(batch => (
                                                                <div
                                                                    key={batch}
                                                                    onClick={() => {
                                                                        setFormData({
                                                                            ...formData,
                                                                            batch: batch as keyof typeof PRICING_TIERS,
                                                                            duration: '',
                                                                            timing: ''
                                                                        });
                                                                        setActiveDropdown(null);
                                                                        if (errors.batch) setErrors({ ...errors, batch: '', duration: '', timing: '' });
                                                                    }}
                                                                    className={`px-6 py-4 hover:bg-brand-orange hover:text-black transition-all cursor-pointer font-black text-xs uppercase tracking-widest ${formData.batch === batch ? 'text-brand-orange bg-white/5' : 'text-white/70'}`}
                                                                >
                                                                    {batch}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {/* DURATION DROPDOWN */}
                                            <div className="space-y-2 relative">
                                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-4">Training Period</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveDropdown(activeDropdown === 'duration' ? null : 'duration')}
                                                    className={`w-full bg-white/5 border ${errors.duration ? 'border-red-500' : (activeDropdown === 'duration' ? 'border-brand-orange shadow-[0_0_15px_rgba(242,110,24,0.2)]' : 'border-white/10')} rounded-2xl px-6 py-4 flex justify-between items-center transition-all group`}
                                                >
                                                    <span className={`font-black text-xs uppercase tracking-tighter ${formData.duration ? 'text-white' : 'text-white/30'}`}>
                                                        {formData.duration || 'Select Duration'}
                                                    </span>
                                                    <span className={`material-symbols-outlined transition-transform duration-300 ${activeDropdown === 'duration' ? 'rotate-180 text-brand-orange' : 'text-white/30'}`}>expand_more</span>
                                                </button>

                                                {errors.duration && <p className="text-[10px] text-red-500 mt-1 ml-4 uppercase font-bold">{errors.duration}</p>}

                                                {activeDropdown === 'duration' && formData.batch && (
                                                    <>
                                                        <div className="fixed inset-0 z-[105]" onClick={() => setActiveDropdown(null)}></div>
                                                        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-zinc-900/95 border border-brand-orange/30 rounded-2xl overflow-hidden z-[110] backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                            {Object.keys(PRICING_TIERS[formData.batch as keyof typeof PRICING_TIERS]).map(period => (
                                                                <div
                                                                    key={period}
                                                                    onClick={() => {
                                                                        setFormData({ ...formData, duration: period, timing: '' });
                                                                        setActiveDropdown(null);
                                                                        if (errors.duration) setErrors({ ...errors, duration: '', timing: '' });
                                                                    }}
                                                                    className={`px-6 py-4 hover:bg-brand-orange hover:text-black transition-all cursor-pointer font-black text-xs uppercase tracking-widest ${formData.duration === period ? 'text-brand-orange bg-white/5' : 'text-white/70'}`}
                                                                >
                                                                    {period}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* TIMING DROPDOWN (Conditional) */}
                                        {formData.batch && formData.batch !== 'Personal Training' && (
                                            <div className="space-y-2 relative">
                                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-4">Available Timings</label>
                                                <button
                                                    type="button"
                                                    disabled={!formData.batch}
                                                    onClick={() => setActiveDropdown(activeDropdown === 'timing' ? null : 'timing')}
                                                    className={`w-full bg-white/5 border ${errors.timing ? 'border-red-500' : (activeDropdown === 'timing' ? 'border-brand-orange shadow-[0_0_15px_rgba(242,110,24,0.2)]' : 'border-white/10')} rounded-2xl px-6 py-4 flex justify-between items-center transition-all group ${!formData.batch ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                >
                                                    <span className={`font-black text-xs uppercase tracking-tighter ${formData.timing ? 'text-white' : 'text-white/30'}`}>
                                                        {formData.timing || 'Select Time Slot'}
                                                    </span>
                                                    <span className={`material-symbols-outlined transition-transform duration-300 ${activeDropdown === 'timing' ? 'rotate-180 text-brand-orange' : 'text-white/30'}`}>expand_more</span>
                                                </button>

                                                {errors.timing && <p className="text-[10px] text-red-500 mt-1 ml-4 uppercase font-bold">{errors.timing}</p>}

                                                {activeDropdown === 'timing' && (
                                                    <>
                                                        <div className="fixed inset-0 z-[105]" onClick={() => setActiveDropdown(null)}></div>
                                                        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-zinc-900/95 border border-brand-orange/30 rounded-2xl overflow-hidden z-[110] backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-[250px] overflow-y-auto custom-scrollbar">
                                                            {formData.batch === 'Weekend' ? (
                                                                BATCH_TIMINGS['Weekend'].map((time: string) => (
                                                                    <div
                                                                        key={time}
                                                                        onClick={() => {
                                                                            setFormData({ ...formData, timing: time });
                                                                            setActiveDropdown(null);
                                                                            if (errors.timing) setErrors({ ...errors, timing: '' });
                                                                        }}
                                                                        className={`px-6 py-4 hover:bg-brand-orange hover:text-black transition-all cursor-pointer font-black text-xs uppercase tracking-widest ${formData.timing === time ? 'text-brand-orange bg-white/5' : 'text-white/70'}`}
                                                                    >
                                                                        {time}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                ['Morning', 'Evening'].map(session => (
                                                                    <div key={session}>
                                                                        <div className="px-6 py-2 bg-white/5 text-[10px] font-black text-white/30 uppercase tracking-widest">{session} Batches</div>
                                                                        {BATCH_TIMINGS[formData.batch][session].map((time: string) => (
                                                                            <div
                                                                                key={time}
                                                                                onClick={() => {
                                                                                    setFormData({ ...formData, timing: `(${session}) ${time}` });
                                                                                    setActiveDropdown(null);
                                                                                    if (errors.timing) setErrors({ ...errors, timing: '' });
                                                                                }}
                                                                                className={`px-6 py-4 hover:bg-brand-orange hover:text-black transition-all cursor-pointer font-black text-xs uppercase tracking-widest ${formData.timing === `(${session}) ${time}` ? 'text-brand-orange bg-white/5' : 'text-white/70'}`}
                                                                            >
                                                                                {time}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}

                                        {/* Dynamic Price Display */}
                                        <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-2xl p-4 flex items-center justify-between group overflow-hidden relative">
                                            <div className="relative z-10">
                                                <p className="text-[10px] font-black text-brand-orange uppercase tracking-widest">Energy Exchange</p>
                                                <p className="text-2xl font-black text-white italic">
                                                    {(formData.batch && formData.duration) ? (PRICING_TIERS as any)[formData.batch][formData.duration] : 'Select Options'}
                                                </p>
                                            </div>
                                            <div className="text-right relative z-10">
                                                <span className="text-[10px] font-bold text-white/40 block">Subject to terms</span>
                                                {formData.batch === 'Personal Training' ? (
                                                    <span className="text-xs font-black text-brand-orange uppercase animate-pulse">Request Details Below</span>
                                                ) : (
                                                    <span className="text-xs font-black text-white/60 uppercase">Selected Plan</span>
                                                )}
                                            </div>
                                            <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-brand-orange/5 to-transparent skew-x-12 translate-x-1/2 transition-transform group-hover:translate-x-1/3"></div>
                                        </div>

                                        {formData.duration === '1 Day' && (
                                            <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <span className="material-symbols-outlined text-brand-orange text-lg">info</span>
                                                <p className="text-[10px] font-black text-white/50 uppercase leading-relaxed tracking-[0.1em]">
                                                    <span className="text-brand-orange">Professional Continuity:</span> This trial investment can be fully credited toward your membership if you decide to upgrade your training plan.
                                                </p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="w-full bg-brand-orange text-black font-black py-5 rounded-2xl uppercase tracking-[0.3em] text-lg mt-8 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-orange/20"
                                        >
                                            Send Details
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                                    <div className="relative size-24 mx-auto">
                                        <div className="absolute inset-0 bg-brand-orange rounded-full animate-ping opacity-20"></div>
                                        <div className="relative size-full bg-brand-orange rounded-full flex items-center justify-center shadow-glow shadow-brand-orange/40">
                                            <span className="material-symbols-outlined text-black text-5xl font-bold animate-pulse">chat</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Redirecting...</h2>
                                        <p className="text-brand-orange font-bold uppercase tracking-widest text-[10px]">Moving to WhatsApp to finalize your booking</p>
                                    </div>
                                    <p className="text-white/40 text-xs font-medium max-w-[200px] mx-auto leading-relaxed">
                                        If the chat doesn't open automatically, please check your browser pop-up settings.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    );
}
