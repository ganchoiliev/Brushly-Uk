import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const PORTFOLIO_PROJECTS = [
    {
        id: 'kensington',
        title: 'The Kensington Townhouse',
        location: 'Kensington',
        category: 'Full Interior Refurbishment',
        description: 'A comprehensive restoration of a Grade II listed property. This project required stripping back decades of previous work to reveal the original architectural details. We restored and expertly painted all the ornate cornicing, applied traditional lime wash where appropriate, and utilized a rich, highly curated deep color palette from Farrow & Ball to bring an elegant, modern yet timeless feel to the grand rooms. The living room and main hallways were a particular focus of our expert artisans.',
        heroImage: '/kensington.png',
        images: [
            '/kensington_living.png',
            '/kensington_hallway.png'
        ]
    },
    {
        id: 'mayfair',
        title: 'Mayfair High-End Finish',
        location: 'Mayfair',
        category: 'Luxury Decorating & Gilding',
        description: 'Positioned in the heart of Mayfair, this luxury apartment required an impeccable, flawless finish worthy of its location. We employed our most seasoned decorators to provide meticulous preparation, ensuring the walls were perfectly smooth before applying high-end, custom-mixed silk emulsions. The standout feature of this project was the intricate gold leaf gilding work applied to the dining room detailing and master bedroom accents, providing a truly opulent aesthetic.',
        heroImage: '/mayfair.png',
        images: [
            '/mayfair_dining.png',
            '/mayfair_bedroom.png'
        ]
    },
    {
        id: 'chelsea',
        title: 'Chelsea Modern Extension',
        location: 'Chelsea',
        category: 'Exterior & Interior Painting',
        description: 'A striking blend of classic architecture and ultra-modern extension designed by leading London architects. Our team was tasked with seamlessly bridging the gap between the old and the new. We applied specialized, highly durable masonry paints to the modern exterior elements while achieving crisp, immaculate lines in the open-plan interior spaces. The minimalist kitchen and bright living areas showcase our commitment to sharp, clean lines and flawless continuous surfaces.',
        heroImage: '/chelsea.png',
        images: [
            '/chelsea_kitchen.png',
            '/chelsea_living.png'
        ]
    },
    {
        id: 'notting-hill',
        title: 'Notting Hill Heritage',
        location: 'Notting Hill',
        category: 'Bespoke Wallpaper Installation',
        description: 'This quintessential Notting Hill heritage home was all about bringing personality and warmth back into the space. We worked closely with the interior design team to install incredibly intricate, bespoke hand-painted wallpapers from prestigious luxury brands. The study and main living areas now feature these stunning botanical and textured patterns. Wallpaper installation of this caliber requires mathematical precision and a delicate touch, which our specialists executed flawlessly.',
        heroImage: '/notting-hill.png',
        images: [
            '/nottinghill_study.png',
            '/nottinghill_living.png'
        ]
    }
];

export default function Portfolio() {
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
                        Our Portfolio
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight mb-8">
                        Masterpieces in Every Detail.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                        Explore our curated selection of high-end painting and decorating projects across London's most prestigious postcodes. Every project is a testament to our commitment to absolute perfection.
                    </p>
                </motion.div>
            </div>

            {/* Projects List */}
            <div className="flex flex-col gap-32 md:gap-48">
                {PORTFOLIO_PROJECTS.map((project, index) => (
                    <section key={project.id} id={project.id} className="scroll-mt-32">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                            {/* Project Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16"
                            >
                                <div className="lg:col-span-8">
                                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
                                        {project.title}
                                    </h3>
                                    <p className="text-brand-gold tracking-widest uppercase text-sm font-semibold mb-8">
                                        {project.category}
                                    </p>
                                    <p className="text-slate-300 text-lg leading-relaxed font-light">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="lg:col-span-4 flex flex-col justify-end">
                                    <div className="w-full h-[1px] bg-white/10 mb-8 hidden lg:block"></div>
                                    <div className="flex items-center justify-between lg:justify-start lg:gap-8">
                                        <div className="text-center lg:text-left">
                                            <p className="text-slate-500 text-sm uppercase tracking-wider mb-2">Location</p>
                                            <p className="text-white font-medium">{project.location}</p>
                                        </div>
                                        <div className="text-center lg:text-left">
                                            <p className="text-slate-500 text-sm uppercase tracking-wider mb-2">Completion</p>
                                            <p className="text-white font-medium">2026</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Project Images Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Hero Image - Span Full or majority depending on layout */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="md:col-span-1 lg:col-span-2 relative aspect-[16/10] overflow-hidden rounded-2xl group"
                                >
                                    <img
                                        src={project.heroImage}
                                        alt={`${project.title} main presentation`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                                    />
                                    <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-500"></div>
                                </motion.div>

                                {/* Additional Image 1 */}
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="relative aspect-square md:aspect-[16/10] lg:aspect-[3/4] overflow-hidden rounded-2xl group"
                                >
                                    <img
                                        src={project.images[0]}
                                        alt={`${project.title} detail view 1`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                                    />
                                </motion.div>

                                {/* Additional Image 2 - Often placed underneath or continuing grid */}
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index % 2 === 0 ? 0 : 0.4 }}
                                    className="md:col-span-2 lg:col-span-3 relative aspect-[4/3] md:aspect-video overflow-hidden rounded-2xl group mt-4 md:mt-0"
                                >
                                    <img
                                        src={project.images[1]}
                                        alt={`${project.title} detail view 2`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                                    />
                                </motion.div>
                            </div>

                        </div>
                    </section>
                ))}
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-32 md:mt-48 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto py-24 border-t border-white/10"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Ready to start your own project?</h2>
                    <p className="text-slate-300 text-lg mb-12">
                        Contact us today to discuss your vision with our expert team of luxury decorators.
                    </p>
                    <Link to="/#contact" className="inline-flex items-center gap-4 px-8 py-4 bg-brand-gold text-brand-navy font-semibold uppercase tracking-widest rounded-full hover:bg-white transition-colors duration-300">
                        Discuss Your Project
                        <ArrowUpRight size={20} />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
