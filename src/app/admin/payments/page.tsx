'use client';

import React, { useState } from 'react';
import { mockPayments } from '@/data/mockData';
import {
  CreditCard,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  TrendingUp,
  Smartphone,
  Coins
} from 'lucide-react';

export default function AdminPayments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.salesmanName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  // Calculate stats
  const totalCollected = mockPayments
    .filter(p => p.status === 'Collected')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingCollections = mockPayments
    .filter(p => p.status === 'Pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const jazzcashTotal = mockPayments
    .filter(p => p.method === 'JazzCash' && p.status === 'Collected')
    .reduce((sum, p) => sum + p.amount, 0);

  const easypaisaTotal = mockPayments
    .filter(p => p.method === 'EasyPaisa' && p.status === 'Collected')
    .reduce((sum, p) => sum + p.amount, 0);

  const cashTotal = mockPayments
    .filter(p => p.method === 'Cash' && p.status === 'Collected')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-extrabold text-brand-dark tracking-tight">Payments Ledger</h1>
        <p className="text-brand-muted mt-1 font-medium">Verify outstanding collections, ledger reconciliations, and mobile wallet transfers.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-brand-accent tracking-widest uppercase">Total Collected</span>
          <h3 className="text-2.5xl font-display font-black text-brand-dark mt-2">Rs {totalCollected.toLocaleString()}</h3>
          <p className="text-xs text-brand-success font-bold mt-1">Reconciled to bank</p>
        </div>

        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-brand-warning tracking-widest uppercase">Pending Collections</span>
          <h3 className="text-2.5xl font-display font-black text-brand-dark mt-2">Rs {pendingCollections.toLocaleString()}</h3>
          <p className="text-xs text-brand-muted mt-1 font-medium">On today's beat routes</p>
        </div>

        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-brand-accent tracking-widest uppercase">Digital Wallet (Reconciliation)</span>
          <h3 className="text-2.5xl font-display font-black text-brand-dark mt-2">Rs {(jazzcashTotal + easypaisaTotal).toLocaleString()}</h3>
          <div className="flex gap-2 text-[10px] text-brand-muted mt-1 font-semibold">
            <span>JazzCash: Rs {jazzcashTotal.toLocaleString()}</span>
            <span>|</span>
            <span>EasyPaisa: Rs {easypaisaTotal.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-brand-accent tracking-widest uppercase">Cash In Hand (Salesmen)</span>
          <h3 className="text-2.5xl font-display font-black text-brand-dark mt-2">Rs {cashTotal.toLocaleString()}</h3>
          <p className="text-xs text-brand-muted mt-1 font-medium">Physical cash collected</p>
        </div>
      </div>

      {/* Collections table list */}
      <div className="bg-white border border-brand-border/60 rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-brand-border/60 flex flex-col sm:flex-row gap-3 items-center justify-between bg-brand-bg/10">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search Invoice, shop or salesman..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-brand-border pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-brand-text placeholder:text-brand-muted/70"
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="bg-white border border-brand-border px-3 py-2 rounded-xl text-xs font-semibold text-brand-dark focus:outline-none"
            >
              <option value="all">All Methods</option>
              <option value="JazzCash">JazzCash</option>
              <option value="EasyPaisa">EasyPaisa</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-brand-bg/30 text-brand-dark font-display font-bold text-xs uppercase tracking-wider border-b border-brand-border/60">
                <th className="p-4 pl-6">Invoice Ref</th>
                <th className="p-4">Shop</th>
                <th className="p-4">Salesman</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40">
              {filteredPayments.map((payment) => {
                let statusBadge = '';
                if (payment.status === 'Collected') statusBadge = 'bg-brand-success/15 text-brand-success';
                else statusBadge = 'bg-brand-warning/15 text-brand-warning';

                return (
                  <tr key={payment.id} className="hover:bg-brand-bg/20 transition-all">
                    <td className="p-4 pl-6 font-bold text-brand-dark text-sm">
                      {payment.invoiceRef}
                    </td>
                    <td className="p-4 text-sm font-semibold text-brand-dark">
                      {payment.shopName}
                    </td>
                    <td className="p-4 text-sm font-medium text-brand-dark">
                      {payment.salesmanName}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {payment.method === 'JazzCash' || payment.method === 'EasyPaisa' ? (
                          <div className="p-1 bg-brand-accent/15 text-brand-accent rounded-md">
                            <Smartphone className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="p-1 bg-brand-dark/15 text-brand-dark rounded-md">
                            <Coins className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <span className="text-xs font-bold text-brand-dark">{payment.method}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-black text-brand-dark">
                      Rs {payment.amount.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusBadge}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      {payment.status === 'Pending' ? (
                        <button
                          onClick={() => alert(`WhatsApp Payment Reminder dispatched to ${payment.shopName}`)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-warning text-brand-dark rounded-xl text-xs font-bold hover:bg-brand-warning/90 transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>WhatsApp Reminder</span>
                        </button>
                      ) : (
                        <span className="text-xs text-brand-success font-bold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Reconciled</span>
                        </span>
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
