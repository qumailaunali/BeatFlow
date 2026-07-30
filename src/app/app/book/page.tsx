'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/app/app/layout';
import { mockShops, mockProducts, Product } from '@/data/mockData';
import {
  WifiOff,
  ShoppingBag,
  Plus,
  Minus,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  MapPin,
  ChevronDown
} from 'lucide-react';

export default function ClientBookOrder() {
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';

  // State
  const [selectedShopId, setSelectedShopId] = useState(mockShops[0].id);
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    mockProducts.forEach((p) => {
      // Default initial quantities
      if (p.id === 'prod-1') initial[p.id] = 18; // Olpers Milk
      else if (p.id === 'prod-2') initial[p.id] = 15; // Rooh Afza
      else if (p.id === 'prod-4') initial[p.id] = 20; // Lifebuoy Soap
      else initial[p.id] = 0;
    });
    return initial;
  });

  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'completed'>('idle');

  const selectedShop = mockShops.find((s) => s.id === selectedShopId) || mockShops[0];

  // Adjust quantity
  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  // Calculations
  const lineItems = mockProducts.map((p) => ({
    product: p,
    qty: quantities[p.id] || 0,
    totalPrice: (quantities[p.id] || 0) * p.price,
  }));

  const orderTotal = lineItems.reduce((sum, item) => sum + item.totalPrice, 0);

  // Trigger Offline Sync animation
  const handleConfirm = () => {
    setSyncState('syncing');
    setTimeout(() => {
      setSyncState('completed');
      setTimeout(() => {
        setSyncState('idle');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="flex-1 p-5 space-y-4 flex flex-col justify-start animate-fade-in pb-12">
      {/* Offline Status Badge */}
      <div className="bg-brand-warning/10 border border-brand-warning/25 px-4 py-2.5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2 text-brand-dark">
          <WifiOff className="w-4 h-4 text-brand-warning animate-pulse shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {t('offlineBadge')}
          </span>
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-warning"></span>
      </div>

      {/* Interactive Shop Selector Dropdown */}
      <div className="bg-white border border-brand-border p-4 rounded-2xl shadow-sm relative">
        <label className="block text-[9px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
          {isUrdu ? 'دکان منتخب کریں' : 'Active Client Shop'}
        </label>
        <div className="relative">
          <select
            value={selectedShopId}
            onChange={(e) => setSelectedShopId(e.target.value)}
            className="w-full bg-brand-bg/50 border border-brand-border px-3 py-2 rounded-xl text-sm font-semibold text-brand-dark focus:outline-none appearance-none"
          >
            {mockShops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {isUrdu ? shop.urduName : shop.name} ({shop.area})
              </option>
            ))}
          </select>
          <ChevronDown className={`w-4 h-4 text-brand-muted absolute top-3 ${isUrdu ? 'left-3' : 'right-3'} pointer-events-none`} />
        </div>
      </div>

      {/* AI suggestion helper banner */}
      <div className="bg-gradient-to-r from-brand-accent/10 to-brand-accent/5 border border-brand-accent/20 p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4.5 h-4.5 text-brand-accent animate-pulse shrink-0" />
          <div>
            <p className="text-[10px] font-extrabold text-brand-accent uppercase tracking-wider">
              {t('poweredByAI')}
            </p>
            <p className="text-[10px] text-brand-muted mt-0.5 font-semibold">
              {isUrdu ? 'اسٹاک آؤٹ سے بچنے کے لیے تیار کردہ تجویز' : 'Prevent stockouts at this outlet'}
            </p>
          </div>
        </div>
        
        <a
          href="/app/ai-suggest"
          className="text-[10px] font-black text-brand-accent hover:underline shrink-0"
        >
          {isUrdu ? 'تجویز دیکھیں' : 'View AI Sug.'}
        </a>
      </div>

      {/* Order list header */}
      <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest px-1 block">
        {isUrdu ? 'مصنوعات کی فہرست' : 'Order Line Items'}
      </span>

      {/* Product Items List */}
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[340px] pr-1">
        {mockProducts.map((p) => {
          const qty = quantities[p.id] || 0;
          return (
            <div key={p.id} className="bg-white border border-brand-border/60 p-3.5 rounded-xl shadow-sm flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-brand-dark truncate">
                  {isUrdu ? p.urduName : p.name}
                </p>
                <p className="text-[10px] text-brand-muted mt-0.5 font-bold">
                  Rs {p.price} <span className="font-semibold text-brand-muted/70">/ {p.unit}</span>
                </p>
              </div>

              {/* Quantity Stepper (RTL compliant) */}
              <div className="flex items-center gap-2 border border-brand-border rounded-xl px-1.5 py-1 bg-brand-bg/50 shrink-0">
                <button
                  onClick={() => updateQty(p.id, -1)}
                  className="w-7 h-7 rounded-lg bg-white border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-bg transition-all active:scale-90"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-sm font-black text-brand-dark">{qty}</span>
                <button
                  onClick={() => updateQty(p.id, 1)}
                  className="w-7 h-7 rounded-lg bg-white border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-bg transition-all active:scale-90"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Totals and Confirmation Block */}
      <div className="bg-white border-t border-brand-border pt-4 space-y-4 shrink-0">
        <div className="flex justify-between items-center px-1">
          <span className="text-sm font-bold text-brand-dark">{t('orderTotal')}</span>
          <span className="text-xl font-display font-black text-brand-accent">
            Rs {orderTotal.toLocaleString()}
          </span>
        </div>

        {/* Sync Confirm Button */}
        {syncState === 'idle' && (
          <button
            onClick={handleConfirm}
            disabled={orderTotal === 0}
            className="w-full bg-brand-accent text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-accent/15 active:scale-95 transition-all hover:bg-brand-accent/95 disabled:opacity-50"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t('confirmOrder')}</span>
          </button>
        )}

        {syncState === 'syncing' && (
          <div className="w-full bg-brand-warning text-brand-dark py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border border-brand-warning/30 shadow-md">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>{isUrdu ? 'ڈیش بورڈ کے ساتھ مطابقت پذیر ہو رہا ہے...' : 'Syncing order to office...'}</span>
          </div>
        )}

        {syncState === 'completed' && (
          <div className="w-full bg-brand-success text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md">
            <CheckCircle2 className="w-4 h-4 animate-bounce" />
            <span>{isUrdu ? 'آرڈر کامیابی سے بھیج دیا گیا!' : 'Order synced successfully!'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
