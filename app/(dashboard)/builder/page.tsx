'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const SUGGESTIONS = [
  { title: 'Automate social media posting', desc: 'Schedule and publish content across platforms' },
  { title: 'Summarize support tickets', desc: 'Auto-categorize and summarize incoming tickets' },
  { title: 'Generate weekly reports', desc: 'Collect data and create executive summaries' },
  { title: 'Process invoices', desc: 'Extract data, validate, and route for approval' },
  { title: 'Score inbound leads', desc: 'Rank leads by fit, engagement, and intent' },
  { title: 'Triage GitHub issues', desc: 'Auto-label, assign, and prioritize new issues' },
];
export default function BuilderPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [building, setBuilding] = useState(false);
  const [result, setResult] = useState<{name: string; agents: string[]; steps: string[]} | null>(null);
  const handleBuild = () => {
    if (!prompt.trim()) return;
    setBuilding(true);
    setResult(null);
    setTimeout(() => {
      setResult({
        name: prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt,
        agents: ['Research Agent', 'Writer Agent', 'Reviewer Agent'],
        steps: [
          '1. Research Agent gathers relevant data and context',
          '2. Writer Agent drafts the output based on research',
          '3. Reviewer Agent checks quality and provides feedback',
          '4. Final output is compiled and delivered',
        ],
      });
      setBuilding(false);
    }, 2500);
  };
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">AI Builder</h1><p className="text-sm text-gray-500">Describe what you want to automate and AI will design the workflow</p></div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={3} placeholder="Describe what you want to automate..."
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-indigo-500 mb-4" />
        <button onClick={handleBuild} disabled={building || !prompt.trim()}
          className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm transition-all">
          {building ? 'Building workflow...' : 'Build with AI'}
        </button>
      </div>
      {building && (
        <div className="bg-white border border-indigo-200 rounded-xl p-6 shadow-sm mb-6 animate-pulse">
          <div className="flex items-center gap-3"><div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /><span className="text-sm text-indigo-600 font-medium">AI is designing your workflow...</span></div>
          <div className="mt-4 space-y-2"><div className="h-3 bg-indigo-50 rounded w-3/4" /><div className="h-3 bg-indigo-50 rounded w-1/2" /><div className="h-3 bg-indigo-50 rounded w-2/3" /></div>
        </div>
      )}
      {result && (
        <div className="bg-white border border-emerald-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4"><div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold">\u2713</div><span className="text-sm font-semibold text-emerald-700">Workflow designed successfully!</span></div>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Recommended Pipeline</h3>
          <div className="mb-4"><span className="text-xs text-gray-400">Agents needed:</span><div className="flex gap-2 mt-1">{result.agents.map(a => (<span key={a} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100">{a}</span>))}</div></div>
          <div className="mb-4"><span className="text-xs text-gray-400">Execution steps:</span><div className="mt-1 space-y-1.5">{result.steps.map((s, i) => (<div key={i} className="text-sm text-gray-700">{s}</div>))}</div></div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/flows/create')} className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">Create This Flow</button>
            <button onClick={() => router.push('/agents/create')} className="px-5 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:text-gray-900">Create Agents First</button>
          </div>
        </div>
      )}
      {!result && !building && (
        <div><h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Start Templates</h3>
          <div className="grid grid-cols-2 gap-3">{SUGGESTIONS.map(s => (
            <button key={s.title} onClick={() => { setPrompt(s.title + ': ' + s.desc); }} className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="text-sm font-semibold text-gray-900 mb-1">{s.title}</div>
              <div className="text-xs text-gray-500">{s.desc}</div>
            </button>
          ))}</div>
        </div>
      )}
    </div>
  );
}