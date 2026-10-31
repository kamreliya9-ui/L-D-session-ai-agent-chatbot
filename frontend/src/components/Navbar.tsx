import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenChat: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-noir-950/90 backdrop-blur-xl border-b border-gold-400/20 py-3.5 shadow-luxe'
          : 'bg-transparent py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Insignia */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center text-noir-950 font-serif font-bold text-xl shadow-gold-glow group-hover:scale-105 transition-transform">
            J
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-semibold tracking-wide text-stone-100 group-hover:text-gold-300 transition-colors">
              JUCAS ROYALE
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-medium">
              Haute Cuisine Atelier
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#menus"
            className="text-sm font-medium text-stone-300 hover:text-gold-400 transition-colors tracking-wide"
          >
            Curated Menus
          </a>
          <a
            href="#estimator"
            className="text-sm font-medium text-stone-300 hover:text-gold-400 transition-colors tracking-wide flex items-center gap-1.5"
          >
            Live Estimator
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-gold-400/10 text-gold-400 border border-gold-400/20">
              API
            </span>
          </a>
          <a
            href="#philosophy"
            className="text-sm font-medium text-stone-300 hover:text-gold-400 transition-colors tracking-wide"
          >
            The Atelier
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium text-stone-300 hover:text-gold-400 transition-colors tracking-wide"
          >
            Chronicles
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-stone-300 hover:text-gold-400 transition-colors tracking-wide"
          >
            Inquiries
          </a>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenAdmin}
            className="text-xs uppercase tracking-wider text-stone-400 hover:text-gold-400 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-gold-400/30"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin SQL
          </button>
          <button
            onClick={onOpenChat}
            className="relative group px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-noir-950 font-semibold text-xs uppercase tracking-wider shadow-gold-glow hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-noir-950" />
            <span>Plan with AI</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-stone-300 hover:text-gold-400 p-2"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-noir-900 border-b border-gold-400/20 px-6 py-6 flex flex-col gap-4">
          <a
            href="#menus"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-stone-200 hover:text-gold-400 py-1"
          >
            Curated Menus
          </a>
          <a
            href="#estimator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-stone-200 hover:text-gold-400 py-1 flex items-center justify-between"
          >
            Live Estimator
            <span className="text-[10px] px-2 py-0.5 rounded bg-gold-400/10 text-gold-400 border border-gold-400/20">
              Spring Boot
            </span>
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-stone-200 hover:text-gold-400 py-1"
          >
            The Experience
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-stone-200 hover:text-gold-400 py-1"
          >
            Chronicles
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base text-stone-200 hover:text-gold-400 py-1"
          >
            Inquiries
          </a>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xs text-stone-400 hover:text-gold-400 py-2 text-left flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Orders Dashboard (H2 SQL DB)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-noir-950 font-bold text-xs uppercase tracking-wider text-center"
            >
              Plan Banquet with AI
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
