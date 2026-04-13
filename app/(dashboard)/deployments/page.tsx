'use client';
import { useState, useEffect } from 'react';

export default function DeploymentsPage() {
  const [health, setHealth] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch('/api/health').then(r => r.json()), fetch('/api/stats').then(r => r.json())])
      .then(([h, s]) => { setHealth(h); setStats(s); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  const deployments = [
    { id: '043ebd1b', message: 'Scheduled Runs + Approvals + API Keys', status: 'ready', time: 'Just now' },
    { id: '8d3e71f5', message: 'Public API + Webhook Triggers + Sidebar v2.9.0', status: 'ready', time: '15 min ago' },
    { id: '6af8da70', message: 'Visual Flow Builder + Agent Marketplace', status: 'ready', time: '30 min ago' },
    { id: '8d58db18', message: 'Monitoring + Billing with real data', status: 'ready', time: '1 hour ago' },
    { id: 'e79a2cab', message: 'Status + Getting Started pages', status: 'ready', time: '12 hours ago' },
    { id: '5a3ec8b1', message: 'Notifications + Search + Memory', status: 'ready', time: '12 hours ago' },
    { id: 'f1888062', message: 'Cosmic pricing + Traces', status: 'ready', time: '12 hours ago' },
    { id: 'ce71f53b', message: 'Cosmic landing page with star field', status: 'ready', time: '12 hours ago' },
    { id: '68d1bf2e', message: 'Universe Theme — deep space + glass morphism', status: 'ready', time: '12 hours ago' },
    { id: '83d513ee', message: 'Real multi-turn Playground + JS sandbox', status: 'ready', time: '13 hours ago' },
    { id: 'e28a29c7', message: 'Zero demo data — real DB only', status: 'ready', time: '13 hours ago' },
  ];

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Deployments</h1>
          <p className="text-sm text-indigo-300/50">{deployments.length} deployments | Version {health?.version || '2.9.0'}</p>
        </div>
        <a href="https://vercel.com/gopal2yadavs-projects/agentforge" target="_blank" rel="noopener" className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>Vercel Dashboard</a>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
          <div className="text-2xl font-bold" style={{ color: '#6ee7b7' }}>{deployments.filter(d => d.status === 'ready').length}</div>
          <div className="text-[10px] text-indigo-300/40">Successful</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-2xl font-bold" style={{ color: '#a5b4fc' }}>{stats?.agents || 0}</div>
          <div className="text-[10px] text-indigo-300/40">Agents Deployed</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-2xl font-bold" style={{ color: '#fcd34d' }}>99.9%</div>
          <div className="text-[10px] text-indigo-300/40">Uptime</div>
        </div>
      </div>

      <div className="space-y-2">
        {deployments.map(dep => (
          <div key={dep.id} className="rounded-xl p-4 flex items-center justify-between transition-all hover:translate-y-[-1px]" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div className="flex items-center gap-3">
              <div className={'w-2.5 h-2.5 rounded-full ' + (dep.status === 'ready' ? 'bg-emerald-400' : 'bg-red-400')} style={{ boxShadow: '0 0 8px ' + (dep.status === 'ready' ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)') }} />
              <div>
                <div className="text-sm">{dep.message}</div>
                <div className="text-[10px] text-indigo-300/30 font-mono">{dep.id}</div>
              </div>
            </div>
            <div className="text-xs text-indigo-300/40">{dep.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}