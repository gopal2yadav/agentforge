import { NextResponse } from 'next/server';

const DEMO_AGENTS = [
  { id: '1', name: 'Research Agent', description: 'Autonomous web research and summarization', model: 'claude-sonnet-4-20250514', provider: 'ANTHROPIC', status: 'ACTIVE', systemPrompt: 'You are a research agent...', totalRuns: 142, successCount: 138, avgLatencyMs: 1850, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', name: 'Code Reviewer', description: 'Reviews PRs and suggests improvements', model: 'claude-sonnet-4-20250514', provider: 'ANTHROPIC', status: 'IDLE', systemPrompt: 'You review code...', totalRuns: 89, successCount: 85, avgLatencyMs: 2100, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', name: 'Data Analyst', description: 'Processes CSV data and generates insights', model: 'gpt-4o', provider: 'OPENAI', status: 'ACTIVE', systemPrompt: 'You analyze data...', totalRuns: 67, successCount: 61, avgLatencyMs: 3200, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export async function GET() {
  return NextResponse.json({ agents: DEMO_AGENTS, total: DEMO_AGENTS.length });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newAgent = {
      id: String(Date.now()),
      name: body.name || 'New Agent',
      description: body.description || '',
      model: body.model || 'claude-sonnet-4-20250514',
      provider: body.provider || 'ANTHROPIC',
      status: 'IDLE',
      systemPrompt: body.systemPrompt || '',
      totalRuns: 0,
      successCount: 0,
      avgLatencyMs: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json(newAgent, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
