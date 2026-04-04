import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import Link from "next/link";

export function Hero() {
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
          Everything You Need for Living – All in One Place. Search verified Rooms, PGs, Tiffin services, and Laundry near you.
        </p>

        {/* Smart Search Bar */}
        <div className="mt-10 w-full max-w-3xl bg-white dark:bg-slate-900 p-2 sm:p-2 rounded-2xl shadow-xl shadow-blue-900/5 ring-1 ring-slate-200 dark:ring-slate-800 flex flex-col sm:flex-row items-center gap-2 group hover:shadow-blue-900/10 transition-shadow">
          
          <div className="flex w-full items-center px-4 h-14 bg-slate-50 dark:bg-slate-950 rounded-xl flex-1 border border-transparent focus-within:border-blue-500/50 focus-within:bg-white dark:focus-within:bg-slate-900 transition-colors">
            <MapPin className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="City, Neighborhood, or Zip..." 
              className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 h-full text-base"
            />
          </div>

          <div className="flex w-full items-center px-4 h-14 bg-slate-50 dark:bg-slate-950 rounded-xl flex-1 border border-transparent focus-within:border-blue-500/50 focus-within:bg-white dark:focus-within:bg-slate-900 transition-colors">
            <Search className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
            <input 
              type="text" 
              placeholder="Room, Tiffin, Laundry..." 
              className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 h-full text-base"
            />
          </div>

          <Link href="/explore" className="w-full sm:w-auto flex">
            <Button size="lg" className="h-14 px-8 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-500/25 transition-all">
              Search
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
