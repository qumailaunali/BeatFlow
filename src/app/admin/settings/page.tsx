'use client';

import React, { useState } from 'react';
import {
  Settings,
  CreditCard,
  Users,
  Shield,
  Bell,
  Globe,
  Database,
  Building,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function AdminSettings() {
  const [seats, setSeats] = useState(4);
  const [lang, setLang] = useState('en');

  const pricePerSeat = 4200; // PKR per seat per month
  const totalBilling = seats * pricePerSeat;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-display font-extrabold text-brand-dark tracking-tight">System Settings</h1>
        <p className="text-brand-muted mt-1 font-medium">Manage distribution license allocations, currency defaults, and security configurations.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Left 2 Columns: Core settings categories */}
        <div className="xl:col-span-2 space-y-6">
          {/* Profile Details */}
          <div className="bg-white border border-brand-border/60 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-brand-border/50 pb-3">
              <Building className="w-5 h-5 text-brand-accent" />
              <h2 className="text-lg font-display font-extrabold text-brand-dark">Distributor Profile</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Company Name</label>
                <input
                  type="text"
                  value="Saleem FMCG Distributors Karachi"
                  disabled
                  className="w-full bg-brand-bg/50 border border-brand-border px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-dark focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">License Domain</label>
                <input
                  type="text"
                  value="saleem.beatflow.pk"
                  disabled
                  className="w-full bg-brand-bg/50 border border-brand-border px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-dark focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Primary City Hub</label>
                <input
                  type="text"
                  value="Karachi (Gulshan-e-Iqbal depot)"
                  disabled
                  className="w-full bg-brand-bg/50 border border-brand-border px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-dark focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Sub-Hub Coverage</label>
                <input
                  type="text"
                  value="Lahore (Model Town depot)"
                  disabled
                  className="w-full bg-brand-bg/50 border border-brand-border px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-dark focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Seat Management */}
          <div className="bg-white border border-brand-border/60 p-6 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-brand-border/50 pb-3">
              <Users className="w-5 h-5 text-brand-accent" />
              <h2 className="text-lg font-display font-extrabold text-brand-dark">Team Seat Allocation</h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-brand-bg/50 border border-brand-border/60 p-5 rounded-xl">
              <div>
                <p className="text-sm font-bold text-brand-dark">Active Field Seats</p>
                <p className="text-xs text-brand-muted font-medium mt-1">Allocate seats for active field salesmen routing with AI.</p>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => seats > 1 && setSeats(seats - 1)}
                  className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center font-bold text-lg hover:bg-brand-bg/30 transition-all text-brand-dark"
                >
                  -
                </button>
                <span className="w-12 text-center text-xl font-display font-black text-brand-dark">{seats}</span>
                <button
                  onClick={() => setSeats(seats + 1)}
                  className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center font-bold text-lg hover:bg-brand-bg/30 transition-all text-brand-dark"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="bg-brand-bg/40 p-4 rounded-xl border border-brand-border/40">
                <p className="text-brand-muted">PKR Subscription Seat Price</p>
                <p className="text-lg font-black text-brand-dark mt-1">Rs {pricePerSeat.toLocaleString()} <span className="text-[10px] text-brand-muted font-medium">/ seat / month</span></p>
              </div>

              <div className="bg-brand-bg/40 p-4 rounded-xl border border-brand-border/40">
                <p className="text-brand-muted">Upcoming Invoice Total</p>
                <p className="text-lg font-black text-brand-accent mt-1">Rs {totalBilling.toLocaleString()} <span className="text-[10px] text-brand-muted font-medium">/ month</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Billing card & platform info */}
        <div className="space-y-6">
          {/* Billing Card visual */}
          <div className="bg-brand-dark text-white p-6 rounded-2xl relative overflow-hidden border border-brand-border/10 shadow-md">
            <div className="absolute right-0 top-0 w-32 h-32 opacity-15 pointer-events-none grid-motif"></div>
            
            <span className="text-xs font-bold text-brand-warning tracking-widest uppercase bg-brand-warning/15 px-2.5 py-1.5 rounded-lg border border-brand-warning/20">
              Active Subscription
            </span>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-gray-300 font-medium">Next Billing Date</p>
                <p className="text-sm font-bold mt-0.5">August 30, 2026</p>
              </div>

              <div className="flex justify-between items-end border-t border-brand-border/10 pt-4">
                <div>
                  <p className="text-xs text-gray-300 font-medium">Monthly Charge</p>
                  <p className="text-2xl font-display font-black text-white mt-1">Rs {totalBilling.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => alert('Launching billing management window...')}
                  className="bg-brand-accent hover:bg-brand-accent/90 transition-all text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md"
                >
                  Manage Payment
                </button>
              </div>
            </div>
          </div>

          {/* AI engine version indicator */}
          <div className="bg-white border border-brand-border/60 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-brand-accent">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider">AI Local Hub Engine</h3>
            </div>
            
            <div className="space-y-3 text-xs font-medium">
              <div className="flex justify-between">
                <span className="text-brand-muted">Engine Version</span>
                <span className="text-brand-dark font-bold">v3.42-PK-Core</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Last Data Re-train</span>
                <span className="text-brand-dark font-bold">Yesterday, 11:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Forex Protection Lock</span>
                <span className="text-brand-success font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>PKR Locked</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
