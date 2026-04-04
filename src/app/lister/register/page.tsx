"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, UploadCloud, ChevronRight, Lock, Mail, Phone, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ListerRegistrationPage() {
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setPhotoPreview(URL.createObjectURL(file));
      } else {
        alert("Please select a valid image file.");
        e.target.value = "";
      }
    } else {
      setPhotoPreview(null);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      firstName: (document.getElementById('firstName') as HTMLInputElement).value,
      middleName: (document.getElementById('middleName') as HTMLInputElement).value,
      surname: (document.getElementById('surname') as HTMLInputElement).value,
      dob: date ? date.toISOString() : new Date().toISOString(),
      mobile1: (document.getElementById('mobile1') as HTMLInputElement).value,
      mobile2: (document.getElementById('mobile2') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
      address: (document.getElementById('address') as HTMLInputElement).value,
      latitude: parseFloat((document.getElementById('latitude') as HTMLInputElement).value),
      longitude: parseFloat((document.getElementById('longitude') as HTMLInputElement).value),
      documentNo: (document.getElementById('docNo') as HTMLInputElement).value
    };

    try {
      const res = await fetch("/api/auth/register-lister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if(res.ok && data.success) {
        alert("Registration Successful! Lister ID: " + data.user.id);
      } else {
        alert("Registration Error: " + (data.error || "Unknown error"));
      }
    } catch(err) {
      alert("Network Error during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center py-12 px-4 selection:bg-orange-500 selection:text-white transition-colors duration-300">
      <div className="absolute top-4 right-4 animate-in fade-in zoom-in duration-500 delay-300">
        <ThemeToggle />
      </div>
      
      {/* Brand Logo Section */}
      <div className="mb-8 animate-in slide-in-from-top-8 fade-in duration-700 flex flex-col items-center">
        <div className="flex items-center gap-1 mb-2">
          {/* Mocking the Logo SVG */}
          <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 15L10 45H90L50 15Z" fill="#1D4ED8" />
            <path d="M20 45V85H80V45" fill="none" stroke="#1D4ED8" strokeWidth="8"/>
            <circle cx="35" cy="55" r="10" fill="#F97316"/>
            <circle cx="65" cy="55" r="10" fill="#22C55E"/>
            <path d="M35 85C35 70 45 65 50 65C55 65 65 70 65 85" fill="none" stroke="#F97316" strokeWidth="8"/>
            <path d="M65 85C65 70 55 65 50 65" fill="none" stroke="#22C55E" strokeWidth="8"/>
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight flex items-center">
          <span className="text-blue-700 dark:text-blue-500">Room</span>
          <span className="text-orange-500 dark:text-orange-500">mitra</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
          <span className="text-blue-800 dark:text-blue-400">Everything You Need for Living – </span>
          <span className="text-orange-600 dark:text-orange-500">All in One Place</span>
        </p>
      </div>

      <div className="w-full max-w-2xl animate-in slide-in-from-bottom-8 fade-in duration-700">
        <Card className="border-0 shadow-2xl shadow-blue-500/10 dark:shadow-blue-900/20 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800">
          <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-green-500 to-orange-500" />
          <CardHeader className="space-y-2 pb-6 border-b border-slate-100 dark:border-slate-800/50 mb-6">
            <CardTitle className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              Lister Registration
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 text-base">
              Create your secure Lister profile to list properties and services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-8">
              
              {/* === Section 1: Full Name === */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 border-b pb-2 dark:border-slate-800">Personal Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold">First Name</Label>
                    <Input id="firstName" placeholder="John" required className="h-11 bg-white dark:bg-slate-950 focus:ring-blue-500/50 hover:border-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName" className="text-sm font-semibold text-slate-600 dark:text-slate-400">Middle Name (Opt)</Label>
                    <Input id="middleName" placeholder="William" className="h-11 bg-white dark:bg-slate-950 focus:ring-blue-500/50 hover:border-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname" className="text-sm font-semibold">Surname</Label>
                    <Input id="surname" placeholder="Doe" required className="h-11 bg-white dark:bg-slate-950 focus:ring-blue-500/50 hover:border-blue-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* DOB */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Date of Birth</Label>
                  <div className="relative">
                    <Popover>
                      <PopoverTrigger
                          className={cn(
                            "flex items-center w-full justify-start text-left font-normal h-11 px-4 border rounded-md border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-all hover:border-blue-400 focus:ring-2 focus:ring-blue-500/50 cursor-pointer",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="rounded-md border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-950"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                {/* Photo Upload with Preview */}
                <div className="space-y-2 flex flex-col justify-end">
                  <Label htmlFor="photo" className="text-sm font-semibold">Profile Photo</Label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {photoPreview ? (
                      <div className="relative h-14 w-14 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
                        <img src={photoPreview} alt="Preview" className="object-cover w-full h-full" />
                      </div>
                    ) : (
                      <div className="h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 transition-colors group-hover:bg-blue-50">
                        <UploadCloud className="h-5 w-5 text-slate-400" />
                      </div>
                    )}
                    <Input 
                      id="photo" 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoChange}
                      className="h-11 w-full flex-1 cursor-pointer file:cursor-pointer file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-400 file:border-0 file:rounded-md file:px-3 file:-ml-2 file:mr-3 file:text-sm file:font-medium hover:file:bg-blue-100 transition-all bg-white dark:bg-slate-950 focus:ring-blue-500/50 hover:border-blue-400"
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* === Section 2: Contact Information === */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 border-b pb-2 dark:border-slate-800 mt-2">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile1" className="text-sm font-semibold">Mobile 1</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <Input id="mobile1" type="tel" placeholder="+1234567890" required className="pl-9 h-11 bg-white dark:bg-slate-950 focus:ring-blue-500/50 hover:border-blue-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile2" className="text-sm font-semibold text-slate-600 dark:text-slate-400">Mobile 2 (Opt)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <Input id="mobile2" type="tel" placeholder="+0987654321" className="pl-9 h-11 bg-white dark:bg-slate-950 focus:ring-blue-500/50 hover:border-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <Input id="email" type="email" placeholder="john.doe@example.com" required className="pl-9 h-11 bg-white dark:bg-slate-950 focus:ring-blue-500/50 hover:border-blue-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-semibold">Secure Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <Input id="password" type="password" placeholder="••••••••" required className="pl-9 h-11 bg-white dark:bg-slate-950 focus:ring-blue-500/50 hover:border-blue-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* === Section 3: Geographic Data === */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 border-b pb-2 dark:border-slate-800 mt-2">Location & Address</h3>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-semibold">Full Physical Address</Label>
                  <Textarea 
                    id="address" 
                    placeholder="Provide your complete address for marketplace listing..."
                    className="min-h-[100px] resize-none bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-blue-500/50 hover:border-blue-400" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude" className="text-sm font-semibold">Latitude</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-orange-500" />
                      <Input id="latitude" type="number" step="any" placeholder="28.7041" required className="pl-9 h-11 bg-white dark:bg-slate-950 focus:ring-blue-500/50 hover:border-blue-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude" className="text-sm font-semibold">Longitude</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-orange-500" />
                      <Input id="longitude" type="number" step="any" placeholder="77.1025" required className="pl-9 h-11 bg-white dark:bg-slate-950 focus:ring-blue-500/50 hover:border-blue-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* === Section 4: Identity Verification === */}
              <div className="space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 pb-1 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Identity Verification
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="docNo" className="text-sm font-semibold">Document Number</Label>
                    <Input id="docNo" placeholder="Aadhar/PAN Number" required className="h-11 bg-white dark:bg-slate-950 focus:ring-blue-500/50 hover:border-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="docFile" className="text-sm font-semibold">Upload Document (PDF/Image)</Label>
                    <Input 
                      id="docFile" 
                      type="file" 
                      accept="image/*,.pdf" 
                      className="h-11 cursor-pointer file:cursor-pointer file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-400 file:border-0 file:rounded-md file:px-3 file:-ml-2 file:mr-3 file:text-sm file:font-medium hover:file:bg-blue-100 transition-all bg-white dark:bg-slate-950 focus:ring-blue-500/50 hover:border-blue-400"
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 mt-8 text-md font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/25 transition-all group overflow-hidden relative border-0 rounded-xl"
                disabled={loading}
              >
                <div className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? "Validating securely..." : "Submit Registration Request"}
                  {!loading && <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                </span>
              </Button>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
