'use client';
import { useState } from 'react';
export default function AlertsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const alerts = [
    { id: 'a1', name: 'High Error Rate', condition: 'Error rate > 5% in 15 min', channel: 'Slack #alerts', status: 'active', triggered: '2 hours ago' },
    { id: 'a2', name: 'Token Budget Warning', condition: 'Monthly tokens > 80% of limit', channel: 'Email', status: 'active', triggered: 'Never' },
    { id: 'a3', name: 'Agent Down', condition: 'Agent fails 3x consecutively', channel: 'Slack #engineering', status: 'active', triggered: '1 day ago' },
    { id: 'a4', name: 'Latency Spike', condition: 'P95 latency > 5s for 10 min', channel: 'PagerDuty', status: 'muted', triggered: '3 days ago' },
  ];
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Alerts</h1><p className="text-sm text-gray-500">Threshold-based notifications for agent health</p></div>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ Create Alert</button>
      </div>
      {showCreate && (
        <div className="bg-white border border-indigo-200 rounded-xl p-5 shadow-sm mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">New Alert Rule</h3>
          <div className="grid grid-cols-3 gap-3">
            <input placeholder="Alert name" className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
            <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"><option>Error rate exceeds...</option><option>Latency exceeds...</option><option>Token usage exceeds...</option><option>Agent fails...</option></select>
            <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700"><option>Slack</option><option>Email</option><option>PagerDuty</option><option>Webhook</option></select>
          </div>
          <button onClick={() => setShowCreate(false)} className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Save Alert</button>
        </div>
      )}
      <div className="space-y-3">
        {alerts.map(a => (
          <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={'w-2 h-2 rounded-full ' + (a.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400')} />
                <span className="text-sm font-semibold text-gray-900">{a.name}</span>
              </div>
              <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + (a.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{a.status}</span>
            </div>
            <div className="text-xs text-gray-500 font-mono bg-gray-50 rounded-lg px-3 py-2 mb-2 border border-gray-100">{a.condition}</div>
            <div className="flex items-center gap-6 text-[11px] text-gray-400">
              <span>Channel: <span className="text-indigo-600 font-medium">{a.channel}</span></span>
              <span>Last triggered: {a.triggered}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}