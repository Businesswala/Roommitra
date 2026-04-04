"use client";

import { useState } from "react";
import { ExploreHeader } from "./ExploreHeader";
import { FilterSidebar } from "./FilterSidebar";
import { ListingCard, ListingItem } from "./ListingCard";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Wifi, Snowflake, Coffee, Tv, CookingPot, Shirt } from "lucide-react";

// Massive robust mock database mapped visually utilizing distinct identifiers allowing high fidelity rendering!
const fakeData: ListingItem[] = [
  { id: "1", category: "Rooms", title: "Luxury Studio Suite in Indiranagar", price: 21000, rating: 4.8, reviews: 124, distance: "1.2 km", featured: true, images: ["https://images.unsplash.com/photo-1598928506311-c55dd1b311fc?auto=format&fit=crop&w=800"], amenities: [<Wifi key="w" size={16}/>, <Snowflake key="s" size={16}/>, <Tv key="t" size={16}/>] },
  { id: "2", category: "PG", title: "Zolo Co-living Premium (Boys)", price: 12500, rating: 4.5, reviews: 89, distance: "3.5 km", featured: false, images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800"], amenities: [<Wifi key="w" size={16}/>, <Coffee key="c" size={16}/>] },
  { id: "3", category: "Tiffin", title: "Maa Ki Rasoi - Authentic Veg", price: 4000, rating: 4.9, reviews: 312, distance: "2.1 km", featured: true, images: ["https://images.unsplash.com/photo-1628296574241-118fd452f1b4?auto=format&fit=crop&w=800"], amenities: [<CookingPot key="cp" size={16}/>] },
  { id: "4", category: "Laundry", title: "White Cloud Dry Cleaners", price: 800, rating: 4.3, reviews: 45, distance: "0.8 km", featured: false, images: ["https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800"], amenities: [<Shirt key="sh" size={16}/>] },
  { id: "5", category: "Rooms", title: "Cozy 1BHK near Tech Park", price: 18500, rating: 4.6, reviews: 76, distance: "4.2 km", featured: false, images: ["https://images.unsplash.com/photo-1502672260266-1c1e5250ad11?auto=format&fit=crop&w=800"], amenities: [<Wifi key="w" size={16}/>] },
  { id: "6", category: "Roommate", title: "Looking for flatmate - 3BHK", price: 14000, rating: 4.7, reviews: 12, distance: "2.8 km", featured: true, images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800"], amenities: [<Wifi key="w" size={16}/>, <Snowflake key="s" size={16}/>] },
  { id: "7", category: "PG", title: "Stanza Living Elite (Girls)", price: 16000, rating: 4.2, reviews: 231, distance: "5.1 km", featured: false, images: ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800"], amenities: [<Wifi key="w" size={16}/>, <Tv key="t" size={16}/>] },
  { id: "8", category: "Tiffin", title: "Health Bites - Diet Meals", price: 5500, rating: 4.8, reviews: 198, distance: "1.9 km", featured: false, images: ["https://images.unsplash.com/photo-1546069901-ba9590a1e120?auto=format&fit=crop&w=800"], amenities: [<CookingPot key="cp" size={16}/>] },
];

export function ExploreClientLayout() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [category, setCategory] = useState<"Rooms" | "PG" | "Roommate" | "Tiffin" | "Laundry">("Rooms");
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 25000]);
  const [filters, setFilters] = useState<Record<string, boolean>>({});

  const toggleFilter = (key: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Simulating visually accurate reactive filtering arrays without a DB request overlay
  const filteredData = fakeData.filter((item) => {
    const hitsCategory = item.category === category;
    const hitsPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    return hitsCategory && hitsPrice;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/20 text-slate-900 dark:text-slate-100 font-sans pb-16">
      <ExploreHeader onMobileFilterClick={() => setIsMobileFiltersOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 flex-shrink-0 sticky top-24 self-start">
           <FilterSidebar 
             category={category} 
             setCategory={setCategory} 
             priceRange={priceRange} 
             setPriceRange={setPriceRange} 
             filters={filters} 
             toggleFilter={toggleFilter} 
           />
        </aside>

        {/* Mobile Sheet Modal Pipeline leveraging Shadcn */}
        <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
           <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 p-0 overflow-y-auto hidden-scrollbar">
             <div className="p-6">
                <div className="text-xl font-black flex items-center gap-1 mb-8">
                  <span className="text-slate-800 dark:text-white">Filters</span>
                </div>
                <FilterSidebar 
                  category={category} 
                  setCategory={setCategory} 
                  priceRange={priceRange} 
                  setPriceRange={setPriceRange} 
                  filters={filters} 
                  toggleFilter={toggleFilter} 
                />
             </div>
           </SheetContent>
        </Sheet>

        {/* Core Rendering Block Data Engine */}
        <div className="flex-1 w-full min-w-0">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
               Explore <span className="text-blue-600 dark:text-blue-400">{category}</span> near you
               <span className="block text-sm font-medium text-slate-500 mt-2 tracking-normal">Showing {filteredData.length} highly relevant matches mapped to active filters.</span>
             </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 duration-700">
             {filteredData.length > 0 ? (
               filteredData.map(item => <ListingCard key={item.id} data={item} />)
             ) : (
               <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">No hyper-local hits found!</h3>
                  <p className="text-slate-500 max-w-sm mx-auto">Try expanding your price range or adjusting specific filters to discover better local opportunities.</p>
               </div>
             )}
          </div>
        </div>
      </main>
    </div>
  );
}
