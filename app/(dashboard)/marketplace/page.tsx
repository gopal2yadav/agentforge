'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const WF = [
  { id: '1', name: 'Content Pipeline', desc: 'Research, draft, review, publish', agents: 3, cat: 'Marketing', inst: 2340, rate: 4.8 },
  { id: '2', name: 'Lead Qualification', desc: 'Score leads, enrich data, route', agents: 2, cat: 'Sales', inst: 1890, rate: 4.7 },
  { id: '3', name: 'PR Review Bot', desc: 'Analyze code, check bugs, post comments', agents: 2, cat: 'Engineering', inst: 3120, rate: 4.9 },
  { id: '4', name: 'Customer Onboarding', desc: 'Welcome users, personalize, schedule', agents: 3, cat: 'Support', inst: 1560, rate: 4.6 },
  { id: '5', name: 'Competitor Monitor', desc: 'Track pricing, features, weekly digest', agents: 2, cat: 'Research', inst: 980, rate: 4.5 },
  { id: '6', name: 'Meeting Summarizer', desc: 'Transcribe, action items, Slack', agents: 2, cat: 'Productivity', inst: 2780, rate: 4.8 },
];
export default function MarketplacePage() {
  const router = useRouter();
  const [ing, setIng] = useState('');
  const [done, setDone] = useState<string[]>([]);
  const [q, setQ] = useState('');
  const install = (w: typeof WF[0]) => { if (done.includes(w.id)) { router.push('/flows'); return; } setIng(w.id); setTimeout(() => { setIng(''); setDone(p => [...p, w.id]); }, 1500); };
  const f = WF.filter(w => !q || w.name.toLowerCase().includes(q.toLowerCase()) || w.cat.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Workflow Marketplace</h1><p className="text-sm text-gray-500">Pre-built workflows ready to deploy</p></div><button onClick={() => router.push('/flows/create')} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">Publish</button></div>
      <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 shadow-sm mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{f.map(w => (
        <div key={w.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-3"><span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{w.cat}</span><span className="text-xs text-amber-500">{w.rate}</span></div>
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 mb-1">{w.name}</h3>
          <p className="text-xs text-gray-500 mb-3">{w.desc}</p>
          <div className="flex items-center justify-between"><span className="text-[10px] text-gray-400">{w.agents} agents &bull; {w.inst.toLocaleString()} installs</span>
            <button onClick={() => install(w)} className={'px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ' + (done.includes(w.id) ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : ing === w.id ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600')}>{done.includes(w.id) ? 'Installed' : ing === w.id ? 'Installing...' : 'Install'}</button>
          </div>
        </div>
      ))}</div>
    </div>
  );
}