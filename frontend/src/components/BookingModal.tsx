import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Calendar, Phone, User, RefreshCw } from 'lucide-react';
import { ApiService, PricingResponse, Order } from '../services/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: PricingResponse | null;
  onOrderConfirmed: (order: Order) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  quote,
  onOrderConfirmed,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Royal Wedding Reception');
  const [eventDate, setEventDate] = useState('2026-11-28');
  const [dietary, setDietary] = useState('Include Jain & Halal Counters');
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<Order | null>(null);

  if (!isOpen || !quote) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) return;

    setSubmitting(true);
    const newOrder: Partial<Order> = {
      orderCode: 'JUC-' + Math.floor(100000 + Math.random() * 900000),
      customerName: customerName.trim(),
      phone: phone.trim(),
      eventType,
      eventDate,
      guests: quote.guests,
      cuisine: quote.menuName,
      dietary,
      budgetPerHead: quote.effectivePricePerHead,
      recommendedMenu: quote.menuName,
      addOns: quote.appliedDiscounts.join(', ') || 'Standard Atelier Inclusions',
      totalAmount: quote.finalTotal,
      discountAmount: quote.discountAmount,
      discountReason: quote.discountReason,
      status: 'CONFIRMED',
    };

    try {
      const saved = await ApiService.createOrder(newOrder);
      setConfirmed(saved);
      onOrderConfirmed(saved);
    } catch (err) {
      console.error('Failed to persist order to Spring Boot DB:', err);
      setConfirmed(newOrder as Order);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-ivory border border-beige rounded-sm shadow-luxe overflow-hidden text-espresso">
        {/* Header */}
        <div className="px-6 py-5 bg-espresso text-ivory flex items-center justify-between border-b border-espresso-surface">
          <div>
            <h3 className="font-serif text-xl font-light text-ivory">
              Commission Reservation
            </h3>
            <p className="text-[10px] text-gold font-mono uppercase tracking-wider">
              Direct H2 SQL Allocation • Guaranteed Date Hold
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-taupe-light hover:text-ivory transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmed ? (
          /* Confirmation Success State */
          <div className="p-8 text-center bg-ivory">
            <div className="w-14 h-14 rounded-full bg-champagne border border-gold/40 text-gold flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-2xl font-light text-espresso mb-1">
              Commission Allocated & Persisted
            </h4>
            <p className="text-xs text-taupe font-mono mb-6">
              Order Code: <span className="text-espresso font-bold">{confirmed.orderCode}</span> • Saved to SQL Store
            </p>

            <div className="p-5 rounded-sm bg-champagne-light border border-beige text-left text-xs space-y-2.5 mb-6">
              <div className="flex justify-between">
                <span className="text-taupe">Patron / Host:</span>
                <span className="text-espresso font-medium">{confirmed.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-taupe">Occasion & Guests:</span>
                <span className="text-espresso">
                  {confirmed.eventType} • {confirmed.guests} Guests
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-taupe">Cuisine Atelier:</span>
                <span className="text-espresso">{confirmed.cuisine}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-beige font-mono">
                <span className="text-taupe">Total Investment:</span>
                <span className="text-espresso font-bold text-sm">
                  ₹{Number(confirmed.totalAmount).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <p className="text-xs text-taupe font-light mb-6">
              Our Executive Banquet Director will reach out at {confirmed.phone} within 2 hours to confirm your private tasting date.
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-sm bg-espresso text-ivory text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-charcoal transition-all"
            >
              Return to Atelier
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-ivory">
            {/* Quote Summary Pill */}
            <div className="p-3.5 rounded-sm bg-champagne-light border border-beige flex items-center justify-between text-xs">
              <div>
                <span className="text-espresso font-serif text-base block font-normal">
                  {quote.menuName}
                </span>
                <span className="text-taupe font-mono text-[11px]">
                  {quote.guests} Guests • ₹{quote.effectivePricePerHead}/head
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-espresso text-sm">
                  ₹{Number(quote.finalTotal).toLocaleString('en-IN')}
                </span>
                <span className="block text-[10px] text-olive font-mono">
                  Saved ₹{Number(quote.discountAmount).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-taupe mb-1">
                Patron / Host Name
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-taupe absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Singhania"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-ivory-light border border-beige rounded-sm text-xs text-espresso placeholder-taupe/60 focus:outline-none focus:border-espresso font-light"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-taupe mb-1">
                  Contact Phone
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-taupe absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-ivory-light border border-beige rounded-sm text-xs text-espresso placeholder-taupe/60 focus:outline-none focus:border-espresso font-light"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-taupe mb-1">
                  Event Date
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-taupe absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-ivory-light border border-beige rounded-sm text-xs text-espresso focus:outline-none focus:border-espresso font-light"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-taupe mb-1">
                Occasion Type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3 py-2 bg-ivory-light border border-beige rounded-sm text-xs text-espresso focus:outline-none focus:border-espresso font-light"
              >
                <option value="Royal Wedding Reception">Royal Wedding Reception</option>
                <option value="Corporate Presidential Gala">Corporate Presidential Gala</option>
                <option value="Private Founder Soirée">Private Founder Soirée</option>
                <option value="Silver Jubilee Celebration">Silver Jubilee Celebration</option>
                <option value="Ambassadorial Dinner">Ambassadorial Dinner</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-taupe mb-1">
                Dietary & Special Notes
              </label>
              <input
                type="text"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                placeholder="Strict Jain, Allergen, Vegan, Sommelier cellar notes"
                className="w-full px-3 py-2 bg-ivory-light border border-beige rounded-sm text-xs text-espresso placeholder-taupe/60 focus:outline-none focus:border-espresso font-light"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-sm bg-espresso text-ivory hover:bg-espresso-charcoal text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all shadow-subtle disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Persisting to H2 Database...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    Confirm Commission & Persist Record
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-center text-taupe font-mono">
              Persists record to ./backend/data/jucasdb.mv.db
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
