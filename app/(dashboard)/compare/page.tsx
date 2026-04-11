'use client';
export default function ComparePage() {
  const agents = [
    { name: 'Research Agent', model: 'claude-sonnet-4', runs: 142, success: 97.2, avgTokens: 3200, avgLatency: 1850, cost30d: 4.56, topTask: 'Market research' },
    { name: 'Writer Agent', model: 'claude-sonnet-4', runs: 98, success: 95.9, avgTokens: 5100, avgLatency: 2400, cost30d: 5.02, topTask: 'Content creation' },
    { name: 'Code Reviewer', model: 'claude-sonnet-4', runs: 89, success: 95.5, avgTokens: 2800, avgLatency: 2100, cost30d: 2.49, topTask: 'PR reviews' },
    { name: 'Data Analyst', model: 'gpt-4o', runs: 67, success: 91.0, avgTokens: 3400, avgLatency: 3200, cost30d: 3.35, topTask: 'CSV analysis' },
    { name: 'Coordinator', model: 'claude-sonnet-4', runs: 45, success: 100, avgTokens: 1800, avgLatency: 1200, cost30d: 0.81, topTask: 'Task delegation' },
  ];
  const best = (field, dir) => { const vals = agents.map(a => a[field]); return dir === 'max' ? Math.max(...vals) : Math.min(...vals); };
  const isBest = (a, field, dir) => a[field] === best(field, dir);
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Agent Comparison</h1><p className="text-sm text-gray-500">Compare performance metrics across all agents</p></div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100">
            <th className="px-5 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Agent</th>
            <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Model</th>
            <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Runs</th>
            <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Success</th>
            <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Avg Tokens</th>
            <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Avg Latency</th>
            <th className="px-4 py-3 text-right text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Cost (30d)</th>
            <th className="px-4 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Top Task</th>
          </tr></thead>
          <tbody>
            {agents.map(a => (
              <tr key={a.name} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold">{a.name.charAt(0)}</div><span className="font-medium text-gray-900">{a.name}</span></div></td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{a.model}</td>
                <td className={'px-4 py-3 text-right font-mono ' + (isBest(a, 'runs', 'max') ? 'text-indigo-600 font-semibold' : 'text-gray-700')}>{a.runs}</td>
                <td className={'px-4 py-3 text-right font-mono ' + (isBest(a, 'success', 'max') ? 'text-emerald-600 font-semibold' : 'text-gray-700')}>{a.success}%</td>
                <td className={'px-4 py-3 text-right font-mono ' + (isBest(a, 'avgTokens', 'min') ? 'text-indigo-600 font-semibold' : 'text-gray-700')}>{a.avgTokens.toLocaleString()}</td>
                <td className={'px-4 py-3 text-right font-mono ' + (isBest(a, 'avgLatency', 'min') ? 'text-emerald-600 font-semibold' : 'text-gray-700')}>{(a.avgLatency/1000).toFixed(1)}s</td>
                <td className={'px-4 py-3 text-right font-mono ' + (isBest(a, 'cost30d', 'min') ? 'text-emerald-600 font-semibold' : 'text-gray-700')}>{'$'}{a.cost30d.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{a.topTask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-[10px] text-gray-400 text-center">Best values per column are highlighted. Lower is better for tokens, latency, and cost.</div>
    </div>
  );
}