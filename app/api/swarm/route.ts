import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req) {
  const auth = req.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const r = {};
  try {
    const errs = await db.execution.count({ where: { status: 'FAILED', startedAt: { gte: new Date(Date.now()-300000) } } });
    if (errs > 5) await db.swarmEvent.create({ data: { agentName: 'Monitor', type: 'monitor', action: 'high_error_rate', details: { errs }, severity: 'warning' } });
    r.monitor = { errors: errs };
  } catch(e) { r.monitor = 'fail'; }
  try {
    const stuck = await db.execution.findMany({ where: { status: 'RUNNING', startedAt: { lte: new Date(Date.now()-600000) } } });
    for (const s of stuck) await db.execution.update({ where: { id: s.id }, data: { status: 'FAILED', error: 'Timeout', completedAt: new Date() } });
    r.coordinator = { cleaned: stuck.length };
  } catch(e) { r.coordinator = 'fail'; }
  return NextResponse.json({ ok: true, time: new Date().toISOString(), r });
}
