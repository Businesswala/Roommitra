"use client";

import { useEffect, useState } from "react";
import { getPendingListings, updateListingStatus } from "@/app/actions/listing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShieldCheck, 
  XCircle, 
  CheckCircle2, 
  MapPin, 
  User, 
  Clock, 
  Eye,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function ApprovalsPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    setLoading(true);
    const { data, error } = await getPendingListings();
    if (error) toast.error(error);
    else setListings(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
    const { error } = await updateListingStatus(id, status);
    if (error) {
      toast.error(error);
    } else {
      toast.success(`Listing ${status.toLowerCase()} successfully!`);
      // Update local state to remove processed item
      setListings(prev => prev.filter(l => l.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={32} />
            Moderation Matrix
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Govern and verify incoming physical assets for the hyperlocal network.</p>
        </div>
        <div className="bg-blue-600/10 text-blue-600 px-4 py-2 rounded-xl border border-blue-600/20 text-sm font-bold flex items-center gap-2">
          <Clock size={16} /> {listings.length} Pending Actions
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="p-32 text-center bg-slate-50/50 dark:bg-slate-950/20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
           <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle2 size={40} />
           </div>
           <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Queue is Empty</h3>
           <p className="text-slate-500 font-medium">All deployments are currently synced and verified.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="h-48 bg-slate-100 dark:bg-slate-800 relative">
                   <img 
                    src={JSON.parse(listing.images || "[]")[0] || "https://images.unsplash.com/photo-1598928506311-c55dd1b311fc?w=600"} 
                    className="w-full h-full object-cover"
                   />
                   <Badge className="absolute top-4 right-4 bg-orange-500 text-white border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">
                      Manual Review
                   </Badge>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                      {listing.type}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      Received {format(new Date(listing.createdAt), 'h:mm a, MMM dd')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                    {listing.title}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      <MapPin size={14} className="text-blue-500" /> {listing.address}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                      <User size={14} className="text-purple-500" /> {listing.lister?.name} ({listing.lister?.businessName || "Individual"})
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleAction(listing.id, "APPROVED")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl h-11 transition-all active:scale-95"
                    >
                      <CheckCircle2 size={18} className="mr-2" /> Approve
                    </Button>
                    <Button 
                      onClick={() => handleAction(listing.id, "REJECTED")}
                      variant="outline"
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 dark:border-red-900 font-bold rounded-xl h-11 transition-all active:scale-95"
                    >
                      <XCircle size={18} className="mr-2" /> Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
