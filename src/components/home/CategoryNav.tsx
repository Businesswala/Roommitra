import { Home, Users, Building, Utensils, WashingMachine } from "lucide-react";
import Link from "next/link";
export function CategoryNav() {
  const categories = [
    { name: "Rooms", icon: Home, color: "text-blue-500 hover:text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { name: "PGs", icon: Building, color: "text-orange-500 hover:text-orange-600", bg: "bg-orange-50 dark:bg-orange-500/10" },
    { name: "Roommate", icon: Users, color: "text-green-500 hover:text-green-600", bg: "bg-green-50 dark:bg-green-500/10" },
    { name: "Tiffin", icon: Utensils, color: "text-rose-500 hover:text-rose-600", bg: "bg-rose-50 dark:bg-rose-500/10" },
    { name: "Laundry", icon: WashingMachine, color: "text-purple-500 hover:text-purple-600", bg: "bg-purple-50 dark:bg-purple-500/10" },
  ];

  return (
    <section className="w-full py-8 border-b border-border/40 bg-white/50 dark:bg-slate-900/20 backdrop-blur-sm -mt-8 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-6 text-center lg:text-left">
          Explore Categories
        </h2>
        
        {/* Scrollable container on mobile */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4 lg:gap-6 lg:justify-between snap-x snap-mandatory">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.name}
                href="/explore"
                className="snap-center shrink-0 flex flex-col items-center gap-3 group cursor-pointer w-24 sm:w-32"
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${category.bg} flex items-center justify-center group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 ring-1 ring-slate-200/50 dark:ring-slate-800/50`}>
                  <Icon className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${category.color}`} />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
