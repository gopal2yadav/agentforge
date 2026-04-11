'use client';
export default function VersioningPage() {
  const versions = [
    { id: 'v5', agent: 'Research Agent', version: '1.4.0', author: 'Gopal Yadav', changes: 'Updated system prompt for deeper analysis, added web_search tool', time: '2 hours ago', status: 'active' },
    { id: 'v4', agent: 'Research Agent', version: '1.3.0', author: 'Gopal Yadav', changes: 'Switched model from gpt-4o to claude-sonnet-4', time: '2 days ago', status: 'previous' },
    { id: 'v3', agent: 'Code Reviewer', version: '2.1.0', author: 'API Service', changes: 'Added linter tool, increased max_tokens to 8192', time: '3 days ago', status: 'active' },
    { id: 'v2', agent: 'Writer Agent', version: '1.0.1', author: 'Gopal Yadav', changes: 'Fixed prompt injection vulnerability in backstory field', time: '5 days ago', status: 'active' },
    { id: 'v1', agent: 'Research Agent', version: '1.2.0', author: 'Gopal Yadav', changes: 'Initial agent configuration with summarizer tool', time: '1 week ago', status: 'previous' },
  ];
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Agent Versions</h1><p className="text-sm text-gray-500">Track configuration changes across all agents</p></div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {versions.map((v, i) => (
          <div key={v.id} className={'px-5 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors' + (i < versions.length - 1 ? ' border-b border-gray-100' : '')}>
            <div className="flex flex-col items-center shrink-0 mt-1">
              <div className={'w-3 h-3 rounded-full border-2 ' + (v.status === 'active' ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300 bg-white')} />
              {i < versions.length - 1 && <div className="w-0.5 h-8 bg-gray-200 mt-1" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-900">{v.agent}</span>
                <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{v.version}</span>
                {v.status === 'active' && <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">CURRENT</span>}
              </div>
              <div className="text-xs text-gray-600 mb-1">{v.changes}</div>
              <div className="text-[10px] text-gray-400">{v.author} &bull; {v.time}</div>
            </div>
            <div className="flex gap-2 shrink-0">
              {v.status === 'previous' && <button className="text-[10px] text-indigo-600 hover:text-indigo-800 font-medium">Rollback</button>}
              <button className="text-[10px] text-gray-400 hover:text-gray-600">Diff</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}