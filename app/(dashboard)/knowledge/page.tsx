'use client';
import { useState, useEffect } from 'react';

export default function KnowledgePage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => { fetch('/api/agents').then(r => r.json()).then(d => Array.isArray(d) ? setAgents(d) : setAgents([])).catch(() => {}); }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    try {
      const agent = agents.find(a => a.name === selectedAgent) || null;
      const res = await fetch('/api/playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: query }],
          model: 'claude-sonnet-4',
          agent
        })
      });
      const data = await res.json();
      setResult(data.reply || data.error || 'No result');
    } catch (e) { setResult('Error connecting to AI'); }
    setSearching(false);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Knowledge Base</h1>
      <p className="text-sm text-gray-500 mb-6">Ask questions using your agents&apos; expertise — powered by real Claude AI</p>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Select Agent (optional)</label>
          <select value={selectedAgent} onChange={e => setSelectedAgent(e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm">
            <option value="">Nexus AI (general knowledge)</option>
            {agents.map((a: any) => <option key={a.id} value={a.name}>{a.name} — {a.role}</option>)}
          </select>
        </div>
        <div className="flex gap-3">
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="Ask anything... e.g. 'Analyze our Q1 sales strategy' or 'Write a Python data pipeline'" className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-500" />
          <button onClick={handleSearch} disabled={searching || !query.trim()} className="px-6 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50">{searching ? 'Thinking...' : 'Ask AI'}</button>
        </div>
      </div>

      {result && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">AI</div>
            <span className="text-xs text-gray-400">{selectedAgent || 'Nexus AI'} | claude-sonnet-4</span>
          </div>
          <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{result}</div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Your Agents</h2>
        <div className="grid grid-cols-2 gap-3">
          {agents.map((a: any) => (
            <button key={a.id} onClick={() => { setSelectedAgent(a.name); }} className={'bg-white border rounded-lg p-4 text-left hover:border-indigo-200 transition-all ' + (selectedAgent === a.name ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200')}>
              <div className="text-sm font-semibold text-gray-900">{a.name}</div>
              <div className="text-xs text-gray-500">{a.role}</div>
              <div className="text-[10px] text-gray-400 mt-1">{a.runs} runs | {(a.tools || []).length} tools</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}