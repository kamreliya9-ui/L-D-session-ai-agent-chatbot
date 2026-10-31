import React from 'react';
import { Compass, Award, Flame, Sparkles, ShieldCheck } from 'lucide-react';

export const ExperiencePhilosophy: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Artisanal Provenance & Clean Sourcing',
      desc: 'Every truffle, cold-pressed seed oil, and heirloom grain is procured directly from certified single-origin purveyors and sustainable micro-farms across the Alps and Kashmir.',
      tag: 'Zero Synthetics',
    },
    {
      num: '02',
      title: 'Michelin-Trained Master Brigade',
      desc: 'Headed by master chefs with pedigree in Parisian culinary salons and royal Indian banquet houses, harmonizing ancient slow-braising with modern precision sous-vide.',
      tag: 'Grand Master Guild',
    },
    {
      num: '03',
      title: 'Multi-Sensory Fire & Ice Theatrics',
      desc: 'Sub-zero liquid nitrogen sorbet spheres, aromatic applewood charcoal hearths, and tableside flambé performances transform dining into an interactive artistic cadence.',
      tag: 'Sensory Artistry',
    },
    {
      num: '04',
      title: 'Diplomatic White-Glove Cadence',
      desc: 'Discrete banquet captains, certified sommeliers, hand-polished Riedel crystal, and custom calligraphic menus execute your timeline with diplomatic precision.',
      tag: 'Unobtrusive Finesse',
    },
  ];

  return (
    <section id="pillars" className="py-24 sm:py-32 bg-ivory text-espresso border-b border-beige/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-mono block mb-2">
            The Haute Atelier Standards
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-espresso leading-tight">
            The four pillars of <br />
            <span className="italic font-normal text-gold">uncompromising gastronomy.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-taupe font-light leading-relaxed">
            Every gala, royal wedding, and private salon is governed by rigorous culinary and hospitality tenets.
          </p>
        </div>

        {/* 4 Pillars List / Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="border-t border-beige pt-8 flex flex-col justify-between group hover:border-gold transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl text-gold font-light">
                    {pillar.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-mono text-taupe bg-champagne/40 px-2.5 py-0.5 rounded-sm border border-beige/60">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-normal text-espresso mb-3 group-hover:text-gold transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-taupe font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet Luxury Audit Banner */}
        <div className="mt-20 p-8 sm:p-10 rounded-sm bg-champagne-light border border-beige flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm border border-gold/40 flex items-center justify-center text-gold bg-ivory">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-xl text-espresso font-normal">
                Strict Dietary & Allergen Segregation Protocols
              </h4>
              <p className="text-xs text-taupe font-light">
                Dedicated clean prep lines for Jain, Sattvic, Vegan, Halal, and Celiac gluten-free guests.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold block">
              Audit Standard
            </span>
            <span className="font-serif text-lg text-espresso">ISO 22000 & HACCP Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
};
