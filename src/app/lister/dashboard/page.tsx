"use client";

import { 
  TrendingUp, 
  Home, 
  Eye, 
  CheckCircle, 
  Clock, 
  AlertCircle 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OverviewPage() {
  const stats = [
    { title: "Total Views", value: "1,284", icon: Eye, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { title: "Active Listings", value: "3", icon: Home, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
    { title: "Pending Approval", value: "1", icon: Clock, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
    { title: "Profile Status", value: "Verified", icon: CheckCircle, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2">Welcome back! Here's how your listings are performing today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Property view on "Premium Room HSR"</p>
                    <p className="text-xs text-slate-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Pro Tip for Listers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="opacity-90 text-sm leading-relaxed">
              Adding clear, high-resolution photos increases your listing engagement by 40%. Use our built-in Cloudinary optimizer to ensure your images load fast for potential tenants!
            </p>
            <button className="mt-6 bg-white text-blue-700 px-6 py-2 rounded-xl font-bold text-sm hover:bg-opacity-90 transition-all">
              Update Photos
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
