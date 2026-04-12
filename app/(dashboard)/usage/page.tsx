'use client';
import { useState, useEffect } from 'react';

export default function UsagePage() {
  const [stats, setStats] = useState<any>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch('/api/stats').then(r => r.json()), fetch('/api/agents').then(r => r.json())]).then(([s, a]) => { setStats(s); setAgents(Array.isArray(a) ? a : []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  const agentsWithRuns = agents.filter(a => a.runs > 0).sort((a, b) => b.runs - a.runs);
  const cost = ((stats?.tokensUsed || 0) / 1000000 * 3).toFixed(4);

  return (
    <div className="max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Usage</h1>
      <p className="text-sm text-gray-500 mb-6">Real token usage and cost tracking</p>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5"><div className="text-xs text-gray-400 mb-1">Total Tokens</div><div className="text-2xl font-bold text-indigo-600">{(stats?.tokensUsed || 0).toLocaleString()}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5"><div className="text-xs text-gray-400 mb-1">Total Runs</div><div className="text-2xl font-bold text-emerald-600">{stats?.totalRuns || 0}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5"><div className="text-xs text-gray-400 mb-1">Est. Cost</div><div className="text-2xl font-bold text-gray-900">{'$' + cost}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5"><div className="text-xs text-gray-400 mb-1">Avg Tokens/Run</div><div className="text-2xl font-bold text-purple-600">{stats?.totalRuns ? Math.round((stats?.tokensUsed || 0) / stats.totalRuns) : 0}</div></div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Usage by Agent</h2>
        {agentsWithRuns.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No agent runs yet. Use the Playground or run an agent to see usage.</p>
        ) : (
          <div className="space-y-3">{agentsWithRuns.map(a => (
            <div key={a.id} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-gray-900 truncate">{a.name}</div>
              <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden"><div className="bg-indigo-500 h-full rounded-full" style={{ width: Math.max(10, (a.runs / Math.max(...agentsWithRuns.map((x: any) => x.runs)) * 100)) + '%' }} /></div>
              <span className="text-xs text-gray-500 w-16 text-right">{a.runs} runs</span>
            </div>
          ))}</div>
        )}
      </div>
    </div>
  );
}