'use client';

import { useState } from 'react';

const DEMO_AGENTS = [
  { id: '1', name: 'Research Agent', model: 'claude-sonnet-4-20250514' },
  { id: '2', name: 'Code Reviewer', model: 'claude-sonnet-4-20250514' },
  { id: '3', name: 'Data Analyst', model: 'gpt-4o' },
];

export default function PlaygroundPage() {
  const [selectedAgent, setSelectedAgent] = useState(DEMO_AGENTS[0]);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/agents/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: selectedAgent.id, prompt, model: selectedAgent.model }),
      });
      const data = await res.json();
      setResponse(data.result || data.error || 'No response');
    } catch (e) {
      setResponse('Error: Failed to connect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">API Playground</h1>
        <p className="text-sm text-[#6b6b8a]">Test your agents interactively</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5">
            <label className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider mb-3 block">Select Agent</label>
            <div className="space-y-2">
              {DEMO_AGENTS.map((agent) => (
                <button key={agent.id} onClick={() => setSelectedAgent(agent)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${selectedAgent.id === agent.id ? 'border-[#6366f1] bg-[#6366f1]/10 text-white' : 'border-[#2a2a3d] hover:border-[#3a3a4d] text-[#a0a0b8]'}`}>
                  <div className="text-sm font-semibold">{agent.name}</div>
                  <div className="text-[11px] text-[#6b6b8a] mt-0.5 font-mono">{agent.model}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5">
            <label className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider mb-3 block">Prompt</label>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="w-full h-32 bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4a5a] resize-none focus:outline-none focus:border-[#6366f1] transition-colors" />
            <button onClick={handleRun} disabled={loading || !prompt.trim()}
              className="mt-3 w-full px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#6366f1]/20">
              {loading ? 'Running...' : 'Run Agent'}
            </button>
          </div>
        </div>
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5">
          <label className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider mb-3 block">Response</label>
          <div className="bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg p-4 min-h-[300px] font-mono text-sm text-[#e8e8f0] whitespace-pre-wrap">
            {loading ? (<div className="flex items-center gap-2 text-[#6366f1]"><div className="w-2 h-2 rounded-full bg-[#6366f1] animate-pulse" />Processing...</div>
            ) : response || (<span className="text-[#4a4a5a]">Agent response will appear here...</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}