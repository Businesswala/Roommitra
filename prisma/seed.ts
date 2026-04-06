import path from 'path'
import dotenv from 'dotenv'

// 1. LOAD ENVIRONMENT FIRST (Bulletproof for CLI)
const envPath = path.join(__dirname, '../.env')
dotenv.config({ path: envPath })

// 2. DIAGNOSTICS
console.log('--- SEED DIAGNOSTICS ---');
console.log('DATABASE_URL Found:', !!process.env.DATABASE_URL);

// 3. IMPORT CLIENT & TYPES
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- SEEDING ROOMMITRA DATABASE ---')

  // 1. Create Demo Lister
  const lister = await prisma.profile.upsert({
    where: { email: 'lister@roommitra.in' },
    update: {},
    create: {
      supabaseId: 'demo-lister-uuid-12345',
      email: 'lister@roommitra.in',
      name: 'Rajesh Kumar',
      mobile: '9876543210',
      role: 'LISTER',
      businessName: 'Kumar Properties & Services',
      status: 'ACTIVE',
      profilePhoto: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop'
    }
  })

  console.log(`✅ Demo Lister Created: ${lister.name}`)

  const listings = [
    // 🏠 ROOMS (4)
    {
      title: "Cozy Single Room near MG Road",
      type: "ROOM",
      price: 12000,
      description: "Well-ventilated single room with balcony. Perfect for working professionals. 5 mins walk from Metro.",
      address: "MG Road, Victoria Layout, Bangalore",
      latitude: 12.9716,
      longitude: 77.5946,
      amenities: JSON.stringify(["WiFi", "Attached Washroom", "Power Backup", "CCTV"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"])
    },
    {
      title: "Premium Couple Room in Koramangala",
      type: "ROOM",
      price: 18000,
      description: "Spacious room with modular wardrobe and king-size bed. High-speed internet included.",
      address: "Koramangala 4th Block, Bangalore",
      latitude: 12.9352,
      longitude: 77.6245,
      amenities: JSON.stringify(["AC", "Geyser", "WiFi", "Queen Bed", "Lift"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"])
    },
    {
      title: "Budget Room for Students - Indiranagar",
      type: "ROOM",
      price: 8500,
      description: "Affordable room with essential furniture. Close to coaching centers and food courts.",
      address: "Indiranagar 100ft Road, Bangalore",
      latitude: 12.9784,
      longitude: 77.6408,
      amenities: JSON.stringify(["Bed", "Study Table", "Cleaning included"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"])
    },
    {
      title: "Luxury Suite - Whitefield",
      type: "ROOM",
      price: 25000,
      description: "Hotel-style luxury room with housekeeping. Ideal for IT consultants.",
      address: "Whitefield ITPL Main Rd, Bangalore",
      latitude: 12.9698,
      longitude: 77.7499,
      amenities: JSON.stringify(["Gym Access", "Pool", "Car Parking", "Fully Furnished"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1598928506311-c55dd1b311fc?w=800"])
    },

    // 🏘️ PGs (4)
    {
      title: "Zolo Stays - Men's Luxury PG",
      type: "PG",
      price: 14000,
      description: "Fully managed coliving space. Includes 3 meals, cleaning, and laundry.",
      address: "HSR Layout Sector 2, Bangalore",
      latitude: 12.9128,
      longitude: 77.6388,
      amenities: JSON.stringify(["Mess", "Laundry", "Gaming Zone", "Biometric Access"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1555854817-5b2260d1bd63?w=800"])
    },
    {
      title: "Safe Haven - Women's PG",
      type: "PG",
      price: 11000,
      description: "Secure and hygienic PG for women. 24/7 security and warden presence.",
      address: "BTM Layout 2nd Stage, Bangalore",
      latitude: 12.9165,
      longitude: 77.6101,
      amenities: JSON.stringify(["High Security", "Vegetarian Food", "Common Area", "TV"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800"])
    },
    {
      title: "Campus Living - Shared PG",
      type: "PG",
      price: 7000,
      description: "Ideal for students on a budget. 3-sharing rooms with good environment.",
      address: "Bannerghatta Road, Bangalore",
      latitude: 12.8955,
      longitude: 77.6011,
      amenities: JSON.stringify(["Shared Kitchen", "Drinking Water", "Fan", "In-house Cook"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800"])
    },
    {
      title: "Executive Coliving - Electronic City",
      type: "PG",
      price: 16000,
      description: "Private pods for tech professionals. Ultra-fast WiFi and working desks.",
      address: "Electronic City Phase 1, Bangalore",
      latitude: 12.8487,
      longitude: 77.6599,
      amenities: JSON.stringify(["Workpods", "Terrace Garden", "Cleaning", "UPS"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800"])
    },

    // 👥 ROOMMATES (4)
    {
      title: "Looking for Roommate in 2BHK Flat",
      type: "ROOMMATE",
      price: 14500,
      description: "Chill roommate needed for a semi-furnished flat. No restrictions, just be clean.",
      address: "Bellandur, Outer Ring Road, Bangalore",
      latitude: 12.9260,
      longitude: 77.6762,
      amenities: JSON.stringify(["Kitchen Access", "Fridge", "Washing Machine"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800"])
    },
    {
      title: "Female Replacement - 3BHK",
      type: "ROOMMATE",
      price: 10000,
      description: "Single occupancy room available. Flat shared with 2 other friendly girls.",
      address: "Jayanagar 4th Block, Bangalore",
      latitude: 12.9250,
      longitude: 77.5897,
      amenities: JSON.stringify(["Shared Hall", "Society Gym", "Security"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800"])
    },
    {
      title: "Roommate for Penthouse - Sarjapur",
      type: "ROOMMATE",
      price: 22000,
      description: "Looking for a working professional to share a beautiful penthouse. Spectacular view.",
      address: "Sarjapur Road, Bangalore",
      latitude: 12.9080,
      longitude: 77.6850,
      amenities: JSON.stringify(["Parking", "AC", "Large Terrace"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"])
    },
    {
      title: "Shared Occupancy in 1BHK",
      type: "ROOMMATE",
      price: 6000,
      description: "Sharing the room with one other person. Compact but efficient.",
      address: "Majestic, Bangalore",
      latitude: 12.9767,
      longitude: 77.5713,
      amenities: JSON.stringify(["Wardrobe", "Central Location"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800"])
    },

    // 🍱 TIFFIN SERVICES (4)
    {
      title: "Ghar Ki Rasoi - North Indian Tiffin",
      type: "TIFFIN",
      price: 3500,
      description: "Hygienic and healthy North Indian meals. 2 Rotis, Daal, Sabzi, Rice, Pickle.",
      address: "Delivery within HSR Layout",
      latitude: 12.9128,
      longitude: 77.6388,
      amenities: JSON.stringify(["Daily Delivery", "Pure Veg", "Eco-Friendly Packaging"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"])
    },
    {
      title: "Spicy South - Executive Meals",
      type: "TIFFIN",
      price: 4500,
      description: "Premium South Indian thali delivered to your door. Authentic taste guaranteed.",
      address: "Delivery across Koramangala",
      latitude: 12.9352,
      longitude: 77.6245,
      amenities: JSON.stringify(["Varied Menu", "Reusable Containers", "Lunch Only"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800"])
    },
    {
      title: "Healthy Bites - Custom Nutrients",
      type: "TIFFIN",
      price: 6000,
      description: "Diet-focused meals. High protein, low carb options available.",
      address: "Whitefield, Bangalore",
      latitude: 12.9698,
      longitude: 77.7499,
      amenities: JSON.stringify(["Dietitian Verified", "Breakfast + Dinner"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800"])
    },
    {
      title: "Homely Tiffins - Budget Choice",
      type: "TIFFIN",
      price: 2800,
      description: "Simple home-cooked meals for students. Most affordable in the area.",
      address: "AECS Layout, Bangalore",
      latitude: 12.9599,
      longitude: 77.7126,
      amenities: JSON.stringify(["Student Discount", "Freshly Cooked"]),
      images: JSON.stringify(["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800"])
    }
  ]

  console.log(`🚀 Starting Seeding of 16 Properties...`)

  for (const item of listings) {
    await prisma.listing.create({
      data: {
        ...item,
        listerId: lister.id,
        status: "APPROVED" // Seeded data is pre-approved for immediate display
      }
    })
  }

  console.log('✅ Seeding Complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
