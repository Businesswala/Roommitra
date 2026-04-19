"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SeekerDashboardContent } from "@/app/user/dashboard/SeekerDashboardContent";
import { getSavedListings, getSeekerBookings } from "@/app/actions/user";
import { GetProfileById } from "@/app/actions/auth";
import { useSession } from "next-auth/react";
/**
 * CLIENT-SIDE DASHBOARD (BYPASS SSR)
 * Rewritten as a strict client component to avoid server-side initialization faults.
 */
export default function SeekerDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();  
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [savedListings, setSavedListings] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startHandshake = async () => {
      try {
        // 1. Client-Side Auth Session
        const user = session?.user;
        
        if (!user) {
          router.push("/login");
          return;
        }

        setUser(user);

        // 2. Client-Side Data Retrieval
        const [profileData, savedData, bookingsData] = await Promise.all([
          GetProfileById(user.id).catch(() => null),
          getSavedListings().catch(() => ({ data: [] })),
          getSeekerBookings().catch(() => ({ data: [] }))
        ]);

        if (profileData) {
          setProfile(profileData);
        } else {
          // If no profile, redirect to registration
          router.push("/register");
          return;
        }

        setSavedListings(savedData?.data || []);
        setBookings(bookingsData?.data || []);

      } catch (error) {
        console.error("[CLIENT DASHBOARD ERROR]:", error);
      } finally {
        setLoading(false);
      }
    };

    startHandshake();
  }, [router]);

  // Requested Simple Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
          <p className="text-slate-500 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // Final Dashboard Render (Client Component)
  if (!user && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6 text-center">
        <div className="space-y-4">
          <p className="text-red-500 font-bold text-xl">Authentication Fault Detected</p>
          <p className="text-slate-500">No user data found in the session matrix. Please log in again.</p>
          <button 
            onClick={() => router.push("/login")}
            className="h-12 px-8 bg-blue-600 text-white rounded-xl font-bold"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <SeekerDashboardContent 
      initialProfile={profile}
      initialSaved={savedListings}
      initialBookings={bookings}
    />
  );
}
