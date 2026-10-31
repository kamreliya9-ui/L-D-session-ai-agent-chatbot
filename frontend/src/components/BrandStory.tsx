import React from 'react';
import { Compass, Sparkles, Award } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-24 sm:py-32 bg-espresso text-ivory relative overflow-hidden">
      {/* Background subtle grain or overlay */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline mb-20 border-b border-espresso-surface pb-12">
          <div className="lg:col-span-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-mono block mb-2">
              Chapter I • The Atelier Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-light leading-snug">
              Bespoke dining as a living, sensory exhibition.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-sm sm:text-base text-taupe-light font-light leading-relaxed max-w-2xl">
              We reject the industrial uniformity of traditional hotel banqueting. At Jucas Royale, each gathering is conceived as an architectural dialogue — where the historical cadence of the venue, the seasonal bounty of the soil, and your personal narrative merge into an unforgettable feast.
            </p>
          </div>
        </div>

        {/* Narrative 3-Column Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Card 1 */}
          <div className="flex flex-col justify-between border-t border-espresso-surface pt-8 group">
            <div>
              <span className="font-serif text-2xl text-gold/60 group-hover:text-gold transition-colors font-light">
                01
              </span>
              <h3 className="font-serif text-2xl text-ivory font-normal mt-4 mb-3">
                Single-Origin Provenance
              </h3>
              <p className="text-xs sm:text-sm text-taupe-light font-light leading-relaxed mb-6">
                Direct partnerships with biodynamic micro-farms across the Alpine valleys and Kashmir saffron estates guarantee chemical-free, nutrient-dense perfection on every plate.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-espresso-surface">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop"
                alt="Chef Precision Craftsmanship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col justify-between border-t border-espresso-surface pt-8 group">
            <div>
              <span className="font-serif text-2xl text-gold/60 group-hover:text-gold transition-colors font-light">
                02
              </span>
              <h3 className="font-serif text-2xl text-ivory font-normal mt-4 mb-3">
                Live Theatrical Stages
              </h3>
              <p className="text-xs sm:text-sm text-taupe-light font-light leading-relaxed mb-6">
                Culinary presentation that unfolds before your guests: wood-fired iron hearths, sub-zero liquid nitrogen sorbets, and tableside truffle shaves create palpable anticipation.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-espresso-surface">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop"
                alt="Live Fire Theatrics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col justify-between border-t border-espresso-surface pt-8 group">
            <div>
              <span className="font-serif text-2xl text-gold/60 group-hover:text-gold transition-colors font-light">
                03
              </span>
              <h3 className="font-serif text-2xl text-ivory font-normal mt-4 mb-3">
                White-Glove Butler Cadence
              </h3>
              <p className="text-xs sm:text-sm text-taupe-light font-light leading-relaxed mb-6">
                Service that anticipates rather than interrupts. Formal captains, certified sommeliers, hand-polished Riedel stemware, and custom hand-embossed calligraphic menus.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-espresso-surface">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop"
                alt="Luxury Banquet Table Setting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
