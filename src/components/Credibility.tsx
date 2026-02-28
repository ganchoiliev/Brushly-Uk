import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from 'motion/react';
import { useRef, useState } from 'react';

const BRANDS = [
  "Farrow & Ball",
  "Little Greene",
  "Dulux Heritage",
  "Paint & Paper Library",
  "Zoffany",
  "Mylands",
  "Benjamin Moore"
];

// Combine them a few times to ensure we have enough content to loop seamlessly on big screens
const REPEATED_BRANDS = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

export default function Credibility() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Base velocity of the scroll (negative means scroll left)
  // Tuned way down for a very slow, smooth premium drift to match video speed
  const baseVelocity = -0.015;
  const baseX = useMotionValue(0);

  // Wrap the offset value from 0 to -25% (since we repeat the array 4 times, -25% is exactly one full set)
  // This allows it to loop infinitely without visibly snapping.
  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);

  useAnimationFrame((t, delta) => {
    // Only move automatically if not paused (hovering or touching)
    if (!isPaused) {
      let moveBy = baseVelocity * (delta / 16); // Normalize to roughly 60fps
      baseX.set(baseX.get() + moveBy);
    }
  });

  return (
    <section className="py-16 md:py-24 bg-brand-navy border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10 md:mb-14 text-center">
        <p className="text-sm uppercase tracking-widest text-brand-gold font-semibold tracking-[0.2em]">
          Trusted by & Working With Premium Brands
        </p>
      </div>

      <div className="relative flex overflow-hidden group cursor-grab active:cursor-grabbing w-full">
        {/* Soft edge masks */}
        <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-brand-navy to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-brand-navy to-transparent pointer-events-none" />

        <motion.div
          ref={containerRef}
          className="flex whitespace-nowrap items-center w-max"
          style={{ x, touchAction: "pan-y" }}

          // Pause animation when hovering or touching
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}

          // Use onPan instead of drag to avoid Framer Motion's internal pixel-based spring physics 
          onPan={(event, info) => {
            if (containerRef.current) {
              // Convert the raw pixel drag into a precise percentage based on the true width of the continuous logo strip
              const width = containerRef.current.clientWidth;
              const pctDelta = (info.delta.x / width) * 100;
              baseX.set(baseX.get() + pctDelta);
            }
          }}
        >
          {REPEATED_BRANDS.map((brand, i) => (
            <div
              key={i}
              className="mx-12 md:mx-16 text-3xl md:text-5xl font-serif text-slate-400 hover:text-brand-gold transition-colors select-none"
              style={{ flexShrink: 0 }}
            >
              {brand}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
