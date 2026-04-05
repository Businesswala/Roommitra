import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Testing connection...')
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'PRESENT' : 'MISSING')
  const count = await prisma.profile.count()
  console.log('Profile count:', count)
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
