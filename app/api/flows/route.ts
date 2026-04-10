import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getOrCreateUser, PLAN_LIMITS } from '@/lib/utils';

export async function GET() {
  try {
    const user = await getOrCreateUser();
    return NextResponse.json(await db.flow.findMany({ where: { userId: user.id }, orderBy: { updatedAt: 'desc' }, include: { nodes: true, edges: true } }));
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 401 }); }
}

export async function POST(req) {
  try {
    const user = await getOrCreateUser();
    const body = await req.json();
    const count = await db.flow.count({ where: { userId: user.id } });
    if (count >= PLAN_LIMITS[user.plan].flows)
      return NextResponse.json({ error: 'Flow limit reached' }, { status: 403 });
    const flow = await db.flow.create({ data: { userId: user.id, name: body.name || 'Untitled', description: body.description }, include: { nodes: true } });
    return NextResponse.json(flow, { status: 201 });
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
