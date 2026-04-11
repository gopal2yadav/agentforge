import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({
    actions: [
      { id: 'run_agent', label: 'Run Agent', description: 'Execute an agent with a prompt', endpoint: '/api/agents/run', method: 'POST' },
      { id: 'list_agents', label: 'List Agents', description: 'Get all configured agents', endpoint: '/api/agents', method: 'GET' },
      { id: 'list_flows', label: 'List Flows', description: 'Get all workflow pipelines', endpoint: '/api/flows', method: 'GET' },
      { id: 'check_health', label: 'Health Check', description: 'Check swarm status', endpoint: '/api/swarm', method: 'GET' },
      { id: 'get_notifications', label: 'Notifications', description: 'Get recent notifications', endpoint: '/api/notifications', method: 'GET' },
    ],
    version: '2.2.0',
    docs: 'https://agentforcecrew.com/docs',
  });
}