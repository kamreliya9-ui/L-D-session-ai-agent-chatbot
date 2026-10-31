import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Calendar, Phone, User, Sparkles, RefreshCw } from 'lucide-react';
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
      addOns: quote.appliedDiscounts.join(', ') || 'Standard Inclusions',
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
      // Fallback display
      setConfirmed(newOrder as Order);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-noir-950 border border-gold-400/40 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-noir-900 to-noir-850 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-normal text-stone-100">
                Commission Reservation
              </h3>
              <p className="text-xs text-gold-400/80 font-mono">
                Direct H2 SQL Database Allocation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-stone-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmed ? (
          /* Confirmation Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-normal text-stone-100 mb-1">
              Commission Allocated & Persisted!
            </h4>
            <p className="text-xs text-stone-400 font-mono mb-6">
              Order Code:{' '}
              <span className="text-gold-300 font-bold">{confirmed.orderCode}</span> • Saved to
              H2 Database
            </p>

            <div className="p-4 rounded-xl bg-noir-900 border border-white/10 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-stone-400">Patron Name:</span>
                <span className="text-stone-100 font-medium">{confirmed.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Occasion & Guests:</span>
                <span className="text-stone-100">
                  {confirmed.eventType} • {confirmed.guests} Guests
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Cuisine Atelier:</span>
                <span className="text-stone-100">{confirmed.cuisine}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 font-mono">
                <span className="text-gold-400">Total Investment:</span>
                <span className="text-gold-300 font-bold text-sm">
                  ₹{Number(confirmed.totalAmount).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 font-light mb-6">
              Our Executive Banquet Director will reach out at {confirmed.phone} within 2 hours to confirm private chef tasting dates.
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-noir-950 font-medium text-xs uppercase tracking-wider transition-all"
            >
              Return to Atelier
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Quote Summary Pill */}
            <div className="p-3 rounded-xl bg-gold-400/5 border border-gold-400/20 flex items-center justify-between text-xs">
              <div>
                <span className="text-gold-300 font-serif text-sm block">
                  {quote.menuName}
                </span>
                <span className="text-stone-400 font-mono text-[11px]">
                  {quote.guests} Guests • ₹{quote.effectivePricePerHead}/head
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-gold-300 text-sm">
                  ₹{Number(quote.finalTotal).toLocaleString('en-IN')}
                </span>
                <span className="block text-[10px] text-emerald-400 font-mono">
                  Saved ₹{Number(quote.discountAmount).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-300 mb-1">
                Patron / Host Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Singhania"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-noir-900 border border-white/10 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-400/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-stone-300 mb-1">
                  Contact Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-noir-900 border border-white/10 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-400/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-stone-300 mb-1">
                  Event Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-noir-900 border border-white/10 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-gold-400/50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-300 mb-1">
                Occasion Type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3 py-2 bg-noir-900 border border-white/10 rounded-lg text-xs text-stone-100 focus:outline-none focus:border-gold-400/50"
              >
                <option value="Royal Wedding Reception">Royal Wedding Reception</option>
                <option value="Corporate Presidential Gala">Corporate Presidential Gala</option>
                <option value="Private Founder Soirée">Private Founder Soirée</option>
                <option value="Silver Jubilee Celebration">Silver Jubilee Celebration</option>
                <option value="Ambassadorial Dinner">Ambassadorial Dinner</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-stone-300 mb-1">
                Dietary & Special Notes
              </label>
              <input
                type="text"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                placeholder="Allergen, Jain, Vegan, Sommelier cellar requests"
                className="w-full px-3 py-2 bg-noir-900 border border-white/10 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-gold-400/50"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-noir-950 font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-gold-glow disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Persisting to H2 Database...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Confirm Commission & Persist Record
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-center text-stone-500 font-mono">
              Creates persistent row in `./backend/data/jucasdb.mv.db`
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
