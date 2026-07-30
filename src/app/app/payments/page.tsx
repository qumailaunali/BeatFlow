'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/app/app/layout';
import {
  CreditCard,
  CheckCircle2,
  Smartphone,
  Coins,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { mockPayments } from '@/data/mockData';

export default function ClientPayments() {
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';

  // State
  const [selectedMethod, setSelectedMethod] = useState<'JazzCash' | 'EasyPaisa' | 'Cash'>('JazzCash');
  const [collected, setCollected] = useState(false);

  // Target Payment details
  const paymentTarget = mockPayments[2]; // Rehman Kiryana Store pending payment

  const handleConfirm = () => {
    setCollected(true);
    setTimeout(() => {
      setCollected(false);
    }, 2000);
  };

  return (
    <div className="flex-1 p-5 space-y-5 flex flex-col justify-start animate-fade-in pb-12">
      {/* Page Title */}
      <div className="text-center pb-2 border-b border-brand-border/40">
        <h1 className="text-md font-display font-extrabold text-brand-dark">
          {t('collectPayment')}
        </h1>
        <p className="text-[10px] text-brand-muted font-medium mt-0.5">
          {paymentTarget.shopName} | Ref: {paymentTarget.invoiceRef}
        </p>
      </div>

      {/* Amount Display Box */}
      <div className="bg-brand-accent text-white p-6 rounded-2xl relative overflow-hidden text-center shadow-md border border-brand-border/10">
        <div className="absolute right-0 top-0 w-24 h-24 opacity-10 pointer-events-none grid-motif"></div>
        
        <span className="text-[9px] font-bold text-brand-warning tracking-widest uppercase block mb-1">
          {t('amountCollect')}
        </span>
        <h2 className="text-3xl font-display font-black text-white">
          Rs {paymentTarget.amount.toLocaleString()}
        </h2>
        <span className="text-[10px] text-gray-200 mt-2 block font-medium">
          {isUrdu ? 'تخمینہ شدہ لوڈ شیٹ کے مطابق وصولی' : 'Calculated order replenishment due'}
        </span>
      </div>

      {/* Selection Label */}
      <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest px-1 block">
        {t('selectMethod')}
      </span>

      {/* Radio Wallet Selector Cards */}
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px]">
        {/* JazzCash option */}
        <div
          onClick={() => setSelectedMethod('JazzCash')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            selectedMethod === 'JazzCash'
              ? 'border-brand-accent bg-brand-accent/5 shadow-sm'
              : 'border-brand-border bg-white hover:border-brand-border/80'
          }`}
        >
          <div className="flex items-center gap-3.5">
            {/* Mock JazzCash Visual Icon */}
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white font-bold font-display text-sm flex items-center justify-center shrink-0 shadow-sm border border-red-500/20">
              JC
            </div>
            <div>
              <p className="text-sm font-bold text-brand-dark">JazzCash Wallet</p>
              <p className="text-[10px] text-brand-muted font-medium mt-0.5">
                {isUrdu ? 'موبائل والٹ ٹرانسفر' : 'Mobile payment transfer'}
              </p>
            </div>
          </div>

          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
            selectedMethod === 'JazzCash' 
              ? 'border-brand-accent bg-brand-accent text-white' 
              : 'border-brand-border'
          }`}>
            {selectedMethod === 'JazzCash' && <span className="w-2.5 h-2.5 bg-white rounded-full"></span>}
          </div>
        </div>

        {/* EasyPaisa option */}
        <div
          onClick={() => setSelectedMethod('EasyPaisa')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            selectedMethod === 'EasyPaisa'
              ? 'border-brand-accent bg-brand-accent/5 shadow-sm'
              : 'border-brand-border bg-white hover:border-brand-border/80'
          }`}
        >
          <div className="flex items-center gap-3.5">
            {/* Mock EasyPaisa Visual Icon */}
            <div className="w-10 h-10 rounded-xl bg-green-600 text-white font-bold font-display text-sm flex items-center justify-center shrink-0 shadow-sm border border-green-500/20">
              EP
            </div>
            <div>
              <p className="text-sm font-bold text-brand-dark">EasyPaisa Wallet</p>
              <p className="text-[10px] text-brand-muted font-medium mt-0.5">
                {isUrdu ? 'موبائل والٹ ٹرانسفر' : 'Mobile payment transfer'}
              </p>
            </div>
          </div>

          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
            selectedMethod === 'EasyPaisa' 
              ? 'border-brand-accent bg-brand-accent text-white' 
              : 'border-brand-border'
          }`}>
            {selectedMethod === 'EasyPaisa' && <span className="w-2.5 h-2.5 bg-white rounded-full"></span>}
          </div>
        </div>

        {/* Cash option */}
        <div
          onClick={() => setSelectedMethod('Cash')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
            selectedMethod === 'Cash'
              ? 'border-brand-accent bg-brand-accent/5 shadow-sm'
              : 'border-brand-border bg-white hover:border-brand-border/80'
          }`}
        >
          <div className="flex items-center gap-3.5">
            {/* Mock Cash Visual Icon */}
            <div className="w-10 h-10 rounded-xl bg-brand-dark text-white font-bold font-display text-sm flex items-center justify-center shrink-0 shadow-sm border border-brand-dark/20">
              RS
            </div>
            <div>
              <p className="text-sm font-bold text-brand-dark">Cash Payment</p>
              <p className="text-[10px] text-brand-muted font-medium mt-0.5">
                {isUrdu ? 'نقد وصولی' : 'Collected physical currency'}
              </p>
            </div>
          </div>

          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
            selectedMethod === 'Cash' 
              ? 'border-brand-accent bg-brand-accent text-white' 
              : 'border-brand-border'
          }`}>
            {selectedMethod === 'Cash' && <span className="w-2.5 h-2.5 bg-white rounded-full"></span>}
          </div>
        </div>
      </div>

      {/* Confirmation Block */}
      <div className="bg-white border-t border-brand-border pt-4 shrink-0">
        {collected ? (
          <div className="w-full bg-brand-success text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md">
            <CheckCircle2 className="w-4.5 h-4.5 animate-bounce" />
            <span>{isUrdu ? 'وصولی کامیابی سے درج ہو گئی!' : 'Payment collection recorded!'}</span>
          </div>
        ) : (
          <button
            onClick={handleConfirm}
            className="w-full bg-brand-accent text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-accent/15 active:scale-95 transition-all hover:bg-brand-accent/95"
          >
            <ShieldCheck className="w-4.5 h-4.5" />
            <span>{t('confirmCollection')}</span>
          </button>
        )}
      </div>
    </div>
  );
}
