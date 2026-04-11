"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, DollarSign, Home, CheckSquare, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { getSystemStats, getGrowthData } from "@/app/actions/admin";
import { AdminCharts } from "@/components/admin/AdminCharts";
import { createClient } from "@/utils/supabase/client";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [growth, setGrowth] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const [statsResult, growthResult] = await Promise.all([
          getSystemStats(),
          getGrowthData()
        ]);

        if (statsResult.error) setError(statsResult.error);
        else setStats(statsResult.data);
        
        setGrowth(growthResult.data);
      } catch (err) {
        console.error("Admin Dashboard Fetch Fault:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const metrics = [
    { title: "Total Users", value: stats?.users || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/40" },
    { title: "Active Properties", value: stats?.listings || 0, icon: Home, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/40" },
    { title: "Cum. Bookings", value: stats?.bookings || 0, icon: CheckSquare, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/40" },
    { title: "Gross Revenue", value: `₹${(stats?.revenue || 0).toLocaleString()}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/40" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Welcome to Admin Panel</h1>
          <p className="text-slate-500 mt-1 font-medium">Real-time metrics and growth vectors. Admin Panel Active.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Platform Operating Optimally
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title} className="shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{metric.title}</p>
                  <p className="text-4xl font-black text-slate-900 dark:text-white">{metric.value}</p>
                </div>
                <div className={`w-12 h-12 ${metric.bg} rounded-2xl flex items-center justify-center ${metric.color}`}>
                  <metric.icon size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                <Activity size={16} />
                <span>Live Status</span>
                <span className="text-slate-400 font-medium ml-1">Updated just now</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold mb-4">Properties Overview (Placeholder)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-50 dark:bg-slate-800 text-slate-500">
              <tr>
                <th className="p-4">Property Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-slate-800">
                <td className="p-4">Demo PG Property</td>
                <td className="p-4">Delhi</td>
                <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg">Active</span></td>
                <td className="p-4">View</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {growth && <AdminCharts bookingData={growth} revenueData={growth} />}
      
      {error && <div className="p-4 bg-red-100 text-red-600 rounded-xl font-bold">⚠️ Error fetching analytics: {error}</div>}
    </div>
  );
}
