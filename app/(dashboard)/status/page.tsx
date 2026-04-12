'use client';
import { useState, useEffect } from 'react';

export default function StatusPage() {
  const [health, setHealth] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState('');

  const checkHealth = () => {
    setLoading(true);
    Promise.all([fetch('/api/health').then(r => r.json()), fetch('/api/stats').then(r => r.json())])
      .then(([h, s]) => { setHealth(h); setStats(s); setLastCheck(new Date().toLocaleTimeString()); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { checkHealth(); const interval = setInterval(checkHealth, 30000); return () => clearInterval(interval); }, []);

  const isUp = (s: string) => ['connected', 'configured', 'running', 'healthy'].includes(s);

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">System Status</h1>
          <p className="text-sm text-indigo-300/50">Auto-refreshes every 30 seconds | Last: {lastCheck || '...'}</p>
        </div>
        <button onClick={checkHealth} disabled={loading} className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white' }}>{loading ? 'Checking...' : 'Check Now'}</button>
      </div>

      <div className="rounded-xl p-6 mb-6 text-center" style={{ background: health?.status === 'healthy' ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)', border: '1px solid ' + (health?.status === 'healthy' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)') }}>
        <div className={'w-4 h-4 rounded-full mx-auto mb-3 ' + (health?.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400')} style={{ boxShadow: '0 0 20px ' + (health?.status === 'healthy' ? 'rgba(16,185,129,0.5)' : 'rgba(245,158,11,0.5)') }} />
        <div className="text-xl font-bold mb-1" style={{ color: health?.status === 'healthy' ? '#6ee7b7' : '#fcd34d' }}>{health?.status === 'healthy' ? 'All Systems Operational' : 'Checking...'}</div>
        <div className="text-xs text-indigo-300/40">Version {health?.version || '...'} | {health?.timestamp ? new Date(health.timestamp).toLocaleString() : '...'}</div>
      </div>

      <div className="space-y-3 mb-6">
        {health?.services && Object.entries(health.services).map(([name, svc]: [string, any]) => (
          <div key={name} className="rounded-xl p-4 flex items-center justify-between" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div className="flex items-center gap-3">
              <div className={'w-3 h-3 rounded-full ' + (isUp(svc.status) ? 'bg-emerald-400' : 'bg-red-400')} style={{ boxShadow: '0 0 10px ' + (isUp(svc.status) ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)') }} />
              <div>
                <div className="text-sm font-semibold capitalize">{name}</div>
                {svc.latency && <div className="text-[10px] text-indigo-300/40">{svc.latency} latency</div>}
              </div>
            </div>
            <span className="text-xs font-semibold" style={{ color: isUp(svc.status) ? '#6ee7b7' : '#f87171' }}>{svc.status}</span>
          </div>
        ))}
      </div>

      {stats && (
        <div className="rounded-xl p-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-sm font-semibold mb-3">Platform Resources</div>
          <div className="grid grid-cols-5 gap-3">
            {[
              { l: 'Agents', v: stats.agents, c: '#a5b4fc' },
              { l: 'Flows', v: stats.flows, c: '#6ee7b7' },
              { l: 'Crews', v: stats.crews, c: '#fcd34d' },
              { l: 'Runs', v: stats.totalRuns, c: '#c4b5fd' },
              { l: 'Tokens', v: (stats.tokensUsed/1000).toFixed(1)+'K', c: '#f0abfc' },
            ].map(s => (
              <div key={s.l} className="text-center p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <div className="text-lg font-bold" style={{ color: s.c }}>{s.v}</div>
                <div className="text-[9px] text-indigo-300/40">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}