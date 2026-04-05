"use client";

import { useState } from "react";
import { ExploreHeader } from "./ExploreHeader";
import { FilterSidebar } from "./FilterSidebar";
import { ListingCard, ListingItem } from "./ListingCard";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Wifi, Snowflake, Coffee, Tv, CookingPot, Shirt, AlertCircle, RefreshCcw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ExploreClientLayoutProps {
  initialData?: any[];
  initialError?: string | null;
}

// Higher-fidelity Category mapping for the Live Demo
const categoryMap: Record<string, string> = {
  "ROOM": "Rooms",
  "PG": "PG",
  "ROOMMATE": "Roommate",
  "TIFFIN": "Tiffin",
  "LAUNDRY": "Laundry"
};

const reverseCategoryMap: Record<string, string> = {
  "Rooms": "ROOM",
  "PG": "PG",
  "Roommate": "ROOMMATE",
  "Tiffin": "TIFFIN",
  "Laundry": "LAUNDRY"
};

// Mapper utility to bridge Prisma DB models to premium frontend ListingItems
const mapDbToListingItem = (dbItem: any): ListingItem => {
  const amenities = JSON.parse(dbItem.amenities || "[]");
  const images = JSON.parse(dbItem.images || "[]");
  
  // High-fidelity icon mapping for amenities
  const amenityIcons: Record<string, React.ReactNode> = {
    "Wi-Fi": <Wifi key="w" size={16}/>,
    "AC": <Snowflake key="s" size={16}/>,
    "TV": <Tv key="t" size={16}/>,
    "Veg": <CookingPot key="cp" size={16}/>,
  };

  const reviewsCount = dbItem.reviews?.length || 0;
  const avgRating = reviewsCount > 0 
    ? dbItem.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviewsCount 
    : 4.5;

  return {
    id: dbItem.id,
    category: categoryMap[dbItem.type] || dbItem.type,
    title: dbItem.title,
    price: dbItem.price,
    rating: Number(avgRating.toFixed(1)),
    reviews: reviewsCount,
    distance: "Near you",
    featured: dbItem.status === "APPROVED",
    images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1598928506311-c55dd1b311fc?auto=format&fit=crop&w=800"],
    amenities: amenities.map((a: string) => amenityIcons[a] || <Coffee key={a} size={16}/>),
  };
};

type CategoryType = "Rooms" | "PG" | "Roommate" | "Tiffin" | "Laundry";

export function ExploreClientLayout({ initialData = [], initialError }: ExploreClientLayoutProps) {
  const router = useRouter();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [category, setCategory] = useState<CategoryType>("Rooms");
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 30000]);
  const [filters, setFilters] = useState<Record<string, boolean>>({});

  const toggleFilter = (key: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const liveData = initialData.map(mapDbToListingItem);

  // Live filtering engine responding to user input
  const filteredData = liveData.filter((item) => {
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
               <span className="block text-sm font-medium text-slate-500 mt-2 tracking-normal">
                  Showing {filteredData.length} live matches from our secure database.
               </span>
             </h1>
          </div>

          {initialError && (
            <Alert variant="destructive" className="mb-8 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900 flex items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <div>
                  <AlertTitle className="font-bold">Database Connectivity Issue</AlertTitle>
                  <AlertDescription className="text-sm opacity-90">
                    {initialError} (Roommitra is currently running in <strong>Safe Mode</strong> using local cache. Real-time updates may be delayed.)
                  </AlertDescription>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => router.refresh()}
                className="shrink-0 bg-white dark:bg-slate-900 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-bold"
              >
                <RefreshCcw size={14} className="mr-2" />
                Retry Connection
              </Button>
            </Alert>
          )}

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
