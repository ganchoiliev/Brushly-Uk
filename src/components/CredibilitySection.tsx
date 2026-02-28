import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion, useScroll } from 'framer-motion';
import { Smile, CheckCircle2, Clock, Target } from 'lucide-react';

// --- Custom Animated Icons ---

const AnimatedSmile = () => (
    <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-gold">
        <motion.circle
            cx="12" cy="12" r="10"
            strokeDasharray="4 4"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "12px 12px" }}
        />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
    </motion.svg>
);

const AnimatedCheck = () => (
    <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-gold">
        <motion.path
            d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "12px 12px" }}
        />
        <polyline points="22 4 12 14.01 9 11.01" />
    </motion.svg>
);

const AnimatedClock = () => (
    <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-gold">
        <circle cx="12" cy="12" r="10" />
        {/* Hour hand (slow sweep) */}
        <motion.line
            x1="12" y1="12" x2="12" y2="8"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "12px 12px" }}
        />
        {/* Minute hand (fast sweep) */}
        <motion.line
            x1="12" y1="12" x2="16" y2="12"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "12px 12px" }}
        />
    </motion.svg>
);

const AnimatedTarget = () => (
    <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-brand-gold">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="2" />
        {/* Radar sweeping line */}
        <motion.line
            x1="12" y1="12" x2="12" y2="2"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "12px 12px" }}
        />
    </motion.svg>
);

const COUNTERS = [
    {
        id: 'happy-clients',
        value: 120,
        suffix: '+',
        title: 'Happy Clients',
        description: 'Delighted homeowners across London.',
        AnimatedIcon: AnimatedSmile
    },
    {
        id: 'projects',
        value: 250,
        suffix: '+',
        title: 'Projects Completed',
        description: 'From single rooms to full estates.',
        AnimatedIcon: AnimatedCheck
    },
    {
        id: 'years',
        value: 8,
        suffix: '+',
        title: 'Years Experience',
        description: 'Mastering the art of high-end finishes.',
        AnimatedIcon: AnimatedClock
    },
    {
        id: 'on-time',
        value: 98,
        suffix: '%',
        title: 'On-Time Delivery',
        description: 'Respecting your timeline, every time.',
        AnimatedIcon: AnimatedTarget
    }
];

// Helper component for the Count-Up animation
function CountUpNumber({
    value,
    decimals = 0,
    playAnimation = false
}: {
    value: number,
    decimals?: number,
    playAnimation?: boolean
}) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        if (prefersReducedMotion || !playAnimation) {
            node.textContent = value.toFixed(decimals);
            return;
        }

        const duration = 2.5; // seconds
        let startTimestamp: number | null = null;
        let animationFrameId: number;

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

            // Easing function: easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            const currentVal = easeProgress * value;
            node.textContent = currentVal.toFixed(decimals);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
            }
        };

        animationFrameId = requestAnimationFrame(step);

        return () => cancelAnimationFrame(animationFrameId);
    }, [value, decimals, playAnimation, prefersReducedMotion]);

    return <span ref={nodeRef}>{prefersReducedMotion ? value.toFixed(decimals) : "0"}</span>;
}

