import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Rate Limiting ───────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

// ─── Plan Limits ─────────────────────────────────────────────
export const PLAN_LIMITS = {
  FREE: {
    agents: 3,
    flows: 2,
    tokensPerMonth: 100_000,
    apiCallsPerDay: 50,
    models: ['claude-sonnet-4-20250514', 'gpt-4o-mini'],
  },
  PRO: {
    agents: 25,
    flows: 20,
    tokensPerMonth: 10_000_000,
    apiCallsPerDay: 5000,
    models: ['claude-sonnet-4-20250514', 'claude-opus-4-20250514', 'gpt-4o', 'gpt-4o-mini', 'llama-3.3-70b-versatile'],
  },
  ENTERPRISE: {
    agents: Infinity,
    flows: Infinity,
    tokensPerMonth: Infinity,
    apiCallsPerDay: Infinity,
    models: ['claude-sonnet-4-20250514', 'claude-opus-4-20250514', 'gpt-4o', 'gpt-4o-mini', 'llama-3.3-70b-versatile'],
  },
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;

// ─── Auth Helper ─────────────────────────────────────────────
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function getOrCreateUser() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  let user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    const clerkUser = await currentUser();
    user = await db.user.create({
      data: {
        clerkId: userId,
        email: clerkUser?.emailAddresses[0]?.emailAddress || '',
        name: clerkUser?.fullName || clerkUser?.firstName || 'User',
        imageUrl: clerkUser?.imageUrl,
      },
    });
  }
  return user;
}
