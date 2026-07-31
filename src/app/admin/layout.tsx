'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PulseLogo from '@/components/PulseLogo';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  BrainCircuit,
  MapPin,
  AlertTriangle,
  CreditCard,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Smartphone,
  Globe,
  LogOut
} from 'lucide-react';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems: SidebarItem[] = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Salesmen & Team', href: '/admin/salesmen', icon: Users },
    { name: 'Orders Log', href: '/admin/orders', icon: ShoppingBag },
    { name: 'AI Demand Insights', href: '/admin/insights', icon: BrainCircuit },
    { name: 'Route Optimization', href: '/admin/routes', icon: MapPin },
    { name: 'Inventory Alerts', href: '/admin/stock', icon: AlertTriangle },
    { name: 'Payments Collection', href: '/admin/payments', icon: CreditCard },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-brand-bg text-brand-text font-sans">
      {/* Sidebar */}
      <aside
        className={`bg-brand-dark text-white flex flex-col transition-all duration-300 relative border-r border-brand-border/10 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-brand-border/10 flex items-center justify-between">
          {!collapsed ? (
            <Link href="/admin">
              <div className="flex items-center gap-1">
                {/* Custom SVG logo color for dark backgrounds */}
                <div className="relative flex items-center justify-center mr-1">
                  <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 32H18L26 12L38 52L46 32H58"
                      stroke="#1B7A5A"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-display font-extrabold text-xl tracking-tight text-white">
                  Beat<span className="text-brand-accent">Flow</span>
                </span>
              </div>
            </Link>
          ) : (
            <Link href="/admin" className="mx-auto">
              <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 32H18L26 12L38 52L46 32H58"
                  stroke="#1B7A5A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? 'bg-brand-accent text-white shadow-md shadow-brand-accent/20'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Quick App Switcher */}
        <div className="p-3 border-t border-brand-border/10">
          <Link
            href="/app"
            className={`flex items-center gap-3 px-3 py-3 rounded-xl bg-brand-warning/10 text-brand-warning border border-brand-warning/20 hover:bg-brand-warning/20 transition-all duration-200 text-sm font-semibold ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Switch to Mobile App"
          >
            <Smartphone className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Launch Field App</span>}
          </Link>
        </div>

        {/* Sign Out Button */}
        <div className="p-3 border-t border-brand-border/10">
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-3 rounded-xl bg-brand-danger/10 text-brand-danger border border-brand-danger/20 hover:bg-brand-danger/20 transition-all duration-200 text-sm font-semibold ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Sign Out"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </Link>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-16 bg-brand-accent text-white p-1 rounded-full border border-brand-bg shadow-md hover:bg-brand-accent/90 transition-all z-10"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-brand-border px-6 flex items-center justify-between shrink-0">
          {/* Search Box */}
          <div className="flex items-center gap-4 w-96 relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search orders, shops, salesmen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-bg/50 border border-brand-border pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-accent/50 focus:bg-white transition-all text-brand-text placeholder:text-brand-muted/70"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4">
            {/* Quick Pakistan Market Tag */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-bg border border-brand-border text-xs font-semibold text-brand-dark">
              <Globe className="w-3.5 h-3.5 text-brand-accent" />
              <span>PK Market — PKR Native</span>
            </div>

            {/* Notifications */}
            <button className="p-2 text-brand-dark hover:bg-brand-bg rounded-xl relative transition-all border border-transparent hover:border-brand-border">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-warning rounded-full ring-2 ring-white"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 border-l border-brand-border pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-brand-dark">Haji Saleem</p>
                <p className="text-xs text-brand-muted font-medium">Distributor Director</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-accent text-white flex items-center justify-center font-bold font-display shadow-md shadow-brand-accent/10 border border-brand-border/10">
                HS
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 grid-motif bg-[#F9FAF7]">
          {children}
        </main>
      </div>
    </div>
  );
}
