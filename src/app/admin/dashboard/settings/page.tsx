import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ShieldCheck, Percent, Map, Bell, Globe, Zap, Save, RefreshCcw } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Platform Settings</h1>
          <p className="text-slate-500 mt-1 font-medium">Fine-tune the Roommitra engine and global parameters.</p>
        </div>
        <Button className="rounded-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 gap-2">
          <Save size={18} /> Sync Configuration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Core Economics */}
        <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="bg-emerald-50/50 dark:bg-emerald-900/10 border-b border-emerald-100 dark:border-emerald-800/40 p-6">
            <CardTitle className="text-xl font-black flex items-center gap-2 text-emerald-600">
              <Percent size={24} /> Platform Economics
            </CardTitle>
            <CardDescription>Control service fees, service taxes, and transaction limits.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fee" className="font-bold text-slate-700 dark:text-slate-300">Default Service Fee (%)</Label>
              <div className="relative">
                <Percent className="absolute left-3 top-3.5 text-slate-400" size={16} />
                <Input id="fee" defaultValue="8.5" className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800 shadow-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax" className="font-bold text-slate-700 dark:text-slate-300">GST/Tax Rate (%)</Label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-3.5 text-slate-400" size={16} />
                <Input id="tax" defaultValue="18" className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800 shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="space-y-0.5">
                <Label className="font-bold text-slate-900 dark:text-white">Auto-Payouts</Label>
                <div className="text-xs text-slate-500">Enable automatic lister transfers.</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Search & Discovery */}
        <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="bg-blue-50/50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-800/40 p-6">
            <CardTitle className="text-xl font-black flex items-center gap-2 text-blue-600">
              <Map size={24} /> Search Intelligence
            </CardTitle>
            <CardDescription>Adjust radius limits and discovery algorithm weights.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="radius" className="font-bold text-slate-700 dark:text-slate-300">Global Search Radius (KM)</Label>
              <div className="relative">
                <Map className="absolute left-3 top-3.5 text-slate-400" size={16} />
                <Input id="radius" defaultValue="15" className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800 shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="space-y-0.5">
                <Label className="font-bold text-slate-900 dark:text-white">Live Availability Check</Label>
                <div className="text-xs text-slate-500">Verify property status on every search.</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="space-y-0.5">
                <Label className="font-bold text-slate-900 dark:text-white">High Priority Mock-ups</Label>
                <div className="text-xs text-slate-500">Boost new properties in rankings.</div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Global Security */}
        <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="bg-purple-50/50 dark:bg-purple-900/10 border-b border-purple-100 dark:border-purple-800/40 p-6">
            <CardTitle className="text-xl font-black flex items-center gap-2 text-purple-600">
              <ShieldCheck size={24} /> Safety & Security
            </CardTitle>
            <CardDescription>Configure KYC requirements and automated moderation.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="space-y-0.5">
                <Label className="font-bold text-slate-900 dark:text-white">Mandatory PAN/Aadhar</Label>
                <div className="text-xs text-slate-500">Require KYC before property deployment.</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="space-y-0.5">
                <Label className="font-bold text-slate-900 dark:text-white">Auto-Approve Listings</Label>
                <div className="text-xs text-slate-500 text-rose-500 font-bold">⚠️ Dangerous: Bypasses moderation queue.</div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* System Monitoring */}
        <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-3xl overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800/40 p-6">
            <CardTitle className="text-xl font-black flex items-center gap-2 text-slate-600">
              <Zap size={24} /> System Health
            </CardTitle>
            <CardDescription>Infrastructure monitoring and cache management.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <Button variant="outline" className="w-full rounded-2xl font-black h-16 gap-4 text-blue-600 border-blue-100 hover:bg-blue-50 transition-all shadow-lg shadow-blue-500/5">
              <RefreshCcw size={20} /> Purge Global CDN Cache
            </Button>
            <Button variant="outline" className="w-full rounded-2xl font-black h-16 gap-4 text-orange-600 border-orange-100 hover:bg-orange-50 transition-all shadow-lg shadow-orange-500/5">
              <RefreshCcw size={20} /> Synchronize Cloudinary Assets
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
