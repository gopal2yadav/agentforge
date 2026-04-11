'use client';

interface DashboardProps {
  user: { name: string; plan: string; tokensUsed: number; tokensLimit: number };
  stats: { agents: number; flows: number; executions: number; tokensToday: number };
  recentExecutions: Array<{ id: string; agentName: string; status: string; tokensUsed: number; latencyMs: number; startedAt: string }>;
}

export function DashboardClient({ user, stats, recentExecutions }: DashboardProps) {
  const statusColor = (s: string) => {
    if (s === 'COMPLETED') return 'text-emerald-600 bg-emerald-50';
    if (s === 'RUNNING') return 'text-blue-600 bg-blue-50';
    if (s === 'FAILED') return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };
  const tokenPct = Math.round((user.tokensUsed / user.tokensLimit) * 100);

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Welcome back, {user.name}</h1>
        <p className="text-sm text-gray-500 mt-1">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 uppercase tracking-wider">{user.plan}</span>
          <span className="ml-2">{tokenPct}% token usage</span>
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Active Agents', value: stats.agents, color: 'text-indigo-600' },
          { label: 'Flows', value: stats.flows, color: 'text-emerald-600' },
          { label: 'Executions', value: stats.executions, color: 'text-amber-600' },
          { label: 'Tokens Today', value: stats.tokensToday.toLocaleString(), color: 'text-pink-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">{stat.label}</div>
            <div className={"text-2xl font-bold mt-1 " + stat.color}>{stat.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400">Token Usage</span>
          <span className="text-xs text-gray-400">{user.tokensUsed.toLocaleString()} / {user.tokensLimit.toLocaleString()}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all" style={{ width: tokenPct + '%' }} />
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Recent Executions</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentExecutions.map((exec) => (
            <div key={exec.id} className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">{exec.agentName.charAt(0)}</div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{exec.agentName}</div>
                  <div className="text-[11px] text-gray-400">{exec.tokensUsed.toLocaleString()} tokens</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] text-gray-400">{exec.latencyMs}ms</span>
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