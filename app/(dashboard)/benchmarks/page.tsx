'use client';
export default function BenchmarksPage() {
  const tests = [
    { name: 'Research Query', agent: 'Research Agent', model: 'claude-sonnet-4', p50: 1850, p95: 3200, p99: 4800, tokensAvg: 3200, successRate: 97.2, costPer1k: 0.048 },
    { name: 'Code Review', agent: 'Code Reviewer', model: 'claude-sonnet-4', p50: 2100, p95: 3800, p99: 5200, tokensAvg: 2800, successRate: 95.5, costPer1k: 0.042 },
    { name: 'Content Draft', agent: 'Writer Agent', model: 'claude-sonnet-4', p50: 2400, p95: 4100, p99: 6000, tokensAvg: 5100, successRate: 95.9, costPer1k: 0.077 },
    { name: 'Data Processing', agent: 'Data Analyst', model: 'gpt-4o', p50: 3200, p95: 8500, p99: 15000, tokensAvg: 3400, successRate: 91.0, costPer1k: 0.034 },
    { name: 'Task Coordination', agent: 'Coordinator', model: 'claude-sonnet-4', p50: 1200, p95: 2000, p99: 3000, tokensAvg: 1800, successRate: 100, costPer1k: 0.027 },
  ];
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Performance Benchmarks</h1><p className="text-sm text-gray-500">Latency percentiles, token usage, and cost efficiency across agents</p></div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100">
            <th className="px-5 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Test</th>
            <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Agent</th>
            <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">P50</th>
            <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">P95</th>
            <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">P99</th>
            <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Avg Tokens</th>
            <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Success</th>
            <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Cost/1K</th>
          </tr></thead>
          <tbody>
            {tests.map(t => (
              <tr key={t.name} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-medium text-gray-900">{t.name}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{t.agent}</td>
                <td className="px-4 py-3 text-right font-mono text-gray-700">{(t.p50/1000).toFixed(1)}s</td>
                <td className="px-4 py-3 text-right font-mono text-gray-500">{(t.p95/1000).toFixed(1)}s</td>
                <td className="px-4 py-3 text-right font-mono text-gray-400">{(t.p99/1000).toFixed(1)}s</td>
                <td className="px-4 py-3 text-right font-mono text-gray-700">{t.tokensAvg.toLocaleString()}</td>
                <td className={'px-4 py-3 text-right font-mono ' + (t.successRate >= 97 ? 'text-emerald-600' : t.successRate >= 95 ? 'text-amber-600' : 'text-red-600')}>{t.successRate}%</td>
                <td className="px-4 py-3 text-right font-mono text-gray-700">{'$'}{t.costPer1k.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Overall P50</div><div className="text-xl font-bold text-indigo-600 mt-1">2.2s</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Avg Success Rate</div><div className="text-xl font-bold text-emerald-600 mt-1">95.9%</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Avg Cost/1K Runs</div><div className="text-xl font-bold text-gray-900 mt-1">{'$'}0.046</div></div>
      </div>
    </div>
  );
}