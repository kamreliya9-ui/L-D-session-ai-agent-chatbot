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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-noir-950 border border-gold-400/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between bg-noir-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-300">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-normal text-stone-100">
                  Banquet Atelier Database Console
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  H2 SQL Connected
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono">
                Storage: <span className="text-gold-400">./backend/data/jucasdb.mv.db</span> • Port: 8085
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-gold-400/10 text-stone-300 hover:text-gold-300 border border-white/10 hover:border-gold-400/30 text-xs font-mono flex items-center gap-2 transition-all disabled:opacity-50"
              title="Refresh Records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Sync DB
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-stone-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics Top Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 sm:px-8 bg-noir-900/40 border-b border-white/5">
          <div className="p-4 rounded-xl bg-noir-900/60 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-300">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase font-mono text-stone-400">Total Commissions</div>
              <div className="font-serif text-2xl font-medium text-stone-100">{stats.totalOrders} Confirmed</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-noir-900/60 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-300">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase font-mono text-stone-400">Gross Banquet Pipeline</div>
              <div className="font-serif text-2xl font-medium text-gold-300">
                ₹{Number(stats.totalRevenue || 0).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-noir-900/60 border border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-300">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase font-mono text-stone-400">Patron Guests Hosted</div>
              <div className="font-serif text-2xl font-medium text-stone-100">
                {Number(stats.totalGuests || 0).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="px-6 sm:px-8 py-3 bg-noir-950 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-white/5">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by client, code, cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-noir-900 border border-white/10 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-gold-400/50"
            />
          </div>
          <div className="text-xs text-stone-400 font-mono">
            Showing <span className="text-gold-300 font-bold">{filteredOrders.length}</span> of {orders.length} Records
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-4">
          {loading && orders.length === 0 ? (
            <div className="py-20 text-center text-stone-400 font-mono text-sm">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-gold-400 mb-3" />
              Querying persistent Spring Boot H2 store...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-20 text-center text-stone-500 font-light">
              <ShieldAlert className="w-10 h-10 mx-auto text-stone-600 mb-2" />
              No matching banquet records found in database.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-stone-400 font-mono uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Order Code</th>
                    <th className="py-3 px-3">Client & Contact</th>
                    <th className="py-3 px-3">Event & Date</th>
                    <th className="py-3 px-3 text-center">Guests</th>
                    <th className="py-3 px-3">Cuisine & Add-ons</th>
                    <th className="py-3 px-3 text-right">Total (₹)</th>
                    <th className="py-3 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id || ord.orderCode} className="hover:bg-noir-900/60 transition-colors">
                      <td className="py-3.5 px-3 font-mono font-medium text-gold-400">
                        {ord.orderCode}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-serif text-sm text-stone-100">{ord.customerName}</div>
                        <div className="text-[11px] text-stone-400 font-mono">{ord.phone}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="text-stone-200 font-medium">{ord.eventType}</div>
                        <div className="text-[11px] text-stone-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gold-400/60" /> {ord.eventDate || 'TBD'}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono text-stone-200">
                        {ord.guests}
                      </td>
                      <td className="py-3.5 px-3 max-w-[220px]">
                        <div className="text-stone-200 truncate">{ord.cuisine}</div>
                        {ord.addOns && (
                          <div className="text-[10px] text-gold-400/70 truncate font-mono">
                            + {ord.addOns}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono font-semibold text-gold-300">
                        ₹{Number(ord.totalAmount || 0).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
        <div className="px-6 sm:px-8 py-3.5 bg-noir-900/80 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
          <div>
            Direct SQL Access: <span className="font-mono text-gold-400">SELECT * FROM CATERING_ORDERS;</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gold-400/10 hover:bg-gold-400/20 text-gold-300 border border-gold-400/30 text-xs font-mono transition-colors"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
