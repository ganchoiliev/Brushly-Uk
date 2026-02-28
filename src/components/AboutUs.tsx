import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Shield, Sparkles, UserCheck, Clock, CheckCircle } from 'lucide-react';
import { SequencePlayer } from './ui/sequence-player';

const FEATURES = [
    {
        title: "Uncompromising Standards",
        description: "Every corner, every edge, every surface is scrutinized. We don't just paint; we perfect. Our multi-stage preparation process ensures a flawless canvas before a single drop of paint is applied.",
        icon: Shield,
        sequencePath: "/sequences/standards-loop",
        frameCount: 192,
        pingPong: true
    },
    {
        title: "Absolute Respect",
        description: "Your home is your sanctuary. We employ advanced dustless sanding technology and meticulous masking to ensure your furniture, floors, and air remain pristine throughout the project.",
        icon: UserCheck,
        sequencePath: "/sequences/respect-loop",
        frameCount: 192,
        pingPong: true
    },
    {
        title: "Premium Materials",
        description: "We work exclusively with high-end, luxury paint brands like Farrow & Ball, Little Greene, and Paint & Paper Library to deliver a depth of color and durability that standard paints simply cannot match.",
        icon: Sparkles,
        sequencePath: "/sequences/matirials-loop",
        frameCount: 192,
        pingPong: true
    },
    {
        title: "Flawless Delivery",
        description: "We respect your time as much as your property. Our scheduling is precise, our communication is transparent, and our handover is immaculate. A Brushly finish is always delivered on time.",
        icon: Clock,
        sequencePath: "/sequences/keys",
        frameCount: 192,
        pingPong: true
    }
];

function FeatureCard({ feature, index }: { key?: React.Key, feature: typeof FEATURES[0], index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["0 1.2", "1 1"]
    });

    const springProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

    // Parallax effect on the card itself
    const y = useTransform(springProgress, [0, 1], [150, 0]);
    const opacity = useTransform(springProgress, [0, 1], [0, 1]);
    const scale = useTransform(springProgress, [0, 1], [0.95, 1]);

    return (
        <motion.div
            ref={cardRef}
            tabIndex={0}
            style={prefersReducedMotion ? {} : { y, opacity, scale }}
            className="bg-brand-navy/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden group shadow-2xl cursor-pointer touch-manipulation focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
        >
            {/* Ambient Background Media */}
            {feature.sequencePath ? (
                <div className="absolute inset-0 z-0 opacity-60 md:opacity-75 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity duration-[1.5s] overflow-hidden mix-blend-lighten pointer-events-none">
                    <motion.div
                        className="w-full h-full relative scale-110"
                        style={{ y: useTransform(springProgress, [0, 1], [-20, 20]) }}
                    >
                        <SequencePlayer
                            folderPath={feature.sequencePath}
                            frameCount={feature.frameCount!}
                            fps={30}
                            pingPong={feature.pingPong}
                            objectFit="cover"
                        />
                    </motion.div>
                    {/* Dark gradient overlays to ensure text remains perfectly readable */}
                    <div className="absolute inset-0 bg-brand-navy/60 transition-opacity duration-1000 group-hover:opacity-30 group-active:opacity-30 group-focus:opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/70 to-transparent" />
                </div>
            ) : (
                <>
                    {/* Subtle interactive hover gradient for cards without sequences */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </>
            )}

            <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-brand-surface border border-white/5 flex items-center justify-center mb-8 group-hover:border-brand-gold/50 group-active:border-brand-gold/50 group-focus:border-brand-gold/50 transition-colors duration-500 shadow-lg group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] group-active:shadow-[0_0_30px_rgba(212,175,55,0.2)] group-focus:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    <feature.icon className="text-brand-gold w-8 h-8 group-hover:scale-110 group-active:scale-110 group-focus:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                </div>

                <h3 className="text-2xl lg:text-3xl font-serif text-white mb-4 group-hover:text-brand-gold group-active:text-brand-gold group-focus:text-brand-gold transition-colors duration-500">
                    {feature.title}
                </h3>

                <p className="text-slate-400 font-light leading-relaxed text-lg tracking-wide">
                    {feature.description}
                </p>
            </div>

            {/* Subtle Edge Highlight */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Accent Line Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-gold/0 via-brand-gold/50 to-brand-gold/0 opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 transition-opacity duration-700" />
        </motion.div>
    );
}

export default function AboutUs() {
    return (
        <section className="relative w-full bg-brand-surface py-24 md:py-40 overflow-hidden" id="about">
            {/* Subtle gradient separator at the top */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

            {/* Soft background glow */}
            <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none -z-0 mix-blend-screen" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">

                    {/* Left Sticky Content */}
                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-16rem)] flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="h-[1px] w-16 bg-brand-gold" />
                                    <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-semibold">About Us</span>
                                </div>

                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-8 tracking-wide">
                                    The Brushly <br />
                                    <span className="text-brand-gold italic font-light">Difference</span>
                                </h2>

                                <p className="text-slate-400 text-lg leading-relaxed max-w-md font-light tracking-wide mb-12">
                                    We are not just painters; we are artisans dedicated to elevating the aesthetic of your home. Discover the uncompromising standards that set Brushly apart in London and Surrey.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="text-brand-gold w-5 h-5 flex-shrink-0" />
                                        <span className="text-white/80 font-light tracking-wide">Fully Insured & Certified</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="text-brand-gold w-5 h-5 flex-shrink-0" />
                                        <span className="text-white/80 font-light tracking-wide">Clean Workspace Guarantee</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="text-brand-gold w-5 h-5 flex-shrink-0" />
                                        <span className="text-white/80 font-light tracking-wide">Exclusive Luxury Finishes</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Scrolling Content */}
                    <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-12 lg:pt-12 pb-12">
                        {FEATURES.map((feature, index) => (
                            <FeatureCard key={index} feature={feature} index={index} />
                        ))}
                    </div>

                </div>
            </div>

            {/* Subtle gradient separator at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent" />
        </section>
    );
}
