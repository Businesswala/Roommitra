'use server'

import { dbCall } from "@/lib/db-utils"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server";

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
      revenue: totalRevenue._sum.grossAmount || 0,
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
