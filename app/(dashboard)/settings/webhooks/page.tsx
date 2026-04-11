'use client';
export default function WebhooksPage() {
  const webhooks = [
    { id: 'wh_1', url: 'https://api.example.com/nexus/callback', events: ['agent.completed', 'agent.failed'], status: 'active', successRate: 99.2 },
    { id: 'wh_2', url: 'https://slack.com/api/webhook/T123', events: ['execution.completed'], status: 'active', successRate: 100 },
  ];
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">Webhooks</h1><p className="text-sm text-gray-500">Receive real-time notifications when events occur</p></div>
        <button className="px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm">+ Add Endpoint</button>
      </div>
      <div className="space-y-3">
        {webhooks.map(wh => (
          <div key={wh.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={"w-2 h-2 rounded-full " + (wh.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400')} />
                <span className="text-sm font-mono text-gray-600">{wh.url}</span>
              </div>
              <span className="text-xs text-emerald-600 font-medium">{wh.successRate}% success</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {wh.events.map(ev => (<span key={ev} className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-50 text-indigo-600">{ev}</span>))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Available Events</h3>
        <div className="grid grid-cols-2 gap-2">
          {['agent.created','agent.completed','agent.failed','execution.started','execution.completed','flow.triggered','memory.updated','billing.subscription_changed'].map(ev => (
            <div key={ev} className="text-xs font-mono text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">{ev}</div>
          ))}
        </div>
      </div>
    </div>
  );
}