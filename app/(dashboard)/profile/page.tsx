'use client';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [stats, setStats] = useState<any>(null);
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch('/api/stats').then(r => r.json()), fetch('/api/health').then(r => r.json())])
      .then(([s, h]) => { setStats(s); setHealth(h); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Profile</h1>
      <p className="text-sm text-indigo-300/50 mb-8">Your account and platform information</p>
      <div className="space-y-6">
        <div className="rounded-xl p-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}>G</div>
            <div>
              <div className="text-lg font-bold">Gopal Yadav</div>
              <div className="text-sm text-indigo-300/50">gopal@aabhyasa.com</div>
              <div className="text-xs text-indigo-400/40 mt-1">Owner | MSA</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-xs text-indigo-400/40">Plan</span><div className="text-sm font-medium mt-0.5" style={{ color: '#a5b4fc' }}>{stats?.plan || '...'}</div></div>
            <div><span className="text-xs text-indigo-400/40">Domain</span><div className="text-sm font-medium mt-0.5">agentforcecrew.com</div></div>
            <div><span className="text-xs text-indigo-400/40">Version</span><div className="text-sm font-medium mt-0.5">{health?.version || '...'}</div></div>
            <div><span className="text-xs text-indigo-400/40">Region</span><div className="text-sm font-medium mt-0.5">IAD1 (US East)</div></div>
          </div>
        </div>
        <div className="rounded-xl p-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-sm font-semibold mb-4">Resources</div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}><div className="text-xl font-bold" style={{ color: '#a5b4fc' }}>{stats?.agents || 0}</div><div className="text-[10px] text-indigo-300/40 mt-1">Agents</div></div>
            <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}><div className="text-xl font-bold" style={{ color: '#6ee7b7' }}>{stats?.flows || 0}</div><div className="text-[10px] text-indigo-300/40 mt-1">Flows</div></div>
            <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}><div className="text-xl font-bold" style={{ color: '#fcd34d' }}>{stats?.crews || 0}</div><div className="text-[10px] text-indigo-300/40 mt-1">Crews</div></div>
            <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}><div className="text-xl font-bold" style={{ color: '#c4b5fd' }}>{stats?.totalRuns || 0}</div><div className="text-[10px] text-indigo-300/40 mt-1">Runs</div></div>
            <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}><div className="text-xl font-bold" style={{ color: '#f0abfc' }}>{((stats?.tokensUsed || 0)/1000).toFixed(1)}K</div><div className="text-[10px] text-indigo-300/40 mt-1">Tokens</div></div>
            <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}><div className="text-xl font-bold" style={{ color: '#93c5fd' }}>{stats?.automations || 0}</div><div className="text-[10px] text-indigo-300/40 mt-1">Automations</div></div>
          </div>
        </div>
        <div className="rounded-xl p-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-sm font-semibold mb-4">Admin Links</div>
          <div className="grid grid-cols-2 gap-2">
            {[['Vercel Dashboard','https://vercel.com/gopal2yadavs-projects/agentforge'],['GitHub Repo','https://github.com/gopal2yadav/agentforge'],['Stripe','https://dashboard.stripe.com'],['Clerk','https://dashboard.clerk.com'],['Neon DB','https://console.neon.tech'],['Anthropic','https://console.anthropic.com']].map(([l,h]) => (
              <a key={l} href={h} target="_blank" rel="noopener" className="block p-3 rounded-lg text-sm text-indigo-200/70 hover:text-white transition-all" style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}