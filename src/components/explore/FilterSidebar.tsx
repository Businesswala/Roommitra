"use client";

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type CategoryType = "Rooms" | "PG" | "Roommate" | "Tiffin" | "Laundry";

type SidebarProps = {
  category: CategoryType;
  setCategory: (c: CategoryType) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  filters: Record<string, boolean>;
  toggleFilter: (key: string) => void;
};

export function FilterSidebar({ category, setCategory, priceRange, setPriceRange, filters, toggleFilter }: SidebarProps) {
  
  const categories: CategoryType[] = ["Rooms", "PG", "Roommate", "Tiffin", "Laundry"];
  
  const dynamicOptions: Record<CategoryType, string[]> = {
    "Rooms": ["Fully Furnished", "Semi Furnished", "AC", "Non-AC", "Couples Allowed", "Balcony"],
    "PG": ["Single Sharing", "Double Sharing", "AC", "Meals Included", "No Lock-in", "Washing Machine"],
    "Roommate": ["Vegetarian Only", "Non-Smoker", "Pet Friendly", "Working Professional", "Student"],
    "Tiffin": ["Veg Only", "Non-Veg Available", "Breakfast", "Lunch", "Dinner", "Free Delivery"],
    "Laundry": ["Wash & Fold", "Wash & Iron", "Dry Clean", "Free Pickup", "Delivery within 24h"]
  };

  return (
    <div className="space-y-8 p-1">
      {/* Category selection natively wrapped as custom radios */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map((c) => (
             <div 
               key={c} 
               onClick={() => setCategory(c)}
               className={`px-4 py-2 border rounded-xl cursor-pointer transition-all duration-200 text-sm font-medium ${
                 category === c 
                   ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/40 dark:border-blue-800 dark:text-blue-400" 
                   : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700"
               }`}
             >
               {c}
             </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">Budget Range</h3>
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
            ₹{priceRange[0]} - ₹{priceRange[1]}{priceRange[1] === 50000 ? '+' : ''}
          </span>
        </div>
        <Slider 
          defaultValue={[1000, 25000]} 
          max={50000} 
          step={500} 
          value={priceRange}
          onValueChange={(val: any) => setPriceRange(val as [number, number])}
          className="mt-6"
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
         <h3 className="font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">
           Filters for {category}
         </h3>
         <div className="space-y-3">
           {dynamicOptions[category].map((opt) => (
             <div key={opt} className="flex items-center space-x-3 group">
               <Checkbox 
                 id={`filter-${opt}`} 
                 checked={!!filters[opt]}
                 onCheckedChange={() => toggleFilter(opt)}
                 className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 border-slate-300 dark:border-slate-700"
               />
               <Label 
                 htmlFor={`filter-${opt}`}
                 className="text-sm cursor-pointer font-medium text-slate-600 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-200 transition-colors"
               >
                 {opt}
               </Label>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}
