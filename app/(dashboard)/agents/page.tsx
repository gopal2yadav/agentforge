import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { AgentsClient } from '@/components/agents/agents-client';

export default async function AgentsPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect('/sign-in');
  const agents = await db.agent.findMany({ where: { userId: user.id }, orderBy: { updatedAt: 'desc' } });
  return <AgentsClient agents={agents.map(a=>({id:a.id,name:a.name,role:a.role||'',description:a.description||'',model:a.model,provider:a.provider,status:a.status,totalRuns:a.totalRuns,successRate:a.totalRuns>0?Math.round(a.successCount/a.totalRuns*100):0,avgLatencyMs:a.avgLatencyMs,updatedAt:a.updatedAt.toISOString()}))} plan={user.plan}/>;
}
