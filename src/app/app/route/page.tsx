'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/app/app/layout';
import { mockShops } from '@/data/mockData';
import {
  Navigation,
  Compass,
  MapPin,
  CheckCircle2,
  Play,
  Check,
  Fuel,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function ClientRoute() {
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';

  // Mark stops as completed
  const [stops, setStops] = useState([
    { id: 'shop-1', name: 'Al-Madina General Store', urduName: 'المدینہ جنرل اسٹور', completed: false, num: 1, text: 'Stop 1' },
    { id: 'shop-3', name: 'Rehman Kiryana Store', urduName: 'رحمان کریانہ اسٹور', completed: false, num: 2, text: 'Stop 2' },
    { id: 'shop-4', name: 'Tayyaba Super Mart', urduName: 'طیبہ سپر مارٹ', completed: false, num: 3, text: 'Stop 3' },
    { id: 'shop-2', name: 'Baba Traders', urduName: 'بابا ٹریڈرز', completed: false, num: 4, text: 'Stop 4' }
  ]);

  const [routeStarted, setRouteStarted] = useState(false);

  const toggleStop = (id: string) => {
    setStops(prev =>
      prev.map(stop => (stop.id === id ? { ...stop, completed: !stop.completed } : stop))
    );
  };

  const handleStartRoute = () => {
    setRouteStarted(true);
  };

  const completedCount = stops.filter(s => s.completed).length;

  return (
    <div className="flex-1 flex flex-col justify-start animate-fade-in pb-12">
      {/* Interactive Map Visual */}
      <div className="h-64 bg-brand-bg/50 relative overflow-hidden border-b border-brand-border flex items-center justify-center shrink-0">
        <div className="absolute inset-0 opacity-20 grid-motif"></div>
        
        {/* SVG Map Layout */}
        <svg className="w-full h-full p-4" viewBox="0 0 240 160">
          {/* Roads lines */}
          <path d="M 10 30 L 230 30" stroke="#E3E8E1" strokeWidth="3" />
          <path d="M 10 90 L 230 90" stroke="#E3E8E1" strokeWidth="3" />
          <path d="M 10 140 L 230 140" stroke="#E3E8E1" strokeWidth="3" />
          <path d="M 50 10 L 50 150" stroke="#E3E8E1" strokeWidth="3" />
          <path d="M 120 10 L 120 150" stroke="#E3E8E1" strokeWidth="3" />
          <path d="M 180 10 L 180 150" stroke="#E3E8E1" strokeWidth="3" />

          {/* AI Optimized Route Path (emerald dashed) */}
          <path
            d="M 30 140 L 50 30 L 120 90 L 180 30 L 180 140"
            fill="none"
            stroke="#1B7A5A"
            strokeWidth="3.5"
            strokeDasharray="4 3"
            opacity={routeStarted ? 1 : 0.4}
            className={routeStarted ? "animate-pulse" : ""}
          />

          {/* Starting point Depot */}
          <circle cx="30" cy="140" r="7" fill="#0F3D2E" stroke="#fff" strokeWidth="1.5" />
          <text x="30" y="143" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle">D</text>

          {/* Stops Markers */}
          {stops.map(stop => {
            let markerColor = '#1B7A5A'; // Active
            if (stop.completed) markerColor = '#E3E8E1'; // Completed
            else if (!routeStarted) markerColor = '#6B7280'; // Not started

            let cy = 30;
            let cx = 50;
            if (stop.num === 1) { cx = 50; cy = 30; }
            else if (stop.num === 2) { cx = 120; cy = 90; }
            else if (stop.num === 3) { cx = 180; cy = 30; }
            else if (stop.num === 4) { cx = 180; cy = 140; }

            return (
              <g key={stop.id}>
                <circle cx={cx} cy={cy} r={7} fill={markerColor} stroke="#fff" strokeWidth="1" />
                <text x={cx} y={cy + 2.5} fill={stop.completed ? '#2E2E2E' : 'white'} fontSize="6" fontWeight="bold" textAnchor="middle">
                  {stop.num}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Map Float Info */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-white/90 backdrop-blur px-3.5 py-2 rounded-xl border border-brand-border shadow-sm">
          <span className="text-[10px] font-bold text-brand-dark uppercase tracking-wider">
            {isUrdu ? 'آج کا روٹ نقشہ' : 'Beat Optimizer Map'}
          </span>
          <span className="text-[9px] font-bold text-brand-accent flex items-center gap-1">
            <Compass className="w-3 h-3 text-brand-accent animate-spin-slow" />
            <span>{isUrdu ? 'جی پی ایس آن ہے' : 'Optimized GPS active'}</span>
          </span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-brand-border p-4 grid grid-cols-4 gap-2 text-center text-xs shrink-0 select-none">
        <div>
          <span className="text-[9px] text-brand-muted font-bold block uppercase">{isUrdu ? 'اسٹاپس' : 'Stops'}</span>
          <span className="font-display font-black text-brand-dark mt-1 block">
            {completedCount} <span className="text-[10px] text-brand-muted">/ {stops.length}</span>
          </span>
        </div>
        <div>
          <span className="text-[9px] text-brand-muted font-bold block uppercase">{isUrdu ? 'فاصلہ' : 'Distance'}</span>
          <span className="font-display font-black text-brand-dark mt-1 block">12 km</span>
        </div>
        <div>
          <span className="text-[9px] text-brand-muted font-bold block uppercase">{isUrdu ? 'وقت' : 'Duration'}</span>
          <span className="font-display font-black text-brand-dark mt-1 block">3h 20m</span>
        </div>
        <div>
          <span className="text-[9px] text-brand-accent font-bold block uppercase">{isUrdu ? 'بچت' : 'Fuel Saved'}</span>
          <span className="font-display font-black text-brand-accent mt-1 block">~18%</span>
        </div>
      </div>

      {/* Route Action Control */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        {!routeStarted ? (
          <div className="space-y-4 text-center my-auto">
            <div className="p-4 bg-brand-accent/5 border border-brand-accent/25 rounded-2xl">
              <h3 className="font-display font-bold text-brand-dark text-sm">
                {isUrdu ? 'روٹ شروع کرنے کے لیے تیار؟' : 'Ready to start Gulshan beat?'}
              </h3>
              <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                {isUrdu 
                  ? 'رن شروع کرنے پر ڈیش بورڈ کو آپ کے محلِ وقوع اور ایندھن کی بچت کی اطلاعات موصول ہونا شروع ہو جائیں گی۔' 
                  : 'Start route sequencing to navigate dynamically and report diesel savings metrics.'}
              </p>
            </div>
            
            <button
              onClick={handleStartRoute}
              className="w-full bg-brand-accent text-white py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-accent/15 active:scale-95 transition-all hover:bg-brand-accent/95"
            >
              <Play className="w-4.5 h-4.5 fill-current" />
              <span>{t('startRoute')}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3 flex-1 flex flex-col justify-start">
            <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest block mb-2 px-1">
              {isUrdu ? 'روٹ کے اسٹاپس کی تفصیل' : 'Beats Stop Checklist'}
            </span>

            <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
              {stops.map(stop => (
                <div
                  key={stop.id}
                  onClick={() => toggleStop(stop.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    stop.completed
                      ? 'bg-brand-bg/50 border-brand-border opacity-65'
                      : 'bg-white border-brand-border hover:border-brand-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center ${
                      stop.completed 
                        ? 'bg-brand-border text-brand-muted' 
                        : 'bg-brand-accent/15 text-brand-accent'
                    }`}>
                      {stop.num}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${stop.completed ? 'line-through text-brand-muted' : 'text-brand-dark'}`}>
                        {isUrdu ? stop.urduName : stop.name}
                      </p>
                      <p className="text-[10px] text-brand-muted font-medium mt-0.5">{stop.text}</p>
                    </div>
                  </div>

                  <button
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                      stop.completed
                        ? 'bg-brand-success border-brand-success text-white'
                        : 'border-brand-border text-brand-muted hover:border-brand-accent/50'
                    }`}
                  >
                    {stop.completed && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
