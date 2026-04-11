'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const TOOLS = ['web_search', 'document_reader', 'summarizer', 'code_analyzer', 'github_pr', 'linter', 'sql_query', 'csv_parser', 'chart_generator', 'email_sender', 'slack_notifier', 'calendar'];
const MODELS = ['claude-sonnet-4', 'claude-opus-4', 'gpt-4o', 'gpt-4o-mini', 'llama-3.3-70b'];
export default function AgentCreatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [goal, setGoal] = useState('');
  const [backstory, setBackstory] = useState('');
  const [model, setModel] = useState('claude-sonnet-4');
  const [selectedTools, setSelectedTools] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const toggleTool = (t) => setSelectedTools(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const handleCreate = async () => {
    if (!name.trim() || !role.trim()) { setError('Name and Role are required'); return; }
    setError(''); setSaving(true);
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, goal, backstory, model, tools: selectedTools }),
      });
      const data = await res.json();
      if (res.ok) { setSaved(true); setTimeout(() => router.push('/agents'), 2000); }
      else { setError('Failed to create agent'); setSaving(false); }
    } catch (e) { setError('Network error'); setSaving(false); }
  };
  if (saved) return (
    <div className="max-w-[700px] mx-auto text-center py-20">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold mx-auto mb-4">\u2713</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Agent Created Successfully!</h2>
      <p className="text-sm text-gray-500 mb-1">{name} ({role})</p>
      <p className="text-xs text-gray-400">Model: {model} &bull; {selectedTools.length} tools</p>
      <p className="text-xs text-gray-400 mt-4">Redirecting to agents list...</p>
    </div>
  );
  return (
    <div className="max-w-[700px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Create Agent</h1>
      <p className="text-sm text-gray-500 mb-6">Define a new AI agent with role, goal, and tools</p>
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}
      <div className="space-y-5">
        <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Agent Name *</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Research Agent" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" /></div>
        <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Role *</label><input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g., Senior Research Analyst" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" /></div>
        <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Goal</label><input type="text" value={goal} onChange={e => setGoal(e.target.value)} placeholder="What should this agent accomplish?" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" /></div>
        <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Backstory</label><textarea value={backstory} onChange={e => setBackstory(e.target.value)} rows={3} placeholder="Agent background and expertise..." className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-indigo-500" /></div>
        <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Model</label><select value={model} onChange={e => setModel(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-900">{MODELS.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
        <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Tools ({selectedTools.length} selected)</label><div className="flex flex-wrap gap-2">{TOOLS.map(t => (<button key={t} onClick={() => toggleTool(t)} className={'px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ' + (selectedTools.includes(t) ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300')}>{t}</button>))}</div></div>
        <div className="flex gap-3 pt-2">
          <button onClick={handleCreate} disabled={saving || !name.trim() || !role.trim()} className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm">{saving ? 'Creating Agent...' : 'Create Agent'}</button>
          <button onClick={() => router.push('/agents')} className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:text-gray-900">Cancel</button>
        </div>
      </div>
    </div>
  );
}