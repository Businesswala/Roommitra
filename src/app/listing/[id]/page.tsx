"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, ArrowLeft, Star, Share, Heart, CheckCircle2, Phone, ShieldCheck, Mail, Calendar } from "lucide-react";

export default function ListingDetailView({ params }: { params: { id: string } }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryText, setInquiryText] = useState("");

  // Simulated heavy Database JSON payload intercepted via Next.js Dynamic Parameters 
  const mockListing = {
     id: params.id,
     category: "Rooms",
     title: "Luxury Studio Suite in Indiranagar",
     price: 21000,
     address: "12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru",
     rating: 4.8,
     reviews: 124,
     host: "Rahul Sharma",
     hostJoined: "2023",
     description: "Experience premium living in the absolute heart of Indiranagar. This luxury studio suite comes completely equipped with high-speed 500Mbps WiFi routing, a massive 55-inch Smart TV, and ergonomic workstations specifically designed for top-tier professionals. Located barely 3 minutes away from the metro station, ensuring zero friction access to the entire city layout. \n\nThe security perimeter is locked 24/7 with active biometric tracking, ensuring optimal physical safety while you navigate your daily operations.",
     amenities: ["Fully Furnished", "AC", "100Mbps WiFi", "Smart TV", "Washing Machine", "Power Backup", "Biometric Lock", "Cleaning Appt."],
     images: [
        "https://images.unsplash.com/photo-1598928506311-c55dd1b311fc?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1e5250ad11?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
     ]
  };

  const submitLead = () => {
    alert("Inquiry perfectly transmitted to the secure Lister Sandbox!");
    setModalOpen(false);
    setInquiryText("");
  };

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
        {/* Massive Carousel Block Array */}
        <div className="relative w-full h-[30vh] sm:h-[45vh] lg:h-[60vh] rounded-3xl overflow-hidden flex gap-2 snap-x snap-mandatory overflow-x-auto scrollbar-hide shadow-sm mb-10">
           {mockListing.images.map((img, idx) => (
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

        {/* Structural Layout Base */}
        <div className="flex flex-col lg:flex-row gap-12">
           
           {/* Left Topology Data Block */}
           <div className="flex-1 w-full min-w-0 space-y-10">
              
              {/* Header Title Metadata */}
              <div>
                 <div className="flex items-center gap-2 mb-3">
                   <span className="text-xs font-bold uppercase tracking-wider text-orange-500 bg-orange-50 dark:bg-orange-950/50 px-2 py-1 rounded-md border border-orange-100 dark:border-orange-900">
                      {mockListing.category}
                   </span>
                   <span className="flex items-center text-sm font-bold text-slate-800 dark:text-slate-200">
                     <Star size={14} className="fill-amber-400 text-amber-400 mr-1" />
                     {mockListing.rating} <span className="font-normal text-slate-500 ml-1">({mockListing.reviews} reviews)</span>
                   </span>
                 </div>
                 <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 tracking-tight">
                   {mockListing.title}
                 </h1>
                 <div className="flex items-start text-slate-500 dark:text-slate-400 font-medium">
                   <MapPin size={18} className="mr-2 shrink-0 text-blue-500 mt-0.5" />
                   <p className="leading-snug">{mockListing.address}</p>
                 </div>
              </div>

              {/* Verified Lister Module */}
              <div className="flex items-center justify-between p-6 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-2xl shadow-sm">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-xl ring-4 ring-white dark:ring-slate-950">
                       {mockListing.host.charAt(0)}
                    </div>
                    <div>
                       <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-1">
                         Hosted by {mockListing.host}
                         <CheckCircle2 size={16} className="text-blue-500" />
                       </h3>
                       <p className="text-sm text-slate-500">Super Lister • Joined {mockListing.hostJoined}</p>
                    </div>
                 </div>
              </div>

              {/* Extreme Density Amenities Grid */}
              <div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What this place natively offers</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                    {mockListing.amenities.map(amenity => (
                       <div key={amenity} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                         <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center shrink-0">
                           <CheckCircle2 size={16} className="text-orange-500" />
                         </div>
                         {amenity}
                       </div>
                    ))}
                 </div>
              </div>

              {/* Rich Format Description HTML Bounds */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About this space</h2>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg whitespace-pre-line">
                   {mockListing.description}
                 </p>
              </div>

           </div>

           {/* Sticky Interaction Check-out Bounds */}
           <div className="w-full lg:w-[400px] flex-shrink-0">
              <div className="sticky top-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 animate-in slide-in-from-right-8 duration-700">
                 
                 <div className="flex items-end gap-1 mb-8">
                   <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">₹{mockListing.price.toLocaleString("en-IN")}</h2>
                   <span className="text-slate-500 font-medium text-lg leading-loose">/ month</span>
                 </div>

                 <div className="space-y-4 mb-8 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/60">
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                       <ShieldCheck size={20} className="text-green-500 shrink-0" />
                       Verified 100% Secure Transaction
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium pt-3 border-t border-slate-200 dark:border-slate-800">
                       <LineChart size={20} className="text-blue-500 shrink-0" />
                       High Demand: 45 Active Lookups
                    </div>
                 </div>
                 
                 {/* Native Shadcn Dialog Interactive Boundary Trigger */}
                 <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogTrigger className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20 mb-4 transition-transform hover:scale-[1.02]">
                         Direct Contact Lister
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-3xl overflow-hidden p-0 shadow-2xl">
                       <div className="p-8">
                         <DialogHeader className="mb-6">
                           <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white">Secure Inquiry Portal</DialogTitle>
                           <DialogDescription className="text-slate-500 tracking-wide mt-2">
                             Your details are aggressively encrypted before touching the target Lister. Send an introductory pulse mapping your specific requirements safely.
                           </DialogDescription>
                         </DialogHeader>
                         
                         <div className="space-y-4 mb-8">
                            <Input placeholder="Your Full Name" className="h-12 bg-slate-50 dark:bg-slate-900 border-none px-4 rounded-xl" />
                            <Input placeholder="+91 Your Mobile Array" className="h-12 bg-slate-50 dark:bg-slate-900 border-none px-4 rounded-xl" />
                            <textarea 
                              placeholder="Hello absolute Legend, I am heavily interested in inspecting this grid..." 
                              value={inquiryText}
                              onChange={(e) => setInquiryText(e.target.value)}
                              className="w-full min-h-[140px] bg-slate-50 dark:bg-slate-900 border-none px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
                            />
                         </div>

                         <div className="flex gap-4">
                           <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1 h-12 rounded-xl text-slate-600 border-slate-200 dark:border-slate-800">
                             Abort Context
                           </Button>
                           <Button onClick={submitLead} className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg border-none shadow-blue-500/20">
                             Send Secure Pulse
                           </Button>
                         </div>
                       </div>
                    </DialogContent>
                 </Dialog>
                 
                 <Button variant="outline" className="w-full h-14 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                   Schedule Physical Visit
                 </Button>

                 <p className="text-center text-xs text-slate-400 font-medium mt-6">
                   You inherently incur zero charges for executing grid queries directly!
                 </p>
              </div>
           </div>

        </div>
      </main>
    </div>
  );
}

// Just an inline mock icon fallback bypassing large lucide injections heavily
const LineChart = ({ size, className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
);
