'use client';
import { useState, useEffect } from 'react';

export default function KnowledgePage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetch('/api/agents').then(r => r.json()).then(d => { setAgents(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false)); }, []);

  const totalTools = agents.reduce((sum, a) => sum + (a.tools?.length || 0), 0);

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Knowledge Base</h1>
          <p className="text-sm text-gray-500">Agent knowledge from your database — {agents.length} agents with {totalTools} tools indexed</p>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-indigo-700">Your agents have embedded knowledge through their <strong>backstory</strong>, <strong>goals</strong>, and <strong>tools</strong>. Each agent uses this context when executing via the Anthropic Claude API. The knowledge below is pulled live from your database.</p>
      </div>

      {loading ? (
        <div className="text-center py-12"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" /><p className="text-sm text-gray-400">Loading knowledge base...</p></div>
      ) : agents.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No agents yet</h3>
          <p className="text-sm text-gray-500 mb-4">Create agents to build your knowledge base</p>
          <a href="/agents/create" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Create Agent</a>
        </div>
      ) : (
        <div className="space-y-3">
          {agents.map((a: any) => (
            <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-bold">{(a.name || 'A').charAt(0)}</div>
                  <div>
                    <div className="text-[15px] font-semibold text-gray-900">{a.name}</div>
                    <div className="text-xs text-gray-500">{a.role} | {a.model}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-600">{a.runs || 0} runs</span>
                </div>
              </div>
              {a.goal && <div className="mb-2"><span className="text-[10px] font-semibold text-gray-400 uppercase">Goal</span><p className="text-xs text-gray-700 mt-0.5">{a.goal}</p></div>}
              {a.backstory && <div className="mb-2"><span className="text-[10px] font-semibold text-gray-400 uppercase">Knowledge / Backstory</span><p className="text-xs text-gray-600 mt-0.5">{a.backstory}</p></div>}
              {a.tools?.length > 0 && (
                <div><span className="text-[10px] font-semibold text-gray-400 uppercase">Tools</span><div className="flex flex-wrap gap-1 mt-1">{a.tools.map((t: string) => <span key={t} className="px-2 py-0.5 rounded text-[9px] font-mono bg-indigo-50 text-indigo-600">{t}</span>)}</div></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}