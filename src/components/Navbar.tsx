import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-brand-navy/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent border-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-28">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center group cursor-pointer mt-2"
            >
              {/* Brand Logo */}
              <img src="/logo.png" alt="Brushly Painting & Decorating Company Logo" className="h-20 md:h-28 w-auto object-contain drop-shadow-md" />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Portfolio', 'About', 'Contact'].map((item, i) => {
              const dest = item === 'Portfolio' ? '/portfolio' : item === 'Services' ? '/services' : item === 'About' ? '/about' : item === 'Contact' ? '/contact' : `/#${item.toLowerCase()}`;
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={dest}
                    className="text-sm font-medium text-slate-300 hover:text-brand-gold transition-colors tracking-wide uppercase cursor-pointer"
                  >
                    {item}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/quote"
                className="inline-block px-6 py-3 bg-brand-gold text-brand-navy font-medium rounded-full hover:bg-brand-gold-light transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Get a Quote
              </Link>
            </motion.div>
          </div>

          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-brand-surface border-b border-white/5 px-6 py-8 flex flex-col gap-6"
        >
          {['Services', 'Portfolio', 'About', 'Contact'].map((item) => {
            const dest = item === 'Portfolio' ? '/portfolio' : item === 'Services' ? '/services' : item === 'About' ? '/about' : item === 'Contact' ? '/contact' : `/#${item.toLowerCase()}`;
            return (
              <Link
                key={item}
                to={dest}
                className="text-lg font-serif text-slate-300 hover:text-brand-gold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            );
          })}
        </motion.div>
      )}
    </nav>
  );
}
