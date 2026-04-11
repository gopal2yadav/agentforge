'use client';
import { useState } from 'react';

const MEMORIES = [
  { id: 'm1', agent: 'Research Agent', key: 'market_trends_q1', content: 'EdTech market growing 34% YoY. Key drivers: AI tutoring (+52%), personalized learning, automated assessment. Top players: Coursera, Duolingo, Khan Academy.', importance: 0.92, tokens: 156, created: '15 min ago', type: 'long_term' },
  { id: 'm2', agent: 'Research Agent', key: 'competitor_analysis', content: 'CrewAI: $18M ARR, 500+ enterprise customers. LangChain: Open-source, 70K GitHub stars. AutoGen: Microsoft-backed, strong multi-agent focus.', importance: 0.88, tokens: 134, created: '1 hour ago', type: 'long_term' },
  { id: 'm3', agent: 'Writer Agent', key: 'blog_draft_healthcare', content: 'Draft: "AI in Healthcare 2026" — 2,400 words covering: diagnostic AI, drug discovery, patient monitoring. Key stat: 78% of hospitals now use AI-assisted diagnostics.', importance: 0.75, tokens: 245, created: '2 hours ago', type: 'working' },
  { id: 'm4', agent: 'Code Reviewer', key: 'pr_142_review', content: 'PR #142 review: Auth middleware implementation. 3 suggestions: use const instead of let, add error boundary, clean up unused imports. Overall quality: B+.', importance: 0.65, tokens: 89, created: '3 hours ago', type: 'working' },
  { id: 'm5', agent: 'Coordinator', key: 'team_context', content: 'Current sprint: Q2 planning. Active projects: Nexus v2.5 launch, API docs rewrite, Enterprise onboarding flow. Team capacity: 80%.', importance: 0.82, tokens: 78, created: '5 hours ago', type: 'long_term' },
  { id: 'm6', agent: 'Data Analyst', key: 'revenue_summary', content: 'Q1 revenue: $142K (+23% QoQ). Top segment: Enterprise (62%). Churn rate: 3.2%. NRR: 118%. Pipeline: $890K weighted.', importance: 0.95, tokens: 67, created: '8 hours ago', type: 'long_term' },
];

export default function MemoryPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = MEMORIES.filter(m => {
    if (typeFilter !== 'all' && m.type !== typeFilter) return false;
    if (search && !m.key.includes(search.toLowerCase()) && !m.content.toLowerCase().includes(search.toLowerCase()) && !m.agent.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalTokens = MEMORIES.reduce((a, m) => a + m.tokens, 0);
  const importanceColor = (v: number) => v >= 0.9 ? 'text-red-600 bg-red-50' : v >= 0.7 ? 'text-amber-600 bg-amber-50' : 'text-gray-500 bg-gray-50';

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Memory Explorer</h1>
          <p className="text-sm text-gray-500">{MEMORIES.length} entries &bull; {totalTokens} tokens stored</p>
        </div>
        <button onClick={() => alert('Memory cleared! All working memory entries have been flushed.')} className="px-4 py-2 rounded-lg border border-red-200 text-sm text-red-500 hover:bg-red-50 transition-colors">Clear Working Memory</button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search memories by key, content, or agent..."
          className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
        <div className="flex gap-1">
          {['all', 'long_term', 'working'].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={'px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ' + (typeFilter === t ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-900')}>
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(m => (
          <div key={m.id} onClick={() => setExpanded(expanded === m.id ? null : m.id)}
            className={'bg-white border rounded-xl shadow-sm transition-all cursor-pointer ' + (expanded === m.id ? 'border-indigo-200 shadow-md' : 'border-gray-200 hover:border-indigo-200')}>
            <div className="px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0">{m.agent.charAt(0)}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{m.key}</span>
                    <span className={'px-1.5 py-0.5 rounded text-[9px] font-semibold ' + (m.type === 'long_term' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-500')}>{m.type.replace('_', ' ')}</span>
                  </div>
                  <div className="text-[10px] text-gray-400">{m.agent} &bull; {m.created}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[10px] text-gray-400">{m.tokens} tok</span>
                <span className={'px-2 py-0.5 rounded-full text-[9px] font-bold ' + importanceColor(m.importance)}>{(m.importance * 100).toFixed(0)}%</span>
                <span className="text-gray-300 text-xs">{expanded === m.id ? '▲' : '▼'}</span>
              </div>
            </div>
            {expanded === m.id && (
              <div className="px-5 pb-4 border-t border-gray-100 pt-3">
                <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-700 font-mono leading-relaxed border border-gray-100">{m.content}</div>
                <div className="flex gap-2 mt-3">
                  <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(m.content).catch(() => {}); alert('Copied to clipboard!'); }}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">Copy</button>
                  <button onClick={(e) => { e.stopPropagation(); alert('Memory entry deleted.'); }}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-red-200 text-red-500 hover:bg-red-50 transition-colors">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
