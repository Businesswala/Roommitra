import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const counts = await prisma.listing.groupBy({
      by: ['status'],
      _count: { id: true }
    });
    console.log("STATUS COUNTS:", JSON.stringify(counts, null, 2));
    
    // Auto-approve everything for the demo stabilization
    const result = await prisma.listing.updateMany({
      data: { status: 'APPROVED' }
    });
    console.log("APPROVE RESULT:", result.count);
  } catch (error) {
    console.error("DB ERROR:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
