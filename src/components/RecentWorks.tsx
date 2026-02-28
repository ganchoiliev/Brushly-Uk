import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PROJECTS = [
    {
        id: 'kensington',
        title: 'The Kensington Townhouse',
        category: 'Full Interior Refurbishment',
        image: '/kensington.png',
        span: 'col-span-1 md:col-span-2 row-span-2 min-h-[400px] md:min-h-[600px]',
    },
    {
        id: 'mayfair',
        title: 'Mayfair High-End Finish',
        category: 'Luxury Decorating & Gilding',
        image: '/mayfair.png',
        span: 'col-span-1 row-span-1 aspect-square',
    },
    {
        id: 'chelsea',
        title: 'Chelsea Modern Extension',
        category: 'Exterior & Interior Painting',
        image: '/chelsea.png',
        span: 'col-span-1 row-span-1 aspect-square',
    },
    {
        id: 'notting-hill',
        title: 'Notting Hill Heritage',
        category: 'Bespoke Wallpaper Installation',
        image: '/notting-hill.png',
        span: 'col-span-1 md:col-span-2 row-span-1 aspect-[2/1]',
    }
];

export function RecentWorks() {
    return (
        <section className="relative w-full bg-brand-navy overflow-hidden">

            {/* Section 2: The Project Image Gallery */}
            <div className="py-24 md:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Gallery Header */}
                    <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-2xl"
                        >
                            <h2 className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-brand-gold mb-4 flex items-center gap-4">
                                <span className="w-12 h-[1px] bg-brand-gold"></span>
                                Featured Projects
                            </h2>
                            <h3 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight">
                                Our Work
                            </h3>
                        </motion.div>

                        <Link to="/portfolio" className="group flex items-center gap-4 text-white/70 hover:text-brand-gold transition-colors duration-300">
                            <span className="text-sm tracking-widest uppercase font-semibold">View All Projects</span>
                            <div className="w-10 h-10 rounded-full border border-white/20 group-hover:border-brand-gold flex items-center justify-center transition-all duration-300">
                                <ArrowUpRight size={16} />
                            </div>
                        </Link>
                    </div>

                    {/* Bento/Masonry Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                        {PROJECTS.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                                className={`group relative overflow-hidden rounded-[2rem] cursor-pointer ${project.span}`}
                            >
                                <Link to={`/portfolio#${project.id}`} className="absolute inset-0 z-10 w-full h-full block">
                                    <span className="sr-only">View {project.title}</span>
                                </Link>

                                {/* Base Image */}
                                <div className="absolute inset-0 w-full h-full bg-brand-navy">
                                    <img
                                        src={project.image}
                                        alt={`High quality finished painting project: ${project.title}`}
                                        className={`w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${project.id === 'notting-hill' ? 'object-[50%_20%]' : ''}`}
                                    />
                                </div>

                                {/* Gradient Overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

                                {/* Content Block */}
                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end pointer-events-none">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <div className="flex items-center justify-between gap-4 mb-4">
                                            <span className="text-brand-gold text-xs md:text-sm font-semibold tracking-widest uppercase">
                                                {project.category}
                                            </span>
                                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                <ArrowUpRight size={16} className="text-white" />
                                            </div>
                                        </div>
                                        <h4 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight">
                                            {project.title}
                                        </h4>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
