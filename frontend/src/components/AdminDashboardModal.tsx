import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Database, DollarSign, Users, Calendar, Search, CheckCircle2, FileSpreadsheet, ShieldAlert } from 'lucide-react';
import { ApiService, Order, AnalyticsStats } from '../services/api';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<AnalyticsStats>({ totalOrders: 0, totalRevenue: 0, totalGuests: 0 });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [orderList, statData] = await Promise.all([
        ApiService.getAllOrders(),
        ApiService.getOrdersStats(),
      ]);
      setOrders(orderList);
      setStats(statData);
    } catch (err) {
      console.error('Failed to load admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredOrders = orders.filter(
    (o) =>
      o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.orderCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.cuisine?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.eventType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-ivory border border-beige rounded-sm shadow-luxe flex flex-col overflow-hidden text-espresso">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-beige flex items-center justify-between bg-espresso text-ivory">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-sm border border-gold/40 flex items-center justify-center text-gold font-serif">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="font-serif text-2xl font-light text-ivory">
                  Atelier Client & Order Registry
                </h3>
                <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase bg-olive/30 text-gold border border-gold/30">
                  H2 SQL Connected
                </span>
              </div>
              <p className="text-[11px] text-taupe-light font-mono">
                Storage: <span className="text-gold">./backend/data/jucasdb.mv.db</span> • Port: 8085
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-3.5 py-1.5 rounded-sm bg-espresso-surface hover:bg-espresso text-taupe-light hover:text-ivory border border-espresso-surface text-xs font-mono flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Sync DB
            </button>
            <button
              onClick={onClose}
              className="text-taupe-light hover:text-ivory p-1.5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics Top Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 sm:px-8 bg-champagne-light border-b border-beige">
          <div className="p-4 rounded-sm bg-ivory border border-beige flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-champagne border border-beige flex items-center justify-center text-espresso">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-taupe">Total Commissions</div>
              <div className="font-serif text-2xl font-normal text-espresso">{stats.totalOrders} Confirmed</div>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-ivory border border-beige flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-champagne border border-beige flex items-center justify-center text-espresso">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-taupe">Gross Pipeline Value</div>
              <div className="font-serif text-2xl font-normal text-espresso">
                ₹{Number(stats.totalRevenue || 0).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-sm bg-ivory border border-beige flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-champagne border border-beige flex items-center justify-center text-espresso">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-taupe">Patrons Hosted</div>
              <div className="font-serif text-2xl font-normal text-espresso">
                {Number(stats.totalGuests || 0).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 sm:px-8 py-3 bg-ivory flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-beige">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-taupe absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client, code, cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-ivory-light border border-beige rounded-sm text-xs text-espresso placeholder-taupe/60 focus:outline-none focus:border-espresso font-light"
            />
          </div>
          <div className="text-xs text-taupe font-mono">
            Displaying <span className="text-espresso font-bold">{filteredOrders.length}</span> of {orders.length} Records
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4 bg-ivory">
          {loading && orders.length === 0 ? (
            <div className="py-20 text-center text-taupe font-mono text-sm">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-gold mb-3" />
              Querying persistent Spring Boot H2 store...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-20 text-center text-taupe font-light">
              <ShieldAlert className="w-8 h-8 mx-auto text-taupe/50 mb-2" />
              No matching banquet records found in database.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-beige text-taupe font-mono uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Order Code</th>
                    <th className="py-3 px-3">Client & Contact</th>
                    <th className="py-3 px-3">Event & Date</th>
                    <th className="py-3 px-3 text-center">Guests</th>
                    <th className="py-3 px-3">Cuisine & Add-ons</th>
                    <th className="py-3 px-3 text-right">Total (₹)</th>
                    <th className="py-3 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-beige/60">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id || ord.orderCode} className="hover:bg-champagne-light/50 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-medium text-espresso">
                        {ord.orderCode}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-serif text-sm text-espresso font-normal">{ord.customerName}</div>
                        <div className="text-[11px] text-taupe font-mono">{ord.phone}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="text-espresso font-medium">{ord.eventType}</div>
                        <div className="text-[11px] text-taupe flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-gold" /> {ord.eventDate || 'TBD'}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono text-espresso">
                        {ord.guests}
                      </td>
                      <td className="py-3.5 px-3 max-w-[220px]">
                        <div className="text-espresso truncate">{ord.cuisine}</div>
                        {ord.addOns && (
                          <div className="text-[10px] text-taupe truncate font-mono">
                            + {ord.addOns}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono font-semibold text-espresso">
                        ₹{Number(ord.totalAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[10px] font-mono uppercase bg-olive/15 text-olive border border-olive/30">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {ord.status || 'CONFIRMED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-3.5 bg-champagne-light border-t border-beige flex items-center justify-between text-xs text-taupe">
          <div className="font-mono text-[11px]">
            Direct SQL: <span className="text-espresso font-semibold">SELECT * FROM CATERING_ORDERS;</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-sm bg-espresso text-ivory text-xs font-mono transition-colors"
          >
            Close Registry
          </button>
        </div>
      </div>
    </div>
  );
};
