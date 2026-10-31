import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Database, Calculator, Sparkles, UtensilsCrossed } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
  icon: React.ElementType;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: 'Database & Security',
      icon: Database,
      question: 'Where is client inquiry and confirmed banquet data stored?',
      answer:
        'All client orders, guest volumes, dietary specifications, and financial totals are securely persisted in our Java Spring Boot backend within a local embedded H2 SQL database located at `./backend/data/jucasdb.mv.db`. Data is preserved across server restarts and accessible via our live Admin Order Console.',
    },
    {
      category: 'Dynamic Pricing',
      icon: Calculator,
      question: 'How do volume tiers and promotional vouchers calculate final quotes?',
      answer:
        'Our Spring Boot pricing engine (`/api/pricing/calculate`) applies automatic tiered discounts based on guest attendance: 5% off for 100+ guests, 10% off for 250+ guests, and 15% off for grand gatherings of 500+ guests. Furthermore, VIP promo codes (such as JUCAS2026) unlock an additional 5% courtesy allowance.',
    },
    {
      category: 'AI Sommelier',
      icon: Sparkles,
      question: 'How does the Groq AI Sommelier & Banquet Concierge assist with planning?',
      answer:
        'Our concierge agent is powered by Groq ultra-low-latency inference running `qwen/qwen3.8-27b` via an intelligent Spring Boot pipeline. The agent analyzes your event theme, guest demographics, budget per head, and dietary constraints to engineer bespoke menu pairing recommendations and instantly register orders into the database.',
    },
    {
      category: 'Artisanal Tasting',
      icon: UtensilsCrossed,
      question: 'Can we experience a private chef tasting before finalizing our commission?',
      answer:
        'Yes. We host private, multi-course chef tastings for up to six decision-makers at our culinary atelier or in the privacy of your residence. Tastings feature the exact chinaware, glassware, and signature plating designed for your soirée.',
    },
    {
      category: 'Dietary Purity',
      icon: Sparkles,
      question: 'What protocols exist for strictly Jain, Vegan, and allergen-sensitive guests?',
      answer:
        'We operate strictly segregated production lines with dedicated master chefs for Sattvic, Jain (root-vegetable free), Vegan, Halal, and Celiac gluten-free requirements. Every serving station is color-coded and supervised by an allergen safety captain.',
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 bg-noir-950 relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-mono uppercase tracking-[0.25em] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-gold-400" />
            Clarity & Governance
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 tracking-tight">
            Frequently Asked{' '}
            <span className="italic font-normal text-gold-300">Questions</span>
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base font-light">
            Everything you need to know about our atelier standards, automated pricing engine, and persistent booking architecture.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;
            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-noir-900/90 border-gold-400/40 shadow-gold-glow'
                    : 'bg-noir-900/40 border-white/5 hover:border-gold-400/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isOpen
                          ? 'bg-gold-400/20 text-gold-300 border border-gold-400/30'
                          : 'bg-white/5 text-stone-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400/70 block mb-0.5">
                        {faq.category}
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-normal text-stone-100">
                        {faq.question}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gold-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-stone-400 text-sm sm:text-base font-light leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
