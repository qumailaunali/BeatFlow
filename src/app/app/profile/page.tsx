'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/app/layout';
import {
  User,
  Clock,
  MapPin,
  TrendingUp,
  Languages,
  LogOut,
  ChevronRight,
  Shield,
  Phone,
  Target
} from 'lucide-react';
import { mockSalesmen } from '@/data/mockData';

export default function ClientProfile() {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const isUrdu = language === 'ur';

  // Get agent Qumail
  const agent = mockSalesmen[0];

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="flex-1 p-5 space-y-5 flex flex-col justify-start animate-fade-in pb-12">
      {/* Profile Header */}
      <div className="flex items-center gap-4 bg-white border border-brand-border p-4 rounded-2xl shadow-sm">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0 bg-brand-accent/15 border-brand-accent/30 text-brand-accent">
          <User className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-lg font-display font-extrabold text-brand-dark">
            {isUrdu ? agent.urduName : agent.name}
          </h2>
          <p className="text-xs text-brand-muted font-medium mt-0.5">{agent.phone}</p>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-brand-accent/10 text-brand-accent mt-1 border border-brand-accent/20">
            {isUrdu ? 'سینئر سیلز ایجنٹ' : 'Senior Field Representative'}
          </span>
        </div>
      </div>

      {/* Language Toggle Setting Card */}
      <div className="bg-white border border-brand-border p-4 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-dark">
            <Languages className="w-5 h-5 text-brand-accent shrink-0" />
            <span className="text-xs font-bold">{t('langToggle')}</span>
          </div>
          
          <button
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            className={`w-12 h-6 rounded-full p-1 transition-all ${
              isUrdu ? 'bg-brand-accent' : 'bg-brand-muted/30'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transition-all ${
                isUrdu ? (isUrdu ? 'translate-x-0' : '-translate-x-6') : (isUrdu ? '-translate-x-6' : 'translate-x-6')
              }`}
              style={{
                transform: isUrdu 
                  ? 'translateX(-24px)' 
                  : 'translateX(0px)'
              }}
            ></div>
          </button>
        </div>
        <p className="text-[10px] text-brand-muted leading-relaxed font-semibold">
          {isUrdu 
            ? 'پوری ایپ کے تمام مینیو اور لکھائی کو اردو میں تبدیل کریں (RTL فارمیٹ)'
            : 'Toggle layout rendering from English (LTR) to Urdu (RTL) mode.'}
        </p>
      </div>

      {/* Stats list */}
      <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest px-1 block">
        {t('stats')}
      </span>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-1">
        {/* On Time visit score */}
        <div className="bg-white border border-brand-border/60 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent shrink-0">
              <Clock className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-dark">
                {isUrdu ? 'وقت کی پابندی' : 'On-Time Beat Compliance'}
              </p>
              <p className="text-[9px] text-brand-muted font-medium mt-0.5">
                {isUrdu ? 'ہفتہ وار اوسط' : 'Weekly adherence average'}
              </p>
            </div>
          </div>
          <span className="text-sm font-black text-brand-accent">{agent.onTimePercent}%</span>
        </div>

        {/* Total Orders synced */}
        <div className="bg-white border border-brand-border/60 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent shrink-0">
              <Target className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-dark">
                {isUrdu ? 'آج کی آرڈر بکنگ' : 'Route Target Achievement'}
              </p>
              <p className="text-[9px] text-brand-muted font-medium mt-0.5">
                {isUrdu ? 'ہدف بمقابلہ حاصل کردہ' : 'Total booked orders vs target'}
              </p>
            </div>
          </div>
          <span className="text-sm font-black text-brand-dark">{agent.ordersToday} / {agent.targetOrders}</span>
        </div>

        {/* Security / Server sync logs */}
        <div className="bg-white border border-brand-border/60 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent shrink-0">
              <Shield className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-dark">
                {isUrdu ? 'مقامی ڈیٹا سیکیورٹی' : 'Offline Database Sync'}
              </p>
              <p className="text-[9px] text-brand-muted font-medium mt-0.5">
                {isUrdu ? 'ڈیٹا محفوظ ہے' : 'Local SQLite cache healthy'}
              </p>
            </div>
          </div>
          <span className="text-xs text-brand-success font-bold uppercase">{isUrdu ? 'محفوظ ہے' : 'Secured'}</span>
        </div>
      </div>

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="w-full bg-brand-bg border border-brand-border text-brand-danger py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-50/50 active:scale-95 transition-all mt-auto"
      >
        <LogOut className="w-4 h-4 shrink-0" />
        <span>{t('logout')}</span>
      </button>
    </div>
  );
}
