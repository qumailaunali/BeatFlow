'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/app/app/layout';
import {
  Navigation,
  Compass,
  MapPin,
  CheckCircle2,
  Play,
  Check,
  Fuel,
  Clock,
  ExternalLink,
  Phone,
  AlertTriangle,
  Award
} from 'lucide-react';

interface StopItem {
  id: string;
  name: string;
  urduName: string;
  completed: boolean;
  num: number;
  text: string;
  textUrdu: string;
  x: number;
  y: number;
  phone: string;
  alert?: string;
  alertUrdu?: string;
}

export default function ClientRoute() {
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';

  // Active stops dataset with map coordinate attributes
  const [stops, setStops] = useState<StopItem[]>([
    { 
      id: 'shop-1', 
      name: 'Al-Madina General Store', 
      urduName: 'المدینہ جنرل اسٹور', 
      completed: false, 
      num: 1, 
      text: 'Gulshan Block 3', 
      textUrdu: 'گلشن بلاک 3',
      x: 50, 
      y: 30,
      phone: '+92 300 1234561',
      alert: 'Running low on Olpers Milk 1L',
      alertUrdu: 'اولپرز دودھ ختم ہونے والا ہے'
    },
    { 
      id: 'shop-3', 
      name: 'Rehman Kiryana Store', 
      urduName: 'رحمان کریانہ اسٹور', 
      completed: false, 
      num: 2, 
      text: 'Gulshan Block 7', 
      textUrdu: 'گلشن بلاک 7',
      x: 120, 
      y: 90,
      phone: '+92 300 1234562'
    },
    { 
      id: 'shop-4', 
      name: 'Tayyaba Super Mart', 
      urduName: 'طیبہ سپر مارٹ', 
      completed: false, 
      num: 3, 
      text: 'DHA Phase 6', 
      textUrdu: 'ڈی ایچ اے فیز 6',
      x: 180, 
      y: 30,
      phone: '+92 300 1234563',
      alert: 'High demand area - predict extra Rooh Afza',
      alertUrdu: 'زیادہ مانگ - اضافی روح افزا کی پیش گوئی'
    },
    { 
      id: 'shop-2', 
      name: 'Baba Traders', 
      urduName: 'بابا ٹریڈرز', 
      completed: false, 
      num: 4, 
      text: 'Model Town Block C', 
      textUrdu: 'ماڈل ٹاؤن بلاک سی',
      x: 180, 
      y: 140,
      phone: '+92 300 1234564'
    }
  ]);

  const [routeStarted, setRouteStarted] = useState(false);
  const [navigatingMsg, setNavigatingMsg] = useState('');
  const [driverPos, setDriverPos] = useState({ x: 30, y: 140 }); // Start at Depot (30, 140)

  // Find the next active uncompleted shop stop
  const activeStop = stops.find(s => !s.completed);

  // Update dynamic driver coordinates based on active stop
  useEffect(() => {
    if (!routeStarted) {
      setDriverPos({ x: 30, y: 140 }); // Depot
    } else if (!activeStop) {
      setDriverPos({ x: 30, y: 140 }); // Finished, return to Depot
    } else {
      setDriverPos({ x: activeStop.x, y: activeStop.y });
    }
  }, [routeStarted, activeStop]);

  const toggleStop = (id: string) => {
    setStops(prev =>
      prev.map(stop => (stop.id === id ? { ...stop, completed: !stop.completed } : stop))
    );
  };

  const handleStartRoute = () => {
    setRouteStarted(true);
    showNavigationMsg(isUrdu ? 'روٹ شروع ہو گیا! المدینہ اسٹور کی طرف جائیں۔' : 'Route started! Head towards Al-Madina Store.');
  };

  const showNavigationMsg = (msg: string) => {
    setNavigatingMsg(msg);
    setTimeout(() => {
      setNavigatingMsg('');
    }, 4500);
  };

  // Trigger simulated external GPS dispatch
  const handleMapRedirect = (shopName: string) => {
    showNavigationMsg(isUrdu 
      ? `گوگل میپس کوآرڈینیٹس بھیج دیے گئے: ${shopName}` 
      : `Dispatched Google Maps directions for: ${shopName}`
    );
  };

  const completedCount = stops.filter(s => s.completed).length;
  const isFinished = routeStarted && completedCount === stops.length;

  // Dynamic remaining metrics count-down
  const dynamicMetrics = React.useMemo(() => {
    if (!routeStarted) {
      return { distance: '12 km', time: '3h 20m', savings: '~18%' };
    }
    switch (completedCount) {
      case 1:
        return { distance: '9.2 km', time: '2h 35m', savings: '~18%' };
      case 2:
        return { distance: '6.5 km', time: '1h 50m', savings: '~19%' };
      case 3:
        return { distance: '3.1 km', time: '50m', savings: '~19%' };
      case 4:
        return { distance: '0 km', time: '0m', savings: '~20%' };
      default:
        return { distance: '12 km', time: '3h 20m', savings: '~18%' };
    }
  }, [routeStarted, completedCount]);

  return (
    <div className="flex-1 flex flex-col justify-start animate-fade-in pb-12 bg-brand-bg relative">
      
      {/* Live Map Info Floating Toast */}
      {navigatingMsg && (
        <div className="absolute top-16 left-4 right-4 bg-brand-dark border border-brand-accent/20 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2 animate-slide-up">
          <Navigation className="w-4 h-4 text-brand-warning animate-bounce shrink-0" />
          <span>{navigatingMsg}</span>
        </div>
      )}

      {/* Interactive Map Visual */}
      <div className="h-64 bg-[#EAF2EC] relative overflow-hidden border-b border-brand-border flex items-center justify-center shrink-0">
        <div className="absolute inset-0 opacity-15 pointer-events-none grid-motif"></div>
        
        {/* SVG Map Layout */}
        <svg className="w-full h-full p-4" viewBox="0 0 240 160">
          {/* Roads lines */}
          <path d="M 10 30 L 230 30" stroke="#E3E8E1" strokeWidth="3.5" opacity="0.8" />
          <path d="M 10 90 L 230 90" stroke="#E3E8E1" strokeWidth="3.5" opacity="0.8" />
          <path d="M 10 140 L 230 140" stroke="#E3E8E1" strokeWidth="3.5" opacity="0.8" />
          <path d="M 50 10 L 50 150" stroke="#E3E8E1" strokeWidth="3.5" opacity="0.8" />
          <path d="M 120 10 L 120 150" stroke="#E3E8E1" strokeWidth="3.5" opacity="0.8" />
          <path d="M 180 10 L 180 150" stroke="#E3E8E1" strokeWidth="3.5" opacity="0.8" />

          {/* AI Optimized Route Path (Solid thick emerald green line) */}
          <path
            d="M 30 140 L 50 30 L 120 90 L 180 30 L 180 140"
            fill="none"
            stroke="#1B7A5A"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={routeStarted ? 1 : 0.3}
            strokeDasharray={routeStarted ? "none" : "3 3"}
          />

          {/* Starting point Depot */}
          <circle cx="30" cy="140" r="8.5" fill="#0F3D2E" stroke="#fff" strokeWidth="1.5" />
          <text x="30" y="142.5" fill="white" fontSize="6.5" fontWeight="bold" textAnchor="middle">D</text>

          {/* Stops Markers */}
          {stops.map(stop => {
            const isActive = activeStop?.id === stop.id;
            let markerColor = '#1B7A5A'; // Next/Active target
            if (stop.completed) {
              markerColor = '#D1D5DB'; // Completed gray
            } else if (!routeStarted) {
              markerColor = '#9CA3AF'; // Dormant before start
            } else if (!isActive) {
              markerColor = '#0F3D2E'; // Queued upcoming stops
            }

            return (
              <g key={stop.id} className="cursor-pointer">
                {/* Active stop visual echo circle */}
                {isActive && routeStarted && (
                  <circle cx={stop.x} cy={stop.y} r="12" fill="#10B981" opacity="0.25" className="animate-ping" />
                )}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={isActive && routeStarted ? 8.5 : 7}
                  fill={markerColor}
                  stroke="#fff"
                  strokeWidth={isActive ? 1.8 : 1}
                  className="transition-all duration-300"
                />
                <text
                  x={stop.x}
                  y={isActive && routeStarted ? stop.y + 2.5 : stop.y + 2}
                  fill={stop.completed ? '#6B7280' : 'white'}
                  fontSize={isActive ? '7' : '6'}
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {stop.num}
                </text>
              </g>
            );
          })}

          {/* Pulsing Salesperson Vehicle Locator on the Map */}
          {routeStarted && (
            <g transform={`translate(${driverPos.x}, ${driverPos.y})`} className="transition-all duration-500">
              <circle cx="0" cy="0" r="10" fill="#10B981" opacity="0.3" className="animate-ping" />
              <circle cx="0" cy="0" r="5" fill="#10B981" stroke="#FFF" strokeWidth="1" />
            </g>
          )}
        </svg>

        {/* Map Float Info */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-white/95 backdrop-blur px-3.5 py-2.5 rounded-xl border border-brand-border shadow-md">
          <span className="text-[10px] font-bold text-brand-dark uppercase tracking-wider">
            {isUrdu ? 'نقشہ: گلشن بیٹ روٹ' : 'Route: Gulshan Beat'}
          </span>
          <span className="text-[9px] font-extrabold text-brand-accent flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-brand-accent animate-spin-slow animate-pulse" />
            <span>{isUrdu ? 'جی پی ایس فعال ہے' : 'AI Dispatch sync active'}</span>
          </span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-brand-border p-4 grid grid-cols-4 gap-2 text-center text-xs shrink-0 select-none shadow-sm">
        <div>
          <span className="text-[9px] text-brand-muted font-bold block uppercase">{isUrdu ? 'اسٹاپس' : 'Stops'}</span>
          <span className="font-display font-black text-brand-dark mt-1 block">
            {completedCount} <span className="text-[10px] text-brand-muted">/ {stops.length}</span>
          </span>
        </div>
        <div>
          <span className="text-[9px] text-brand-muted font-bold block uppercase">{isUrdu ? 'بقایا فاصلہ' : 'Distance'}</span>
          <span className="font-display font-black text-brand-dark mt-1 block">{dynamicMetrics.distance}</span>
        </div>
        <div>
          <span className="text-[9px] text-brand-muted font-bold block uppercase">{isUrdu ? 'بقایا وقت' : 'Duration'}</span>
          <span className="font-display font-black text-brand-dark mt-1 block">{dynamicMetrics.time}</span>
        </div>
        <div>
          <span className="text-[9px] text-brand-accent font-bold block uppercase">{isUrdu ? 'ایندھن بچت' : 'Fuel Saved'}</span>
          <span className="font-display font-black text-brand-accent mt-1 block">{dynamicMetrics.savings}</span>
        </div>
      </div>

      {/* Route Action Control */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        
        {/* Scenario 1: Route Not Started */}
        {!routeStarted && (
          <div className="space-y-4 text-center my-auto">
            <div className="p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl space-y-2">
              <h3 className="font-display font-black text-brand-dark text-sm">
                {isUrdu ? 'روٹ شروع کرنے کے لیے تیار؟' : 'Ready to start optimized dispatch?'}
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed font-semibold">
                {isUrdu 
                  ? 'رن شروع کرنے پر ڈیش بورڈ کو آپ کے محلِ وقوع اور ایندھن کی بچت کی اطلاعات موصول ہونا شروع ہو جائیں گی۔' 
                  : 'Start route sequence tracking to enable real-time GPS dispatches and report fuel-saving telemetry.'}
              </p>
            </div>
            
            <button
              onClick={handleStartRoute}
              className="w-full bg-brand-accent text-white py-4 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/15 active:scale-95 transition-all hover:bg-brand-accent/95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t('startRoute')}</span>
            </button>
          </div>
        )}

        {/* Scenario 2: Route Completed */}
        {isFinished && (
          <div className="space-y-4 text-center my-auto animate-scale-up">
            <div className="p-5 bg-brand-accent/5 border border-brand-accent/25 rounded-2xl flex flex-col items-center space-y-3">
              <div className="p-3 bg-brand-accent rounded-full text-white">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display font-black text-brand-dark text-base">
                  {isUrdu ? 'شاندار! ہدف مکمل' : 'Congratulations! Beat Completed'}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed font-semibold mt-1">
                  {isUrdu 
                    ? 'آپ نے آج تمام ۴ اسٹاپس مکمل کر لیے اور تقریباً ۲۰ فیصد ایندھن کی بچت کی!' 
                    : 'You successfully completed all 4 store visits today and achieved a 20% diesel efficiency target!'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Scenario 3: Route Active - Stops Checklist & Navigation Target Card */}
        {routeStarted && !isFinished && (
          <div className="space-y-4 flex-grow flex flex-col justify-start">
            
            {/* Real-time Navigation Target Focus Card */}
            {activeStop && (
              <div className="bg-white border border-brand-border p-4 rounded-2xl shadow-sm space-y-3 animate-fade-in">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-bold text-brand-warning bg-brand-warning/15 px-2 py-0.5 rounded uppercase tracking-wider">
                      {isUrdu ? 'اگلا اسٹاپ' : 'Active En Route Target'}
                    </span>
                    <h3 className="text-sm font-bold text-brand-dark mt-1.5">
                      {isUrdu ? activeStop.urduName : activeStop.name}
                    </h3>
                    <p className="text-[10px] text-brand-muted font-semibold flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-brand-accent" />
                      <span>{isUrdu ? activeStop.textUrdu : activeStop.text}</span>
                    </p>
                  </div>
                  
                  {/* Call Store Owner */}
                  <a
                    href={`tel:${activeStop.phone}`}
                    className="p-2.5 bg-brand-bg border border-brand-border rounded-xl text-brand-dark hover:bg-brand-border transition-colors shadow-sm"
                    title={isUrdu ? 'مالک کو کال کریں' : 'Call Owner'}
                  >
                    <Phone className="w-4 h-4 text-brand-accent" />
                  </a>
                </div>

                {/* Stock Warning alert if any */}
                {activeStop.alert && (
                  <div className="bg-brand-warning/10 border border-brand-warning/25 px-3 py-2 rounded-xl flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-brand-warning shrink-0 mt-0.5 animate-pulse" />
                    <p className="text-[10px] font-bold text-brand-dark leading-relaxed">
                      {isUrdu ? activeStop.alertUrdu : activeStop.alert}
                    </p>
                  </div>
                )}

                {/* Navigation dispatches buttons */}
                <button
                  onClick={() => handleMapRedirect(activeStop.name)}
                  className="w-full bg-brand-dark text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-dark/95 active:scale-98 transition-all cursor-pointer shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5 text-brand-warning fill-current shrink-0" />
                  <span>{isUrdu ? 'نقشے میں گائیڈ حاصل کریں' : 'Navigate (Google Maps)'}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </button>
              </div>
            )}

            {/* General Beat Stop Checklist */}
            <div className="space-y-2.5 flex-grow flex flex-col justify-start">
              <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest block px-1">
                {isUrdu ? 'روٹ کے اسٹاپس کی تفصیل' : 'Optimal Visit Checklist'}
              </span>

              <div className="space-y-2.5 overflow-y-auto max-h-[220px] pr-1 no-scrollbar">
                {stops.map(stop => {
                  const isActive = activeStop?.id === stop.id;
                  return (
                    <div
                      key={stop.id}
                      onClick={() => toggleStop(stop.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        stop.completed
                          ? 'bg-brand-bg/60 border-brand-border/60 opacity-60'
                          : isActive
                            ? 'bg-white border-brand-accent/50 shadow-md shadow-brand-accent/5 ring-1 ring-brand-accent/15'
                            : 'bg-white border-brand-border/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5.5 h-5.5 rounded-lg font-bold text-[10px] flex items-center justify-center ${
                          stop.completed 
                            ? 'bg-brand-border text-brand-muted' 
                            : isActive
                              ? 'bg-brand-accent text-white shadow-sm'
                              : 'bg-brand-accent/15 text-brand-accent'
                        }`}>
                          {stop.num}
                        </div>
                        <div>
                          <p className={`text-xs font-bold ${stop.completed ? 'line-through text-brand-muted' : 'text-brand-dark'}`}>
                            {isUrdu ? stop.urduName : stop.name}
                          </p>
                          <p className="text-[9px] text-brand-muted font-bold mt-0.5">
                            {isUrdu ? stop.textUrdu : stop.text}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`w-6.5 h-6.5 rounded-full flex items-center justify-center border transition-all ${
                          stop.completed
                            ? 'bg-brand-success border-brand-success text-white shadow-sm'
                            : isActive
                              ? 'border-brand-accent text-brand-accent bg-brand-accent/5'
                              : 'border-brand-border text-brand-muted hover:border-brand-accent/30'
                        }`}
                      >
                        {stop.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
