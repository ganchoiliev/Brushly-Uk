import { motion } from 'motion/react';
import { Shield, Lock, FileText, Database, Eye, Mail } from 'lucide-react';
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

const policySections = [
    {
        title: "Information We Collect",
        icon: <Database className="w-6 h-6 text-brand-gold" />,
        content: `We collect information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us. This may include personal information such as your name, email address, phone number, and physical address for service quotes.`
    },
    {
        title: "How We Use Your Information",
        icon: <Eye className="w-6 h-6 text-brand-gold" />,
        content: `We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.`
    },
    {
        title: "Data Protection & Security",
        icon: <Shield className="w-6 h-6 text-brand-gold" />,
        content: `We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.`
    },
    {
        title: "Your Privacy Rights",
        icon: <Lock className="w-6 h-6 text-brand-gold" />,
        content: `Depending on your location, you may have certain rights regarding your personal information, such as the right to request access to the information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please submit a request form.`
    },
    {
        title: "Cookies and Tracking Technologies",
        icon: <FileText className="w-6 h-6 text-brand-gold" />,
        content: `We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.`
    }
];

export default function Privacy() {
    return (
        <div className="bg-brand-navy min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/privacy-hero.png"
                        alt="A subtle, luxurious interior background image for the Privacy Policy page"
                        className="w-full h-full object-cover opacity-30"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-transparent to-brand-navy"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 text-brand-gold mb-6 border border-brand-gold/30"
                    >
                        <Shield className="w-8 h-8" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-serif text-white mb-6"
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-brand-gold/80 font-light tracking-wide uppercase text-sm"
                    >
                        Last Updated: March 2026
                    </motion.p>
                </div>
            </section>

            {/* Policy Content */}
            <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                    className="prose prose-lg prose-invert max-w-none text-slate-300 font-light leading-relaxed mb-16"
                >
                    <p className="text-xl leading-relaxed text-slate-200">
                        At Brushly Painting & Decorating, accessibility and privacy are of our utmost priority.
                        This Privacy Policy document contains types of information that is collected and recorded
                        by Brushly and how we use it. If you have additional questions or require more information
                        about our Privacy Policy, do not hesitate to contact us.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    {policySections.map((section, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn}
                            className="bg-brand-surface p-8 md:p-10 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-colors duration-300 shadow-xl"
                        >
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                                <div className="p-3 bg-brand-navy rounded-xl border border-white/5">
                                    {section.icon}
                                </div>
                                <h2 className="text-2xl font-serif text-white">{section.title}</h2>
                            </div>
                            <p className="text-slate-300 leading-relaxed font-light">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="mt-20 p-10 bg-gradient-to-br from-brand-gold/10 to-transparent border border-brand-gold/20 rounded-2xl text-center"
                >
                    <Mail className="w-12 h-12 text-brand-gold mx-auto mb-6 opacity-80" />
                    <h3 className="text-3xl font-serif text-white mb-4">Questions about your privacy?</h3>
                    <p className="text-slate-300 font-light mb-8 max-w-2xl mx-auto">
                        If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-navy hover:bg-white transition-all duration-300 uppercase tracking-widest text-sm font-medium"
                    >
                        Contact Us
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
