"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CheckCircle2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";

type CategoryType = "Rooms" | "PG" | "Roommate" | "Tiffin" | "Laundry";

const dynamicOptions: Record<CategoryType, string[]> = {
  "Rooms": ["Fully Furnished", "Semi Furnished", "AC", "Non-AC", "Couples Allowed", "Balcony"],
  "PG": ["Single Sharing", "Double Sharing", "AC", "Meals Included", "No Lock-in", "Washing Machine"],
  "Roommate": ["Vegetarian Only", "Non-Smoker", "Pet Friendly", "Working Professional", "Student"],
  "Tiffin": ["Veg Only", "Non-Veg Available", "Breakfast", "Lunch", "Dinner", "Free Delivery"],
  "Laundry": ["Wash & Fold", "Wash & Iron", "Dry Clean", "Free Pickup", "Delivery within 24h"]
};

export default function NewListing() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState<CategoryType>("Rooms");
  const [amenities, setAmenities] = useState<Record<string, boolean>>({});

  const [imageUrl, setImageUrl] = useState("");

  const toggleAmenity = (key: string) => {
    setAmenities(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const activeAmenities = Object.keys(amenities).filter(k => amenities[k]);

    const payload = {
      listerId: "simulated-lister-id-1234",
      title,
      type,
      price: parseFloat(price),
      description,
      address,
      latitude: 0.0,
      longitude: 0.0,
      amenities: JSON.stringify(activeAmenities),
      images: JSON.stringify([imageUrl || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5"])
    };

    try {
      const res = await fetch("/api/listings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if(data.success) {
        alert("Listing published successfully!");
        router.push("/lister/dashboard");
      } else {
        alert("Creation failed: " + data.error);
      }
    } catch(err) {
      alert("Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/lister/dashboard" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="font-black text-xl flex items-center gap-1">
            <span className="text-blue-600 dark:text-blue-500">Room</span>
            <span className="text-orange-500">mitra</span>
            <span className="hidden md:inline ml-2 text-slate-300 dark:text-slate-700">|</span>
            <span className="hidden md:inline ml-2 text-sm font-semibold text-slate-500">Upload Portal</span>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Create New Listing</h1>
          <p className="text-slate-500 mt-2">Publish your property or service into the hyperlocal marketplace grid.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm animate-in fade-in slide-in-from-bottom-8">
          
          <div className="space-y-4">
             <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">1. Core Information</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Category Type</Label>
                  <select 
                    value={type} 
                    onChange={(e) => {
                       setType(e.target.value as CategoryType);
                       setAmenities({}); // Clear amenities when category swaps!
                    }}
                    className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 disabled:cursor-not-allowed dark:bg-slate-950 dark:text-slate-100"
                  >
                     <option value="Rooms">Rooms / Apartments</option>
                     <option value="PG">PG Accommodations</option>
                     <option value="Roommate">Roommate Requests</option>
                     <option value="Tiffin">Tiffin Services</option>
                     <option value="Laundry">Laundry Services</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Monthly Price / Cost (₹)</Label>
                  <Input 
                    type="number" 
                    placeholder="e.g. 15000" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="bg-slate-50 dark:bg-slate-950"
                  />
                </div>
             </div>

             <div className="space-y-2">
               <Label>Title / Headline</Label>
               <Input 
                 placeholder="e.g. Premium Single Sharing PG near Manyata Tech Park" 
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}
                 required
                 className="bg-slate-50 dark:bg-slate-950"
               />
             </div>

             <div className="space-y-2">
               <Label>Full Description</Label>
               <Textarea 
                 placeholder="Describe your property or service in rich detail..." 
                 rows={4}
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 required
                 className="bg-slate-50 dark:bg-slate-950 resize-none"
               />
             </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">2. Physical Location</h3>
             <div className="space-y-2">
               <Label>Complete Address / Landmark</Label>
               <Input 
                 placeholder="e.g. 4th Block, Koramangala, Opposite Madiwala Police Station" 
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                 required
                 className="bg-slate-50 dark:bg-slate-950"
               />
             </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">3. Dynamic Features ({type})</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
               {dynamicOptions[type].map((opt) => (
                 <div key={opt} className="flex items-center space-x-3">
                   <Checkbox 
                     id={`amen-${opt}`} 
                     checked={!!amenities[opt]}
                     onCheckedChange={() => toggleAmenity(opt)}
                     className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-slate-300 dark:border-slate-700 h-5 w-5 rounded shadow-sm"
                   />
                   <Label htmlFor={`amen-${opt}`} className="text-sm font-medium cursor-pointer text-slate-700 dark:text-slate-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                     {opt}
                   </Label>
                 </div>
               ))}
             </div>
          </div>

          <div className="space-y-4">
             <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">4. Image Assets</h3>
             
             <ImageUpload onUpload={(urls) => setImageUrl(urls[0] || "")} />
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <Button type="submit" disabled={loading} className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl shadow-xl shadow-blue-500/20 font-bold text-lg flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> 
              {loading ? "Injecting Database Block..." : "Publish Live Marketplace Listing"}
            </Button>
          </div>

        </form>
      </main>
    </div>
  );
}
