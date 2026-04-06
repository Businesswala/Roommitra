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
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  try {
    // Fetch real data for the dashboard with parallel promise execution
    const [savedData, bookingsData, profileData] = await Promise.all([
      getSavedListings().catch(e => ({ data: [], error: e.message })),
      getSeekerBookings().catch(e => ({ data: [], error: e.message })),
      dbCall(async (db) => {
         return await db.profile.findUnique({ where: { supabaseId: user.id } });
      }, "Fetching user profile").catch(e => ({ data: null, error: e.message }))
    ]);

    const savedListings = savedData.data || [];
    const bookings = bookingsData.data || [];
    const profile = profileData.data;

    // Handle missing profile - redirect to registration for a fresh user
    if (!profile && !profileData.error) {
      redirect("/register");
    }

    // If there was a hard database error, we show the ErrorState
    if (profileData.error) {
      return <ErrorState message={profileData.error} />;
    }

    // Absolute fallback: provide a mock "Safe Profile" if everything else fails 
    // but we have a user session. This prevents a 500 crash on render.
    const safeProfile = profile || {
      name: user.email?.split("@")[0] || "User",
      email: user.email,
      mobile: "Not Provided",
      createdAt: new Date().toISOString(),
      role: "SEEKER"
    };

    return (
      <SeekerDashboardContent 
        initialProfile={safeProfile}
        initialSaved={savedListings}
        initialBookings={bookings}
      />
    );
  } catch (error: any) {
    console.error("[CRITICAL DASHBOARD ERROR]:", error);
    return <ErrorState message={error.message || "An unexpected system fault occurred."} />;
  }
}
