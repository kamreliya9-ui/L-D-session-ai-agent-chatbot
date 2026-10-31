export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  reply: string;
  toolUsed?: boolean;
  toolName?: string;
  toolOutput?: unknown;
  confirmedOrder?: Order;
}

export interface PricingRequest {
  menuName: string;
  guests: number;
  addOns: string[];
  promoCode?: string;
}

export interface PricingResponse {
  menuName: string;
  guests: number;
  basePricePerHead: number;
  addOnsPricePerHead: number;
  grossPerHead: number;
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  discountReason: string;
  finalTotal: number;
  effectivePricePerHead: number;
  appliedDiscounts: string[];
}

export interface Order {
  id?: number;
  orderCode: string;
  customerName: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: number;
  cuisine: string;
  dietary?: string;
  budgetPerHead?: number;
  recommendedMenu?: string;
  addOns?: string;
  totalAmount: number;
  discountAmount?: number;
  discountReason?: string;
  status: string;
  createdAt?: string;
}

export interface AnalyticsStats {
  totalOrders: number;
  totalRevenue: number;
  totalGuests: number;
}

const API_BASE = 'http://localhost:8085/api';

export const ApiService = {
  async calculatePricing(req: PricingRequest): Promise<PricingResponse> {
    try {
      const res = await fetch(`${API_BASE}/pricing/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn('Backend /pricing/calculate offline, fallback to client estimator:', e);
      // Client-side fallback calculation
      const rates: Record<string, number> = {
        'Royal Indian Feast': 500,
        'Continental Elegance': 650,
        'Chinese Fiesta': 450,
        'South Indian Delight': 350,
        'Live BBQ & Grill': 750,
        'Vegan & Wellness': 550,
      };
      const base = rates[req.menuName] || 500;
      let addonRate = 0;
      if (req.addOns.includes('Welcome Drinks')) addonRate += 80;
      if (req.addOns.includes('Dessert Counter')) addonRate += 120;
      if (req.addOns.includes('Live Pasta')) addonRate += 100;
      if (req.addOns.includes('Mocktail Bar')) addonRate += 150;

      const gross = base + addonRate;
      const subtotal = gross * req.guests;
      let discPct = 0;
      const applied: string[] = [];
      if (req.guests >= 500) {
        discPct += 15;
        applied.push('VIP Mega Gathering: 15% off (500+ guests)');
      } else if (req.guests >= 250) {
        discPct += 10;
        applied.push('Grand Event Volume: 10% off (250+ guests)');
      } else if (req.guests >= 100) {
        discPct += 5;
        applied.push('Celebration Volume: 5% off (100+ guests)');
      }

      const promo = (req.promoCode || '').trim().toUpperCase();
      if (['JUCAS2026', 'SATURDAY', 'DIVYANG'].includes(promo)) {
        discPct += 5;
        applied.push(`Promotional Code '${promo}': +5% additional discount`);
      }

      const discAmt = Math.round(subtotal * (discPct / 100));
      const total = subtotal - discAmt;

      return {
        menuName: req.menuName,
        guests: req.guests,
        basePricePerHead: base,
        addOnsPricePerHead: addonRate,
        grossPerHead: gross,
        subtotal,
        discountPercentage: discPct,
        discountAmount: discAmt,
        discountReason: applied.join(' | '),
        finalTotal: total,
        effectivePricePerHead: Math.round(total / req.guests),
        appliedDiscounts: applied,
      };
    }
  },

  async sendChatMessage(messages: ChatMessage[]): Promise<ChatResponse> {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error('Chat API Error:', e);
      throw e;
    }
  },

  async getAllOrders(): Promise<Order[]> {
    try {
      const res = await fetch(`${API_BASE}/orders`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn('Orders API Error:', e);
      return [];
    }
  },

  async getOrdersStats(): Promise<AnalyticsStats> {
    try {
      const res = await fetch(`${API_BASE}/orders/stats`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn('Stats API Error:', e);
      return { totalOrders: 0, totalRevenue: 0, totalGuests: 0 };
    }
  },

  async createOrder(order: Partial<Order>): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  }
};
