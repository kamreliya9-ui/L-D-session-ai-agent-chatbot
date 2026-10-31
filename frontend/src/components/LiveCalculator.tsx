import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Sparkles, Check, Tag, ShieldAlert } from 'lucide-react';
import { ApiService, PricingResponse } from '../services/api';

const AVAILABLE_ADDONS = [
  { name: 'Welcome Drinks', rate: 80, desc: 'Artisanal mocktails & infused coolers' },
  { name: 'Dessert Counter', rate: 120, desc: 'Live flambé, nitrogen & artisanal sweets' },
  { name: 'Live Pasta', rate: 100, desc: 'Chef-tossed handmade fettuccine & penne' },
  { name: 'Mocktail Bar', rate: 150, desc: 'Master mixologist bar with dry ice garnish' },
];

interface LiveCalculatorProps {
  initialPackage?: string;
  onBookWithQuote: (quote: PricingResponse) => void;
}

export const LiveCalculator: React.FC<LiveCalculatorProps> = ({
  initialPackage = 'Royal Indian Feast',
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
        if (!cancelled) {
          setQuote(res);
          setLoading(false);
        }
      } catch (err) {
        console.error('Pricing error:', err);
        if (!cancelled) setLoading(false);
      }
    }, 150);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [selectedPkg, guests, selectedAddons, appliedPromo]);

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedPromo(promoCode.trim());
  };

  return (
    <section id="estimator" className="py-24 relative z-10 bg-noir-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-gold-400" />
            <span>Spring Boot 3.3 Dynamic Decision Engine</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-stone-100 leading-tight mb-4">
            Interactive Banquet <br />
            <span className="italic font-normal gold-gradient-text">Quotation &amp; Discount Engine.</span>
          </h2>
          <p className="text-stone-300 text-base font-light leading-relaxed">
            Adjust guest sizes and artisanal stations. Our Spring Boot decision rules automatically calculate tiered volume incentives, seasonal vouchers, and final cost breakdowns.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-noir-900/70 p-8 sm:p-10 rounded-3xl border border-gold-400/15 shadow-luxe backdrop-blur-md">
            {/* Step 1: Package Selection */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400 block mb-3">
                1. Select Culinary Collection
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { name: 'Royal Indian Feast', rate: 500 },
                  { name: 'Continental Elegance', rate: 650 },
                  { name: 'Chinese Fiesta', rate: 450 },
                  { name: 'South Indian Delight', rate: 350 },
                  { name: 'Live BBQ & Grill', rate: 750 },
                  { name: 'Vegan & Wellness', rate: 550 },
                ].map(pkg => (
                  <button
                    key={pkg.name}
                    type="button"
                    onClick={() => setSelectedPkg(pkg.name)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedPkg === pkg.name
                        ? 'bg-gold-400/15 border-gold-400 text-stone-100 shadow-gold-glow'
                        : 'bg-noir-800/80 border-white/5 text-stone-400 hover:text-stone-200 hover:border-gold-400/20'
                    }`}
                  >
                    <div className="font-serif font-bold text-sm text-stone-100 truncate">
                      {pkg.name}
                    </div>
                    <div className="text-[11px] text-gold-400 mt-0.5">
                      &#8377;{pkg.rate} / head
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Guest Count Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400">
                  2. Guest Sizing
                </label>
                <div className="font-serif text-2xl font-bold text-stone-100">
                  {guests} <span className="text-xs uppercase tracking-wider text-stone-400 font-sans">Guests</span>
                </div>
              </div>

              <input
                type="range"
                min={30}
                max={1000}
                step={10}
                value={guests}
                onChange={e => setGuests(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-noir-750 appearance-none cursor-pointer accent-gold-400 mb-3"
              />

              {/* Tier Indicators */}
              <div className="flex justify-between text-[11px] text-stone-400 border-t border-white/5 pt-2">
                <span>30 Min</span>
                <span className={guests >= 100 ? 'text-gold-300 font-semibold' : ''}>
                  100+ (5% Off)
                </span>
                <span className={guests >= 250 ? 'text-amber-400 font-semibold' : ''}>
                  250+ (10% Off)
                </span>
                <span className={guests >= 500 ? 'text-emerald-400 font-semibold' : ''}>
                  500+ (15% VIP)
                </span>
                <span>1,000</span>
              </div>
            </div>

            {/* Step 3: Add-on Live Stations */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400 block mb-3">
                3. Bespoke Add-on Stations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AVAILABLE_ADDONS.map(addon => {
                  const active = selectedAddons.includes(addon.name);
                  return (
                    <button
                      key={addon.name}
                      type="button"
                      onClick={() => toggleAddon(addon.name)}
                      className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        active
                          ? 'bg-gold-400/15 border-gold-400/80 text-stone-100'
                          : 'bg-noir-800/60 border-white/5 text-stone-400 hover:border-white/15'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-all ${
                          active
                            ? 'bg-gold-400 border-gold-400 text-noir-950'
                            : 'border-stone-500'
                        }`}
                      >
                        {active && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-stone-200">
                          {addon.name} <span className="text-gold-400">+&#8377;{addon.rate}/head</span>
                        </div>
                        <div className="text-[11px] text-stone-400 mt-0.5">
                          {addon.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Promotional Code */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400 block mb-2">
                4. Privilege Code
              </label>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="Try JUCAS2026 or SATURDAY"
                    className="w-full bg-noir-800 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-gold-400/60 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gold-400/20 hover:bg-gold-400 text-gold-300 hover:text-noir-950 border border-gold-400/40 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>

          {/* Breakdown Card Column (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl bg-gradient-to-b from-noir-800 to-noir-900 border border-gold-400/30 p-8 sm:p-9 shadow-luxe relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 block font-semibold">
                    Real-time Estimate
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-100">
                    Banqueting Quote
                  </h3>
                </div>
                {loading && (
                  <span className="text-xs text-gold-400 animate-pulse flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Calculating...
                  </span>
                )}
              </div>

              {quote && (
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between items-center text-stone-300">
                    <span>Base Package ({quote.menuName})</span>
                    <span className="font-medium text-stone-100">
                      &#8377;{quote.basePricePerHead} &times; {quote.guests}
                    </span>
                  </div>

                  {quote.addOnsPricePerHead > 0 && (
                    <div className="flex justify-between items-center text-stone-300">
                      <span>Add-on Live Stations</span>
                      <span className="font-medium text-stone-100">
                        +&#8377;{quote.addOnsPricePerHead} / head
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-stone-300 pt-2 border-t border-white/5">
                    <span>Gross Subtotal</span>
                    <span className="font-medium text-stone-100">
                      &#8377;{quote.subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Discount Callout */}
                  <AnimatePresence>
                    {quote.discountAmount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 space-y-1"
                      >
                        <div className="flex justify-between font-semibold">
                          <span>Volume &amp; Privilege Savings ({quote.discountPercentage}%)</span>
                          <span>-&#8377;{quote.discountAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-[10px] text-emerald-400/80 leading-snug">
                          {quote.discountReason}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Final Total Box */}
                  <div className="pt-6 border-t border-gold-400/20 mt-6">
                    <div className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                      All-Inclusive Estimated Investment
                    </div>
                    <div className="font-serif text-4xl sm:text-5xl font-bold gold-gradient-text my-1.5">
                      &#8377;{quote.finalTotal.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-stone-400 flex items-center justify-between">
                      <span>Effective Per-Plate Investment:</span>
                      <strong className="text-gold-300 text-sm font-serif">
                        &#8377;{quote.effectivePricePerHead} / guest
                      </strong>
                    </div>
                  </div>

                  {/* Confirmation CTA */}
                  <button
                    onClick={() => onBookWithQuote(quote)}
                    className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 text-noir-950 font-bold text-xs uppercase tracking-[0.18em] shadow-gold-glow hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-noir-950" />
                    <span>Reserve Quote with Concierge</span>
                  </button>

                  <div className="text-[10px] text-stone-500 text-center flex items-center justify-center gap-1.5 pt-2">
                    <ShieldAlert className="w-3 h-3 text-stone-500" />
                    <span>Final quotation subject to bespoke tasting &amp; venue review.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
