'use server'

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


import { dbCall } from "@/lib/db-utils"
import { revalidatePath } from "next/cache"


/**
 * Fetch top-level system statistics for the admin dashboard
 */
export async function getSystemStats() {
  return await dbCall(async (db) => {
    const [userCount, listingCount, bookingCount, totalRevenue] = await Promise.all([
      db.profile.count(),
      db.listing.count({ where: { status: "APPROVED" } }),
      db.booking.count(),
      db.paymentLedger.aggregate({
        _sum: {
          grossAmount: true
        }
      })
    ]);

    return {
      users: userCount,
      listings: listingCount,
      bookings: bookingCount,
      revenue: (totalRevenue as any)?._sum?.grossAmount || 0,
      timestamp: new Date().toISOString()
    };
  }, "Fetching system stats");
}

/**
 * Fetch monthly growth data for charts (Last 6 months)
 */
export async function getGrowthData() {
  return await dbCall(async (db) => {
    // Simulated Time-series aggregation logic (Simplified for SQL compatibility)
    // In a real prod setup, iterate months or use groupBY date functions
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map((m, i) => ({
      name: m,
      bookings: 100 + (i * 25), // Mocked for now, easily replaced with real range queries
      revenue: 5000 + (i * 1500)
    }));
  }, "Fetching growth analytics data");
}

/**
 * Fetch all platform users
 */
export async function getAllUsers() {
  return await dbCall(async (db) => {
    return await db.profile.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { listings: true, bookings: true }
        }
      }
    });
  }, "Fetching user governance list");
}

/**
 * Update user status or role
 */
export async function updateUserStatus(profileId: string, status?: string, role?: any) {
  const result = await dbCall(async (db) => {
    return await db.profile.update({
      where: { id: profileId },
      data: { 
        status: status || undefined,
        role: role || undefined
      }
    });
  }, `Updating user ${profileId}`);

  if (!result.error) {
    revalidatePath("/admin/dashboard/users");
  }
  return result;
}

/**
 * Fetch all financial ledger entries
 */
export async function getFinancialLedger() {
  return await dbCall(async (db) => {
    return await db.paymentLedger.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        booking: {
          include: {
            user: true,
            listing: true
          }
        }
      }
    });
  }, "Fetching financial ledger");
}

/**
 * Manage promotional offers (CRUD)
 */
export async function manageOffer(data: any) {
  const result = await dbCall(async (db) => {
    if (data.id) {
      return await db.offer.update({
        where: { id: data.id },
        data
      });
    }
    return await db.offer.create({ data });
  }, "Managing platform offer");
  
  if (!result.error) revalidatePath("/admin/dashboard/marketing");
  return result;
}

/**
 * Dispatch system-wide notification
 */
export async function sendNotification(data: { title: string, body: string, target: string }) {
  const result = await dbCall(async (db) => {
    return await db.notification.create({ data });
  }, "Dispatching system notification");

  if (!result.error) revalidatePath("/admin/dashboard/marketing");
  return result;
}

/**
 * Fetch all listings (Properties) for moderation
 */
export async function getAllListings() {
  return await dbCall(async (db) => {
    return await db.listing.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        lister: true,
        _count: { select: { reviews: true, bookings: true } }
      }
    });
  }, "Fetching all listings");
}

/**
 * Update listing status (Approve/Reject)
 */
export async function updateListingStatus(listingId: string, status: string) {
  const result = await dbCall(async (db) => {
    return await db.listing.update({
      where: { id: listingId },
      data: { status }
    });
  }, `Updating listing ${listingId} to ${status}`);

  if (!result.error) revalidatePath("/admin/properties");
  return result;
}

/**
 * Fetch all system bookings
 */
export async function getAllBookings() {
  return await dbCall(async (db) => {
    return await db.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        listing: { include: { lister: true } },
        payment: true
      }
    });
  }, "Fetching all bookings");
}

/**
 * Fetch all platform reviews
 */
export async function getAllReviews() {
  return await dbCall(async (db) => {
    return await db.review.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        listing: true
      }
    });
  }, "Fetching all reviews");
}

/**
 * Fetch platform-provided services
 */
export async function getPlatformServices() {
  return await dbCall(async (db) => {
     return await db.service.findMany({
       orderBy: { createdAt: 'desc' }
     });
  }, "Fetching platform services");
}