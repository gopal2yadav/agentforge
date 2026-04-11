export const dynamic = 'force-dynamic';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { MemoryClient } from '@/components/dashboard/memory-client';

export default async function MemoryPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect('/sign-in');
  const memories = await db.memory.findMany({ where: { userId: user.id }, orderBy: { updatedAt: 'desc' }, take: 50 });
  return <MemoryClient memories={memories.map(m=>({id:m.id,scope:m.scope,content:m.content,importance:m.importance,accessCount:m.accessCount,updatedAt:m.updatedAt.toISOString()}))}/>;
}
