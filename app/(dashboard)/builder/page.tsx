'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const TEMPLATES = [
  { label: 'Automate social media posting', desc: 'Schedule and publish content across platforms' },
  { label: 'Summarize support tickets', desc: 'Auto-categorize and summarize incoming issues' },
  { label: 'Generate weekly reports', desc: 'Collect data and create executive summaries' },
  { label: 'Process invoices', desc: 'Extract data, validate, and route for approval' },
  { label: 'Score inbound leads', desc: 'Rank leads by fit, engagement, and intent' },
  { label: 'Triage GitHub issues', desc: 'Auto-label, assign, and prioritize new issues' },
];
export default function BuilderPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [building, setBuilding] = useState(false);
  const [result, setResult] = useState(null);
  const handleBuild = async (text) => {
    const input = text || prompt;
    if (!input.trim()) return;
    setPrompt(input); setBuilding(true); setResult(null);
    await new Promise(r => setTimeout(r, 2500));
    setResult({
      name: input.substring(0, 40) + (input.length > 40 ? '...' : ''),
      agents: [
        { name: 'Coordinator', role: 'Plans and delegates tasks' },
        { name: 'Specialist', role: 'Executes core task with expertise' },
        { name: 'Reviewer', role: 'Validates output quality' },
      ],
      steps: ['Receive trigger', 'Parse input', 'Execute pipeline', 'Validate', 'Deliver output'],
      tokens: Math.floor(Math.random() * 5000) + 3000,
    });
    setBuilding(false);
  };
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">What would you like to automate?</h1>
        <p className="text-sm text-gray-500">Describe your workflow and AI will create an agent pipeline</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe what you want to automate..." rows={3}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-indigo-500 mb-3" />
        <button onClick={() => handleBuild(null)} disabled={building || !prompt.trim()}
          className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-sm">
          {building ? 'Building your automation...' : 'Build with AI'}
        </button>
      </div>
      {!result && !building && (
        <div>
          <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3 text-center">Or try a template</div>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map(t => (
              <button key={t.label} onClick={() => handleBuild(t.label)}
                className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-indigo-300 hover:shadow-md transition-all group">
                <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{t.label}</div>
                <div className="text-[11px] text-gray-400 mt-1">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      {building && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3 text-indigo-600">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">AI is designing your pipeline...</span>
          </div>
        </div>
      )}
      {result && (
        <div className="bg-white border border-emerald-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-emerald-600 text-lg">\u2713</span>
            <span className="text-sm font-semibold text-gray-900">Automation Created</span>
          </div>
          <div className="text-lg font-bold text-gray-900 mb-4">{result.name}</div>
          <div className="mb-4">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Agents ({result.agents.length})</div>
            <div className="space-y-2">
              {result.agents.map((a, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">{a.name.charAt(0)}</div>
                  <div><div className="text-xs font-semibold text-gray-900">{a.name}</div><div className="text-[10px] text-gray-500">{a.role}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-[11px] text-gray-400">Est. {result.tokens.toLocaleString()} tokens per run</span>
            <div className="flex gap-2">
              <button onClick={() => router.push('/flows/editor')} className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">Open in Editor</button>
              <button onClick={() => router.push('/automations')} className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-500">Deploy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}