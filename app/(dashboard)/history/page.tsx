'use client';
import { useState } from 'react';
const EXECUTIONS = [
  { id: 'ex_001', agent: 'Research Agent', prompt: 'Analyze Q1 market trends in EdTech', status: 'completed', tokens: 3200, cost: 0.016, latency: 1850, time: '15 min ago' },
  { id: 'ex_002', agent: 'Writer Agent', prompt: 'Draft blog post: AI in Healthcare 2026', status: 'completed', tokens: 5100, cost: 0.026, latency: 2400, time: '1 hour ago' },
  { id: 'ex_003', agent: 'Code Reviewer', prompt: 'Review PR #142: Add auth middleware', status: 'completed', tokens: 2800, cost: 0.014, latency: 2100, time: '2 hours ago' },
  { id: 'ex_004', agent: 'Data Analyst', prompt: 'Process Q1 revenue CSV', status: 'failed', tokens: 450, cost: 0.002, latency: 30000, time: '3 hours ago' },
  { id: 'ex_005', agent: 'Research Agent', prompt: 'Compare competitors in AI tutoring', status: 'completed', tokens: 4100, cost: 0.021, latency: 2300, time: '4 hours ago' },
  { id: 'ex_006', agent: 'Coordinator', prompt: 'Plan content calendar for May 2026', status: 'completed', tokens: 1800, cost: 0.009, latency: 1200, time: '5 hours ago' },
  { id: 'ex_007', agent: 'Writer Agent', prompt: 'Create email sequence for launch', status: 'completed', tokens: 3600, cost: 0.018, latency: 1900, time: '6 hours ago' },
  { id: 'ex_008', agent: 'Research Agent', prompt: 'GDPR compliance for SaaS', status: 'completed', tokens: 5800, cost: 0.029, latency: 3100, time: '8 hours ago' },
];
export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const agents = [...new Set(EXECUTIONS.map(e => e.agent))];
  const filtered = EXECUTIONS.filter(e => {
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;
    if (search && !e.prompt.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const totTok = filtered.reduce((a, e) => a + e.tokens, 0);
  const totCost = filtered.reduce((a, e) => a + e.cost, 0);
  const sty = (s: string) => s === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600';
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Execution History</h1>
        <p className="text-sm text-gray-500">{filtered.length} executions &bull; {totTok.toLocaleString()} tokens &bull; {'$'}{totCost.toFixed(3)}</p>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search prompts..."
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
          <option value="all">All Status</option><option value="completed">Completed</option><option value="failed">Failed</option>
        </select>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {filtered.map(e => (
          <div key={e.id} className="px-5 py-3 border-b border-gray-100 last:border-0 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0">{e.agent.charAt(0)}</div>
              <div className="min-w-0"><div className="text-sm font-medium text-gray-900">{e.agent}</div><div className="text-xs text-gray-500 truncate">{e.prompt}</div></div>
            </div>
            <div className="flex items-center gap-5 shrink-0 text-xs">
              <span className="text-gray-400">{e.time}</span>
              <span className="text-gray-500 font-mono">{e.tokens.toLocaleString()} tok</span>
              <span className="text-gray-500 font-mono">{'$'}{e.cost.toFixed(3)}</span>
              <span className={'px-2 py-0.5 rounded-full text-[10px] font-semibold ' + sty(e.status)}>{e.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}