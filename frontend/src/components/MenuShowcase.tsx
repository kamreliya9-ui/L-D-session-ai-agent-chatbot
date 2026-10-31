import React, { useState } from 'react';
import { ArrowRight, Utensils, Sparkles } from 'lucide-react';

export interface MenuPackageData {
  id: string;
  name: string;
  tagline: string;
  category: string;
  ratePerHead: number;
  minGuests: number;
  image: string;
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
    name: 'Royal Awadhi & Mughlai',
    tagline: 'Imperial Dastarkhwan & Heritage Slow-Cooked Banqueting',
    category: 'Heritage',
    ratePerHead: 500,
    minGuests: 100,
    badge: 'Signature Wedding',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop',
    courses: {
      appetizers: ['Smoked Galouti Kebab on Sheermal', 'Tandoori Saffron Malai Broccoli', 'Paneer Tikka Angara'],
      mains: ['24-Hour Awadhi Dum Gosht Biryani', 'Classic Murgh Makhani', 'Dal Bukhara Slow-Simmered for 36 Hours'],
      theatre: 'Old Delhi Chandni Chowk Live Puchka & Chaat Courtyard',
      dessert: 'Shahi Saffron Kulfi Sphere with Warm Malpua & Rabri'
    }
  },
  {
    id: 'continental',
    name: 'Continental French Haute',
    tagline: 'Contemporary European Fine Plating & French Techniques',
    category: 'Continental',
    ratePerHead: 650,
    minGuests: 50,
    badge: 'Presidential Gala',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
    courses: {
      appetizers: ['Wild Mushroom & Black Truffle Arancini', 'Pan-Seared Scallops / Hearts of Palm', 'Heirloom Burrata Crostini'],
      mains: ['Sous-Vide Herb Tenderloin / Truffle Polenta', 'Chilean Sea Bass with Lemon Beurre Blanc', 'Roasted Baby Root Vegetables'],
      theatre: 'Flaming Grand Marnier Crepe Suzette Tableside Stage',
      dessert: 'Belgian Valrhona Dark Chocolate Marquise with Berry Gold Dust'
    }
  },
  {
    id: 'asian',
    name: 'Imperial Cantonese & Dim Sum',
    tagline: 'Authentic Wok Mastery, Handcrafted Dim Sum & Robata Grills',
    category: 'Cantonese',
    ratePerHead: 450,
    minGuests: 80,
    badge: 'Soirée Favorite',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop',
    courses: {
      appetizers: ['Steamed Truffle Edamame Dumplings', 'Crispy Prawn Cheung Fun', 'Chicken Basil Sui Mai'],
      mains: ['Sichuan Claypot Stone Rice', 'Crispy Silken Tofu in XO Sauce', 'Wok-Tossed Asparagus & Water Chestnuts'],
      theatre: 'Live Master Dim Sum Steam Baskets & Bao Bar',
      dessert: 'Warm Matcha Fondant & Chilled Mango Sago Pomelo'
    }
  },
  {
    id: 'coastal',
    name: 'Coastal Chettinad & Malabar',
    tagline: 'Traditional Stone-Ground Spices & Coastal Seafood Heritage',
    category: 'Heritage',
    ratePerHead: 350,
    minGuests: 60,
    badge: 'Culinary Heritage',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop',
    courses: {
      appetizers: ['Kozhi Varuval Crispy Pepper Chicken', 'Malabar Meen Pollichathu in Banana Leaf', 'Vazhaipoo Vadai'],
      mains: ['Chettinad Pepper Mutton Gravy', 'Alleppey Fish Curry with Kokum', 'Layered Flaky Malabar Parotta'],
      theatre: 'Live Fluffy Appam & Stew Theatre with Fresh Coconut Milk',
      dessert: 'Elaneer Payasam (Tender Coconut Kheer) with Roasted Cashews'
    }
  },
  {
    id: 'bbq',
    name: 'Live Fire Smokehouse & BBQ',
    tagline: 'Wood-Fired Oak Grills, Artisanal Skewers & Gourmet Breads',
    category: 'Live Fire',
    ratePerHead: 750,
    minGuests: 40,
    badge: 'High Impact',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
    courses: {
      appetizers: ['Smoked Peri-Peri Glazed Skewers', 'Charred Herb Halloumi Steaks', 'Pork/Lamb Seekh on Cinnamon Sticks'],
      mains: ['Slow-Smoked Herb Lamb Chops', 'Fire-Roasted Sweet Corn with Herb Butter', 'Warm Garlic Pita & Tzatziki'],
      theatre: 'Live Master Pitmaster Charcoal Grill & Texas Smoke Pit',
      dessert: 'Charred Spiced Pineapple with Artisan Smoked Honey Gelato'
    }
  },
  {
    id: 'vegan',
    name: 'Conscious Plant-Based Luxury',
    tagline: 'Superfood Nutrition, Clean Gourmet & Zero-Waste Artistry',
    category: 'Wellness',
    ratePerHead: 550,
    minGuests: 30,
    badge: 'Clean Gourmet',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    courses: {
      appetizers: ['Avocado Nori Crispy Rice Rolls', 'Smoked Beetroot Carpaccio', 'Truffle-Infused Cashew Crostini'],
      mains: ['Wild Morel Thai Botanical Curry', 'Black Quinoa Buddha Bowl with Tahini Glaze', 'Jackfruit Confit Carnitas'],
      theatre: 'Cold-Pressed Botanical Elixir & Microgreen Salad Bar',
      dessert: 'Raw Organic Cacao Silk Tart with Wild Berry Reduction'
    }
  }
];

