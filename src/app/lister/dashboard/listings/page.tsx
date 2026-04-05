import { getListerListings } from "@/app/actions/listing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  ExternalLink,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Building2
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function ListingsPage() {
  const { data: listings, error } = await getListerListings();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1 flex items-center gap-1.5"><CheckCircle2 size={12} /> Live</Badge>;
      case "PENDING":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none px-3 py-1 flex items-center gap-1.5"><Clock size={12} /> Pending</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none px-3 py-1 flex items-center gap-1.5"><XCircle size={12} /> Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Active Deployments</h1>
          <p className="text-slate-500 mt-1">Manage and track your hyperlocal property listings.</p>
        </div>
        <Link href="/listing/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95">
            <Plus className="mr-2 h-5 w-5" /> New Listing
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="p-8 bg-red-50 dark:bg-red-950/20 rounded-3xl border border-red-200 dark:border-red-900">
           <p className="text-red-600 dark:text-red-400 font-bold flex items-center gap-2">
             <XCircle size={20} /> Error: {error}
           </p>
        </div>
      ) : !listings || listings.length === 0 ? (
        <div className="p-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] text-center bg-slate-50/50 dark:bg-slate-950/20">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No listings found</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-8">You haven't posted any properties yet. Start your marketplace journey by creating your first listing.</p>
          <Link href="/listing/new">
            <Button variant="outline" className="font-bold rounded-xl border-slate-300">Create First Listing</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {listings.map((listing) => (
            <div key={listing.id} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center p-5 gap-6">
                 {/* Thumbnail placeholder */}
                 <div className="w-full md:w-40 h-32 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shrink-0 relative">
                   <img 
                    src={JSON.parse(listing.images || "[]")[0] || "https://images.unsplash.com/photo-1598928506311-c55dd1b311fc?w=400"} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                   />
                   <div className="absolute top-2 left-2">
                     {getStatusBadge(listing.status)}
                   </div>
                 </div>

                 <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-md">{listing.type}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Created {format(new Date(listing.createdAt), 'MMM dd, yyyy')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate mb-1.5">{listing.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5"><MapPin size={14} className="text-blue-500" /> {listing.address || "No Address"}</div>
                      <div className="font-black text-slate-900 dark:text-slate-100">₹{listing.price.toLocaleString('en-IN')} /mo</div>
                    </div>
                 </div>

                 <div className="flex items-center gap-2 md:border-l border-slate-100 dark:border-slate-800 md:pl-6">
                    <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-blue-600 transition-colors">
                      <ExternalLink size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                      <MoreHorizontal size={20} />
                    </Button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
