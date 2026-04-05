const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres:Shingad%409935@db.wmnoeeukegrkedmrnhrd.supabase.co:5432/postgres"
    }
  }
});

async function main() {
  console.log('--- SEEDING ROOMMITRA DATABASE (JS MODE) ---');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'FOUND' : 'MISSING');

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
  });

  const listings = [
    { title: "Cozy Single Room near MG Road", type: "ROOM", price: 12000, description: "Well-ventilated single room with balcony. Perfect for working professionals.", address: "MG Road, Victoria Layout, Bangalore", latitude: 12.9716, longitude: 77.5946, amenities: JSON.stringify(["WiFi", "Attached Washroom", "Power Backup"]), images: JSON.stringify(["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]) },
    { title: "Premium Couple Room in Koramangala", type: "ROOM", price: 18000, description: "Spacious room with modular wardrobe and king-size bed.", address: "Koramangala 4th Block, Bangalore", latitude: 12.9352, longitude: 77.6245, amenities: JSON.stringify(["AC", "Geyser", "WiFi"]), images: JSON.stringify(["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"]) },
    { title: "Budget Room for Students - Indiranagar", type: "ROOM", price: 8500, description: "Affordable room with essential furniture.", address: "Indiranagar 100ft Road, Bangalore", latitude: 12.9784, longitude: 77.6408, amenities: JSON.stringify(["Bed", "Study Table"]), images: JSON.stringify(["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"]) },
    { title: "Luxury Suite - Whitefield", type: "ROOM", price: 25000, description: "Hotel-style luxury room with housekeeping.", address: "Whitefield ITPL Main Rd, Bangalore", latitude: 12.9698, longitude: 77.7499, amenities: JSON.stringify(["Gym Access", "Pool"]), images: JSON.stringify(["https://images.unsplash.com/photo-1598928506311-c55dd1b311fc?w=800"]) },
    { title: "Zolo Stays - Men's Luxury PG", type: "PG", price: 14000, description: "Fully managed coliving space.", address: "HSR Layout Sector 2, Bangalore", latitude: 12.9128, longitude: 77.6388, amenities: JSON.stringify(["Mess", "Laundry"]), images: JSON.stringify(["https://images.unsplash.com/photo-1555854817-5b2260d1bd63?w=800"]) },
    { title: "Safe Haven - Women's PG", type: "PG", price: 11000, description: "Secure and hygienic PG for women.", address: "BTM Layout 2nd Stage, Bangalore", latitude: 12.9165, longitude: 77.6101, amenities: JSON.stringify(["High Security", "Veg Food"]), images: JSON.stringify(["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800"]) },
    { title: "Campus Living - Shared PG", type: "PG", price: 7000, description: "Ideal for students on a budget.", address: "Bannerghatta Road, Bangalore", latitude: 12.8955, longitude: 77.6011, amenities: JSON.stringify(["Shared Kitchen", "Drinking Water"]), images: JSON.stringify(["https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800"]) },
    { title: "Executive Coliving - Electronic City", type: "PG", price: 16000, description: "Private pods for tech professionals.", address: "Electronic City Phase 1, Bangalore", latitude: 12.8487, longitude: 77.6599, amenities: JSON.stringify(["Workpods", "Terrace"]), images: JSON.stringify(["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800"]) },
    { title: "Looking for Roommate in 2BHK Flat", type: "ROOMMATE", price: 14500, description: "Chill roommate needed.", address: "Bellandur, Bangalore", latitude: 12.926, longitude: 77.6762, amenities: JSON.stringify(["Kitchen", "Fridge"]), images: JSON.stringify(["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800"]) },
    { title: "Female Replacement - 3BHK", type: "ROOMMATE", price: 10000, description: "Single occupancy room.", address: "Jayanagar, Bangalore", latitude: 12.925, longitude: 77.5897, amenities: JSON.stringify(["Gym", "Security"]), images: JSON.stringify(["https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800"]) },
    { title: "Roommate for Penthouse - Sarjapur", type: "ROOMMATE", price: 22000, description: "Penthouse share.", address: "Sarjapur Road, Bangalore", latitude: 12.908, longitude: 77.685, amenities: JSON.stringify(["Parking", "AC"]), images: JSON.stringify(["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"]) },
    { title: "Shared Occupancy in 1BHK", type: "ROOMMATE", price: 6000, description: "Shared living.", address: "Majestic, Bangalore", latitude: 12.9767, longitude: 77.5713, amenities: JSON.stringify(["Central Location"]), images: JSON.stringify(["https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800"]) },
    { title: "Ghar Ki Rasoi - North Indian Tiffin", type: "TIFFIN", price: 3500, description: "Healthy tiffin.", address: "HSR Layout, Bangalore", latitude: 12.9128, longitude: 77.6388, amenities: JSON.stringify(["Veg", "Delivery"]), images: JSON.stringify(["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"]) },
    { title: "Spicy South - Executive Meals", type: "TIFFIN", price: 4500, description: "South Indian thali.", address: "Koramangala, Bangalore", latitude: 12.9352, longitude: 77.6245, amenities: JSON.stringify(["Varied Menu"]), images: JSON.stringify(["https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800"]) },
    { title: "Healthy Bites - Custom Nutrients", type: "TIFFIN", price: 6000, description: "Diet focused.", address: "Whitefield, Bangalore", latitude: 12.9698, longitude: 77.7499, amenities: JSON.stringify(["Protein Low Carb"]), images: JSON.stringify(["https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800"]) },
    { title: "Homely Tiffins - Budget Choice", type: "TIFFIN", price: 2800, description: "Home cooked tiffin.", address: "AECS Layout, Bangalore", latitude: 12.9599, longitude: 77.7126, amenities: JSON.stringify(["Student Discount"]), images: JSON.stringify(["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800"]) }
  ];

  for (const item of listings) {
    await prisma.listing.create({
      data: {
        ...item,
        listerId: lister.id,
        status: "APPROVED"
      }
    });
  }

  console.log('✅ Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
