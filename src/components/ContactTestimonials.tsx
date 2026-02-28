import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Quote, Send, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    text: "Brushly completely transformed our Chelsea townhouse. Their attention to detail and professionalism is unmatched.",
    author: "Sarah Jenkins",
    location: "Chelsea, London"
  },
  {
    text: "The team was incredibly respectful of our space. The Farrow & Ball finish in our living room is absolutely flawless.",
    author: "James Harrington",
    location: "Richmond, Surrey"
  }
];

export default function ContactTestimonials() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: formData.message,
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-brand-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-navy/50 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Side: Testimonials */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                Client <span className="text-brand-gold italic">Stories</span>
              </h2>
              <p className="text-slate-400 text-lg mb-12">
                Don't just take our word for it. Hear from the homeowners who have experienced the Brushly difference.
              </p>
            </motion.div>

            <div className="space-y-10">
              {TESTIMONIALS.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative pl-8 border-l border-brand-gold/30"
                >
                  <Quote className="absolute -left-3 -top-2 text-brand-gold/20" size={48} />
                  <p className="text-xl text-slate-300 font-serif italic mb-4 relative z-10">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-brand-gold text-sm">{testimonial.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-navy p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl"
          >
            <h3 className="text-3xl font-serif text-white mb-2">Request a Consultation</h3>
            <p className="text-slate-400 mb-8">Tell us about your project in London or Surrey.</p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Project Details</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none"
                  placeholder="Tell us about the space, timeline, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-brand-gold text-brand-navy font-medium rounded-xl hover:bg-brand-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  'Sending...'
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={20} /> Request Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} /> Submit Request
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
