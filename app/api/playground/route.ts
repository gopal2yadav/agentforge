import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { message, model, agent } = body;

    const systemPrompt = agent
      ? 'You are ' + agent.name + ', a ' + agent.role + '. ' + (agent.goal ? 'Your goal: ' + agent.goal + '. ' : '') + (agent.backstory || '') + ' Respond helpfully and in character.'
      : 'You are Nexus, an AI assistant for the Nexus AI Agent Orchestration Platform. Be helpful, concise, and professional.';

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: 'Anthropic API error: ' + res.status, details: err }, { status: 502 });
    }

    const data = await res.json();
    const reply = data.content?.[0]?.text || 'No response generated.';
    return NextResponse.json({ reply, model: data.model, usage: data.usage });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}