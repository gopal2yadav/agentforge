'use client';
import { useState, useEffect } from 'react';

export default function MonitoringPage() {
  const [health, setHealth] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checks, setChecks] = useState<any[]>([]);

  const runCheck = async () => {
    const start = Date.now();
    try {
      const [h, s] = await Promise.all([
        fetch('/api/health').then(r => r.json()),
        fetch('/api/stats').then(r => r.json()),
      ]);
      const latency = Date.now() - start;
      setHealth(h);
      setStats(s);
      setChecks(prev => [{
        time: new Date().toLocaleTimeString(),
        status: h.status,
        latency: latency + 'ms',
        dbLatency: h.services?.database?.latency || 'N/A',
      }, ...prev].slice(0, 20));
      setLoading(false);
    } catch (e) {
      setChecks(prev => [{ time: new Date().toLocaleTimeString(), status: 'error', latency: (Date.now() - start) + 'ms', dbLatency: 'N/A' }, ...prev].slice(0, 20));
      setLoading(false);
    }
  };

  useEffect(() => { runCheck(); const iv = setInterval(runCheck, 30000); return () => clearInterval(iv); }, []);

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  const services = health?.services || {};

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Monitoring</h1>
          <p className="text-sm text-indigo-300/50">Real-time health monitoring | Auto-refreshes every 30s</p>
        </div>
        <button onClick={runCheck} className="px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>Check Now</button>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-6">
        {Object.entries(services).map(([name, svc]: [string, any]) => {
          const isUp = ['connected', 'configured', 'running'].includes(svc.status);
          return (
            <div key={name} className="rounded-xl p-4 text-center" style={{ background: isUp ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)', border: '1px solid ' + (isUp ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)') }}>
              <div className={'w-3 h-3 rounded-full mx-auto mb-2 ' + (isUp ? 'bg-emerald-400' : 'bg-red-400')} style={{ boxShadow: '0 0 10px ' + (isUp ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)') }} />
              <div className="text-xs font-semibold capitalize">{name}</div>
              <div className="text-[10px] text-indigo-300/40 mt-0.5">{svc.status}</div>
              {svc.latency && <div className="text-[10px] font-mono mt-0.5" style={{ color: '#6ee7b7' }}>{svc.latency}</div>}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="rounded-xl p-5" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-sm font-semibold mb-4">Platform Stats</div>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-xs text-indigo-300/50">Agents</span><span className="text-sm font-bold" style={{ color: '#a5b4fc' }}>{stats?.agents || 0}</span></div>
            <div className="flex justify-between"><span className="text-xs text-indigo-300/50">Flows</span><span className="text-sm font-bold" style={{ color: '#6ee7b7' }}>{stats?.flows || 0}</span></div>
            <div className="flex justify-between"><span className="text-xs text-indigo-300/50">Crews</span><span className="text-sm font-bold" style={{ color: '#fcd34d' }}>{stats?.crews || 0}</span></div>
            <div className="flex justify-between"><span className="text-xs text-indigo-300/50">Total Runs</span><span className="text-sm font-bold" style={{ color: '#c4b5fd' }}>{stats?.totalRuns || 0}</span></div>
            <div className="flex justify-between"><span className="text-xs text-indigo-300/50">Tokens Used</span><span className="text-sm font-bold" style={{ color: '#f0abfc' }}>{(stats?.tokensUsed || 0).toLocaleString()}</span></div>
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-sm font-semibold mb-4">Health Check Log</div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {checks.length === 0 ? (
              <div className="text-xs text-indigo-300/40 text-center py-4">Running first check...</div>
            ) : checks.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-1 text-[10px] font-mono">
                <span className="text-indigo-300/40">{c.time}</span>
                <span style={{ color: c.status === 'healthy' ? '#6ee7b7' : '#f87171' }}>{c.status}</span>
                <span className="text-indigo-300/50">{c.latency}</span>
                <span className="text-indigo-300/40">DB: {c.dbLatency}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl p-5" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <div className="text-sm font-semibold mb-2">System Info</div>
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div><span className="text-indigo-300/40">Version</span><div className="font-medium mt-0.5">{health?.version || '...'}</div></div>
          <div><span className="text-indigo-300/40">Region</span><div className="font-medium mt-0.5">IAD1 (US East)</div></div>
          <div><span className="text-indigo-300/40">Platform</span><div className="font-medium mt-0.5">Vercel + Neon</div></div>
          <div><span className="text-indigo-300/40">AI Model</span><div className="font-medium mt-0.5">Claude Sonnet 4</div></div>
        </div>
      </div>
    </div>
  );
}