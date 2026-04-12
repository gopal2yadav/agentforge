'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [health, setHealth] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetch('/api/health').then(r => r.json()), fetch('/api/stats').then(r => r.json())]).then(([h, s]) => { setHealth(h); setStats(s); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>;
  const services = health?.services || {};

  return (
    <div className="max-w-[900px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-8">Platform configuration and service connections</p>
      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Service Connections</h2>
          <div className="space-y-4">
            {Object.entries(services).map(([name, svc]: [string, any]) => (
              <div key={name} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={'w-2.5 h-2.5 rounded-full ' + (['connected','configured','running'].includes(svc.status) ? 'bg-emerald-500' : 'bg-red-500')} />
                  <div><div className="text-sm font-medium text-gray-900 capitalize">{name}</div>{svc.latency && <div className="text-xs text-gray-400">Latency: {svc.latency}</div>}</div>
                </div>
                <span className={'px-3 py-1 rounded-full text-[10px] font-semibold border ' + (['connected','configured','running'].includes(svc.status) ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200')}>{svc.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Platform Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><span className="text-xs text-gray-400">Version</span><div className="text-sm font-medium text-gray-900 mt-0.5">{health?.version || '2.8.0'}</div></div>
            <div><span className="text-xs text-gray-400">Plan</span><div className="text-sm font-medium text-gray-900 mt-0.5">{stats?.plan || 'Free'}</div></div>
            <div><span className="text-xs text-gray-400">Total Agents</span><div className="text-sm font-medium text-gray-900 mt-0.5">{stats?.agents || 0}</div></div>
            <div><span className="text-xs text-gray-400">Total Runs</span><div className="text-sm font-medium text-gray-900 mt-0.5">{stats?.totalRuns || 0}</div></div>
            <div><span className="text-xs text-gray-400">Domain</span><div className="text-sm font-medium text-gray-900 mt-0.5">agentforcecrew.com</div></div>
            <div><span className="text-xs text-gray-400">Region</span><div className="text-sm font-medium text-gray-900 mt-0.5">IAD1 (US East)</div></div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 gap-3">
            {[{l:'Agents',h:'/agents'},{l:'Flows',h:'/flows'},{l:'Playground',h:'/playground'},{l:'Monitoring',h:'/monitoring'},{l:'Billing',h:'/billing'},{l:'Integrations',h:'/integrations'}].map(link => (
              <Link key={link.l} href={link.h} className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-indigo-200 text-sm text-gray-700">{link.l}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}