import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Faq } from '../data/faqs';

/** FAQ accordion. Answers stay in the HTML while collapsed, so crawlers can read them. */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
    const [open, setOpen] = useState<number | null>(null);
    return (
        <div className="flex flex-col gap-3">
            {faqs.map((item, i) => (
                <div key={item.q} className={`glass rounded-2xl transition-colors ${open === i ? 'edge-ember' : 'hover:bg-white/[0.04]'}`}>
                    <button
                        onClick={() => setOpen(open === i ? null : i)}
                        aria-expanded={open === i}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                        <h3 className="text-white font-semibold text-sm md:text-base uppercase tracking-wide">{item.q}</h3>
                        <Plus size={20} className={`text-brand-orange shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`} />
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                            <p className="text-white/70 font-light text-sm md:text-base leading-relaxed px-6 pb-5">{item.a}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
