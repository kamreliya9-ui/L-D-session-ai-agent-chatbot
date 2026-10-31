import React from 'react';
import { Sparkles, ShieldCheck, Mail, Phone, MapPin, ArrowUpRight, Database } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenChat }) => {
  return (
    <footer className="bg-noir-950 border-t border-gold-400/20 text-stone-300 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Atelier Brand Identity */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center text-noir-950 font-serif font-bold text-xl shadow-gold-glow">
                J
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-semibold tracking-wide text-stone-100">
                  JUCAS ROYALE
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-medium">
                  Haute Cuisine Atelier
                </span>
              </div>
            </div>
            <p className="text-stone-400 text-sm font-light leading-relaxed max-w-sm mb-6">
              Bespoke culinary architecture for royal weddings, presidential galas, and intimate founder gatherings. Powered by artisan master brigades and real-time Groq AI intelligence.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenChat}
                className="px-4 py-2 rounded-lg bg-gold-400/10 hover:bg-gold-400/20 text-gold-300 border border-gold-400/30 text-xs font-mono flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Consult AI Sommelier
              </button>
              <button
                onClick={onOpenAdmin}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 text-xs font-mono flex items-center gap-2 transition-all"
              >
                <Database className="w-3.5 h-3.5 text-gold-400" />
                H2 Admin DB
              </button>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-serif text-stone-100 font-medium mb-4 text-base">Navigation</h4>
            <ul className="space-y-2.5 text-xs font-light text-stone-400">
              <li>
                <a href="#menus" className="hover:text-gold-300 transition-colors">
                  Curated Menus
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-gold-300 transition-colors">
                  Live Pricing Estimator
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-gold-300 transition-colors">
                  Haute Atelier Standards
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-gold-300 transition-colors">
                  Patron Chronicles
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-300 transition-colors">
                  Operational & DB FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 className="font-serif text-stone-100 font-medium mb-4 text-base">Collections</h4>
            <ul className="space-y-2.5 text-xs font-light text-stone-400">
              <li>Royal Awadhi & Mughlai</li>
              <li>Continental French Haute</li>
              <li>Imperial Cantonese & Dim Sum</li>
              <li>Coastal Chettinad & Malabar</li>
              <li>Live Wood-Fired BBQ</li>
              <li>Sattvic & Jain Excellence</li>
            </ul>
          </div>

          {/* Atelier Salons */}
          <div>
            <h4 className="font-serif text-stone-100 font-medium mb-4 text-base">Atelier Salons</h4>
            <ul className="space-y-3 text-xs font-light text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span>The Taj Enclave, Colaba, Mumbai 400001</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span className="font-mono">+91 (022) 8800-ROYALE</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                <span className="font-mono">concierge@jucasroyale.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <div>
            © {new Date().getFullYear()} Jucas Royale Atelier. All commissions reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Spring Boot 3.3.4 & H2 Engine Active
            </span>
            <span>•</span>
            <span className="text-gold-400/80">Groq qwen3.8-27b Sommelier</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
