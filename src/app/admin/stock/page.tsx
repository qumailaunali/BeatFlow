'use client';

import React, { useState } from 'react';
import { mockShops } from '@/data/mockData';
import {
  AlertTriangle,
  Search,
  Filter,
  CheckCircle2,
  Mail,
  Send,
  Sparkles,
  RefreshCw,
  PhoneCall
} from 'lucide-react';

export default function AdminStock() {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const filteredShops = mockShops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || shop.stockoutRisk === riskFilter;
    return matchesSearch && matchesRisk;
  });

  // Sort by risk priority: red first, then amber, then green
  const sortedShops = [...filteredShops].sort((a, b) => {
    const priority = { red: 3, amber: 2, green: 1 };
    return priority[b.stockoutRisk] - priority[a.stockoutRisk];
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-extrabold text-brand-dark tracking-tight">Inventory & Stock Alerts</h1>
        <p className="text-brand-muted mt-1 font-medium">Identify out-of-stock risk at outlets before the shelf runs empty.</p>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm border-l-4 border-l-brand-danger flex items-center gap-4">
          <div className="p-3 bg-brand-danger/10 rounded-xl text-brand-danger">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">Critical Stockouts</p>
            <p className="text-xl font-display font-black text-brand-dark">1 shop red alert</p>
          </div>
        </div>

        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm border-l-4 border-l-brand-warning flex items-center gap-4">
          <div className="p-3 bg-brand-warning/10 rounded-xl text-brand-warning">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">Low Stock Warnings</p>
            <p className="text-xl font-display font-black text-brand-dark">1 shop amber alert</p>
          </div>
        </div>

        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm border-l-4 border-l-brand-success flex items-center gap-4">
          <div className="p-3 bg-brand-success/10 rounded-xl text-brand-success">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">Shelves Restocked Today</p>
            <p className="text-xl font-display font-black text-brand-dark">3 shops healthy</p>
          </div>
        </div>
      </div>

      {/* Main Stockout Urgent Table list */}
      <div className="bg-white border border-brand-border/60 rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-brand-border/60 flex flex-col sm:flex-row gap-3 items-center justify-between bg-brand-bg/10">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search shop or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-brand-border pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-brand-text placeholder:text-brand-muted/70"
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-white border border-brand-border px-3 py-2 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none"
            >
              <option value="all">All Risk Levels</option>
              <option value="red">Critical Risk (Red)</option>
              <option value="amber">Low Warning (Amber)</option>
              <option value="green">Healthy (Green)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-brand-bg/30 text-brand-dark font-display font-bold text-xs uppercase tracking-wider border-b border-brand-border/60">
                <th className="p-4 pl-6">Shop Name</th>
                <th className="p-4">Owner / Contact</th>
                <th className="p-4">Urgency Status</th>
                <th className="p-4">Flagged Item</th>
                <th className="p-4">Last Visit Value</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40">
              {sortedShops.map((shop) => {
                let riskBadge = '';
                let riskText = '';
                if (shop.stockoutRisk === 'red') {
                  riskBadge = 'bg-brand-danger/10 text-brand-danger';
                  riskText = 'Stockout Risk';
                } else if (shop.stockoutRisk === 'amber') {
                  riskBadge = 'bg-brand-warning/10 text-brand-warning';
                  riskText = 'Low Stock';
                } else {
                  riskBadge = 'bg-brand-success/15 text-brand-success';
                  riskText = 'Healthy';
                }

                return (
                  <tr key={shop.id} className="hover:bg-brand-bg/20 transition-all">
                    <td className="p-4 pl-6">
                      <p className="text-sm font-semibold text-brand-dark">{shop.name}</p>
                      <p className="text-xs text-brand-muted font-medium">{shop.area}, {shop.city}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-brand-dark">{shop.owner}</p>
                      <p className="text-xs text-brand-muted font-medium">Thursday Beat</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${riskBadge}`}>
                        {riskText}
                      </span>
                    </td>
                    <td className="p-4">
                      {shop.stockoutProduct ? (
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-brand-danger"></span>
                          <span className="text-sm font-semibold text-brand-dark">{shop.stockoutProduct}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-brand-muted font-semibold">None</span>
                      )}
                    </td>
                    <td className="p-4 text-sm font-black text-brand-dark">
                      Rs {shop.lastOrderValue.toLocaleString()}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      {shop.stockoutRisk !== 'green' ? (
                        <button
                          onClick={() => alert(`WhatsApp Stock Alert message dispatched to ${shop.owner}`)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-accent text-white rounded-xl text-xs font-bold hover:bg-brand-accent/90 transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch WhatsApp Alert</span>
                        </button>
                      ) : (
                        <span className="text-xs text-brand-muted font-bold">No Action Required</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
