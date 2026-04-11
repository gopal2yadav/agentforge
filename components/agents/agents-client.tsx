'use client';

interface Agent { id: string; name: string; description: string; model: string; provider: string; status: string; totalRuns: number; successCount: number; avgLatencyMs: number; updatedAt: string; }

export function AgentsClient({ agents, plan }: { agents: Agent[]; plan: string }) {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">AI Agents</h1>
          <p className="text-sm text-[#6b6b8a]">{agents.length} agents configured</p>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">+ New Agent</button>
      </div>
      <div className="space-y-3">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#3a3a4d] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1] text-sm font-bold">{agent.name.charAt(0)}</div>
                <div>
                  <div className="text-[15px] font-semibold">{agent.name}</div>
                  <div className="text-xs text-[#6b6b8a] mt-0.5">{agent.description}</div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] font-mono text-[#4a4a5a] bg-[#1a1a2e] px-2 py-0.5 rounded">{agent.model}</span>
                    <span className="text-[10px] text-[#6b6b8a]">{agent.totalRuns} runs</span>
                    <span className="text-[10px] text-[#6b6b8a]">{agent.avgLatencyMs}ms avg</span>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${agent.status === 'ACTIVE' ? 'bg-green-400/10 text-green-400' : 'bg-gray-400/20 text-gray-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'ACTIVE' ? 'bg-green-400' : 'bg-gray-400'}`} />
                {agent.status.toLowerCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}