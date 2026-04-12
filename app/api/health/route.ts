import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const start = Date.now();
  try {
    await prisma.agent.count();
    const dbLatency = Date.now() - start;
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: { status: 'connected', latency: dbLatency + 'ms' },
        api: { status: 'running' },
        auth: { status: process.env.CLERK_SECRET_KEY ? 'configured' : 'not configured' },
        payments: { status: process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured' },
        ai: { status: process.env.ANTHROPIC_API_KEY ? 'configured' : 'not configured' },
      },
      version: '2.8.0',
    });
  } catch (e: any) {
    return NextResponse.json({ status: 'degraded', error: e.message, timestamp: new Date().toISOString() }, { status: 503 });
  }
}