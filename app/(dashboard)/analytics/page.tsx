'use client';
import { useState, useEffect } from 'react';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [agents, setAgents] = useState<any[]>([]);
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/stats').then(r => r.json()),
      fetch('/api/agents').then(r => r.json()),
      fetch('/api/health').then(r => r.json()),
    ]).then(([s, a, h]) => {
      setStats(s);
      setAgents(Array.isArray(a) ? a : []);
      setHealth(h);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" /><p className="text-sm text-gray-400">Loading analytics...</p></div>;

  const toolCounts: Record<string, number> = {};
  agents.forEach(a => (a.tools || []).forEach((t: string) => { toolCounts[t] = (toolCounts[t] || 0) + 1; }));
  const topTools = Object.entries(toolCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const modelCounts: Record<string, number> = {};
  agents.forEach(a => { modelCounts[a.model || 'claude-sonnet-4'] = (modelCounts[a.model || 'claude-sonnet-4'] || 0) + 1; });

  return (
    <div className="max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Analytics</h1>
      <p className="text-sm text-gray-500 mb-6">Platform analytics from real database data</p>

      <div className="grid grid-cols-5 gap-3 mb-8">
        {[
          { label: 'Agents', value: stats?.agents, color: 'text-indigo-600' },
          { label: 'Flows', value: stats?.flows, color: 'text-emerald-600' },
          { label: 'Crews', value: stats?.crews, color: 'text-amber-600' },
          { label: 'Runs', value: stats?.totalRuns, color: 'text-purple-600' },
          { label: 'Tokens', value: ((stats?.tokensUsed || 0) / 1000).toFixed(1) + 'K', color: 'text-gray-900' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className={'text-2xl font-bold ' + s.color}>{s.value || 0}</div>
            <div className="text-[10px] text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Tool Usage Distribution</h2>
          <div className="space-y-2">
            {topTools.map(([tool, count]) => (
              <div key={tool} className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-600 w-28 truncate">{tool}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: Math.round((count / agents.length) * 100) + '%' }} />
                </div>
                <span className="text-xs text-gray-400 w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Model Distribution</h2>
          <div className="space-y-3">
            {Object.entries(modelCounts).map(([model, count]) => (
              <div key={model} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-sm text-gray-700">{model}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{count}</span>
                  <span className="text-xs text-gray-400">({Math.round((count / agents.length) * 100)}%)</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-400 mb-2">System Health</h3>
            <div className="text-xs text-gray-500">DB Latency: <strong className="text-gray-900">{health?.services?.database?.latency || 'N/A'}</strong></div>
            <div className="text-xs text-gray-500">Version: <strong className="text-gray-900">{health?.version || '2.8.0'}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}