'use client';

const DEPLOYMENTS = [
  { id: 'dpl_1', project: 'Lead Research Pipeline', version: 'v1.4.2', status: 'active', env: 'production', deployedAt: '2026-04-11 06:30:00', runtime: '4h 11m', requests: 142, errors: 0 },
  { id: 'dpl_2', project: 'Content Generation Crew', version: 'v2.1.0', status: 'active', env: 'production', deployedAt: '2026-04-10 14:22:00', runtime: '20h 19m', requests: 89, errors: 2 },
  { id: 'dpl_3', project: 'Support Ticket Triage', version: 'v0.9.1', status: 'deploying', env: 'staging', deployedAt: '2026-04-11 07:30:00', runtime: '3m', requests: 0, errors: 0 },
  { id: 'dpl_4', project: 'Code Review Bot', version: 'v1.0.0', status: 'failed', env: 'staging', deployedAt: '2026-04-11 07:15:00', runtime: '-', requests: 0, errors: 1 },
  { id: 'dpl_5', project: 'Lead Research Pipeline', version: 'v1.4.1', status: 'superseded', env: 'production', deployedAt: '2026-04-09 09:00:00', runtime: '45h 30m', requests: 1247, errors: 3 },
];

export default function DeploymentsPage() {
  const statusStyle = (s) => {
    if (s === 'active') return 'bg-green-400/10 text-green-400';
    if (s === 'deploying') return 'bg-blue-400/10 text-blue-400';
    if (s === 'failed') return 'bg-red-400/10 text-red-400';
    return 'bg-gray-400/20 text-gray-400';
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Deployments</h1>
        <p className="text-sm text-[#6b6b8a]">Track and manage your crew deployments</p>
      </div>
      <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2a2a3d] grid grid-cols-7 text-[10px] font-semibold text-[#6b6b8a] uppercase tracking-wider">
          <span className="col-span-2">Project</span><span>Version</span><span>Environment</span><span>Status</span><span>Requests</span><span>Deployed</span>
        </div>
        {DEPLOYMENTS.map(d => (
          <div key={d.id} className="px-5 py-3.5 border-b border-[#2a2a3d] last:border-0 grid grid-cols-7 items-center text-sm hover:bg-[#14141f]/60 transition-colors">
            <span className="font-medium col-span-2">{d.project}</span>
            <span className="font-mono text-xs text-[#6b6b8a]">{d.version}</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#1a1a2e] text-[#6b6b8a] w-fit">{d.env}</span>
            <span className={"px-2 py-0.5 rounded-full text-[9px] font-bold uppercase w-fit " + statusStyle(d.status)}>{d.status}</span>
            <span className="text-xs text-[#6b6b8a]">{d.requests > 0 ? d.requests.toLocaleString() : '-'}{d.errors > 0 ? ' / ' + d.errors + ' err' : ''}</span>
            <span className="text-[10px] text-[#4a4a5a]">{d.deployedAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}