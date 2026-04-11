'use client';
export default function ErrorsPage() {
  const errors = [
    { id: 'err_001', agent: 'Data Analyst', type: 'ConnectionTimeout', msg: 'OpenAI API unreachable after 30s', count: 3, firstSeen: '3 hours ago', lastSeen: '1 hour ago', status: 'active' },
    { id: 'err_002', agent: 'Research Agent', type: 'RateLimitExceeded', msg: 'Anthropic rate limit: 429 Too Many Requests', count: 1, firstSeen: '6 hours ago', lastSeen: '6 hours ago', status: 'resolved' },
    { id: 'err_003', agent: 'Writer Agent', type: 'TokenLimitExceeded', msg: 'Response exceeded max_tokens (8192)', count: 2, firstSeen: '1 day ago', lastSeen: '12 hours ago', status: 'resolved' },
    { id: 'err_004', agent: 'Coordinator', type: 'ToolExecutionFailed', msg: 'slack_notifier: channel not found (C_INVALID)', count: 1, firstSeen: '2 days ago', lastSeen: '2 days ago', status: 'resolved' },
  ];
  const active = errors.filter(e => e.status === 'active').length;
  const total = errors.reduce((a, e) => a + e.count, 0);
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Error Tracking</h1><p className="text-sm text-gray-500">Monitor and resolve agent execution errors</p></div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Active Errors</div><div className={'text-xl font-bold mt-1 ' + (active > 0 ? 'text-red-600' : 'text-emerald-600')}>{active}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Total Occurrences</div><div className="text-xl font-bold text-gray-900 mt-1">{total}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Resolved</div><div className="text-xl font-bold text-emerald-600 mt-1">{errors.filter(e => e.status === 'resolved').length}</div></div>
      </div>
      <div className="space-y-3">
        {errors.map(e => (
          <div key={e.id} className={'bg-white border rounded-xl p-5 shadow-sm ' + (e.status === 'active' ? 'border-red-200' : 'border-gray-200')}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={'w-2 h-2 rounded-full ' + (e.status === 'active' ? 'bg-red-500 animate-pulse' : 'bg-gray-300')} />
                <span className="text-sm font-semibold text-gray-900">{e.type}</span>
                <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{e.id}</span>
              </div>
              <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + (e.status === 'active' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600')}>{e.status}</span>
            </div>
            <div className="text-xs text-gray-600 font-mono bg-gray-50 rounded-lg px-3 py-2 mb-2 border border-gray-100">{e.msg}</div>
            <div className="flex items-center gap-6 text-[11px] text-gray-400">
              <span>Agent: <span className="text-indigo-600 font-medium">{e.agent}</span></span>
              <span>Occurrences: <span className="text-gray-600">{e.count}</span></span>
              <span>First: {e.firstSeen}</span>
              <span>Last: {e.lastSeen}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}