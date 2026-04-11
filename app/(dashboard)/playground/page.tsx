'use client';
import { useState } from 'react';
const AGENTS = ['Research Agent', 'Code Reviewer', 'Writer Agent', 'Data Analyst', 'Coordinator'];
const MODELS = ['claude-sonnet-4', 'claude-opus-4', 'gpt-4o', 'gpt-4o-mini'];
const SAMPLE_RESPONSES: Record<string, string> = {
  'Research Agent': 'Based on my analysis, here are the key findings:\n\n1. Market Growth: The sector shows 34% YoY growth driven by AI adoption\n2. Key Players: The top 3 companies control 45% market share\n3. Trends: Personalized learning (+52%), automated assessment (+28%)\n4. Recommendation: Focus on the SMB segment which is underserved\n\nI used web_search to gather data from 8 sources and summarized the findings.',
  'Code Reviewer': 'Code Review Summary:\n\n\u2705 No critical security issues found\n\u26A0\uFE0F 3 suggestions:\n\n1. Line 12: Use const instead of let for immutable variables\n2. Line 28: Add error handling for async operations\n3. Line 45: Consider extracting this into a reusable utility function\n\nOverall: Good code quality. Approve with minor changes.',
  'Writer Agent': 'Draft Blog Post: AI in 2026\n\nThe artificial intelligence landscape in 2026 has fundamentally shifted. What was once experimental has become operational. Companies across every sector are deploying AI agents not as tools, but as autonomous team members.\n\nThree trends define this moment:\n- Multi-agent orchestration is replacing single-model approaches\n- RAG pipelines have matured to near-human accuracy\n- Cost per inference has dropped 90% in 18 months\n\n[Draft continues... 2,400 words total]',
  'Data Analyst': 'Analysis Complete:\n\n| Metric | Q1 2026 | Q4 2025 | Change |\n|--------|---------|---------|--------|\n| Revenue | $2.4M | $1.8M | +33% |\n| Users | 12,400 | 8,900 | +39% |\n| Churn | 3.2% | 4.1% | -0.9% |\n\nKey Insight: User growth is outpacing revenue growth, suggesting a pricing optimization opportunity.',
  'Coordinator': 'Task delegation complete:\n\n1. Research Agent \u2192 Market analysis (assigned)\n2. Writer Agent \u2192 Blog post draft (assigned)\n3. Code Reviewer \u2192 PR #145 review (assigned)\n\nAll agents notified. ETA: 15 minutes for full pipeline completion.',
};
export default function PlaygroundPage() {
  const [agent, setAgent] = useState(AGENTS[0]);
  const [model, setModel] = useState(MODELS[0]);
  const [prompt, setPrompt] = useState('');
  const [running, setRunning] = useState(false);
  const [response, setResponse] = useState('');
  const [tokens, setTokens] = useState(0);
  const [latency, setLatency] = useState(0);
  const handleRun = () => {
    if (!prompt.trim()) return;
    setRunning(true);
    setResponse('');
    const startTime = Date.now();
    const fullResp = SAMPLE_RESPONSES[agent] || 'Agent response for: ' + prompt;
    let i = 0;
    const interval = setInterval(() => {
      i += Math.floor(Math.random() * 8) + 3;
      if (i >= fullResp.length) { i = fullResp.length; clearInterval(interval); setRunning(false); setLatency(Date.now() - startTime); setTokens(Math.floor(fullResp.length * 1.3)); }
      setResponse(fullResp.substring(0, i));
    }, 30);
  };
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Playground</h1><p className="text-sm text-gray-500">Test your agents interactively</p></div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Agent</label><select value={agent} onChange={e => setAgent(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900">{AGENTS.map(a => <option key={a}>{a}</option>)}</select></div>
        <div><label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Model</label><select value={model} onChange={e => setModel(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900">{MODELS.map(m => <option key={m}>{m}</option>)}</select></div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-4">
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={3} placeholder="Enter your prompt..."
          className="w-full px-5 py-4 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none border-b border-gray-100" />
        <div className="px-5 py-3 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            {tokens > 0 && <span>{tokens} tokens</span>}
            {latency > 0 && <span>{(latency/1000).toFixed(1)}s</span>}
          </div>
          <button onClick={handleRun} disabled={running || !prompt.trim()}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm transition-all">
            {running ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>
      {(response || running) && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-[10px] font-bold">{agent.charAt(0)}</div><span className="text-sm font-semibold text-gray-900">{agent}</span></div>
            {running && <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />}
          </div>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{response}{running && <span className="animate-pulse">|</span>}</pre>
        </div>
      )}
    </div>
  );
}