import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getOrCreateUser } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const user = await getOrCreateUser();
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const agentId = url.searchParams.get('agentId');
    const flowId = url.searchParams.get('flowId');

    const where: any = { userId: user.id };
    if (agentId) where.agentId = agentId;
    if (flowId) where.flowId = flowId;

    const [executions, dailyStats, agentStats] = await Promise.all([
      db.execution.findMany({
        where,
        orderBy: { startedAt: 'desc' },
        take: limit,
        include: {
          agent: { select: { name: true, model: true } },
          flow: { select: { name: true } },
          traces: { orderBy: { step: 'asc' } },
        },
      }),
      db.$queryRaw`SELECT DATE(started_at) as date, COUNT(*) as total FROM "Execution" WHERE user_id = ${user.id} AND started_at > NOW() - INTERVAL '7 days' GROUP BY DATE(started_at) ORDER BY date DESC`,
      db.agent.findMany({ where: { userId: user.id }, orderBy: { totalRuns: 'desc' }, take: 5, select: { id: true, name: true, totalRuns: true } }),
    ]);

    return NextResponse.json({ executions, dailyStats, topAgents: agentStats });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
