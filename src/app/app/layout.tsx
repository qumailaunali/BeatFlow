'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingBag,
  Map,
  CreditCard,
  User,
  Wifi,
  Battery,
  Signal,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';

// Translation types
export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appName: 'BeatFlow',
    offlineBadge: 'Offline — will sync automatically',
    bookOrder: 'Book Order',
    confirmOrder: 'Confirm Order',
    orderTotal: 'Order Total',
    acceptSuggested: 'Accept Suggested Order',
    predictedOrderValue: 'Predicted Order Value',
    poweredByAI: 'Powered by BeatFlow AI',
    startRoute: 'Start Route',
    todayRoute: "Today's Route",
    stops: 'stops',
    distance: 'Distance',
    estTime: 'Est. time',
    fuelSaved: 'Fuel saved',
    collectPayment: 'Collect Payment',
    amountCollect: 'AMOUNT TO COLLECT',
    selectMethod: 'SELECT PAYMENT METHOD',
    confirmCollection: 'Confirm Collection',
    targetAchieved: 'Today\'s Target vs Achieved',
    ordersBooked: 'Orders booked',
    distCovered: 'Distance covered',
    nextStop: 'Next Stop',
    greeting: 'Assalam-o-Alaikum, Qumail',
    todaySummary: "Today's Summary",
    whatsappTitle: 'BeatFlow WhatsApp',
    orderConfirmed: 'Order confirmed for Al-Madina',
    stockAlert: 'STOCK ALERT: Olpers Milk running low',
    paymentReminder: 'PAYMENT REMINDER: Rs 2,300 due',
    profileTitle: 'Salesman Profile',
    stats: 'Performance Stats',
    langToggle: 'Urdu Language Mode',
    logout: 'Log Out',
    offlineStatus: 'Offline Mode Active'
  },
  ur: {
    appName: 'بیٹ فلو',
    offlineBadge: 'آف لائن — خودکار طور پر مطابقت پذیر ہو جائے گا',
    bookOrder: 'آرڈر بک کریں',
    confirmOrder: 'آرڈر محفوظ کریں',
    orderTotal: 'کل آرڈر قیمت',
    acceptSuggested: 'تجویز کردہ آرڈر قبول کریں',
    predictedOrderValue: 'پیش گوئی آرڈر قیمت',
    poweredByAI: 'بیٹ فلو مقامی آرٹیفیشل انٹیلیجنس',
    startRoute: 'روٹ شروع کریں',
    todayRoute: 'آج کا روٹ',
    stops: 'اسٹاپس',
    distance: 'فاصلہ',
    estTime: 'تخمینہ وقت',
    fuelSaved: 'بچت شدہ ایندھن',
    collectPayment: 'رقم جمع کریں',
    amountCollect: 'وصولی کی رقم',
    selectMethod: 'طریقہ منتخب کریں',
    confirmCollection: 'رقم وصولی کی تصدیق کریں',
    targetAchieved: 'آج کا ہدف بمقابلہ کامیابی',
    ordersBooked: 'بک شدہ آرڈر',
    distCovered: 'طے شدہ فاصلہ',
    nextStop: 'اگلا اسٹاپ',
    greeting: 'السلام علیکم، کمیل',
    todaySummary: 'آج کا خلاصہ',
    whatsappTitle: 'بیٹ فلو واٹس ایپ',
    orderConfirmed: 'المدینہ جنرل اسٹور کا آرڈر منظور',
    stockAlert: 'اسٹاک الرٹ: اولپرز دودھ ختم ہونے والا ہے',
    paymentReminder: 'رقم الرٹ: بابا ٹریڈرز سے 2300 روپے واجب الادا',
    profileTitle: 'سیلز مین پروفائل',
    stats: 'کارکردگی کی رپورٹ',
    langToggle: 'اردو انٹرفیس موڈ',
    logout: 'لاگ آؤٹ کریں',
    offlineStatus: 'آف لائن موڈ فعال ہے'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>('en');
  const [time, setTime] = useState('09:41');

  useEffect(() => {
    // Tick mock time
    const timer = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ur';

  // Navigation Items
  const navItems = [
    { label: language === 'ur' ? 'ہوم' : 'Home', href: '/app/home', icon: Home },
    { label: language === 'ur' ? 'آرڈر' : 'Orders', href: '/app/book', icon: ShoppingBag },
    { label: language === 'ur' ? 'روٹ' : 'Route', href: '/app/route', icon: Map },
    { label: language === 'ur' ? 'ادائیگی' : 'Payments', href: '/app/payments', icon: CreditCard },
    { label: language === 'ur' ? 'پروفائل' : 'More', href: '/app/profile', icon: User },
  ];

  // Determine if it's the splash/login page
  const isSplashPage = pathname === '/app';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-0 md:p-8 font-sans">
        {/* Quick Link to Return to Admin Dashboard (Desktop only float) */}
        <div className="hidden lg:flex fixed left-6 top-6 z-50 flex-col gap-2">
          <Link
            href="/admin"
            className="flex items-center gap-2 bg-brand-dark/95 border border-brand-border/10 text-white font-semibold text-sm px-4 py-2.5 rounded-2xl shadow-xl hover:bg-brand-dark transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-brand-warning" />
            <span>Go to Admin Dashboard</span>
          </Link>
        </div>

        {/* Smartphone Frame Container */}
        <div
          dir={isRTL ? 'rtl' : 'ltr'}
          className={`w-full h-screen md:w-[390px] md:h-[844px] md:max-h-[90vh] md:rounded-[48px] bg-brand-bg shadow-2xl relative flex flex-col overflow-hidden border-[10px] border-neutral-950/90 transition-all duration-300 ${
            isRTL ? 'font-sans' : 'font-sans'
          }`}
        >
          {/* Smartphone Speaker & Camera Notch (Desktop frame view only) */}
          <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-neutral-950 rounded-b-2xl z-40">
            <div className="w-12 h-1 bg-neutral-800 rounded-full mx-auto mt-1"></div>
          </div>

          {/* Smartphone Status Bar Mock */}
          {!isSplashPage && (
            <div className="h-12 shrink-0 bg-brand-dark text-white flex items-center justify-between px-6 pt-2 z-30 select-none text-xs font-semibold">
              <span className="font-display tracking-tight text-white/95">{time}</span>
              <div className="flex items-center gap-2 text-white/90">
                <Signal className="w-3.5 h-3.5 fill-current" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4.5 h-4.5 rotate-90 scale-90 translate-y-[1px]" />
              </div>
            </div>
          )}

          {/* Subpage Contents (Scrollable viewport) */}
          <div className="flex-1 overflow-y-auto relative flex flex-col no-scrollbar">
            {children}
          </div>

          {/* Simulated WhatsApp Floating Bubble Alert */}
          {!isSplashPage && pathname !== '/app/notifications' && (
            <Link
              href="/app/notifications"
              className={`absolute bottom-20 ${
                isRTL ? 'left-4' : 'right-4'
              } z-40 bg-brand-accent p-3.5 rounded-full text-white shadow-xl hover:scale-105 active:scale-95 transition-all animate-bounce`}
              title="View WhatsApp updates"
            >
              <MessageSquare className="w-6 h-6 fill-current" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-warning rounded-full border-2 border-brand-bg flex items-center justify-center text-[10px] font-black text-brand-dark">
                3
              </span>
            </Link>
          )}

          {/* Bottom Smartphone Navigation Bar */}
          {!isSplashPage && (
            <nav className="h-16 shrink-0 bg-white border-t border-brand-border flex items-center justify-around pb-2 px-3 z-30 shadow-lg">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center justify-center gap-1 transition-all ${
                      isActive ? 'text-brand-accent scale-105 font-bold' : 'text-brand-muted hover:text-brand-accent'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                    <span className="text-[10px] font-bold">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Smartphone Bottom Home Swipe Bar (Desktop frame view only) */}
          <div className="hidden md:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-neutral-900/40 rounded-full z-40"></div>
        </div>
      </div>
    </LanguageContext.Provider>
  );
}
