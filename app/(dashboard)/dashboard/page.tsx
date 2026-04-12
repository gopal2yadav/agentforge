'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({ agents: 0, flows: 0, crews: 0, automations: 0, totalRuns: 0, tokensUsed: 0, plan: 'Free', status: 'loading' });
  const [recentAgents, setRecentAgents] = useState([]);
  const [recentFlows, setRecentFlows] = useState([]);

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats).catch(() => {});
    fetch('/api/agents').then(r => r.json()).then(d => setRecentAgents(d.slice(0, 5))).catch(() => {});
    fetch('/api/flows').then(r => r.json()).then(d => setRecentFlows(d.slice(0, 5))).catch(() => {});
  }, []);

  const statCards = [
    { label: 'Active Agents', value: stats.agents, color: 'bg-indigo-50 text-indigo-600', href: '/agents' },
    { label: 'Workflows', value: stats.flows, color: 'bg-emerald-50 text-emerald-600', href: '/flows' },
    { label: 'Crews', value: stats.crews, color: 'bg-amber-50 text-amber-600', href: '/studio' },
    { label: 'Automations', value: stats.automations, color: 'bg-purple-50 text-purple-600', href: '/automations' },
  ];

  const quickActions = [
    { label: 'Create Agent', href: '/agents/create', icon: '+' },
    { label: 'New Flow', href: '/flows/create', icon: '+' },
    { label: 'AI Builder', href: '/builder', icon: '\u2728' },
    { label: 'Playground', href: '/playground', icon: '\u25B6' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back. Here&apos;s your platform overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + (stats.status === 'healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{stats.status === 'healthy' ? '\u2713 All Systems Operational' : 'Loading...'}</span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-600">{stats.plan} Plan</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {statCards.map(s => (
          <Link key={s.label} href={s.href} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="text-xs text-gray-400 font-medium mb-2">{s.label}</div>
            <div className={'text-3xl font-bold ' + s.color.split(' ')[1]}>{s.value}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        {quickActions.map(a => (
          <Link key={a.label} href={a.href} className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-bold">{a.icon}</div>
            <span className="text-sm font-medium text-gray-700">{a.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Recent Agents</h2>
            <Link href="/agents" className="text-xs text-indigo-600 hover:underline">View all</Link>
          </div>
          {recentAgents.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No agents yet. <Link href="/agents/create" className="text-indigo-600 hover:underline">Create one</Link></p>
          ) : (
            <div className="space-y-3">
              {recentAgents.map(a => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">{(a.name||'A')[0]}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{a.name}</div>
                      <div className="text-xs text-gray-400">{a.role}</div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{a.runs || 0} runs</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Recent Flows</h2>
            <Link href="/flows" className="text-xs text-indigo-600 hover:underline">View all</Link>
          </div>
          {recentFlows.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No flows yet. <Link href="/flows/create" className="text-indigo-600 hover:underline">Create one</Link></p>
          ) : (
            <div className="space-y-3">
              {recentFlows.map(fl => (
                <div key={fl.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{fl.name}</div>
                    <div className="text-xs text-gray-400">{fl.description || 'No description'}</div>
                  </div>
                  <span className={'px-2 py-0.5 rounded text-[10px] font-semibold ' + (fl.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{fl.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Platform Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <div className="text-2xl font-bold text-gray-900">{stats.totalRuns}</div>
            <div className="text-xs text-gray-400 mt-1">Total Runs</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <div className="text-2xl font-bold text-gray-900">{(stats.tokensUsed / 1000).toFixed(0)}K</div>
            <div className="text-xs text-gray-400 mt-1">Tokens Used</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50">
            <div className="text-2xl font-bold text-emerald-600">99.97%</div>
            <div className="text-xs text-gray-400 mt-1">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}