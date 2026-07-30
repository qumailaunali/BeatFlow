import React from 'react';
import Link from 'next/link';
import { Sparkles, Smartphone, LayoutDashboard, HeartPulse, Globe, ArrowRight } from 'lucide-react';

export default function EntryPortal() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text font-sans relative overflow-hidden flex-1 items-center justify-center p-6 select-none">
      {/* Network dotted lines motif */}
      <div className="absolute right-0 top-0 w-64 h-64 opacity-20 pointer-events-none grid-motif"></div>
      <div className="absolute left-0 bottom-0 w-64 h-64 opacity-20 pointer-events-none grid-motif"></div>

      {/* Main card panel */}
      <main className="w-full max-w-4xl bg-white border border-brand-border p-8 md:p-12 rounded-[32px] shadow-xl relative z-10 flex flex-col items-center text-center space-y-8 animate-fade-in">
        {/* Animated Brand Pulse Mark */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full bg-brand-accent/10 animate-ping"></div>
          <div className="w-14 h-14 rounded-2xl bg-brand-dark flex items-center justify-center shadow-lg border border-brand-border/10">
            <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        {/* Brandings */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-display font-black text-brand-dark tracking-tight">
            Beat<span className="text-brand-accent">Flow</span>
          </h1>
          <p className="text-md md:text-lg font-bold text-brand-warning uppercase tracking-widest">
            Beyond Tracking. Start Predicting.
          </p>
          <p className="text-sm text-brand-muted max-w-xl mx-auto font-medium leading-relaxed">
            Pakistani AI-powered FMCG distribution platform. Optimizing beats to save 15-20% fuel and predicting retailer demands using local AI.
          </p>
        </div>

        {/* Forex savings alert card */}
        <div className="bg-brand-bg border border-brand-border px-6 py-4 rounded-2xl flex items-center gap-3 text-left max-w-lg shadow-sm">
          <Globe className="w-6 h-6 text-brand-accent shrink-0 animate-pulse" />
          <div className="text-xs">
            <p className="font-bold text-brand-dark">Local AI. Zero Forex Drain.</p>
            <p className="text-brand-muted mt-0.5 font-medium leading-relaxed">
              Let's save Pakistan's foreign reserves with PKR-native pricing instead of expensive dollar-based CRM alternatives.
            </p>
          </div>
        </div>

        {/* Gateway Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl pt-4">
          {/* Admin Dashboard */}
          <Link
            href="/admin"
            className="flex flex-col items-center justify-between p-6 bg-brand-bg/50 border border-brand-border rounded-2xl hover:border-brand-accent/50 hover:bg-white hover:shadow-lg transition-all group text-center space-y-4"
          >
            <div className="p-4 bg-brand-accent/10 rounded-2xl text-brand-accent group-hover:scale-105 transition-transform">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-display font-extrabold text-brand-dark">Admin Dashboard</h3>
              <p className="text-xs text-brand-muted mt-1 font-medium leading-relaxed">
                Desktop-first workspace for distributor owners/managers. Monitor salesmen, track live orders ledger, and verify route fuel savings.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-accent mt-2">
              <span>Launch Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          {/* Client / Field App */}
          <Link
            href="/app"
            className="flex flex-col items-center justify-between p-6 bg-brand-bg/50 border border-brand-border rounded-2xl hover:border-brand-accent/50 hover:bg-white hover:shadow-lg transition-all group text-center space-y-4"
          >
            <div className="p-4 bg-brand-warning/10 rounded-2xl text-brand-warning group-hover:scale-105 transition-transform">
              <Smartphone className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-display font-extrabold text-brand-dark">Field / Client App</h3>
              <p className="text-xs text-brand-muted mt-1 font-medium leading-relaxed">
                Mobile-first application for field sales agents. Book offline orders, see AI load suggestions, and navigate optimized paths.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-accent mt-2">
              <span>Launch Client App</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Pitch deck page reference */}
        <p className="text-[10px] text-brand-muted font-bold tracking-widest uppercase">
          BEATFLOW.PK — PROTOTYPE PORTAL
        </p>
      </main>
    </div>
  );
}
