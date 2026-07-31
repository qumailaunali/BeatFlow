'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, 
  Smartphone, 
  LayoutDashboard, 
  Globe, 
  ArrowRight, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  MapPin, 
  WifiOff, 
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export default function EntryPortal() {
  const router = useRouter();
  
  // Interactive state
  const [role, setRole] = useState<'distributor' | 'agent'>('distributor');
  const [email, setEmail] = useState('admin@beatflow.pk');
  const [phone, setPhone] = useState('0300 1234567');
  const [password, setPassword] = useState('••••••••');
  const [pin, setPin] = useState('1234');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Handle mock authentication submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (role === 'distributor') {
      setStatusMsg('Authenticating administrator...');
      setTimeout(() => {
        setStatusMsg('Access granted. Initializing dashboard...');
        setTimeout(() => {
          router.push('/admin');
        }, 800);
      }, 1000);
    } else {
      setStatusMsg('Verifying field agent credentials...');
      setTimeout(() => {
        setStatusMsg('Verification successful. Launching app...');
        setTimeout(() => {
          router.push('/app/home');
        }, 800);
      }, 1000);
    }
  };

  // Direct guest bypass logins
  const handleGuestLogin = (destination: 'admin' | 'app') => {
    setLoading(true);
    setStatusMsg(destination === 'admin' ? 'Logging in as Guest Admin...' : 'Logging in as Guest Agent...');
    
    setTimeout(() => {
      if (destination === 'admin') {
        router.push('/admin');
      } else {
        router.push('/app/home');
      }
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-accent selection:text-white">
      
      {/* LEFT PANE: Product & Brand Information Panel */}
      <section className="lg:col-span-5 bg-brand-dark text-white p-6 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-fit lg:min-h-screen py-8 lg:py-16 border-b lg:border-b-0 lg:border-r border-brand-border/10">
        {/* Network / Map dotted lines motif */}
        <div className="absolute inset-0 opacity-15 pointer-events-none grid-motif"></div>
        <div className="absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full bg-brand-accent/25 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-brand-warning/15 blur-3xl pointer-events-none"></div>

        {/* Top Header: Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
            <svg width="26" height="26" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 32H18L26 12L38 52L46 32H58"
                stroke="#10B981"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-display font-black text-2xl tracking-tight text-white">
            Beat<span className="text-brand-success">Flow</span>
          </span>
        </div>

        {/* Middle Body: Pitch, Taglines & Key Highlights */}
        <div className="relative z-10 my-auto py-6 lg:py-0 space-y-6 lg:space-y-8 max-w-lg">
          <div className="space-y-2 lg:space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-brand-warning tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Pakistani AI FMCG Technology
            </span>
            <h1 className="text-3xl lg:text-5xl font-display font-black tracking-tight leading-[1.1]">
              Beyond Tracking. <br />
              <span className="text-brand-success">Start Predicting.</span>
            </h1>
            <p className="text-sm text-gray-300 leading-relaxed font-medium">
              A PKR-native CRM & optimization suite helping distributors maximize profits, cut route fuel costs, and maintain predictive stock levels.
            </p>
          </div>

          {/* Key Features List - Shown on desktop/tablet, simplified on mobile */}
          <div className="space-y-4 pt-2 hidden lg:block">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-brand-accent/20 border border-brand-accent/30 text-brand-success shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">15-20% Fuel Cost Reduction</h4>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  Smart routing algorithms optimize salesman paths based on store history, traffic constraints, and distance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-brand-accent/20 border border-brand-accent/30 text-brand-success shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Predictive AI Demand Models</h4>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  Predict retailer purchases based on local bazaar trends, preventing stockouts and improving sales agent targets.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-brand-accent/20 border border-brand-accent/30 text-brand-success shrink-0 mt-0.5">
                <WifiOff className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Offline Order Booking</h4>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                  Fully operational field app functions in low-signal bazaars, syncing orders as soon as connection is re-established.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel: Local economy notice - hidden on mobile to conserve screen fold */}
        <div className="relative z-10 pt-4 border-t border-white/5 hidden lg:flex items-center gap-3">
          <Globe className="w-6 h-6 text-brand-success shrink-0 animate-pulse" />
          <div className="text-xs">
            <p className="font-bold text-white">Save Pakistan's Foreign Reserves</p>
            <p className="text-gray-400 mt-0.5 font-medium leading-relaxed">
              Ditch expensive dollar-billed alternatives. Local AI pricing matches local market scales.
            </p>
          </div>
        </div>
      </section>

      {/* RIGHT PANE: Dynamic Login and Guest Gateway Portal */}
      <section className="lg:col-span-7 flex flex-col justify-between p-5 md:p-12 lg:p-16 relative bg-brand-bg">
        {/* Network decoration background */}
        <div className="absolute right-0 bottom-0 w-64 h-64 opacity-5 pointer-events-none grid-motif"></div>

        {/* Top Header Placeholder (Aligns vertically) */}
        <div className="hidden lg:block text-right">
          <span className="text-[10px] text-brand-muted font-bold tracking-widest uppercase">
            BEATFLOW SYSTEM ACCESS
          </span>
        </div>

        {/* Main Login / Gateway Card Container */}
        <div className="max-w-md w-full mx-auto my-auto py-6 lg:py-0 space-y-6 lg:space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-display font-black text-brand-dark tracking-tight">
              Access BeatFlow
            </h2>
            <p className="text-xs md:text-sm text-brand-muted font-semibold">
              Select your role to access your designated workspace, or launch guest mode.
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="grid grid-cols-2 p-1 bg-brand-bg border border-brand-border rounded-xl">
            <button
              onClick={() => setRole('distributor')}
              disabled={loading}
              className={`py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                role === 'distributor'
                  ? 'bg-white text-brand-dark shadow-sm border border-brand-border/60'
                  : 'text-brand-muted hover:text-brand-dark disabled:opacity-50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Distributor Admin</span>
            </button>
            <button
              onClick={() => setRole('agent')}
              disabled={loading}
              className={`py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                role === 'agent'
                  ? 'bg-white text-brand-dark shadow-sm border border-brand-border/60'
                  : 'text-brand-muted hover:text-brand-dark disabled:opacity-50'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Sales Field App</span>
            </button>
          </div>

          {/* Credentials Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {role === 'distributor' ? (
              // Distributor Credentials Inputs
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider">
                    Corporate Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-brand-muted absolute left-3 top-3.5" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. director@beatflow.pk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="w-full bg-white border border-brand-border pl-10 pr-4 py-3 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-accent/50 text-brand-text placeholder:text-brand-muted/40 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider">
                      Security Password
                    </label>
                    <a href="#" className="text-[10px] font-bold text-brand-accent hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-brand-muted absolute left-3 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className="w-full bg-white border border-brand-border pl-10 pr-10 py-3 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-accent/50 text-brand-text placeholder:text-brand-muted/40 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-brand-muted hover:text-brand-dark transition-all"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Salesperson Credentials Inputs
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider">
                    Registered Mobile Number
                  </label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 text-brand-muted absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={loading}
                      className="w-full bg-white border border-brand-border pl-10 pr-4 py-3 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-accent/50 text-brand-text placeholder:text-brand-muted/40 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-bold text-brand-dark uppercase tracking-wider">
                      Security PIN / OTP
                    </label>
                    <a href="#" className="text-[10px] font-bold text-brand-accent hover:underline">
                      Resend PIN?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-brand-muted absolute left-3 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      maxLength={6}
                      placeholder="e.g. 1234"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      disabled={loading}
                      className="w-full bg-white border border-brand-border pl-10 pr-10 py-3 rounded-xl text-sm font-semibold focus:outline-none focus:border-brand-accent/50 text-brand-text placeholder:text-brand-muted/40 transition-all text-center tracking-widest placeholder:tracking-normal"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-brand-muted hover:text-brand-dark transition-all"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="remember"
                defaultChecked
                disabled={loading}
                className="w-4 h-4 rounded border-brand-border text-brand-accent focus:ring-brand-accent/30"
              />
              <label htmlFor="remember" className="text-xs text-brand-muted font-bold select-none cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Credentials Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-dark text-white py-3 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-brand-dark/10 active:scale-[0.99] transition-all hover:bg-brand-dark/95 disabled:opacity-50 relative overflow-hidden"
            >
              {loading && !statusMsg.includes('Guest') ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>{statusMsg || 'Verifying...'}</span>
                </div>
              ) : (
                <>
                  <span>Sign In to Your BeatFlow Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            
            <p className="text-[10px] text-brand-muted text-center font-bold uppercase tracking-wider pt-1">
              Demo Credentials Pre-filled. Click above or use Guest options below.
            </p>
          </form>

          {/* Visual Separator */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-brand-border"></div>
            <span className="flex-shrink mx-4 text-[10px] font-bold text-brand-muted uppercase tracking-widest bg-brand-bg px-2">
              Guest Portals Bypass
            </span>
            <div className="flex-grow border-t border-brand-border"></div>
          </div>

          {/* TWO GUEST LOGIN BUTTONS: Dashboard and Mobile App */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
            
            {/* Guest Login Dashboard */}
            <button
              type="button"
              onClick={() => handleGuestLogin('admin')}
              disabled={loading}
              className="flex flex-row sm:flex-col items-center sm:items-start p-3.5 bg-white border border-brand-border rounded-2xl hover:border-brand-accent/50 hover:bg-white hover:shadow-lg transition-all text-left gap-3.5 sm:space-y-2.5 sm:gap-0 group active:scale-[0.99]"
            >
              <div className="p-2.5 bg-brand-accent/10 rounded-xl text-brand-accent group-hover:scale-105 transition-transform shrink-0">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-brand-dark flex items-center gap-1">
                  <span>Guest Dashboard</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </h3>
                <p className="text-[10px] text-brand-muted mt-0.5 leading-relaxed hidden sm:block">
                  Access the distributor control room. Track live stock, routes, and ledgers.
                </p>
                <p className="text-[10px] text-brand-muted mt-0.5 leading-relaxed sm:hidden">
                  Launch the desktop distributor control room overview.
                </p>
              </div>
              <span className="text-[9px] font-extrabold text-brand-accent px-1.5 py-0.5 rounded bg-brand-accent/5 self-center sm:self-start shrink-0">
                Admin
              </span>
            </button>

            {/* Guest Login Mobile App */}
            <button
              type="button"
              onClick={() => handleGuestLogin('app')}
              disabled={loading}
              className="flex flex-row sm:flex-col items-center sm:items-start p-3.5 bg-white border border-brand-border rounded-2xl hover:border-brand-accent/50 hover:bg-white hover:shadow-lg transition-all text-left gap-3.5 sm:space-y-2.5 sm:gap-0 group active:scale-[0.99]"
            >
              <div className="p-2.5 bg-brand-warning/10 rounded-xl text-brand-warning group-hover:scale-105 transition-transform shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-brand-dark flex items-center gap-1">
                  <span>Guest Mobile App</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </h3>
                <p className="text-[10px] text-brand-muted mt-0.5 leading-relaxed hidden sm:block">
                  Launch field agent simulator. Test offline booking and AI route options.
                </p>
                <p className="text-[10px] text-brand-muted mt-0.5 leading-relaxed sm:hidden">
                  Launch the field salesman order booking interface.
                </p>
              </div>
              <span className="text-[9px] font-extrabold text-brand-warning px-1.5 py-0.5 rounded bg-brand-warning/5 self-center sm:self-start shrink-0">
                Field App
              </span>
            </button>

          </div>

          {/* Loading Overlap Splash if Guest Bypass is running */}
          {loading && statusMsg.includes('Guest') && (
            <div className="fixed inset-0 bg-brand-dark/20 backdrop-blur-[2px] z-50 flex items-center justify-center p-6">
              <div className="bg-white border border-brand-border p-6 rounded-2xl shadow-2xl flex flex-col items-center space-y-4 max-w-xs text-center animate-scale-up">
                <div className="w-10 h-10 border-4 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-brand-dark">{statusMsg}</p>
                  <p className="text-xs text-brand-muted">Preparing secure test environment...</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between text-[10px] text-brand-muted font-semibold gap-3 text-center sm:text-left">
          <span>© 2026 BeatFlow Technologies. Built for Pakistan FMCG sectors.</span>
          <div className="flex items-center gap-1 text-brand-accent justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Enterprise SSL</span>
          </div>
        </div>
      </section>

    </div>
  );
}
