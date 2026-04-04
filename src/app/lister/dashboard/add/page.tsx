"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  PlusCircle, 
  MapPin, 
  Info, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  Building2,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ImageUpload from "@/components/ImageUpload";

const CATEGORIES = ["Room", "PG", "Roommate", "Tiffin", "Laundry"];
const AMENITIES_LIST = [
  { id: "wifi", label: "WiFi Enabled" },
  { id: "ac", label: "Air Conditioning" },
  { id: "furnished", label: "Fully Furnished" },
  { id: "veg_only", label: "Veg Only" },
  { id: "attached_washroom", label: "Attached Washroom" },
  { id: "power_backup", label: "Power Backup" },
  { id: "laundry", label: "In-house Laundry" },
];

export default function AddListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Listing submitted for Admin Approval!");
      router.push("/lister/dashboard/listings");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-600 text-sm font-bold uppercase tracking-wider">
          <Building2 className="h-4 w-4" />
          Marketplace Deployment
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Create New Listing</h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Provide accurate details to ensure your listing passes our verification process and reaches the right audience.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-10">
        {/* Section 1: Basic Information */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden rounded-3xl">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">1. Basic Information</CardTitle>
                <CardDescription>How your listing will be identified.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-bold text-slate-700 dark:text-slate-300">Listing Title</Label>
                <Input id="title" placeholder="e.g. Spacious Single Room in Koramangala" required className="rounded-xl h-12 bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="font-bold text-slate-700 dark:text-slate-300">Category</Label>
                <Select required>
                  <SelectTrigger className="rounded-xl h-12 bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-bold text-slate-700 dark:text-slate-300">Detailed Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe features, nearby landmarks, and rules..." 
                className="min-h-[120px] rounded-2xl bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 resize-none p-4" 
                required 
              />
            </div>

            <div className="w-full md:w-1/2 space-y-2">
              <Label htmlFor="price" className="font-bold text-slate-700 dark:text-slate-300">Price (₹ per month/unit)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <Input id="price" type="number" placeholder="8500" className="pl-8 rounded-xl h-12 bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Location */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden rounded-3xl">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-xl">
                <MapPin className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">2. Location Details</CardTitle>
                <CardDescription>Precise location helps with hyperlocal discovery.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="address" className="font-bold text-slate-700 dark:text-slate-300">Full Physical Address</Label>
              <Input id="address" placeholder="Building name, Street, Area" required className="rounded-xl h-12 bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="font-bold text-slate-700 dark:text-slate-300">City</Label>
                <Input id="city" placeholder="e.g. Bangalore" required className="rounded-xl h-12 bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode" className="font-bold text-slate-700 dark:text-slate-300">Pincode</Label>
                <Input id="pincode" placeholder="e.g. 560034" required className="rounded-xl h-12 bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Amenities */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden rounded-3xl">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
                <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">3. Features & Amenities</CardTitle>
                <CardDescription>Select all that apply to your property.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AMENITIES_LIST.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-3 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer group" onClick={() => toggleAmenity(amenity.id)}>
                  <Checkbox 
                    id={amenity.id} 
                    checked={selectedAmenities.includes(amenity.id)} 
                    onCheckedChange={() => toggleAmenity(amenity.id)}
                    className="data-[state=checked]:bg-blue-600 h-5 w-5 rounded-lg border-slate-300 dark:border-slate-700" 
                  />
                  <Label 
                    htmlFor={amenity.id} 
                    className="text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                  >
                    {amenity.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Media */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden rounded-3xl">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl">
                <PlusCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">4. Visual Assets</CardTitle>
                <CardDescription>Upload up to 10 photos of your property.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <ImageUpload onUpload={(urls) => setImages(urls)} />
            <div className="mt-6 flex items-start gap-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300">
               <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
               <p className="text-sm">
                 Please ensure photos are recent and show the actual condition of the space. Admin verification will cross-check these images.
               </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="flex items-center justify-between gap-4 pt-6">
          <Button type="button" variant="ghost" onClick={() => router.back()} className="rounded-2xl h-14 px-8 text-slate-500 font-bold hover:text-slate-900 dark:hover:text-white">
            Cancel & Exit
          </Button>
          <Button 
            type="submit" 
            disabled={loading} 
            className="flex-1 max-w-sm rounded-2xl h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold text-lg shadow-2xl shadow-blue-500/30 transition-all active:scale-95 disabled:grayscale"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Processing Deployment...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Submit for Admin Approval
                <ChevronRight className="h-5 w-5" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
