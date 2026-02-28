import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Clock, ArrowRight, ShieldCheck, Zap, Sparkles, CheckCircle2, Send } from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function Quote() {
    const [formData, setFormData] = useState({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        timeline: '',
        details: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    access_key: '8f864bd8-4ad9-425e-bb0a-36ec3d9ef28f',
                    subject: 'New Quote Request from Quotes Page',
                    name: formData.fullName,
                    company: formData.company || 'Not provided',
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    timeline: formData.timeline,
                    message: formData.details,
                })
            });

            const result = await response.json();
            if (result.success) {
                setStatus('success');
                setFormData({ fullName: '', company: '', email: '', phone: '', service: '', timeline: '', details: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="bg-brand-navy min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/portfolio/portfolio-8.png"
                        alt="A luxurious living room featuring high-end interior painting and elegant decor"
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
                        Request a Quote
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-300 font-light"
                    >
                        Transform your space with our premium painting and decorating services.
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 bg-brand-surface border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

                        <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>

                            {/* Personal Details */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-serif text-white border-b border-white/10 pb-4">1. Personal Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="fullName" className="text-sm text-slate-400 font-medium">Full Name <span className="text-brand-gold">*</span></label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors placeholder:text-slate-600"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="company" className="text-sm text-slate-400 font-medium">Company (Optional)</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors placeholder:text-slate-600"
                                            placeholder="Company name"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm text-slate-400 font-medium">Email Address <span className="text-brand-gold">*</span></label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors placeholder:text-slate-600"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm text-slate-400 font-medium">Phone Number <span className="text-brand-gold">*</span></label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors placeholder:text-slate-600"
                                            placeholder="01737 479161"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="space-y-6 pt-6">
                                <h3 className="text-2xl font-serif text-white border-b border-white/10 pb-4">2. Project Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="service" className="text-sm text-slate-400 font-medium">Primary Service <span className="text-brand-gold">*</span></label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors appearance-none"
                                        >
                                            <option value="" className="text-slate-600" disabled>Select a service...</option>
                                            <option value="interior">Interior Painting</option>
                                            <option value="exterior">Exterior Painting</option>
                                            <option value="commercial">Commercial Decorating</option>
                                            <option value="residential">Residential Decorating</option>
                                            <option value="wallpaper">Wallpaper Installation</option>
                                            <option value="other">Multiple / Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="timeline" className="text-sm text-slate-400 font-medium">Estimated Timeline <span className="text-brand-gold">*</span></label>
                                        <select
                                            id="timeline"
                                            name="timeline"
                                            value={formData.timeline}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors appearance-none"
                                        >
                                            <option value="" className="text-slate-600" disabled>When do you need it done?</option>
                                            <option value="asap">As soon as possible</option>
                                            <option value="1_month">Within 1 month</option>
                                            <option value="3_months">1 - 3 months</option>
                                            <option value="flexible">Flexible</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="details" className="text-sm text-slate-400 font-medium">Property & Project Description <span className="text-brand-gold">*</span></label>
                                    <textarea
                                        id="details"
                                        name="details"
                                        value={formData.details}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors placeholder:text-slate-600 resize-y"
                                        placeholder="Please provide details about the scope of your project, size of the property, specific rooms, and any special requirements..."
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full md:w-auto mt-8 inline-flex items-center justify-center gap-2 px-10 py-4 bg-brand-gold text-brand-navy hover:bg-white transition-all duration-300 uppercase tracking-widest text-sm font-bold rounded-lg group disabled:opacity-50 disabled:cursor-not-allowed text-center"
                            >
                                {status === 'loading' ? (
                                    'Sending...'
                                ) : status === 'success' ? (
                                    <>
                                        <CheckCircle2 size={18} /> Request Sent!
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} /> Submit Request
                                    </>
                                )}
                            </button>

                            {status === 'error' && (
                                <p className="text-red-400 text-sm mt-4">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    </motion.div>

                    {/* Right Column: Info & Trust Signals */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="lg:col-span-4 space-y-8"
                    >
                        <motion.div variants={fadeIn} className="bg-brand-surface p-8 rounded-2xl border border-white/5 h-full">
                            <h3 className="text-2xl font-serif text-white mb-8">Why Choose Us?</h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-brand-navy rounded-full border border-white/5 mt-1">
                                        <Zap className="w-5 h-5 text-brand-gold" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Fast Turnaround</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">We aim to provide comprehensive quotes within 24-48 hours of surveying your property.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-brand-navy rounded-full border border-white/5 mt-1">
                                        <ShieldCheck className="w-5 h-5 text-brand-gold" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Fully Insured & Guaranteed</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">Complete peace of mind with full public liability insurance and satisfaction guarantees.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-brand-navy rounded-full border border-white/5 mt-1">
                                        <Sparkles className="w-5 h-5 text-brand-gold" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Premium Finish</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">We only use top-tier materials and employ meticulous preparation for flawless results.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/10 space-y-6">
                                <h4 className="text-lg font-serif text-white mb-4">Direct Contact</h4>
                                <div className="flex items-center gap-3 text-slate-300 hover:text-brand-gold transition-colors">
                                    <Phone className="w-5 h-5" />
                                    <span>01737 479161</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-300 hover:text-brand-gold transition-colors">
                                    <Mail className="w-5 h-5" />
                                    <span>quotes@brushly.co.uk</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-300 hover:text-brand-gold transition-colors">
                                    <Clock className="w-5 h-5" />
                                    <span>Mon-Fri: 8am - 6pm</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
