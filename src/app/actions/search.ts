'use server'

import { dbCall } from "@/lib/db-utils"

interface SearchParams {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  location?: string;
  limit?: number;
  offset?: number;
}

/**
 * Core Dynamic Search Engine
 */
export async function searchListings(params: SearchParams) {
  const { type, minPrice, maxPrice, amenities, location, limit = 12, offset = 0 } = params;

  return await dbCall(async (db) => {
    // 1. Construct Where clause
    const where: any = {
      status: "APPROVED" // Only show approved listings
    };

    if (type && type !== 'ALL') {
      where.type = type;
    }

    if (location) {
      where.address = { contains: location, mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
      where.price = {
        gte: minPrice || 0,
        lte: maxPrice || 1000000
      };
    }

    if (amenities && amenities.length > 0) {
      // Simple string match for mock consistency
      where.AND = amenities.map(amenity => ({
        amenities: { contains: amenity, mode: 'insensitive' }
      }));
    }

    // 2. Execute Query
    const [listings, total] = await Promise.all([
      db.listing.findMany({
        where,
        take: limit,
        skip: offset,
        include: {
          reviews: { select: { rating: true } },
          lister: { select: { name: true, profilePhoto: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      db.listing.count({ where })
    ]);

    // 3. Transform for UI (Calculate average rating)
    const items = listings.map(l => {
      const avgRating = l.reviews.length > 0 
        ? l.reviews.reduce((acc, curr) => acc + curr.rating, 0) / l.reviews.length 
        : 4.5; // Default for search aesthetic
        
      return {
        ...l,
        rating: parseFloat(avgRating.toFixed(1)),
        reviewCount: l.reviews.length
      };
    });

    return { items, total };
  }, "Executing Search Index Query");
}

/**
 * Fetch all properties for a specific provider
 */
export async function getListerPortfolio(listerId: string) {
  return await dbCall(async (db) => {
    return await db.listing.findMany({
      where: { 
        listerId,
        status: "APPROVED"
      },
      include: {
        reviews: { select: { rating: true } }
      }
    });
  }, "Fetching Lister Portfolio");
}
