import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({
    notifications: [
      { id: 'n1', type: 'agent_completed', title: 'Research Agent completed', read: false, time: new Date().toISOString() },
      { id: 'n2', type: 'deployment', title: 'Deployment v2.2.0 ready', read: false, time: new Date().toISOString() },
      { id: 'n3', type: 'agent_failed', title: 'Data Analyst timeout', read: true, time: new Date().toISOString() },
    ],
    unreadCount: 2,
  });
}