'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TRIGGERS = ['Manual', 'On Schedule', 'Webhook', 'On Agent Complete', 'On Event'];

export default function FlowCreatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [trigger, setTrigger] = useState('Manual');
  const [steps, setSteps] = useState([{ agent: '', task: '' }]);
  const [agents, setAgents] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetch('/api/agents').then(r => r.json()).then(setAgents).catch(() => {}); }, []);

  const addStep = () => setSteps(p => [...p, { agent: '', task: '' }]);
  const removeStep = (i: number) => setSteps(p => p.filter((_, idx) => idx !== i));
  const updateStep = (i: number, field: string, val: string) => setSteps(p => p.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

  const handleSave = async () => {
    if (!name.trim()) { setError('Flow name is required'); return; }
    setError(''); setSaving(true);
    try {
      const res = await fetch('/api/flows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description: desc, trigger, steps }),
      });
      if (res.ok) { setSaved(true); setTimeout(() => router.push('/flows'), 2000); }
      else { setError('Failed to create flow'); setSaving(false); }
    } catch (e) { setError('Network error'); setSaving(false); }
  };

  if (saved) return (
    <div className="max-w-[700px] mx-auto text-center py-20">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold mx-auto mb-4">OK</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Flow Created!</h2>
      <p className="text-sm text-gray-500 mb-1">{name}</p>
      <p className="text-xs text-gray-400">{steps.length} steps | Trigger: {trigger}</p>
      <p className="text-xs text-gray-400 mt-4">Redirecting to flows...</p>
    </div>
  );

  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Create Flow</h1>
      <p className="text-sm text-gray-500 mb-6">Design a multi-step agent workflow</p>
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>}
      <div className="space-y-5">
        <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Flow Name *</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Content Pipeline" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" /></div>
        <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Description</label><input type="text" value={desc} onChange={e => setDesc(e.target.value)} placeholder="What does this flow do?" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" /></div>
        <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Trigger</label><div className="flex gap-2">{TRIGGERS.map(t => (<button key={t} onClick={() => setTrigger(t)} className={'px-3 py-2 rounded-lg text-xs font-semibold border transition-all ' + (trigger === t ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-gray-300')}>{t}</button>))}</div></div>
        <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Steps ({steps.length})</label>
          <div className="space-y-3">{steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</div>
              <select value={step.agent} onChange={e => updateStep(i, 'agent', e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 w-48"><option value="">Select agent...</option>{agents.map((a: any) => <option key={a.id} value={a.name}>{a.name}</option>)}</select>
              <input type="text" value={step.task} onChange={e => updateStep(i, 'task', e.target.value)} placeholder="Task description..." className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500" />
              {steps.length > 1 && <button onClick={() => removeStep(i)} className="text-red-400 hover:text-red-600 text-sm">X</button>}
            </div>
          ))}</div>
          <button onClick={addStep} className="mt-3 px-4 py-2 rounded-lg border border-dashed border-gray-300 text-xs text-gray-500 hover:border-indigo-300 hover:text-indigo-600 w-full">+ Add Step</button>
        </div>
        <div className="flex gap-3 pt-3">
          <button onClick={handleSave} disabled={saving || !name.trim()} className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm">{saving ? 'Creating Flow...' : 'Create Flow'}</button>
          <button onClick={() => router.push('/flows')} className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:text-gray-900">Cancel</button>
        </div>
      </div>
    </div>
  );
}