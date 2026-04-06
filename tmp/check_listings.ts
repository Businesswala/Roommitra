import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

async function main() {
  const prisma = new PrismaClient()
  try {
    const listings = await prisma.listing.findMany({
      select: {
        id: true,
        title: true,
        status: true
      },
      take: 20
    })
    console.log("LISTINGS COUNT:", listings.length)
    console.log("LISTINGS:", JSON.stringify(listings, null, 2))
  } catch (error) {
    console.error("ERROR:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
