'use client';
import { useState } from 'react';

const AUTOMATIONS = [
  { id: '1', name: 'New Lead Research', trigger: 'HubSpot: New Contact', crew: 'Research Pipeline', status: 'active', runs: 47, lastRun: '15 min ago' },
  { id: '2', name: 'Daily Report Generation', trigger: 'Schedule: 9:00 AM UTC', crew: 'Report Generator', status: 'active', runs: 30, lastRun: '8 hours ago' },
  { id: '3', name: 'PR Review Bot', trigger: 'GitHub: Pull Request', crew: 'Code Review Flow', status: 'active', runs: 89, lastRun: '2 hours ago' },
  { id: '4', name: 'Customer Feedback Triage', trigger: 'Slack: #feedback', crew: 'Support Triage', status: 'paused', runs: 12, lastRun: '3 days ago' },
];

export default function AutomationsPage() {
  const [filter, setFilter] = useState('all');
  const filtered = AUTOMATIONS.filter(a => filter === 'all' || a.status === filter);

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Automations</h1>
          <p className="text-sm text-gray-500">Trigger agent workflows automatically from external events</p>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">+ Create Automation</button>
      </div>
      <div className="flex gap-2 mb-4">
        {['all', 'active', 'paused'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={"px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors " + (filter === f ? 'bg-indigo-50 text-indigo-700' : 'text-gray-400 hover:text-gray-900')}>
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map(a => (
          <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-200 hover:shadow-md transition-all shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={"w-2 h-2 rounded-full " + (a.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400')} />
                <div className="text-[15px] font-semibold text-gray-900">{a.name}</div>
              </div>
              <span className={"px-2.5 py-1 rounded-full text-[10px] font-semibold " + (a.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500')}>{a.status}</span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-xs">
              <div><span className="text-gray-400">Trigger:</span><div className="text-gray-700 mt-0.5 font-medium">{a.trigger}</div></div>
              <div><span className="text-gray-400">Crew:</span><div className="text-indigo-600 mt-0.5 font-medium">{a.crew}</div></div>
              <div><span className="text-gray-400">Runs:</span><div className="text-gray-700 mt-0.5 font-medium">{a.runs}</div></div>
              <div><span className="text-gray-400">Last Run:</span><div className="text-gray-700 mt-0.5 font-medium">{a.lastRun}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}