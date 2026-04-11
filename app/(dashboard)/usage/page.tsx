'use client';
export default function UsagePage() {
  const months = [
    { month: 'Apr 2026', input: 234000, output: 189000, cost: 4.23, agents: 5, runs: 441 },
    { month: 'Mar 2026', input: 312000, output: 256000, cost: 5.68, agents: 4, runs: 580 },
    { month: 'Feb 2026', input: 198000, output: 145000, cost: 3.43, agents: 3, runs: 356 },
    { month: 'Jan 2026', input: 87000, output: 62000, cost: 1.49, agents: 2, runs: 148 },
  ];
  const providers = [
    { name: 'Anthropic', model: 'claude-sonnet-4', tokens: 623000, pct: 68, cost: 9.35 },
    { name: 'OpenAI', model: 'gpt-4o', tokens: 201000, pct: 22, cost: 3.02 },
    { name: 'OpenAI', model: 'gpt-4o-mini', tokens: 89000, pct: 10, cost: 0.09 },
  ];
  const total = months.reduce((a, m) => ({ input: a.input + m.input, output: a.output + m.output, cost: a.cost + m.cost, runs: a.runs + m.runs }), { input: 0, output: 0, cost: 0, runs: 0 });
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Token Usage & Costs</h1><p className="text-sm text-gray-500">Detailed breakdown of token consumption and costs by month and provider</p></div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Total Input</div><div className="text-xl font-bold text-gray-900 mt-1">{(total.input / 1000).toFixed(0)}K</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Total Output</div><div className="text-xl font-bold text-gray-900 mt-1">{(total.output / 1000).toFixed(0)}K</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Total Cost</div><div className="text-xl font-bold text-indigo-600 mt-1">{'$'}{total.cost.toFixed(2)}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Total Runs</div><div className="text-xl font-bold text-gray-900 mt-1">{total.runs.toLocaleString()}</div></div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Monthly Breakdown</h3></div>
          <table className="w-full text-xs"><thead><tr className="border-b border-gray-100"><th className="px-4 py-2 text-left text-gray-400 font-semibold">Month</th><th className="px-4 py-2 text-right text-gray-400 font-semibold">Input</th><th className="px-4 py-2 text-right text-gray-400 font-semibold">Output</th><th className="px-4 py-2 text-right text-gray-400 font-semibold">Cost</th><th className="px-4 py-2 text-right text-gray-400 font-semibold">Runs</th></tr></thead>
            <tbody>{months.map(m => (<tr key={m.month} className="border-b border-gray-50 hover:bg-gray-50"><td className="px-4 py-2.5 font-medium text-gray-900">{m.month}</td><td className="px-4 py-2.5 text-right font-mono text-gray-600">{(m.input/1000).toFixed(0)}K</td><td className="px-4 py-2.5 text-right font-mono text-gray-600">{(m.output/1000).toFixed(0)}K</td><td className="px-4 py-2.5 text-right font-mono text-gray-700">{'$'}{m.cost.toFixed(2)}</td><td className="px-4 py-2.5 text-right font-mono text-gray-600">{m.runs}</td></tr>))}</tbody>
          </table>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">By Provider & Model</h3></div>
          <div className="p-4 space-y-4">
            {providers.map(p => (
              <div key={p.model}>
                <div className="flex items-center justify-between mb-1"><div className="text-xs font-medium text-gray-900">{p.name} <span className="text-gray-400 font-mono">({p.model})</span></div><div className="text-xs text-gray-500">{'$'}{p.cost.toFixed(2)}</div></div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 rounded-full" style={{width: p.pct + '%'}} /></div>
                <div className="text-[10px] text-gray-400 mt-0.5">{(p.tokens/1000).toFixed(0)}K tokens ({p.pct}%)</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}