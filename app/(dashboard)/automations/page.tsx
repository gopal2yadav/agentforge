'use client';
import { useState, useEffect } from 'react';

const TRIGGERS = ['schedule', 'webhook', 'on_event', 'on_agent_complete', 'manual'];

export default function AutomationsPage() {
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('schedule');
  const [agent, setAgent] = useState('');
  const [agents, setAgents] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/automations').then(r => r.json()).then(d => { setAutomations(d); setLoading(false); }).catch(() => setLoading(false));
    fetch('/api/agents').then(r => r.json()).then(setAgents).catch(() => {});
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const res = await fetch('/api/automations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, trigger, agent })
    });
    const data = await res.json();
    setAutomations([data, ...automations]);
    setShowCreate(false); setName(''); setSaving(false);
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Automations</h1>
          <p className="text-sm text-gray-500">{automations.length} automations configured</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ New Automation</button>
      </div>

      {showCreate && (
        <div className="bg-white border border-indigo-200 rounded-xl p-5 mb-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Create Automation</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Daily Report" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Trigger</label>
              <select value={trigger} onChange={e => setTrigger(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                {TRIGGERS.map(t => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Agent</label>
              <select value={agent} onChange={e => setAgent(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option value="">Select agent...</option>
                {agents.map((a: any) => <option key={a.id} value={a.name}>{a.name}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleCreate} disabled={saving || !name.trim()} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50">{saving ? 'Creating...' : 'Create'}</button>
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" /><p className="text-sm text-gray-400">Loading...</p></div>
      ) : automations.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <div className="text-4xl mb-3">\u26A1</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No automations yet</h3>
          <p className="text-sm text-gray-500 mb-4">Automate your agent workflows with triggers</p>
          <button onClick={() => setShowCreate(true)} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">Create Automation</button>
        </div>
      ) : (
        <div className="space-y-3">
          {automations.map((a: any) => (
            <div key={a.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 text-sm">\u26A1</div>
                  <div>
                    <div className="text-[15px] font-semibold text-gray-900">{a.name}</div>
                    <div className="text-xs text-gray-500">Trigger: {a.trigger} {a.agent ? '\u2192 ' + a.agent : ''}</div>
                  </div>
                </div>
                <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + (a.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}