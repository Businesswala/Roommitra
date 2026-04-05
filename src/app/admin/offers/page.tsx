"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tag, Plus, Calendar, Percent, Trash2, ArrowRight } from "lucide-react";
import { manageOffer } from "@/app/actions/admin";
import { toast } from "sonner";
import { format } from "date-fns";

export default function OffersPage() {
  const [loading, setLoading] = useState(false);
  const [newOffer, setNewOffer] = useState({
    title: "",
    type: "BANNER",
    discountPct: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    status: "ACTIVE"
  });

  const handleCreateOffer = async () => {
    if (!newOffer.title) {
       toast.error("Please provide a title for the offer.");
       return;
    }
    setLoading(true);
    const result = await manageOffer({
       ...newOffer,
       startDate: new Date(newOffer.startDate),
       endDate: new Date(newOffer.endDate),
    });
    setLoading(false);

    if (!result.error) {
       toast.success("Offer successfully created!");
    } else {
       toast.error("Failed to create offer: " + result.error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Promotion Center</h1>
          <p className="text-slate-500 mt-2 font-medium">Create and manage platform-level discounts and marketing banners.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Creation Command Center */}
        <div className="lg:col-span-1 space-y-6">
           <Card className="border-0 shadow-xl bg-white dark:bg-slate-900 overflow-hidden ring-1 ring-slate-100 dark:ring-slate-800">
              <CardHeader className="bg-blue-600 text-white pb-6">
                 <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Promotion
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Campaign Title</label>
                    <Input 
                      value={newOffer.title}
                      onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                      placeholder="e.g. Monsoon Dhamaka" 
                      className="rounded-xl h-11 bg-slate-50 dark:bg-slate-950 border-0 font-bold" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Discount Percentage</label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        type="number"
                        value={newOffer.discountPct}
                        onChange={(e) => setNewOffer({...newOffer, discountPct: Number(e.target.value)})}
                        className="rounded-xl h-11 pl-10 bg-slate-50 dark:bg-slate-950 border-0 font-bold" 
                      />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Expiry Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        type="date"
                        value={newOffer.endDate}
                        onChange={(e) => setNewOffer({...newOffer, endDate: e.target.value})}
                        className="rounded-xl h-11 pl-10 bg-slate-50 dark:bg-slate-950 border-0 font-bold" 
                      />
                    </div>
                 </div>

                 <Button 
                    onClick={handleCreateOffer}
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                 >
                    {loading ? "Scheduling..." : "Launch Campaign"}
                 </Button>
              </CardContent>
           </Card>

           <div className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
              <h4 className="font-black text-xs text-orange-600 flex items-center gap-2 uppercase tracking-widest mb-2">
                 <Tag className="h-4 w-4" />
                 Lister Subsidies
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                 Promotions are platform-subsidized by default unless specified in the Lister Agreement. Ensure the Net Payout calculation is verified for active campaigns.
              </p>
           </div>
        </div>

        {/* Active Grid Monitor */}
        <div className="lg:col-span-3 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Manual Mock of an existing offer */}
              <Card className="border-0 shadow-lg relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[50px] -z-10 bg-gradient-to-br from-green-500/20 to-transparent"></div>
                 <CardHeader className="pb-3">
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600">
                        <Tag className="h-6 w-6" />
                      </div>
                      <Badge className="bg-emerald-500 text-white border-0 font-black tracking-widest uppercase text-[10px]">active</Badge>
                   </div>
                   <CardTitle className="text-xl font-bold tracking-tight">Summer Kickoff Sale</CardTitle>
                   <CardDescription className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Ends: August 15, 2026
                   </CardDescription>
                 </CardHeader>
                 <CardContent>
                    <div className="flex items-center justify-between mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                       <div className="text-center flex-1">
                          <p className="text-[10px] font-black uppercase text-slate-400">Discount</p>
                          <p className="text-2xl font-black text-blue-600">50%</p>
                       </div>
                       <div className="w-px h-10 bg-slate-200 dark:border-slate-800"></div>
                       <div className="text-center flex-1">
                          <p className="text-[10px] font-black uppercase text-slate-400">Claims</p>
                          <p className="text-2xl font-black text-slate-900 dark:text-white">1,240</p>
                       </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                       <Button variant="ghost" size="sm" className="flex-1 rounded-lg font-bold text-slate-500 hover:text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4 mr-2" /> Deactivate
                       </Button>
                       <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-lg text-slate-400 hover:text-blue-600 border border-slate-100 dark:border-slate-800">
                          <ArrowRight className="h-4 w-4" />
                       </Button>
                    </div>
                 </CardContent>
              </Card>

              {/* Placeholder for no more results */}
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl opacity-50">
                 <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4">
                    <Percent className="h-8 w-8 text-slate-300" />
                 </div>
                 <h4 className="font-bold text-slate-400 italic text-sm">No other scheduled campaigns</h4>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
}
