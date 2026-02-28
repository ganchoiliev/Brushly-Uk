import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Use springs for smooth, delayed movement of the outer ring
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(0, springConfig);
    const cursorYSpring = useSpring(0, springConfig);

    useEffect(() => {
        // Only show custom cursor on non-touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const mouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorXSpring.set(e.clientX - 16); // Center the 32px ring
            cursorYSpring.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        const mouseLeave = () => setIsVisible(false);
        const mouseEnter = () => setIsVisible(true);

        // Add listeners for clickable elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over a clickable element
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.style.cursor === 'pointer' ||
                window.getComputedStyle(target).cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseleave', mouseLeave);
        window.addEventListener('mouseenter', mouseEnter);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseleave', mouseLeave);
            window.removeEventListener('mouseenter', mouseEnter);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorXSpring, cursorYSpring, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* Small dot that exactly follows the cursor */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-brand-gold rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: mousePosition.x - 4, // Center the 8px dot
                    y: mousePosition.y - 4,
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.15 }}
            />

            {/* Outer ring that smoothly follows the dot and expands on hover */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-gold pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.1)' : 'rgba(212, 175, 55, 0)',
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    );
}
