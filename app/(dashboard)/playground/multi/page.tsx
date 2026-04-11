'use client';
import { useState } from 'react';
const MODELS = [
  { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Anthropic' },
  { id: 'claude-opus-4', name: 'Claude Opus 4', provider: 'Anthropic' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
  { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', provider: 'Meta' },
];
export default function MultiModelPage() {
  const [prompt, setPrompt] = useState('');
  const [leftModel, setLeftModel] = useState('claude-sonnet-4');
  const [rightModel, setRightModel] = useState('gpt-4o');
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(null);
  const run = () => {
    if (!prompt.trim()) return;
    setRunning(true);
    setTimeout(() => {
      setResults({
        left: { output: 'Based on my analysis of Q1 2026 trends, the EdTech market is experiencing 34% YoY growth driven by AI tutoring adoption. Key segments include personalized learning (+52%), automated assessment (+28%), and collaborative tools (+19%)...', tokens: 3200, latency: 1850 },
        right: { output: 'The EdTech sector in Q1 2026 shows robust expansion with several notable developments. AI-powered tutoring platforms have seen a 340% increase in user engagement. Market cap for leading companies grew by an average of 23%...', tokens: 2900, latency: 2400 },
      });
      setRunning(false);
    }, 2000);
  };
  const lm = MODELS.find(m => m.id === leftModel);
  const rm = MODELS.find(m => m.id === rightModel);
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Multi-Model Playground</h1><p className="text-sm text-gray-500">Compare responses from different AI models side-by-side</p></div>
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-4">
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={3} placeholder="Enter a prompt to test across models..."
          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:border-indigo-500 mb-3" />
        <div className="flex items-center gap-3">
          <select value={leftModel} onChange={e => setLeftModel(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 flex-1">
            {MODELS.map(m => <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>)}
          </select>
          <span className="text-gray-400 text-sm font-medium">vs</span>
          <select value={rightModel} onChange={e => setRightModel(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 flex-1">
            {MODELS.map(m => <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>)}
          </select>
          <button onClick={run} disabled={running || !prompt.trim()} className="px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-sm">{running ? 'Running...' : 'Compare'}</button>
        </div>
      </div>
      {results && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-900">{lm?.name}</div>
              <div className="flex items-center gap-3 text-[10px] text-gray-400"><span>{results.left.tokens} tok</span><span>{results.left.latency}ms</span></div>
            </div>
            <div className="px-5 py-4 text-sm text-gray-700 leading-relaxed">{results.left.output}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-900">{rm?.name}</div>
              <div className="flex items-center gap-3 text-[10px] text-gray-400"><span>{results.right.tokens} tok</span><span>{results.right.latency}ms</span></div>
            </div>
            <div className="px-5 py-4 text-sm text-gray-700 leading-relaxed">{results.right.output}</div>
          </div>
        </div>
      )}
    </div>
  );
}