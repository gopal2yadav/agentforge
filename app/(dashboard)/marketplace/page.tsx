'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const W = [
  { id: '1', name: 'Content Pipeline', desc: 'Research, draft, review, publish', agents: 3, cat: 'Marketing', inst: 2340, r: 4.8 },
  { id: '2', name: 'Lead Qualification', desc: 'Score leads, enrich data, route to sales', agents: 2, cat: 'Sales', inst: 1890, r: 4.7 },
  { id: '3', name: 'PR Review Bot', desc: 'Analyze code, check bugs, post reviews', agents: 2, cat: 'Engineering', inst: 3120, r: 4.9 },
  { id: '4', name: 'Customer Onboarding', desc: 'Welcome users, personalize, schedule calls', agents: 3, cat: 'Support', inst: 1560, r: 4.6 },
  { id: '5', name: 'Competitor Monitor', desc: 'Track pricing, features, deliver digest', agents: 2, cat: 'Research', inst: 980, r: 4.5 },
  { id: '6', name: 'Invoice Processor', desc: 'Extract data, validate POs, route approval', agents: 2, cat: 'Finance', inst: 1240, r: 4.7 },
  { id: '7', name: 'Meeting Summarizer', desc: 'Transcribe, extract actions, send summaries', agents: 2, cat: 'Productivity', inst: 2780, r: 4.8 },
  { id: '8', name: 'Bug Triage', desc: 'Categorize issues, assign priority, notify team', agents: 3, cat: 'Engineering', inst: 1670, r: 4.6 },
  { id: '9', name: 'SEO Auditor', desc: 'Crawl pages, analyze keywords, generate report', agents: 2, cat: 'Marketing', inst: 890, r: 4.4 },
];
export default function MarketplacePage() {
  const router = useRouter();
  const [installing, setInstalling] = useState('');
  const [installed, setInstalled] = useState([]);
  const [search, setSearch] = useState('');
  const handleInstall = (w) => {
    if (installed.includes(w.id)) { router.push('/flows'); return; }
    setInstalling(w.id);
    setTimeout(() => { setInstalling(''); setInstalled(p => [...p, w.id]); }, 1500);
  };
  const filtered = W.filter(w => !search || w.name.toLowerCase().includes(search.toLowerCase()) || w.cat.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Workflow Marketplace</h1><p className="text-sm text-gray-500">Pre-built agent workflows ready to deploy</p></div>
        <button onClick={() => router.push('/flows/create')} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">Publish Workflow</button>
      </div>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search workflows..." className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 shadow-sm mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(w => (
          <div key={w.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3"><span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{w.cat}</span><span className="text-xs text-amber-500">\u2605 {w.r}</span></div>
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">{w.name}</h3>
            <p className="text-xs text-gray-500 mb-3">{w.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400">{w.agents} agents &bull; {w.inst.toLocaleString()} installs</span>
              <button onClick={() => handleInstall(w)} className={'px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ' + (installed.includes(w.id) ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : installing === w.id ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600')}>
                {installed.includes(w.id) ? '\u2713 Installed' : installing === w.id ? 'Installing...' : 'Install'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}