'use client';

export default function MonitoringPage() {
  const logs = [
    { id: '1', time: '07:41:35', level: 'info', source: 'agent.research', message: 'Execution completed successfully', tokens: 3200, latency: 1850 },
    { id: '2', time: '07:40:19', level: 'info', source: 'api.swarm', message: 'Health check passed', tokens: 0, latency: 45 },
    { id: '3', time: '07:38:59', level: 'warn', source: 'agent.reviewer', message: 'Rate limit approaching (80% used)', tokens: 0, latency: 0 },
    { id: '4', time: '07:34:38', level: 'info', source: 'flow.content', message: 'Flow pipeline completed 4/4 nodes', tokens: 8400, latency: 4200 },
    { id: '5', time: '07:33:51', level: 'error', source: 'agent.analyst', message: 'Connection timeout after 30s', tokens: 450, latency: 30000 },
    { id: '6', time: '07:30:50', level: 'info', source: 'api.swarm', message: 'Health check passed', tokens: 0, latency: 38 },
    { id: '7', time: '07:28:12', level: 'info', source: 'memory.write', message: 'Memory updated: research scope (importance: 0.92)', tokens: 120, latency: 85 },
    { id: '8', time: '07:25:44', level: 'info', source: 'agent.research', message: 'Execution started with prompt: "Analyze Q1 trends"', tokens: 0, latency: 0 },
  ];

  const levelColor = (l) => {
    if (l === 'error') return 'text-red-400 bg-red-400/10';
    if (l === 'warn') return 'text-amber-400 bg-amber-400/10';
    return 'text-green-400 bg-green-400/10';
  };

  const metrics = [
    { label: 'Uptime', value: '99.97%', sub: 'Last 30 days' },
    { label: 'Avg Latency', value: '1.85s', sub: 'P50 response time' },
    { label: 'Error Rate', value: '0.3%', sub: '2 errors / 687 requests' },
    { label: 'Active Agents', value: '7', sub: 'of 25 provisioned' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Monitoring</h1>
        <p className="text-sm text-[#6b6b8a]">Real-time observability and system health</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {metrics.map((m) => (
          <div key={m.label} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
            <div className="text-[11px] text-[#6b6b8a] font-semibold uppercase tracking-wider">{m.label}</div>
            <div className="text-2xl font-bold mt-1 text-white">{m.value}</div>
            <div className="text-[10px] text-[#4a4a5a] mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl">
        <div className="px-5 py-3 border-b border-[#2a2a3d] flex items-center justify-between">
          <h2 className="text-sm font-semibold">Activity Log</h2>
          <span className="text-[10px] text-[#6b6b8a]">Last 24 hours</span>
        </div>
        <div className="divide-y divide-[#2a2a3d]">
          {logs.map((log) => (
            <div key={log.id} className="px-5 py-3 flex items-center gap-4 text-sm hover:bg-[#14141f]/60 transition-colors">
              <span className="text-[11px] text-[#4a4a5a] font-mono w-16 shrink-0">{log.time}</span>
              <span className={"px-1.5 py-0.5 rounded text-[9px] font-bold uppercase w-12 text-center shrink-0 " + levelColor(log.level)}>{log.level}</span>
              <span className="text-[11px] text-[#6366f1] font-mono w-28 shrink-0 truncate">{log.source}</span>
              <span className="text-[#a0a0b8] truncate flex-1">{log.message}</span>
              {log.tokens > 0 && <span className="text-[10px] text-[#6b6b8a] shrink-0">{log.tokens.toLocaleString()} tok</span>}
              {log.latency > 0 && <span className="text-[10px] text-[#4a4a5a] shrink-0">{log.latency}ms</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}