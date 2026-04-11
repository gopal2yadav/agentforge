import { NextResponse } from 'next/server';

const DEMO_FLOWS = [
  { id: '1', name: 'Content Pipeline', description: 'Research → Write → Review → Publish', status: 'ACTIVE', totalRuns: 34, nodes: 4, edges: 3, updatedAt: new Date().toISOString() },
  { id: '2', name: 'Bug Triage', description: 'Analyze → Classify → Assign → Notify', status: 'DRAFT', totalRuns: 0, nodes: 5, edges: 4, updatedAt: new Date().toISOString() },
];

export async function GET() {
  return NextResponse.json({ flows: DEMO_FLOWS, total: DEMO_FLOWS.length });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newFlow = {
      id: String(Date.now()),
      name: body.name || 'New Flow',
      description: body.description || '',
      status: 'DRAFT',
      totalRuns: 0,
      nodes: 0,
      edges: 0,
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json(newFlow, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
