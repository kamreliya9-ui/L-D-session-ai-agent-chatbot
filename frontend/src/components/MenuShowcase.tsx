import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, CheckCircle2, ArrowRight } from 'lucide-react';

export interface MenuPackageData {
  id: string;
  name: string;
  tagline: string;
  category: string;
  ratePerHead: number;
  minGuests: number;
  badge: string;
  courses: {
    appetizers: string[];
    mains: string[];
    theatre: string;
    dessert: string;
  };
}

export const MENU_PACKAGES: MenuPackageData[] = [
  {
    id: 'indian',
    name: 'Royal Indian Feast',
    tagline: 'Imperial Mughlai & Royal Awadhi Banqueting',
    category: 'Heritage',
    ratePerHead: 500,
    minGuests: 100,
    badge: 'Signature Wedding',
    courses: {
      appetizers: ['Galouti Kebab on Sheermal', 'Tandoori Malai Broccoli', 'Paneer Tikka Angara'],
      mains: ['Slow-Cooked Awadhi Dum Biryani', 'Classic Butter Chicken', '24-Hour Dal Makhani'],
      theatre: 'Old Delhi Chandni Chowk Live Chaat & Puchka Courtyard',
      dessert: 'Shahi Saffron Kulfi & Warm Malpua with Rabri'
    }
  },
  {
    id: 'continental',
    name: 'Continental Elegance',
    tagline: 'Modern European & Mediterranean Plated Artistry',
    category: 'Western',
    ratePerHead: 650,
    minGuests: 50,
    badge: 'Corporate Gala',
    courses: {
      appetizers: ['Truffle Wild Mushroom Bruschetta', 'Herb Grilled Prawns', 'Caprese Skewers'],
      mains: ['Pan-Seared Seabass Meunière', 'Rosemary Tender Chicken', 'Artisanal Gnocchi'],
      theatre: 'Parmesan Reggiano Wheel Fettuccine Live Station',
      dessert: 'Flambé Crème Brûlée & Belgian Chocolate Silk Mousse'
    }
  },
  {
    id: 'chinese',
    name: 'Imperial Pan-Asian',
    tagline: 'Cantonese Dim Sum, Sichuan Wok & Teppanyaki',
    category: 'Asian',
    ratePerHead: 450,
    minGuests: 50,
    badge: 'Cocktail Soirée',
    courses: {
      appetizers: ['Crystal Truffle Edamame Dim Sum', 'Crispy Golden Lotus Stem', 'Chicken Satay'],
      mains: ['Wok-Smoked Hakka Noodles', 'Sichuan Burnt Garlic Fried Rice', 'Tofu in Black Bean'],
      theatre: 'Live Mongolian Wok & Dim Sum Steamer Station',
      dessert: 'Warm Toffee Apple with Vanilla Bean Gelato'
    }
  },
  {
    id: 'south',
    name: 'South Indian Delight',
    tagline: 'Coastal Malabar, Chettinad & Temple Banquets',
    category: 'Heritage',
    ratePerHead: 350,
    minGuests: 50,
    badge: 'Traditional Heritage',
    courses: {
      appetizers: ['Chettinad Pepper Chicken Fry', 'Guntur Podi Idli Toss', 'Crispy Medu Vada'],
      mains: ['Kerala Fish Moilee', 'Vegetable Malabar Stew with Appam', 'Bisi Bele Bath'],
      theatre: 'Live Crispy Ghee Roast Dosa & Fluffy Uttapam Bar',
      dessert: 'Parippu Payasam & Authentic Brass Filter Kaapi'
    }
  },
  {
    id: 'bbq',
    name: 'Live Fire BBQ & Grill',
    tagline: 'Argentine Asado, Smoked Platters & Craft Mocktails',
    category: 'Live Fire',
    ratePerHead: 750,
    minGuests: 30,
    badge: 'VIP Outdoor Experience',
    courses: {
      appetizers: ['Smoked Peri-Peri Wings', 'Charred Herb Paneer Steaks', 'Seekh Kebab Skewers'],
      mains: ['Slow-Smoked Herb Lamb Chops', 'Fire-Roasted Sweet Corn', 'Garlic Butter Pita'],
      theatre: 'Live Master Pitmaster Charcoal Grill & Smoker Pit',
      dessert: 'Charred Cinnamon Pineapple with Artisan Mocktail Lounge'
    }
  },
  {
    id: 'vegan',
    name: 'Vegan & Wellness',
    tagline: 'Conscious Plant-Based Luxury & Organic Superfoods',
    category: 'Wellness',
    ratePerHead: 550,
    minGuests: 30,
    badge: 'Clean Gourmet',
    courses: {
      appetizers: ['Avocado Nori Rice Rolls', 'Edamame Truffle Hummus', 'Quinoa Falafel'],
      mains: ['Lemongrass Thai Green Curry', 'Wild Rice Buddha Bowl', 'Jackfruit Carnitas'],
      theatre: 'Cold-Pressed Botanical Elixir & Microgreen Salad Bar',
      dessert: 'Raw Organic Cacao Silk Tart with Wild Berry Coulis'
    }
  }
];

