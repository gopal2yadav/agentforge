export const dynamic = 'force-dynamic';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { DashboardClient } from '@/components/dashboard/dashboard-client';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');
  let user = await db.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    const { currentUser } = await import('@clerk/nextjs/server');
    const c = await currentUser();
    user = await db.user.create({ data: { clerkId: userId, email: c?.emailAddresses[0]?.emailAddress||'', name: c?.fullName||'User', imageUrl: c?.imageUrl } });
  }
  const [ac,fc,re] = await Promise.all([db.agent.count({where:{userId:user.id}}),db.flow.count({where:{userId:user.id}}),db.execution.findMany({where:{userId:user.id},orderBy:{startedAt:'desc'},take:10,include:{agent:{select:{name:true}}}})]);
  return <DashboardClient user={{name:user.name||'User',plan:user.plan,tokensUsed:user.tokensUsed,tokensLimit:user.tokensLimit}} stats={{agents:ac,flows:fc,executions:re.length,tokensToday:re.reduce((s,e)=>s+e.tokensUsed,0)}} recentExecutions={re.map(e=>({id:e.id,agentName:e.agent?.name||'Direct',status:e.status,tokensUsed:e.tokensUsed,latencyMs:e.latencyMs,startedAt:e.startedAt.toISOString()}))}/>;
}