interface MenuShowcaseProps {
  onSelectMenu: (menuName: string, rate: number) => void;
}

export const MenuShowcase: React.FC<MenuShowcaseProps> = ({ onSelectMenu }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Heritage', 'Continental', 'Cantonese', 'Live Fire', 'Wellness'];

  const filteredMenus = activeCategory === 'All'
    ? MENU_PACKAGES
    : MENU_PACKAGES.filter((m) => m.category === activeCategory);

  return (
    <section id="menus" className="py-24 sm:py-32 bg-ivory text-espresso border-b border-beige/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-mono block mb-2">
              Curated Collections • Season 2026
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-espresso leading-tight">
              Six signature menus, <br />
              <span className="italic font-normal text-gold">bound by culinary pedigree.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-taupe font-light max-w-md">
            Each collection is customized to your venue, timeline, and dietary preferences. Select any collection to configure your commission quote in real time.
          </p>
        </div>

        {/* Minimal Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-beige/50 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs uppercase tracking-[0.16em] px-4 py-2 rounded-sm transition-all whitespace-nowrap font-medium ${
                activeCategory === cat
                  ? 'bg-espresso text-ivory'
                  : 'text-taupe hover:text-espresso bg-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetrical Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredMenus.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-ivory-light border border-beige hover:border-gold/60 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-elevated group"
            >
              <div>
                {/* Image Aspect Box */}
                <div className="aspect-[16/10] overflow-hidden relative bg-champagne">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                  />
                  <div className="absolute top-3 left-3 bg-ivory/90 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-wider font-mono text-espresso border border-beige/60">
                    {pkg.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-espresso/90 text-ivory px-3 py-1 text-xs font-mono">
                    ₹{pkg.ratePerHead} <span className="text-[10px] text-taupe-light">/ head</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="text-[10px] uppercase tracking-widest text-gold font-mono mb-1">
                    {pkg.category} Atelier
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-espresso mb-2 group-hover:text-gold transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-taupe font-light mb-6 line-clamp-2">
                    {pkg.tagline}
                  </p>

                  {/* Course Details */}
                  <div className="space-y-3.5 text-xs border-t border-beige/60 pt-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-taupe block">
                        Appetizers (Sample)
                      </span>
                      <p className="text-espresso font-light mt-0.5 line-clamp-1">
                        {pkg.courses.appetizers.join(' • ')}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-taupe block">
                        Main Courses
                      </span>
                      <p className="text-espresso font-light mt-0.5 line-clamp-1">
                        {pkg.courses.mains.join(' • ')}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-gold block">
                        Interactive Theatre
                      </span>
                      <p className="text-espresso font-light mt-0.5 text-[11px]">
                        {pkg.courses.theatre}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 border-t border-beige/40">
                <button
                  onClick={() => onSelectMenu(pkg.name, pkg.ratePerHead)}
                  className="w-full mt-4 py-2.5 rounded-sm border border-espresso hover:bg-espresso hover:text-ivory text-espresso text-[11px] uppercase tracking-[0.16em] font-medium transition-all flex items-center justify-center gap-2 group-hover:bg-espresso group-hover:text-ivory"
                >
                  <span>Configure Commission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
