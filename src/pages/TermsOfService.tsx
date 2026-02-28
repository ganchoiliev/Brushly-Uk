import { motion } from 'motion/react';
import { Shield, FileText, CheckCircle, CreditCard, AlertCircle, Mail } from 'lucide-react';
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

const termsSections = [
    {
        title: "Agreement to Terms",
        icon: <FileText className="w-6 h-6 text-brand-gold" />,
        content: `These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Brushly Painting & Decorating ("we," "us," or "our"), concerning your access to and use of our services, website, and related applications. By accessing our services, you agree that you have read, understood, and agreed to be bound by all of these Terms of Service.`
    },
    {
        title: "Services & Quotes",
        icon: <CheckCircle className="w-6 h-6 text-brand-gold" />,
        content: `All quotes provided by Brushly are valid for 30 days from the date of issue. While we strive to ensure all estimates are accurate, quotes are subject to change if the scope of the project alters significantly upon commencement. Any additional work requested outside the original quote will be priced and agreed upon separately before work begins.`
    },
    {
        title: "Payment Terms",
        icon: <CreditCard className="w-6 h-6 text-brand-gold" />,
        content: `For larger projects, we may require a deposit prior to the commencement of work to cover initial materials. The final balance is due upon satisfactory completion of the project, strictly within 7 days of the invoice date. We accept payments via bank transfer, credit card, or other agreed-upon methods.`
    },
    {
        title: "Cancellations & Rescheduling",
        icon: <AlertCircle className="w-6 h-6 text-brand-gold" />,
        content: `We request at least 48 hours' notice for any cancellations or rescheduling of appointments. If a project is cancelled after materials have been purchased specifically for your job, you may be liable for the cost of those materials. We reserve the right to reschedule work due to severe weather conditions or other unforeseen circumstances.`
    },
    {
        title: "Liability & Guarantee",
        icon: <Shield className="w-6 h-6 text-brand-gold" />,
        content: `Brushly Painting & Decorating holds comprehensive public liability insurance. We take the utmost care while working on your property, ensuring all non-painted surfaces and furniture are fully protected. All our painting and decorating work comes with a standard 12-month quality guarantee against standard wear and tear.`
    }
];

export default function TermsOfService() {
    return (
        <div className="bg-brand-navy min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/privacy-hero.png"
                        alt="A subtle, luxurious interior background image for the Terms of Service page"
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
                        <FileText className="w-8 h-8" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-serif text-white mb-6"
                    >
                        Terms of Service
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
                        Welcome to Brushly Painting & Decorating. These terms outline the rules and regulations
                        for the use of our services and website. By accessing this website and utilizing our services,
                        we assume you accept these terms and conditions in full. Do not continue to use Brushly's website
                        or services if you do not accept all of the terms and conditions stated on this page.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    {termsSections.map((section, index) => (
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
                    <h3 className="text-3xl font-serif text-white mb-4">Questions about our terms?</h3>
                    <p className="text-slate-300 font-light mb-8 max-w-2xl mx-auto">
                        If you have any questions or require further clarification regarding our Terms of Service, please do not hesitate to contact us.
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
