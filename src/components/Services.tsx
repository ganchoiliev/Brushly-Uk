import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { AnimatedText } from './ui/animated-text';
import { SequencePlayer } from './ui/sequence-player';

const SERVICES = [
    {
        id: "interior",
        title: "Interior Painting",
        description: "Clean, modern finishes for walls, ceilings, woodwork, and feature areas — transforming your home with precision and care.",
        extended: {
            title: "Premium Interior Decorating & Painting",
            paragraphs: [
                "At Brushly, our interior decorating services go beyond mere painting; we craft environments that enrich your daily life. We understand that your home is your sanctuary, which is why our approach combines meticulous preparation with the finest materials available.",
                "Every project begins with a comprehensive consultation to understand your vision. We assist with color selection, recommending premium brands that offer depth, durability, and the perfect finish for each specific room's function.",
                "Our preparation process is rigorous: we carefully protect all furnishings and flooring, repair any surface imperfections, and ensure a flawless canvas before a single drop of paint is applied. The result is sharp lines, smooth walls, and a durable finish that breathes new life into your space."
            ],
            features: [
                "Expert color consultation and design advice",
                "Use of premium, low-VOC paints for a healthier home",
                "Meticulous surface preparation and repair",
                "Flawless execution of complex feature walls and woodwork",
                "Complete cleanup and restoration of your space"
            ]
        }
    },
    {
        id: "exterior",
        title: "Exterior Painting",
        description: "Durable, weather-resistant finishes that protect and refresh your property's exterior while enhancing kerb appeal.",
        extended: {
            title: "Transform Your Property’s Curb Appeal with Premium Exterior Painting",
            paragraphs: [
                "First impressions matter. Our professional exterior painting services are designed to breathe new life into your property while providing essential protection against the unpredictable British weather. Whether you are looking to refresh faded masonry, restore intricate exterior woodwork, or completely modernize your home's facade, our expert decorators deliver a flawless, high-end finish that immediately enhances your property’s curb appeal and lasting value.",
                "Uncompromising Protection Against the Elements: Exterior decorating is about more than just striking aesthetics; it is your home’s first line of defense. We exclusively use industry-leading, weather-resistant masonry paints and specialized resin coatings formulated to withstand heavy rain, frost, and UV exposure. Our meticulous preparation is the secret to our longevity. From thorough power washing and algae removal to repairing rendering and filling structural cracks, we ensure an immaculate canvas before a single drop of paint is applied.",
                "Comprehensive Exterior Enhancements: We don't just paint walls. Our comprehensive exterior service covers all architectural details, including wooden window frames, front doors, fascias, soffits, and metal guttering. By applying tailored primers and microporous topcoats to woodwork, we allow your property to breathe while preventing rot and peeling. Invest in lasting beauty and structural defense with an exterior finish that stands the test of time."
            ],
            features: [
                "Flawless, high-end finish that enhances curb appeal and value",
                "Use of industry-leading, weather-resistant masonry paints and resin coatings",
                "Thorough preparation including power washing, algae removal, and rendering repair",
                "Comprehensive painting of wooden frames, doors, fascias, soffits, and guttering",
                "Application of tailored primers and microporous topcoats to prevent rot"
            ]
        }
    },
    {
        id: "wallpaper",
        title: "Wallpaper Hanging",
        description: "Professional wallpaper installation with flawless alignment, clean edges, and premium finishes for feature walls and full rooms.",
        extended: {
            title: "Transform Your Space with Luxury Wallcoverings",
            paragraphs: [
                "Wallpaper is the ultimate expression of personal style, capable of instantly elevating a room from ordinary to extraordinary. Our professional wallpaper hanging service specializes in the flawless installation of premium, designer, and bespoke wallcoverings. Whether you are creating a striking feature wall or wrapping an entire room in rich texture, our master decorators deliver a beautiful, seamless finish that transforms your interior vision into a reality.",
                "Flawless Precision and Intricate Pattern Matching: Hanging high-end wallpaper is an exacting craft that requires a meticulous eye and steady hand. We have extensive experience working with delicate materials, including silk, grasscloth, metallic foils, and wide-vinyl commercial coverings. Our expertise ensures perfect, invisible seams, absolute plumb lines, and flawless pattern matching, no matter how complex the design. We handle expensive materials with the utmost care, guaranteeing a finish that honors the quality of the paper itself.",
                "Comprehensive Preparation for a Perfect Canvas: The secret to breathtaking wallpaper lies beneath the surface. We never cut corners on preparation. Our comprehensive process includes stripping old paper, repairing plaster imperfections, sanding, sizing, and cross-lining where necessary. By creating an immaculately smooth and properly primed canvas, we ensure optimal adhesion and prevent future peeling or shrinkage. Trust our experts to provide a refined, lasting installation that completely redefines your living space."
            ],
            features: [
                "Flawless installation of premium, designer, and bespoke wallcoverings",
                "Expert handling of delicate materials like silk, grasscloth, and metallic foils",
                "Perfect pattern matching, invisible seams, and absolute plumb lines",
                "Comprehensive preparation including stripping, repairing, and cross-lining",
                "Immaculately smooth and primed canvas for optimal adhesion and longevity"
            ]
        }
    },
    {
        id: "refurbishment",
        title: "Refurbishment",
        description: "Complete property refresh solutions including preparation, repairs, decorating, and finishing — transforming spaces inside and out.",
        extended: {
            title: "Complete Property Refurbishment & Transformation",
            paragraphs: [
                "A true property refresh requires more than just a new coat of paint—it demands a holistic approach to restoration and design. Our complete refurbishment solutions breathe new life into your property, seamlessly transforming spaces inside and out. From revitalizing tired interiors to modernizing dated exteriors, our team manages every phase of the decorating process. We deliver an end-to-end service that elevates your home's aesthetic, enhances its market value, and creates a living environment tailored to your exact standards.",
                "Meticulous Preparation and Structural Repairs: Flawless finishing is impossible without exceptional groundwork. We excel in the critical stages of preparation and repair that lesser contractors overlook. Our comprehensive service includes rectifying structural blemishes, repairing damaged plaster, filling deep cracks, and treating underlying issues like dampness or woodwork degradation. By resolving these fundamental challenges before decorating begins, we guarantee a pristine, durable canvas ready for high-end application.",
                "Seamless Execution and Unrivaled Finishing: Managing a property refresh can be disruptive, which is why we prioritize seamless execution and immaculate project management. Our expert decorators work with unparalleled precision and respect for your property, ensuring minimal intrusion into your daily life. We bring together premium materials, advanced application techniques, and an unwavering eye for detail to provide a flawless final finish. Experience a comprehensive transformation where every corner, cornice, and exterior facade is finished to absolute perfection."
            ],
            features: [
                "End-to-end service for property refurbishment inside and out",
                "Comprehensive rectifying of structural blemishes, plaster damage, and cracks",
                "Treatment of underlying issues such as dampness and woodwork degradation",
                "Immaculate project management to ensure minimal intrusion",
                "Use of premium materials and advanced application techniques for flawless finishing"
            ]
        }
    }
];

