"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Settings2, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServiceManagement() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Service Modifiers</h1>
          <p className="text-slate-500 mt-1 font-medium">Control generic sub-contractor pricing structures natively.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 font-bold rounded-xl hidden sm:flex truncate">Add Global Service</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
         <Card className="rounded-2xl shadow-lg border border-slate-200 overflow-hidden group">
            <div className="bg-orange-500 h-2 w-full"></div>
            <CardHeader className="p-6 pb-2">
               <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-4">
                  <Coffee size={24} />
               </div>
               <CardTitle className="font-bold text-xl">Tiffin Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="text-sm font-semibold text-slate-500 mb-4">Active generic baseline logic tracking massive meal plans across geographical networks.</div>
               <Button variant="outline" className="w-full font-bold">Configure Bounds</Button>
            </CardContent>
         </Card>
         <Card className="rounded-2xl shadow-lg border border-slate-200 overflow-hidden group">
            <div className="bg-blue-500 h-2 w-full"></div>
            <CardHeader className="p-6 pb-2">
               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <ShieldCheck size={24} />
               </div>
               <CardTitle className="font-bold text-xl">Cleaning/Laundry</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="text-sm font-semibold text-slate-500 mb-4">Global mapping array setting uniform pricing standards for external agents.</div>
               <Button variant="outline" className="w-full font-bold">Configure Bounds</Button>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