interface MenuShowcaseProps {
  onSelectMenu: (menuName: string, rate: number) => void;
}

export const MenuShowcase: React.FC<MenuShowcaseProps> = ({ onSelectMenu }) => {
  const [filter, setFilter] = useState<'All' | 'Heritage' | 'Western' | 'Asian' | 'Live Fire'>('All');

  const filteredMenus = filter === 'All' 
    ? MENU_PACKAGES 
    : MENU_PACKAGES.filter(m => m.category === filter);

  return (
    <section id="menus" className="py-24 relative z-10 border-t border-white/5 bg-noir-900/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-3">
              Curated Culinary Atelier
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif text-stone-100 leading-tight">
              Six Distinct Visions of <br />
              <span className="italic font-normal gold-gradient-text">Gastronomic Prestige.</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {(['All', 'Heritage', 'Western', 'Asian', 'Live Fire'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all whitespace-nowrap ${
                  filter === tab
                    ? 'bg-gold-400 text-noir-950 font-bold shadow-gold-glow'
                    : 'bg-noir-800 text-stone-400 hover:text-stone-200 border border-white/5 hover:border-gold-400/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenus.map((pkg) => (
            <motion.div
              key={pkg.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group rounded-2xl bg-gradient-to-b from-noir-800/90 to-noir-900/90 border border-gold-400/15 hover:border-gold-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-luxe hover:-translate-y-1.5"
            >
              {/* Card Header */}
              <div className="p-7 pb-5 border-b border-white/5 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-gold-400/10 text-gold-300 border border-gold-400/20 font-semibold">
                    {pkg.badge}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    Min {pkg.minGuests} Guests
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-100 group-hover:text-gold-300 transition-colors mb-1">
                  {pkg.name}
                </h3>
                <p className="text-xs text-stone-400 font-light italic">
                  {pkg.tagline}
                </p>
              </div>

              {/* Course Highlights */}
              <div className="p-7 pt-5 space-y-4 flex-1">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gold-400/80 font-semibold block mb-1.5">
                    Signature Mains
                  </span>
                  <ul className="space-y-1.5">
                    {pkg.courses.mains.map((item, idx) => (
                      <li key={idx} className="text-xs text-stone-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <span className="text-[11px] uppercase tracking-wider text-gold-400/80 font-semibold block mb-1">
                    Live Culinary Theatre
                  </span>
                  <p className="text-xs text-stone-300 font-light flex items-center gap-2">
                    <Utensils className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>{pkg.courses.theatre}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <span className="text-[11px] uppercase tracking-wider text-gold-400/80 font-semibold block mb-1">
                    Grand Finale
                  </span>
                  <p className="text-xs text-stone-400 italic">
                    {pkg.courses.dessert}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-7 pt-4 border-t border-white/5 bg-noir-950/40 flex items-center justify-between">
                <div>
                  <div className="font-serif text-2xl font-bold text-stone-100">
                    &#8377;{pkg.ratePerHead}
                  </div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">
                    Per Plate All-Inclusive
                  </div>
                </div>

                <button
                  onClick={() => onSelectMenu(pkg.name, pkg.ratePerHead)}
                  className="px-4 py-2.5 rounded-full bg-gold-400/15 hover:bg-gold-400 text-gold-300 hover:text-noir-950 border border-gold-400/30 hover:border-transparent font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 group-hover:scale-105"
                >
                  <span>Select &amp; Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
