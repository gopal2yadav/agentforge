'use client';
import { useState } from 'react';

const AUTOMATIONS = [
  { id: '1', name: 'New Lead Research', trigger: 'HubSpot: New Contact', crew: 'Research Pipeline', status: 'active', runs: 47, lastRun: '15 min ago', schedule: 'On trigger' },
  { id: '2', name: 'Daily Report Generation', trigger: 'Schedule: 9:00 AM UTC', crew: 'Report Generator', status: 'active', runs: 30, lastRun: '8 hours ago', schedule: 'Daily' },
  { id: '3', name: 'PR Review Bot', trigger: 'GitHub: Pull Request', crew: 'Code Review Flow', status: 'active', runs: 89, lastRun: '2 hours ago', schedule: 'On trigger' },
  { id: '4', name: 'Customer Feedback Triage', trigger: 'Slack: #feedback channel', crew: 'Support Triage', status: 'paused', runs: 12, lastRun: '3 days ago', schedule: 'On trigger' },
];

export default function AutomationsPage() {
  const [filter, setFilter] = useState('all');
  const filtered = AUTOMATIONS.filter(a => filter === 'all' || a.status === filter);

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Automations</h1>
          <p className="text-sm text-[#6b6b8a]">Trigger agent workflows automatically from external events</p>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">
          + Create Automation
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        {['all', 'active', 'paused'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={"px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors " + (filter === f ? 'bg-[#6366f1]/15 text-[#818cf8]' : 'text-[#6b6b8a] hover:text-white')}>
            {f}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map(a => (
          <div key={a.id} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#3a3a4d] transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={"w-2 h-2 rounded-full " + (a.status === 'active' ? 'bg-green-400' : 'bg-gray-400')} />
                <div className="text-[15px] font-semibold">{a.name}</div>
              </div>
              <span className={"px-2.5 py-1 rounded-full text-[10px] font-semibold " + (a.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-gray-400/20 text-gray-400')}>{a.status}</span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-xs">
              <div><span className="text-[#4a4a5a]">Trigger:</span><div className="text-[#a0a0b8] mt-0.5 font-medium">{a.trigger}</div></div>
              <div><span className="text-[#4a4a5a]">Crew:</span><div className="text-[#818cf8] mt-0.5 font-medium">{a.crew}</div></div>
              <div><span className="text-[#4a4a5a]">Runs:</span><div className="text-[#a0a0b8] mt-0.5 font-medium">{a.runs}</div></div>
              <div><span className="text-[#4a4a5a]">Last Run:</span><div className="text-[#a0a0b8] mt-0.5 font-medium">{a.lastRun}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}