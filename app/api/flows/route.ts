import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const flows = await prisma.flow.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(flows);
  } catch (e: any) {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const flow = await prisma.flow.create({
      data: {
        name: body.name || 'Untitled Flow',
        description: body.description || '',
        trigger: body.trigger || 'Manual',
        steps: body.steps || [],
        status: 'active',
      },
    });
    return NextResponse.json(flow, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await prisma.flow.delete({ where: { id } });
    return NextResponse.json({ deleted: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
