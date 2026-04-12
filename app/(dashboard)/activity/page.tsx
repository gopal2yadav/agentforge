'use client';
import { useState, useEffect } from 'react';

export default function ActivityPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/agents').then(r => r.json()),
      fetch('/api/stats').then(r => r.json()),
    ]).then(([a, s]) => {
      setAgents(Array.isArray(a) ? a : []);
      setStats(s);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const activeAgents = agents.filter(a => a.runs > 0);
  const recentAgents = [...agents].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 10);

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" /><p className="text-sm text-gray-400">Loading activity...</p></div>;

  return (
    <div className="max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Activity</h1>
      <p className="text-sm text-gray-500 mb-6">Real-time platform activity from your database</p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5"><div className="text-xs text-gray-400 mb-1">Total Agents</div><div className="text-2xl font-bold text-indigo-600">{stats?.agents || 0}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5"><div className="text-xs text-gray-400 mb-1">Total Runs</div><div className="text-2xl font-bold text-emerald-600">{stats?.totalRuns || 0}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5"><div className="text-xs text-gray-400 mb-1">Tokens Used</div><div className="text-2xl font-bold text-gray-900">{((stats?.tokensUsed || 0) / 1000).toFixed(1)}K</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5"><div className="text-xs text-gray-400 mb-1">Active Agents</div><div className="text-2xl font-bold text-purple-600">{activeAgents.length}</div></div>
      </div>

      {activeAgents.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Agents with Runs</h2>
          <div className="space-y-2">
            {activeAgents.map(a => (
              <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-bold">{a.name.charAt(0)}</div>
                  <div><div className="text-sm font-medium text-gray-900">{a.name}</div><div className="text-xs text-gray-400">{a.role}</div></div>
                </div>
                <span className="text-sm font-semibold text-emerald-600">{a.runs} runs</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Recently Created Agents</h2>
        <div className="space-y-2">
          {recentAgents.map(a => (
            <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">{a.name.charAt(0)}</div>
                <div><div className="text-sm font-medium text-gray-900">{a.name}</div><div className="text-xs text-gray-400">{a.role} | {(a.tools || []).length} tools</div></div>
              </div>
              <span className="text-xs text-gray-400">{new Date(a.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}