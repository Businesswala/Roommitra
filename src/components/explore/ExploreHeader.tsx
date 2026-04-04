"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function ExploreHeader({ onMobileFilterClick }: { onMobileFilterClick: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="font-black flex items-center gap-1 shrink-0">
          <span className="text-blue-600 dark:text-blue-500 text-xl">Room</span>
          <span className="text-orange-500 text-xl hidden sm:inline">mitra</span>
        </div>

        {/* Global Compact Search */}
        <div className="flex-1 max-w-xl relative flex items-center shadow-sm rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-800">
          <div className="pl-4 pr-2 text-slate-400">
            <MapPin size={18} />
          </div>
          <Input 
            type="text" 
            placeholder="Search by city, area, or zip code..." 
            className="border-none bg-transparent shadow-none focus-visible:ring-0 px-0 placeholder:text-slate-400"
          />
          <Button size="icon" className="h-full rounded-none px-4 bg-blue-600 hover:bg-blue-700 text-white shrink-0 transition-colors">
            <Search size={18} />
          </Button>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onMobileFilterClick}
            className="md:hidden border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
          >
            <SlidersHorizontal size={18} />
          </Button>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
