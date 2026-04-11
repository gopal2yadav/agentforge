'use client';

export default function DeploymentsPage() {
  const deployments = [
    { id: 'dep_1', name: 'Content Pipeline v1.2', env: 'production', status: 'active', agents: 3, uptime: '99.98%', deployedAt: '2026-04-10 14:30', version: 'v1.2.0' },
    { id: 'dep_2', name: 'Code Review Bot', env: 'production', status: 'active', agents: 2, uptime: '100%', deployedAt: '2026-04-09 09:15', version: 'v2.0.1' },
    { id: 'dep_3', name: 'Lead Scorer (Beta)', env: 'staging', status: 'deploying', agents: 4, uptime: '-', deployedAt: '2026-04-11 08:00', version: 'v0.3.0' },
    { id: 'dep_4', name: 'Support Triage v1.0', env: 'production', status: 'stopped', agents: 2, uptime: '99.5%', deployedAt: '2026-04-05 16:00', version: 'v1.0.0' },
  ];

  const statusStyle = (s) => {
    if (s === 'active') return 'bg-emerald-50 text-emerald-600';
    if (s === 'deploying') return 'bg-blue-50 text-blue-600';
    return 'bg-gray-100 text-gray-500';
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Deployments</h1>
          <p className="text-sm text-gray-500">Manage your deployed agent crews and workflows</p>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ New Deployment</button>
      </div>
      <div className="space-y-3">
        {deployments.map(dep => (
          <div key={dep.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-sm font-bold">{dep.name.charAt(0)}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{dep.name}</div>
                  <div className="text-[11px] text-gray-400">{dep.version} \u00B7 {dep.agents} agents \u00B7 {dep.env}</div>
                </div>
              </div>
              <span className={"px-2.5 py-1 rounded-full text-[10px] font-semibold " + statusStyle(dep.status)}>{dep.status}</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-400">
              <span>Uptime: <span className="text-gray-600 font-medium">{dep.uptime}</span></span>
              <span>Deployed: <span className="text-gray-600">{dep.deployedAt}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}