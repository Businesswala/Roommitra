"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, DollarSign, Home, CheckSquare, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// 1. Mock Graph Data Array (Booking Velocity)
const bookingData = [
  { name: "Jan", bookings: 120 }, { name: "Feb", bookings: 180 },
  { name: "Mar", bookings: 250 }, { name: "Apr", bookings: 310 },
  { name: "May", bookings: 280 }, { name: "Jun", bookings: 390 },
  { name: "Jul", bookings: 420 }, { name: "Aug", bookings: 480 },
];

// 2. Mock Graph Data Array (Revenue Velocity)
const revenueData = [
  { name: "Jan", revenue: 45000 }, { name: "Feb", revenue: 52000 },
  { name: "Mar", revenue: 78000 }, { name: "Apr", revenue: 95000 },
  { name: "May", revenue: 86000 }, { name: "Jun", revenue: 110000 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Page Heading Bounds */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Overview</h1>
          <p className="text-slate-500 mt-1 font-medium">Real-time metrics and growth vectors.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Platform Operating Optimally
        </div>
      </div>

      {/* Hero Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Metric 1 */}
        <Card className="shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Users</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white">14,209</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Users size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight size={16} />
              <span>12.5%</span>
              <span className="text-slate-400 font-medium">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2 */}
        <Card className="shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Properties</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white">3,842</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Home size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight size={16} />
              <span>8.2%</span>
              <span className="text-slate-400 font-medium">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3 */}
        <Card className="shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Cum. Bookings</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white">12,504</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/40 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                <CheckSquare size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight size={16} />
              <span>24.8%</span>
              <span className="text-slate-400 font-medium">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4 */}
        <Card className="shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 opacity-[0.03] dark:opacity-[0.1]"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Gross Revenue</p>
                <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400">₹8.4M</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <DollarSign size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
              <TrendingUp size={16} />
              <span>31.4%</span>
              <span className="text-slate-400 font-medium">from last month</span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Advanced Recharts Interface Bounds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Graph 1: Booking Growth */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50 p-6">
            <CardTitle className="font-bold flex items-center justify-between">
              Booking Velocity
              <span className="text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full uppercase tracking-wider">Monthly</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#f1f5f9', opacity: 0.1 }}
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 600, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Bar dataKey="bookings" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Graph 2: Revenue Matrix */}
        <Card className="border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50 p-6">
            <CardTitle className="font-bold flex items-center justify-between">
              Gross Revenue Trajectory
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider">YTD 2026</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 600 }}
                  itemStyle={{ color: '#10b981' }}
                  formatter={(value: any) => [`₹${Number(value || 0).toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
