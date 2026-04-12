import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [agentCount, flowCount, crewCount, automationCount] = await Promise.all([
      prisma.agent.count(),
      prisma.flow.count(),
      prisma.crew.count(),
      prisma.automation.count(),
    ]);
    
    const agents = await prisma.agent.findMany();
    const totalRuns = agents.reduce((sum, a) => sum + a.runs, 0);
    
    return NextResponse.json({
      agents: agentCount,
      flows: flowCount,
      crews: crewCount,
      automations: automationCount,
      totalRuns,
      tokensUsed: totalRuns * 1247,
      plan: 'Pro',
      status: 'healthy',
    });
  } catch (e: any) {
    return NextResponse.json({ agents: 0, flows: 0, crews: 0, automations: 0, totalRuns: 0, tokensUsed: 0, plan: 'Free', status: 'error', error: e.message });
  }
}
