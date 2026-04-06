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
    try {
      // 1. Construct Where clause with standard Array-based AND structure for stability
      const andConditions: any[] = [{ status: "APPROVED" }];

      if (type && type !== 'ALL') {
        andConditions.push({ type: type });
      }

      if (location) {
        andConditions.push({ 
          OR: [
            { address: { contains: location, mode: 'insensitive' } },
            { title: { contains: location, mode: 'insensitive' } }
          ]
        });
      }

      if (minPrice || maxPrice) {
        andConditions.push({
          price: {
            gte: Number(minPrice) || 0,
            lte: Number(maxPrice) || 1000000
          }
        });
      }

      if (amenities && amenities.length > 0) {
        amenities.forEach(amenity => {
          andConditions.push({
            amenities: { contains: amenity, mode: 'insensitive' }
          });
        });
      }

      const where = { AND: andConditions };

      // 2. Execute Query with performance tracking
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
    } catch (innerError: any) {
      console.error("[SEARCH INDEX ENGINE CRASH]:", innerError);
      throw innerError; // Rethrow to let dbCall handle it with context
    }
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
