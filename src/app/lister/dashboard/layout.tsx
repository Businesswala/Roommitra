"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  List, 
  PlusCircle, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu,
  X
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { label: "Overview", href: "/lister/dashboard", icon: LayoutDashboard },
  { label: "My Listings", href: "/lister/dashboard/listings", icon: List },
  { label: "Add New Listing", href: "/lister/dashboard/add", icon: PlusCircle },
  { label: "Chats", href: "/lister/dashboard/chats", icon: MessageSquare },
  { label: "Settings", href: "/lister/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 h-screen transition-all duration-300">
        <div className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center px-6">
          <div className="font-black text-xl flex items-center gap-1">
            <span className="text-blue-600 dark:text-blue-500">Room</span>
            <span className="text-orange-500">mitra</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group ${
                isActive(item.href)
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive(item.href) ? "text-blue-600 dark:text-blue-400" : "text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"}`} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <ThemeToggle />
          <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-slate-600 hover:text-red-500 hover:bg-red-50 dark:text-slate-400 dark:hover:bg-red-900/20">
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="font-black text-xl flex items-center gap-1">
          <span className="text-blue-600 dark:text-blue-500">Room</span>
          <span className="text-orange-500">mitra</span>
        </div>
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            }
          />
          <SheetContent side="left" className="w-72 p-0 bg-white dark:bg-slate-900 border-r-slate-200 dark:border-r-slate-800">
            <div className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center px-6">
              <div className="font-black text-xl flex items-center gap-1">
                <span className="text-blue-600 dark:text-blue-500">Room</span>
                <span className="text-orange-500">mitra</span>
              </div>
            </div>
            <nav className="p-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-0 w-full p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <ThemeToggle />
              <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-slate-600 hover:text-red-500 hover:bg-red-50 dark:text-slate-400 dark:hover:bg-red-900/20">
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
