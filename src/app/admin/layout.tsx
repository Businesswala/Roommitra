"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  LayoutDashboard, Users, House, CheckSquare, 
  CreditCard, Coffee, Tag, Bell, MessageSquare, Settings, LogOut, Search
} from "lucide-react";

const ADMIN_NAVIGATION = [
  { group: "Overview", items: [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  ]},
  { group: "Management", items: [
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Properties", href: "/admin/properties", icon: House },
    { name: "Bookings", href: "/admin/bookings", icon: CheckSquare },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Services", href: "/admin/services", icon: Coffee },
  ]},
  { group: "Marketing & Comms", items: [
    { name: "Offers & Banners", href: "/admin/offers", icon: Tag },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
    { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  ]},
  { group: "System", items: [
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]}
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row font-sans">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex-shrink-0 flex flex-col sticky top-0 h-screen overflow-y-auto">
        
        {/* Brand Target */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <Link href="/admin/dashboard" className="text-2xl font-black tracking-tight">
            <span className="text-blue-600 dark:text-blue-500">Room</span>
            <span className="text-orange-500">mitra</span>
            <span className="text-xs ml-2 text-slate-400 font-bold uppercase tracking-widest block -mt-1 leading-none">Super Admin</span>
          </Link>
        </div>

        {/* Dynamic Mapping List */}
        <div className="flex-1 py-6 px-4 space-y-8">
          {ADMIN_NAVIGATION.map((section, idx) => (
            <div key={idx}>
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-2">
                {section.group}
              </h4>
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        isActive 
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" 
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                      }`}
                    >
                      <item.icon size={18} className={isActive ? "text-blue-600 dark:text-blue-400" : "opacity-70"} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
        
        {/* Account Dump Bottom */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4">
           <Link href="/" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
              <LogOut size={16} /> Exit CMS Context
           </Link>
        </div>
      </aside>

      {/* 2. Main Content Wrapper */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Search & Profile Bar Native Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10 shadow-sm shadow-slate-100/50 dark:shadow-none">
          
          {/* Universal Native Command Palette Mock */}
          <div className="relative w-full max-w-sm hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              placeholder="Search users, bookings, properties..."
              className="w-full pl-10 pr-4 h-10 bg-slate-100 dark:bg-slate-950 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-500 transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <ThemeToggle />
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                 <div className="text-sm font-bold text-slate-900 dark:text-white leading-none">System Admin</div>
                 <div className="text-xs text-green-500 font-semibold mt-1">Authorized</div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://ui-avatars.com/api/?name=Admin&background=1e293b&color=fff" alt="Admin" className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-800" />
            </div>
          </div>
        </header>

        {/* Global Page Interjector Bounds */}
        <div className="flex-1 overflow-x-hidden p-6 md:p-8 relative">
          {children}
        </div>
      </main>

    </div>
  );
}
