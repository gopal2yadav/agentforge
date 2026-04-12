import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(agents);
  } catch (e: any) {
    return NextResponse.json({ error: 'Database error: ' + e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name?.trim()) return NextResponse.json({ error: 'Agent name is required' }, { status: 400 });
    const agent = await prisma.agent.create({
      data: {
        name: body.name.trim(),
        role: body.role || '',
        goal: body.goal || '',
        backstory: body.backstory || '',
        model: body.model || 'claude-sonnet-4',
        tools: body.tools || [],
        status: 'active',
      },
    });
    return NextResponse.json(agent, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to create agent: ' + e.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing agent id' }, { status: 400 });
    await prisma.agent.delete({ where: { id } });
    return NextResponse.json({ deleted: true });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to delete: ' + e.message }, { status: 500 });
  }
}
