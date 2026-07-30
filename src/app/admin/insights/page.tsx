'use client';

import React, { useState, useEffect } from 'react';
import { mockShops, mockProducts } from '@/data/mockData';
import {
  Sparkles,
  TrendingUp,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  TrendingDown,
  Sun,
  Flame,
  Calendar,
  Layers
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Forecast vs Actual Chart Data
const comparisonData = [
  { category: 'Dairy', Forecast: 15400, Actual: 14900 },
  { category: 'Beverages', Forecast: 12200, Actual: 13100 },
  { category: 'Tea', Forecast: 18500, Actual: 17200 },
  { category: 'Personal Care', Forecast: 6200, Actual: 5900 },
  { category: 'Snacks', Forecast: 9800, Actual: 10400 },
];

export default function AdminInsights() {
  const [mounted, setMounted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter forecasts
  const forecastCards: { shopName: string; shopCity: string; productName: string; reason: string; qty: number; trend: string; category: string }[] = [];

  mockShops.forEach(shop => {
    shop.demandForecast.forEach(forecast => {
      const prod = mockProducts.find(p => p.id === forecast.productId);
      if (prod) {
        forecastCards.push({
          shopName: shop.name,
          shopCity: shop.city,
          productName: prod.name,
          reason: forecast.reason,
          qty: forecast.suggestedQty,
          trend: forecast.trend,
          category: prod.category
        });
      }
    });
  });

  const filteredForecasts = forecastCards.filter(card => {
    const matchesCategory = categoryFilter === 'all' || card.category === categoryFilter;
    const matchesCity = cityFilter === 'all' || card.shopCity === cityFilter;
    return matchesCategory && matchesCity;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-brand-dark tracking-tight">AI Demand Insights</h1>
          <p className="text-brand-muted mt-1 font-medium">Hyperlocal forecasting combining retail velocity, weather, and calendar signals.</p>
        </div>
      </div>

      {/* Seasonality Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gradient-to-br from-brand-warning/10 to-brand-warning/5 border border-brand-warning/20 p-5 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-brand-warning/20 rounded-xl text-brand-warning">
            <Sun className="w-5 h-5 text-orange-600 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-display font-bold text-brand-dark">Extreme Hot Weather Alert</h3>
            <p className="text-xs text-brand-muted mt-1 font-medium leading-relaxed">
              Temperatures above 39°C in Karachi & Lahore trigger a forecast increase of <strong className="text-brand-accent">+22%</strong> on beverages and Olpers liquid items.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-accent/10 to-brand-accent/5 border border-brand-accent/20 p-5 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-brand-accent/20 rounded-xl text-brand-accent">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-brand-dark">Ramadan Preparation Signals</h3>
            <p className="text-xs text-brand-muted mt-1 font-medium leading-relaxed">
              Advance stocking orders for Rooh Afza and premium tea blends are scaled up by <strong className="text-brand-accent">1.5x</strong> across 85% of retail nodes.
            </p>
          </div>
        </div>

        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl flex items-start gap-4">
          <div className="p-3 bg-brand-dark/10 rounded-xl text-brand-dark">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-brand-dark">Inflation-Driven Optimization</h3>
            <p className="text-xs text-brand-muted mt-1 font-medium leading-relaxed">
              Price point modifications detected on snacks trigger a shift in demand towards smaller 40g packaging alternatives.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Left Column: Forecast cards list */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white border border-brand-border/60 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
            <h2 className="text-md font-display font-bold text-brand-dark self-start sm:self-center">Per-Shop Demand Predictions</h2>
            
            <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-brand-bg/50 border border-brand-border px-3 py-1.5 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="Dairy">Dairy</option>
                <option value="Beverages">Beverages</option>
                <option value="Tea">Tea</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Snacks">Snacks</option>
              </select>

              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="bg-brand-bg/50 border border-brand-border px-3 py-1.5 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none"
              >
                <option value="all">All Cities</option>
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredForecasts.map((forecast, idx) => {
              const isUp = forecast.trend === 'up';
              return (
                <div key={idx} className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm hover:border-brand-accent/50 transition-all flex flex-col justify-between space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">{forecast.shopName}</p>
                      <p className="text-sm font-semibold text-brand-muted mt-0.5">{forecast.shopCity}</p>
                    </div>
                    <span className={`p-1.5 rounded-lg shrink-0 ${isUp ? 'bg-brand-success/15 text-brand-success' : 'bg-brand-warning/15 text-brand-warning'}`}>
                      {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    </span>
                  </div>

                  <div className="border-t border-brand-border/40 pt-3">
                    <p className="text-lg font-display font-black text-brand-dark">{forecast.productName}</p>
                    <div className="flex items-center gap-1.5 mt-2 bg-brand-bg px-2.5 py-1.5 rounded-lg border border-brand-border text-xs font-bold text-brand-dark">
                      <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
                      <span>{forecast.reason}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-brand-border/40 pt-3">
                    <span className="text-xs text-brand-muted font-bold">Suggested Load:</span>
                    <span className="text-sm font-black text-brand-accent">{forecast.qty} units</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recharts comparison */}
        <div className="bg-white border border-brand-border/60 p-6 rounded-2xl shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-display font-extrabold text-brand-dark">Forecast vs Actuals</h2>
            <p className="text-xs text-brand-muted font-medium mt-1">Measuring AI sizing accuracy vs shop order finalizations.</p>
          </div>

          <div className="h-64">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E3E8E1" />
                  <XAxis dataKey="category" stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6B7280" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #E3E8E1',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      fontSize: '11px',
                    }}
                  />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Forecast" fill="#1B7A5A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Actual" fill="#F0A35E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-brand-bg/50 rounded-2xl flex items-center justify-center animate-pulse">
                <span className="text-brand-muted text-sm font-semibold">Loading chart...</span>
              </div>
            )}
          </div>

          {/* Sizing Accuracy Card */}
          <div className="bg-brand-dark text-white p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-brand-warning tracking-widest uppercase">AI Prediction Efficacy</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <span>Avg. Variance</span>
                <span className="text-brand-warning">~4.8%</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span>Stockouts Prevented</span>
                <span className="text-brand-success">14 outlets</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold">
                <span>Revenue Recaptured</span>
                <span>Rs 48,250</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-300 font-medium leading-relaxed">
              Model optimized daily based on temperature variations, national holidays, and weekly inventory sweeps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
