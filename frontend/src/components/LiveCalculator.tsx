import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, Check, Tag, ShieldCheck, ArrowRight } from 'lucide-react';
import { ApiService, PricingResponse } from '../services/api';

const AVAILABLE_ADDONS = [
  { name: 'Welcome Drinks', rate: 80, desc: 'Artisanal cold-pressed coolers & botanical elixirs' },
  { name: 'Dessert Counter', rate: 120, desc: 'Live flambé, liquid nitrogen sorbet & warm malpua' },
  { name: 'Live Pasta', rate: 100, desc: 'Chef-tossed handmade fettuccine in 36-mo Reggiano wheel' },
  { name: 'Mocktail Bar', rate: 150, desc: 'Mixologist lounge with dry ice, smoked botanicals & crystal' },
];

interface LiveCalculatorProps {
  initialPackage?: string;
  onBookWithQuote: (quote: PricingResponse) => void;
}

export const LiveCalculator: React.FC<LiveCalculatorProps> = ({
  initialPackage = 'Royal Awadhi & Mughlai',
  onBookWithQuote,
}) => {
  const [selectedPkg, setSelectedPkg] = useState<string>(initialPackage);
  const [guests, setGuests] = useState<number>(250);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['Welcome Drinks']);
  const [promoCode, setPromoCode] = useState<string>('JUCAS2026');
  const [appliedPromo, setAppliedPromo] = useState<string>('JUCAS2026');
  const [quote, setQuote] = useState<PricingResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initialPackage) setSelectedPkg(initialPackage);
  }, [initialPackage]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const res = await ApiService.calculatePricing({
          menuName: selectedPkg,
          guests,
          addOns: selectedAddons,
          promoCode: appliedPromo,
        });
        if (!cancelled) setQuote(res);
      } catch (err) {
        console.warn('Calculation error, fallback active', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 180);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [selectedPkg, guests, selectedAddons, appliedPromo]);

  const toggleAddon = (name: string) => {
    setSelectedAddons((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedPromo(promoCode.trim().toUpperCase());
  };

  return (
    <section id="estimator" className="py-24 sm:py-32 bg-champagne-light text-espresso border-b border-beige">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-mono block mb-2">
            Dynamic Commission Calculator • Spring Boot API
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-espresso leading-tight">
            Transparent banquet economics, <br />
            <span className="italic font-normal text-gold">tailored to your scale.</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-taupe font-light leading-relaxed">
            Adjust guest volume to witness tiered bulk allowances automatically applied by our backend decision engine. Real-time mathematical precision without negotiation friction.
          </p>
        </div>

        {/* 2-Column Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-ivory p-8 sm:p-10 rounded-sm border border-beige shadow-subtle">
            {/* Menu Selection */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] text-taupe font-medium mb-3">
                1. Select Culinary Collection
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Royal Awadhi & Mughlai',
                  'Continental French Haute',
                  'Imperial Cantonese & Dim Sum',
                  'Coastal Chettinad & Malabar',
                  'Live Fire Smokehouse & BBQ',
                  'Conscious Plant-Based Luxury',
                ].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setSelectedPkg(name)}
                    className={`p-3.5 text-left rounded-sm border text-xs font-medium transition-all ${
                      selectedPkg === name
                        ? 'bg-champagne/60 border-espresso text-espresso shadow-xs'
                        : 'bg-ivory border-beige/80 text-taupe hover:text-espresso hover:border-beige'
                    }`}
                  >
                    <div className="font-serif text-sm text-espresso">{name}</div>
                    <div className="text-[10px] text-gold mt-0.5">
                      {name.includes('Continental') ? '₹650/head' : name.includes('BBQ') ? '₹750/head' : name.includes('Coastal') ? '₹350/head' : '₹500/head'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Attendance Slider */}
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-[11px] uppercase tracking-[0.16em] text-taupe font-medium">
                  2. Guest Attendance
                </label>
                <div className="font-serif text-2xl font-light text-espresso">
                  {guests} <span className="text-xs font-sans text-taupe font-light">Patrons</span>
                </div>
              </div>
              <input
                type="range"
                min="30"
                max="1000"
                step="10"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full h-1.5 bg-beige rounded-lg appearance-none cursor-pointer accent-espresso"
              />
              <div className="flex justify-between text-[10px] text-taupe font-mono mt-2">
                <span>30 (Intimate)</span>
                <span className="text-gold font-medium">100+ (5% Vol)</span>
                <span className="text-gold font-medium">250+ (10% Vol)</span>
                <span className="text-gold font-medium">500+ (15% Vol)</span>
                <span>1,000+ (Sovereign)</span>
              </div>
            </div>

            {/* Addon Interactive Theatres */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] text-taupe font-medium mb-3">
                3. Theatrical Add-on Stations
              </label>
              <div className="space-y-2.5">
                {AVAILABLE_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <div
                      key={addon.name}
                      onClick={() => toggleAddon(addon.name)}
                      className={`p-3.5 rounded-sm border cursor-pointer flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-champagne/40 border-espresso/80 text-espresso'
                          : 'bg-ivory border-beige/60 text-taupe hover:border-beige'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-espresso border-espresso text-ivory' : 'border-beige bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 text-gold" />}
                        </div>
                        <div>
                          <span className="font-serif text-sm font-normal text-espresso block">
                            {addon.name}
                          </span>
                          <span className="text-[11px] text-taupe font-light">
                            {addon.desc}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-medium text-espresso shrink-0">
                        +₹{addon.rate}/head
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Promo Voucher Code */}
            <form onSubmit={handleApplyPromo} className="pt-2">
              <label className="block text-[11px] uppercase tracking-[0.16em] text-taupe font-medium mb-2">
                4. Courtesy Voucher Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. JUCAS2026, SATURDAY"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2 bg-ivory-light border border-beige rounded-sm text-xs text-espresso placeholder-taupe/60 focus:outline-none focus:border-espresso"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-sm bg-espresso text-ivory hover:bg-espresso-charcoal text-xs uppercase tracking-wider font-medium transition-colors"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>

          {/* Real-Time Live Quote Ledger */}
          <div className="lg:col-span-5 bg-espresso text-ivory p-8 sm:p-10 rounded-sm border border-espresso-surface shadow-elevated flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-espresso-surface pb-4 mb-6">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-gold font-mono block">
                    Automated Commission Ledger
                  </span>
                  <h3 className="font-serif text-2xl text-ivory font-light mt-0.5">
                    {quote?.menuName || selectedPkg}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-sm border border-gold/40 flex items-center justify-center text-gold">
                  <Calculator className="w-4 h-4" />
                </div>
              </div>

              {/* Breakdown lines */}
              <div className="space-y-3.5 text-xs font-light">
                <div className="flex justify-between text-taupe-light">
                  <span>Guest Headcount:</span>
                  <span className="text-ivory font-mono">{quote?.guests || guests} Guests</span>
                </div>
                <div className="flex justify-between text-taupe-light">
                  <span>Base Culinary Rate:</span>
                  <span className="text-ivory font-mono">₹{quote?.basePricePerHead || 500}/head</span>
                </div>
                <div className="flex justify-between text-taupe-light">
                  <span>Add-on Stations Rate:</span>
                  <span className="text-ivory font-mono">₹{quote?.addOnsPricePerHead || 80}/head</span>
                </div>
                <div className="flex justify-between text-taupe-light">
                  <span>Gross Investment:</span>
                  <span className="text-ivory font-mono">
                    ₹{Number(quote?.subtotal || 145000).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Discount Banner */}
                {quote && quote.discountPercentage > 0 && (
                  <div className="p-3.5 rounded-sm bg-espresso-surface border border-gold/30 space-y-1">
                    <div className="flex justify-between text-gold text-xs font-medium">
                      <span>Volume & Promo Allowance:</span>
                      <span>-{quote.discountPercentage}% Off</span>
                    </div>
                    <div className="text-[11px] text-taupe-light">
                      Saved: ₹{Number(quote.discountAmount).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-gold/80 italic font-light pt-1">
                      {quote.discountReason}
                    </div>
                  </div>
                )}
              </div>

              {/* Total Callout */}
              <div className="mt-8 pt-6 border-t border-espresso-surface flex items-baseline justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-taupe-light block font-mono">
                    Net Investment Total
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl text-ivory font-light mt-1">
                    ₹{Number(quote?.finalTotal || 137750).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-taupe-light block font-mono">
                    Effective / Head
                  </span>
                  <span className="font-serif text-xl text-gold font-light">
                    ₹{quote?.effectivePricePerHead || 551}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 pt-6 border-t border-espresso-surface space-y-3">
              <button
                type="button"
                onClick={() => quote && onBookWithQuote(quote)}
                className="w-full py-3.5 rounded-sm bg-gradient-gold text-espresso text-xs uppercase tracking-[0.2em] font-semibold hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-subtle"
              >
                <span>Reserve Commission with This Quote</span>
                <ArrowRight className="w-4 h-4 text-espresso" />
              </button>
              <p className="text-[10px] text-center text-taupe-light font-mono">
                Direct H2 SQL allocation • Guaranteed date hold
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
