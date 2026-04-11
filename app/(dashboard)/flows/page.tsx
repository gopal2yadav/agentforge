import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { FlowsClient } from '@/components/flows/flows-client';

export default async function FlowsPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  const user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) redirect('/sign-in');
  const flows = await db.flow.findMany({ where: { userId: user.id }, orderBy: { updatedAt: 'desc' }, include: { nodes: { select: { id: true, type: true } } } });
  return <FlowsClient flows={flows.map(f=>({id:f.id,name:f.name,description:f.description||'',status:f.status,nodeCount:f.nodes.length,agentCount:f.nodes.filter(n=>n.type==='agent').length,totalRuns:f.totalRuns,updatedAt:f.updatedAt.toISOString()}))} plan={user.plan}/>;
}
