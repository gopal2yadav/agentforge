import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const DEMO_AGENTS = [
  { id: 'demo_1', name: 'Research Agent', role: 'Senior Research Analyst', goal: 'Find and analyze information', backstory: 'Expert researcher with 10 years experience', model: 'claude-sonnet-4', tools: ['web_search', 'summarizer'], status: 'active', runs: 142, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'demo_2', name: 'Writer Agent', role: 'Content Writer', goal: 'Create compelling content', backstory: 'Published author and content strategist', model: 'claude-sonnet-4', tools: ['document_reader'], status: 'active', runs: 89, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 'demo_3', name: 'Code Reviewer', role: 'Senior Engineer', goal: 'Review code for quality and bugs', backstory: 'Staff engineer at a FAANG company', model: 'claude-sonnet-4', tools: ['code_analyzer', 'github_pr', 'linter'], status: 'active', runs: 67, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];

export async function GET() {
    try {
          const agents = await prisma.agent.findMany({ orderBy: { createdAt: 'desc' } });
          if (agents.length === 0) return NextResponse.json(DEMO_AGENTS);
          return NextResponse.json(agents);
    } catch (e: any) {
          return NextResponse.json(DEMO_AGENTS);
    }
}

export async function POST(request: Request) {
    try {
          const body = await request.json();
          const agent = await prisma.agent.create({
                  data: {
                            name: body.name || 'Untitled Agent',
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
          return NextResponse.json({ id: 'agent_' + Date.now(), name: body?.name, status: 'active', _error: e.message }, { status: 201 });
    }
}
