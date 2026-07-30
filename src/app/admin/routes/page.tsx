'use client';

import React, { useState } from 'react';
import { mockFuelComparison, mockSalesmen } from '@/data/mockData';
import {
  Fuel,
  MapPin,
  TrendingUp,
  Settings,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Navigation,
  Compass
} from 'lucide-react';

export default function AdminRoutes() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('1');

  const selectedRoute = mockFuelComparison.find(r => r.id === selectedRouteId) || mockFuelComparison[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-extrabold text-brand-dark tracking-tight">Route & Fuel Optimization</h1>
        <p className="text-brand-muted mt-1 font-medium">Comparing classic routing models with AI-optimized stop sequences to reduce diesel burn.</p>
      </div>

      {/* Aggregate Savings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-brand-accent tracking-widest uppercase">Diesel Saved (Total)</span>
          <h3 className="text-2.5xl font-display font-black text-brand-dark mt-3">22% overall</h3>
          <p className="text-xs text-brand-muted mt-1 font-medium">Bypassing congestion blocks</p>
        </div>

        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-brand-accent tracking-widest uppercase">Distance cut</span>
          <h3 className="text-2.5xl font-display font-black text-brand-dark mt-3">-9.5 km today</h3>
          <p className="text-xs text-brand-success font-bold mt-1">Average 3.1 km per salesman</p>
        </div>

        <div className="bg-white border border-brand-border/60 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-brand-warning tracking-widest uppercase">Cost avoidance</span>
          <h3 className="text-2.5xl font-display font-black text-brand-dark mt-3">Rs 3,071 / day</h3>
          <p className="text-xs text-brand-muted mt-1 font-medium">Based on Rs 323.30/litre diesel</p>
        </div>

        <div className="bg-brand-dark text-white p-5 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-brand-warning tracking-widest uppercase">AI Engine Status</span>
            <h3 className="text-lg font-display font-extrabold text-white mt-1">Recalibrating</h3>
            <p className="text-[10px] text-gray-300 font-medium mt-0.5">Updated with traffic at 4:30 PM</p>
          </div>
          <Sparkles className="w-8 h-8 text-brand-warning animate-pulse shrink-0" />
        </div>
      </div>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Optimized Route Details & Interactive SVG Map */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-brand-border/60 rounded-2xl shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-display font-extrabold text-brand-dark">Beat Sequencing Visualizer</h2>
                <p className="text-xs text-brand-muted font-medium">Active stops layout mapping for {selectedRoute.routeName}</p>
              </div>
              <div className="flex items-center gap-2 bg-brand-bg border border-brand-border px-3 py-1 rounded-xl text-xs font-bold text-brand-dark">
                <Compass className="w-3.5 h-3.5 text-brand-accent" />
                <span>Karachi Sector Alpha</span>
              </div>
            </div>

            {/* Custom Interactive SVG Map */}
            <div className="h-96 bg-brand-bg/50 rounded-xl relative overflow-hidden border border-brand-border/40 flex items-center justify-center">
              <div className="absolute inset-0 opacity-20 grid-motif"></div>
              
              {/* SVG Layout elements simulating map layers */}
              <svg className="w-full h-full p-4" viewBox="0 0 500 300">
                {/* Simulated Roads/Beats grid */}
                <path d="M 20 50 L 480 50" stroke="#E3E8E1" strokeWidth="4" />
                <path d="M 20 150 L 480 150" stroke="#E3E8E1" strokeWidth="4" />
                <path d="M 20 250 L 480 250" stroke="#E3E8E1" strokeWidth="4" strokeDasharray="5 5" />
                <path d="M 100 20 L 100 280" stroke="#E3E8E1" strokeWidth="4" />
                <path d="M 250 20 L 250 280" stroke="#E3E8E1" strokeWidth="4" />
                <path d="M 400 20 L 400 280" stroke="#E3E8E1" strokeWidth="4" />

                {/* Legacy route line (dashed red, longer, overlaps) */}
                <path
                  d="M 50 250 L 400 80 L 100 50 L 400 250 L 250 150"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  opacity="0.4"
                />

                {/* AI Optimized Route Path (Solid thick emerald teal) */}
                <path
                  d="M 50 250 L 100 50 L 250 150 L 400 80 L 400 250"
                  fill="none"
                  stroke="#1B7A5A"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-[dash_5s_linear_infinite]"
                  style={{
                    strokeDasharray: '600',
                    strokeDashoffset: '0'
                  }}
                />

                {/* Stop Markers */}
                {/* Depot */}
                <g className="cursor-pointer">
                  <circle cx="50" cy="250" r="14" fill="#0F3D2E" stroke="#fff" strokeWidth="2" />
                  <text x="50" y="254" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">D</text>
                  <text x="50" y="274" fill="#0F3D2E" fontSize="9" fontWeight="bold" textAnchor="middle">DEPOT</text>
                </g>

                {/* Stop 1 */}
                <g className="cursor-pointer">
                  <circle cx="100" cy="50" r="11" fill="#1B7A5A" stroke="#fff" strokeWidth="1.5" />
                  <text x="100" y="54" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">1</text>
                  <text x="100" y="36" fill="#2E2E2E" fontSize="9" fontWeight="bold" textAnchor="middle">Stop 1</text>
                </g>

                {/* Stop 2 */}
                <g className="cursor-pointer">
                  <circle cx="250" cy="150" r="11" fill="#1B7A5A" stroke="#fff" strokeWidth="1.5" />
                  <text x="250" y="154" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">2</text>
                  <text x="250" y="136" fill="#2E2E2E" fontSize="9" fontWeight="bold" textAnchor="middle">Stop 2</text>
                </g>

                {/* Stop 3 */}
                <g className="cursor-pointer">
                  <circle cx="400" cy="80" r="11" fill="#1B7A5A" stroke="#fff" strokeWidth="1.5" />
                  <text x="400" y="84" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">3</text>
                  <text x="400" y="66" fill="#2E2E2E" fontSize="9" fontWeight="bold" textAnchor="middle">Stop 3</text>
                </g>

                {/* Stop 4 */}
                <g className="cursor-pointer">
                  <circle cx="400" cy="250" r="11" fill="#F0A35E" stroke="#fff" strokeWidth="1.5" />
                  <text x="400" y="254" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">4</text>
                  <text x="400" y="236" fill="#2E2E2E" fontSize="9" fontWeight="bold" textAnchor="middle">Stop 4</text>
                </g>
              </svg>
              
              {/* Map floating controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur border border-brand-border px-3 py-1.5 rounded-lg text-[10px] font-bold text-brand-dark flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
                  <span>AI Optimal Route</span>
                </div>
                <div className="bg-white/90 backdrop-blur border border-brand-border px-3 py-1.5 rounded-lg text-[10px] font-bold text-brand-dark flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 bg-brand-danger rounded-full"></span>
                  <span>Legacy Sequence</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Comparison Table list */}
        <div className="bg-white border border-brand-border/60 rounded-2xl shadow-sm overflow-hidden p-6 space-y-4">
          <div>
            <h2 className="text-lg font-display font-extrabold text-brand-dark">Beat Comparisons</h2>
            <p className="text-xs text-brand-muted font-medium mt-1">Select salesman beat to render optimization parameters on map.</p>
          </div>

          <div className="space-y-3">
            {mockFuelComparison.map((comp) => {
              const isSelected = comp.id === selectedRouteId;
              const isAggregate = comp.salesmanName === 'Overall Aggregate';
              
              return (
                <div
                  key={comp.id}
                  onClick={() => setSelectedRouteId(comp.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected 
                      ? 'bg-brand-bg/50 border-brand-accent shadow-sm' 
                      : 'bg-white border-brand-border hover:border-brand-border/80'
                  } ${isAggregate ? 'bg-brand-dark/5 border-dashed border-brand-dark/20' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-brand-dark">{comp.salesmanName}</p>
                      <p className="text-xs text-brand-muted font-medium mt-0.5">{comp.routeName}</p>
                    </div>
                    <span className="text-xs font-black text-brand-accent bg-brand-accent/15 px-2 py-1 rounded-lg">
                      {comp.savings}% saved
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-brand-border/40 pt-3 text-[11px] font-semibold">
                    <div>
                      <span className="text-brand-muted">Legacy Run</span>
                      <p className="text-xs font-bold text-brand-dark mt-0.5">{comp.beforeDistance} km ({comp.beforeFuel}L)</p>
                    </div>
                    <div>
                      <span className="text-brand-accent">BeatFlow AI Run</span>
                      <p className="text-xs font-extrabold text-brand-accent mt-0.5">{comp.afterDistance} km ({comp.afterFuel}L)</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
