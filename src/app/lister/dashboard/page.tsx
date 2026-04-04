"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { PlusCircle, Home, LogOut, Wallet, MessageSquare, BookOpenCheck } from "lucide-react";
// import { useSession } from "next-auth/react"; // Assuming we will use this when fully wired

export default function ListerDashboard() {
  // const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<"listings" | "bookings" | "earnings" | "chats">("listings");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
        <div className="font-black text-xl flex items-center gap-1">
          <span className="text-blue-600 dark:text-blue-500">Room</span>
          <span className="text-orange-500">mitra</span>
          <span className="hidden md:inline ml-2 text-slate-300 dark:text-slate-700">|</span>
          <span className="hidden md:inline ml-2 text-sm font-semibold text-slate-500">Lister Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Welcome, Owner</span>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500">
             <LogOut size={20} />
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0 flex flex-col p-6">
           <nav className="space-y-2">
               <button 
                 onClick={() => setActiveTab("listings")}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'listings' ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'}`}
               >
                 <Home size={18} /> My Properties
               </button>
               <button 
                 onClick={() => setActiveTab("bookings")}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'bookings' ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'}`}
               >
                 <BookOpenCheck size={18} /> Bookings
               </button>
               <button 
                 onClick={() => setActiveTab("earnings")}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'earnings' ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'}`}
               >
                 <Wallet size={18} /> Earnings Tracker
               </button>
               <button 
                 onClick={() => setActiveTab("chats")}
                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'chats' ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'}`}
               >
                 <MessageSquare size={18} /> Direct Chats
               </button>
            </nav>
        </aside>

        {/* Dynamic Panel */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto animate-in fade-in slide-in-from-bottom-4">
          
          {activeTab === "listings" && (
            <>
              <div className="flex items-center justify-between mb-10">
                 <div>
                   <h1 className="text-3xl font-black text-slate-900 dark:text-white">Active Listings Grid</h1>
                   <p className="text-slate-500 mt-1">Manage and deploy your properties heavily verified by Roommitra.</p>
                 </div>
                 <Link href="/lister/new-listing">
                   <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 rounded-xl h-12 px-6 shadow-lg shadow-orange-500/20 font-semibold">
                     <PlusCircle size={20} />
                     Create New Listing
                   </Button>
                 </Link>
              </div>

              {/* Empty State Metric */}
              <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-dashed rounded-3xl p-20 flex flex-col items-center justify-center text-center shadow-sm">
                 <Home className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-6" />
                 <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">You haven't posted any listings yet.</h3>
                 <p className="text-slate-500 max-w-md">Your account is fully verified and ready. Start adding your rooms, PG accommodations, or tiffin services to reach our hyperlocal network.</p>
              </div>
            </>
          )}

          {activeTab === "bookings" && (
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Booking Management</h1>
              <div className="grid gap-4">
                 <div className="p-6 bg-white dark:bg-slate-900 border rounded-2xl flex justify-between items-center shadow-sm text-center">
                    <p className="w-full text-slate-500">No active bookings to approve currently.</p>
                 </div>
              </div>
            </div>
          )}

          {activeTab === "earnings" && (
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Earnings Tracking</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <div className="p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-3xl">
                    <p className="text-green-600 dark:text-green-500 font-medium mb-2">Total Revenue</p>
                    <h2 className="text-4xl font-bold text-green-700 dark:text-green-400">₹0.00</h2>
                 </div>
                 <div className="p-6 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 rounded-3xl">
                    <p className="text-orange-600 dark:text-orange-500 font-medium mb-2">Platform Deductions</p>
                    <h2 className="text-4xl font-bold text-orange-700 dark:text-orange-400">₹0.00</h2>
                 </div>
                 <div className="p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-3xl">
                    <p className="text-blue-600 dark:text-blue-500 font-medium mb-2">Net Withdrawal</p>
                    <h2 className="text-4xl font-bold text-blue-700 dark:text-blue-400">₹0.00</h2>
                 </div>
              </div>
            </div>
          )}

          {activeTab === "chats" && (
            <div className="h-full flex flex-col">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Inbox</h1>
              <div className="flex-1 border rounded-3xl bg-white dark:bg-slate-900 overflow-hidden flex shadow-sm min-h-[500px]">
                 <div className="w-1/3 border-r p-4 bg-muted/20">
                    <p className="text-slate-500 text-sm mb-4">Recent Conversations</p>
                    <div className="p-3 bg-secondary rounded-xl cursor-not-allowed opacity-50 text-center text-sm border border-dashed">
                      Pending Chat Service initialization
                    </div>
                 </div>
                 <div className="w-2/3 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
                    <p className="text-muted-foreground text-sm flex flex-col items-center gap-2">
                       <MessageSquare className="h-8 w-8 opacity-20" />
                       Select a conversation to reply
                    </p>
                 </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
