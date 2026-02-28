import { motion } from 'motion/react';
import { Paintbrush, ShieldCheck, Clock, Gem } from 'lucide-react';
import { ParallaxCard } from './ui/parallax-card';

const FEATURES = [
  {
    title: "Impeccable Detail",
    description: "Every stroke is calculated. We pride ourselves on flawless finishes that stand the test of time.",
    icon: Gem,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-brand-surface to-brand-navy border border-white/5",
  },
  {
    title: "Premium Materials",
    description: "Exclusive use of high-end paints and materials for a luxurious look and feel.",
    icon: Paintbrush,
    className: "bg-brand-surface border border-white/5",
  },
  {
    title: "Fully Insured",
    description: "Complete peace of mind with comprehensive coverage for your property.",
    icon: ShieldCheck,
    className: "bg-brand-surface border border-white/5",
  },
  {
    title: "Timely Execution",
    description: "We respect your time, delivering projects on schedule without compromising quality.",
    icon: Clock,
    className: "md:col-span-2 bg-brand-gold text-brand-navy",
  }
];

export default function ValueProp() {
  return (
    <section className="py-32 bg-brand-navy relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-white mb-6 flex flex-wrap gap-x-3 items-center"
          >
            {["The", "Brushly"].map((word, i) => (
              <motion.span
                key={i}
                whileHover={{ color: "#D4AF37", y: -4, scale: 1.05 }}
                whileTap={{ color: "#D4AF37", y: -4, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="cursor-pointer md:cursor-default origin-bottom"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 1.05, rotate: 2, color: "#D4AF37" }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="text-brand-gold italic cursor-pointer md:cursor-default origin-bottom"
            >
              Standard
            </motion.span>
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.02, delayChildren: 0.1 }
              }
            }}
            className="text-slate-400 text-lg flex flex-wrap gap-x-1.5 gap-y-1"
          >
            {"We don't just paint walls; we transform spaces. Our commitment to excellence is evident in every project we undertake across London and Surrey.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ color: "#D4AF37", y: -2, textShadow: "0px 0px 8px rgba(212, 175, 55, 0.4)" }}
                whileTap={{ color: "#D4AF37", y: -2, textShadow: "0px 0px 8px rgba(212, 175, 55, 0.4)" }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer md:cursor-default touch-manipulation"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-6">
          {FEATURES.map((feature, i) => {
            if (feature.title === "Impeccable Detail" || feature.title === "Premium Materials" || feature.title === "Fully Insured") {
              const bgImage = feature.title === "Impeccable Detail"
                ? "/impeccable_detail.png"
                : feature.title === "Premium Materials"
                  ? "/premium_materials.png"
                  : "/fully_insured.png";

              return (
                <ParallaxCard
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  bgImage={bgImage}
                  className={feature.className}
                />
              );
            }

            if (feature.title === "Timely Execution") {
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-3xl p-8 flex flex-col justify-center md:justify-between items-center md:items-start text-center md:text-left gap-6 md:gap-0 group overflow-hidden relative ${feature.className}`}
                >
                  <div className="text-brand-navy w-full flex justify-center md:justify-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      {/* Hour hand (slow sweep) */}
                      <motion.line
                        x1="12" y1="12" x2="12" y2="8"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: "12px 12px" }}
                      />
                      {/* Minute hand (fast sweep) */}
                      <motion.line
                        x1="12" y1="12" x2="16" y2="12"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: "12px 12px" }}
                      />
                    </svg>
                  </div>

                  <div className="relative z-10 w-full flex flex-col justify-end">
                    <h3 className="text-2xl font-serif mb-2 text-brand-navy">
                      {feature.title}
                    </h3>
                    <p className="text-brand-navy/90 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover="hover"
                className={`rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative ${feature.className}`}
              >
                {/* Hover gradient effect for dark cards */}
                {!feature.className.includes('bg-brand-gold') && (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}

                <motion.div
                  variants={{
                    hover: { scale: 1.1, rotate: 5 }
                  }}
                >
                  <feature.icon
                    size={32}
                    className={`mb-4 ${feature.className.includes('bg-brand-gold') ? 'text-brand-navy' : 'text-brand-gold'}`}
                  />
                </motion.div>

                <div className="relative z-10">
                  <h3 className={`text-2xl font-serif mb-2 ${feature.className.includes('bg-brand-gold') ? 'text-brand-navy' : 'text-white'}`}>
                    {feature.title}
                  </h3>
                  <p className={`${feature.className.includes('bg-brand-gold') ? 'text-brand-navy/80' : 'text-slate-400'} leading-relaxed`}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
