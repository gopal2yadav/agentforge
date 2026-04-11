'use client';
export default function RateLimitsPage() {
  const limits = [
    { endpoint: '/api/agents', method: 'GET', limit: 1000, used: 342, period: 'per hour', status: 'ok' },
    { endpoint: '/api/agents/run', method: 'POST', limit: 500, used: 127, period: 'per hour', status: 'ok' },
    { endpoint: '/api/flows', method: 'GET', limit: 1000, used: 89, period: 'per hour', status: 'ok' },
    { endpoint: '/api/flows', method: 'POST', limit: 200, used: 15, period: 'per hour', status: 'ok' },
    { endpoint: '/api/agents/run', method: 'POST (batch)', limit: 50, used: 42, period: 'per hour', status: 'warning' },
    { endpoint: '/api/webhooks', method: 'POST', limit: 100, used: 8, period: 'per hour', status: 'ok' },
  ];
  const pct = (used, limit) => Math.round((used / limit) * 100);
  const barColor = (used, limit) => { const p = pct(used, limit); return p > 80 ? 'bg-red-500' : p > 60 ? 'bg-amber-500' : 'bg-indigo-500'; };
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Rate Limits</h1><p className="text-sm text-gray-500">Monitor API usage against rate limits</p></div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Plan Limit</div><div className="text-xl font-bold text-gray-900 mt-1">5,000</div><div className="text-[10px] text-gray-400">calls/day</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Used Today</div><div className="text-xl font-bold text-indigo-600 mt-1">1,247</div><div className="text-[10px] text-gray-400">24.9% of limit</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Throttled</div><div className="text-xl font-bold text-emerald-600 mt-1">0</div><div className="text-[10px] text-gray-400">requests blocked</div></div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 grid grid-cols-6 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
          <span>Endpoint</span><span>Method</span><span>Limit</span><span>Used</span><span>Usage</span><span>Status</span>
        </div>
        {limits.map((l, i) => (
          <div key={i} className="px-5 py-3.5 border-b border-gray-100 last:border-0 grid grid-cols-6 items-center text-sm">
            <span className="font-mono text-xs text-gray-700">{l.endpoint}</span>
            <span className="text-xs text-gray-500">{l.method}</span>
            <span className="text-xs text-gray-500">{l.limit.toLocaleString()} {l.period}</span>
            <span className="text-xs font-mono text-gray-900">{l.used}</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className={barColor(l.used, l.limit) + ' h-full rounded-full'} style={{width: pct(l.used, l.limit) + '%'}} /></div>
              <span className="text-[10px] text-gray-400 w-8">{pct(l.used, l.limit)}%</span>
            </div>
            <span className={'px-2 py-0.5 rounded-full text-[9px] font-semibold w-fit ' + (l.status === 'ok' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600')}>{l.status === 'ok' ? 'healthy' : 'warning'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}