import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SERVICES_DATA = [
    {
        id: 'interior',
        title: 'Interior Painting',
        category: 'Residential & Commercial',
        description: 'At Brushly, our interior decorating services go beyond mere painting; we craft environments that enrich your daily life. We understand that your home is your sanctuary, which is why our approach combines meticulous preparation with the finest materials available.\n\nEvery project begins with a comprehensive consultation to understand your vision. We assist with color selection, recommending premium brands that offer depth, durability, and the perfect finish for each specific room\'s function.\n\nOur preparation process is rigorous: we carefully protect all furnishings and flooring, repair any surface imperfections, and ensure a flawless canvas before a single drop of paint is applied.',
        features: [
            "Expert color consultation and design advice",
            "Use of premium, low-VOC paints for a healthier home",
            "Meticulous surface preparation and repair",
            "Flawless execution of complex feature walls"
        ],
        heroImage: '/services_interior.png',
    },
    {
        id: 'exterior',
        title: 'Exterior Painting',
        category: 'Restoration & Protection',
        description: 'First impressions matter. Our professional exterior painting services are designed to breathe new life into your property while providing essential protection against the unpredictable British weather. Whether you are looking to refresh faded masonry, restore intricate exterior woodwork, or completely modernize your home\'s facade, our expert decorators deliver a flawless, high-end finish.\n\nWe exclusively use industry-leading, weather-resistant masonry paints and specialized resin coatings formulated to withstand heavy rain, frost, and UV exposure.\n\nOur comprehensive exterior service covers all architectural details, including wooden window frames, front doors, fascias, and metal guttering.',
        features: [
            "Flawless finish that enhances curb appeal",
            "Weather-resistant masonry paints and coatings",
            "Thorough preparation and rendering repair",
            "Comprehensive painting of architectural details"
        ],
        heroImage: '/services_exterior.png',
    },
    {
        id: 'wallpaper',
        title: 'Wallpaper Hanging',
        category: 'Luxury Wallcoverings',
        description: 'Wallpaper is the ultimate expression of personal style, capable of instantly elevating a room from ordinary to extraordinary. Our professional wallpaper hanging service specializes in the flawless installation of premium, designer, and bespoke wallcoverings.\n\nHanging high-end wallpaper is an exacting craft that requires a meticulous eye and steady hand. We have extensive experience working with delicate materials, including silk, grasscloth, metallic foils, and wide-vinyl commercial coverings.\n\nThe secret to breathtaking wallpaper lies beneath the surface. We never cut corners on preparation, creating an immaculately smooth and properly primed canvas ensuring perfect, invisible seams.',
        features: [
            "Flawless installation of premium wallcoverings",
            "Expert handling of delicate silks and foils",
            "Perfect pattern matching and invisible seams",
            "Comprehensive preparation for optimal adhesion"
        ],
        heroImage: '/services_wallpaper.png',
    },
    {
        id: 'refurbishment',
        title: 'Refurbishment',
        category: 'Complete Transformation',
        description: 'A true property refresh requires more than just a new coat of paint—it demands a holistic approach to restoration and design. Our complete refurbishment solutions breathe new life into your property, seamlessly transforming spaces inside and out.\n\nWe excel in the critical stages of preparation and repair that lesser contractors overlook. Our comprehensive service includes rectifying structural blemishes, repairing damaged plaster, filling deep cracks, and treating underlying issues like dampness or woodwork degradation.\n\nOur expert decorators work with unparalleled precision and respect for your property, providing a flawless final finish.',
        features: [
            "End-to-end service for property refurbishment",
            "Comprehensive rectifying of structural blemishes",
            "Immaculate project management",
            "Premium materials and advanced application"
        ],
        heroImage: '/services_refurbishment.png',
    }
];

export default function ServicesPage() {
    const location = useLocation();

    // Scroll to section if hash exists in URL
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div className="pt-28 md:pt-40 pb-24 md:pb-32 min-h-screen bg-brand-navy">
            {/* Header Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
                <Link to="/" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors mb-12 group">
                    <div className="w-10 h-10 rounded-full border border-brand-gold/50 group-hover:border-white flex items-center justify-center transition-all duration-300">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="text-sm tracking-widest uppercase font-semibold">Back to Home</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl"
                >
                    <h2 className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-brand-gold mb-4 flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-brand-gold"></span>
                        Our Expertise
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-8">
                        Elevating Spaces<br />Inside and Out.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                        Discover our comprehensive range of premium decorating services. We combine traditional craftsmanship with modern techniques to deliver flawless, enduring results for discerning clients.
                    </p>
                </motion.div>
            </div>

            {/* Services List */}
            <div className="flex flex-col gap-32 md:gap-40">
                {SERVICES_DATA.map((service, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <section key={service.id} id={service.id} className="scroll-mt-32">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${isEven ? '' : 'lg:flex-[row-reverse]'}`}>

                                    {/* Image Side */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className={`relative aspect-[4/5] object-cover rounded-3xl overflow-hidden group ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                                    >
                                        <img
                                            src={service.heroImage}
                                            alt={`High quality ${service.title.toLowerCase()} demonstrating our premium craftsmanship`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                                        />
                                        <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                    </motion.div>

                                    {/* Content Side */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className={`flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                                    >
                                        <div className="mb-8 relative">
                                            <span className="text-[120px] lg:text-[180px] font-serif font-bold text-white/5 absolute -top-16 lg:-top-24 -left-8 leading-none select-none pointer-events-none">
                                                0{index + 1}
                                            </span>
                                            <p className="text-brand-gold tracking-widest uppercase text-sm font-semibold mb-4 relative z-10">
                                                {service.category}
                                            </p>
                                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-8 relative z-10">
                                                {service.title}
                                            </h3>
                                        </div>

                                        <div className="text-slate-300 text-lg leading-relaxed font-light space-y-4 mb-10">
                                            {service.description.split('\n\n').map((paragraph, pIdx) => (
                                                <p key={pIdx}>{paragraph}</p>
                                            ))}
                                        </div>

                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                                            <h4 className="text-white font-medium uppercase tracking-wider text-sm mb-6">Service Highlights</h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {service.features.map((feature, fIdx) => (
                                                    <li key={fIdx} className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                                                        <span className="text-slate-300 text-sm font-light">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>

                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-32 md:mt-48 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto py-24 border-t border-white/10"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Ready to transform your space?</h2>
                    <p className="text-slate-300 text-lg mb-12">
                        Get in touch to arrange a consultation and discuss your project requirements with our experts.
                    </p>
                    <Link to="/#contact" className="inline-flex items-center gap-4 px-8 py-4 bg-brand-gold text-brand-navy font-semibold uppercase tracking-widest rounded-full hover:bg-white transition-colors duration-300">
                        Request a Quote
                        <ArrowUpRight size={20} />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
