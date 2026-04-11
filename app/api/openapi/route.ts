import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({
    openapi: '3.0.3',
    info: { title: 'Nexus API', version: '2.4.1', description: 'AI Agent Orchestration Platform API', contact: { email: 'gopal@aabhyasa.com' } },
    servers: [{ url: 'https://agentforcecrew.com/api' }],
    paths: {
      '/agents': { get: { summary: 'List agents', responses: { '200': { description: 'Agent list' } } }, post: { summary: 'Create agent', responses: { '201': { description: 'Agent created' } } } },
      '/agents/run': { post: { summary: 'Execute agent', responses: { '200': { description: 'Execution result' } } } },
      '/flows': { get: { summary: 'List flows', responses: { '200': { description: 'Flow list' } } }, post: { summary: 'Create flow', responses: { '201': { description: 'Flow created' } } } },
      '/swarm': { get: { summary: 'Health check', responses: { '200': { description: 'Swarm status' } } } },
      '/notifications': { get: { summary: 'Get notifications', responses: { '200': { description: 'Notification list' } } } },
      '/health': { get: { summary: 'System health', responses: { '200': { description: 'Service statuses' } } } },
      '/stats': { get: { summary: 'Platform stats', responses: { '200': { description: 'Platform metrics' } } } },
    },
  });
}