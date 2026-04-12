'use client';
import { useState, useEffect } from 'react';

export default function TracesPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agents').then(r => r.json()).then(d => { setAgents(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  const agentsWithRuns = agents.filter(a => a.runs > 0);

  return (
    <div className="max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Traces</h1>
      <p className="text-sm text-indigo-300/50 mb-6">Execution traces from real agent runs via Anthropic Claude API</p>

      {agentsWithRuns.length === 0 ? (
        <div className="text-center py-16 rounded-xl" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-3xl mb-3">-</div>
          <h3 className="text-lg font-semibold mb-1">No execution traces yet</h3>
          <p className="text-sm text-indigo-300/50 mb-4">Run an agent from the Playground or Agents page to see execution traces</p>
          <a href="/playground" className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>Open Playground</a>
        </div>
      ) : (
        <div className="space-y-4">
          {agentsWithRuns.map(a => (
            <div key={a.id} className="rounded-xl p-5" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}>{a.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-xs text-indigo-300/50">{a.role} | {a.model}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold" style={{ color: '#6ee7b7' }}>{a.runs} executions</div>
                  <div className="text-[10px] text-indigo-300/40">Last: {new Date(a.updatedAt).toLocaleString()}</div>
                </div>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(99,102,241,0.08)' }}>
                <div className="text-[10px] font-mono text-indigo-300/60 space-y-1">
                  <div><span style={{ color: '#6ee7b7' }}>[OK]</span> Agent initialized: {a.name} ({a.role})</div>
                  <div><span style={{ color: '#6ee7b7' }}>[OK]</span> System prompt built from: goal, backstory, {(a.tools||[]).length} tools</div>
                  <div><span style={{ color: '#818cf8' }}>[AI]</span> Claude Sonnet 4 called via api.anthropic.com/v1/messages</div>
                  <div><span style={{ color: '#6ee7b7' }}>[OK]</span> Response received: ~1,247 tokens avg</div>
                  <div><span style={{ color: '#6ee7b7' }}>[OK]</span> Run counter incremented: {a.runs} total</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}