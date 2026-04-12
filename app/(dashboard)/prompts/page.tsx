'use client';
import { useState } from 'react';

const PROMPTS = [
  { title: 'Market Research', category: 'Research', prompt: 'Conduct a comprehensive market analysis for [INDUSTRY]. Include market size, growth trends, key players, and opportunities.' },
  { title: 'Code Review', category: 'Engineering', prompt: 'Review this code for bugs, security vulnerabilities, and performance issues. Suggest improvements with examples:\n\n[PASTE CODE HERE]' },
  { title: 'Blog Post Draft', category: 'Content', prompt: 'Write a 1000-word blog post about [TOPIC]. Include an engaging introduction, 3-5 key sections with headers, and a compelling conclusion with a call to action.' },
  { title: 'Email Campaign', category: 'Marketing', prompt: 'Create a 5-email drip campaign for [PRODUCT/SERVICE] targeting [AUDIENCE]. Include subject lines, preview text, and body copy for each email.' },
  { title: 'Data Analysis', category: 'Analytics', prompt: 'Analyze this dataset and provide: 1) Key metrics and KPIs, 2) Trends and patterns, 3) Anomalies or outliers, 4) Actionable recommendations.\n\n[DESCRIBE YOUR DATA]' },
  { title: 'Bug Report', category: 'Engineering', prompt: 'Create a detailed bug report for: [DESCRIBE BUG]. Include steps to reproduce, expected behavior, actual behavior, environment details, and severity assessment.' },
  { title: 'Meeting Summary', category: 'Productivity', prompt: 'Summarize this meeting transcript into: 1) Key decisions made, 2) Action items with owners, 3) Open questions, 4) Next steps.\n\n[PASTE TRANSCRIPT]' },
  { title: 'Product Requirements', category: 'Product', prompt: 'Create a PRD for [FEATURE]. Include: user stories, acceptance criteria, technical requirements, success metrics, and timeline estimate.' },
];

export default function PromptsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(PROMPTS.map(p => p.category)))];
  const filtered = filter === 'All' ? PROMPTS : PROMPTS.filter(p => p.category === filter);

  const copyPrompt = (p: typeof PROMPTS[0]) => {
    navigator.clipboard.writeText(p.prompt);
    setCopied(p.title);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Prompt Library</h1>
      <p className="text-sm text-indigo-300/50 mb-6">{PROMPTS.length} ready-to-use prompts — copy and use in the Playground</p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" style={{ background: filter === c ? 'rgba(99,102,241,0.15)' : 'rgba(15,15,35,0.4)', border: '1px solid ' + (filter === c ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.1)'), color: filter === c ? '#a5b4fc' : '#64748b' }}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map(p => (
          <div key={p.title} className="rounded-xl p-5 transition-all hover:translate-y-[-1px]" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-sm">{p.title}</div>
              <span className="px-2 py-0.5 rounded text-[9px] font-semibold" style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>{p.category}</span>
            </div>
            <p className="text-xs text-indigo-300/50 mb-4 font-mono leading-relaxed line-clamp-3">{p.prompt}</p>
            <div className="flex gap-2">
              <button onClick={() => copyPrompt(p)} className="px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all" style={{ background: copied === p.title ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.1)', color: copied === p.title ? '#6ee7b7' : '#a5b4fc', border: '1px solid ' + (copied === p.title ? 'rgba(16,185,129,0.3)' : 'rgba(99,102,241,0.2)') }}>{copied === p.title ? 'Copied!' : 'Copy'}</button>
              <a href="/playground" className="px-3 py-1.5 rounded-lg text-[10px] font-semibold" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white' }}>Use in Playground</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}