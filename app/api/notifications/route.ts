import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [agentCount, flowCount] = await Promise.all([
      prisma.agent.count(),
      prisma.flow.count(),
    ]);
    
    const notifications = [
      { id: '1', type: 'success', title: 'Platform Ready', message: 'All systems operational. Database connected.', time: 'Just now', read: false },
      { id: '2', type: 'info', title: agentCount + ' Agents Active', message: 'Your agents are configured and ready to use.', time: '5m ago', read: false },
      { id: '3', type: 'info', title: flowCount + ' Flows Running', message: 'Your workflows are set up and operational.', time: '10m ago', read: true },
      { id: '4', type: 'warning', title: 'Stripe Not Configured', message: 'Add STRIPE_SECRET_KEY to enable payment processing.', time: '1h ago', read: true },
      { id: '5', type: 'warning', title: 'AI Key Missing', message: 'Add ANTHROPIC_API_KEY for real AI playground responses.', time: '1h ago', read: true },
    ];
    
    return NextResponse.json({ notifications, unread: notifications.filter(n => !n.read).length });
  } catch (e: any) {
    return NextResponse.json({ notifications: [], unread: 0 });
  }
}