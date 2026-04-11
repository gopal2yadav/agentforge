'use client';
import { useState } from 'react';
const AUTOMATIONS = [
  { id: 'auto_1', name: 'Slack Message -> Research', trigger: 'Slack: #research-requests', agent: 'Research Agent', status: 'active', runs: 89, lastRun: '2 hours ago' },
  { id: 'auto_2', name: 'GitHub PR -> Code Review', trigger: 'GitHub: pull_request.opened', agent: 'Code Reviewer', status: 'active', runs: 142, lastRun: '30 min ago' },
  { id: 'auto_3', name: 'Daily Report', trigger: 'Schedule: Every day at 9 AM', agent: 'Writer Agent', status: 'active', runs: 45, lastRun: '3 hours ago' },
];
const TRIGGERS = [
  { value: 'slack', label: 'Slack', desc: 'Messages in a channel' },
  { value: 'github', label: 'GitHub', desc: 'PR, issue, or push' },
  { value: 'schedule', label: 'Schedule', desc: 'Recurring cron job' },
  { value: 'webhook', label: 'Webhook', desc: 'Incoming HTTP request' },
  { value: 'email', label: 'Email', desc: 'Incoming emails' },
];
const AGENTS = ['Research Agent', 'Writer Agent', 'Code Reviewer', 'Data Analyst', 'Coordinator'];
export default function AutomationsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('');
  const [agent, setAgent] = useState('');
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const handleCreate = () => {
    if (!name.trim() || !trigger || !agent) return;
    setCreating(true);
    setTimeout(() => { setCreating(false); setCreated(true); setTimeout(() => { setCreated(false); setShowCreate(false); setName(''); setTrigger(''); setAgent(''); }, 2000); }, 1500);
  };
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Automations</h1><p className="text-sm text-gray-500">{AUTOMATIONS.length} automations &bull; {AUTOMATIONS.filter(a => a.status === 'active').length} active</p></div>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ Create Automation</button>
      </div>
      {showCreate && (
        <div className="bg-white border border-indigo-200 rounded-xl p-6 shadow-sm mb-6">
          {created ? (<div className="flex items-center gap-2 text-sm text-emerald-600 font-medium"><span className="text-lg">\u2713</span> Automation created!</div>) : (
            <><h3 className="text-sm font-semibold text-gray-900 mb-4">New Automation</h3>
            <div className="space-y-4">
              <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., New PR -> Auto Review" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" /></div>
              <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Trigger</label><div className="grid grid-cols-5 gap-2">{TRIGGERS.map(t => (<button key={t.value} onClick={() => setTrigger(t.value)} className={'px-3 py-2.5 rounded-lg text-left border transition-all ' + (trigger === t.value ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-gray-300')}><div className="text-xs font-semibold">{t.label}</div><div className="text-[9px] mt-0.5 opacity-70">{t.desc}</div></button>))}</div></div>
              <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Agent</label><select value={agent} onChange={e => setAgent(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900"><option value="">Select agent...</option>{AGENTS.map(a => <option key={a} value={a}>{a}</option>)}</select></div>
              <div className="flex gap-3"><button onClick={handleCreate} disabled={creating || !name.trim() || !trigger || !agent} className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm">{creating ? 'Creating...' : 'Create'}</button><button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500">Cancel</button></div>
            </div></>
          )}
        </div>
      )}
      <div className="space-y-3">{AUTOMATIONS.map(a => (
        <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3"><div className={'w-2 h-2 rounded-full ' + (a.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400')} /><span className="text-[15px] font-semibold text-gray-900">{a.name}</span></div>
            <div className="flex items-center gap-2">
              <button onClick={() => alert(a.status === 'active' ? 'Paused.' : 'Activated.')} className="px-3 py-1 rounded-lg text-[11px] font-semibold border border-gray-200 text-gray-500 hover:text-gray-900">{a.status === 'active' ? 'Pause' : 'Activate'}</button>
              <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + (a.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{a.status}</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-400"><span>Trigger: <span className="text-gray-600">{a.trigger}</span></span><span>Agent: <span className="text-indigo-600 font-medium">{a.agent}</span></span><span>{a.runs} runs</span><span>Last: {a.lastRun}</span></div>
        </div>
      ))}</div>
    </div>
  );
}