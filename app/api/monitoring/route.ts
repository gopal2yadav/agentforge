import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const [agents, flows] = await Promise.all([
      prisma.agent.findMany({ orderBy: { runs: 'desc' }, take: limit }),
      prisma.flow.findMany({ orderBy: { updatedAt: 'desc' }, take: limit }),
    ]);
    const executions = agents
      .filter((a) => a.runs > 0)
      .map((a) => ({ id: a.id, agent: { name: a.name, model: a.model }, status: 'completed', runs: a.runs, lastRun: a.updatedAt }));
    const topAgents = agents.slice(0, 5).map((a) => ({ id: a.id, name: a.name, totalRuns: a.runs }));
    return NextResponse.json({
      executions,
      dailyStats: [],
      topAgents,
      flows: flows.map((f) => ({ id: f.id, name: f.name, trigger: f.trigger, status: f.status, runs: f.runs })),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
