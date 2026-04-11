'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function StudioPage() {
  const router = useRouter();
  const [showNewCrew, setShowNewCrew] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [crewName, setCrewName] = useState('');
  const [importText, setImportText] = useState('');
  const [created, setCreated] = useState(false);
  const crews = [
    { id: 'c1', name: 'Content Pipeline', agents: 3, tasks: 4, status: 'active', lastRun: '15 min ago', runs: 142 },
    { id: 'c2', name: 'Lead Qualifier', agents: 2, tasks: 3, status: 'active', lastRun: '1 hour ago', runs: 89 },
    { id: 'c3', name: 'Code Review Crew', agents: 2, tasks: 2, status: 'idle', lastRun: '3 hours ago', runs: 67 },
  ];
  const handleCreate = () => { if (!crewName.trim()) return; setCreated(true); setTimeout(() => { setShowNewCrew(false); setCreated(false); setCrewName(''); }, 2000); };
  const handleImport = () => { if (!importText.trim()) return; alert('YAML imported! Crew configuration parsed successfully.'); setShowImport(false); setImportText(''); };
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Crew Studio</h1><p className="text-sm text-gray-500">Design and manage multi-agent crews</p></div>
        <div className="flex gap-2">
          <button onClick={() => { setShowImport(!showImport); setShowNewCrew(false); }} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors">Import YAML</button>
          <button onClick={() => { setShowNewCrew(!showNewCrew); setShowImport(false); }} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ New Crew</button>
        </div>
      </div>
      {showNewCrew && (
        <div className="bg-white border border-indigo-200 rounded-xl p-5 shadow-sm mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Create New Crew</h3>
          {created ? (<div className="flex items-center gap-2 text-sm text-emerald-600 font-medium"><span>\u2713</span> Crew created! Redirecting to editor...</div>) : (
            <div className="flex gap-3">
              <input type="text" value={crewName} onChange={e => setCrewName(e.target.value)} placeholder="Crew name (e.g., Marketing Pipeline)"
                className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
              <button onClick={handleCreate} disabled={!crewName.trim()} className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50">Create</button>
              <button onClick={() => setShowNewCrew(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500">Cancel</button>
            </div>
          )}
        </div>
      )}
      {showImport && (
        <div className="bg-white border border-indigo-200 rounded-xl p-5 shadow-sm mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Import YAML Configuration</h3>
          <textarea value={importText} onChange={e => setImportText(e.target.value)} rows={5} placeholder={'agents:\n  - role: Research Analyst\n    goal: Conduct thorough research\n    backstory: Expert analyst with 10+ years...\n    tools: [web_search, summarizer]'}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-xs font-mono text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:border-indigo-500 mb-3" />
          <div className="flex gap-2">
            <button onClick={handleImport} disabled={!importText.trim()} className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50">Import</button>
            <button onClick={() => setShowImport(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {crews.map(c => (
          <div key={c.id} onClick={() => router.push('/flows/editor')} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3"><div className={'w-2 h-2 rounded-full ' + (c.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400')} /><div className="text-[15px] font-semibold text-gray-900">{c.name}</div></div>
              <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + (c.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{c.status}</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-400"><span>{c.agents} agents</span><span>{c.tasks} tasks</span><span>{c.runs} runs</span><span>Last: {c.lastRun}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}