import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ datasourceUrl: "file:./dev.db" });
async function main() {
  const users = await prisma.lister.findMany();
  console.log(users);
}
main();
