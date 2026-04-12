'use client';
import { useState, useEffect } from 'react';

export default function StudioPage() {
  const [crews, setCrews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/crews').then(r => r.json()).then(d => { setCrews(d); setLoading(false); }).catch(() => setLoading(false));
    fetch('/api/agents').then(r => r.json()).then(setAgents).catch(() => {});
  }, []);

  const toggleAgent = (agentName: string) => setSelectedAgents(prev => prev.includes(agentName) ? prev.filter(n => n !== agentName) : [...prev, agentName]);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const res = await fetch('/api/crews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, config: { agents: selectedAgents, process: 'sequential' } }) });
    const data = await res.json();
    setCrews([data, ...crews]);
    setShowCreate(false); setName(''); setSelectedAgents([]); setSaving(false);
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Crew Studio</h1>
          <p className="text-sm text-gray-500">{crews.length} crews configured</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ New Crew</button>
      </div>
      {showCreate && (
        <div className="bg-white border border-indigo-200 rounded-xl p-5 mb-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Create Crew</h3>
          <div className="mb-4"><label className="text-xs font-medium text-gray-500 mb-1 block">Crew Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Content Team" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" /></div>
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-500 mb-2 block">Select Agents ({selectedAgents.length} selected)</label>
            <div className="flex flex-wrap gap-2">
              {agents.map((a: any) => (
                <button key={a.id} onClick={() => toggleAgent(a.name)} className={'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ' + (selectedAgents.includes(a.name) ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300')}>{a.name}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} disabled={saving || !name.trim()} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50">{saving ? 'Creating...' : 'Create Crew'}</button>
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500">Cancel</button>
          </div>
        </div>
      )}
      {loading ? (
        <div className="text-center py-12"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" /><p className="text-sm text-gray-400">Loading crews...</p></div>
      ) : crews.length === 0 && !showCreate ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-xl mx-auto mb-3">C</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No crews yet</h3>
          <p className="text-sm text-gray-500 mb-4">Organize agents into collaborative crews</p>
          <button onClick={() => setShowCreate(true)} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Create Crew</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {crews.map((c: any) => (
            <div key={c.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 text-sm font-bold">C</div>
                  <div className="text-[15px] font-semibold text-gray-900">{c.name}</div>
                </div>
                <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + (c.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{c.status}</span>
              </div>
              <div className="text-xs text-gray-400">{c.config?.agents?.length || 0} agents | {c.config?.process || 'sequential'} | {c.runs || 0} runs</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}