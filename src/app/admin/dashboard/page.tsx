import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, DollarSign, Home, CheckSquare, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { getSystemStats, getGrowthData } from "@/app/actions/admin";
import { AdminCharts } from "@/components/admin/AdminCharts";

export default async function AdminDashboard() {
  const { data: stats, error } = await getSystemStats();
  const { data: growth, error: growthError } = await getGrowthData();

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
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Overview</h1>
          <p className="text-slate-500 mt-1 font-medium">Real-time metrics and growth vectors.</p>
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

      {growth && <AdminCharts bookingData={growth} revenueData={growth} />}
      
      {error && <div className="p-4 bg-red-100 text-red-600 rounded-xl font-bold">⚠️ Error fetching analytics: {error}</div>}
    </div>
  );
}
