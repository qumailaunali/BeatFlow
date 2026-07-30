'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/app/layout';
import { mockShops, mockProducts } from '@/data/mockData';
import {
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Sun,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function ClientAISuggestion() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';

  // State
  const [selectedShopId, setSelectedShopId] = useState(mockShops[0].id);
  const [accepted, setAccepted] = useState(false);

  const selectedShop = mockShops.find((s) => s.id === selectedShopId) || mockShops[0];

  // Calculate suggested order total
  const suggestedTotal = selectedShop.demandForecast.reduce((sum, item) => {
    const prod = mockProducts.find((p) => p.id === item.productId);
    return sum + (prod ? item.suggestedQty * prod.price : 0);
  }, 0);

  const handleAccept = () => {
    setAccepted(true);
    setTimeout(() => {
      setAccepted(false);
      router.push('/app/book');
    }, 1500);
  };

  return (
    <div className="flex-1 p-5 space-y-4 flex flex-col justify-start animate-fade-in pb-12">
      {/* Top Shop Selector */}
      <div className="bg-white border border-brand-border p-4 rounded-2xl shadow-sm relative">
        <label className="block text-[9px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">
          {isUrdu ? 'دکان کا پروفائل' : 'Client Profile'}
        </label>
        <select
          value={selectedShopId}
          onChange={(e) => {
            setSelectedShopId(e.target.value);
          }}
          className="w-full bg-brand-bg/50 border border-brand-border px-3 py-2 rounded-xl text-sm font-semibold text-brand-dark focus:outline-none"
        >
          {mockShops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {isUrdu ? shop.urduName : shop.name}
            </option>
          ))}
        </select>
        <p className="text-[10px] text-brand-muted mt-2 font-medium">
          {isUrdu ? `${selectedShop.area} | مالک: ${selectedShop.owner}` : `${selectedShop.area} | Owner: ${selectedShop.owner}`}
        </p>
      </div>

      {/* Powered by AI Badge */}
      <div className="bg-brand-dark text-white p-4 rounded-2xl relative overflow-hidden flex justify-between items-center">
        <div className="absolute right-0 top-0 w-24 h-24 opacity-10 pointer-events-none grid-motif"></div>
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-1.5 text-brand-warning">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {t('poweredByAI')}
            </span>
          </div>
          <h2 className="text-md font-display font-extrabold text-white">
            {isUrdu ? 'مصنوعات کی مانگ کی پیش گوئی' : 'Suggested Load Sheet'}
          </h2>
        </div>
      </div>

      {/* Suggested items list */}
      <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest px-1 block">
        {isUrdu ? 'تجویز کردہ مقدار' : 'AI Recommendation Details'}
      </span>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-[340px] pr-1">
        {selectedShop.demandForecast.map((forecast, idx) => {
          const product = mockProducts.find((p) => p.id === forecast.productId);
          if (!product) return null;

          return (
            <div key={idx} className="bg-white border border-brand-border/60 p-3.5 rounded-xl shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-brand-dark">
                    {isUrdu ? product.urduName : product.name}
                  </p>
                  <p className="text-[10px] text-brand-muted mt-0.5 font-bold">
                    Rs {product.price} / {product.unit}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded-lg">
                    {forecast.suggestedQty} {product.unit}
                  </span>
                </div>
              </div>

              {/* Explanatory dynamic tag */}
              <div className="bg-brand-bg/60 border border-brand-border/40 p-2 rounded-lg flex items-center gap-2 text-[10px] text-brand-dark font-bold">
                <TrendingUp className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
                <span>{isUrdu ? forecast.urduReason : forecast.reason}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Totals and Accept Suggested Action */}
      <div className="bg-white border-t border-brand-border pt-4 space-y-4 shrink-0">
        <div className="flex justify-between items-center px-1">
          <div>
            <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">
              {t('predictedOrderValue')}
            </span>
            <span className="text-xl font-display font-black text-brand-dark">
              Rs {suggestedTotal.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-brand-success font-bold bg-brand-success/10 border border-brand-success/20 px-2.5 py-1 rounded-lg">
            96% confidence
          </span>
        </div>

        {accepted ? (
          <div className="w-full bg-brand-success text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md">
            <CheckCircle2 className="w-4 h-4 animate-bounce" />
            <span>{isUrdu ? 'تجویز کردہ لوڈ شیٹ لوڈ ہو گئی!' : 'Suggested load imported!'}</span>
          </div>
        ) : (
          <button
            onClick={handleAccept}
            className="w-full bg-brand-accent text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-accent/15 active:scale-95 transition-all hover:bg-brand-accent/95"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>{t('acceptSuggested')}</span>
          </button>
        )}
      </div>
    </div>
  );
}
