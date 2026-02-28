import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-navy pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="mb-6">
              <img src="/logo.png" alt="Brushly Painting & Decorating Company Logo" className="h-28 md:h-32 w-auto object-contain drop-shadow-md" />
            </div>
            <p className="text-slate-400 max-w-sm">
              Premium painting and decorating services for discerning clients across London and Surrey.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/services#interior" className="hover:text-brand-gold transition-colors block">Interior Painting</Link></li>
              <li><Link to="/services#exterior" className="hover:text-brand-gold transition-colors block">Exterior Decorating</Link></li>
              <li><Link to="/services#wallpaper" className="hover:text-brand-gold transition-colors block">Wallpapering</Link></li>
              <li><Link to="/services#refurbishment" className="hover:text-brand-gold transition-colors block">Refurbishment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4 text-slate-400">
              <li>London, UK</li>
              <li>Surrey, UK</li>
              <li><a href="mailto:hello@brushly.co.uk" className="hover:text-brand-gold transition-colors">hello@brushly.co.uk</a></li>
              <li><a href="tel:01737479161" className="hover:text-brand-gold transition-colors">01737 479161</a></li>
              <li className="pt-2"><Link to="/quote" className="text-brand-gold hover:text-white transition-colors flex items-center gap-2 text-sm font-medium uppercase tracking-wider">Request a Quote &rarr;</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p>&copy; {new Date().getFullYear()} Brushly Painting & Decorating. All rights reserved.</p>
            <span className="hidden md:inline text-slate-700">|</span>
            <p>Design by <a href="https://gosmartr.co.uk" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors font-medium">GoSmartR</a></p>
          </div>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
