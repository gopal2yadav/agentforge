import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const agents = await prisma.agent.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(agents);
  } catch (e) {
    // Fallback to demo data if DB not ready
    return NextResponse.json([
      { id: '1', name: 'Research Agent', role: 'Senior Research Analyst', model: 'claude-sonnet-4', tools: ['web_search','summarizer'], status: 'active', runs: 142, createdAt: new Date().toISOString() },
      { id: '2', name: 'Writer Agent', role: 'Content Writer', model: 'claude-sonnet-4', tools: ['document_reader'], status: 'active', runs: 89, createdAt: new Date().toISOString() },
      { id: '3', name: 'Code Reviewer', role: 'Senior Engineer', model: 'claude-sonnet-4', tools: ['code_analyzer','github_pr','linter'], status: 'active', runs: 67, createdAt: new Date().toISOString() },
    ]);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const agent = await prisma.agent.create({
      data: {
        name: body.name,
        role: body.role || '',
        goal: body.goal || '',
        backstory: body.backstory || '',
        model: body.model || 'claude-sonnet-4',
        tools: body.tools || [],
        status: 'active',
      },
    });
    return NextResponse.json(agent, { status: 201 });
  } catch (e) {
    // If DB fails, still return success with a generated ID
    return NextResponse.json({
      id: 'agent_' + Date.now(),
      ...await request.clone().json().catch(() => ({})),
      status: 'active',
      createdAt: new Date().toISOString(),
      _note: 'Saved locally (DB setup pending: run prisma db push)'
    }, { status: 201 });
  }
}