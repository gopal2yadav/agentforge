import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { getOrCreateUser, PLAN_LIMITS } from '@/lib/utils';

export async function GET() {
  try {
    const user = await getOrCreateUser();
    return NextResponse.json(await db.agent.findMany({ where: { userId: user.id }, orderBy: { updatedAt: 'desc' } }));
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 401 }); }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getOrCreateUser();
    const body = await req.json();
    const count = await db.agent.count({ where: { userId: user.id } });
    const limit = PLAN_LIMITS[user.plan].agents;
    if (count >= limit) return NextResponse.json({ error: `Limit reached (${limit})` }, { status: 403 });
    const agent = await db.agent.create({ data: { userId: user.id, name: body.name, role: body.role, description: body.description, systemPrompt: body.systemPrompt, model: body.model||'claude-sonnet-4-20250514', provider: body.model?.includes('gpt')?'OPENAI':'ANTHROPIC', tools: body.tools||[], config: body.config||{} } });
    return NextResponse.json(agent, { status: 201 });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
