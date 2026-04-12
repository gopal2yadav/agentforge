import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const agentCount = await prisma.agent.count();
    const flowCount = await prisma.flow.count();
    const crewCount = await prisma.crew.count();
    const automationCount = await prisma.automation.count();
    
    return NextResponse.json({
      success: true,
      tables: {
        Agent: agentCount,
        Flow: flowCount,
        Crew: crewCount,
        Automation: automationCount,
      },
      message: 'Database is connected and all tables exist'
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
