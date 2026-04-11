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

const TOOLS = ['Web Search', 'File Reader', 'Code Executor', 'API Caller', 'Database Query', 'Email Sender', 'Slack Notifier', 'GitHub Issues'];

export default function CreateAgentPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [goal, setGoal] = useState('');
  const [backstory, setBackstory] = useState('');
  const [model, setModel] = useState(MODELS[0].id);
  const [selectedTools, setSelectedTools] = useState([]);
  const [saving, setSaving] = useState(false);

  const toggleTool = (t) => setSelectedTools(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const handleCreate = async () => {
    setSaving(true);
    try {
      await fetch('/api/agents', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, role, goal, backstory, model, tools: selectedTools }) });
      router.push('/agents');
    } catch { alert('Failed to create agent'); }
    finally { setSaving(false); }
  };

  return (
    <div className="max-w-[700px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Create Agent</h1>
      <p className="text-sm text-[#6b6b8a] mb-8">Configure a new AI agent with role, goal, and backstory</p>
      <div className="space-y-5">
        <div>
          <label className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider mb-2 block">Agent Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Senior Research Analyst"
            className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4a5a] focus:outline-none focus:border-[#6366f1]" />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider mb-2 block">Role</label>
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g., Lead Market Research Analyst"
            className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4a5a] focus:outline-none focus:border-[#6366f1]" />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider mb-2 block">Goal</label>
          <textarea value={goal} onChange={(e) => setGoal(e.target.value)} rows={2} placeholder="What should this agent achieve? e.g., Produce comprehensive market research reports with actionable insights"
            className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4a5a] focus:outline-none focus:border-[#6366f1] resize-none" />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider mb-2 block">Backstory</label>
          <textarea value={backstory} onChange={(e) => setBackstory(e.target.value)} rows={3} placeholder="Background context for the agent's persona. e.g., You are a seasoned analyst with 15 years of experience in market research..."
            className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4a5a] focus:outline-none focus:border-[#6366f1] resize-none font-mono" />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider mb-2 block">Model</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MODELS.map((m) => (
              <button key={m.id} onClick={() => setModel(m.id)}
                className={"text-left px-3 py-2.5 rounded-lg border transition-all " + (model === m.id ? 'border-[#6366f1] bg-[#6366f1]/10 text-white' : 'border-[#2a2a3d] text-[#a0a0b8] hover:border-[#3a3a4d]')}>
                <div className="text-xs font-semibold">{m.name}</div>
                <div className="text-[9px] text-[#6b6b8a] mt-0.5">{m.provider}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider mb-2 block">Tools</label>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map(t => (
              <button key={t} onClick={() => toggleTool(t)}
                className={"px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors " + (selectedTools.includes(t) ? 'border-[#6366f1] bg-[#6366f1]/10 text-[#818cf8]' : 'border-[#2a2a3d] text-[#6b6b8a] hover:border-[#3a3a4d]')}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={handleCreate} disabled={saving || !name.trim()}
            className="px-6 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors disabled:opacity-50 shadow-lg shadow-[#6366f1]/20">
            {saving ? 'Creating...' : 'Create Agent'}
          </button>
          <button onClick={() => router.push('/agents')} className="px-6 py-2.5 rounded-lg border border-[#2a2a3d] text-sm text-[#6b6b8a] hover:text-white transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
}