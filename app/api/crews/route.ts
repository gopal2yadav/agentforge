import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const crews = await prisma.crew.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(crews);
  } catch (e: any) {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const crew = await prisma.crew.create({
      data: {
        name: body.name || 'Untitled Crew',
        config: body.config || {},
        status: 'active',
      },
    });
    return NextResponse.json(crew, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing crew id' }, { status: 400 });
    await prisma.crew.delete({ where: { id } });
    return NextResponse.json({ deleted: true });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to delete: ' + e.message }, { status: 500 });
  }
}
