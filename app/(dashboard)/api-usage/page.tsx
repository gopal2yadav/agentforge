'use client';
export default function ApiUsagePage() {
  const keys = [
    { id: 'nxs_prod_1a2b3c', name: 'Production Key', created: 'Jan 15, 2026', lastUsed: '2 min ago', requests: 12480, status: 'active' },
    { id: 'nxs_test_4d5e6f', name: 'Test Environment', created: 'Feb 3, 2026', lastUsed: '1 hour ago', requests: 3200, status: 'active' },
    { id: 'nxs_ci_7g8h9i', name: 'CI/CD Pipeline', created: 'Mar 10, 2026', lastUsed: '30 min ago', requests: 890, status: 'active' },
  ];
  const endpoints = [
    { path: '/api/agents/run', calls: 8420, avgLatency: 1850, errors: 12, pct: 52 },
    { path: '/api/agents', calls: 3200, avgLatency: 120, errors: 0, pct: 20 },
    { path: '/api/flows', calls: 1890, avgLatency: 95, errors: 2, pct: 12 },
    { path: '/api/notifications', calls: 1240, avgLatency: 45, errors: 0, pct: 8 },
    { path: '/api/swarm', calls: 980, avgLatency: 35, errors: 0, pct: 6 },
    { path: '/api/health', calls: 340, avgLatency: 12, errors: 0, pct: 2 },
  ];
  const totalCalls = endpoints.reduce((a, e) => a + e.calls, 0);
  const totalErrors = endpoints.reduce((a, e) => a + e.errors, 0);
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">API Usage</h1><p className="text-sm text-gray-500">Monitor API key usage and endpoint performance</p></div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Total Calls (30d)</div><div className="text-xl font-bold text-gray-900 mt-1">{totalCalls.toLocaleString()}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Active Keys</div><div className="text-xl font-bold text-indigo-600 mt-1">{keys.length}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Error Rate</div><div className="text-xl font-bold text-emerald-600 mt-1">{((totalErrors / totalCalls) * 100).toFixed(2)}%</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Avg Latency</div><div className="text-xl font-bold text-gray-900 mt-1">345ms</div></div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">API Keys</h3></div>
          {keys.map(k => (
            <div key={k.id} className="px-5 py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center justify-between mb-1"><span className="text-sm font-medium text-gray-900">{k.name}</span><span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-50 text-emerald-600">{k.status}</span></div>
              <div className="flex items-center gap-4 text-[10px] text-gray-400"><span className="font-mono">{k.id.substring(0, 12)}...</span><span>{k.requests.toLocaleString()} reqs</span><span>Last: {k.lastUsed}</span></div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Endpoint Breakdown</h3></div>
          {endpoints.map(e => (
            <div key={e.path} className="px-5 py-2.5 border-b border-gray-100 last:border-0">
              <div className="flex items-center justify-between mb-1"><span className="text-xs font-mono text-gray-700">{e.path}</span><span className="text-[10px] text-gray-400">{e.calls.toLocaleString()} calls</span></div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 rounded-full" style={{width: e.pct + '%'}} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}