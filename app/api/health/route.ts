import { NextResponse } from 'next/server';
export async function GET() {
  const uptime = process.uptime();
  return NextResponse.json({
    status: 'healthy',
    version: '2.3.0',
    uptime: Math.round(uptime),
    timestamp: new Date().toISOString(),
    services: {
      api: 'operational',
      auth: 'operational',
      billing: 'operational',
      agents: 'operational',
      swarm: 'degraded',
    },
    database: process.env.DATABASE_URL ? 'connected' : 'not_configured',
    environment: process.env.NODE_ENV || 'production',
  });
}