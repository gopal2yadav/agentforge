import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { db } from '@/lib/db';
import { getOrCreateUser, rateLimit, PLAN_LIMITS } from '@/lib/utils';

const getModel = (modelId, provider) => provider === 'OPENAI' ? openai(modelId) : anthropic(modelId);

export async function POST(req, { params }) {
  const { id } = await params;
  try {
    const user = await getOrCreateUser();
    if (!rateLimit(user.id, PLAN_LIMITS[user.plan].apiCallsPerDay, 86400000))
      return NextResponse.json({ error: 'Rate limit' }, { status: 429 });
    const agent = await db.agent.findFirst({ where: { id, userId: user.id } });
    if (!agent) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const body = await req.json();
    const start = Date.now();
    const exec = await db.execution.create({ data: { userId: user.id, agentId: agent.id, input: body, status: 'RUNNING' } });
    try {
      const result = await generateText({ model: getModel(agent.model, agent.provider), system: agent.systemPrompt || `You are ${agent.name}`, prompt: body.prompt || JSON.stringify(body.input), maxTokens: 4096 });
      const latencyMs = Date.now() - start, tokens = result.usage?.totalTokens || 0;
      await db.execution.update({ where: { id: exec.id }, data: { output: { text: result.text }, status: 'COMPLETED', tokensUsed: tokens, latencyMs, completedAt: new Date() } });
      await db.agent.update({ where: { id: agent.id }, data: { totalRuns: { increment: 1 }, successCount: { increment: 1 }, status: 'ACTIVE' } });
      return NextResponse.json({ executionId: exec.id, text: result.text, tokensUsed: tokens, latencyMs });
    } catch (e) {
      await db.execution.update({ where: { id: exec.id }, data: { status: 'FAILED', error: e.message, completedAt: new Date() } });
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
