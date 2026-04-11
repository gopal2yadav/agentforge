'use client';
export default function PipelinePage() {
  const pipelines = [
    { id: 'p1', name: 'Knowledge Ingestion', source: 'Google Drive', dest: 'Vector Store', schedule: 'Every 6 hours', lastRun: '2 hours ago', status: 'active', docs: 312, chunks: 4820 },
    { id: 'p2', name: 'CRM Sync', source: 'Salesforce', dest: 'Agent Memory', schedule: 'Every 15 min', lastRun: '3 min ago', status: 'active', docs: 1240, chunks: 8900 },
    { id: 'p3', name: 'Ticket Import', source: 'Jira', dest: 'Agent Context', schedule: 'Hourly', lastRun: '45 min ago', status: 'active', docs: 89, chunks: 560 },
    { id: 'p4', name: 'Email Archive', source: 'Gmail', dest: 'Knowledge Base', schedule: 'Daily at 2 AM', lastRun: '10 hours ago', status: 'paused', docs: 2100, chunks: 15400 },
  ];
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Data Pipelines</h1><p className="text-sm text-gray-500">ETL pipelines that feed data to your agents</p></div>
        <button className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ New Pipeline</button>
      </div>
      <div className="space-y-3">
        {pipelines.map(p => (
          <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={'w-2 h-2 rounded-full ' + (p.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400')} />
                <div className="text-[15px] font-semibold text-gray-900">{p.name}</div>
              </div>
              <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + (p.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{p.status}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">{p.source}</span>
              <span className="text-gray-300">\u2192</span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-600 border border-purple-100">{p.dest}</span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-xs">
              <div><span className="text-gray-400">Schedule</span><div className="text-gray-700 mt-0.5 font-medium">{p.schedule}</div></div>
              <div><span className="text-gray-400">Last Run</span><div className="text-gray-600 mt-0.5">{p.lastRun}</div></div>
              <div><span className="text-gray-400">Documents</span><div className="text-gray-900 mt-0.5 font-mono">{p.docs.toLocaleString()}</div></div>
              <div><span className="text-gray-400">Chunks</span><div className="text-gray-900 mt-0.5 font-mono">{p.chunks.toLocaleString()}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}