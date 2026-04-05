'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Home, IndianRupee } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Hero() {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState([500, 50000]);
  const [category, setCategory] = useState("ROOM");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams({
      location,
      category,
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-center py-24 lg:py-36 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 inset-x-0 h-[500px] w-full bg-gradient-to-b from-blue-50/50 dark:from-blue-950/20 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 dark:bg-blue-800/20 blur-3xl rounded-full -z-10" />
      <div className="absolute top-24 -left-24 w-72 h-72 bg-orange-400/20 dark:bg-orange-800/20 blur-3xl rounded-full -z-10" />

      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-50/50 dark:bg-orange-950/30 px-3 py-1 text-sm font-semibold text-orange-600 dark:text-orange-400 mb-6 backdrop-blur-sm">
          <span>🎉 India's #1 Hyperlocal Living Hub</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl leading-tight">
          Find your perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">space</span>.<br />
          Experience better <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">living</span>.
        </h1>
        
        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
          Verified Rooms, PGs, Tiffin services, and Laundry near you. Search hyperlocal, live comfortable.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-3 text-sm font-black text-white shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all hover:scale-105 active:scale-95"
          >
            List Your Property
          </Link>
          <Link 
            href="/login" 
            className="inline-flex items-center justify-center rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 px-8 py-3 text-sm font-black text-slate-900 dark:text-white shadow-lg transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95"
          >
            Sign In
          </Link>
        </div>

        {/* 🚀 Massive Multi-Input Search Bar */}
        <div className="mt-12 w-full max-w-4xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-3 rounded-3xl shadow-2xl shadow-blue-900/10 ring-1 ring-slate-200 dark:ring-slate-800 flex flex-col items-stretch gap-3 transition-all hover:ring-blue-500/30">
          
          <div className="flex flex-col md:flex-row gap-3">
            {/* Location Input */}
            <div className="flex items-center px-4 h-14 bg-slate-50 dark:bg-slate-950 rounded-2xl flex-1 border border-transparent focus-within:border-blue-500/50 transition-colors">
              <MapPin className="h-5 w-5 text-blue-600 mr-3 shrink-0" />
              <input 
                type="text" 
                placeholder="Where? (City or Locality)" 
                className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 h-full text-base"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Category Select */}
            <div className="w-full md:w-[220px]">
              <Select value={category} onValueChange={(val) => val && setCategory(val)}>
                <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-950 border-transparent focus:ring-blue-500/50 border-0 px-4">
                  <div className="flex items-center gap-3">
                    <Home className="h-5 w-5 text-orange-500" />
                    <SelectValue placeholder="Category" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="ROOM">Room</SelectItem>
                  <SelectItem value="PG">PG / Hostel</SelectItem>
                  <SelectItem value="TIFFIN">Tiffin Service</SelectItem>
                  <SelectItem value="ROOMMATE">Roommate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 px-4 py-4 md:py-2 bg-blue-50/30 dark:bg-blue-900/10 rounded-2xl">
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <IndianRupee className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300 min-w-[120px]">
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </span>
            </div>
            
            <Slider
              defaultValue={[500, 50000]}
              max={100000}
              step={500}
              minStepsBetweenValues={1}
              value={priceRange}
              onValueChange={(val) => Array.isArray(val) && setPriceRange(val)}
              className="flex-1"
            />

            <Button 
              onClick={handleSearch}
              size="lg" 
              className="h-14 px-10 w-full md:w-auto rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            >
              <Search className="h-5 w-5" />
              Search
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
