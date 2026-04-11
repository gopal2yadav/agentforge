'use client';
import { useState } from 'react';
const M = [
  { id: 'm1', agent: 'Research Agent', key: 'market_trends', content: 'EdTech growing 34% YoY. AI tutoring +52%.', imp: 0.92, tok: 156, time: '15 min ago', type: 'long_term' },
  { id: 'm2', agent: 'Research Agent', key: 'competitor_data', content: 'CrewAI: 500+ customers. LangChain: 70K stars.', imp: 0.88, tok: 134, time: '1 hour ago', type: 'long_term' },
  { id: 'm3', agent: 'Writer Agent', key: 'blog_draft', content: 'AI in Healthcare 2026 - 2,400 words. 78% hospitals use AI.', imp: 0.75, tok: 245, time: '2 hours ago', type: 'working' },
  { id: 'm4', agent: 'Code Reviewer', key: 'pr_review', content: 'PR #142: 3 suggestions - const, error boundary, cleanup.', imp: 0.65, tok: 89, time: '3 hours ago', type: 'working' },
  { id: 'm5', agent: 'Coordinator', key: 'team_ctx', content: 'Sprint: Q2 planning. Capacity: 80%.', imp: 0.82, tok: 78, time: '5 hours ago', type: 'long_term' },
];
export default function MemoryPage() {
  const [exp, setExp] = useState(null as string | null);
  const [tf, setTf] = useState('all');
  const ic = (v: number) => v >= 0.9 ? 'text-red-600 bg-red-50' : v >= 0.7 ? 'text-amber-600 bg-amber-50' : 'text-gray-500 bg-gray-50';
  const f = M.filter(m => tf === 'all' || m.type === tf);
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Memory Explorer</h1><p className="text-sm text-gray-500">{M.length} entries</p></div><button onClick={() => alert('Cleared!')} className="px-4 py-2 rounded-lg border border-red-200 text-sm text-red-500 hover:bg-red-50">Clear Working Memory</button></div>
      <div className="flex gap-1 mb-4">{['all', 'long_term', 'working'].map(t => (<button key={t} onClick={() => setTf(t)} className={'px-3 py-1.5 rounded-lg text-xs font-semibold capitalize ' + (tf === t ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400')}>{t.replace('_', ' ')}</button>))}</div>
      <div className="space-y-2">{f.map(m => (
        <div key={m.id} onClick={() => setExp(exp === m.id ? null : m.id)} className={'bg-white border rounded-xl shadow-sm cursor-pointer transition-all ' + (exp === m.id ? 'border-indigo-200 shadow-md' : 'border-gray-200 hover:border-indigo-200')}>
          <div className="px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">{m.agent.charAt(0)}</div><div><div className="text-sm font-medium text-gray-900">{m.key}</div><div className="text-[10px] text-gray-400">{m.agent} - {m.time}</div></div></div>
            <div className="flex items-center gap-3"><span className="text-[10px] text-gray-400">{m.tok} tok</span><span className={'px-2 py-0.5 rounded-full text-[9px] font-bold ' + ic(m.imp)}>{(m.imp * 100).toFixed(0)}%</span></div>
          </div>
          {exp === m.id && (<div className="px-5 pb-4 border-t border-gray-100 pt-3"><div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-700 font-mono border border-gray-100">{m.content}</div><div className="flex gap-2 mt-3"><button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(m.content).catch(() => {}); alert('Copied!'); }} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-gray-200 text-gray-600 hover:bg-indigo-50">Copy</button><button onClick={(e) => { e.stopPropagation(); alert('Deleted'); }} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-red-200 text-red-500 hover:bg-red-50">Delete</button></div></div>)}
        </div>
      ))}</div>
    </div>
  );
}