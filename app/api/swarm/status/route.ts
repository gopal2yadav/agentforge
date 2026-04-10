import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const [events, counts, stats] = await Promise.all([
      db.swarmEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
      db.agent.groupBy({ by: ['status'], _count: true }),
      db.execution.aggregate({ where: { startedAt: { gte: new Date(Date.now()-86400000) } }, _count: true, _avg: { latencyMs: true } }),
    ]);
    return NextResponse.json({
      swarm: { agents: [
        { name: 'Monitor', status: 'active' }, { name: 'Coordinator', status: 'active' },
        { name: 'Debugger', status: 'idle' }, { name: 'Optimizer', status: 'active' },
        { name: 'Security', status: 'active' },
      ]},
      stats: { execToday: stats._count, avgLatency: Math.round(stats._avg.latencyMs||0) },
      events: events.map(e=>({ id: e.id, agent: e.agentName, action: e.action, severity: e.severity, time: e.createdAt })),
    });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
