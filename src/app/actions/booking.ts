'use server'

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


import { dbCall } from "@/lib/db-utils"
import { revalidatePath } from "next/cache"


/**
 * Seeker: Request a booking for a listing
 */
export async function requestBooking(listingId: string, amount: number) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) return { data: null, error: "Unauthorized" };

  const result = await dbCall(async (db) => {
    const profile = await db.profile.findUnique({
      where: { id: user.id }
    });

    if (!profile) throw new Error("Profile not found.");

    // 1. Create the booking record
    const booking = await db.booking.create({
      data: {
        userId: profile.id,
        listingId,
        amount,
        date: new Date(),
        status: "PENDING"
      }
    });

    // 2. Create the associated payment ledger entry (PENDING)
    await db.paymentLedger.create({
      data: {
        bookingId: booking.id,
        transactionHash: `MOCK_TX_${booking.id}_${Date.now()}`,
        grossAmount: amount,
        platformFee: amount * 0.05, // Mock 5% fee
        netToLister: amount * 0.95,
        gatewayStatus: "PENDING"
      }
    });

    return booking;
  }, "Requesting booking");

  if (!result.error) {
    revalidatePath("/user/dashboard");
    revalidatePath("/lister/dashboard");
  }
  return result;
}

/**
 * Lister: Approve or Reject a booking request
 */
export async function updateBookingStatus(bookingId: string, status: "CONFIRMED" | "CANCELLED") {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) return { data: null, error: "Unauthorized" };

  const result = await dbCall(async (db) => {
    // Basic verification: user is legitimate (In prod, verify lister ownership)
    const booking = await db.booking.update({
      where: { id: bookingId },
      data: { 
        status,
        payment: {
          update: {
            gatewayStatus: status === "CONFIRMED" ? "SUCCEEDED" : "FAILED"
          }
        }
      }
    });

    return booking;
  }, `Lister: setting booking ${bookingId} to ${status}`);

  if (!result.error) {
    revalidatePath("/user/dashboard");
    revalidatePath("/lister/dashboard");
    revalidatePath("/admin/payments");
  }
  return result;
}