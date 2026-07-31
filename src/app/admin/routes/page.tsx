'use client';

import React, { useState, useEffect } from 'react';
import { mockFuelComparison } from '@/data/mockData';
import {
  Fuel,
  MapPin,
  TrendingUp,
  Settings,
  Sparkles,
  ChevronRight,
  Navigation,
  Compass,
  Clock,
  Shuffle,
  Check,
  CheckCircle2,
  AlertCircle,
  Truck,
  Info,
  FileText,
  Wifi,
  DollarSign
} from 'lucide-react';

// Define typed stop structure for visualization
interface StopItem {
  name: string;
  x: number;
  y: number;
  time: string;
  orderValue: number;
  status: 'Completed' | 'En Route' | 'Pending';
  type: 'depot' | 'retailer';
  area: string;
}

// Map stops by beat ID
const routeStopsData: Record<string, StopItem[]> = {
  '1': [
    { name: 'Depot (Gulshan Hub)', x: 50, y: 250, time: '08:30 AM', orderValue: 0, status: 'Completed', type: 'depot', area: 'Karachi Warehouse' },
    { name: 'Al-Madina General Store', x: 120, y: 180, time: '09:15 AM', orderValue: 10850, status: 'Completed', type: 'retailer', area: 'Gulshan Block 3' },
    { name: 'Rehman Kiryana Store', x: 240, y: 220, time: '10:30 AM', orderValue: 4850, status: 'Completed', type: 'retailer', area: 'Gulshan Block 7' },
    { name: 'Makkah Milk Point', x: 320, y: 100, time: '11:45 AM', orderValue: 6900, status: 'En Route', type: 'retailer', area: 'Gulshan Block 13' },
    { name: 'Usmania Super Store', x: 420, y: 150, time: '12:45 PM', orderValue: 15200, status: 'Pending', type: 'retailer', area: 'Civic Centre' }
  ],
  '2': [
    { name: 'Depot (Model Town Hub)', x: 50, y: 150, time: '08:30 AM', orderValue: 0, status: 'Completed', type: 'depot', area: 'Lahore Depot' },
    { name: 'Baba Traders', x: 180, y: 60, time: '09:30 AM', orderValue: 9885, status: 'Completed', type: 'retailer', area: 'Model Town Block C' },
    { name: 'Bismillah Milk Center', x: 300, y: 180, time: '11:00 AM', orderValue: 7200, status: 'Completed', type: 'retailer', area: 'Model Town Block H' },
    { name: 'Jinnah Kiryana Store', x: 420, y: 90, time: '12:15 PM', orderValue: 5400, status: 'Pending', type: 'retailer', area: 'Model Town Block M' }
  ],
  '3': [
    { name: 'Depot (South Depot)', x: 50, y: 80, time: '08:30 AM', orderValue: 0, status: 'Completed', type: 'depot', area: 'Karachi South' },
    { name: 'Tayyaba Super Mart', x: 150, y: 240, time: '09:45 AM', orderValue: 14200, status: 'Completed', type: 'retailer', area: 'Khayaban-e-Shahbaz' },
    { name: 'Clifton Fresh Mart', x: 300, y: 100, time: '11:15 AM', orderValue: 8900, status: 'Pending', type: 'retailer', area: 'DHA Phase 6' },
    { name: 'Sunset Grocers', x: 450, y: 220, time: '12:30 PM', orderValue: 11300, status: 'Pending', type: 'retailer', area: 'Sunset Boulevard' }
  ],
  '4': [
    { name: 'Karachi Central Depot', x: 50, y: 250, time: 'Active', orderValue: 0, status: 'Completed', type: 'depot', area: 'Warehouse 1' },
    { name: 'Lahore Central Depot', x: 50, y: 150, time: 'Active', orderValue: 0, status: 'Completed', type: 'depot', area: 'Warehouse 2' },
    { name: 'Gulshan Retail Cluster', x: 180, y: 100, time: 'Active', orderValue: 22600, status: 'Completed', type: 'retailer', area: 'Karachi East' },
    { name: 'Clifton Retail Cluster', x: 300, y: 180, time: 'Active', orderValue: 34400, status: 'Completed', type: 'retailer', area: 'Karachi South' },
    { name: 'Model Town Cluster', x: 420, y: 120, time: 'Active', orderValue: 22485, status: 'Completed', type: 'retailer', area: 'Lahore South' }
  ]
};

