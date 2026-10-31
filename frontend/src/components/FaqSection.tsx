import React, { useState } from 'react';
import { ChevronDown, Database, Calculator, Sparkles, UtensilsCrossed } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: 'Data Governance',
      question: 'Where is client inquiry and confirmed banquet data stored?',
      answer:
        'All client orders, guest volumes, dietary specifications, and financial totals are securely persisted in our Java Spring Boot backend within a local embedded H2 SQL database located at ./backend/data/jucasdb.mv.db. Data is preserved across server restarts and directly auditable via our live Admin Registry Console.',
    },
    {
      category: 'Commercial Logic',
      question: 'How do volume tiers and promotional vouchers calculate final quotes?',
      answer:
        'Our Spring Boot pricing engine (/api/pricing/calculate) applies automatic tiered discounts based on guest attendance: 5% off for 100+ guests, 10% off for 250+ guests, and 15% off for grand gatherings of 500+ guests. Furthermore, VIP promo codes (such as JUCAS2026) unlock an additional 5% courtesy allowance.',
    },
    {
      category: 'AI Concierge',
      question: 'How does the Groq AI Sommelier & Banquet Concierge assist with planning?',
      answer:
        'Our concierge agent is powered by Groq ultra-low-latency inference running qwen/qwen3.8-27b via an intelligent Spring Boot pipeline. The agent analyzes your event theme, guest demographics, budget per head, and dietary constraints to engineer bespoke menu pairing recommendations and instantly register orders into the database.',
    },
    {
      category: 'Artisanal Tasting',
      question: 'Can we experience a private chef tasting before finalizing our commission?',
      answer:
        'Yes. We host private, multi-course chef tastings for up to six decision-makers at our culinary atelier or in the privacy of your residence. Tastings feature the exact chinaware, glassware, and signature plating designed for your soirée.',
    },
    {
      category: 'Dietary Purity',
      question: 'What protocols exist for strictly Jain, Vegan, and allergen-sensitive guests?',
      answer:
        'We operate strictly segregated production lines with dedicated master chefs for Sattvic, Jain (root-vegetable free), Vegan, Halal, and Celiac gluten-free requirements. Every serving station is color-coded and supervised by an allergen safety captain.',
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 bg-champagne-light text-espresso border-b border-beige">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-mono block mb-2">
            Governance & Operational Clarity
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-espresso leading-tight">
            Frequently Asked <span className="italic font-normal text-gold">Questions</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-taupe font-light">
            Everything you need to know about our atelier standards, automated pricing engine, and persistent database.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-ivory border border-beige rounded-sm transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left gap-4 hover:bg-champagne/20 transition-colors"
                >
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold block mb-1">
                      {faq.category}
                    </span>
                    <span className="font-serif text-lg sm:text-xl font-normal text-espresso">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-taupe transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-gold' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-xs sm:text-sm text-taupe font-light leading-relaxed border-t border-beige/60">
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
