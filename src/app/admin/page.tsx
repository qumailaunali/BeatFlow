'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  CreditCard,
  Users,
  Fuel,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { mockProducts, mockSalesmen, mockShops, mockOrders, recentActivities } from '@/data/mockData';

// Chart mock data
const revenueTrend = [
  { date: 'Jul 24', revenue: 18500, fuelSaved: 14 },
  { date: 'Jul 25', revenue: 22400, fuelSaved: 15 },
  { date: 'Jul 26', revenue: 20100, fuelSaved: 15 },
  { date: 'Jul 27', revenue: 26800, fuelSaved: 17 },
  { date: 'Jul 28', revenue: 28500, fuelSaved: 17 },
  { date: 'Jul 29', revenue: 24200, fuelSaved: 18 },
  { date: 'Jul 30', revenue: 29315, fuelSaved: 18.5 },
];

export default function AdminOverview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute stats
  const totalOrdersToday = mockOrders.length;
  const totalRevenueToday = mockOrders.reduce((sum, order) => sum + order.actualValue, 0);
  const activeSalesmenCount = mockSalesmen.filter(s => s.active).length;
  const stockoutShopsCount = mockShops.filter(s => s.stockoutRisk === 'red' || s.stockoutRisk === 'amber').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-brand-border/60 p-6 rounded-2xl shadow-sm relative overflow-hidden">
        {/* Decorative thin network map lines in corner */}
        <div className="absolute right-0 top-0 w-32 h-32 opacity-20 pointer-events-none grid-motif rounded-tr-2xl"></div>
        
        <div>
          <h1 className="text-3xl font-display font-extrabold text-brand-dark tracking-tight">Assalam-o-Alaikum, Haji Saleem</h1>
          <p className="text-brand-muted mt-1 font-medium">Here is the active pulse of your distribution beats in Karachi & Lahore today.</p>
        </div>
        <div className="flex items-center gap-2 self-start md:self-center bg-brand-accent/10 border border-brand-accent/20 px-4 py-2 rounded-xl text-brand-accent text-sm font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>BeatFlow AI: 3 optimal reroutes updated</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Card 1: Revenue */}
        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-accent tracking-widest uppercase">REVENUE TODAY</span>
            <div className="p-2 bg-brand-accent/10 rounded-xl text-brand-accent">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-display font-black text-brand-dark">Rs {totalRevenueToday.toLocaleString()}</h3>
            <div className="flex items-center gap-1 text-brand-success text-xs font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14.2% vs yesterday</span>
            </div>
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-accent tracking-widest uppercase">ORDERS LOGGED</span>
            <div className="p-2 bg-brand-accent/10 rounded-xl text-brand-accent">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-display font-black text-brand-dark">{totalOrdersToday} bookings</h3>
            <div className="flex items-center gap-1 text-brand-success text-xs font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>100% synced to office</span>
            </div>
          </div>
        </div>

        {/* Card 3: Active Salesmen */}
        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-accent tracking-widest uppercase">ACTIVE TEAM</span>
            <div className="p-2 bg-brand-accent/10 rounded-xl text-brand-accent">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-display font-black text-brand-dark">
              {activeSalesmenCount} <span className="text-sm font-semibold text-brand-muted">/ {mockSalesmen.length}</span>
            </h3>
            <div className="flex items-center gap-1 text-brand-warning text-xs font-bold mt-1">
              <span>Zahid Iqbal is Offline</span>
            </div>
          </div>
        </div>

        {/* Card 4: Fuel Saved */}
        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-accent tracking-widest uppercase">FUEL SAVED</span>
            <div className="p-2 bg-brand-warning/10 rounded-xl text-brand-warning">
              <Fuel className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-display font-black text-brand-dark">18.5% average</h3>
            <div className="flex items-center gap-1 text-brand-success text-xs font-bold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Target 15-20% met</span>
            </div>
          </div>
        </div>

        {/* Card 5: Stock Alerts */}
        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between border-l-4 border-l-brand-warning">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-warning tracking-widest uppercase">STOCK WARNINGS</span>
            <div className="p-2 bg-brand-danger/10 rounded-xl text-brand-danger">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-display font-black text-brand-dark">{stockoutShopsCount} shops risk</h3>
            <div className="flex items-center gap-1 text-brand-danger text-xs font-bold mt-1">
              <span>1 Critical Stockout risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Split lists grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Revenue Trend Chart */}
        <div className="lg:col-span-2 bg-white border border-brand-border/60 p-6 rounded-2xl shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-display font-extrabold text-brand-dark">Revenue & Fuel Efficiency Trend</h2>
              <p className="text-xs text-brand-muted font-medium">Visualizing sales growth against route optimizations over the last week</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-brand-accent rounded-full"></span>
                <span className="text-brand-dark">Revenue (PKR)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-brand-warning rounded-full"></span>
                <span className="text-brand-dark">Fuel Saved (%)</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[300px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1B7A5A" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#1B7A5A" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorFuel" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F0A35E" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#F0A35E" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E8E1" />
                  <XAxis dataKey="date" stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #E3E8E1',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      fontSize: '12px',
                      fontFamily: 'var(--font-sans)',
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" name="Revenue (PKR)" stroke="#1B7A5A" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="fuelSaved" name="Fuel Saved (%)" stroke="#F0A35E" strokeWidth={2} fillOpacity={1} fill="url(#colorFuel)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-brand-bg/50 rounded-2xl flex items-center justify-center animate-pulse">
                <span className="text-brand-muted text-sm font-semibold">Loading charts...</span>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column: Top lists */}
        <div className="bg-white border border-brand-border/60 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-display font-extrabold text-brand-dark mb-4">Top Performing Beats</h2>
            <div className="space-y-4">
              {mockSalesmen.slice(0, 3).map((salesman, idx) => (
                <div key={salesman.id} className="flex items-center justify-between border-b border-brand-border/50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-accent/15 text-brand-accent font-bold text-sm flex items-center justify-center">
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-dark">{salesman.beatArea}</p>
                      <p className="text-xs text-brand-muted font-medium">Salesman: {salesman.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-brand-accent">{salesman.fuelSavedPercent}% saved</p>
                    <p className="text-xs text-brand-muted font-medium">{salesman.ordersToday} orders today</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-brand-border/60 pt-6">
            <h2 className="text-lg font-display font-extrabold text-brand-dark mb-4">Top Selling Products</h2>
            <div className="grid grid-cols-2 gap-3">
              {mockProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="bg-brand-bg/60 p-3 rounded-xl border border-brand-border/40">
                  <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider">{product.category}</p>
                  <p className="text-sm font-bold text-brand-dark truncate mt-1" title={product.name}>{product.name}</p>
                  <p className="text-xs font-black text-brand-accent mt-0.5">Rs {product.price} / unit</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Split: Recent Activity & Action items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Recent Activity Feed */}
        <div className="lg:col-span-2 bg-white border border-brand-border/60 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-display font-extrabold text-brand-dark">Live Activity Feed</h2>
              <p className="text-xs text-brand-muted font-medium">Real-time alerts, bookings, and syncs from field salesmen app</p>
            </div>
            <span className="w-2.5 h-2.5 bg-brand-success rounded-full animate-ping"></span>
          </div>

          <div className="space-y-4">
            {recentActivities.map((act) => {
              let iconColor = 'bg-brand-accent/10 text-brand-accent';
              let icon = <CheckCircle2 className="w-5 h-5" />;

              if (act.type === 'alert') {
                iconColor = 'bg-brand-danger/10 text-brand-danger';
                icon = <AlertCircle className="w-5 h-5" />;
              } else if (act.type === 'payment') {
                iconColor = 'bg-brand-warning/10 text-brand-warning';
                icon = <CreditCard className="w-5 h-5" />;
              } else if (act.type === 'route') {
                iconColor = 'bg-brand-dark/15 text-brand-dark';
                icon = <MapPin className="w-5 h-5" />;
              }

              return (
                <div key={act.id} className="flex gap-4 items-start border-b border-brand-border/40 pb-4 last:border-0 last:pb-0">
                  <div className={`p-2.5 rounded-xl shrink-0 ${iconColor}`}>
                    {icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-brand-dark">{act.text}</p>
                    <p className="text-xs text-brand-muted font-medium mt-0.5">{act.detail}</p>
                  </div>
                  <span className="text-xs text-brand-muted font-semibold shrink-0">{act.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Column: Quick Action Cards */}
        <div className="bg-white border border-brand-border/60 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-display font-extrabold text-brand-dark mb-4">Quick Shortcuts</h2>
            <div className="space-y-3">
              <Link href="/admin/routes" className="flex items-center justify-between p-3 rounded-xl border border-brand-border/60 hover:bg-brand-bg transition-all font-semibold text-sm group text-brand-dark">
                <div className="flex items-center gap-3">
                  <Fuel className="w-5 h-5 text-brand-accent" />
                  <span>Verify Route Fuel Saving</span>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-muted group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/admin/insights" className="flex items-center justify-between p-3 rounded-xl border border-brand-border/60 hover:bg-brand-bg transition-all font-semibold text-sm group text-brand-dark">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-brand-warning" />
                  <span>View Hot Weather Predictions</span>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-muted group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/admin/salesmen" className="flex items-center justify-between p-3 rounded-xl border border-brand-border/60 hover:bg-brand-bg transition-all font-semibold text-sm group text-brand-dark">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-brand-accent" />
                  <span>Track Active Salesmen Map</span>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-muted group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="bg-brand-dark text-white p-4 rounded-xl border border-brand-border/10 mt-6 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-24 h-24 opacity-10 pointer-events-none grid-motif"></div>
            <h3 className="font-display font-extrabold text-sm text-brand-warning uppercase tracking-widest">Support Line</h3>
            <p className="text-xs text-gray-300 mt-2 font-medium">Need help configuring reseller licenses?</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-white/80 font-bold font-mono">021-111-BEAT-FLOW</span>
              <a href="mailto:support@beatflow.pk" className="text-xs text-brand-warning font-bold hover:underline">Email support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
