import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export const PLAN_LIMITS = {
  FREE: { agents: 3, flows: 2, tokensPerMonth: 100000, apiCallsPerDay: 50 },
  PRO: { agents: 25, flows: 20, tokensPerMonth: 10000000, apiCallsPerDay: 5000 },
  ENTERPRISE: { agents: 999, flows: 999, tokensPerMonth: 999999999, apiCallsPerDay: 999999 },
} as const;

export async function getOrCreateUser(clerkId: string, email: string, name?: string | null, imageUrl?: string | null) {
  const { db } = await import('@/lib/db');
  let user = await db.user.findUnique({ where: { clerkId } });
  if (!user) {
    user = await db.user.create({ data: { clerkId, email, name: name || email.split('@')[0], imageUrl } });
  }
  return user;
}

export function rateLimit(userId: string, limit: number): boolean {
  // Simple in-memory rate limiter (resets on deploy)
  return true; // TODO: implement with Redis
}
