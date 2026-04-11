'use client';
import { useState } from 'react';
const AU = [
  { id: '1', name: 'Slack -> Research', trigger: 'Slack: #research', agent: 'Research Agent', status: 'active', runs: 89 },
  { id: '2', name: 'GitHub PR -> Review', trigger: 'GitHub: PR opened', agent: 'Code Reviewer', status: 'active', runs: 142 },
  { id: '3', name: 'Daily Report', trigger: 'Cron: 9 AM daily', agent: 'Writer Agent', status: 'active', runs: 45 },
];
const TR = ['Slack', 'GitHub', 'Schedule', 'Webhook', 'Email'];
const AG = ['Research Agent', 'Writer Agent', 'Code Reviewer', 'Data Analyst', 'Coordinator'];
export default function AutomationsPage() {
  const [show, setShow] = useState(false);
  const [nm, setNm] = useState('');
  const [tr, setTr] = useState('');
  const [ag, setAg] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const create = () => { if (!nm || !tr || !ag) return; setSaving(true); setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => { setSaved(false); setShow(false); setNm(''); setTr(''); setAg(''); }, 2000); }, 1500); };
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Automations</h1><p className="text-sm text-gray-500">{AU.length} active</p></div><button onClick={() => setShow(!show)} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ Create</button></div>
      {show && (<div className="bg-white border border-indigo-200 rounded-xl p-6 shadow-sm mb-6">{saved ? (<div className="text-sm text-emerald-600 font-medium">Automation created!</div>) : (<div className="space-y-4"><h3 className="text-sm font-semibold text-gray-900">New Automation</h3><input value={nm} onChange={e => setNm(e.target.value)} placeholder="Name" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500" /><div className="flex gap-2">{TR.map(t => (<button key={t} onClick={() => setTr(t)} className={'px-3 py-2 rounded-lg text-xs font-semibold border ' + (tr === t ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500')}>{t}</button>))}</div><select value={ag} onChange={e => setAg(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm"><option value="">Select agent...</option>{AG.map(a => <option key={a} value={a}>{a}</option>)}</select><div className="flex gap-3"><button onClick={create} disabled={saving || !nm || !tr || !ag} className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold disabled:opacity-50">{saving ? 'Creating...' : 'Create'}</button><button onClick={() => setShow(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500">Cancel</button></div></div>)}</div>)}
      <div className="space-y-3">{AU.map(a => (<div key={a.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200"><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[15px] font-semibold text-gray-900">{a.name}</span></div><div className="flex items-center gap-2"><button onClick={() => alert('Paused')} className="px-3 py-1 rounded-lg text-[11px] border border-gray-200 text-gray-500">Pause</button><span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">{a.status}</span></div></div><div className="flex gap-6 text-xs text-gray-400"><span>Trigger: {a.trigger}</span><span>Agent: <span className="text-indigo-600">{a.agent}</span></span><span>{a.runs} runs</span></div></div>))}</div>
    </div>
  );
}