export default function AdminRoutes() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('1');
  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null);
  
  // Routing Engine parameters state
  const [avoidCongestion, setAvoidCongestion] = useState(true);
  const [prioritizeVolume, setPrioritizeVolume] = useState(false);
  const [enforceWindows, setEnforceWindows] = useState(true);
  
  // Simulated visual states
  const [recalculating, setRecalculating] = useState(false);
  const [recalcMsg, setRecalcMsg] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [activeDriverPos, setActiveDriverPos] = useState({ x: 120, y: 180 });

  const selectedRoute = mockFuelComparison.find(r => r.id === selectedRouteId) || mockFuelComparison[0];
  const activeStops = routeStopsData[selectedRouteId] || routeStopsData['1'];

  // Handle high-volume prioritization reordering simulation
  const orderedStops = React.useMemo(() => {
    if (!prioritizeVolume || selectedRouteId === '4') return activeStops;
    // Keep depot at start, sort retailers by expected order value descending
    const depot = activeStops.find(s => s.type === 'depot');
    const retailers = activeStops.filter(s => s.type === 'retailer');
    const sortedRetailers = [...retailers].sort((a, b) => b.orderValue - a.orderValue);
    
    // Recalculate ETAs based on re-ordering
    const times = ['09:15 AM', '10:30 AM', '11:45 AM', '12:45 PM'];
    const updatedRetailers = sortedRetailers.map((ret, idx) => ({
      ...ret,
      time: times[idx] || ret.time
    }));

    return depot ? [depot, ...updatedRetailers] : updatedRetailers;
  }, [activeStops, prioritizeVolume, selectedRouteId]);

  // Simulate active en-route driver position animation pulse
  useEffect(() => {
    // Locate the active stop on the map and set driver coordinate there
    const enRouteStop = orderedStops.find(s => s.status === 'En Route');
    if (enRouteStop) {
      setActiveDriverPos({ x: enRouteStop.x, y: enRouteStop.y });
    } else {
      // Default to first retailer
      const firstRetailer = orderedStops.find(s => s.type === 'retailer');
      if (firstRetailer) {
        setActiveDriverPos({ x: firstRetailer.x, y: firstRetailer.y });
      }
    }
    setSelectedStopIndex(null);
  }, [selectedRouteId, orderedStops]);

  // Handle route recalculation animation
  const handleRecalculate = () => {
    setRecalculating(true);
    setRecalcMsg('Analyzing live traffic patterns...');
    
    setTimeout(() => {
      setRecalcMsg('Applying genetic vehicle sequencing...');
      setTimeout(() => {
        setRecalcMsg('Updating fuel burn predictions...');
        setTimeout(() => {
          setRecalculating(false);
          showToast('Routes optimized successfully! Recalibrated based on live parameters.');
        }, 600);
      }, 700);
    }, 700);
  };

  // Handle config changes trigger recalibration
  const handleConfigToggle = (toggleType: 'congestion' | 'volume' | 'windows') => {
    if (toggleType === 'congestion') setAvoidCongestion(!avoidCongestion);
    if (toggleType === 'volume') setPrioritizeVolume(!prioritizeVolume);
    if (toggleType === 'windows') setEnforceWindows(!enforceWindows);
    
    // Auto-recalculate
    setRecalculating(true);
    setRecalcMsg('Re-evaluating routing coefficients...');
    setTimeout(() => {
      setRecalculating(false);
      showToast('AI Model updated. Sequence recalculation complete.');
    }, 800);
  };

  // Handle route dispatch
  const handleDispatch = () => {
    setRecalculating(true);
    setRecalcMsg('Sending manifest token to salesmen device...');
    setTimeout(() => {
      setRecalculating(false);
      showToast(`Route sheet dispatched to ${selectedRoute.salesmanName}'s active app session!`);
    }, 1200);
  };

  // Helper to trigger toast messages
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 4000);
  };

  // Adjusted stats based on congestion and volume switches to mock dynamic values
  const currentSavings = React.useMemo(() => {
    let savings = selectedRoute.savings;
    if (!avoidCongestion) savings -= 4;
    if (prioritizeVolume) savings += 2;
    return Math.max(savings, 5);
  }, [selectedRoute.savings, avoidCongestion, prioritizeVolume]);

  const currentDistance = React.useMemo(() => {
    let distance = selectedRoute.afterDistance;
    if (!avoidCongestion) distance += 1.4;
    if (prioritizeVolume) distance -= 0.3;
    return parseFloat(distance.toFixed(1));
  }, [selectedRoute.afterDistance, avoidCongestion, prioritizeVolume]);

  const currentFuel = React.useMemo(() => {
    let fuel = selectedRoute.afterFuel;
    if (!avoidCongestion) fuel += 0.4;
    if (prioritizeVolume) fuel -= 0.1;
    return parseFloat(fuel.toFixed(1));
  }, [selectedRoute.afterFuel, avoidCongestion, prioritizeVolume]);

  // Aggregate stats mapping
  const overallAggregate = mockFuelComparison.find(r => r.id === '4') || { beforeDistance: 46.5, beforeFuel: 7.6 };

  // Calculate dynamic paths for SVG visualizer
  const getPathString = (isOptimized: boolean) => {
    if (selectedRouteId === '4') return ''; // Aggregate will render multiple paths separately
    
    if (isOptimized) {
      return orderedStops.map((s, idx) => `${idx === 0 ? 'M' : 'L'} ${s.x} ${s.y}`).join(' ');
    } else {
      // Draw a legacy path that is visually longer/inefficient by swapping stop order
      const depot = orderedStops.find(s => s.type === 'depot');
      const retailers = orderedStops.filter(s => s.type === 'retailer');
      if (!depot || retailers.length < 2) return '';
      
      // An inefficient sequence
      let reordered = [depot];
      if (retailers.length === 3) {
        reordered.push(retailers[2], retailers[0], retailers[1]);
      } else if (retailers.length === 4) {
        reordered.push(retailers[2], retailers[0], retailers[3], retailers[1]);
      } else {
        reordered.push(...[...retailers].reverse());
      }
      return reordered.map((s, idx) => `${idx === 0 ? 'M' : 'L'} ${s.x} ${s.y}`).join(' ');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative pb-12">
      
      {/* Dynamic Toast Alert Bar */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-brand-dark border border-brand-accent/20 text-white px-5 py-3.5 rounded-2xl shadow-2xl z-50 flex items-center gap-3 max-w-sm animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-brand-success shrink-0" />
          <span className="text-xs font-semibold leading-normal">{toastMsg}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border/60 pb-5">
        <div>
          <h1 className="text-3xl font-display font-black text-brand-dark tracking-tight">
            AI Beat & Route Control Panel
          </h1>
          <p className="text-sm text-brand-muted mt-1 font-medium">
            Comparing standard warehouse dispatches against real-time optimized genetic sequence beats to reduce distributor operational costs.
          </p>
        </div>
        
        {/* Recalculate Trigger CTA */}
        <button
          onClick={handleRecalculate}
          disabled={recalculating}
          className="bg-white border border-brand-border text-brand-dark font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 hover:border-brand-accent/50 active:scale-95 transition-all shadow-sm shrink-0"
        >
          <Shuffle className="w-3.5 h-3.5 text-brand-accent animate-spin-slow" />
          <span>Optimize Route Sequences</span>
        </button>
      </div>

      {/* Aggregate Savings Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-brand-accent/5 rounded-bl-[80px] pointer-events-none group-hover:bg-brand-accent/10 transition-colors"></div>
          <span className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Diesel Consumption Savings</span>
          <h3 className="text-3xl font-display font-black text-brand-dark mt-3">{currentSavings}% Saved</h3>
          <p className="text-xs text-brand-muted mt-1 font-semibold flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5 text-brand-accent shrink-0" />
            <span>Avoided high congestion sectors</span>
          </p>
        </div>

        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-brand-success/5 rounded-bl-[80px] pointer-events-none group-hover:bg-brand-success/10 transition-colors"></div>
          <span className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Distance Reductions</span>
          <h3 className="text-3xl font-display font-black text-brand-dark mt-3">
            {selectedRouteId === '4' ? '-9.5' : `-${(selectedRoute.beforeDistance - currentDistance).toFixed(1)}` } km
          </h3>
          <p className="text-xs text-brand-success font-bold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 shrink-0" />
            <span>Avg {selectedRouteId === '4' ? '3.1' : (selectedRoute.beforeDistance - currentDistance).toFixed(1)} km cut on beat</span>
          </p>
        </div>

        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-brand-warning/5 rounded-bl-[80px] pointer-events-none group-hover:bg-brand-warning/10 transition-colors"></div>
          <span className="text-[10px] font-bold text-brand-warning tracking-widest uppercase">Cash Saved Today</span>
          <h3 className="text-3xl font-display font-black text-brand-dark mt-3">
            Rs {selectedRouteId === '4' 
              ? '3,071' 
              : Math.round((selectedRoute.beforeFuel - currentFuel) * 323.30).toLocaleString()}
          </h3>
          <p className="text-xs text-brand-muted mt-1 font-semibold flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-brand-warning shrink-0" />
            <span>Diesel benchmark: Rs 323.30/L</span>
          </p>
        </div>

        <div className="bg-brand-dark text-white p-5 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden">
          {/* Subtle back ripple */}
          <div className="absolute inset-0 opacity-10 pointer-events-none grid-motif"></div>
          <div>
            <span className="text-[10px] font-bold text-brand-warning tracking-widest uppercase">AI Engine Status</span>
            <h3 className="text-xl font-display font-extrabold text-white mt-1">Live Recalibrated</h3>
            <p className="text-[10px] text-gray-300 font-medium mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-success animate-ping"></span>
              <span>Updated via PK Traffic API</span>
            </p>
          </div>
          <Sparkles className="w-9 h-9 text-brand-warning animate-pulse shrink-0" />
        </div>
      </div>

      {/* Main Split Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Area (8 cols): Map and Stop sequencing timeline */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Beat Visualizer Map */}
          <div className="bg-white border border-brand-border/60 rounded-2xl shadow-sm p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-display font-black text-brand-dark flex items-center gap-2">
                  <Compass className="w-5 h-5 text-brand-accent" />
                  <span>Optimal Route Mapping</span>
                </h2>
                <p className="text-xs text-brand-muted font-semibold mt-0.5">
                  Visual node sequences for {selectedRoute.routeName} ({selectedRoute.salesmanName})
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-bg border border-brand-border rounded-xl text-xs font-bold text-brand-dark self-start sm:self-auto">
                <Truck className="w-3.5 h-3.5 text-brand-accent" />
                <span>{orderedStops.filter(s => s.type === 'retailer').length} Scheduled Stops</span>
              </span>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="h-96 bg-brand-bg/50 rounded-2xl relative overflow-hidden border border-brand-border/40 flex items-center justify-center">
              <div className="absolute inset-0 opacity-15 pointer-events-none grid-motif"></div>
              
              <svg className="w-full h-full p-6 select-none" viewBox="0 0 500 300">
                {/* Visual streets network simulation */}
                <path d="M 20 60 L 480 60" stroke="#E3E8E1" strokeWidth="4" opacity="0.6" />
                <path d="M 20 160 L 480 160" stroke="#E3E8E1" strokeWidth="4" opacity="0.6" />
                <path d="M 20 250 L 480 250" stroke="#E3E8E1" strokeWidth="4" strokeDasharray="6 6" opacity="0.4" />
                <path d="M 120 20 L 120 280" stroke="#E3E8E1" strokeWidth="4" opacity="0.6" />
                <path d="M 250 20 L 250 280" stroke="#E3E8E1" strokeWidth="4" opacity="0.6" />
                <path d="M 400 20 L 400 280" stroke="#E3E8E1" strokeWidth="4" opacity="0.6" />

                {selectedRouteId !== '4' ? (
                  <>
                    {/* 1. Inefficient Legacy Line (Red dashed) */}
                    <path
                      d={getPathString(false)}
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2.5"
                      strokeDasharray="4 6"
                      opacity="0.35"
                    />

                    {/* 2. AI Optimized Path Line (Solid Green animated) */}
                    <path
                      d={getPathString(true)}
                      fill="none"
                      stroke="#1B7A5A"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-[dash_6s_linear_infinite]"
                      style={{
                        strokeDasharray: '800',
                        strokeDashoffset: '0'
                      }}
                    />

                    {/* Directional travel vectors along optimized line */}
                    {orderedStops.map((stop, idx) => {
                      if (idx === 0) return null;
                      const prev = orderedStops[idx - 1];
                      // Calculate midpoint to place indicator arrow
                      const midX = (prev.x + stop.x) / 2;
                      const midY = (prev.y + stop.y) / 2;
                      return (
                        <circle
                          key={`mid-${idx}`}
                          cx={midX}
                          cy={midY}
                          r="3"
                          fill="#10B981"
                          className="animate-ping"
                        />
                      );
                    })}

                    {/* Pulsing Active Driver Tracker */}
                    <g transform={`translate(${activeDriverPos.x}, ${activeDriverPos.y})`}>
                      <circle cx="0" cy="0" r="14" fill="#1B7A5A" opacity="0.15" className="animate-ping" />
                      <circle cx="0" cy="0" r="7" fill="#1B7A5A" stroke="#FFF" strokeWidth="1.5" className="shadow-lg" />
                    </g>
                  </>
                ) : (
                  // Aggregate View: Render overlapping paths of different beats
                  <>
                    {/* Gulshan Beat path */}
                    <path
                      d="M 50 250 L 120 180 L 240 220 L 320 100 L 420 150"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      opacity="0.6"
                      strokeLinecap="round"
                    />
                    {/* Model Town Beat path */}
                    <path
                      d="M 50 150 L 180 60 L 300 180 L 420 90"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2.5"
                      opacity="0.6"
                      strokeLinecap="round"
                    />
                    {/* DHA Beat path */}
                    <path
                      d="M 50 80 L 150 240 L 300 100 L 450 220"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2.5"
                      opacity="0.6"
                      strokeLinecap="round"
                    />
                  </>
                )}

                {/* Map stops coordinates nodes */}
                {orderedStops.map((stop, idx) => {
                  const isHovered = selectedStopIndex === idx;
                  const isDepot = stop.type === 'depot';
                  
                  return (
                    <g
                      key={`node-${idx}`}
                      className="cursor-pointer group"
                      onClick={() => setSelectedStopIndex(idx)}
                    >
                      {/* Node highlight outline */}
                      <circle
                        cx={stop.x}
                        cy={stop.y}
                        r={isDepot ? 17 : 14}
                        fill={isDepot ? '#0F3D2E' : '#1B7A5A'}
                        opacity={isHovered ? 0.3 : 0}
                        className="transition-all duration-200"
                      />
                      
                      {/* Node Circle */}
                      <circle
                        cx={stop.x}
                        cy={stop.y}
                        r={isDepot ? 13 : 10}
                        fill={isDepot ? '#0F3D2E' : isHovered ? '#10B981' : '#1B7A5A'}
                        stroke="#FFF"
                        strokeWidth={isHovered ? 2.5 : 1.5}
                        className="transition-all duration-200 shadow-md"
                      />
                      
                      {/* Text index inside node */}
                      <text
                        x={stop.x}
                        y={isDepot ? stop.y + 4 : stop.y + 3.5}
                        fill="white"
                        fontSize={isDepot ? '9' : '8'}
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {isDepot ? 'D' : idx}
                      </text>

                      {/* Store Text Tag below marker */}
                      <text
                        x={stop.x}
                        y={stop.y + 24}
                        fill={isHovered ? '#0F3D2E' : '#4B5563'}
                        fontSize="9"
                        fontWeight={isHovered ? 'bold' : 'bold'}
                        textAnchor="middle"
                        className="transition-colors"
                      >
                        {stop.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Floating Legend overlays */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {selectedRouteId !== '4' ? (
                  <>
                    <div className="bg-white/95 backdrop-blur border border-brand-border px-3 py-1.5 rounded-xl text-[10px] font-bold text-brand-dark flex items-center gap-1.5 shadow-sm">
                      <span className="w-2.5 h-2.5 bg-brand-accent rounded-full"></span>
                      <span>BeatFlow Optimized Sequence</span>
                    </div>
                    <div className="bg-white/95 backdrop-blur border border-brand-border px-3 py-1.5 rounded-xl text-[10px] font-bold text-brand-dark flex items-center gap-1.5 shadow-sm">
                      <span className="w-2.5 h-2.5 bg-brand-danger rounded-full opacity-60"></span>
                      <span>Classic Legacy Inefficient Run</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white/95 backdrop-blur border border-brand-border px-3 py-1.5 rounded-xl text-[10px] font-bold text-brand-dark flex items-center gap-1.5 shadow-sm">
                      <span className="w-2.5 h-2.5 bg-[#10B981] rounded-full"></span>
                      <span>Gulshan Beat Beat</span>
                    </div>
                    <div className="bg-white/95 backdrop-blur border border-brand-border px-3 py-1.5 rounded-xl text-[10px] font-bold text-brand-dark flex items-center gap-1.5 shadow-sm">
                      <span className="w-2.5 h-2.5 bg-[#F59E0B] rounded-full"></span>
                      <span>Model Town Beat</span>
                    </div>
                    <div className="bg-white/95 backdrop-blur border border-brand-border px-3 py-1.5 rounded-xl text-[10px] font-bold text-brand-dark flex items-center gap-1.5 shadow-sm">
                      <span className="w-2.5 h-2.5 bg-[#3B82F6] rounded-full"></span>
                      <span>DHA Phase 6 Beat</span>
                    </div>
                  </>
                )}
              </div>

              {/* Map instructions indicator */}
              <div className="absolute bottom-4 left-4 bg-brand-dark/90 backdrop-blur px-3 py-1.5 rounded-xl text-[9px] font-bold text-white shadow-sm flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-brand-warning shrink-0" />
                <span>Click markers to highlight stop timeline parameters below</span>
              </div>
            </div>
          </div>

          {/* Stops Optimization Schedule (Timeline list) */}
          <div className="bg-white border border-brand-border/60 rounded-2xl shadow-sm p-6 space-y-4">
            <div>
              <h2 className="text-lg font-display font-black text-brand-dark">
                Stops Dispatch Manifest Schedule
              </h2>
              <p className="text-xs text-brand-muted font-semibold mt-0.5">
                Optimized timeline generated using traffic delay and retailer replenishment schedules.
              </p>
            </div>

            {/* List of stops */}
            <div className="relative border-l border-brand-border pl-6 ml-3 space-y-6">
              {orderedStops.map((stop, idx) => {
                const isSelected = selectedStopIndex === idx;
                const isDepot = stop.type === 'depot';
                
                return (
                  <div
                    key={`stop-row-${idx}`}
                    className={`relative p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-brand-bg/50 border-brand-accent shadow-sm'
                        : 'bg-white border-brand-border/60 hover:border-brand-border'
                    }`}
                    onClick={() => setSelectedStopIndex(idx)}
                  >
                    {/* Bullet marker anchor on timeline */}
                    <div
                      className={`absolute -left-[35px] top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white z-10 transition-colors ${
                        isDepot 
                          ? 'bg-brand-dark' 
                          : stop.status === 'Completed' 
                            ? 'bg-brand-accent' 
                            : stop.status === 'En Route' 
                              ? 'bg-brand-warning animate-pulse' 
                              : 'bg-gray-300'
                      }`}
                    >
                      {stop.status === 'Completed' && !isDepot ? (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                      ) : (
                        <span className="text-[7.5px] font-black text-white">{isDepot ? 'D' : idx}</span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-brand-dark flex items-center gap-2">
                          <span>{stop.name}</span>
                          {isDepot && (
                            <span className="text-[9px] font-bold bg-brand-dark/10 text-brand-dark px-2 py-0.5 rounded-md uppercase">
                              Start Hub
                            </span>
                          )}
                          {!isDepot && stop.orderValue > 10000 && (
                            <span className="text-[9px] font-bold bg-brand-warning/15 text-brand-warning px-2 py-0.5 rounded-md uppercase">
                              High Volume Account
                            </span>
                          )}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-brand-muted font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                            <span>ETA: {stop.time}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                            <span>{stop.area}</span>
                          </span>
                        </div>
                      </div>

                      {/* Right values */}
                      <div className="flex items-center gap-4 self-start sm:self-auto">
                        {!isDepot && (
                          <div className="text-right">
                            <p className="text-xs font-bold text-brand-dark">Est. Invoice</p>
                            <p className="text-xs font-extrabold text-brand-accent">Rs {stop.orderValue.toLocaleString()}</p>
                          </div>
                        )}
                        <span
                          className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                            isDepot 
                              ? 'bg-brand-dark/10 text-brand-dark' 
                              : stop.status === 'Completed'
                                ? 'bg-brand-accent/10 text-brand-accent'
                                : stop.status === 'En Route'
                                  ? 'bg-brand-warning/10 text-brand-warning animate-pulse'
                                  : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {isDepot ? 'Active Dispatch' : stop.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Area (4 cols): Selectors and parameter configurations */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Beat Selector list */}
          <div className="bg-white border border-brand-border/60 rounded-2xl shadow-sm p-5 space-y-4">
            <div>
              <h2 className="text-lg font-display font-black text-brand-dark">
                Distributor Beats
              </h2>
              <p className="text-xs text-brand-muted font-semibold mt-0.5">
                Select a routing agent to view optimization metrics.
              </p>
            </div>

            <div className="space-y-3">
              {mockFuelComparison.map((comp) => {
                const isSelected = comp.id === selectedRouteId;
                const isAggregate = comp.salesmanName === 'Overall Aggregate';
                
                // Adjust aggregate savings live as well
                let savingsValue = comp.savings;
                if (isAggregate) {
                  if (!avoidCongestion) savingsValue -= 3;
                  if (prioritizeVolume) savingsValue += 1;
                } else if (comp.id === selectedRouteId) {
                  savingsValue = currentSavings;
                }

                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedRouteId(comp.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                      isSelected 
                        ? 'bg-brand-bg border-brand-accent shadow-sm ring-1 ring-brand-accent/15' 
                        : 'bg-white border-brand-border hover:border-brand-border/80'
                    } ${isAggregate ? 'bg-brand-dark/5 border-dashed border-brand-dark/20' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-brand-dark group-hover:text-brand-accent transition-colors">
                          {comp.salesmanName}
                        </p>
                        <p className="text-xs text-brand-muted font-medium mt-0.5">{comp.routeName}</p>
                      </div>
                      <span className="text-[10px] font-black text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-lg shrink-0">
                        {savingsValue}% saved
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-brand-border/40 pt-3 text-[10px] font-bold uppercase tracking-wide">
                      <div>
                        <span className="text-brand-muted">Legacy Route</span>
                        <p className="text-xs font-bold text-brand-dark mt-0.5">{comp.beforeDistance} km ({comp.beforeFuel}L)</p>
                      </div>
                      <div>
                        <span className="text-brand-accent">BeatFlow Optimized</span>
                        <p className="text-xs font-extrabold text-brand-accent mt-0.5">
                          {comp.id === selectedRouteId ? currentDistance : comp.afterDistance} km ({comp.id === selectedRouteId ? currentFuel : comp.afterFuel}L)
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Configuration Controls panel */}
          <div className="bg-white border border-brand-border/60 rounded-2xl shadow-sm p-5 space-y-4">
            <div>
              <h2 className="text-lg font-display font-black text-brand-dark flex items-center gap-2">
                <Settings className="w-5 h-5 text-brand-accent" />
                <span>AI Configuration</span>
              </h2>
              <p className="text-xs text-brand-muted font-semibold mt-0.5">
                Tweak calculations to adjust dispatch priority constraints.
              </p>
            </div>

            {/* Checkboxes configuration */}
            <div className="space-y-4 pt-1">
              <div
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-bg/40 cursor-pointer transition-colors border border-transparent hover:border-brand-border/40 select-none"
                onClick={() => handleConfigToggle('congestion')}
              >
                <input
                  type="checkbox"
                  checked={avoidCongestion}
                  readOnly
                  disabled={recalculating}
                  className="w-4.5 h-4.5 rounded border-brand-border text-brand-accent focus:ring-brand-accent/30 mt-0.5 cursor-pointer"
                />
                <div>
                  <h4 className="text-xs font-bold text-brand-dark">Avoid Congestion Bottlenecks</h4>
                  <p className="text-[10px] text-brand-muted mt-0.5 leading-relaxed font-semibold">
                    Steer salesmen away from gridlocked sections during peak school/office hours.
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-bg/40 cursor-pointer transition-colors border border-transparent hover:border-brand-border/40 select-none"
                onClick={() => handleConfigToggle('volume')}
              >
                <input
                  type="checkbox"
                  checked={prioritizeVolume}
                  readOnly
                  disabled={recalculating}
                  className="w-4.5 h-4.5 rounded border-brand-border text-brand-accent focus:ring-brand-accent/30 mt-0.5 cursor-pointer"
                />
                <div>
                  <h4 className="text-xs font-bold text-brand-dark">Prioritize High-Volume Accounts</h4>
                  <p className="text-[10px] text-brand-muted mt-0.5 leading-relaxed font-semibold">
                    Ensure retailers with order forecasts &gt; Rs 10,000 are visited first.
                  </p>
                </div>
              </div>

              <div
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-bg/40 cursor-pointer transition-colors border border-transparent hover:border-brand-border/40 select-none"
                onClick={() => handleConfigToggle('windows')}
              >
                <input
                  type="checkbox"
                  checked={enforceWindows}
                  readOnly
                  disabled={recalculating}
                  className="w-4.5 h-4.5 rounded border-brand-border text-brand-accent focus:ring-brand-accent/30 mt-0.5 cursor-pointer"
                />
                <div>
                  <h4 className="text-xs font-bold text-brand-dark">Enforce Visit Day Windows</h4>
                  <p className="text-[10px] text-brand-muted mt-0.5 leading-relaxed font-semibold">
                    Reject visits out of standard visit cycles to save fuel.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Summary Notice */}
            <div className="p-3 bg-brand-bg/50 border border-brand-border rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <p className="text-[10px] text-brand-dark leading-relaxed font-semibold">
                Changing constraints triggers a local simulation re-sequencing in the dispatcher console.
              </p>
            </div>
          </div>

          {/* Dispatch Control Actions */}
          <div className="bg-white border border-brand-border/60 rounded-2xl shadow-sm p-5 space-y-4">
            <div>
              <h2 className="text-lg font-display font-black text-brand-dark">
                Manifest Actions
              </h2>
              <p className="text-xs text-brand-muted font-semibold mt-0.5">
                Send active optimizations straight to the driver or download sheets.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <button
                onClick={handleDispatch}
                disabled={recalculating || selectedRouteId === '4'}
                className="w-full bg-brand-dark text-white py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 hover:bg-brand-dark/95 active:scale-[0.99] transition-all shadow-md disabled:opacity-50"
              >
                <Navigation className="w-3.5 h-3.5 text-brand-warning fill-current shrink-0" />
                <span>Dispatch Optimize to Field App</span>
              </button>

              <button
                onClick={() => showToast('Manifest file generated. Downloading PDF dispatch sheet...')}
                disabled={recalculating}
                className="w-full bg-white border border-brand-border text-brand-dark py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 hover:border-brand-accent/50 active:scale-[0.99] transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                <span>Export Optimized Dispatch PDF</span>
              </button>

              <div className="flex items-center gap-1.5 justify-center text-[10px] text-brand-muted font-bold tracking-wide uppercase pt-1">
                <Wifi className="w-3.5 h-3.5 text-brand-success shrink-0" />
                <span>Syncs live with mobile nodes</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Recalculating overlay modal loader */}
      {recalculating && (
        <div className="fixed inset-0 bg-brand-dark/15 backdrop-blur-[2px] z-50 flex items-center justify-center p-6">
          <div className="bg-white border border-brand-border p-6 rounded-2xl shadow-2xl flex flex-col items-center space-y-4 max-w-xs text-center animate-scale-up">
            <div className="w-10 h-10 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-brand-dark">BeatFlow AI Engine</p>
              <p className="text-xs text-brand-muted">{recalcMsg}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
