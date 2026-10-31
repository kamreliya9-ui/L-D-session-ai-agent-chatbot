import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenChat: () => void;
  onExploreEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat, onExploreEstimator }) => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 sm:px-10 lg:px-16 bg-gradient-ivory overflow-hidden">
      {/* Top Editorial Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-beige/60 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-taupe font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Bespoke Banqueting & Private Atelier
          </div>
          <p className="text-xs font-mono text-taupe/80 tracking-wider">
            COMMISSION NO. 2026-HC • MUMBAI & LONDON
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-taupe tracking-wide font-light max-w-xs ml-auto">
            Where Michelin-pedigree brigade craft meets real-time autonomous intelligence.
          </p>
        </div>
      </div>

      {/* Hero Editorial Composition */}
      <div className="max-w-7xl mx-auto w-full py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Headline & Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-gold block">
              The Art of Exceptional Entertaining
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.05] tracking-tight text-espresso">
              Culinary architecture <br />
              <span className="italic font-normal font-serif text-gold">
                tailored to the palate.
              </span>
            </h1>
            <p className="pt-4 text-base sm:text-lg text-taupe font-light leading-relaxed max-w-xl">
              We design immersive gastronomic affairs for royal weddings, diplomatic receptions, and intimate founder retreats. Every menu is an original commission — orchestrating single-origin provenance, theatrical live fire, and quiet luxury.
            </p>
          </div>

          {/* Minimalist Action Group */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              onClick={onExploreEstimator}
              className="px-7 py-3.5 rounded-sm bg-espresso text-ivory text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-charcoal transition-all flex items-center gap-3 shadow-elevated group"
            >
              <span>Explore Menu Estimator</span>
              <ArrowDown className="w-3.5 h-3.5 text-gold group-hover:translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={onOpenChat}
              className="px-7 py-3.5 rounded-sm bg-transparent border border-beige hover:border-gold text-espresso text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center gap-2.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Converse with Sommelier</span>
            </button>
          </div>

          {/* Subtle Key Metrics Strip */}
          <div className="mt-14 pt-8 border-t border-beige/60 grid grid-cols-3 gap-6">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-light text-espresso">
                12,000<span className="text-gold font-normal">+</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-taupe mt-1 font-medium">
                Guests Catered
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-light text-espresso">
                1 : 12
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-taupe mt-1 font-medium">
                Chef-to-Guest Ratio
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-light text-espresso">
                99.8<span className="text-gold font-normal">%</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-taupe mt-1 font-medium">
                Flawless Execution
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Food Art Photography */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Primary Culinary Canvas */}
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-luxe border border-beige/80 bg-champagne relative group">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
                alt="Haute Cuisine Master Plating"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03] brightness-[0.98]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold/90 font-mono block mb-1">
                  Collection 01 • Winter Provenance
                </span>
                <p className="font-serif text-lg italic text-ivory font-light">
                  "Charred Morel & Truffle Emulsion over Aged Carnaroli"
                </p>
              </div>
            </div>

            {/* Overlapping Secondary Accent Card */}
            <div className="hidden sm:block absolute -bottom-8 -left-10 w-48 p-4 bg-ivory rounded-sm shadow-elevated border border-beige">
              <span className="text-[9px] uppercase tracking-widest text-gold block font-mono">
                Atelier Guarantee
              </span>
              <p className="font-serif text-sm text-espresso font-normal mt-1 leading-snug">
                Certified Single-Origin Micro-Farm Sourcing
              </p>
              <div className="mt-2 text-[10px] text-taupe">Zero synthetic additives</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between text-[10px] text-taupe uppercase tracking-[0.2em] font-mono border-t border-beige/40">
        <div>Scroll to explore collections</div>
        <div className="flex items-center gap-2">
          <span>Est. 2026</span>
          <span className="w-1 h-1 rounded-full bg-gold" />
          <span>Haute Atelier</span>
        </div>
      </div>
    </section>
  );
};
