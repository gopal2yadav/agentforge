import { NextResponse } from 'next/server';
export async function GET() {
  const services = [
    { name: 'API Gateway', status: 'operational', latency: 12, uptime: 99.99 },
    { name: 'Agent Runtime', status: 'operational', latency: 85, uptime: 99.95 },
    { name: 'Knowledge Store', status: 'operational', latency: 23, uptime: 99.97 },
    { name: 'Webhook Delivery', status: 'operational', latency: 45, uptime: 99.90 },
    { name: 'Auth (Clerk)', status: 'operational', latency: 34, uptime: 99.99 },
  ];
  return NextResponse.json({
    status: 'operational',
    version: '2.3.0',
    timestamp: new Date().toISOString(),
    services,
    uptime: 99.96,
  });
}