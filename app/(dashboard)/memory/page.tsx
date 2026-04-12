'use client';
import { useState, useEffect } from 'react';

export default function MemoryPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { fetch('/api/agents').then(r => r.json()).then(d => { setAgents(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false)); }, []);

  const agentsWithMemory = agents.filter(a => a.backstory || a.goal);

  if (loading) return <div className="text-center py-16"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div className="max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Memory</h1>
      <p className="text-sm text-indigo-300/50 mb-6">Agent memory and knowledge — {agentsWithMemory.length} agents with stored context</p>

      <div className="rounded-xl p-4 mb-6" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <p className="text-sm text-indigo-300/70">Each agent stores persistent memory through its <strong className="text-indigo-300">backstory</strong> and <strong className="text-indigo-300">goal</strong>. This context is injected as a system prompt when the agent executes via the Anthropic Claude API, giving each agent a unique personality and expertise.</p>
      </div>

      {agentsWithMemory.length === 0 ? (
        <div className="text-center py-16 rounded-xl" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <h3 className="text-lg font-semibold mb-1">No agent memories yet</h3>
          <p className="text-sm text-indigo-300/50 mb-4">Create agents with backstories to build memory</p>
          <a href="/agents/create" className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}>Create Agent</a>
        </div>
      ) : (
        <div className="space-y-3">
          {agentsWithMemory.map(a => (
            <div key={a.id} className="rounded-xl overflow-hidden transition-all" style={{ background: 'rgba(15,15,35,0.6)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <button onClick={() => setExpanded(expanded === a.id ? null : a.id)} className="w-full p-5 flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}>{a.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold text-sm">{a.name}</div>
                    <div className="text-xs text-indigo-300/50">{a.role} | {a.model} | {a.runs || 0} runs</div>
                  </div>
                </div>
                <span className="text-indigo-400/50 text-xs">{expanded === a.id ? 'Hide' : 'View'} Memory</span>
              </button>
              {expanded === a.id && (
                <div className="px-5 pb-5 space-y-3" style={{ borderTop: '1px solid rgba(99,102,241,0.08)' }}>
                  {a.goal && (
                    <div className="p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <div className="text-[10px] font-semibold text-indigo-400/50 uppercase tracking-wider mb-1">Goal</div>
                      <p className="text-sm text-indigo-200/80">{a.goal}</p>
                    </div>
                  )}
                  {a.backstory && (
                    <div className="p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <div className="text-[10px] font-semibold text-indigo-400/50 uppercase tracking-wider mb-1">Backstory / Persistent Memory</div>
                      <p className="text-sm text-indigo-200/80">{a.backstory}</p>
                    </div>
                  )}
                  {a.tools?.length > 0 && (
                    <div className="p-3 rounded-lg" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <div className="text-[10px] font-semibold text-indigo-400/50 uppercase tracking-wider mb-1">Tools ({a.tools.length})</div>
                      <div className="flex flex-wrap gap-1 mt-1">{a.tools.map((t: string) => <span key={t} className="px-2 py-0.5 rounded text-[9px] font-mono" style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc' }}>{t}</span>)}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}