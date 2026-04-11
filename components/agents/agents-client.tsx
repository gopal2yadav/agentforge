'use client';
import Link from 'next/link';

interface Agent { id: string; name: string; description: string; model: string; provider: string; status: string; totalRuns: number; successCount: number; avgLatencyMs: number; updatedAt: string; }

export function AgentsClient({ agents, plan }: { agents: Agent[]; plan: string }) {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">AI Agents</h1><p className="text-sm text-gray-500">{agents.length} agents configured</p></div>
        <Link href="/agents/create" className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ New Agent</Link>
      </div>
      <div className="space-y-3">
        {agents.map((agent) => (
          <Link href={'/agents/' + agent.id} key={agent.id} className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-200 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-bold">{agent.name.charAt(0)}</div>
                <div>
                  <div className="text-[15px] font-semibold text-gray-900">{agent.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{agent.description}</div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{agent.model}</span>
                    <span className="text-[10px] text-gray-400">{agent.totalRuns} runs</span>
                    <span className="text-[10px] text-gray-400">{agent.avgLatencyMs}ms avg</span>
                    <span className="text-[10px] text-emerald-600">{Math.round((agent.successCount / agent.totalRuns) * 100)}% success</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg border border-gray-200 text-[11px] text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors" onClick={(e) => { e.preventDefault(); window.location.href = '/playground'; }}>Test</span>
                <span className={"inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold " + (agent.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>
                  <span className={"w-1.5 h-1.5 rounded-full " + (agent.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-gray-400')} />{agent.status.toLowerCase()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}