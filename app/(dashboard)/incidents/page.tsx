'use client';
export default function IncidentsPage() {
  const incidents = [
    { id: 'INC-001', title: 'OpenAI API Outage', severity: 'major', status: 'resolved', started: 'Apr 10, 2:15 PM', resolved: 'Apr 10, 3:45 PM', duration: '1h 30m', affected: ['Data Analyst', 'Writer Agent'], root: 'OpenAI regional outage in us-east-1' },
    { id: 'INC-002', title: 'Elevated Error Rate', severity: 'minor', status: 'resolved', started: 'Apr 8, 10:00 AM', resolved: 'Apr 8, 10:30 AM', duration: '30m', affected: ['Research Agent'], root: 'Rate limit exceeded due to traffic spike' },
    { id: 'INC-003', title: 'Knowledge Base Sync Failure', severity: 'minor', status: 'resolved', started: 'Apr 5, 6:00 AM', resolved: 'Apr 5, 7:15 AM', duration: '1h 15m', affected: ['All agents'], root: 'Google Drive OAuth token expired' },
  ];
  const sevColor = (s) => s === 'major' ? 'bg-red-50 text-red-600' : s === 'minor' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600';
  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Incident History</h1><p className="text-sm text-gray-500">Past incidents, root cause analysis, and resolution timeline</p></div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4"><div className="text-[11px] text-emerald-700 uppercase tracking-wider">Current Status</div><div className="text-lg font-bold text-emerald-700 mt-1">All Systems Operational</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Incidents (30d)</div><div className="text-xl font-bold text-gray-900 mt-1">{incidents.length}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="text-[11px] text-gray-400 uppercase tracking-wider">Avg Resolution</div><div className="text-xl font-bold text-gray-900 mt-1">1h 5m</div></div>
      </div>
      <div className="space-y-4">
        {incidents.map(inc => (
          <div key={inc.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-gray-400">{inc.id}</span>
                <span className="text-sm font-semibold text-gray-900">{inc.title}</span>
                <span className={'px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase ' + sevColor(inc.severity)}>{inc.severity}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">resolved</span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-xs mb-3">
              <div><span className="text-gray-400">Started</span><div className="text-gray-700 mt-0.5">{inc.started}</div></div>
              <div><span className="text-gray-400">Resolved</span><div className="text-gray-700 mt-0.5">{inc.resolved}</div></div>
              <div><span className="text-gray-400">Duration</span><div className="text-gray-900 font-semibold mt-0.5">{inc.duration}</div></div>
              <div><span className="text-gray-400">Affected</span><div className="text-indigo-600 mt-0.5">{inc.affected.join(', ')}</div></div>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100"><span className="text-[10px] text-gray-400 uppercase tracking-wider">Root Cause:</span><div className="text-xs text-gray-600 mt-0.5 font-mono">{inc.root}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}