// 3D Tilt Card Component
function TiltCard({ data, index, inView }: { key?: React.Key, data: typeof COUNTERS[0] & { decimals?: number }, index: number, inView: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // Mouse position tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring damping for smooth return
    const springConfig = { damping: 20, stiffness: 100 };
    const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
    const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (prefersReducedMotion || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate normalized mouse position (-0.5 to 0.5)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
    }

    function handleMouseLeave() {
        if (prefersReducedMotion) return;
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileTap={prefersReducedMotion ? {} : { scale: 1.05, zIndex: 50, transition: { duration: 0.15 } }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={prefersReducedMotion ? {} : { rotateX: tiltX, rotateY: tiltY, perspective: 1000 }}
            className="group relative flex flex-col p-6 rounded-2xl bg-brand-navy border border-white/10 overflow-hidden transform-gpu cursor-pointer touch-manipulation shadow-none active:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-shadow duration-300"
        >
            {/* Animated Panning Gradient Background */}
            <motion.div
                className="absolute inset-0 z-0 opacity-30 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none bg-gradient-to-br from-brand-gold/20 via-brand-navy to-brand-gold/10 bg-[length:200%_200%]"
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            />

            {/* Interactive Soft Radial Glow that follows mouse */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-brand-gold/10 via-transparent to-transparent mix-blend-screen z-0" />

            {/* Subtle top gold accent line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03] group-hover:border-brand-gold/50 group-hover:bg-brand-gold/10 transition-colors duration-500">
                        <data.AnimatedIcon inView={inView} />
                    </div>
                </div>

                <div className="flex items-baseline gap-1 mb-3">
                    <h4 className="text-4xl md:text-5xl font-serif text-white tracking-widest font-light group-hover:text-brand-gold transition-colors duration-500 drop-shadow-sm">
                        <CountUpNumber
                            value={data.value}
                            decimals={data.decimals}
                            playAnimation={inView}
                        />
                    </h4>
                    <span className="text-xl md:text-2xl font-serif text-brand-gold font-light group-hover:text-white transition-colors duration-500">{data.suffix}</span>
                </div>

                <h5 className="text-[10px] md:text-[11px] font-sans font-medium tracking-[0.3em] uppercase text-brand-gold/90 mb-3 block">
                    {data.title}
                </h5>
                <p className="text-xs font-sans font-light text-white/50 leading-[1.8] max-w-[200px] tracking-wide">
                    {data.description}
                </p>
            </div>
        </motion.div>
    );
}

// 3D Interactive Header Component
function InteractiveHeader({ inView }: { inView: boolean }) {
    const headerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // Scroll progress for fade out effect
    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ["start end", "end start"]
    });

    // Map scroll progress to opacity and vertical exit
    // Element fades in naturally via the inView prop earlier in the trees,
    // but this will fade it out as it scrolls past the middle of the screen
    const kickerOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
    const kickerY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [20, 0, 0, -50]);

    // Smoother, more elegant parallax springs
    const mouseX = useSpring(useMotionValue(0), { damping: 40, stiffness: 150 });
    const mouseY = useSpring(useMotionValue(0), { damping: 40, stiffness: 150 });

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (prefersReducedMotion || !headerRef.current) return;
        const rect = headerRef.current.getBoundingClientRect();
        // Normalized coordinates between -1 and 1
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        mouseX.set(x);
        mouseY.set(y);
    }

    function handleMouseLeave() {
        if (prefersReducedMotion) return;
        mouseX.set(0);
        mouseY.set(0);
    }

    // Transform values for different layers (parallax depth)
    const backgroundX = useTransform(mouseX, [-1, 1], [-15, 15]);
    const backgroundY = useTransform(mouseY, [-1, 1], [-15, 15]);

    const titleX = useTransform(mouseX, [-1, 1], [10, -10]);
    const titleY = useTransform(mouseY, [-1, 1], [10, -10]);

    const textX = useTransform(mouseX, [-1, 1], [-5, 5]);
    const textY = useTransform(mouseY, [-1, 1], [-5, 5]);

    const glowOpacity = useTransform(mouseX, [-1, 1], [0.3, 0.7]);

    return (
        <div
            ref={headerRef}
            className="max-w-5xl mx-auto mb-16 md:mb-24 relative py-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
        >
            {/* Ambient interactive glow */}
            <motion.div
                style={{ x: backgroundX, y: backgroundY, opacity: glowOpacity }}
                className="absolute inset-0 z-0 bg-gradient-to-b from-brand-gold/10 via-brand-gold/5 to-transparent blur-[70px] rounded-full pointer-events-none mix-blend-screen"
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center relative z-10"
            >
                {/* Elegant Kicker Container connected to scroll */}
                <motion.div
                    style={{ x: textX, y: textY, opacity: kickerOpacity, translateY: kickerY }}
                    className="mb-8 inline-flex items-center gap-6 group cursor-default"
                >
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                        className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent via-brand-gold/80 to-brand-gold origin-right bg-brand-gold/50"
                    />
                    <span className="text-xs md:text-sm tracking-[0.4em] font-sans font-medium text-brand-gold uppercase">
                        The Brushly Standard
                    </span>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                        className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent via-brand-gold/80 to-brand-gold origin-left bg-brand-gold/50"
                    />
                </motion.div>

                {/* Main Heading with premium styling */}
                <motion.h2
                    style={{ x: titleX, y: titleY }}
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-serif leading-[1.2] mb-8 pointer-events-none text-white tracking-wide"
                >
                    <span className="drop-shadow-lg opacity-95">
                        Trusted by homeowners
                    </span>
                    <br className="hidden sm:block" />
                    <span className="drop-shadow-lg opacity-95 sm:hidden"> </span>
                    <span className="drop-shadow-lg opacity-95">
                        who care{' '}
                    </span>
                    <span
                        className="inline-block mt-2 font-serif italic tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold drop-shadow-2xl"
                        style={{
                            backgroundSize: "200% auto",
                            WebkitTextFillColor: "transparent",
                            filter: "drop-shadow(0px 4px 24px rgba(212,175,55,0.25))"
                        }}
                    >
                        about the finish
                    </span>
                </motion.h2>

                {/* Refined Description */}
                <motion.p
                    style={{ x: backgroundX, y: backgroundY }}
                    className="text-sm md:text-lg text-white/50 font-sans font-light max-w-2xl mx-auto tracking-widest uppercase leading-loose"
                >
                    From single rooms to full refurbishments<br className="hidden md:block" />
                    <span className="text-brand-gold/80 font-medium"> — measured strictly by results.</span>
                </motion.p>
            </motion.div>
        </div>
    );
}

export function CredibilitySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section className="relative w-full bg-brand-navy py-12 md:py-20 overflow-hidden">

            {/* Subtle Parallax Background Texture Grid */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={sectionRef}>

                {/* Interactive 3D Header Block */}
                <InteractiveHeader inView={inView} />

                {/* Counter Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
                    {COUNTERS.map((counter, index) => (
                        <TiltCard
                            key={counter.id}
                            data={counter}
                            index={index}
                            inView={inView}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
