'use server'

import { dbCall } from "@/lib/db-utils"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server";

export async function getListings(type?: string) {
  return await dbCall(async (db) => {
    return await db.listing.findMany({
      where: {
        type: type ? type : undefined,
        status: "APPROVED"
      },
      orderBy: { createdAt: 'desc' },
      include: {
        reviews: true,
        lister: {
          select: { name: true }
        }
      }
    });
  }, "Fetching all listings");
}

export async function createListing(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "You must be logged in to post a listing." };
  }

  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  
  const result = await dbCall(async (db) => {
    const profile = await db.profile.findUnique({
      where: { supabaseId: user.id },
    });

    if (!profile) {
      throw new Error("Profile not found. Please complete your registration.");
    }

    return await db.listing.create({
      data: {
        title,
        type,
        price,
        description,
        address,
        listerId: profile.id,
        amenities: "[]",
        images: "[]",
        status: "PENDING" // Reverted to PENDING for Admin Moderation
      }
    });
  }, "Creating new listing");

  if (!result.error) {
    revalidatePath("/explore");
    revalidatePath("/lister/dashboard");
  }

  return result;
}

/**
 * Fetch stats for the logged-in lister
 */
export async function getListerStats() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Unauthorized" };

  return await dbCall(async (db) => {
    const profile = await db.profile.findUnique({
      where: { supabaseId: user.id },
      include: {
        _count: {
          select: { listings: true }
        }
      }
    });

    if (!profile) throw new Error("Profile not found.");

    const listings = await db.listing.findMany({
      where: { listerId: profile.id },
      select: { status: true }
    });

    const activeCount = listings.filter(l => l.status === "APPROVED").length;
    const pendingCount = listings.filter(l => l.status === "PENDING").length;

    return {
      active: activeCount,
      pending: pendingCount,
      total: listings.length,
      status: profile.status
    };
  }, "Fetching lister dashboard stats");
}

/**
 * Fetch all listings for the logged-in lister
 */
export async function getListerListings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Unauthorized" };

  return await dbCall(async (db) => {
    const profile = await db.profile.findUnique({
      where: { supabaseId: user.id }
    });

    if (!profile) throw new Error("Profile not found.");

    return await db.listing.findMany({
      where: { listerId: profile.id },
      orderBy: { createdAt: 'desc' }
    });
  }, "Fetching lister's own listings");
}

/**
 * ADMIN ONLY: Fetch all pending listings
 */
export async function getPendingListings() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Security Layer (Simplified for demo)
  if (!user) return { data: null, error: "Unauthorized" };

  return await dbCall(async (db) => {
    return await db.listing.findMany({
      where: { status: "PENDING" },
      include: {
        lister: {
          select: { name: true, businessName: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }, "Fetching pending moderation queue");
}

/**
 * ADMIN ONLY: Update listing status
 */
export async function updateListingStatus(listingId: string, status: "APPROVED" | "REJECTED") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Unauthorized" };

  const result = await dbCall(async (db) => {
    return await db.listing.update({
      where: { id: listingId },
      data: { status }
    });
  }, `Moderation: setting ${listingId} to ${status}`);

  if (!result.error) {
    revalidatePath("/explore");
    revalidatePath("/admin/dashboard/approvals");
    revalidatePath("/lister/dashboard");
  }

  return result;
}

/**
 * Fetch a single listing with full details and lister info
 */
export async function getListingById(id: string) {
  return await dbCall(async (db) => {
    return await db.listing.findUnique({
      where: { id },
      include: {
        lister: {
          select: { 
            id: true,
            name: true, 
            businessName: true, 
            profilePhoto: true, 
            createdAt: true 
          }
        },
        reviews: {
          include: {
            user: {
              select: { name: true, profilePhoto: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }, `Fetching listing detail: ${id}`);
}
