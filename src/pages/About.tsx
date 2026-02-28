import { motion } from 'motion/react';
import { Target, Shield, Heart, Medal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const values = [
    {
        icon: <Target className="w-8 h-8 text-brand-gold" />,
        title: "Meticulous Detail",
        description: "Every brushstroke matters. We obsess over the finest details to ensure a flawless, enduring finish."
    },
    {
        icon: <Medal className="w-8 h-8 text-brand-gold" />,
        title: "Premium Materials",
        description: "We use only the highest quality paints and materials to guarantee breathtaking and long-lasting results."
    },
    {
        icon: <Heart className="w-8 h-8 text-brand-gold" />,
        title: "Client-Centric",
        description: "Your vision is our blueprint. We work closely with you to bring your dream spaces to life."
    },
    {
        icon: <Shield className="w-8 h-8 text-brand-gold" />,
        title: "Unwavering Reliability",
        description: "We respect your time and property, delivering on our promises with professionalism and integrity."
    }
];

export default function About() {
    return (
        <div className="bg-brand-navy min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/about/hero.jpg"
                        alt="An expansive luxury interior showcasing flawless painting, high ceilings, and premium materials"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-transparent to-brand-navy"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif text-white mb-6"
                    >
                        The Art of Elegance
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-300 font-light"
                    >
                        Elevating London & Surrey's finest properties through masterful craftsmanship and uncompromising quality.
                    </motion.p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeIn}
                    >
                        <h2 className="text-sm font-medium text-brand-gold tracking-widest uppercase mb-4">Our Story</h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-white mb-8">A Legacy of Perfection</h3>
                        <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed">
                            <p>
                                Founded on the belief that a space should be as unique as the individuals who inhabit it, Brushly was established to bring a new level of sophistication to the painting and decorating industry.
                            </p>
                            <p>
                                What began as a passionate pursuit of excellence has evolved into a premier service trusted by homeowners and interior designers alike across London and Surrey. We don't just paint walls; we curate atmospheres and breathe new life into cherished homes.
                            </p>
                            <p>
                                Our team of artisans brings decades of collective experience, combining traditional techniques with contemporary sensibilities to deliver results that transcend the ordinary. Every project is an opportunity to create something truly exceptional.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="/images/about/story.jpg"
                            alt="Close-up of a skilled artisan painter carefully applying precise details to a textured wall surface"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 border border-white/10 rounded-2xl"></div>
                    </motion.div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 bg-brand-surface border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-medium text-brand-gold tracking-widest uppercase mb-4">Our Ethos</h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-white">The Pillars of Our Craft</h3>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
                    >
                        {values.map((value, index) => (
                            <motion.div key={index} variants={fadeIn} className="flex flex-col items-center text-center group">
                                <div className="w-20 h-20 rounded-full bg-brand-navy/50 flex items-center justify-center mb-6 border border-white/10 group-hover:border-brand-gold/50 transition-colors duration-500 shadow-xl group-hover:shadow-brand-gold/20">
                                    {value.icon}
                                </div>
                                <h4 className="text-xl font-serif text-white mb-4">{value.title}</h4>
                                <p className="text-slate-400 font-light leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* The Process */}
            <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1"
                    >
                        <img
                            src="/images/about/process.jpg"
                            alt="Top-down view of premium painting tools, fine brushes, and curated color swatches laid out on a table"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent"></div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeIn}
                        className="order-1 lg:order-2"
                    >
                        <h2 className="text-sm font-medium text-brand-gold tracking-widest uppercase mb-4">Our Approach</h2>
                        <h3 className="text-4xl md:text-5xl font-serif text-white mb-8">Curated Consultations</h3>
                        <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed mb-10">
                            <p>
                                We believe that a truly bespoke finish begins long before a brush touches the wall. Our process is rooted in understanding your aesthetic aspirations and lifestyle needs.
                            </p>
                            <p>
                                From meticulous color consultations featuring premium palettes to providing expert advice on the ideal finishes and textures, we guide you through every decision. We meticulously prepare your space, ensuring the utmost care for your furnishings and an impeccable canvas for our work.
                            </p>
                        </div>
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 uppercase tracking-widest text-sm font-medium"
                        >
                            Explore Our Services
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
