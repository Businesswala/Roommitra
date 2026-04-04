"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, Save, Server, Shield } from "lucide-react";

export default function AppSettings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Constants</h1>
        <p className="text-slate-500 mt-1 font-medium">Architectural overrides affecting global platform functionality strings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Global Config */}
         <Card className="rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
               <CardTitle className="font-bold text-xl flex items-center gap-2"><Server size={20} className="text-blue-600"/> Application Bounds</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
               <div>
                 <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Platform Title Identifier</label>
                 <Input defaultValue="Roommitra" className="mt-1.5 h-11" />
               </div>
               <div>
                 <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Support Email Router</label>
                 <Input defaultValue="support@roommitra.in" className="mt-1.5 h-11" />
               </div>
               <Button className="w-full mt-4 font-bold bg-blue-600 hover:bg-blue-700">Update Core Constants</Button>
            </CardContent>
         </Card>

         {/* Commission Config */}
         <Card className="rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
               <CardTitle className="font-bold text-xl flex items-center gap-2"><Shield size={20} className="text-emerald-600"/> Financial Constants</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
               <div>
                 <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Global Commission Take Rate (%)</label>
                 <Input defaultValue="5" type="number" className="mt-1.5 h-11 text-emerald-600 font-black text-lg" />
               </div>
               <div>
                 <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Razorpay Production Key</label>
                 <Input type="password" defaultValue="rzp_live_xxxxxxxxxxxxxxxx" className="mt-1.5 h-11" />
               </div>
               <Button className="w-full mt-4 font-bold bg-emerald-600 hover:bg-emerald-700">Lock Financial Vectors</Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
