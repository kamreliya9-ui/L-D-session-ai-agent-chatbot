import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Database, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenChat: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/95 backdrop-blur-md border-b border-beige/60 py-4 shadow-subtle'
          : 'bg-transparent py-6 border-b border-beige/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Insignia */}
        <a href="#home" className="flex items-center gap-3.5 group">
          <div className="w-9 h-9 rounded-sm border border-gold/40 flex items-center justify-center font-serif text-lg text-gold font-light tracking-widest group-hover:border-gold transition-colors">
            J
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-[0.08em] text-espresso">
              JUCAS ROYALE
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-taupe font-medium">
              Haute Cuisine Atelier
            </span>
          </div>
        </a>

        {/* Desktop Editorial Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <a
            href="#story"
            className="text-xs uppercase tracking-[0.18em] text-espresso/80 hover:text-gold transition-colors font-medium"
          >
            Philosophy
          </a>
          <a
            href="#menus"
            className="text-xs uppercase tracking-[0.18em] text-espresso/80 hover:text-gold transition-colors font-medium"
          >
            Curated Menus
          </a>
          <a
            href="#estimator"
            className="text-xs uppercase tracking-[0.18em] text-espresso/80 hover:text-gold transition-colors font-medium flex items-center gap-1.5"
          >
            Estimator
            <span className="w-1.5 h-1.5 rounded-full bg-gold/70" />
          </a>
          <a
            href="#pillars"
            className="text-xs uppercase tracking-[0.18em] text-espresso/80 hover:text-gold transition-colors font-medium"
          >
            The Atelier
          </a>
          <a
            href="#testimonials"
            className="text-xs uppercase tracking-[0.18em] text-espresso/80 hover:text-gold transition-colors font-medium"
          >
            Chronicles
          </a>
          <a
            href="#faq"
            className="text-xs uppercase tracking-[0.18em] text-espresso/80 hover:text-gold transition-colors font-medium"
          >
            Governance
          </a>
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenAdmin}
            className="text-[11px] uppercase tracking-[0.16em] text-taupe hover:text-espresso transition-colors px-3 py-1.5 border border-beige/60 hover:border-beige rounded-sm flex items-center gap-1.5 font-medium"
            title="Inspect H2 SQL Orders & Telemetry"
          >
            <Database className="w-3 h-3 text-gold" />
            Registry
          </button>
          <button
            onClick={onOpenChat}
            className="px-5 py-2.5 rounded-sm bg-espresso text-ivory hover:bg-espresso-charcoal transition-all text-[11px] uppercase tracking-[0.18em] font-medium flex items-center gap-2 border border-espresso hover:border-gold/50 shadow-subtle"
          >
            <Sparkles className="w-3 h-3 text-gold" />
            <span>Consult Concierge</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-espresso hover:text-gold p-2"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory border-b border-beige px-6 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col gap-3.5">
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] text-espresso hover:text-gold py-1"
            >
              Philosophy
            </a>
            <a
              href="#menus"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] text-espresso hover:text-gold py-1"
            >
              Curated Menus
            </a>
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] text-espresso hover:text-gold py-1"
            >
              Pricing Estimator
            </a>
            <a
              href="#pillars"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] text-espresso hover:text-gold py-1"
            >
              The Atelier
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] text-espresso hover:text-gold py-1"
            >
              Chronicles
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-[0.2em] text-espresso hover:text-gold py-1"
            >
              Governance & FAQ
            </a>
          </nav>
          <div className="pt-4 border-t border-beige flex gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex-1 py-2 text-[10px] uppercase tracking-wider text-taupe border border-beige text-center"
            >
              Registry (SQL)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="flex-1 py-2 text-[10px] uppercase tracking-wider bg-espresso text-ivory text-center"
            >
              Consult Concierge
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
