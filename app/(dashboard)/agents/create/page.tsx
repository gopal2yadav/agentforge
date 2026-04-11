'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const MODELS = [
  { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4', provider: 'Anthropic' },
  { id: 'claude-opus-4-20250514', name: 'Claude Opus 4', provider: 'Anthropic' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
  { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', provider: 'Meta' },
];

const TOOLS = ['Web Search', 'File Reader', 'Code Executor', 'API Caller', 'Database Query', 'Email Sender', 'Slack Notifier', 'PDF Parser'];

export default function CreateAgentPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [goal, setGoal] = useState('');
  const [backstory, setBackstory] = useState('');
  const [model, setModel] = useState(MODELS[0].id);
  const [selectedTools, setSelectedTools] = useState([]);
  const [saving, setSaving] = useState(false);

  const toggleTool = (tool) => {
    setSelectedTools(prev => prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]);
  };

  const handleCreate = async () => {
    setSaving(true);
    try {
      await fetch('/api/agents', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, goal, backstory, model, tools: selectedTools }) });
      router.push('/agents');
    } catch { alert('Failed to create agent'); }
    finally { setSaving(false); }
  };

  return (
    <div className="max-w-[700px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Create Agent</h1>
      <p className="text-sm text-gray-500 mb-8">Configure a new AI agent with role, goal, and tools</p>
      <div className="space-y-5">
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Agent Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Research Agent"
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Role</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g., Senior Research Analyst"
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Goal</label>
          <textarea value={goal} onChange={(e) => setGoal(e.target.value)} rows={2} placeholder="What should this agent achieve?"
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Backstory</label>
          <textarea value={backstory} onChange={(e) => setBackstory(e.target.value)} rows={3} placeholder="Context and expertise this agent should have..."
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none font-mono text-xs" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Model</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MODELS.map((m) => (
              <button key={m.id} onClick={() => setModel(m.id)}
                className={"text-left px-3 py-2.5 rounded-lg border transition-all text-sm " + (model === m.id ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-300')}>
                <div className="font-medium">{m.name}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{m.provider}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Tools</label>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map(tool => (
              <button key={tool} onClick={() => toggleTool(tool)}
                className={"px-3 py-1.5 rounded-lg text-xs font-medium border transition-all " + (selectedTools.includes(tool) ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500 hover:border-gray-300')}>
                {tool}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={handleCreate} disabled={saving || !name.trim()}
            className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm">
            {saving ? 'Creating...' : 'Create Agent'}
          </button>
          <button onClick={() => router.push('/agents')}
            className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:text-gray-900">Cancel</button>
        </div>
      </div>
    </div>
  );
}