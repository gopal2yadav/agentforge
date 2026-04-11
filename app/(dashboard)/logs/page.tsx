'use client';
import { useState } from 'react';
const LOGS = [
  { ts: '11:45:23.142', level: 'info', agent: 'Research Agent', msg: 'Starting execution — prompt: "Analyze Q1 EdTech trends"', reqId: 'req_a1b2c3' },
  { ts: '11:45:23.245', level: 'info', agent: 'Research Agent', msg: 'Selected model: claude-sonnet-4 (Anthropic)', reqId: 'req_a1b2c3' },
  { ts: '11:45:23.890', level: 'info', agent: 'Research Agent', msg: 'Tool invoked: web_search("EdTech market Q1 2026")', reqId: 'req_a1b2c3' },
  { ts: '11:45:25.120', level: 'info', agent: 'Research Agent', msg: 'web_search returned 8 results (1.23s)', reqId: 'req_a1b2c3' },
  { ts: '11:45:25.450', level: 'info', agent: 'Research Agent', msg: 'Generating response — input: 1,200 tokens', reqId: 'req_a1b2c3' },
  { ts: '11:45:27.200', level: 'info', agent: 'Research Agent', msg: 'Execution completed — output: 2,000 tokens, total: 3,200 tokens (1.85s)', reqId: 'req_a1b2c3' },
  { ts: '11:44:12.001', level: 'error', agent: 'Data Analyst', msg: 'Connection timeout: OpenAI API unreachable after 30s', reqId: 'req_d4e5f6' },
  { ts: '11:44:11.500', level: 'warn', agent: 'Data Analyst', msg: 'Retry attempt 3/3 — still failing', reqId: 'req_d4e5f6' },
  { ts: '11:43:00.100', level: 'info', agent: 'Code Reviewer', msg: 'Execution completed — 2,800 tokens, 3 suggestions generated (2.1s)', reqId: 'req_g7h8i9' },
  { ts: '11:42:58.000', level: 'info', agent: 'Code Reviewer', msg: 'Tool invoked: github_pr("PR #142")', reqId: 'req_g7h8i9' },
];
export default function LogsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const filtered = LOGS.filter(l => {
    if (filter !== 'all' && l.level !== filter) return false;
    if (search && !l.msg.toLowerCase().includes(search.toLowerCase()) && !l.agent.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const levelStyle = (l) => l === 'error' ? 'text-red-600 bg-red-50' : l === 'warn' ? 'text-amber-600 bg-amber-50' : 'text-blue-600 bg-blue-50';
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Agent Logs</h1><p className="text-sm text-gray-500">Real-time execution logs across all agents</p></div>
      <div className="flex items-center gap-3 mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..."
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
        <div className="flex gap-1">
          {['all', 'info', 'warn', 'error'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={'px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ' + (filter === f ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-900')}>{f}</button>
          ))}
        </div>
      </div>
      <div className="bg-gray-900 rounded-xl shadow-sm overflow-hidden font-mono text-xs">
        {filtered.map((l, i) => (
          <div key={i} className="px-4 py-2 border-b border-gray-800 flex items-start gap-3 hover:bg-gray-800 transition-colors">
            <span className="text-gray-500 shrink-0">{l.ts}</span>
            <span className={'px-1.5 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 ' + levelStyle(l.level)}>{l.level}</span>
            <span className="text-indigo-400 shrink-0 w-28 truncate">{l.agent}</span>
            <span className="text-gray-300 break-all">{l.msg}</span>
            <span className="text-gray-600 shrink-0 ml-auto">{l.reqId}</span>
          </div>
        ))}
      </div>
    </div>
  );
}