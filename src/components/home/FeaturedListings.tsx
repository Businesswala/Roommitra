import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";

const mockListings = [
  { id: 1, title: "Premium Single Room in Kormangala", type: "Room", price: "₹12,000 / mo", rating: 4.8, reviews: 124, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop", distance: "1.2 km near you" },
  { id: 2, title: "Home Style Veg Tiffin Service", type: "Tiffin", price: "₹2,500 / mo", rating: 4.9, reviews: 312, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop", distance: "0.5 km near you" },
  { id: 3, title: "Tech Pro Roommate Wanted", type: "Roommate", price: "Split Rent", rating: 5.0, reviews: 4, img: "https://images.unsplash.com/photo-1543806296-6e3e5513ab7a?w=600&h=400&fit=crop", distance: "3.0 km near you" },
  { id: 4, title: "Express Laundry & Dry Clean", type: "Laundry", price: "₹50 / kg", rating: 4.6, reviews: 89, img: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&h=400&fit=crop", distance: "2.1 km near you" },
];

export function FeaturedListings() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Featured Near You</h2>
            <p className="text-slate-500 mt-2">Top-rated listings tailored for your location.</p>
          </div>
          <Link href="/explore" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline hidden sm:block">View all</Link>
        </div>

        <Carousel className="w-full" opts={{ align: "start", loop: false }}>
          <CarouselContent className="-ml-4">
            {mockListings.map((listing) => (
              <CarouselItem key={listing.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Link href={`/listing/${listing.id}`}>
                  <Card className="overflow-hidden border-0 shadow-lg shadow-slate-200/50 dark:shadow-none dark:ring-1 dark:ring-slate-800 transition-all hover:-translate-y-1 hover:shadow-xl group">
                    <div className="relative h-48 w-full overflow-hidden">
                      {/* Disabling standard Next Image tag for raw url mocking */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={listing.img} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-slate-200" />
                      <Badge className="absolute top-3 right-3 bg-white/90 text-slate-900 hover:bg-white border-0 shadow-sm backdrop-blur-sm pt-0.5 pb-0.5 font-bold">
                        {listing.type}
                      </Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center gap-1 text-xs font-medium text-orange-500 mb-1">
                        <MapPin className="w-3 h-3" />
                        {listing.distance}
                      </div>
                      <h3 className="font-bold text-lg line-clamp-1 dark:text-slate-100">{listing.title}</h3>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex justify-between items-center">
                      <div className="text-blue-600 dark:text-blue-400 font-black text-lg">{listing.price}</div>
                      <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                        {listing.rating} <span className="text-slate-400 font-normal">({listing.reviews})</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:flex justify-end gap-2 mt-6 relative">
            {/* The carousel buttons use absolute positioning natively in shadcn, override to static flex for standard flow */}
            <CarouselPrevious className="static translate-y-0 text-slate-900 dark:text-white border-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" />
            <CarouselNext className="static translate-y-0 text-slate-900 dark:text-white border-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" />
          </div>
        </Carousel>
        <Link href="/explore" className="w-full text-center mt-8 text-blue-600 dark:text-blue-400 font-semibold hover:underline block sm:hidden">View all listings</Link>
      </div>
    </section>
  );
}
