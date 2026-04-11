'use client';

const AUTOMATIONS = [
  { id: '1', name: 'Content Pipeline', trigger: 'Manual', agents: 4, status: 'active', runs: 47, lastRun: '2 hours ago', successRate: 94 },
  { id: '2', name: 'Bug Triage & Assignment', trigger: 'Webhook (GitHub)', agents: 3, status: 'active', runs: 89, lastRun: '15 min ago', successRate: 96 },
  { id: '3', name: 'Lead Enrichment', trigger: 'Schedule (daily)', agents: 2, status: 'active', runs: 120, lastRun: '6 hours ago', successRate: 99 },
  { id: '4', name: 'Customer Support Triage', trigger: 'Webhook (Slack)', agents: 3, status: 'paused', runs: 34, lastRun: '2 days ago', successRate: 88 },
  { id: '5', name: 'Weekly Report Generator', trigger: 'Schedule (weekly)', agents: 2, status: 'active', runs: 12, lastRun: '3 days ago', successRate: 100 },
];

export default function AutomationsPage() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Automations</h1>
          <p className="text-sm text-[#6b6b8a]">Configure multi-agent workflows that run automatically</p>
        </div>
        <button className="px-4 py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-semibold hover:bg-[#5558e6] transition-colors shadow-lg shadow-[#6366f1]/20">+ New Automation</button>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
          <div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">Active</div>
          <div className="text-2xl font-bold mt-1 text-green-400">{AUTOMATIONS.filter(a => a.status === 'active').length}</div>
        </div>
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
          <div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">Total Runs</div>
          <div className="text-2xl font-bold mt-1 text-[#6366f1]">{AUTOMATIONS.reduce((a, b) => a + b.runs, 0)}</div>
        </div>
        <div className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-4">
          <div className="text-[11px] text-[#6b6b8a] uppercase tracking-wider">Avg Success</div>
          <div className="text-2xl font-bold mt-1 text-white">{Math.round(AUTOMATIONS.reduce((a, b) => a + b.successRate, 0) / AUTOMATIONS.length)}%</div>
        </div>
      </div>
      <div className="space-y-3">
        {AUTOMATIONS.map((auto) => (
          <div key={auto.id} className="bg-[#14141f]/40 border border-[#2a2a3d] rounded-xl p-5 hover:border-[#3a3a4d] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center text-[#818cf8] text-sm font-bold">{auto.agents}</div>
                <div>
                  <div className="text-[15px] font-semibold">{auto.name}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-mono text-[#4a4a5a] bg-[#1a1a2e] px-2 py-0.5 rounded">{auto.trigger}</span>
                    <span className="text-[10px] text-[#6b6b8a]">{auto.agents} agents</span>
                    <span className="text-[10px] text-[#6b6b8a]">{auto.runs} runs</span>
                    <span className="text-[10px] text-green-400">{auto.successRate}% success</span>
                    <span className="text-[10px] text-[#4a4a5a]">Last: {auto.lastRun}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-3 py-1.5 rounded-lg border border-[#2a2a3d] text-[11px] text-[#6b6b8a] hover:text-white transition-colors">Run Now</button>
                <span className={"px-2.5 py-1 rounded-full text-[10px] font-semibold " + (auto.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-amber-400/10 text-amber-400')}>{auto.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}