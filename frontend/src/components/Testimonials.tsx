import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      quote:
        'The culinary storytelling was extraordinary. Our royal wedding banquet for 650 guests felt as tailored and intimate as a private three-star dining room. The Live Fire Awadhi Biryani and Smoked Truffle Galouti were the centerpiece of the entire weekend.',
      client: 'Aditi & Vikramaditya Singhania',
      title: 'Grand Palace Wedding Gala',
      venue: 'Umaid Bhawan Palace, Jodhpur',
      guests: 650,
      year: '2025',
    },
    {
      quote:
        'For our global delegates from Tokyo, Zurich, and New York, culinary precision was non-negotiable. Jucas Royale delivered seven flawless courses synchronized down to the second. The AI Sommelier pairing preview matched our actual tasting experience exactly.',
      client: 'Kavita Menon',
      title: 'Head of Global Events, Apex Capital',
      venue: 'The St. Regis Ballroom, Mumbai',
      guests: 320,
      year: '2026',
    },
    {
      quote:
        'Hosting the Founders Retreat required discreet white-glove finesse. From the customized cold-pressed mocktail lounge to the live pasta wheel with 36-month aged Reggiano, every detail surpassed expectations. Truly in a league of their own.',
      client: 'Arjun Deshmukh',
      title: 'Managing Director, Horizon Ventures',
      venue: 'Private Seafront Villa, Alibaug',
      guests: 85,
      year: '2026',
    },
  ];

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-ivory text-espresso border-b border-beige/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-mono block mb-2">
              Patron Chronicles • Verified Endorsements
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-espresso leading-tight">
              Words from our <br />
              <span className="italic font-normal text-gold">most discerning hosts.</span>
            </h2>
          </div>
          <div className="text-left md:text-right">
            <div className="flex items-center md:justify-end gap-1 text-gold mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-xs text-taupe font-mono">
              4.98 / 5.0 • Audited across 1,400+ Banquets
            </p>
          </div>
        </div>

        {/* Testimonials 3-Column Minimal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-14">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between border-t border-beige pt-8 group"
            >
              <div>
                <Quote className="w-6 h-6 text-gold/40 mb-4 group-hover:text-gold transition-colors" />
                <p className="font-serif text-lg sm:text-xl text-espresso font-light leading-relaxed italic mb-8">
                  "{r.quote}"
                </p>
              </div>

              <div className="border-t border-beige/60 pt-4">
                <h4 className="font-serif text-lg font-normal text-espresso">
                  {r.client}
                </h4>
                <div className="text-xs text-gold font-medium mt-0.5">
                  {r.title}
                </div>
                <div className="mt-2 text-[11px] text-taupe font-mono flex items-center justify-between">
                  <span>{r.venue}</span>
                  <span>{r.guests} Guests • {r.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
