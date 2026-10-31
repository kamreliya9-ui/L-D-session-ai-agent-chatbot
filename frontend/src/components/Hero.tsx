import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calculator, Award, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
  onExploreEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat, onExploreEstimator }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Subtle Warm Luxury Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Editorial Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center z-10">
        {/* Prestige Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-[0.2em] font-medium mb-8"
        >
          <Award className="w-3.5 h-3.5 text-gold-400" />
          <span>Michelin-Standard Hospitality &bull; Spring Boot ReAct AI</span>
        </motion.div>

        {/* Editorial Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-serif tracking-tight text-stone-50 leading-[1.05] mb-8"
        >
          Grand Celebrations, <br />
          <span className="italic font-normal gold-gradient-text">
            Bespoke Mastery.
          </span>
        </motion.h1>

        {/* Supporting Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-stone-300 leading-relaxed font-light mb-12"
        >
          From royal palace banquets to high-profile executive galas. Converse with our Spring Boot AI banquet concierge to curate artisanal menus, calculate real-time tiered volume discounts, and reserve with effortless precision.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-20"
        >
          <button
            onClick={onOpenChat}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-noir-950 font-bold text-xs uppercase tracking-[0.18em] shadow-gold-glow hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
          >
            <Sparkles className="w-4 h-4 text-noir-950" />
            <span>Converse with AI Concierge</span>
          </button>
          <button
            onClick={onExploreEstimator}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-noir-850 hover:bg-noir-800 text-stone-200 border border-gold-400/25 hover:border-gold-400/50 font-medium text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2.5"
          >
            <Calculator className="w-4 h-4 text-gold-400" />
            <span>Live Price Estimator</span>
          </button>
        </motion.div>

        {/* Stats Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-10 border-t border-white/10"
        >
          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-100 mb-1">
              1,500<span className="text-gold-400">+</span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
              Royal Banquets
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-100 mb-1">
              980<span className="text-gold-400">+</span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
              Discerning Hosts
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-100 mb-1">
              15
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
              Cities Served
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-100 mb-1">
              10
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-stone-400">
              Years Heritage
            </span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#menus"
            className="text-stone-500 hover:text-gold-400 transition-colors animate-bounce p-2"
            aria-label="Scroll to Menus"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
