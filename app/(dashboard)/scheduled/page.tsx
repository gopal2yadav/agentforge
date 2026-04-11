'use client';
export default function ScheduledPage() {
  const tasks = [
    { id: '1', name: 'Daily Report Generation', cron: '0 9 * * *', next: 'Tomorrow at 9:00 AM UTC', agent: 'Writer Agent', status: 'active', lastRun: '8 hours ago', successRate: 100 },
    { id: '2', name: 'Swarm Health Check', cron: '*/5 * * * *', next: 'In 3 minutes', agent: 'System', status: 'active', lastRun: '2 min ago', successRate: 99.9 },
    { id: '3', name: 'Weekly Analytics Summary', cron: '0 8 * * 1', next: 'Monday at 8:00 AM UTC', agent: 'Data Analyst', status: 'active', lastRun: '5 days ago', successRate: 95.0 },
    { id: '4', name: 'Knowledge Base Sync', cron: '0 */6 * * *', next: 'In 4 hours', agent: 'System', status: 'paused', lastRun: '1 day ago', successRate: 100 },
    { id: '5', name: 'Competitor Monitoring', cron: '0 10 * * 1-5', next: 'Monday at 10:00 AM UTC', agent: 'Research Agent', status: 'active', lastRun: '1 day ago', successRate: 97.5 },
  ];
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Scheduled Tasks</h1><p className="text-sm text-gray-500">Manage cron jobs and recurring agent executions</p></div>
        <button className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ New Schedule</button>
      </div>
      <div className="space-y-3">
        {tasks.map(t => (
          <div key={t.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-200 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={'w-2 h-2 rounded-full ' + (t.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400')} />
                <div className="text-[15px] font-semibold text-gray-900">{t.name}</div>
              </div>
              <span className={'px-2.5 py-1 rounded-full text-[10px] font-semibold ' + (t.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500')}>{t.status}</span>
            </div>
            <div className="grid grid-cols-5 gap-4 text-xs">
              <div><span className="text-gray-400">Schedule</span><div className="text-gray-900 font-mono mt-0.5">{t.cron}</div></div>
              <div><span className="text-gray-400">Next Run</span><div className="text-gray-600 mt-0.5">{t.next}</div></div>
              <div><span className="text-gray-400">Agent</span><div className="text-indigo-600 mt-0.5 font-medium">{t.agent}</div></div>
              <div><span className="text-gray-400">Last Run</span><div className="text-gray-600 mt-0.5">{t.lastRun}</div></div>
              <div><span className="text-gray-400">Success</span><div className="text-emerald-600 mt-0.5 font-medium">{t.successRate}%</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}