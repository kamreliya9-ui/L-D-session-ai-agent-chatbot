import React from 'react';
import { Star, Quote, CheckCircle2, Calendar, Users } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      quote:
        'The culinary storytelling was extraordinary. Our royal banquet for 650 guests felt as tailored and immaculate as a private Michelin-starred dining room. The Live Fire Awadhi Biryani and Smoked Truffle Galouti were the talk of the entire weekend.',
      client: 'Aditi & Vikramaditya Singhania',
      title: 'Grand Palace Wedding Gala',
      venue: 'Umaid Bhawan Palace, Jodhpur',
      guests: 650,
      date: 'November 2025',
      rating: 5,
    },
    {
      quote:
        'For our global financial delegates from Tokyo, Zurich, and New York, culinary precision was non-negotiable. Jucas Royale delivered seven flawless courses synchronized down to the second. The Groq AI Sommelier preview matches our actual tasting experience exactly.',
      client: 'Kavita Menon',
      title: 'Head of Global Events, Apex Capital Partners',
      venue: 'The St. Regis Ballroom, Mumbai',
      guests: 320,
      date: 'January 2026',
      rating: 5,
    },
    {
      quote:
        'Hosting the Founders Retreat required discreet white-glove finesse. From the customized cold-pressed mocktail bar to the live pasta wheel with 36-month aged Reggiano, every detail surpassed expectations. Truly in a league of their own.',
      client: 'Arjun Deshmukh',
      title: 'Managing Director, Horizon Ventures',
      venue: 'Private Seafront Villa, Alibaug',
      guests: 85,
      date: 'February 2026',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-noir-900/60 relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-mono uppercase tracking-[0.25em] mb-3">
              <Quote className="w-3.5 h-3.5 text-gold-400" />
              Patron Chronicles
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 tracking-tight">
              Endorsed by the most{' '}
              <span className="italic font-normal text-gold-300">discerning palates.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 text-stone-400 text-sm">
            <div className="flex items-center gap-1 text-gold-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="font-medium text-stone-200">4.98 / 5.0</span>
            <span className="text-stone-500">•</span>
            <span>Over 1,200 Verified Reviews</span>
          </div>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-noir-950/80 border border-white/5 hover:border-gold-400/25 transition-all duration-300 flex flex-col justify-between group hover:shadow-gold-glow"
            >
              <div>
                {/* Rating & Verified */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Soirée
                  </span>
                </div>

                {/* Quote */}
                <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed italic mb-8">
                  "{r.quote}"
                </p>
              </div>

              {/* Author & Venue Metadata */}
              <div className="pt-6 border-t border-white/5">
                <h4 className="font-serif text-lg font-medium text-stone-100 group-hover:text-gold-200 transition-colors">
                  {r.client}
                </h4>
                <div className="text-xs text-gold-400/80 font-medium mt-0.5">
                  {r.title}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-stone-400 font-light">
                  <span>{r.venue}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-gold-400/70" /> {r.guests} Guests
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gold-400/70" /> {r.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
