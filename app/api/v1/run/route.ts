import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'AI service not configured' }, { status: 503 });

  try {
    const body = await request.json();
    const { agent_id, agent_name, prompt, model } = body;

    if (!prompt) return NextResponse.json({ error: 'prompt is required' }, { status: 400 });

    let agent: any = null;
    if (agent_id) {
      agent = await prisma.agent.findUnique({ where: { id: agent_id } });
    } else if (agent_name) {
      agent = await prisma.agent.findFirst({ where: { name: { contains: agent_name, mode: 'insensitive' } } });
    }

    const systemPrompt = agent
      ? 'You are ' + agent.name + ', a ' + agent.role + '. ' + (agent.goal ? 'Goal: ' + agent.goal + '. ' : '') + (agent.backstory || '')
      : 'You are Nexus AI, an intelligent assistant. Be concise and helpful.';

    const modelId = model === 'claude-opus-4' ? 'claude-opus-4-20250514' : 'claude-sonnet-4-20250514';

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: modelId, max_tokens: 2048, system: systemPrompt, messages: [{ role: 'user', content: prompt }] }),
    });

    if (!res.ok) return NextResponse.json({ error: 'AI error: ' + res.status }, { status: 502 });

    const data = await res.json();
    const reply = data.content?.[0]?.text || '';

    if (agent) {
      await prisma.agent.update({ where: { id: agent.id }, data: { runs: { increment: 1 } } });
    }

    return NextResponse.json({
      success: true,
      reply,
      agent: agent ? { id: agent.id, name: agent.name, role: agent.role } : null,
      model: data.model,
      usage: data.usage,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/v1/run',
    method: 'POST',
    description: 'Run an AI agent via the Nexus public API',
    body: {
      prompt: 'required — the task or question for the agent',
      agent_id: 'optional — specific agent ID to use',
      agent_name: 'optional — search agent by name',
      model: 'optional — claude-sonnet-4 (default) or claude-opus-4',
    },
    example: {
      prompt: 'Analyze the quarterly revenue trends',
      agent_name: 'Financial Analyst',
      model: 'claude-sonnet-4',
    },
    response: { success: true, reply: '...', agent: { id: '...', name: '...', role: '...' }, model: '...', usage: { input_tokens: 0, output_tokens: 0 } },
  });
}