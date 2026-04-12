'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agents').then(r => r.json()).then(data => { setAgents(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this agent?')) return;
    await fetch('/api/agents?id=' + id, { method: 'DELETE' });
    setAgents(agents.filter(a => a.id !== id));
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Agents</h1>
          <p className="text-sm text-gray-500">{agents.length} agents configured</p>
        </div>
        <Link href="/agents/create" className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ New Agent</Link>
      </div>
      {loading ? (
        <div className="text-center py-12"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" /><p className="text-sm text-gray-400">Loading agents...</p></div>
      ) : agents.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <div className="text-4xl mb-3">\u{1F916}</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No agents yet</h3>
          <p className="text-sm text-gray-500 mb-4">Create your first AI agent to get started</p>
          <Link href="/agents/create" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Create Agent</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {agents.map((a: any) => (
            <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-bold">{(a.name || 'A').charAt(0)}</div>
                  <div>
                    <div className="text-[15px] font-semibold text-gray-900">{a.name}</div>
                    <div className="text-xs text-gray-500">{a.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-indigo-50 text-indigo-600">{a.model || 'claude-sonnet-4'}</span>
                  <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + (a.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{a.status || 'active'}</span>
                  {!a.id.startsWith('demo_') && <button onClick={() => handleDelete(a.id)} className="text-xs text-red-400 hover:text-red-600">Delete</button>}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>{(a.tools || []).length} tools</span>
                <span>{a.runs || 0} runs</span>
                {a.goal && <span className="text-gray-500">Goal: {a.goal}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}