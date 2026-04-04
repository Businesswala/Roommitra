import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.lister.deleteMany({});
  await prisma.lister.createMany({
    data: [
      { firstName: "Rahul", surname: "Sharma", dob: new Date("1990-01-01"), mobile1: "1234567890", email: "rahul@test.com", passwordHash: "dummy", address: "Koramangala", latitude: 12.9, longitude: 77.6, documentNo: "PAN123" },
      { firstName: "Priya", surname: "Patel", dob: new Date("1995-05-05"), mobile1: "0987654321", email: "priya@test.com", passwordHash: "dummy", address: "Indiranagar", latitude: 12.9, longitude: 77.6, documentNo: "AADHAR123" }
    ]
  });
  console.log("Seeded 2 dummy listers.");
}
main();
