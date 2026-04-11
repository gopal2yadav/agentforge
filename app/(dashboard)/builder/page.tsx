'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TEMPLATES = [
  { label: 'Automate social media posting', desc: 'Schedule and publish content across platforms with AI-generated copy' },
  { label: 'Summarize support tickets', desc: 'Auto-categorize and summarize incoming customer issues' },
  { label: 'Generate weekly reports', desc: 'Collect data from multiple sources and create executive summaries' },
  { label: 'Process invoices', desc: 'Extract data from invoices, validate, and route for approval' },
  { label: 'Score inbound leads', desc: 'Analyze and rank leads by fit, engagement, and intent signals' },
  { label: 'Triage GitHub issues', desc: 'Auto-label, assign, and prioritize new issues in your repos' },
];

export default function BuilderPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [building, setBuilding] = useState(false);
  const [result, setResult] = useState(null);

  const handleBuild = async (text) => {
    const input = text || prompt;
    if (!input.trim()) return;
    setPrompt(input);
    setBuilding(true);
    setResult(null);

    // Simulate AI building the automation
    await new Promise(r => setTimeout(r, 2500));

    setResult({
      name: input.substring(0, 40) + (input.length > 40 ? '...' : ''),
      agents: [
        { name: 'Coordinator', role: 'Plans and delegates tasks across the workflow' },
        { name: 'Specialist', role: 'Executes the core task with domain expertise' },
        { name: 'Reviewer', role: 'Validates output quality and suggests improvements' },
      ],
      steps: ['Receive trigger event', 'Parse input data', 'Execute agent pipeline', 'Validate results', 'Deliver output'],
      estimatedTokens: Math.floor(Math.random() * 5000) + 3000,
    });
    setBuilding(false);
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">What would you like to automate?</h1>
        <p className="text-sm text-[#6b6b8a]">Describe your workflow and AI will create an agent pipeline for you</p>
      </div>

      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 mb-6">
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to automate..."
          rows={3}
          className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4a5a] resize-none focus:outline-none focus:border-[#6366f1] transition-colors mb-3" />
        <button onClick={() => handleBuild(null)} disabled={building || !prompt.trim()}
          className="w-full px-4 py-3 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors disabled:opacity-50 shadow-lg shadow-[#6366f1]/20">
          {building ? 'Building your automation...' : 'Build with AI'}
        </button>
      </div>

      {!result && !building && (
        <div>
          <div className="text-xs text-[#4a4a5a] uppercase tracking-wider font-semibold mb-3 text-center">Or try a template</div>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map(t => (
              <button key={t.label} onClick={() => handleBuild(t.label)}
                className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4 text-left hover:border-[#6366f1]/30 transition-all group">
                <div className="text-sm font-semibold group-hover:text-[#818cf8] transition-colors">{t.label}</div>
                <div className="text-[11px] text-[#4a4a5a] mt-1">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {building && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3 text-[#6366f1]">
            <div className="w-5 h-5 border-2 border-[#6366f1] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">AI is designing your automation pipeline...</span>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="bg-[#14141f]/40 border border-green-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-400 text-lg">\u2713</span>
              <span className="text-sm font-semibold">Automation Created</span>
            </div>
            <div className="text-lg font-bold mb-4">{result.name}</div>

            <div className="mb-4">
              <div className="text-[10px] text-[#6b6b8a] uppercase tracking-wider mb-2">Agents ({result.agents.length})</div>
              <div className="space-y-2">
                {result.agents.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#0a0a0f] rounded-lg p-3">
                    <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1] text-xs font-bold">{a.name.charAt(0)}</div>
                    <div>
                      <div className="text-xs font-semibold">{a.name}</div>
                      <div className="text-[10px] text-[#6b6b8a]">{a.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-[10px] text-[#6b6b8a] uppercase tracking-wider mb-2">Pipeline Steps</div>
              <div className="flex items-center gap-2">
                {result.steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[10px] bg-[#0a0a0f] text-[#a0a0b8] px-2.5 py-1 rounded-lg border border-[#1e1e2e]">{s}</span>
                    {i < result.steps.length - 1 && <span className="text-[#3a3a4a]">\u2192</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#2a2a3d]">
              <span className="text-[11px] text-[#4a4a5a]">Est. {result.estimatedTokens.toLocaleString()} tokens per run</span>
              <div className="flex gap-2">
                <button onClick={() => router.push('/flows/editor')} className="px-4 py-2 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6]">Open in Editor</button>
                <button onClick={() => router.push('/automations')} className="px-4 py-2 rounded-lg border border-[#2a2a3d] text-sm text-[#6b6b8a]">Deploy</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}