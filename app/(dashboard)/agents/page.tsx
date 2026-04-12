'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/agents')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setAgents(data);
        else setError(data.error || 'Failed to load agents');
        setLoading(false);
      })
      .catch(e => { setError('Network error'); setLoading(false); });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this agent? This cannot be undone.')) return;
    const res = await fetch('/api/agents?id=' + id, { method: 'DELETE' });
    if (res.ok) setAgents(agents.filter(a => a.id !== id));
  };

  const handleRun = async (agent: any) => {
    const prompt = window.prompt('Enter a task for ' + agent.name + ':');
    if (!prompt) return;
    const res = await fetch('/api/agents/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agentId: agent.id, prompt })
    });
    const data = await res.json();
    if (data.reply) {
      alert(agent.name + ' responded:\n\n' + data.reply.substring(0, 500));
      setAgents(agents.map(a => a.id === agent.id ? { ...a, runs: (a.runs || 0) + 1 } : a));
    } else {
      alert('Error: ' + (data.error || 'No response'));
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Agents</h1>
          <p className="text-sm text-gray-500">{agents.length} agents in database</p>
        </div>
        <div className="flex gap-2">
          <Link href="/templates" className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-indigo-200">Templates</Link>
          <Link href="/agents/create" className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ New Agent</Link>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}

      {loading ? (
        <div className="text-center py-12"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" /><p className="text-sm text-gray-400">Loading from database...</p></div>
      ) : agents.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl font-bold mx-auto mb-3">0</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No agents in database</h3>
          <p className="text-sm text-gray-500 mb-4">Create your first agent or deploy a swarm from the AI Builder</p>
          <div className="flex gap-2 justify-center">
            <Link href="/agents/create" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Create Agent</Link>
            <Link href="/builder" className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-indigo-200">Deploy Swarm</Link>
          </div>
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
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-indigo-50 text-indigo-600">{a.model}</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">{a.status}</span>
                  <button onClick={() => handleRun(a)} className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-[10px] font-semibold hover:bg-indigo-700">Run</button>
                  <button onClick={() => handleDelete(a.id)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>{(a.tools || []).length} tools</span>
                <span>{a.runs || 0} runs</span>
                {a.goal && <span className="text-gray-500 truncate max-w-[300px]">{a.goal}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}