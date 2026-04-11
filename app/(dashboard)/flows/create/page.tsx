'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FlowCreatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [trigger, setTrigger] = useState('manual');
  const [agents, setAgents] = useState(['Research Agent']);

  const AVAILABLE_AGENTS = ['Research Agent', 'Code Reviewer', 'Data Analyst', 'Writer Agent', 'Coordinator'];
  const TRIGGERS = [
    { value: 'manual', label: 'Manual', desc: 'Triggered manually via API or dashboard' },
    { value: 'schedule', label: 'Scheduled', desc: 'Run on a recurring schedule (cron)' },
    { value: 'webhook', label: 'Webhook', desc: 'Triggered by incoming HTTP request' },
    { value: 'event', label: 'Event', desc: 'Triggered by platform events (e.g., agent completion)' },
  ];

  return (
    <div className="max-w-[700px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Create Flow</h1>
      <p className="text-sm text-gray-500 mb-8">Design a multi-agent workflow pipeline</p>
      <div className="space-y-5">
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Flow Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Content Pipeline"
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Description</label>
          <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What does this flow do?"
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Trigger</label>
          <div className="grid grid-cols-2 gap-2">
            {TRIGGERS.map(t => (
              <button key={t.value} onClick={() => setTrigger(t.value)}
                className={"text-left px-4 py-3 rounded-lg border transition-all " + (trigger === t.value ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-gray-300')}>
                <div className="text-sm font-semibold">{t.label}</div>
                <div className="text-[10px] mt-0.5 opacity-70">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Pipeline Agents</label>
          <div className="space-y-2">
            {agents.map((a, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">{i+1}</span>
                <select value={a} onChange={e => { const n = [...agents]; n[i] = e.target.value; setAgents(n); }}
                  className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900">
                  {AVAILABLE_AGENTS.map(ag => <option key={ag} value={ag}>{ag}</option>)}
                </select>
                {agents.length > 1 && <button onClick={() => setAgents(agents.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 text-sm">Remove</button>}
              </div>
            ))}
            <button onClick={() => setAgents([...agents, AVAILABLE_AGENTS[0]])} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">+ Add Agent Step</button>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={() => router.push('/flows')} className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">Create Flow</button>
          <button onClick={() => router.push('/flows')} className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:text-gray-900">Cancel</button>
        </div>
      </div>
    </div>
  );
}