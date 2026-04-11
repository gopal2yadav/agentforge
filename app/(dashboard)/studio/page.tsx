'use client';
import { useState } from 'react';

const SUGGESTIONS = [
  'Automate social media posting across platforms',
  'Summarize customer support tickets daily',
  'Generate weekly business reports from multiple data sources',
  'Score and triage inbound sales leads',
  'Review pull requests and suggest improvements',
  'Monitor competitor pricing and alert on changes',
];

const PROJECTS = [
  { id: '1', name: 'Lead Research Pipeline', status: 'live', modified: '2 hours ago', agents: 3, tasks: 5 },
  { id: '2', name: 'Content Generation Crew', status: 'live', modified: '1 day ago', agents: 2, tasks: 4 },
  { id: '3', name: 'Support Ticket Triage', status: 'deploying', modified: '30 min ago', agents: 4, tasks: 6 },
  { id: '4', name: 'Code Review Bot', status: 'not_deployed', modified: '3 days ago', agents: 1, tasks: 3 },
];

export default function StudioPage() {
  const [prompt, setPrompt] = useState('');
  const [filter, setFilter] = useState('all');
  const [generating, setGenerating] = useState(false);

  const statusStyle = (s) => {
    if (s === 'live') return 'bg-green-400/10 text-green-400';
    if (s === 'deploying') return 'bg-blue-400/10 text-blue-400';
    if (s === 'failed') return 'bg-red-400/10 text-red-400';
    return 'bg-gray-400/20 text-gray-400';
  };

  const filtered = PROJECTS.filter(p => filter === 'all' || p.status === filter);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setPrompt(''); }, 2000);
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Crew Studio</h1>
        <p className="text-sm text-[#6b6b8a]">Describe what you want to automate and AI will create intelligent workflows</p>
      </div>
      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-6 mb-8">
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3}
          placeholder="What automation would you like to build?"
          className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4a5a] focus:outline-none focus:border-[#6366f1] resize-none mb-3" />
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.slice(0, 3).map(s => (
              <button key={s} onClick={() => setPrompt(s)}
                className="px-3 py-1 rounded-full text-[10px] border border-[#2a2a3d] text-[#6b6b8a] hover:text-white hover:border-[#6366f1] transition-colors truncate max-w-[200px]">
                {s}
              </button>
            ))}
          </div>
          <button onClick={handleGenerate} disabled={generating || !prompt.trim()}
            className="px-5 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors disabled:opacity-50 shadow-lg shadow-[#6366f1]/20">
            {generating ? 'Generating...' : 'Build Crew'}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Recent Projects</h2>
        <div className="flex gap-2">
          {['all', 'live', 'deploying', 'not_deployed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={"px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider " + (filter === f ? 'bg-[#6366f1]/15 text-[#818cf8]' : 'text-[#6b6b8a] hover:text-white')}>
              {f === 'not_deployed' ? 'Draft' : f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#3a3a4d] transition-all group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold group-hover:text-[#818cf8] transition-colors">{p.name}</div>
              <span className={"px-2 py-0.5 rounded-full text-[9px] font-bold uppercase " + statusStyle(p.status)}>{p.status === 'not_deployed' ? 'draft' : p.status}</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-[#6b6b8a]">
              <span>{p.agents} agents</span>
              <span>{p.tasks} tasks</span>
              <span>Modified {p.modified}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}