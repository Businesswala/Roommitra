import { getSavedListings, getSeekerBookings } from "@/app/actions/user";
import { SeekerDashboardContent } from "@/app/user/dashboard/SeekerDashboardContent";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { dbCall } from "@/lib/db-utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, RefreshCcw } from "lucide-react";
import Link from "next/link";

/**
 * PRODUCTION-READY ERROR UI
 * Displays a clean, non-crashing state if the database or auth fails.
 */
function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <Card className="max-w-md w-full border-2 border-red-100 dark:border-red-900 shadow-2xl rounded-[40px] overflow-hidden">
        <CardHeader className="bg-red-50/50 dark:bg-red-900/10 pb-8">
          <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
             <Terminal className="text-red-600 w-7 h-7" />
          </div>
          <CardTitle className="text-3xl font-black text-red-600 tracking-tight">Sync Collision</CardTitle>
          <p className="text-slate-500 font-medium mt-2 leading-relaxed">The platform could not authenticate your session or retrieve profile metadata from the database grid.</p>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800 rounded-2xl">
            <AlertTitle className="font-black uppercase text-[10px] tracking-widest mb-2">Error Trace</AlertTitle>
            <AlertDescription className="text-xs font-mono opacity-80 break-all">{message}</AlertDescription>
          </Alert>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/user/dashboard" className="flex-1">
              <Button className="w-full bg-slate-900 hover:bg-black text-white font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl transition-all active:scale-95 shadow-xl shadow-slate-900/20">
                 <RefreshCcw className="mr-2 h-4 w-4" /> Retry Handshake
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full border-2 font-black uppercase text-[10px] tracking-widest h-14 rounded-2xl transition-all hover:bg-slate-50 dark:hover:bg-slate-900">
                Return Base
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default async function SeekerDashboard() {
  try {
    // 1. Supabase Session Handshake (Critical)
    const supabase = await createClient();
    const { dataSession, errorSession } = await (async () => {
       try {
         const { data: { user } } = await supabase.auth.getUser();
         return { dataSession: user, errorSession: null };
       } catch (e: any) {
         return { dataSession: null, errorSession: e };
       }
    })();

    if (!dataSession) {
      redirect("/login");
    }

    const user = dataSession;

    // 2. Data Retrieval Grid (Fault-Tolerant)
    try {
      const [savedData, bookingsData, profileData] = await Promise.all([
        getSavedListings().catch(() => ({ data: [] })),
        getSeekerBookings().catch(() => ({ data: [] })),
        dbCall(async (db) => {
           return await db.profile.findUnique({ where: { supabaseId: user.id } });
        }, "Dashboard Profile Fetch").catch(() => ({ data: null }))
      ]);

      const profile = profileData?.data || profileData; // Handle both direct and wrapped returns

      // If we have a profile, we render the full dashboard
      if (profile) {
        return (
          <SeekerDashboardContent 
            initialProfile={profile}
            initialSaved={savedData?.data || []}
            initialBookings={bookingsData?.data || []}
          />
        );
      }
      
      // Fallback for Missing Profile in DB
      return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-slate-900">Welcome, {user.email?.split('@')[0]}!</h1>
            <p className="text-slate-500">Your dashboard is initializing. Please complete your registration.</p>
            <Link href="/register">
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">Complete Setup</Button>
            </Link>
          </div>
        </div>
      );

    } catch (dbError) {
      console.error("[DASHBOARD DATABASE ERROR]:", dbError);
      // Requested Fallback UI for Database Errors
      return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Welcome!</h1>
            <p className="text-slate-500">Your dashboard is loading... Please refresh in a moment.</p>
            <Button variant="ghost" className="mt-4 animate-pulse">
              Syncing with secure grid...
            </Button>
          </div>
        </div>
      );
    }
  } catch (globalError: any) {
    if (globalError?.digest?.includes("NEXT_REDIRECT")) throw globalError;
    console.error("[DASHBOARD GLOBAL FATAL]:", globalError);
    return redirect("/login");
  }
}
