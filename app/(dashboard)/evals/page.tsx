'use client';
export default function EvalsPage() {
  const evals = [
    { id: 'e1', name: 'Factual Accuracy', agent: 'Research Agent', score: 92, samples: 50, trend: '+3%', status: 'passing' },
    { id: 'e2', name: 'Response Relevance', agent: 'Research Agent', score: 88, samples: 50, trend: '+1%', status: 'passing' },
    { id: 'e3', name: 'Code Quality', agent: 'Code Reviewer', score: 95, samples: 30, trend: '+5%', status: 'passing' },
    { id: 'e4', name: 'Writing Quality', agent: 'Writer Agent', score: 85, samples: 40, trend: '-2%', status: 'passing' },
    { id: 'e5', name: 'Data Accuracy', agent: 'Data Analyst', score: 78, samples: 25, trend: '-4%', status: 'warning' },
    { id: 'e6', name: 'Task Completion', agent: 'Coordinator', score: 96, samples: 20, trend: '0%', status: 'passing' },
  ];
  const avgScore = Math.round(evals.reduce((a, e) => a + e.score, 0) / evals.length);
  const barColor = (s) => s >= 90 ? 'bg-emerald-500' : s >= 80 ? 'bg-indigo-500' : s >= 70 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Evaluations</h1><p className="text-sm text-gray-500">Automated quality scoring for agent outputs</p></div>
        <button className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">Run Evals</button>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-indigo-600 rounded-xl p-5 text-white shadow-lg"><div className="text-xs uppercase tracking-wider opacity-70">Overall Score</div><div className="text-3xl font-bold mt-1">{avgScore}%</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Evals Run</div><div className="text-xl font-bold text-gray-900 mt-1">{evals.length}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Total Samples</div><div className="text-xl font-bold text-gray-900 mt-1">{evals.reduce((a, e) => a + e.samples, 0)}</div></div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {evals.map((e, i) => (
          <div key={e.id} className={'px-5 py-4 flex items-center gap-4' + (i < evals.length - 1 ? ' border-b border-gray-100' : '') + ' hover:bg-gray-50 transition-colors'}>
            <div className="w-40"><div className="text-sm font-medium text-gray-900">{e.name}</div><div className="text-[10px] text-gray-400 mt-0.5">{e.agent} &bull; {e.samples} samples</div></div>
            <div className="flex-1 flex items-center gap-3">
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden"><div className={barColor(e.score) + ' h-full rounded-full'} style={{width: e.score + '%'}} /></div>
              <span className="text-sm font-bold text-gray-900 w-12 text-right">{e.score}%</span>
            </div>
            <span className={'text-xs font-mono ' + (e.trend.startsWith('+') ? 'text-emerald-600' : e.trend.startsWith('-') ? 'text-red-600' : 'text-gray-400')}>{e.trend}</span>
            <span className={'px-2 py-0.5 rounded-full text-[9px] font-semibold ' + (e.status === 'passing' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600')}>{e.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}