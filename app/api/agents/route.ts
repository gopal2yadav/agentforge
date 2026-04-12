import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const agents = await prisma.$queryRawUnsafe('SELECT * FROM "Agent" ORDER BY "createdAt" DESC');
    if (agents.length === 0) {
      // Return demo data if no agents in DB yet
      return NextResponse.json([
        { id: 'demo_1', name: 'Research Agent', role: 'Senior Research Analyst', model: 'claude-sonnet-4', tools: ['web_search','summarizer'], status: 'active', runs: 142 },
        { id: 'demo_2', name: 'Writer Agent', role: 'Content Writer', model: 'claude-sonnet-4', tools: ['document_reader'], status: 'active', runs: 89 },
        { id: 'demo_3', name: 'Code Reviewer', role: 'Senior Engineer', model: 'claude-sonnet-4', tools: ['code_analyzer','github_pr','linter'], status: 'active', runs: 67 },
      ]);
    }
    return NextResponse.json(agents);
  } catch (e) {
    return NextResponse.json([
      { id: 'demo_1', name: 'Research Agent', role: 'Senior Research Analyst', model: 'claude-sonnet-4', tools: ['web_search','summarizer'], status: 'active', runs: 142, _dbError: e.message },
      { id: 'demo_2', name: 'Writer Agent', role: 'Content Writer', model: 'claude-sonnet-4', tools: ['document_reader'], status: 'active', runs: 89 },
    ]);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await prisma.$queryRawUnsafe(
      'INSERT INTO "Agent" (id, name, role, goal, backstory, model, tools, status, runs, "createdAt", "updatedAt") VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, 0, NOW(), NOW()) RETURNING *',
      body.name || 'Untitled Agent',
      body.role || '',
      body.goal || '',
      body.backstory || '',
      body.model || 'claude-sonnet-4',
      body.tools || [],
      'active'
    );
    return NextResponse.json(result[0], { status: 201 });
  } catch (e) {
    return NextResponse.json({ id: 'agent_' + Date.now(), ...body, status: 'active', _note: 'DB error: ' + e.message }, { status: 201 });
  }
}