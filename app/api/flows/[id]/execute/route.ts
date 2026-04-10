import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { db } from '@/lib/db';
import { getOrCreateUser, rateLimit, PLAN_LIMITS } from '@/lib/utils';

export async function POST(req, { params }) {
  const { id } = await params;
  try {
    const user = await getOrCreateUser();
    if (!rateLimit(user.id, PLAN_LIMITS[user.plan].apiCallsPerDay, 86400000))
      return NextResponse.json({ error: 'Rate limit' }, { status: 429 });
    const flow = await db.flow.findFirst({ where: { id, userId: user.id }, include: { nodes: { include: { agent: true } }, edges: true } });
    if (!flow) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const body = await req.json();
    const start = Date.now();
    const exec = await db.execution.create({ data: { userId: user.id, flowId: flow.id, input: body, status: 'RUNNING' } });
    const nm = new Map(flow.nodes.map(n=>[n.id,n]));
    const results = {}, visited = new Set();
    let totalTokens = 0, step = 0;
    const q = flow.nodes.filter(n=>n.type==='input').map(n=>n.id);
    while (q.length) {
      const nid = q.shift();
      if (visited.has(nid)) continue;
      visited.add(nid);
      const n = nm.get(nid); if (!n) continue;
      step++;
      if (n.type === 'agent' && n.agent) {
        const m = n.agent.provider==='OPENAI'?openai(n.agent.model):anthropic(n.agent.model);
        const prev = Object.values(results).map(r=>r.text).filter(Boolean).join('\n');
        const result = await generateText({ model: m, system: n.agent.systemPrompt||`You are ${n.agent.name}`, prompt: prev||body.prompt||'Execute', maxTokens: 2048 });
        const t = result.usage?.totalTokens||0; totalTokens+=t;
        results[nid] = { text: result.text, tokens: t, agent: n.agent.name };
      } else if (n.type==='input') results[nid] = { text: body.prompt||'' };
      flow.edges.filter(e=>e.sourceNodeId===nid).forEach(e=>q.push(e.targetNodeId));
    }
    await db.execution.update({ where: { id: exec.id }, data: { output: results, status: 'COMPLETED', tokensUsed: totalTokens, latencyMs: Date.now()-start, completedAt: new Date() } });
    return NextResponse.json({ executionId: exec.id, results, totalTokens, steps: step });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
