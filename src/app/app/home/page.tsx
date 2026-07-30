'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/app/layout';
import {
  Sparkles,
  ShoppingBag,
  MapPin,
  TrendingUp,
  Fuel,
  ArrowRight,
  Target,
  Compass
} from 'lucide-react';
import { mockSalesmen, mockShops } from '@/data/mockData';

export default function ClientHome() {
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';

  // Get agent Qumail
  const agent = mockSalesmen[0];
  
  // Calculate target progress percentage
  const progressPercent = Math.round((agent.ordersToday / agent.targetOrders) * 100);

  // Next shop Stop details
  const nextShop = mockShops[0];

  return (
    <div className="flex-1 p-5 space-y-5 flex flex-col justify-start animate-fade-in pb-12">
      {/* Top Welcome greeting */}
      <div className="flex justify-between items-center bg-white border border-brand-border/60 p-4 rounded-2xl shadow-sm relative overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute right-0 top-0 w-24 h-24 opacity-10 pointer-events-none grid-motif"></div>
        <div>
          <h1 className="text-xl font-display font-extrabold text-brand-dark">
            {t('greeting')}
          </h1>
          <p className="text-xs text-brand-muted font-medium mt-0.5">
            {isUrdu ? 'آج گلشنِ اقبال کا روٹ فعال ہے' : 'Active Beat: Gulshan-e-Iqbal'}
          </p>
        </div>
        <span className="w-3 h-3 bg-brand-success rounded-full animate-pulse shrink-0"></span>
      </div>

      {/* Today's Target achievement card */}
      <div className="bg-white border border-brand-border p-5 rounded-2xl shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-brand-dark">
          <div className="flex items-center gap-1.5">
            <Target className="w-4.5 h-4.5 text-brand-accent" />
            <span>{t('targetAchieved')}</span>
          </div>
          <span className="text-brand-accent">{progressPercent}%</span>
        </div>

        {/* Progress Bar visual */}
        <div className="h-3 bg-brand-bg rounded-full overflow-hidden border border-brand-border/40">
          <div
            className="h-full bg-brand-accent rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs font-semibold text-brand-muted">
          <span>{agent.ordersToday} {isUrdu ? 'آرڈرز' : 'booked'}</span>
          <span>{agent.targetOrders} {isUrdu ? 'کا ہدف' : 'target'}</span>
        </div>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Distance covered */}
        <div className="bg-white border border-brand-border/60 p-4 rounded-xl shadow-sm">
          <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">
            {t('distance')}
          </span>
          <p className="text-lg font-display font-black text-brand-dark mt-1">
            {agent.distanceKm} km
          </p>
          <span className="text-[10px] text-brand-muted font-medium block mt-0.5">
            {isUrdu ? 'آج کا کل سفر' : 'Total route run'}
          </span>
        </div>

        {/* Fuel saved */}
        <div className="bg-brand-accent/5 border border-brand-accent/20 p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">
              {t('fuelSaved')}
            </span>
            <Fuel className="w-3.5 h-3.5 text-brand-accent" />
          </div>
          <p className="text-lg font-display font-black text-brand-accent mt-1">
            +{agent.fuelSavedPercent}%
          </p>
          <span className="text-[10px] text-brand-muted font-medium block mt-0.5">
            {isUrdu ? 'بچت شدہ پٹرول' : 'AI optimization'}
          </span>
        </div>
      </div>

      {/* Next Stop banner card */}
      <div className="bg-brand-dark text-white p-5 rounded-2xl relative overflow-hidden shadow-md flex-1 flex flex-col justify-between min-h-[160px]">
        {/* Background mesh grid */}
        <div className="absolute right-0 bottom-0 w-32 h-32 opacity-10 pointer-events-none grid-motif"></div>

        <div>
          <div className="flex items-center gap-2 text-brand-warning">
            <Compass className="w-4.5 h-4.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {t('nextStop')}
            </span>
          </div>

          <h2 className="text-xl font-display font-extrabold mt-3 text-white">
            {isUrdu ? nextShop.urduName : nextShop.name}
          </h2>
          <p className="text-xs text-gray-300 mt-1 font-medium">
            {nextShop.area}, {isUrdu ? 'کراچی' : 'Karachi'}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
          <div className="text-left">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
              {isUrdu ? 'پچھلا آرڈر' : 'Last visit value'}
            </p>
            <p className="text-xs text-brand-warning font-black mt-0.5">
              Rs {nextShop.lastOrderValue.toLocaleString()}
            </p>
          </div>

          <Link
            href="/app/ai-suggest"
            className="flex items-center gap-1 bg-brand-accent hover:bg-brand-accent/90 transition-all text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-md"
          >
            <span>{isUrdu ? 'شروع کریں' : 'Start Visit'}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isUrdu ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>

      {/* Local AI warning notification badge */}
      <div className="flex items-center gap-2 bg-brand-warning/10 border border-brand-warning/20 p-3 rounded-xl">
        <Sparkles className="w-4 h-4 text-brand-warning animate-pulse shrink-0" />
        <p className="text-[10px] text-brand-dark font-semibold leading-relaxed">
          {isUrdu 
            ? 'بیٹ فلو AI: المدینہ جنرل اسٹور پر گرم موسم کی وجہ سے کولڈ ڈرنکس کی زیادہ مانگ متوقع ہے۔'
            : 'AI Tip: High demand on Olpers items expected at Al-Madina due to hot weather.'}
        </p>
      </div>
    </div>
  );
}
