"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bell, Mail, Users } from "lucide-react";

export default function NotificationSystem() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Global Broadcast Server</h1>
        <p className="text-slate-500 mt-1 font-medium">Push raw socket notifications instantly to user terminals.</p>
      </div>

      <Card className="rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
         <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-row items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600">
               <Bell size={24} />
            </div>
            <div>
               <CardTitle className="font-bold text-xl">Immediate Push Sequence</CardTitle>
               <p className="text-sm font-semibold text-slate-500">Fire alerts directly directly into device Notification Centers.</p>
            </div>
         </CardHeader>
         <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
               <div>
                 <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Target Audience Map</label>
                 <select className="flex mt-1.5 h-11 w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-semibold">
                    <option>Global (All Active Tokens)</option>
                    <option>Target: SEEKERS only</option>
                    <option>Target: LISTERS only</option>
                 </select>
               </div>
               <div>
                 <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Payload Title</label>
                 <Input placeholder="E.g., Huge Server Upgrade!" className="mt-1.5 h-11" />
               </div>
               <div>
                 <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message Body Constraint</label>
                 <textarea placeholder="Type actual push content..." className="flex mt-1.5 min-h-[120px] w-full rounded-md border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
               </div>
            </div>
            <Button className="w-full sm:w-auto h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 shadow-xl shadow-blue-500/20">
               <Send size={16} className="mr-2" /> Execute Global Broadcast
            </Button>
         </CardContent>
      </Card>
    </div>
  );
}
