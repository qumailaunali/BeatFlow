'use client';

import React, { useState } from 'react';
import { mockSalesmen, mockOrders } from '@/data/mockData';
import {
  Search,
  Filter,
  Circle,
  Clock,
  Fuel,
  ShoppingBag,
  Phone,
  MapPin,
  ChevronRight,
  TrendingUp,
  X,
  Map,
  User
} from 'lucide-react';

export default function AdminSalesmen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSalesmanId, setSelectedSalesmanId] = useState<string | null>('sales-1');

  // Filter list
  const filteredSalesmen = mockSalesmen.filter(salesman =>
    salesman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salesman.beatArea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedSalesman = mockSalesmen.find(s => s.id === selectedSalesmanId) || mockSalesmen[0];

  // Get orders done by the selected salesman
  const salesmanOrders = mockOrders.filter(o => o.salesmanName === selectedSalesman.name);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-brand-dark tracking-tight">Salesmen & Field Team</h1>
          <p className="text-brand-muted mt-1 font-medium">Track agent status, active beats, and real-time fuel efficiency metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Salesmen list (Table) */}
        <div className="xl:col-span-2 bg-white border border-brand-border/60 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          {/* List Toolbar */}
          <div className="p-4 border-b border-brand-border/60 flex flex-col sm:flex-row gap-3 items-center justify-between bg-brand-bg/10">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search salesman or beat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-brand-border pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-brand-text placeholder:text-brand-muted/70"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
              <button className="flex items-center gap-2 px-3.5 py-2 border border-brand-border rounded-xl text-xs font-semibold text-brand-dark hover:bg-brand-bg/50 transition-all">
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-brand-bg/30 text-brand-dark font-display font-bold text-xs uppercase tracking-wider border-b border-brand-border/60">
                  <th className="p-4 pl-6">Salesman</th>
                  <th className="p-4">Assigned Beat</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Orders Today</th>
                  <th className="p-4 text-center">On-Time %</th>
                  <th className="p-4 text-right">Fuel Saved</th>
                  <th className="p-4 pr-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40">
                {filteredSalesmen.map((salesman) => {
                  const isSelected = salesman.id === selectedSalesmanId;
                  return (
                    <tr
                      key={salesman.id}
                      onClick={() => setSelectedSalesmanId(salesman.id)}
                      className={`hover:bg-brand-bg/30 transition-all cursor-pointer ${
                        isSelected ? 'bg-brand-bg/50 border-l-4 border-l-brand-accent' : ''
                      }`}
                    >
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                            salesman.name === 'Kiran Zehra' || salesman.name === 'Manal Mustafa'
                              ? 'bg-brand-warning/15 border-brand-warning/30 text-brand-warning'
                              : 'bg-brand-accent/15 border-brand-accent/30 text-brand-accent'
                          }`}>
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-brand-dark">{salesman.name}</p>
                            <p className="text-xs text-brand-muted font-medium">{salesman.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-brand-dark">{salesman.beatArea}</span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                            salesman.active
                              ? 'bg-brand-success/10 text-brand-success'
                              : 'bg-brand-muted/10 text-brand-muted'
                          }`}
                        >
                          <Circle className="w-2 h-2 fill-current" />
                          <span>{salesman.active ? 'Active Now' : 'Offline'}</span>
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-sm font-bold text-brand-dark">
                          {salesman.ordersToday} <span className="text-xs text-brand-muted">/ {salesman.targetOrders}</span>
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-sm font-bold text-brand-dark">
                          {salesman.active ? `${salesman.onTimePercent}%` : '-'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <span className="text-sm font-black text-brand-accent">
                          {salesman.active ? `+${salesman.fuelSavedPercent}%` : '-'}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <ChevronRight className="w-4 h-4 text-brand-muted ml-auto" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Side Panel (Selected Salesman Profile) */}
        {selectedSalesman && (
          <div className="bg-white border border-brand-border/60 rounded-2xl shadow-sm p-6 space-y-6 transition-all duration-300">
            {/* Profile Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0 ${
                  selectedSalesman.name === 'Kiran Zehra' || selectedSalesman.name === 'Manal Mustafa'
                    ? 'bg-brand-warning/15 border-brand-warning/30 text-brand-warning'
                    : 'bg-brand-accent/15 border-brand-accent/30 text-brand-accent'
                }`}>
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-extrabold text-brand-dark">{selectedSalesman.name}</h2>
                  <p className="text-xs font-medium text-brand-muted uppercase tracking-wider">{selectedSalesman.beatArea} Beat</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-brand-accent bg-brand-bg px-2.5 py-1.5 rounded-xl border border-brand-border">
                <MapPin className="w-3.5 h-3.5" />
                <span>Gulshan</span>
              </div>
            </div>

            {/* Performance Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-bg/40 p-4 rounded-xl border border-brand-border/40">
                <div className="flex items-center justify-between text-brand-muted mb-1.5">
                  <span className="text-xs font-bold tracking-wider uppercase">Distance</span>
                  <Map className="w-4 h-4 text-brand-accent" />
                </div>
                <p className="text-lg font-black text-brand-dark">{selectedSalesman.active ? `${selectedSalesman.distanceKm} km` : '-'}</p>
                <p className="text-xs text-brand-muted mt-0.5">Today's total route</p>
              </div>

              <div className="bg-brand-bg/40 p-4 rounded-xl border border-brand-border/40">
                <div className="flex items-center justify-between text-brand-muted mb-1.5">
                  <span className="text-xs font-bold tracking-wider uppercase">Route Duration</span>
                  <Clock className="w-4 h-4 text-brand-accent" />
                </div>
                <p className="text-lg font-black text-brand-dark">{selectedSalesman.active ? selectedSalesman.estTime : '-'}</p>
                <p className="text-xs text-brand-muted mt-0.5">Est. time in field</p>
              </div>

              <div className="bg-brand-bg/40 p-4 rounded-xl border border-brand-border/40">
                <div className="flex items-center justify-between text-brand-muted mb-1.5">
                  <span className="text-xs font-bold tracking-wider uppercase">Fuel efficiency</span>
                  <Fuel className="w-4 h-4 text-brand-warning" />
                </div>
                <p className="text-lg font-black text-brand-accent">{selectedSalesman.active ? `+${selectedSalesman.fuelSavedPercent}%` : '-'}</p>
                <p className="text-xs text-brand-muted mt-0.5">Savings vs before AI</p>
              </div>

              <div className="bg-brand-bg/40 p-4 rounded-xl border border-brand-border/40">
                <div className="flex items-center justify-between text-brand-muted mb-1.5">
                  <span className="text-xs font-bold tracking-wider uppercase">Orders sync</span>
                  <ShoppingBag className="w-4 h-4 text-brand-accent" />
                </div>
                <p className="text-lg font-black text-brand-dark">{selectedSalesman.ordersToday} / {selectedSalesman.targetOrders}</p>
                <p className="text-xs text-brand-muted mt-0.5">Active bookings</p>
              </div>
            </div>

            {/* Mock Route Map */}
            <div className="border border-brand-border/60 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-dark uppercase tracking-widest">Beat Flow Map Sequence</span>
                <span className="text-xs font-semibold text-brand-accent">AI-Optimized</span>
              </div>
              
              {/* Custom SVG Map Visual */}
              <div className="h-40 bg-brand-bg/60 rounded-lg relative overflow-hidden border border-brand-border/30 flex items-center justify-center">
                <div className="absolute inset-0 opacity-15 grid-motif"></div>
                <svg className="w-full h-full" viewBox="0 0 200 120">
                  {/* Dashed optimized route lines */}
                  <path
                    d="M 20 60 Q 50 20 100 50 T 180 80"
                    fill="none"
                    stroke="#1B7A5A"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                  />
                  {/* Route points */}
                  <circle cx="20" cy="60" r="8" fill="#0F3D2E" />
                  <text x="20" y="64" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">1</text>

                  <circle cx="70" cy="35" r="8" fill="#1B7A5A" />
                  <text x="70" y="39" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">2</text>

                  <circle cx="120" cy="55" r="8" fill="#1B7A5A" />
                  <text x="120" y="59" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">3</text>

                  <circle cx="180" cy="80" r="8" fill="#F0A35E" />
                  <text x="180" y="84" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">4</text>
                </svg>
                <span className="absolute bottom-2 right-2 bg-brand-dark/80 text-white text-[10px] px-2 py-0.5 rounded font-bold">4 stops active</span>
              </div>
            </div>

            {/* Today's Orders Log */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-brand-dark uppercase tracking-widest">Today's Synced Bookings</h3>
              {salesmanOrders.length > 0 ? (
                <div className="space-y-2">
                  {salesmanOrders.map(order => (
                    <div key={order.id} className="flex justify-between items-center bg-brand-bg/30 p-3 rounded-xl border border-brand-border/40 text-xs">
                      <div>
                        <p className="font-bold text-brand-dark">{order.shopName}</p>
                        <p className="text-[10px] text-brand-muted mt-0.5">ID: {order.id} | {order.paymentMethod}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-brand-accent">Rs {order.actualValue.toLocaleString()}</p>
                        <span className={`inline-block px-1.5 py-0.5 rounded-[4px] text-[9px] font-bold mt-1 ${
                          order.status === 'Synced Offline' 
                            ? 'bg-brand-warning/15 text-brand-warning' 
                            : 'bg-brand-success/15 text-brand-success'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-brand-border text-center">
                  <p className="text-xs text-brand-muted font-medium">No orders synced from beat route yet today.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