export default function Services() {
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedServiceId) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedServiceId]);

    const activeService = SERVICES.find(s => s.id === selectedServiceId);

    return (
        <section id="services" className="py-24 bg-brand-navy relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Section Header */}
                <div className="mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-brand-gold uppercase tracking-[0.2em] text-sm font-semibold mb-4"
                    >
                        What We Offer
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <AnimatedText
                            text="We Bring Your Vision to Life"
                            className="text-4xl md:text-5xl font-serif text-white gap-x-3 gap-y-2"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <AnimatedText
                            text="At Brushly, we deliver high-quality painting and decorating services for homes and businesses. From preparation to final finish, every detail is handled with care, precision, and professionalism ensuring results that last."
                            className="text-slate-400 text-lg max-w-2xl leading-relaxed gap-x-2 gap-y-1"
                        />
                    </motion.div>
                </div>

                {/* Individual Service Blocks */}
                <div className="flex flex-col gap-32">
                    {SERVICES.map((service, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="relative w-full min-h-[500px] lg:min-h-[800px] rounded-[2rem] overflow-hidden border border-white/5 bg-brand-surface group flex items-center p-8 md:p-16 lg:p-24"
                            >

                                {/* Background Layer */}
                                <div className="absolute inset-0 z-0 pointer-events-none">
                                    <SequencePlayer
                                        folderPath={`/sequences/${service.id}`}
                                        frameCount={service.id === 'exterior' ? 528 : service.id === 'wallpaper' ? 696 : 192}
                                        padLength={5}
                                        fps={30}
                                        pingPong={true}
                                        objectFit="cover-scroll-pan"
                                        className="opacity-50 group-hover:opacity-80 transition-opacity duration-700 mix-blend-screen"
                                    />
                                    {/* Overlay Gradient for Text Readability */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-transparent z-10" />
                                </div>

                                {/* Text Overlay */}
                                <div
                                    className="relative z-20 w-full max-w-2xl cursor-pointer"
                                    onClick={() => setSelectedServiceId(service.id)}
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <h3 className="text-3xl md:text-5xl font-serif text-white group-hover:text-brand-gold transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <p className="text-slate-300 md:text-slate-400 text-lg md:text-xl leading-relaxed mb-8 max-w-xl group-hover:text-white transition-colors duration-500 delay-100">
                                        {service.description}
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-brand-gold/80 group-hover:text-brand-gold transition-colors">
                                        Read more
                                        <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                    <div className="h-[1px] w-0 bg-brand-gold group-hover:w-32 transition-all duration-500 mt-2" />
                                </div>

                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Read More Modal */}
            <AnimatePresence>
                {activeService && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedServiceId(null)}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
                        />

                        {/* Modal Container */}
                        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-6 lg:p-12 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                                className="w-full max-w-4xl bg-brand-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]"
                            >
                                {/* Modal Header */}
                                <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/10 bg-brand-navy/50 shrink-0">
                                    <h3 className="text-2xl md:text-3xl font-serif text-white">
                                        {activeService.extended.title}
                                    </h3>
                                    <button
                                        onClick={() => setSelectedServiceId(null)}
                                        className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="p-6 md:p-8 overflow-y-auto">
                                    <div className="space-y-6 md:space-y-8">
                                        <div className="text-slate-300 md:text-lg leading-relaxed space-y-4">
                                            {activeService.extended.paragraphs.map((p, idx) => (
                                                <p key={idx}>{p}</p>
                                            ))}
                                        </div>

                                        <div className="bg-brand-navy/30 rounded-2xl p-6 border border-white/5">
                                            <h4 className="text-brand-gold text-lg font-semibold mb-4 tracking-wide uppercase">Key Features</h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {activeService.extended.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                                                        <span className="text-brand-gold mt-1">✦</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-10 flex justify-end">
                                        <button
                                            onClick={() => setSelectedServiceId(null)}
                                            className="px-8 py-3 bg-brand-gold text-brand-navy font-bold tracking-wider hover:bg-white transition-colors rounded-full uppercase text-sm"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
