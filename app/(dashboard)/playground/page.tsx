'use client';

import { useState } from 'react';
import { Bot, Play, Loader2, Copy, Check, Zap, Clock, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

const AGENTS = [
  { id: '1', name: 'Research Agent', description: 'Web research & summarization', color: '#6366f1' },
  { id: '2', name: 'Code Reviewer', description: 'Code analysis & improvements', color: '#22d3ee' },
  { id: '3', name: 'Data Analyst', description: 'Data processing & insights', color: '#22c55e' },
];

interface ExecutionResult {
  id: string;
  agentName: string;
  status: string;
  output: string;
  tokensUsed: number;
  latencyMs: number;
  model: string;
  demo: boolean;
}

export default function PlaygroundPage() {
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const runAgent = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/agents/${selectedAgent.id}/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setResult({ id: 'err', agentName: selectedAgent.name, status: 'FAILED', output: e.message, tokensUsed: 0, latencyMs: 0, model: '', demo: true });
    }
    setLoading(false);
  };

  const copyOutput = () => {
    if (result?.output) {
      navigator.clipboard.writeText(result.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">API Playground</h1>
      <p className="text-sm text-[#6b6b8a] mb-6">Test your AI agents in real-time</p>

      <div className="flex gap-3 mb-5">
        {AGENTS.map(agent => (
          <button key={agent.id} onClick={() => setSelectedAgent(agent)}
            className={cn('flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 transition-all flex-1',
              selectedAgent.id === agent.id ? 'border-[' + agent.color + '] bg-[#14141f]' : 'border-[#2a2a3d] bg-[#14141f]/30 hover:border-[#3a3a4d]')}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: agent.color + '15' }}>
              <Bot className="w-4.5 h-4.5" style={{ color: agent.color }} />
            </div>
            <div className="text-left">
              <div className="text-[13px] font-semibold text-white">{agent.name}</div>
              <div className="text-[10px] text-[#6b6b8a]">{agent.description}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 mb-5">
        <label className="text-xs font-semibold text-[#6b6b8a] uppercase tracking-wider mb-2 block">Input</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
          placeholder="Enter your prompt for the agent..."
          className="w-full bg-[#0a0a0f] border border-[#2a2a3d] rounded-lg p-4 text-sm text-white resize-none outline-none focus:border-[#6366f1] placeholder:text-[#4a4a5a]" />
        <div className="flex justify-end mt-3">
          <button onClick={runAgent} disabled={loading || !input.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-[#6366f1]/20">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {loading ? 'Running...' : 'Run Agent'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2a3d]">
            <div className="flex items-center gap-4">
              <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold',
                result.status === 'COMPLETED' ? 'bg-[#22c55e]/10 text-[#22c55e]' : 'bg-[#ef4444]/10 text-[#ef4444]')}>
                <span className={cn('w-1.5 h-1.5 rounded-full', result.status === 'COMPLETED' ? 'bg-[#22c55e]' : 'bg-[#ef4444]')} />
                {result.status}
              </span>
              {result.demo && <span className="text-[10px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full font-medium">Demo Mode</span>}
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[#6b6b8a] font-mono">
              <span className="flex items-center gap-1"><Hash className="w-3 h-3" />{result.tokensUsed} tok</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{result.latencyMs}ms</span>
              <button onClick={copyOutput} className="flex items-center gap-1 hover:text-white transition-colors">
                {copied ? <Check className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="p-5">
            <pre className="text-sm text-[#e0e0e8] whitespace-pre-wrap font-sans leading-relaxed">{result.output}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
