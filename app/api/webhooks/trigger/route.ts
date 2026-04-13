import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, source, data, agent_name } = body;

    const log = {
      event: event || 'webhook',
      source: source || 'external',
      data: JSON.stringify(data || {}),
      timestamp: new Date().toISOString(),
      processed: false as boolean,
    };

    if (agent_name) {
      const agent = await prisma.agent.findFirst({ where: { name: { contains: agent_name, mode: 'insensitive' } } });
      if (agent) {
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (apiKey) {
          const systemPrompt = 'You are ' + agent.name + ', a ' + agent.role + '. ' + (agent.goal || '') + ' ' + (agent.backstory || '') + ' Process this webhook event and respond with the appropriate action.';
          const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
            body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1024, system: systemPrompt, messages: [{ role: 'user', content: 'Webhook event: ' + (event || 'unknown') + ' from ' + (source || 'unknown') + '. Data: ' + JSON.stringify(data || {}) }] }),
          });
          if (res.ok) {
            const aiData = await res.json();
            await prisma.agent.update({ where: { id: agent.id }, data: { runs: { increment: 1 } } });
            return NextResponse.json({ success: true, event: log.event, agent: agent.name, response: aiData.content?.[0]?.text || '', processed: true });
          }
        }
      }
    }

    return NextResponse.json({ success: true, event: log.event, source: log.source, message: 'Webhook received. Add agent_name to auto-process with AI.', processed: false });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/webhooks/trigger',
    method: 'POST',
    description: 'Trigger agent execution via webhook',
    body: {
      event: 'The event name (e.g. new_lead, bug_report, order_placed)',
      source: 'The source system (e.g. stripe, github, slack)',
      data: 'Any JSON data to pass to the agent',
      agent_name: 'optional — name of agent to auto-process the event',
    },
    example: { event: 'new_lead', source: 'hubspot', data: { email: 'john@example.com', company: 'Acme' }, agent_name: 'Lead Qualifier' },
  });
}