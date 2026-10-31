import React from 'react';

export const GalleryShowcase: React.FC = () => {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop',
      title: 'Grand Palace Courtyard Banquet',
      subtitle: '650 Guests • Umaid Bhawan Palace',
      span: 'col-span-1 md:col-span-2 aspect-[16/9]',
    },
    {
      url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
      title: 'Grand Cru Sommelier Reserves',
      subtitle: 'Vintage Pairing Salon',
      span: 'col-span-1 aspect-[4/5]',
    },
    {
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      title: 'Winter Truffle Amuse-Bouche',
      subtitle: 'Single-Origin Alpine Harvest',
      span: 'col-span-1 aspect-[4/5]',
    },
    {
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
      title: 'Intimate Founder Salon',
      subtitle: 'Alibaug Seafront Villa',
      span: 'col-span-1 md:col-span-2 aspect-[16/9]',
    },
  ];

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-espresso text-ivory border-b border-espresso-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-mono block mb-2">
              Visual Chronicles • Chapter II
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-ivory leading-tight">
              An architectural <br />
              <span className="italic font-normal text-gold">gallery of past soirees.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-taupe-light font-light max-w-sm">
            Glimpses into bespoke dining environments curated across heritage palaces, coastal estates, and diplomatic salons.
          </p>
        </div>

        {/* Dynamic Image Mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {images.map((item, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-sm group border border-espresso-surface ${item.span}`}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.02] brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <span className="text-[9px] uppercase tracking-widest text-gold font-mono block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-light text-ivory">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
