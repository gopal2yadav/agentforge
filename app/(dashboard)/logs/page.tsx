'use client';
import { useState } from 'react';

const ALL_LOGS = [
  { id: '1', ts: '2026-04-11 07:41:35', level: 'info', source: 'agent/research', msg: 'Completed: "Analyze Q1 market trends" (3,200 tokens, 1.85s)', req: 'req_a1b2c3' },
  { id: '2', ts: '2026-04-11 07:40:19', level: 'info', source: 'system/swarm', msg: 'Health check: all 7 agents responsive', req: 'req_d4e5f6' },
  { id: '3', ts: '2026-04-11 07:38:59', level: 'warn', source: 'agent/reviewer', msg: 'Rate limit at 80% (4,012 / 5,000 daily calls)', req: 'req_g7h8i9' },
  { id: '4', ts: '2026-04-11 07:34:38', level: 'info', source: 'flow/content', msg: 'Pipeline completed: 4/4 nodes executed', req: 'req_j0k1l2' },
  { id: '5', ts: '2026-04-11 07:33:51', level: 'error', source: 'agent/analyst', msg: 'Connection timeout: OpenAI API unreachable after 30s', req: 'req_m3n4o5' },
  { id: '6', ts: '2026-04-11 07:28:12', level: 'info', source: 'memory/write', msg: 'Updated: research scope, importance 0.92', req: 'req_s9t0u1' },
  { id: '7', ts: '2026-04-11 07:25:44', level: 'info', source: 'agent/research', msg: 'Started: "Compare competitors in EdTech"', req: 'req_v2w3x4' },
  { id: '8', ts: '2026-04-11 07:22:10', level: 'warn', source: 'billing/usage', msg: 'Token usage at 45,200 / 10M (0.45%)', req: 'req_y5z6a7' },
  { id: '9', ts: '2026-04-11 07:18:33', level: 'info', source: 'webhook/out', msg: 'Delivered to callback endpoint (200 OK, 120ms)', req: 'req_b8c9d0' },
  { id: '10', ts: '2026-04-11 07:15:22', level: 'error', source: 'flow/triage', msg: 'Node 3 failed: classifier returned invalid category', req: 'req_e1f2g3' },
];

export default function LogsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const filtered = ALL_LOGS.filter(l => {
    if (filter !== 'all' && l.level !== filter) return false;
    if (search && !l.msg.toLowerCase().includes(search.toLowerCase()) && !l.source.includes(search.toLowerCase())) return false;
    return true;
  });
  const levelStyle = (l) => {
    if (l === 'error') return 'text-red-600 bg-red-50';
    if (l === 'warn') return 'text-amber-600 bg-amber-50';
    return 'text-emerald-600 bg-emerald-50';
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Logs</h1>
          <p className="text-sm text-gray-500">Real-time platform activity and event log</p>
        </div>
        <div className="flex items-center gap-2">
          {['all', 'info', 'warn', 'error'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={"px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors " + (filter === f ? 'bg-indigo-50 text-indigo-700' : 'text-gray-400 hover:text-gray-900')}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..."
          className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-colors font-mono shadow-sm" />
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden font-mono text-[12px] shadow-sm">
        {filtered.map((log) => (
          <div key={log.id} className="px-4 py-2.5 border-b border-gray-100 flex items-start gap-3 hover:bg-gray-50 transition-colors">
            <span className="text-gray-400 shrink-0 w-[140px]">{log.ts}</span>
            <span className={"px-1.5 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 w-[44px] text-center " + levelStyle(log.level)}>{log.level}</span>
            <span className="text-indigo-600 shrink-0 w-[120px] truncate">{log.source}</span>
            <span className="text-gray-700 flex-1">{log.msg}</span>
            <span className="text-gray-300 shrink-0">{log.req}</span>
          </div>
        ))}
        {filtered.length === 0 && (<div className="px-4 py-8 text-center text-gray-400">No logs matching your filters</div>)}
      </div>
    </div>
  );
}