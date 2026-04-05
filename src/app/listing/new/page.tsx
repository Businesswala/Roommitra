"use client";

import { useState } from "react";
import { createListing } from "@/app/actions/listing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, PlusCircle } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function NewListingPage() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please login to post a listing");
      router.push("/login");
    }
  }, [user, authLoading, router]);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const { data, error } = await createListing(formData);
    setLoading(false);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Listing published! Redirecting to explore...");
      router.push("/explore");
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden">
          <div className="h-2 bg-blue-600 w-full" />
          <CardHeader className="p-8">
            <CardTitle className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <PlusCircle className="text-blue-600" /> Post a New Listing
            </CardTitle>
            <CardDescription className="text-lg">
              Reach thousands of room seekers across Bengaluru instantly.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <form action={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-bold text-slate-700 dark:text-slate-300">Title</Label>
                  <Input id="title" name="title" placeholder="e.g. Luxury PG in HSR Layout" required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="font-bold text-slate-700 dark:text-slate-300">Category</Label>
                  <Select name="type" defaultValue="ROOM">
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ROOM">Room</SelectItem>
                      <SelectItem value="PG">PG</SelectItem>
                      <SelectItem value="ROOMMATE">Roommate</SelectItem>
                      <SelectItem value="TIFFIN">Tiffin Service</SelectItem>
                      <SelectItem value="LAUNDRY">Laundry Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="font-bold text-slate-700 dark:text-slate-300">Rent / Monthly Price (₹)</Label>
                <Input id="price" name="price" type="number" placeholder="e.g. 15000" required className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="font-bold text-slate-700 dark:text-slate-300">Location / Address</Label>
                <Input id="address" name="address" placeholder="e.g. 24th Main, HSR Layout Sector 2" required className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-bold text-slate-700 dark:text-slate-300">Description</Label>
                <Textarea id="description" name="description" placeholder="Describe the amenities, nearby landmarks, and rules..." required className="min-h-[120px] rounded-xl" />
              </div>

              <Button type="submit" className="w-full h-12 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 transition-all" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Publish Listing"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
