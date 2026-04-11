import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient() {
  try {
    if (!process.env.POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
      console.warn('[Nexus] No database URL configured. Using mock mode.');
      return null;
    }
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    });
  } catch (e) {
    console.error('[Nexus] Failed to create Prisma client:', e);
    return null;
  }
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production' && db) {
  globalForPrisma.prisma = db;
}

// Helper to check if database is available
export function isDatabaseConnected(): boolean {
  return db !== null && db !== undefined;
}
