'use client';

const SERVICES = [
  { name: 'API Gateway', status: 'operational', uptime: '99.99%', latency: '45ms' },
  { name: 'Agent Execution Engine', status: 'operational', uptime: '99.97%', latency: '1.85s' },
  { name: 'Flow Orchestrator', status: 'operational', uptime: '99.95%', latency: '2.1s' },
  { name: 'Memory Store', status: 'operational', uptime: '99.99%', latency: '12ms' },
  { name: 'Knowledge Base (RAG)', status: 'operational', uptime: '99.98%', latency: '180ms' },
  { name: 'Webhook Delivery', status: 'operational', uptime: '99.92%', latency: '120ms' },
  { name: 'Authentication (Clerk)', status: 'operational', uptime: '99.99%', latency: '85ms' },
  { name: 'Billing (Stripe)', status: 'operational', uptime: '99.99%', latency: '200ms' },
];

const INCIDENTS = [
  { date: 'Apr 10, 2026', title: 'Elevated API Latency', desc: 'Brief increase in response times due to deployment rollout. Resolved in 12 minutes.', severity: 'minor', resolved: true },
  { date: 'Apr 8, 2026', title: 'OpenAI API Timeout', desc: 'External dependency timeout affecting GPT-4o agents. Failover to Claude completed automatically.', severity: 'major', resolved: true },
];

export default function StatusPage() {
  const allOperational = SERVICES.every(s => s.status === 'operational');

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">System Status</h1>
        <p className="text-sm text-gray-500">Real-time health of all Nexus platform services</p>
      </div>

      <div className={"border rounded-xl p-5 mb-6 shadow-sm " + (allOperational ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200')}>
        <div className="flex items-center gap-3">
          <span className={"w-3 h-3 rounded-full " + (allOperational ? 'bg-emerald-500' : 'bg-amber-500')} />
          <span className={"text-lg font-semibold " + (allOperational ? 'text-emerald-800' : 'text-amber-800')}>
            {allOperational ? 'All Systems Operational' : 'Partial System Outage'}
          </span>
        </div>
        <p className={"text-sm mt-1 " + (allOperational ? 'text-emerald-600' : 'text-amber-600')}>
          Last checked: {new Date().toLocaleTimeString()}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
        <div className="px-5 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Services</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {SERVICES.map(s => (
            <div key={s.name} className="px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={"w-2 h-2 rounded-full " + (s.status === 'operational' ? 'bg-emerald-500' : s.status === 'degraded' ? 'bg-amber-500' : 'bg-red-500')} />
                <span className="text-sm font-medium text-gray-900">{s.name}</span>
              </div>
              <div className="flex items-center gap-6 text-xs text-gray-400">
                <span>{s.uptime} uptime</span>
                <span>{s.latency} avg</span>
                <span className={"font-semibold " + (s.status === 'operational' ? 'text-emerald-600' : 'text-amber-600')}>{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-5 py-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Recent Incidents</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {INCIDENTS.map((inc, i) => (
            <div key={i} className="px-5 py-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={"px-2 py-0.5 rounded-full text-[9px] font-bold uppercase " + (inc.severity === 'major' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600')}>{inc.severity}</span>
                  <span className="text-sm font-semibold text-gray-900">{inc.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{inc.date}</span>
                  {inc.resolved && <span className="text-[10px] font-semibold text-emerald-600">Resolved</span>}
                </div>
              </div>
              <p className="text-xs text-gray-500">{inc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
