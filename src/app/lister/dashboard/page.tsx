"use client";

import { useEffect, useState } from "react";
import { 
  TrendingUp, Home, Eye, CheckCircle, Clock, AlertCircle, Users, Wallet, ArrowRight 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getListerStats, getRecentListerBookings } from "@/app/actions/listing";

import Link from "next/link";
import { useSession } from "next-auth/react";
export default function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = session?.user;
        if (!user) return;

        const [statsResult, bookingsResult] = await Promise.all([
          getListerStats(),
          getRecentListerBookings()
        ]);

        setStatsData(statsResult.data);
        setRecentBookings(bookingsResult.data || []);
      } catch (error) {
        console.error("Lister Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = [
    { title: "Active Assets", value: statsData?.active || "0", icon: Home, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { title: "Moderation Queue", value: statsData?.pending || "0", icon: Clock, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
    { title: "Total Bookings", value: statsData?.totalBookings || "0", icon: Users, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { title: "Verified Identity", value: statsData?.status || "ACTIVE", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Welcome Lister! Manage your properties here.</h1>
        <p className="text-slate-500 mt-2 font-medium">Verify deployment status and monitor real-time fulfillment across your grid.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden rounded-[2.5rem]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.title}</CardTitle>
              <div className={`p-3 rounded-2xl ${stat.bg} shadow-sm`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Card className="border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
            <CardTitle className="text-lg font-black flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Pulse Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {recentBookings.length === 0 ? (
                <p className="text-sm text-slate-500 italic">Zero physical reservations detected in recent ledger updates.</p>
              ) : (
                recentBookings.map((booking: any) => (
                  <div key={booking.id} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center font-black text-blue-600 text-xs shadow-sm">
                      {booking.user?.name?.[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-900 dark:text-white truncate">{booking.user?.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{booking.listing?.title}</p>
                    </div>
                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-slate-100 py-1 bg-white dark:bg-slate-900">{booking.status}</Badge>
                  </div>
                ))
              )}
              <Link href="/lister/dashboard/bookings">
                <Button variant="ghost" className="w-full mt-4 h-12 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-400 hover:text-blue-600 hover:bg-blue-50 group">
                  Audit Full Lattice <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-2xl shadow-blue-500/10 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-[80px] -translate-y-12 translate-x-12 group-hover:scale-125 transition-transform duration-700" />
           <CardHeader className="p-10 pb-4">
             <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
               <Wallet size={24} className="text-blue-500" /> Pro Governance
             </CardTitle>
           </CardHeader>
           <CardContent className="p-10 pt-0">
             <p className="text-slate-400 font-medium leading-relaxed mb-10">
               Your physical assets are currently deploying within the standard moderation perimeter. Ensure your **Business Name** and **Metadata** are verified to minimize fulfillment rejection rates.
             </p>
             <div className="flex flex-col sm:flex-row gap-4">
               <Button className="flex-1 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-black uppercase text-[10px] tracking-widest border-none shadow-xl shadow-blue-600/20">Optimise Grid Identity</Button>
               <Button variant="outline" className="flex-1 h-16 bg-transparent text-white border-slate-700 hover:bg-slate-800 rounded-3xl font-black uppercase text-[10px] tracking-widest transition-all">Documentation Hub</Button>
             </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
