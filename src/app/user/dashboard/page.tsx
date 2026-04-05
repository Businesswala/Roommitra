import { getSavedListings, getSeekerBookings } from "@/app/actions/user";
import { SeekerDashboardContent } from "@/app/user/dashboard/SeekerDashboardContent";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { dbCall } from "@/lib/db-utils";

export default async function SeekerDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch real data for the dashboard
  const [savedData, bookingsData, profileData] = await Promise.all([
    getSavedListings(),
    getSeekerBookings(),
    dbCall(async (db) => {
       return await db.profile.findUnique({ where: { supabaseId: user.id } });
    }, "Fetching user profile")
  ]);

  const savedListings = savedData.data || [];
  const bookings = bookingsData.data || [];
  const profile = profileData.data;

  if (!profile) {
    redirect("/register");
  }

  return (
    <SeekerDashboardContent 
      initialProfile={profile}
      initialSaved={savedListings}
      initialBookings={bookings}
    />
  );
}
