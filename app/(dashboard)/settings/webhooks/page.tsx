'use client';
import { useState } from 'react';

export default function WebhooksPage() {
  const [webhooks] = useState([
    { id: 'wh_1', url: 'https://api.example.com/nexus/callback', events: ['agent.completed', 'agent.failed'], status: 'active', successRate: 99.2 },
    { id: 'wh_2', url: 'https://slack.com/api/webhook/T123', events: ['execution.completed'], status: 'active', successRate: 100 },
  ]);

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Webhooks</h1>
          <p className="text-sm text-[#6b6b8a]">Receive real-time notifications when events occur</p>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">
          + Add Endpoint
        </button>
      </div>
      <div className="space-y-3">
        {webhooks.map((wh) => (
          <div key={wh.id} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={"w-2 h-2 rounded-full " + (wh.status === 'active' ? 'bg-green-400' : 'bg-gray-400')} />
                <span className="text-sm font-mono text-[#a0a0b8]">{wh.url}</span>
              </div>
              <span className="text-xs text-green-400">{wh.successRate}% success</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {wh.events.map((ev) => (
                <span key={ev} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#6366f1]/10 text-[#818cf8]">{ev}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-2">Available Events</h3>
        <div className="grid grid-cols-2 gap-2">
          {['agent.created', 'agent.completed', 'agent.failed', 'execution.started', 'execution.completed', 'flow.triggered', 'memory.updated', 'billing.subscription_changed'].map((ev) => (
            <div key={ev} className="text-xs font-mono text-[#6b6b8a] bg-[#0a0a0f] px-3 py-2 rounded-lg">{ev}</div>
          ))}
        </div>
      </div>
    </div>
  );
}