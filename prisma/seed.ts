import 'dotenv/config'
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- SEEDING ROOMMITRA DEMO DATA ---')

  // 1. SEED PROFILES
  const admin = await (prisma as any).profile.upsert({
    where: { email: 'admin@roommitra.in' },
    update: {},
    create: {
      supabaseId: 'demo-admin-id',
      email: 'admin@roommitra.in',
      name: 'Super Admin',
      mobile: '9999999999',
      role: Role.ADMIN,
      status: 'ACTIVE',
    },
  })

  const lister1 = await (prisma as any).profile.upsert({
    where: { email: 'lister.koramangala@demo.com' },
    update: {},
    create: {
      supabaseId: 'demo-lister-1-id',
      email: 'lister.koramangala@demo.com',
      name: 'Rajesh Kumar',
      mobile: '9876543210',
      role: Role.LISTER,
      businessName: 'Premium Living Spaces',
      status: 'ACTIVE',
    },
  })

  const seeker1 = await (prisma as any).profile.upsert({
    where: { email: 'john.seeker@demo.com' },
    update: {},
    create: {
      supabaseId: 'demo-user-1-id',
      email: 'john.seeker@demo.com',
      name: 'John Doe',
      mobile: '9123456780',
      role: Role.USER,
      status: 'ACTIVE',
    },
  })

  console.log('Profiles seeded ✅')

  // 2. SEED LISTINGS
  const listing1 = await (prisma as any).listing.upsert({
    where: { id: 'demo-listing-1' },
    update: {},
    create: {
      id: 'demo-listing-1',
      listerId: lister1.id,
      title: 'Premium Single Room in Koramangala',
      type: 'ROOM',
      price: 12000,
      description: 'Luxury single occupancy room with attached washroom and high-speed Wi-Fi. Perfect for tech professionals.',
      address: 'Koramangala 4th Block, Bengaluru',
      amenities: JSON.stringify(['Wi-Fi', 'AC', 'Attached Washroom', 'CCTV']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop']),
      status: 'APPROVED',
    },
  })

  const listing2 = await (prisma as any).listing.upsert({
    where: { id: 'demo-listing-2' },
    update: {},
    create: {
      id: 'demo-listing-2',
      listerId: lister1.id,
      title: 'Home Style Veg Tiffin Service',
      type: 'TIFFIN',
      price: 2500,
      description: 'Healthy and hygienic North Indian veg meals delivered daily. Zero preservatives.',
      address: 'HSR Layout, Bengaluru',
      amenities: JSON.stringify(['Pure Veg', 'Freshly Cooked', 'Free Delivery']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop']),
      status: 'APPROVED',
    },
  })

  const listing3 = await (prisma as any).listing.upsert({
    where: { id: 'demo-listing-3' },
    update: {},
    create: {
      id: 'demo-listing-3',
      listerId: lister1.id,
      title: 'Tech Pro Roommate Wanted',
      type: 'ROOMMATE',
      price: 7500,
      description: 'Looking for a chill roommate for a 2BHK. Preferred: Working professionals in IT.',
      address: 'Indiranagar, Bengaluru',
      amenities: JSON.stringify(['Fully Furnished', 'Gym', 'Parking']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1543806296-6e3e5513ab7a?w=600&h=400&fit=crop']),
      status: 'APPROVED',
    },
  })

  const listing4 = await (prisma as any).listing.upsert({
    where: { id: 'demo-listing-4' },
    update: {},
    create: {
      id: 'demo-listing-4',
      listerId: lister1.id,
      title: 'Express Laundry & Dry Clean',
      type: 'LAUNDRY',
      price: 50,
      description: 'Premium laundry service with 24-hour turnaround time. Special care for delicate fabrics.',
      address: 'Whitefield, Bengaluru',
      amenities: JSON.stringify(['Pickup & Drop', 'Steam Iron', 'Eco-friendly Chemicals']),
      images: JSON.stringify(['https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&h=400&fit=crop']),
      status: 'APPROVED',
    },
  })

  console.log('Listings seeded ✅')

  // 3. SEED REVIEWS
  await (prisma as any).review.upsert({
    where: { id: 'demo-review-1' },
    update: {},
    create: {
      id: 'demo-review-1',
      userId: seeker1.id,
      listingId: listing1.id,
      rating: 5,
      content: 'Absolutely amazing place! The host is very helpful and the amenities are top-notch.',
    },
  })

  await (prisma as any).review.upsert({
    where: { id: 'demo-review-2' },
    update: {},
    create: {
      id: 'demo-review-2',
      userId: seeker1.id,
      listingId: listing2.id,
      rating: 4,
      content: 'The food tastes just like home. Highly recommended for students.',
    },
  })

  console.log('Reviews seeded ✅')

  // 4. SEED SERVICES
  await (prisma as any).service.upsert({
    where: { id: 'demo-service-1' },
    update: {},
    create: {
      id: 'demo-service-1',
      name: 'Premium Verification',
      description: 'Get an Official Roommitra Verified Badge for your profile.',
      price: 499,
      status: 'ACTIVE',
    },
  })

  console.log('Services seeded ✅')
  console.log('--- SEEDING COMPLETE ---')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
