"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ListingCard, ListingItem } from "@/components/explore/ListingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Heart, MessageSquare, Settings, LogOut, CheckCircle2, ShieldAlert } from "lucide-react";
import { Wifi, Snowflake, Tv } from "lucide-react";

// Mock Data for tracking "Favorited / Saved" items
const savedItems: ListingItem[] = [
  { id: "1", category: "Rooms", title: "Luxury Studio Suite in Indiranagar", price: 21000, rating: 4.8, reviews: 124, distance: "1.2 km", featured: true, images: ["https://images.unsplash.com/photo-1598928506311-c55dd1b311fc?auto=format&fit=crop&w=400"], amenities: [<Wifi key="w" size={16}/>, <Snowflake key="s" size={16}/>, <Tv key="t" size={16}/>] },
  { id: "6", category: "Roommate", title: "Looking for flatmate - 3BHK", price: 14000, rating: 4.7, reviews: 12, distance: "2.8 km", featured: true, images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400"], amenities: [<Wifi key="w" size={16}/>, <Snowflake key="s" size={16}/>] }
];

export default function SeekerDashboard() {
  const [activeTab, setActiveTab] = useState<"saved" | "inquiries" | "chats" | "settings">("saved");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0 flex flex-col">
         <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 justify-between">
           <Link href="/explore" className="font-black text-xl flex items-center gap-1">
              <span className="text-blue-600 dark:text-blue-500">Room</span>
              <span className="text-orange-500">mitra</span>
           </Link>
           <ThemeToggle />
         </div>
         
         <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-500 dark:text-orange-400">
                  <User size={24} />
               </div>
               <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">John Seeker</h3>
                  <p className="text-xs text-slate-500">Standard User Portal</p>
               </div>
            </div>

            <nav className="space-y-2">
               <button 
                 onClick={() => setActiveTab("saved")}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'saved' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'}`}
               >
                 <Heart size={18} className={activeTab === 'saved' ? 'fill-blue-200 dark:fill-blue-900' : ''} /> Saved Properties
               </button>
               <button 
                 onClick={() => setActiveTab("inquiries")}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'inquiries' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'}`}
               >
                 <MessageSquare size={18} /> Active Inquiries
               </button>
               <button 
                 onClick={() => setActiveTab("chats")}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'chats' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'}`}
               >
                 <MessageSquare size={18} /> Chat Messages
               </button>
               <button 
                 onClick={() => setActiveTab("settings")}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'}`}
               >
                 <Settings size={18} /> Account Settings
               </button>
            </nav>

            <div className="mt-auto pt-8">
               <Link href="/">
                 <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-500 hover:text-red-500 hover:bg-red-50 dark:text-slate-500 dark:hover:text-red-400 dark:hover:bg-red-950/30 transition-colors">
                   <LogOut size={18} /> Sign Out
                 </button>
               </Link>
            </div>
         </div>
      </aside>

      {/* Primary State Container */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
         
         {activeTab === "saved" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Your Saved Collection</h1>
                  <p className="text-slate-500 mt-2">Track pricing changes or directly contact the Lister before they sell out.</p>
               </div>
               
               {savedItems.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedItems.map(item => (
                       <Link key={item.id} href={`/listing/${item.id}`} className="block">
                         <ListingCard data={item} />
                       </Link>
                    ))}
                 </div>
               ) : (
                 <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-20 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900 w-full col-span-full">
                    <Heart size={48} className="text-slate-300 dark:text-slate-700 mb-4" />
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No properties favorited yet!</h3>
                    <p className="text-slate-500 max-w-sm mb-6">Explore the marketplace and click the heart icon on any grid property to trace it back here safely.</p>
                    <Link href="/explore">
                       <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20">Return to Grid Scanner</Button>
                    </Link>
                 </div>
               )}
            </div>
         )}

         {activeTab === "inquiries" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Active Inquiries</h1>
                  <p className="text-slate-500 mt-2">Review pending lead contacts sent to verification systems.</p>
               </div>
               
               <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900 relative overflow-hidden">
                  <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
                  <ShieldAlert size={48} className="text-slate-300 dark:text-slate-700 mb-4 z-10" />
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 z-10">No pending communication loops</h3>
                  <p className="text-slate-500 max-w-md z-10 mb-6">If you utilize the "Direct Contact Lister" modal on the individual property page, the status tracker will securely appear here.</p>
                  <Link href="/explore">
                     <Button variant="outline" className="border-slate-200 dark:border-slate-800 rounded-xl z-10 relative">Deploy Grid Search</Button>
                  </Link>
               </div>
            </div>
         )}

         {activeTab === "settings" && (
            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Account Parameters</h1>
                  <p className="text-slate-500 mt-2">Manage physical security constraints scaling your consumer perimeter.</p>
               </div>

               <div className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="space-y-4">
                     <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                       <CheckCircle2 size={18} className="text-green-500"/> Verified Status Target
                     </h3>
                     <p className="text-sm text-slate-500">You are currently operating as a Standard Seeker. If you wish to migrate and deploy supply directly to the network, upgrade the perimeter below.</p>
                     <Link href="/lister/register">
                        <Button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-500/20">Upgrade Access & Become a Lister</Button>
                     </Link>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-800" />

                  <div className="space-y-4">
                     <div className="space-y-2">
                        <Label>Display Name Array</Label>
                        <Input defaultValue="John Seeker" className="bg-slate-50 dark:bg-slate-950" />
                     </div>
                     <div className="space-y-2">
                        <Label>Secure Mobile Metric</Label>
                        <Input defaultValue="+91 8888 777 666" type="tel" className="bg-slate-50 dark:bg-slate-950" />
                     </div>
                     <div className="space-y-2">
                        <Label>Override Password State</Label>
                        <Input type="password" placeholder="••••••••••" className="bg-slate-50 dark:bg-slate-950" />
                     </div>
                     <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold h-12 shadow-xl shadow-blue-500/20 mt-4">Execute Local Save</Button>
                  </div>
               </div>
            </div>
         )}

      </main>
    </div>
  );
}
