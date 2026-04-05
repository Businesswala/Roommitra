import { getListingById } from "@/app/actions/listing";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, Star, Share, Heart, CheckCircle2, Phone, ShieldCheck, Mail, Calendar } from "lucide-react";
import { ListingInteraction } from "@/components/listing/ListingInteraction";
import { notFound } from "next/navigation";

export default async function ListingDetailView({ params }: { params: { id: string } }) {
  const { data: listing, error } = await getListingById(params.id);

  if (!listing) {
    notFound();
  }

  const amenities = JSON.parse(listing.amenities || "[]");
  const images = JSON.parse(listing.images || "[]");
  const displayImages = images.length > 0 ? images : ["https://images.unsplash.com/photo-1598928506311-c55dd1b311fc?w=1600"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/explore" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="font-black text-xl flex items-center gap-1">
            <span className="text-blue-600 dark:text-blue-500">Room</span>
            <span className="text-orange-500">mitra</span>
            <span className="hidden sm:inline ml-2 text-slate-300 dark:text-slate-700">|</span>
            <span className="hidden sm:inline ml-2 text-sm font-semibold text-slate-500">Listing Engine</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-full">
             <Heart size={20} />
           </Button>
           <Button variant="ghost" size="icon" className="text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
             <Share size={20} />
           </Button>
           <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="relative w-full h-[30vh] sm:h-[45vh] lg:h-[60vh] rounded-3xl overflow-hidden flex gap-2 snap-x snap-mandatory overflow-x-auto scrollbar-hide shadow-sm mb-10">
           {displayImages.map((img: string, idx: number) => (
              <img 
                 key={idx} 
                 src={img} 
                 alt={`Property Angle ${idx}`} 
                 className={`object-cover snap-center flex-shrink-0 ${idx === 0 ? 'w-full md:w-2/3 h-full' : 'hidden md:block md:w-1/3 h-full'}`} 
              />
           ))}
           <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-xl border border-white/10 hover:bg-black transition-colors">
             View All Photos
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
           <div className="flex-1 w-full min-w-0 space-y-10">
              <div>
                 <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-500 bg-orange-50 dark:bg-orange-950/50 px-2 py-1 rounded-md border border-orange-100 dark:border-orange-900">
                       {listing.type}
                    </span>
                    <span className="flex items-center text-sm font-bold text-slate-800 dark:text-slate-200">
                      <Star size={14} className="fill-amber-400 text-amber-400 mr-1" />
                      4.5 <span className="font-normal text-slate-500 ml-1">({listing.reviews?.length || 0} reviews)</span>
                    </span>
                 </div>
                 <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 tracking-tight">
                   {listing.title}
                 </h1>
                 <div className="flex items-start text-slate-500 dark:text-slate-400 font-medium">
                   <MapPin size={18} className="mr-2 shrink-0 text-blue-500 mt-0.5" />
                   <p className="leading-snug">{listing.address}</p>
                 </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-2xl shadow-sm">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-xl ring-4 ring-white dark:ring-slate-950">
                       {listing.lister?.name?.charAt(0)}
                    </div>
                    <div>
                       <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-1">
                         Hosted by {listing.lister?.name}
                         <CheckCircle2 size={16} className="text-blue-500" />
                       </h3>
                       <p className="text-sm text-slate-500">{listing.lister?.businessName || "Individual Lister"}</p>
                    </div>
                 </div>
              </div>

              <div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What this place natively offers</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                    {amenities.map((amenity: string) => (
                       <div key={amenity} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                         <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center shrink-0">
                           <CheckCircle2 size={16} className="text-orange-500" />
                         </div>
                         {amenity}
                       </div>
                    ))}
                    {amenities.length === 0 && <p className="text-slate-500 italic">Contact lister for amenity details.</p>}
                 </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About this space</h2>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg whitespace-pre-line">
                   {listing.description}
                 </p>
              </div>
           </div>

           {/* Sticky Interaction Counter Module */}
           <div className="w-full lg:w-[400px] flex-shrink-0">
              <ListingInteraction 
                listingId={listing.id} 
                listerId={listing.listerId} 
                price={listing.price} 
              />
           </div>
        </div>
      </main>
    </div>
  );
}
