'use client';

const DAILY_DATA = [
  { day: 'Mon', tokens: 12400, calls: 342, cost: 0.062 },
  { day: 'Tue', tokens: 18200, calls: 510, cost: 0.091 },
  { day: 'Wed', tokens: 9800, calls: 275, cost: 0.049 },
  { day: 'Thu', tokens: 22100, calls: 620, cost: 0.111 },
  { day: 'Fri', tokens: 15600, calls: 440, cost: 0.078 },
  { day: 'Sat', tokens: 8200, calls: 230, cost: 0.041 },
  { day: 'Sun', tokens: 5900, calls: 165, cost: 0.030 },
];

const AGENTS_USAGE = [
  { name: 'Research Agent', tokens: 156000, pct: 34, runs: 142 },
  { name: 'Writer Agent', tokens: 112000, pct: 24, runs: 98 },
  { name: 'Code Reviewer', tokens: 98000, pct: 21, runs: 89 },
  { name: 'Data Analyst', tokens: 67000, pct: 15, runs: 67 },
  { name: 'Coordinator', tokens: 23000, pct: 5, runs: 45 },
];

export default function AnalyticsPage() {
  const maxTokens = Math.max(...DAILY_DATA.map(d => d.tokens));
  const totalTokens = DAILY_DATA.reduce((a, d) => a + d.tokens, 0);
  const totalCalls = DAILY_DATA.reduce((a, d) => a + d.calls, 0);
  const totalCost = DAILY_DATA.reduce((a, d) => a + d.cost, 0);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Usage Analytics</h1>
        <p className="text-sm text-gray-500">Token consumption, API calls, and cost breakdown</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="text-[11px] text-gray-400 uppercase tracking-wider">This Week</div>
          <div className="text-xl font-bold text-gray-900 mt-1">{(totalTokens/1000).toFixed(1)}K</div>
          <div className="text-[10px] text-emerald-600 mt-0.5">tokens used</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="text-[11px] text-gray-400 uppercase tracking-wider">API Calls</div>
          <div className="text-xl font-bold text-indigo-600 mt-1">{totalCalls.toLocaleString()}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">this week</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="text-[11px] text-gray-400 uppercase tracking-wider">Est. Cost</div>
          <div className="text-xl font-bold text-gray-900 mt-1">$\u200B{totalCost.toFixed(2)}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">this week</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <div className="text-[11px] text-gray-400 uppercase tracking-wider">Avg / Day</div>
          <div className="text-xl font-bold text-gray-900 mt-1">{Math.round(totalTokens / 7).toLocaleString()}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">tokens</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Daily Token Usage</h3>
        <div className="flex items-end gap-3 h-40">
          {DAILY_DATA.map(d => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="text-[10px] text-gray-400">{(d.tokens/1000).toFixed(1)}K</div>
              <div className="w-full bg-indigo-100 rounded-t-lg relative" style={{ height: Math.round((d.tokens / maxTokens) * 120) + 'px' }}>
                <div className="absolute inset-0 bg-indigo-500 rounded-t-lg opacity-80" />
              </div>
              <div className="text-[11px] text-gray-500 font-medium">{d.day}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Usage by Agent</h3>
        <div className="space-y-3">
          {AGENTS_USAGE.map(a => (
            <div key={a.name} className="flex items-center gap-4">
              <div className="w-28 text-sm font-medium text-gray-900 truncate">{a.name}</div>
              <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: a.pct + '%' }} />
              </div>
              <div className="text-xs text-gray-500 w-20 text-right">{(a.tokens/1000).toFixed(0)}K tok</div>
              <div className="text-xs text-gray-400 w-16 text-right">{a.runs} runs</div>
              <div className="text-xs text-gray-400 w-10 text-right">{a.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}