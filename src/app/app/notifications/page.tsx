'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/app/app/layout';
import {
  Send,
  CheckCheck,
  ChevronLeft,
  Phone,
  Video,
  MoreVertical,
  ShieldCheck,
  AlertTriangle,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function WhatsAppNotifications() {
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';

  const [messageText, setMessageText] = useState('');

  // Messages log
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      text: isUrdu
        ? 'آرڈرز کی تصدیق، اسٹاک الرٹس اور ادائیگیوں کی یاددہانی کے لیے بیٹ فلو آفیشل واٹس ایپ چیٹ'
        : 'Official BeatFlow Business Automation channel for confirmations, alerts, and reminder logs.',
      time: '09:00 AM'
    },
    {
      id: 2,
      type: 'order',
      title: isUrdu ? 'آرڈر کی تصدیق' : 'Order Confirmed',
      text: isUrdu
        ? 'المدینہ جنرل اسٹور کا آرڈر کامیابی سے سسٹم میں رجسٹر ہو گیا ہے۔ کل قیمت: 13,615 روپے۔'
        : 'Order confirmed for Al-Madina General Store. Value: Rs 13,615. Items: Olpers Milk, Rooh Afza.',
      time: '10:12 AM',
      read: true
    },
    {
      id: 3,
      type: 'alert',
      title: isUrdu ? 'اسٹاک الرٹ' : 'Stockout Alert',
      text: isUrdu
        ? 'رحمان کریانہ اسٹور پر اولپرز دودھ کا اسٹاک کم ہے۔ براہ کرم وزٹ کے دوران ترجیح دیں۔'
        : 'Olpers Milk running low at Rehman Kiryana. Expected stockout within 48 hours.',
      time: '11:47 AM',
      read: true
    },
    {
      id: 4,
      type: 'payment',
      title: isUrdu ? 'رقم کی وصولی کی یاددہانی' : 'Payment Reminder',
      text: isUrdu
        ? 'بابا ٹریڈرز سے 2,300 روپے واجب الادا ہیں۔ وزٹ کے دوران رقم جمع کریں۔'
        : 'Rs 2,300 outstanding from Baba Traders. Please request payment during today\'s visit.',
      time: '02:03 PM',
      read: true
    }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText) return;

    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        type: 'user',
        title: '',
        text: messageText,
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        read: false
      }
    ]);
    setMessageText('');
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#efeae2] relative animate-fade-in">
      {/* WhatsApp Header block */}
      <div className="bg-[#075e54] text-white py-3 px-4 flex items-center justify-between shrink-0 select-none z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/app/home" className="hover:bg-white/10 p-1.5 rounded-full transition-all">
            <ChevronLeft className={`w-5 h-5 ${isUrdu ? 'rotate-180' : ''}`} />
          </Link>
          
          {/* Avatar and Info */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-black text-brand-dark text-xs relative">
              BF
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-success rounded-full ring-2 ring-[#075e54]"></span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">BeatFlow AI</span>
                <ShieldCheck className="w-3.5 h-3.5 fill-white text-[#00a884] shrink-0" />
              </div>
              <span className="text-[10px] text-white/80 font-medium">Business Account</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 opacity-90">
          <Video className="w-4.5 h-4.5" />
          <Phone className="w-4.5 h-4.5" />
          <MoreVertical className="w-4.5 h-4.5" />
        </div>
      </div>

      {/* Messages Thread list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col justify-start">
        {messages.map((msg) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="self-center bg-white/95 border border-brand-border/40 py-1.5 px-3 rounded-lg text-[10px] text-brand-muted font-bold text-center max-w-[280px] shadow-sm uppercase tracking-wider">
                {msg.text}
              </div>
            );
          }

          const isUser = msg.type === 'user';

          return (
            <div
              key={msg.id}
              className={`max-w-[85%] p-3.5 rounded-xl shadow-sm relative flex flex-col gap-1.5 ${
                isUser
                  ? 'self-end bg-[#d9fdd3] text-brand-dark'
                  : 'self-start bg-white text-brand-dark'
              }`}
            >
              {/* Message Header tag */}
              {!isUser && msg.title && (
                <span className={`text-[9px] font-black uppercase tracking-wider ${
                  msg.type === 'alert' 
                    ? 'text-brand-danger' 
                    : msg.type === 'payment' 
                    ? 'text-brand-warning' 
                    : 'text-brand-accent'
                }`}>
                  {msg.title}
                </span>
              )}

              <p className="text-xs font-semibold leading-relaxed">{msg.text}</p>
              
              {/* Message Footer stats */}
              <div className="flex items-center justify-end gap-1 text-[9px] text-brand-muted select-none self-end mt-1">
                <span>{msg.time}</span>
                {!isUser && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb] shrink-0" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input chat drawer */}
      <form onSubmit={handleSend} className="bg-[#f0f2f5] p-3 flex items-center gap-2 border-t border-brand-border/50 shrink-0">
        <input
          type="text"
          placeholder={isUrdu ? 'چیٹ پیغام ٹائپ کریں...' : 'Type a message...'}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className={`flex-1 bg-white border border-brand-border/80 px-4 py-2 rounded-full text-xs font-medium focus:outline-none focus:border-brand-accent/50 text-brand-dark placeholder:text-brand-muted/70 ${
            isRTL ? 'text-right' : 'text-left'
          }`}
        />
        <button
          type="submit"
          disabled={!messageText}
          className="p-2.5 bg-[#00a884] text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 disabled:opacity-50"
        >
          <Send className={`w-4 h-4 ${isUrdu ? 'rotate-180' : ''}`} />
        </button>
      </form>
    </div>
  );
}
// Helper variable for direction check inside layout component scope
const isRTL = true;
