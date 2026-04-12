import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'AI not configured' }, { status: 503 });

  try {
    const { agentId, prompt } = await request.json();
    
    // Find agent
    let agent: any = null;
    if (agentId) {
      agent = await prisma.agent.findUnique({ where: { id: agentId } });
    }

    const systemPrompt = agent
      ? 'You are ' + agent.name + ', a ' + agent.role + '. ' + (agent.goal ? 'Your goal: ' + agent.goal + '. ' : '') + (agent.backstory || '') + ' You have access to these tools: ' + (agent.tools || []).join(', ') + '. Respond helpfully and in character.'
      : 'You are a helpful AI assistant on the Nexus platform.';

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1024, system: systemPrompt, messages: [{ role: 'user', content: prompt }] }),
    });

    const data = await res.json();
    const reply = data.content?.[0]?.text || 'No response';

    // Increment run count
    if (agent) {
      await prisma.agent.update({ where: { id: agentId }, data: { runs: { increment: 1 } } });
    }

    return NextResponse.json({ reply, agent: agent?.name, model: data.model, usage: data.usage });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}