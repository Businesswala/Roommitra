import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const mockPrisma = {
  profile: {
    create: async (args: any) => ({ id: '1', role: args.data?.role || 'USER', name: 'Test' }),
    findUnique: async () => ({ id: '1', role: 'USER', name: 'Test User' }),
  },
  listing: {
    findMany: async () => [],
  },
  booking: { findMany: async () => [] },
  review: { findMany: async () => [] },
  offer: { findMany: async () => [] },
  conversation: { findMany: async () => [] },
} as unknown as PrismaClient;

const prismaClientSingleton = () => mockPrisma;

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export const prisma = db;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
