'use client';

interface DashboardProps {
  user: { name: string; plan: string; tokensUsed: number; tokensLimit: number };
  stats: { agents: number; flows: number; executions: number; tokensToday: number };
  recentExecutions: Array<{ id: string; agentName: string; status: string; tokensUsed: number; latencyMs: number; startedAt: string }>;
}

export function DashboardClient({ user, stats, recentExecutions }: DashboardProps) {
  const statusColor = (s: string) => {
    if (s === 'COMPLETED') return 'text-green-400 bg-green-400/10';
    if (s === 'RUNNING') return 'text-blue-400 bg-blue-400/10';
    if (s === 'FAILED') return 'text-red-400 bg-red-400/10';
    return 'text-gray-400 bg-gray-400/10';
  };

  const tokenPct = Math.round((user.tokensUsed / user.tokensLimit) * 100);

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}</h1>
          <p className="text-sm text-[#6b6b8a] mt-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#6366f1]/15 text-[#818cf8] uppercase tracking-wider">{user.plan}</span>
            <span className="ml-2">{tokenPct}% token usage</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Active Agents', value: stats.agents, color: '#6366f1' },
          { label: 'Flows', value: stats.flows, color: '#22c55e' },
          { label: 'Executions', value: stats.executions, color: '#f59e0b' },
          { label: 'Tokens Today', value: stats.tokensToday.toLocaleString(), color: '#ec4899' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
            <div className="text-[11px] text-[#6b6b8a] font-semibold uppercase tracking-wider">{stat.label}</div>
            <div className="text-2xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-[#6b6b8a]">Token Usage</span>
          <span className="text-xs text-[#6b6b8a]">{user.tokensUsed.toLocaleString()} / {user.tokensLimit.toLocaleString()}</span>
        </div>
        <div className="h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#6366f1] to-[#818cf8] rounded-full transition-all" style={{ width: tokenPct + '%' }} />
        </div>
      </div>

      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl">
        <div className="px-5 py-4 border-b border-[#2a2a3d]">
          <h2 className="text-sm font-semibold">Recent Executions</h2>
        </div>
        <div className="divide-y divide-[#2a2a3d]">
          {recentExecutions.map((exec) => (
            <div key={exec.id} className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1] text-xs font-bold">{exec.agentName.charAt(0)}</div>
                <div>
                  <div className="text-sm font-medium">{exec.agentName}</div>
                  <div className="text-[11px] text-[#6b6b8a]">{exec.tokensUsed.toLocaleString()} tokens</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] text-[#6b6b8a]">{exec.latencyMs}ms</span>
                <span className={'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ' + statusColor(exec.status)}>
                  {exec.status.toLowerCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}