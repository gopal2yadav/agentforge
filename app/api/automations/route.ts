import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const automations = await prisma.automation.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(automations);
  } catch (e: any) {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const automation = await prisma.automation.create({
      data: {
        name: body.name || 'Untitled Automation',
        trigger: body.trigger || 'manual',
        agent: body.agent || '',
        status: 'active',
      },
    });
    return NextResponse.json(automation, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
