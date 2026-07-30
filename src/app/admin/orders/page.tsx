'use client';

import React, { useState } from 'react';
import { mockOrders, mockProducts } from '@/data/mockData';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  WifiOff,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Sparkles,
  DollarSign
} from 'lucide-react';

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('BF-ORD-1001');

  // Filter logic
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.salesmanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const selectedOrder = mockOrders.find(o => o.id === selectedOrderId) || mockOrders[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-extrabold text-brand-dark tracking-tight">Orders Ledger</h1>
        <p className="text-brand-muted mt-1 font-medium">Review pending requests, payment statuses, and AI recommendation accuracy.</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-brand-accent/10 rounded-xl text-brand-accent">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">Synced & Confirmed</p>
            <p className="text-xl font-display font-black text-brand-dark">2 Orders</p>
          </div>
        </div>

        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-brand-warning/10 rounded-xl text-brand-warning">
            <WifiOff className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">Synced from Offline Mode</p>
            <p className="text-xl font-display font-black text-brand-dark">1 Order</p>
          </div>
        </div>

        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-brand-accent/10 rounded-xl text-brand-accent">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">AI Sizing Matches</p>
            <p className="text-xl font-display font-black text-brand-dark">91% accuracy</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Orders Table */}
        <div className="xl:col-span-2 bg-white border border-brand-border/60 rounded-2xl shadow-sm overflow-hidden">
          {/* Filters Toolbar */}
          <div className="p-4 border-b border-brand-border/60 flex flex-col sm:flex-row gap-3 items-center justify-between bg-brand-bg/10">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search ID, shop or salesman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-brand-border pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-brand-text placeholder:text-brand-muted/70"
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-brand-border px-3 py-2 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Synced Offline">Synced Offline</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-brand-bg/30 text-brand-dark font-display font-bold text-xs uppercase tracking-wider border-b border-brand-border/60">
                  <th className="p-4 pl-6">Order ID</th>
                  <th className="p-4">Shop</th>
                  <th className="p-4">Salesman</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Value (PKR)</th>
                  <th className="p-4">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40">
                {filteredOrders.map((order) => {
                  const isSelected = order.id === selectedOrderId;
                  
                  let statusBadge = '';
                  if (order.status === 'Confirmed') statusBadge = 'bg-brand-success/15 text-brand-success';
                  else if (order.status === 'Synced Offline') statusBadge = 'bg-brand-warning/15 text-brand-warning';
                  else statusBadge = 'bg-brand-muted/20 text-brand-muted';

                  return (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrderId(order.id)}
                      className={`hover:bg-brand-bg/30 transition-all cursor-pointer ${
                        isSelected ? 'bg-brand-bg/50 border-l-4 border-l-brand-accent' : ''
                      }`}
                    >
                      <td className="p-4 pl-6">
                        <span className="text-sm font-bold text-brand-dark">{order.id}</span>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-semibold text-brand-dark">{order.shopName}</p>
                        <p className="text-[10px] text-brand-muted font-medium">{order.date}</p>
                      </td>
                      <td className="p-4 text-sm font-medium text-brand-dark">
                        {order.salesmanName}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusBadge}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-black text-brand-dark">
                        Rs {order.actualValue.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-semibold ${
                          order.paymentStatus === 'Paid' 
                            ? 'text-brand-success' 
                            : order.paymentStatus === 'Pending' 
                            ? 'text-brand-warning' 
                            : 'text-brand-danger'
                        }`}>
                          {order.paymentStatus} ({order.paymentMethod})
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Order Detail Sidebar */}
        {selectedOrder && (
          <div className="bg-white border border-brand-border/60 rounded-2xl shadow-sm p-6 space-y-6">
            <div className="border-b border-brand-border pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-display font-extrabold text-brand-dark">{selectedOrder.id}</h2>
                <p className="text-xs text-brand-muted mt-0.5 font-semibold uppercase">{selectedOrder.shopName}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                selectedOrder.status === 'Confirmed' 
                  ? 'bg-brand-success/15 text-brand-success' 
                  : 'bg-brand-warning/15 text-brand-warning'
              }`}>
                {selectedOrder.status}
              </span>
            </div>

            {/* AI suggestion accuracy summary */}
            <div className="bg-brand-accent/5 border border-brand-accent/20 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-brand-accent">
                <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                <h3 className="text-xs font-bold uppercase tracking-wider">AI Forecast Verification</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                <div>
                  <p className="text-brand-muted">AI Recommended</p>
                  <p className="text-sm font-bold text-brand-dark mt-0.5">Rs {selectedOrder.suggestedValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-brand-muted">Actual Booked</p>
                  <p className="text-sm font-bold text-brand-dark mt-0.5">Rs {selectedOrder.actualValue.toLocaleString()}</p>
                </div>
              </div>

              {selectedOrder.actualValue < selectedOrder.suggestedValue ? (
                <div className="text-[11px] text-brand-warning font-semibold leading-relaxed">
                  Note: Salesman reduced order value by Rs {(selectedOrder.suggestedValue - selectedOrder.actualValue).toLocaleString()} due to local shop storage capacity.
                </div>
              ) : (
                <div className="text-[11px] text-brand-accent font-semibold leading-relaxed">
                  Match: Salesman accepted the complete AI suggested size list.
                </div>
              )}
            </div>

            {/* Line Items List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-brand-dark uppercase tracking-widest block">Ordered Line Items</span>
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {selectedOrder.items.map((item, idx) => {
                  const product = mockProducts.find(p => p.id === item.productId);
                  return (
                    <div key={idx} className="flex justify-between items-center bg-brand-bg/40 p-3 rounded-xl border border-brand-border/40 text-xs">
                      <div>
                        <p className="font-bold text-brand-dark">{product?.name || 'Product Item'}</p>
                        <p className="text-[10px] text-brand-muted mt-0.5">
                          {item.qty} {product?.unit} x Rs {item.price}
                        </p>
                      </div>
                      <p className="font-extrabold text-brand-dark">
                        Rs {(item.qty * item.price).toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Block */}
            <div className="border-t border-brand-border pt-4 flex justify-between items-center">
              <span className="text-sm font-bold text-brand-dark">Grand Total</span>
              <span className="text-xl font-display font-black text-brand-accent">
                Rs {selectedOrder.actualValue.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
