"use client"

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ListingCard } from "@/components/explore/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  User, Heart, MessageSquare, Settings, LogOut, CheckCircle2, ShieldAlert, 
  Wallet, Calendar, MapPin, Search, ArrowRight 
} from "lucide-react";
import { format } from "date-fns";
import { updateProfile } from "@/app/actions/user";
import { toast } from "sonner";

interface SeekerDashboardContentProps {
  initialProfile: any;
  initialSaved: any[];
  initialBookings: any[];
}

export function SeekerDashboardContent({ initialProfile, initialSaved, initialBookings }: SeekerDashboardContentProps) {
  const [activeTab, setActiveTab] = useState<"saved" | "bookings" | "settings">("saved");
  const [profile, setProfile] = useState(initialProfile);
  const [updating, setUpdating] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    const result = await updateProfile({ name: profile.name, mobile: profile.mobile });
    setUpdating(false);
    if (!result.error) toast.success("Profile status successfully updated!");
    else toast.error(result.error);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-500">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0 flex flex-col sticky top-0 h-screen overflow-y-auto">
         <div className="h-16 flex items-center px-8 border-b border-slate-200 dark:border-slate-800 justify-between">
           <Link href="/explore" className="font-black text-2xl flex items-center gap-1">
              <span className="text-blue-600 dark:text-blue-500">Room</span>
              <span className="text-orange-500">mitra</span>
           </Link>
           <ThemeToggle />
         </div>
         
         <div className="p-8">
            <div className="flex items-center gap-4 mb-10 p-4 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-inner">
               <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20">
                  {profile.name?.[0].toUpperCase()}
               </div>
               <div className="min-w-0">
                  <h3 className="font-black text-slate-900 dark:text-white truncate">{profile.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Seeker Portal</p>
               </div>
            </div>

            <nav className="space-y-2">
               <button 
                 onClick={() => setActiveTab("saved")}
                 className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'saved' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-[1.02]' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900'}`}
               >
                 <Heart size={16} className={activeTab === 'saved' ? 'fill-white' : ''} /> Saved Properties
               </button>
               <button 
                 onClick={() => setActiveTab("bookings")}
                 className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'bookings' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-[1.02]' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900'}`}
               >
                 <Calendar size={16} /> My Bookings
               </button>
               <button 
                 onClick={() => setActiveTab("settings")}
                 className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-[1.02]' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900'}`}
               >
                 <Settings size={16} /> Parameters
               </button>
            </nav>

            <div className="mt-20 pt-8 border-t border-slate-100 dark:border-slate-800">
               <Link href="/explore">
                  <button className="w-full flex items-center justify-between px-5 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group">
                    Return to Grid <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
               </Link>
            </div>
         </div>
      </aside>

      {/* Primary State Container */}
      <main className="flex-1 p-8 md:p-12 max-w-7xl mx-auto w-full">
         
         {activeTab === "saved" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="mb-10">
                  <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Your Saved Collection</h1>
                  <p className="text-slate-500 mt-2 font-medium">Verified assets tracked from the platform grid.</p>
               </div>
               
               {initialSaved.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {initialSaved.map(item => (
                       <Link key={item.id} href={`/listing/${item.id}`} className="block transform hover:scale-[1.02] transition-transform">
                         <ListingCard data={item} />
                       </Link>
                    ))}
                 </div>
               ) : (
                 <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-[40px] p-24 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900 w-full col-span-full shadow-2xl shadow-slate-200/50 dark:shadow-none">
                    <Heart size={64} className="text-slate-100 dark:text-slate-800 mb-6" />
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Empty Grid Ledger</h3>
                    <p className="text-slate-500 max-w-sm mb-8 font-medium">The platform has not detected any saved assets in your local perimeter. Return to the explorer to begin tracking.</p>
                    <Link href="/explore">
                       <Button className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-500/30 font-black uppercase text-[10px] tracking-widest">Deploy Grid Scan</Button>
                    </Link>
                 </div>
               )}
            </div>
         )}

         {activeTab === "bookings" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="mb-10">
                  <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Reservation Matrix</h1>
                  <p className="text-slate-500 mt-2 font-medium">Track your active bookings and platform fulfillment status.</p>
               </div>
               
               {initialBookings.length > 0 ? (
                 <div className="space-y-6">
                    {initialBookings.map(booking => (
                       <div key={booking.id} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group">
                          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />
                          <div className="flex items-center gap-6">
                             <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800">
                                <Wallet className="h-8 w-8 text-blue-600" />
                             </div>
                             <div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">{booking.listing.title}</h3>
                                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                   <span className="flex items-center gap-1.5"><MapPin size={14} className="text-blue-500" /> {booking.listing.address || 'Hyperlocal'}</span>
                                   <span className="flex items-center gap-1.5"><User size={14} className="text-orange-500" /> By: {booking.listing.lister.name}</span>
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                             <Badge variant="outline" className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                               booking.status === 'CONFIRMED' ? 'bg-green-50 text-green-600 border-green-200' :
                               booking.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-200 animate-pulse' :
                               'bg-red-50 text-red-600 border-red-200'
                             }`}>
                               {booking.status}
                             </Badge>
                             <div className="text-right">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">{format(new Date(booking.date), 'MMM dd, yyyy')}</p>
                                <p className="text-lg font-black text-slate-900 dark:text-white">₹{booking.amount.toLocaleString()}</p>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
               ) : (
                 <div className="border border-slate-200 dark:border-slate-800 rounded-[40px] p-24 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900 relative overflow-hidden">
                    <ShieldAlert size={64} className="text-slate-100 dark:text-slate-800 mb-6" />
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">No Operational Records</h3>
                    <p className="text-slate-500 max-w-sm mb-8 font-medium">Platform ledgers detected zero bookings under your current identity matrix.</p>
                 </div>
               )}
            </div>
         )}

         {activeTab === "settings" && (
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="mb-10">
                  <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Identity Settings</h1>
                  <p className="text-slate-500 mt-2 font-medium">Manage the parameters defining your platform footprint.</p>
               </div>

               <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-12">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-3xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                     <div className="space-y-2">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                          <CheckCircle2 size={24} className="text-blue-600"/> Native Seeker Verified
                        </h3>
                        <p className="text-sm text-slate-500 font-medium max-w-sm leading-relaxed">Upgrade your operational role to become a Lister and deploy supply to the Roommitra grid.</p>
                     </div>
                     <Link href="/lister/register">
                        <Button className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl shadow-xl shadow-orange-500/30 font-black uppercase text-[10px] tracking-widest">Become a Provider</Button>
                     </Link>
                  </div>

                  <form onSubmit={handleUpdateProfile} className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Identity Identifier</Label>
                           <Input 
                             value={profile.name}
                             onChange={(e) => setProfile({...profile, name: e.target.value})}
                             className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-0 focus-visible:ring-2 focus-visible:ring-blue-600 font-bold" 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Access Channel (Email)</Label>
                           <Input disabled value={profile.email} className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-0 opacity-50 font-bold" />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Mobile Matrix</Label>
                           <Input 
                             value={profile.mobile}
                             onChange={(e) => setProfile({...profile, mobile: e.target.value})}
                             className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-0 focus-visible:ring-2 focus-visible:ring-blue-600 font-bold" 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Created Sequence</Label>
                           <Input disabled value={format(new Date(profile.createdAt), 'MMM dd, yyyy')} className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-0 opacity-50 font-bold" />
                        </div>
                     </div>
                     <Button disabled={updating} className="w-full h-16 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-2xl active:scale-[0.98]">
                        {updating ? "Processing Meta-Update..." : "Execute Parameter Save"}
                     </Button>
                  </form>
               </div>
            </div>
         )}

      </main>
    </div>
  );
}
