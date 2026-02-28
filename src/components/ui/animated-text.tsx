import React from 'react';
import { motion } from 'motion/react';

interface AnimatedTextProps {
    text: string;
    className?: string;
    wordClassName?: string;
}

/**
 * Splits a string of text into individual words and wraps each word in a 
 * Framer Motion `<motion.span>` that highlights when hovered or tapped.
 */
export function AnimatedText({ text, className = "", wordClassName = "" }: AnimatedTextProps) {
    // Split text by spaces to get words
    const words = text.split(" ");

    return (
        <p className={`flex flex-wrap gap-[0.3em] ${className}`}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className={`inline-block transition-colors duration-300 cursor-pointer ${wordClassName}`}
                    whileHover={{
                        color: "#D4AF37", // brand-gold
                        scale: 1.05,
                        textShadow: "0px 0px 8px rgba(212, 175, 55, 0.4)",
                    }}
                    // Ensures it works on mobile tap as well
                    whileTap={{
                        color: "#D4AF37",
                        scale: 1.05,
                        textShadow: "0px 0px 8px rgba(212, 175, 55, 0.4)",
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </p>
    );
}
