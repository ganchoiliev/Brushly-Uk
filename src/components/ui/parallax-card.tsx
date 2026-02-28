import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface ParallaxCardProps {
    key?: React.Key;
    title: string;
    description: string;
    icon: LucideIcon;
    bgImage: string;
    className?: string;
}

export function ParallaxCard({
    title,
    description,
    icon: Icon,
    bgImage,
    className = "",
}: ParallaxCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse position from center of card, normalized between -1 and 1
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // We can also use continuous mouse move on the card
        const handleMouseMove = (e: MouseEvent) => {
            if (!cardRef.current || !isHovered) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const normalizedX = (x / rect.width) * 2 - 1; // -1 to 1
            const normalizedY = (y / rect.height) * 2 - 1; // -1 to 1

            setMousePosition({ x: normalizedX, y: normalizedY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isHovered]);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
    };

    // Spring animations for smoothness
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };

    // Calculate rotations (up to x degrees)
    const rotateX = isHovered ? mousePosition.y * -10 : 0;
    const rotateY = isHovered ? mousePosition.x * 10 : 0;

    // Background shifts opposite to mouse
    const bgX = isHovered ? mousePosition.x * -15 : 0;
    const bgY = isHovered ? mousePosition.y * -15 : 0;

    // Floating content shifts towards mouse
    const contentX = isHovered ? mousePosition.x * 10 : 0;
    const contentY = isHovered ? mousePosition.y * 10 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative [perspective:1000px] ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
            onTouchCancel={handleMouseLeave}
        >
            <motion.div
                ref={cardRef}
                className="w-full h-full relative [transform-style:preserve-3d] overflow-hidden rounded-3xl group border border-white/5"
                animate={{
                    rotateX,
                    rotateY,
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={springConfig}
            >
                {/* Parallax Background */}
                <motion.div
                    className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${bgImage})` }}
                    animate={{
                        x: bgX,
                        y: bgY,
                        scale: isHovered ? 1.05 : 1,
                    }}
                    transition={springConfig}
                />

                {/* Dark overlay - switched to JS animated rather than CSS group-hover for mobile touch reliability */}
                <motion.div
                    className="absolute inset-0 bg-brand-navy z-0"
                    animate={{ opacity: isHovered ? 0.5 : 0.8 }}
                    transition={{ duration: 0.5 }}
                />

                {/* Foreground Content */}
                <motion.div
                    className="relative z-10 w-full h-full p-8 flex flex-col justify-between"
                    animate={{
                        x: contentX,
                        y: contentY,
                        z: isHovered ? 50 : 0, // Lift off background
                    }}
                    transition={springConfig}
                >
                    <Icon size={32} className="mb-4 text-brand-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />

                    <div className="relative z-10 pointer-events-none">
                        <h3 className="text-2xl font-serif mb-2 text-white drop-shadow-md">
                            {title}
                        </h3>
                        <p className="text-slate-300 leading-relaxed drop-shadow-md">
                            {description}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
