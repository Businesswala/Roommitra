import { getAllListings, updateListingStatus } from "@/app/actions/admin";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, MapPin, Eye, Home, Building, Utensils, WashingMachine } from "lucide-react";
import { format } from "date-fns";

export default async function PropertyManagement() {
  const result = await getAllListings();
  const listings = result.data || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Asset Governance</h1>
        <p className="text-slate-500 mt-1 font-medium font-mono text-xs uppercase tracking-widest bg-slate-100 dark:bg-slate-900 w-fit px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
           Verified listings moderation and asset lifecycle.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-950/50">
              <TableRow className="border-b border-slate-200 dark:border-slate-800 hover:bg-transparent">
                <TableHead className="font-black text-slate-500 py-6 px-8 w-[400px]">Asset Profile</TableHead>
                <TableHead className="font-black text-slate-500 py-6 px-8 text-right">Pricing</TableHead>
                <TableHead className="font-black text-slate-500 py-6 px-8 text-center">Status</TableHead>
                <TableHead className="font-black text-slate-500 py-6 px-8 text-right px-10">Moderation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-slate-500 font-medium italic">No physical assets detected on the platform grid.</TableCell>
                </TableRow>
              ) : (
                listings.map((listing: any) => {
                  const images = JSON.parse(listing.images || "[]");
                  const thumbnail = images[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop";
                  
                  return (
                    <TableRow key={listing.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group">
                      <TableCell className="py-6 px-8">
                        <div className="flex items-center gap-6">
                           <div className="relative shrink-0 overflow-hidden rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={thumbnail} alt="Listing" className="w-24 h-16 object-cover group-hover:scale-110 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                              <div className="absolute bottom-1 left-2">
                                <Badge variant="outline" className="bg-white/90 text-slate-900 border-0 text-[8px] h-4 font-black p-1 shadow-sm uppercase tracking-tighter">
                                   {listing.type}
                                </Badge>
                              </div>
                           </div>
                           <div className="min-w-0">
                             <h3 className="font-black text-slate-900 dark:text-white truncate text-base tracking-tight mb-1" title={listing.title}>{listing.title}</h3>
                             <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-400">
                                <span className="flex items-center gap-1 text-red-500/80"><MapPin size={10} strokeWidth={3} /> {listing.address || "Location TBD"}</span>
                                <span className="h-3 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></span>
                                <span className="text-slate-500 dark:text-slate-400">By: <span className="font-black text-blue-600 dark:text-blue-500">{listing.lister?.name}</span></span>
                             </div>
                           </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 px-8 text-right">
                         <div className="text-lg font-black text-slate-900 dark:text-white leading-none">₹{listing.price.toLocaleString()}</div>
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">Platform Base Unit</div>
                      </TableCell>
                      <TableCell className="py-6 px-8 text-center">
                         <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${
                           listing.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.3)]' :
                           listing.status === 'REJECTED' ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 shadow-[inset_0_0_0_1px_rgba(239,68,68,0.3)]' :
                           'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 animate-pulse'
                         }`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${listing.status === 'APPROVED' ? 'bg-emerald-500' : listing.status === 'REJECTED' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                           {listing.status}
                         </span>
                      </TableCell>
                      <TableCell className="py-6 px-8 text-right">
                         <form action={async (formData) => {
                            'use server'
                            const action = formData.get('action') as string;
                            await updateListingStatus(listing.id, action);
                         }} className="flex items-center justify-end gap-2">
                           <Button name="action" value="APPROVED" disabled={listing.status === 'APPROVED'} className="h-10 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                              Approve
                           </Button>
                           <Button name="action" value="REJECTED" disabled={listing.status === 'REJECTED'} variant="outline" className="h-10 px-4 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20 font-black uppercase text-[10px] tracking-widest rounded-xl transition-all">
                              Reject
                           </Button>
                           <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-xl">
                              <Eye size={18} />
                           </Button>
                         </form>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
