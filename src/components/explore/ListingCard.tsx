import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export type ListingItem = {
  id: string;
  category: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  distance: string;
  images: string[];
  featured: boolean;
  amenities: React.ReactNode[];
};

export function ListingCard({ data }: { data: ListingItem }) {
  // Using native HTML rendering with horizontal snap-scroll to safely bypass heavily fragmented 
  // Carousel SSR components ensuring unbreakable Windows local builds natively while meeting requirements.
  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden flex flex-col hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Imagery with Manual CSS snapping Array */}
      <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-950 overflow-x-auto snap-x snap-mandatory flex scrollbar-hide">
        {data.images.map((img, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative">
             <img src={img} alt={`${data.title} ${idx}`} className="w-full h-full object-cover" />
          </div>
        ))}
        {data.featured && (
          <Badge className="absolute top-3 left-3 bg-blue-600 hover:bg-blue-600 text-white font-semibold tracking-wide border-none shadow-md z-10 px-3 py-1">
            Featured
          </Badge>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full transition duration-300 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
             <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
           <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-500 flex items-center gap-1">
                 <CheckCircle2 size={12} /> {data.category}
              </span>
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 leading-tight line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                 {data.title}
              </h3>
           </div>
        </div>
        
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">
           <MapPin size={14} className="mr-1 shrink-0 text-blue-500" />
           <span className="truncate">{data.distance} near you</span>
        </div>

        <div className="flex items-center gap-2 mb-5">
           {data.amenities.map((Amenity, index) => (
             <div key={index} className="flex items-center justify-center bg-slate-100 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-300">
               {Amenity}
             </div>
           ))}
           <div className="text-xs font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 ml-auto flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {data.rating} <span className="text-slate-400 font-normal">({data.reviews})</span>
           </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
           <div>
              <span className="text-xl font-black text-slate-900 dark:text-white">₹{data.price.toLocaleString("en-IN")}</span>
              <span className="text-xs text-slate-500 font-medium ml-1">/mo</span>
           </div>
        </div>
      </div>
    </div>
  );
}
