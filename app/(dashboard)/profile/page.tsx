'use client';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [stats, setStats] = useState<any>(null);
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    Promise.all([fetch('/api/stats').then(r => r.json()), fetch('/api/health').then(r => r.json())])
      .then(([s, h]) => { setStats(s); setHealth(h); }).catch(() => {});
  }, []);

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
            <div><span className="text-xs text-indigo-400/40">Plan</span><div className="text-sm font-medium mt-0.5" style={{ color: '#a5b4fc' }}>{stats?.plan || 'Loading...'}</div></div>
            <div><span className="text-xs text-indigo-400/40">Platform</span><div className="text-sm font-medium mt-0.5">agentforcecrew.com</div></div>
            <div><span className="text-xs text-indigo-400/40">Version</span><div className="text-sm font-medium mt-0.5">{health?.version || '...'}</div></div>
            <div><span className="text-xs text-indigo-400/40">Region</span><div className="text-sm font-medium mt-0.5">IAD1 (US East)</div></div>
          </div>
        </div>

        <div className="rounded-xl p-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-sm font-semibold mb-4">Your Resources</div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { l: 'Agents Created', v: stats?.agents || 0, c: '#a5b4fc' },
              { l: 'Flows Built', v: stats?.flows || 0, c: '#6ee7b7' },
              { l: 'Crews Deployed', v: stats?.crews || 0, c: '#fcd34d' },
              { l: 'Automations', v: stats?.automations || 0, c: '#c4b5fd' },
              { l: 'Total Runs', v: stats?.totalRuns || 0, c: '#f0abfc' },
              { l: 'Tokens Used', v: ((stats?.tokensUsed || 0)/1000).toFixed(1) + 'K', c: '#93c5fd' },
            ].map(s => (
              <div key={s.l} className="text-center p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <div className="text-xl font-bold" style={{ color: s.c }}>{s.v}</div>
                <div className="text-[10px] text-indigo-300/40 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-sm font-semibold mb-4">Quick Links</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { l: 'Manage Env Vars', h: 'https://vercel.com/gopal2yadavs-projects/agentforge/settings/environment-variables', ext: true },
              { l: 'Vercel Dashboard', h: 'https://vercel.com/gopal2yadavs-projects/agentforge', ext: true },
              { l: 'GitHub Repo', h: 'https://github.com/gopal2yadav/agentforge', ext: true },
              { l: 'Stripe Dashboard', h: 'https://dashboard.stripe.com', ext: true },
              { l: 'Clerk Dashboard', h: 'https://dashboard.clerk.com', ext: true },
              { l: 'Neon Console', h: 'https://console.neon.tech', ext: true },
            ].map(link => (
              <a key={link.l} href={link.h} target="_blank" rel="noopener" className="block p-3 rounded-lg text-sm text-indigo-200/70 hover:text-white transition-all" style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)' }}>{link.l}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}