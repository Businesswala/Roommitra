import { getPlatformServices } from "@/app/actions/admin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { LayoutGrid, Plus, Info, Settings2, ShieldCheck, Zap } from "lucide-react";

export default async function ServiceManagementPage() {
  const servicesData = await getPlatformServices();
  const services = servicesData.data || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Service Center</h1>
          <p className="text-slate-500 mt-2 font-medium">Activate and manage official Roommitra premium value-added services.</p>
        </div>
        <Button className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2 shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
          <Plus className="h-5 w-5" />
          Create New Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 && (
          <div className="col-span-full py-20 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
             <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="h-8 w-8 text-slate-400" />
             </div>
             <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tighter">No Active Services</h3>
             <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">Platform services like Verification or Featured Listing boosts will appear here.</p>
          </div>
        )}

        {services.map((service: any) => (
          <Card key={service.id} className="border-0 shadow-lg group hover:shadow-xl transition-all relative overflow-hidden bg-white dark:bg-slate-900">
             <div className="absolute top-0 left-0 w-2 h-full bg-blue-500 group-hover:w-3 transition-all" />
             <CardHeader className="pl-8 pb-3">
               <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-4 ring-1 ring-blue-100 dark:ring-blue-800">
                    {service.name.includes("Verification") ? <ShieldCheck className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
                  </div>
                  <Badge variant={service.status === "ACTIVE" ? "outline" : "secondary"} className="bg-green-50 text-green-600 border-green-100 uppercase text-[10px] font-black tracking-widest">
                    {service.status}
                  </Badge>
               </div>
               <CardTitle className="text-xl font-bold dark:text-white tracking-tight">{service.name}</CardTitle>
               <CardDescription className="line-clamp-2 min-h-[40px] text-xs font-medium">{service.description}</CardDescription>
             </CardHeader>
             <CardContent className="pl-8">
                <div className="flex items-center justify-between py-4 border-t border-slate-50 dark:border-slate-800">
                   <div className="text-2xl font-black text-blue-600">₹{service.price}</div>
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] uppercase font-black text-slate-400">Public Status</span>
                     <Switch checked={service.status === "ACTIVE"} />
                   </div>
                </div>
                <div className="flex gap-2">
                   <Button variant="ghost" size="sm" className="flex-1 rounded-lg h-10 gap-2 text-slate-500 hover:text-slate-900 font-bold">
                     <Settings2 className="h-4 w-4" />
                     Configure
                   </Button>
                   <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-lg text-slate-400 hover:text-blue-600 ring-1 ring-slate-100 dark:ring-slate-800">
                     <Info className="h-4 w-4" />
                   </Button>
                </div>
             </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Policy Context */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] -z-10 rounded-full"></div>
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0 shadow-inner overflow-hidden">
               <ShieldCheck className="h-8 w-8 text-blue-400" />
            </div>
            <div>
               <h3 className="text-xl font-black tracking-tight">Trust Engine & Automation</h3>
               <p className="text-slate-400 text-sm max-w-xl font-medium mt-1">
                 Services designated as mandatory (like KYC check) are executed via platform middleware. Use these toggles to temporarily suspend or enable value-added upsells for Listers.
               </p>
            </div>
         </div>
         <Button className="h-14 px-8 rounded-2xl bg-white text-slate-900 font-black hover:bg-slate-100 shadow-xl shadow-white/10 active:scale-95 transition-all whitespace-nowrap">
            Review Service Ledger
         </Button>
      </div>
    </div>
  );
}
