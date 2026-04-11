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
    setLoading(true); setResponse('');
    try {
      const res = await fetch('/api/agents/run', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ agentId: selectedAgent.id, prompt, model: selectedAgent.model }) });
      const data = await res.json();
      setResponse(data.result || data.error || 'No response');
    } catch (e) { setResponse('Error: Failed to connect'); } finally { setLoading(false); }
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">API Playground</h1>
        <p className="text-sm text-gray-500">Test your agents interactively</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Select Agent</label>
            <div className="space-y-2">
              {DEMO_AGENTS.map((agent) => (
                <button key={agent.id} onClick={() => setSelectedAgent(agent)}
                  className={"w-full text-left px-4 py-3 rounded-lg border transition-all " + (selectedAgent.id === agent.id ? 'border-indigo-400 bg-indigo-50 text-gray-900' : 'border-gray-200 hover:border-gray-300 text-gray-500')}>
                  <div className="text-sm font-semibold">{agent.name}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5 font-mono">{agent.model}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Prompt</label>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your prompt here..."
              className="w-full h-32 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-colors" />
            <button onClick={handleRun} disabled={loading || !prompt.trim()}
              className="mt-3 w-full px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
              {loading ? 'Running...' : 'Run Agent'}
            </button>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">Response</label>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[300px] font-mono text-sm text-gray-800 whitespace-pre-wrap">
            {loading ? (<div className="flex items-center gap-2 text-indigo-600"><div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />Processing...</div>
            ) : response || (<span className="text-gray-400">Agent response will appear here...</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}