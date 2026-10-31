import React from 'react';
import { Mail, Phone, MapPin, Database, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenChat }) => {
  return (
    <footer className="bg-espresso text-ivory border-t border-espresso-surface pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10 mb-16">
          {/* Brand Identity */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-sm border border-gold/40 flex items-center justify-center font-serif text-lg text-gold font-light tracking-widest">
                J
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-light tracking-[0.08em] text-ivory">
                  JUCAS ROYALE
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-medium">
                  Haute Cuisine Atelier
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-taupe-light font-light leading-relaxed max-w-sm mb-6">
              Artisanal culinary architecture and discrete hospitality for royal weddings, presidential galas, and private founder salons worldwide.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenChat}
                className="px-4 py-2 rounded-sm bg-espresso-surface text-ivory hover:text-gold border border-espresso-surface text-[11px] uppercase tracking-[0.16em] font-medium flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-3 h-3 text-gold" />
                AI Sommelier
              </button>
              <button
                onClick={onOpenAdmin}
                className="px-4 py-2 rounded-sm bg-transparent hover:bg-espresso-surface text-taupe-light hover:text-ivory border border-espresso-surface text-[11px] uppercase tracking-[0.16em] font-medium flex items-center gap-2 transition-all"
              >
                <Database className="w-3 h-3 text-gold" />
                SQL Registry
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-gold font-mono mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-taupe-light font-light">
              <li>
                <a href="#story" className="hover:text-ivory transition-colors">
                  The Philosophy
                </a>
              </li>
              <li>
                <a href="#menus" className="hover:text-ivory transition-colors">
                  Curated Menus
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-ivory transition-colors">
                  Pricing Estimator
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-ivory transition-colors">
                  Haute Standards
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-ivory transition-colors">
                  Patron Chronicles
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-ivory transition-colors">
                  Operational FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-gold font-mono mb-4">
              Atelier Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-taupe-light font-light">
              <li>Royal Awadhi & Mughlai</li>
              <li>Continental French Haute</li>
              <li>Imperial Cantonese & Dim Sum</li>
              <li>Coastal Chettinad & Malabar</li>
              <li>Live Wood-Fired Smokehouse</li>
              <li>Conscious Plant-Based Luxury</li>
            </ul>
          </div>

          {/* Salons */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-gold font-mono mb-4">
              Private Salons
            </h4>
            <ul className="space-y-3 text-xs text-taupe-light font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span>The Taj Enclave, Colaba, Mumbai</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span className="font-mono">+91 (022) 8800-ROYALE</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span className="font-mono">concierge@jucasroyale.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-espresso-surface flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-taupe font-mono">
          <div>
            © {new Date().getFullYear()} Jucas Royale Atelier. All commissions reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Spring Boot 3.3.4 & Persistent H2 Active</span>
            <span>•</span>
            <span className="text-gold">Groq qwen3.8-27b Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
