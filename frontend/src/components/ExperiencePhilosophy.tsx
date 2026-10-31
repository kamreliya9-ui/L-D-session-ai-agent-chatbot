import React from 'react';
import { Flame, Award, ShieldCheck, Sparkles, Compass, Utensils, Clock, Users } from 'lucide-react';

export const ExperiencePhilosophy: React.FC = () => {
  const pillars = [
    {
      icon: Compass,
      title: 'Artisanal Provenance',
      subtitle: 'Micro-Farm Traceability',
      description:
        'Every truffle, saffron strand, and cold-pressed oil is ethically procured from certified single-origin purveyors and sustainable micro-farms.',
      tag: 'Zero Synthetics',
    },
    {
      icon: Award,
      title: 'Michelin-Trained Brigade',
      subtitle: 'Haute Technique Mastery',
      description:
        'Led by executive chefs with lineage across European ateliers and royal Indian banquet houses, blending ancient slow-simmering with sous-vide precision.',
      tag: 'Grand Master Guild',
    },
    {
      icon: Flame,
      title: 'Live Fire & Theatrics',
      subtitle: 'Multi-Sensory Culinary Stages',
      description:
        'From sub-zero liquid nitrogen sorbet spheres to aromatic charcoal smoke domes, dining transforms into an interactive theatrical performance.',
      tag: 'Immersive Gastronomy',
    },
    {
      icon: Sparkles,
      title: 'White-Glove Butler Service',
      subtitle: 'Unobtrusive Perfection',
      description:
        'Formal banquet captains, dedicated sommelier attendants, hand-polished Riedel crystal glassware, and bespoke hand-embossed menus.',
      tag: 'Diplomatic Standard',
    },
  ];

  const highlights = [
    { label: 'Event Success Rate', value: '99.8%', note: 'Audited across 1,400+ banquets' },
    { label: 'Cold-Chain Integrity', value: '100%', note: 'GPS temperature telemetry' },
    { label: 'Chef-to-Guest Ratio', value: '1 : 12', note: 'Intimate banquet attention' },
    { label: 'Sommelier Reserves', value: '350+', note: 'Curated cellars & mocktail infusions' },
  ];

  return (
    <section id="philosophy" className="py-24 sm:py-32 relative bg-noir-950 text-stone-100 overflow-hidden">
      {/* Subtle ambient gold radial blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-300 text-xs uppercase tracking-[0.25em] font-medium mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            The Haute Atelier Standards
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-stone-100 tracking-tight leading-tight">
            Gastronomy elevated to a{' '}
            <span className="italic font-normal bg-gradient-to-r from-gold-200 via-gold-300 to-gold-500 bg-clip-text text-transparent">
              fine art form.
            </span>
          </h2>
          <p className="mt-5 text-stone-400 text-base sm:text-lg font-light leading-relaxed">
            We reject mass catering compromises. Every soirée, grand gala, and royal wedding is treated as an original culinary commission tailored to your exact aesthetic, cadence, and palate.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-noir-900/60 border border-white/5 hover:border-gold-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-300 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-gold-400/80 mb-1">
                    {p.subtitle}
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-stone-100 mb-3 group-hover:text-gold-200 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed font-light">
                    {p.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-stone-500">
                  <span className="text-gold-400/70 font-mono">{p.tag}</span>
                  <span className="font-serif text-stone-600">Pillar 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Audit Metrics Strip */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-noir-900/90 via-noir-900/50 to-noir-900/90 border border-gold-400/20 backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {highlights.map((h, i) => (
              <div key={i} className={i !== 0 ? 'pt-6 md:pt-0 md:pl-8' : ''}>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-gold-300 tracking-tight">
                  {h.value}
                </div>
                <div className="mt-2 text-sm font-medium text-stone-200 tracking-wide">
                  {h.label}
                </div>
                <div className="text-xs text-stone-400 font-light mt-1">
                  {h.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
