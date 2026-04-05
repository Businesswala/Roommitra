"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Send, History, Info } from "lucide-react";
import { sendNotification } from "@/app/actions/admin";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [notifLoading, setNotifLoading] = useState(false);
  const [notification, setNotification] = useState({
    title: "",
    body: "",
    target: "ALL"
  });

  const handleSendNotification = async () => {
    if (!notification.title || !notification.body) {
      toast.error("Please fill in both title and body");
      return;
    }

    setNotifLoading(true);
    const result = await sendNotification(notification);
    setNotifLoading(false);

    if (!result.error) {
      toast.success("Broadcast dispatched successfully!");
      setNotification({ title: "", body: "", target: "ALL" });
    } else {
      toast.error("Failed to send: " + result.error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Communication Hub</h1>
          <p className="text-slate-500 mt-2 font-medium">Broadcast native notifications to segmented user cohorts.</p>
        </div>
        <Button variant="outline" className="h-12 rounded-xl font-bold flex items-center gap-2 border-slate-200 dark:border-slate-800">
           <History className="h-5 w-5" />
           View Sent Logs
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-xl overflow-hidden bg-white dark:bg-slate-900 ring-1 ring-slate-100 dark:ring-slate-800">
            <CardHeader className="bg-slate-900 text-white pb-8">
              <CardTitle className="flex items-center gap-2 tracking-tight">
                <Megaphone className="h-5 w-5 text-orange-400" />
                Dispatch New Broadcast
              </CardTitle>
              <p className="text-slate-400 text-xs mt-1 font-medium italic">Broadcasts are persistent and visible in user dashboards.</p>
            </CardHeader>
            <CardContent className="p-6 -mt-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 space-y-6 border border-slate-100 dark:border-slate-800">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Target Segment</label>
                    <Select value={notification.target} onValueChange={(v) => setNotification({...notification, target: v as string})}>
                        <SelectTrigger className="rounded-xl h-12 bg-slate-50 dark:bg-slate-950 border-0 focus:ring-2 focus:ring-blue-500 font-bold">
                          <SelectValue placeholder="Select target" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">All Network Nodes</SelectItem>
                          <SelectItem value="SEEKERS">Seekers Cohort</SelectItem>
                          <SelectItem value="LISTERS">Listers Cohort</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Title</label>
                    <Input 
                      value={notification.title}
                      onChange={(e) => setNotification({...notification, title: e.target.value})}
                      placeholder="e.g. Server Maintenance Notice" 
                      className="rounded-xl h-12 bg-slate-50 dark:bg-slate-950 border-0 focus-visible:ring-2 focus-visible:ring-blue-500 font-bold" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Messaging Payload</label>
                  <Textarea 
                    value={notification.body}
                    onChange={(e) => setNotification({...notification, body: e.target.value})}
                    placeholder="Provide full context for the users..." 
                    className="rounded-xl bg-slate-50 dark:bg-slate-950 border-0 focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[140px] font-medium" 
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                  <Info className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-800 dark:text-orange-300 font-medium leading-relaxed">
                    Once dispatched, this broadcast cannot be edited. It will be pushed to all active sessions within 5 seconds.
                  </p>
                </div>

                <Button 
                  onClick={handleSendNotification}
                  disabled={notifLoading}
                  className="w-full h-14 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest hover:bg-blue-700 shadow-xl shadow-blue-500/20 active:scale-95 transition-all group"
                >
                  {notifLoading ? "Encrypting & Sending..." : "Deploy Broadcast"}
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
           <Card className="border-0 shadow-lg bg-slate-50 dark:bg-slate-900/50">
              <CardHeader pb-4>
                 <CardTitle className="text-sm font-black uppercase tracking-wider text-slate-500">Live Delivery Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex justify-between items-center py-2 border-b border-white dark:border-slate-800">
                    <span className="text-sm font-semibold">Active Sessions</span>
                    <span className="font-black text-blue-600">412</span>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-white dark:border-slate-800">
                    <span className="text-sm font-semibold">Queue Health</span>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">OPTIMAL</Badge>
                 </div>
              </CardContent>
           </Card>

           <Card className="border-0 shadow-lg bg-orange-600 text-white">
              <CardContent className="p-6">
                 <h4 className="font-black text-lg">Platform Tips</h4>
                 <p className="text-sm mt-2 opacity-80 leading-relaxed font-medium">Use segmented targets to avoid delivery fatigue. Excessive global broadcasts may lead to users muting platform notifications.</p>
              </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
}
