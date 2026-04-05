'use server'

import { dbCall } from "@/lib/db-utils"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server";

/**
 * Fetch all listings favorited by the user
 */
export async function getSavedListings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Unauthorized" };

  return await dbCall(async (db) => {
    const profile = await db.profile.findUnique({
      where: { supabaseId: user.id },
      include: {
        reviews: true // Adjust as needed for favorites model if implemented
      }
    });

    if (!profile) throw new Error("Profile not found.");

    // For now, identifying saved listings as ones user has reviewed or interacted with
    // until a formal Favorites model is added.
    return await db.listing.findMany({
      where: { 
         reviews: { some: { userId: profile.id } }
      },
      include: { 
        reviews: true,
        lister: { select: { name: true } }
      }
    });
  }, "Fetching saved properties");
}

/**
 * Fetch all bookings made by the user
 */
export async function getSeekerBookings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Unauthorized" };

  return await dbCall(async (db) => {
    const profile = await db.profile.findUnique({
      where: { supabaseId: user.id }
    });

    if (!profile) throw new Error("Profile not found.");

    return await db.booking.findMany({
      where: { userId: profile.id },
      include: {
        listing: {
          include: { lister: { select: { name: true } } }
        },
        payment: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }, "Fetching seeker bookings");
}

/**
 * Update user profile metadata
 */
export async function updateProfile(data: { name?: string, mobile?: string }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Unauthorized" };

  const result = await dbCall(async (db) => {
    return await db.profile.update({
      where: { supabaseId: user.id },
      data
    });
  }, "Updating user profile");

  if (!result.error) {
    revalidatePath("/user/dashboard");
  }
  return result;
}
