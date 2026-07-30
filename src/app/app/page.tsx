'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/app/layout';
import { Smartphone, Lock, Eye, ArrowRight, CheckCircle2, Languages } from 'lucide-react';

export default function ClientLogin() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/app/home');
    }, 1200);
  };

  const isUrdu = language === 'ur';

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-brand-bg relative overflow-hidden animate-fade-in">
      {/* Decorative Network Grid lines */}
      <div className="absolute right-0 top-0 w-32 h-32 opacity-15 pointer-events-none grid-motif"></div>

      {/* Top Bar: Language Select */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-brand-border text-xs font-bold text-brand-dark shadow-sm active:scale-95 transition-all"
        >
          <Languages className="w-3.5 h-3.5 text-brand-accent" />
          <span>{isUrdu ? 'English Mode' : 'اردو انٹرفیس'}</span>
        </button>
      </div>

      {/* Mid Section: Logo & Branding */}
      <div className="flex flex-col items-center text-center my-auto space-y-6">
        {/* Animated Brand Pulse Mark */}
        <div className="relative flex items-center justify-center">
          {/* Outer ripples */}
          <div className="absolute w-24 h-24 rounded-full bg-brand-accent/10 animate-ping"></div>
          <div className="absolute w-16 h-16 rounded-full bg-brand-accent/20 animate-pulse"></div>
          
          <div className="w-16 h-16 rounded-2xl bg-brand-dark flex items-center justify-center z-10 shadow-lg border border-brand-border/10">
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 32H18L26 12L38 52L46 32H58"
                stroke="#1B7A5A"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-display font-extrabold text-brand-dark tracking-tight">
            Beat<span className="text-brand-accent">Flow</span>
          </h1>
          <p className="text-xs font-bold text-brand-warning tracking-widest uppercase mt-1">
            {isUrdu ? 'آف لائن آرڈر بکنگ روٹ' : 'Beyond Tracking. Start Predicting.'}
          </p>
          <p className="text-xs text-brand-muted mt-2 font-medium">
            {isUrdu 
              ? 'پاکستان کے صفِ اول کی ڈسٹری بیوشن ٹیکنالوجی' 
              : 'Pakistan\'s AI-powered field agent portal'}
          </p>
        </div>
      </div>

      {/* Bottom Section: Form Cards */}
      <div className="space-y-4">
        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="bg-white border border-brand-border p-5 rounded-2xl shadow-md space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-display font-black text-brand-dark">
                {isUrdu ? 'لاگ ان کریں' : 'Field Login'}
              </h2>
              <p className="text-xs text-brand-muted font-medium">
                {isUrdu ? 'اپنا موبائل نمبر درج کریں' : 'Enter your registered phone number to verify'}
              </p>
            </div>

            {/* Input Phone */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider">
                {isUrdu ? 'فون نمبر' : 'Phone Number'}
              </label>
              <div className="relative">
                <Smartphone className={`w-4 h-4 text-brand-muted absolute top-3.5 ${isUrdu ? 'right-3' : 'left-3'}`} />
                <input
                  type="tel"
                  placeholder="0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full bg-brand-bg/50 border border-brand-border py-3 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-accent/50 focus:bg-white transition-all text-brand-dark placeholder:text-brand-muted/50 ${
                    isUrdu ? 'pr-10 pl-4' : 'pl-10 pr-4'
                  }`}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !phone}
              className="w-full bg-brand-accent text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-accent/15 active:scale-95 transition-all hover:bg-brand-accent/95 disabled:opacity-50"
            >
              <span>{loading ? (isUrdu ? 'انتظار کریں...' : 'Sending...') : (isUrdu ? 'او ٹی پی حاصل کریں' : 'Send Verification OTP')}</span>
              {!loading && <ArrowRight className={`w-4 h-4 ${isUrdu ? 'rotate-180' : ''}`} />}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="bg-white border border-brand-border p-5 rounded-2xl shadow-md space-y-4 animate-slide-up">
            <div className="space-y-1">
              <h2 className="text-lg font-display font-black text-brand-dark">
                {isUrdu ? 'تصدیقی کوڈ درج کریں' : 'Enter Security OTP'}
              </h2>
              <p className="text-xs text-brand-muted font-medium">
                {isUrdu ? 'کوڈ درج کریں جو آپ کو موصول ہوا' : 'Verification code sent to'} <strong className="text-brand-dark">{phone}</strong>
              </p>
            </div>

            {/* Input OTP */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider">
                {isUrdu ? 'او ٹی پی کوڈ' : 'One-Time Password'}
              </label>
              <div className="relative">
                <Lock className={`w-4 h-4 text-brand-muted absolute top-3.5 ${isUrdu ? 'right-3' : 'left-3'}`} />
                <input
                  type="text"
                  maxLength={4}
                  placeholder="1234"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`w-full bg-brand-bg/50 border border-brand-border py-3 rounded-xl text-sm font-semibold tracking-widest text-center focus:outline-none focus:border-brand-accent/50 focus:bg-white transition-all text-brand-dark placeholder:text-brand-muted/30 placeholder:tracking-normal ${
                    isUrdu ? 'pr-10' : 'pl-10'
                  }`}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !otp}
              className="w-full bg-brand-accent text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-accent/15 active:scale-95 transition-all hover:bg-brand-accent/95 disabled:opacity-50"
            >
              <span>{loading ? (isUrdu ? 'تصدیق ہو رہی ہے...' : 'Verifying...') : (isUrdu ? 'لاگ ان مکمل کریں' : 'Verify & Log In')}</span>
              {!loading && <ArrowRight className={`w-4 h-4 ${isUrdu ? 'rotate-180' : ''}`} />}
            </button>

            {/* Back to Phone */}
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-xs font-semibold text-brand-muted hover:text-brand-dark active:scale-95 transition-all py-1"
            >
              {isUrdu ? 'نمبر تبدیل کریں' : 'Change Phone Number'}
            </button>
          </form>
        )}

        {/* Localized footer */}
        <p className="text-[10px] text-brand-muted text-center font-medium leading-relaxed">
          {isUrdu 
            ? 'میڈ ان پاکستان۔ پاکستان کے قیمتی ڈالرز بچانے کے لیے تیار کردہ۔' 
            : 'Made in Pakistan. Built to save Pakistan\'s foreign reserves.'}
        </p>
      </div>
    </div>
  );
}
