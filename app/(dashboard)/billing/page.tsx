'use client';
import { useState, useEffect } from 'react';

export default function BillingPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetch('/api/stats').then(r => r.json()).then(s => { setStats(s); setLoading(false); }).catch(() => setLoading(false)); }, []);

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  const cost = ((stats?.tokensUsed || 0) / 1000000 * 3).toFixed(4);

  return (
    <div className="max-w-[900px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Billing</h1>
      <p className="text-sm text-indigo-300/50 mb-8">Manage your subscription and usage</p>

      <div className="space-y-6">
        <div className="rounded-xl p-6" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-indigo-400/50 uppercase tracking-wider">Current Plan</div>
              <div className="text-3xl font-bold mt-1" style={{ color: '#a5b4fc' }}>{stats?.plan || 'Free'}</div>
              <div className="text-sm text-indigo-300/50 mt-1">All features included</div>
            </div>
            <a href="/api/billing/checkout" className="px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}>Upgrade Plan</a>
          </div>
        </div>

        <div className="rounded-xl p-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-sm font-semibold mb-4">Usage This Period</div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-xs text-indigo-300/40">Tokens Used</div>
              <div className="text-2xl font-bold mt-1">{(stats?.tokensUsed || 0).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-indigo-300/40">Total Runs</div>
              <div className="text-2xl font-bold mt-1" style={{ color: '#6ee7b7' }}>{stats?.totalRuns || 0}</div>
            </div>
            <div>
              <div className="text-xs text-indigo-300/40">Est. AI Cost</div>
              <div className="text-2xl font-bold mt-1" style={{ color: '#fcd34d' }}>{'$' + cost}</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-sm font-semibold mb-4">Resources</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-300/60">Agents</span>
              <div className="flex items-center gap-3">
                <div className="w-48 h-2 rounded-full" style={{ background: 'rgba(99,102,241,0.1)' }}>
                  <div className="h-full rounded-full" style={{ width: Math.min(100, ((stats?.agents || 0) / 25) * 100) + '%', background: 'linear-gradient(90deg, #4f46e5, #7c3aed)' }} />
                </div>
                <span className="text-xs font-mono text-indigo-300/50">{stats?.agents || 0}/25</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-300/60">Flows</span>
              <div className="flex items-center gap-3">
                <div className="w-48 h-2 rounded-full" style={{ background: 'rgba(99,102,241,0.1)' }}>
                  <div className="h-full rounded-full" style={{ width: Math.min(100, ((stats?.flows || 0) / 20) * 100) + '%', background: 'linear-gradient(90deg, #10b981, #6ee7b7)' }} />
                </div>
                <span className="text-xs font-mono text-indigo-300/50">{stats?.flows || 0}/20</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-300/60">Tokens</span>
              <div className="flex items-center gap-3">
                <div className="w-48 h-2 rounded-full" style={{ background: 'rgba(99,102,241,0.1)' }}>
                  <div className="h-full rounded-full" style={{ width: Math.min(100, ((stats?.tokensUsed || 0) / 10000000) * 100) + '%', background: 'linear-gradient(90deg, #f59e0b, #fcd34d)' }} />
                </div>
                <span className="text-xs font-mono text-indigo-300/50">{((stats?.tokensUsed || 0) / 1000).toFixed(1)}K/10M</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-sm font-semibold mb-3">Payment</div>
          <p className="text-xs text-indigo-300/50 mb-4">Payments are processed via Stripe. Click below to manage your subscription.</p>
          <div className="flex gap-3">
            <a href="/api/billing/checkout" className="px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>Subscribe to Pro ($49/mo)</a>
            <a href="https://dashboard.stripe.com" target="_blank" rel="noopener" className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>Stripe Dashboard</a>
          </div>
        </div>
      </div>
    </div>
  );
}