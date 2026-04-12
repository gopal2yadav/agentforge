'use client';
import { useState, useEffect } from 'react';

export default function MonitoringPage() {
  const [health, setHealth] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/health').then(r => r.json()),
      fetch('/api/stats').then(r => r.json()),
    ]).then(([h, s]) => { setHealth(h); setStats(s); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const statusColor = (s: string) => s === 'connected' || s === 'configured' || s === 'running' || s === 'healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600';

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" /><p className="text-sm text-gray-400">Loading health data...</p></div>;

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Monitoring</h1>
          <p className="text-sm text-gray-500">Real-time platform health and performance</p>
        </div>
        <span className={'px-3 py-1.5 rounded-full text-xs font-semibold ' + statusColor(health?.status)}>{health?.status === 'healthy' ? 'All Systems Operational' : health?.status || 'Unknown'}</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-xs text-gray-400 mb-1">Agents</div>
          <div className="text-2xl font-bold text-indigo-600">{stats?.agents || 0}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-xs text-gray-400 mb-1">Flows</div>
          <div className="text-2xl font-bold text-emerald-600">{stats?.flows || 0}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-xs text-gray-400 mb-1">Total Runs</div>
          <div className="text-2xl font-bold text-gray-900">{stats?.totalRuns || 0}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-xs text-gray-400 mb-1">DB Latency</div>
          <div className="text-2xl font-bold text-gray-900">{health?.services?.database?.latency || 'N/A'}</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Service Health</h2>
        <div className="space-y-3">
          {health?.services && Object.entries(health.services).map(([name, svc]: [string, any]) => (
            <div key={name} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className={'w-2.5 h-2.5 rounded-full ' + (svc.status === 'connected' || svc.status === 'configured' || svc.status === 'running' ? 'bg-emerald-500' : 'bg-amber-500')} />
                <div>
                  <div className="text-sm font-medium text-gray-900 capitalize">{name}</div>
                  {svc.latency && <div className="text-xs text-gray-400">Latency: {svc.latency}</div>}
                </div>
              </div>
              <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + statusColor(svc.status)}>{svc.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-2">Platform Info</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div><span className="text-gray-400">Version:</span> <span className="font-medium">{health?.version || '2.8.0'}</span></div>
          <div><span className="text-gray-400">Plan:</span> <span className="font-medium">{stats?.plan || 'Free'}</span></div>
          <div><span className="text-gray-400">Last checked:</span> <span className="font-medium">{health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : 'N/A'}</span></div>
        </div>
      </div>
    </div>
  );
}