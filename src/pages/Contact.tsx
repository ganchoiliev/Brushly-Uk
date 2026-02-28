import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2, Send } from 'lucide-react';

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

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
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
                    subject: 'New Message from Contact Page',
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    message: formData.message,
                })
            });

            const result = await response.json();
            if (result.success) {
                setStatus('success');
                setFormData({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '' });
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
                        src="/images/contact/hero.png"
                        alt="A beautifully decorated luxury interior setting with warm ambient lighting"
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
                        Let's Discuss Your Vision
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-300 font-light"
                    >
                        Reach out to begin your next premium project.
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-12"
                    >
                        <div>
                            <motion.h2 variants={fadeIn} className="text-sm font-medium text-brand-gold tracking-widest uppercase mb-4">Get in Touch</motion.h2>
                            <motion.h3 variants={fadeIn} className="text-4xl md:text-5xl font-serif text-white mb-6">We're Here for You</motion.h3>
                            <motion.p variants={fadeIn} className="text-slate-300 text-lg font-light leading-relaxed">
                                Whether you're planning a complete home refinement, a targeted update, or simply seeking expert advice, our team is ready to assist you. Contact us directly or use the form to request a consultation.
                            </motion.p>
                        </div>

                        <div className="space-y-8">
                            <motion.div variants={fadeIn} className="flex items-start gap-4 group">
                                <div className="p-4 bg-brand-surface rounded-full border border-white/5 group-hover:border-brand-gold/50 transition-colors">
                                    <Phone className="w-6 h-6 text-brand-gold" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Phone</h4>
                                    <p className="text-slate-400 font-light">01737 479161</p>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeIn} className="flex items-start gap-4 group">
                                <div className="p-4 bg-brand-surface rounded-full border border-white/5 group-hover:border-brand-gold/50 transition-colors">
                                    <Mail className="w-6 h-6 text-brand-gold" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Email</h4>
                                    <p className="text-slate-400 font-light">hello@brushly.co.uk</p>
                                    <p className="text-slate-400 font-light">quotes@brushly.co.uk</p>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeIn} className="flex items-start gap-4 group">
                                <div className="p-4 bg-brand-surface rounded-full border border-white/5 group-hover:border-brand-gold/50 transition-colors">
                                    <MapPin className="w-6 h-6 text-brand-gold" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Locations</h4>
                                    <p className="text-slate-400 font-light">London, UK</p>
                                    <p className="text-slate-400 font-light">Surrey, UK</p>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeIn} className="flex items-start gap-4 group">
                                <div className="p-4 bg-brand-surface rounded-full border border-white/5 group-hover:border-brand-gold/50 transition-colors">
                                    <Clock className="w-6 h-6 text-brand-gold" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium mb-1">Working Hours</h4>
                                    <p className="text-slate-400 font-light">Monday - Friday: 8am - 6pm</p>
                                    <p className="text-slate-400 font-light">Saturday: 9am - 2pm</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-brand-surface border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

                        <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm text-slate-400 font-medium">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors placeholder:text-slate-600"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm text-slate-400 font-medium">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors placeholder:text-slate-600"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm text-slate-400 font-medium">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors placeholder:text-slate-600"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm text-slate-400 font-medium">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors placeholder:text-slate-600"
                                        placeholder="01737 479161"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="service" className="text-sm text-slate-400 font-medium">Service Required</label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors appearance-none"
                                >
                                    <option value="" disabled className="text-slate-600">Select a service...</option>
                                    <option value="interior">Interior Painting</option>
                                    <option value="exterior">Exterior Decorating</option>
                                    <option value="wallpaper">Wallpaper & Coverings</option>
                                    <option value="refurbishment">Full Refurbishment</option>
                                    <option value="other">Other Inquiry</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm text-slate-400 font-medium">Project Details</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full bg-brand-navy/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors placeholder:text-slate-600 resize-none"
                                    placeholder="Tell us about your vision..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-gold text-brand-navy hover:bg-white transition-all duration-300 uppercase tracking-widest text-sm font-bold rounded-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    'Sending...'
                                ) : status === 'success' ? (
                                    <>
                                        <CheckCircle2 size={18} /> Request Sent!
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} /> Request Consultation
                                    </>
                                )}
                            </button>

                            {status === 'error' && (
                                <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
