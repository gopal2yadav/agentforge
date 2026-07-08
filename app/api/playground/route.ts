import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured. Add it in Vercel Environment Variables.' }, { status: 503 });

  try {
    const body = await request.json();
    const { messages, model, agent } = body;

    // Build system prompt from agent if selected
    const systemPrompt = agent
      ? 'You are ' + agent.name + ', a ' + agent.role + '. ' + (agent.goal ? 'Your goal: ' + agent.goal + '. ' : '') + (agent.backstory || '') + ' You have access to tools: ' + (agent.tools || []).join(', ') + '. Stay in character and be helpful, specific, and actionable.'
      : 'You are Nexus AI, the intelligent assistant powering the Nexus AI Agent Orchestration Platform at agentforcecrew.com. Help users with AI agents, workflows, automation, and any task they need. Be concise, practical, and expert-level.';

    // Send full conversation history for multi-turn
    const apiMessages = (messages || []).map((m: any) => ({ role: m.role, content: m.content }));

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: model === 'claude-opus-4' ? 'claude-sonnet-4-6' : 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: systemPrompt,
        messages: apiMessages,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: 'AI API error (' + res.status + ')', details: errText }, { status: 502 });
    }

    const data = await res.json();
    const reply = data.content?.[0]?.text || 'No response generated.';
    return NextResponse.json({ reply, model: data.model, usage: data.usage });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
