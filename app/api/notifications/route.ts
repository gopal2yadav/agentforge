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

    const agents = await prisma.agent.findMany({ orderBy: { createdAt: 'desc' }, take: 3 });
    const recentAgentNames = agents.map(a => a.name).join(', ');

    const hasStripe = !!process.env.STRIPE_SECRET_KEY;
    const hasAI = !!process.env.ANTHROPIC_API_KEY;
    const hasAuth = !!process.env.CLERK_SECRET_KEY;

    const notifications: any[] = [];
    let id = 1;

    // Real system notifications based on actual state
    if (agentCount > 0) notifications.push({ id: String(id++), type: 'success', title: agentCount + ' Agents Active', message: 'Latest: ' + recentAgentNames, time: 'Live', read: false });
    if (flowCount > 0) notifications.push({ id: String(id++), type: 'info', title: flowCount + ' Flows Running', message: 'Your workflows are operational.', time: 'Live', read: false });
    if (crewCount > 0) notifications.push({ id: String(id++), type: 'info', title: crewCount + ' Crews Deployed', message: 'Agent swarms are configured and ready.', time: 'Live', read: true });
    if (hasAI && hasStripe && hasAuth) notifications.push({ id: String(id++), type: 'success', title: 'All Services Connected', message: 'AI, Payments, Auth, and Database are fully operational.', time: 'Live', read: true });
    if (!hasStripe) notifications.push({ id: String(id++), type: 'warning', title: 'Stripe Not Configured', message: 'Add STRIPE_SECRET_KEY to enable payments.', time: 'Action needed', read: false });
    if (!hasAI) notifications.push({ id: String(id++), type: 'warning', title: 'AI Not Configured', message: 'Add ANTHROPIC_API_KEY for AI features.', time: 'Action needed', read: false });
    if (!hasAuth) notifications.push({ id: String(id++), type: 'warning', title: 'Auth Not Configured', message: 'Add CLERK_SECRET_KEY for authentication.', time: 'Action needed', read: false });
    if (agentCount === 0) notifications.push({ id: String(id++), type: 'info', title: 'Get Started', message: 'Create your first agent to begin.', time: 'Now', read: false });

    return NextResponse.json({ notifications, unread: notifications.filter(n => !n.read).length, total: { agents: agentCount, flows: flowCount, crews: crewCount, automations: automationCount } });
  } catch (e: any) {
    return NextResponse.json({ notifications: [], unread: 0, error: e.message });
  }
}
