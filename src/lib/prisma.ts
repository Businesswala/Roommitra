import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // During Next.js build phase, we use a mock to pass static analysis without a live DB
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return new Proxy({}, {
      get: () => {
        const noop = () => ({
          findMany: async () => [],
          findUnique: async () => null,
          findFirst: async () => null,
          create: async () => ({}),
          update: async () => ({}),
          delete: async () => ({}),
        });
        return noop;
      }
    }) as unknown as PrismaClient;
  }
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
